#Status/Exam-Done #Type/Lab #Context/Redteam #Exam/CJCA

---
## Engagement Overview

>[!INFO]- Engagement Details:
>```
>Client:      Luminex Ltd. (fictional)
>Exam:        HackTheBox CJCA (Junior Cybersecurity Associate)
>Date:        April 25, 2026
>Type:        Grey Box Penetration Test + SIEM Alert Triage
>Attacker IP: 10.10.16.14 (kali workstation)
>SIEM:        ELK01 — 10.129.234.241 (Elastic Stack)
>```

---
## Network Targets

| Host | IP (final) | OS | Role | Foothold Vector |
|------|------------|-----|------|----------------|
| WEB01 | 10.129.17.44 | Linux | WordPress web server | CVE-2023-3452 (Site Import LFI) |
| NIX01 | 10.129.230.230 | Linux | TeamCity CI/CD server | CVE-2023-42793 (unauth RCE) |
| NIX02 | 10.129.17.46 | Linux | Dovecot mail server | Credential reuse (marc:010203) |
| WIN01 | 10.129.17.36 | Windows | Domain workstation | Credential reuse (john:1234567890) |
| WIN02 | unknown | Windows | Domain workstation | Credential reuse (backup:gmb_ADN6wje9tra3qwf) |

Note: IP addresses changed multiple times during exam due to network resets.

---
## Attack Chain

```
[Attacker]
    │
    ├─ WEB01 (WordPress www.luminex.htb)
    │     CVE-2023-3452 Site Import LFI → cameron SSH key
    │     Foothold: SSH as cameron
    │     PrivEsc: sudo less → !/bin/bash → root
    │     Loot: cameron SSH key, admin hash
    │
    ├─ NIX01 (TeamCity :8111) ← lateral via cameron SSH key
    │     CVE-2023-42793 → rogue admin → RCE as teamcity
    │     PrivEsc: CVE-2022-0847 DirtyPipe → root
    │     Loot: MySQL creds, marc:010203, john:1234567890
    │
    ├─ NIX02 (Dovecot mail) ← creds from NIX01 init.sql
    │     SSH marc:010203 → rbash escape → unrestricted shell
    │     PrivEsc: sudo .email-backup.sh (NOPASSWD) injection → root
    │     Loot: backup:gmb_ADN6wje9tra3qwf
    │
    ├─ WIN01 ← creds from NIX01 init.sql
    │     SMB spray → john:1234567890
    │     PrivEsc: winPEAS found PS history → Administrator:mdm0axd*EQM7xmq.krn
    │     Access: RDP as Administrator
    │
    └─ WIN02 ← creds from NIX02 log_backup.sh
          SMB spray → backup:gmb_ADN6wje9tra3qwf
          PrivEsc: MonitorFiles.ps1 injection → executes as Administrator → root
```

---
## Credentials Collected

| Credential | Source | Used On |
|------------|--------|---------|
| cameron SSH private key | WEB01 LFI (/home/cameron/.ssh/id_rsa) | WEB01 SSH, NIX01 SSH |
| admin hash | WEB01 WordPress | — |
| vjb_kbt5ecw6tjh2TQY (MySQL root) | NIX01 Dockerfile | — |
| yne6FZA5mqd5zxe*nfj (MySQL admin) | NIX01 Dockerfile | — |
| marc:010203 | NIX01 init.sql | NIX02 SSH |
| john:1234567890 | NIX01 init.sql | WIN01 SMB/WinRM |
| Administrator:mdm0axd*EQM7xmq.krn | WIN01 PS history | WIN01 RDP |
| backup:gmb_ADN6wje9tra3qwf | NIX02 /root/log_backup.sh | WIN02 SMB |
| admin.OxWF:Password@123 | CVE-2023-42793 exploit (generated) | NIX01 TeamCity |

---
## Flags

| Host | User Flag | Root/Admin Flag |
|------|-----------|-----------------|
| WEB01 | 88f61d6ce3d26d2c89b9260bd017e08d | d6e3e11b11a89cc678b116ef0468f929 |
| NIX01 | f6529ef222c06bc0e12cc7fcf09a7828 | a7bf0f80ea28de8a8505ab9d39893ce3 |
| NIX02 | 823e1b360517fe100b59742e51426715 | 030fd50d8090ae366b30c51c2de7d18e |
| WIN01 | e4e9a0efc1cf23b5c795484ad0504d66 | 96f0352867e0f6783791714b02b59e13 |
| WIN02 | 577561d76f5d502daeabb2162118c725 | 73842c0719e9207da6b9f7ee6e435ab5 |

---
## SIEM Alert Triage (Phase 2 — ELK01)

SIEM platform: Elastic Stack (ELK01 — 10.129.234.241)

**Total: 32 True Positives / 7 False Positives across 39 alerts**

| Host | Alerts | TP | FP |
|------|--------|----|----|
| WEB01 | 9 | 8 | 1 |
| NIX01 | 7 | 6 | 1 |
| NIX02 | 5 | 4 | 1 |
| WIN01 | 9 | 7 | 2 |
| WIN02 | 9 | 7 | 2 |
| **Total** | **39** | **32** | **7** |

Full alert-by-alert triage table: [[CJCA SIEM Triage]]

---
## Overall Lessons Learned

>[!INFO]- Overall Lessons Learned:
>```
>ENUMERATION:
>- Enumerate ALL credential sources before pivoting: /root/, home dirs, Dockerfiles,
>  init.sql, .bash_history, cron scripts, backup scripts.
>  find / -name "*.sql" -o -name "Dockerfile" -o -name "*.env" 2>/dev/null
>  grep -rn "password\|passwd\|secret" /root/ /home/ 2>/dev/null
>- Check /root/ after EVERY privilege escalation — backup scripts frequently contain
>  the next host's credentials.
>
>TOOLS:
>- crackmapexec (cme) is deprecated. Use nxc (netexec): pipx install netexec
>- Run WPScan with --plugins-detection aggressive and --api-token for full CVE coverage.
>- Read ALL of linpeas/winpeas output — do not stop after the first few interesting lines.
>- Research better tools for credential file hunting in Windows/Linux environments.
>
>PRIVESC:
>- sudo -l is always worth running immediately after foothold.
>- If a script runs as a privileged user and is writable — inject and wait.
>  Do not need to know the exact execution trigger.
>- rbash is easily bypassed: ssh user@host "bash --noprofile"
>- On Windows, check PSReadline history early:
>  type %APPDATA%\Microsoft\Windows\PowerShell\PSReadline\ConsoleHost_history.txt
>
>PROCESS:
>- Improve in-exam note-taking. IP changes and rabbit holes caused significant lost
>  time because findings were not documented in real-time.
>- Document every IP, open port, and service immediately — do not rely on memory.
>- When stuck, go back and enumerate more before chasing new attack paths.
>```

---
## Host Notes
- [[Machines/WEB01|WEB01]] — CVE-2023-3452 LFI → cameron SSH → sudo less escape
- [[Machines/NIX01|NIX01]] — CVE-2023-42793 TeamCity RCE → CVE-2022-0847 DirtyPipe
- [[Machines/NIX02|NIX02]] — marc cred reuse → rbash escape → sudo .email-backup.sh injection
- [[Machines/WIN01|WIN01]] — john cred spray → PS history creds → Administrator RDP
- [[Machines/WIN02|WIN02]] — backup cred spray → MonitorFiles.ps1 injection → Administrator

---
## Related Playbooks
- [[Linux Pentest Playbook]]
- [[Windows Pentest Playbook]]

## Related Tools
- [[WPScan]]
- [[NetExec]]
- [[evil-winrm]]
- [[PEASS-ng]]
- [[Nmap]]
- [[xfreerdp]]
- [[Elastic Stack]]

---
## References / Images
- Exam PDF report: [[HTB CJCA Exam — April 2026.pdf]]
- Alerts CSV (raw): [[alerts.csv]]
- Alerts CSV (completed): [[alerts_completed.csv]]
