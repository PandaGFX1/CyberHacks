#Status/Exam-Done #Type/Lab #Exam/CJCA

---
## Overview

Full alert triage for the HTB CJCA exam (April 2026), Phase 2. 39 alerts reviewed across 5 hosts on ELK01 (Elastic Stack — 10.129.234.241).

**Result: 32 True Positives / 7 False Positives**

See [[HTB CJCA Exam — April 2026]] for the full engagement index, credentials, and flags.

---
## Alert Triage Table

SIEM platform: Elastic Stack (ELK01 — 10.129.234.241)
Alert data: see [[alerts_completed.csv]]

| No. | Host | Alert Name | TP/FP | Key Evidence |
|-----|------|-----------|-------|--------------|
| 1 | WEB01 | Suspicious Shell Execution by logrotate | **FP** | Routine daily cron: run-parts → logrotate → dash; no tty; legitimate cron pattern |
| 2 | WEB01 | Outbound Connection by Web Server User | **TP** | php-fpm8.1 (www-data) established outbound TCP to 198.143.164.252:443 — abnormal for PHP-FPM |
| 3 | WEB01 | Suspicious Command Execution on Web Server | **TP** | www-data executed id from /wp-content/plugins/canto/includes/lib via web shell |
| 4 | WEB01 | Anomalous Outbound Connections from Web Server | **TP** | php-fpm made multiple outbound connections to 10.10.16.14 on port 1337 (C2); SSH login as cameron followed from same IP |
| 5 | WEB01 | Suspicious Reconnaissance Activity | **TP** | www-data ran sh -c cat /etc/passwd, ls -la /home/cameron/.ssh via Canto plugin directory |
| 6 | WEB01 | Suspicious Access to SSH Directory | **TP** | www-data ran sh -c cat /home/cameron/.ssh/id_rsa — deliberate key exfiltration |
| 7 | WEB01 | Suspicious Access to User Shell History File | **TP** | cameron read .bash_history via interactive SSH session — post-exploitation recon |
| 8 | WEB01 | Executable Permissions Assigned in /tmp | **TP** | cameron ran chmod +x pspy (renamed with random suffix) in /tmp |
| 9 | WEB01 | Possible Privilege Escalation Attempt | **TP** | cameron ran sudo -l from /tmp ~1 minute after deploying pspy |
| 10 | NIX01 | Suspicious Reconnaissance Activity | **TP** | teamcity ran whoami and cat .bash_history — post-exploitation enumeration |
| 11 | NIX01 | Possible Privilege Escalation Attempt | **TP** | sudo -l triggered snap advise-snap side effect; parent was python3 (TeamCity exploitation) |
| 12 | NIX01 | Executable Permissions Assigned in /tmp | **TP** | teamcity ran chmod +x on pspy and linpeas (same random suffix 8Jsn73Bsj2001sKKis as WEB01 — same attacker) |
| 13 | NIX01 | Suspicious Command Execution to External Cloud IP | **TP** | teamcity ran curl to 34.200.177.28 (AWS) on port 443 — tool download blending with HTTPS traffic |
| 14 | NIX01 | Suspicious Command Execution on Web Server | **TP** | teamcity ran linpeas grep pattern from /tmp searching for .gnupg, .kube, .ssh, .key, .pem |
| 15 | NIX01 | Suspicious Command Execution on Web Server | **FP** | df -k TeamCity disk check — no interactive terminal; spawned by TeamCity service itself |
| 16 | NIX01 | Potential Privilege Escalation Attempt | **TP** | teamcity ran bash compile.sh from /tmp/CVE-2022-0847-DirtyPipe-Exploits — kernel 5.13 in vulnerable range |
| 17 | NIX02 | Multiple Outgoing Communications by Snapd | **FP** | snapd contacted 185.125.188.57:443 (Canonical snap store) — routine update checks; occurred 90 min before attacker activity |
| 18 | NIX02 | Suspicious IMAP Login Failures | **TP** | Multiple inbound IMAP connections from 10.10.16.14 in rapid succession — credential brute force |
| 19 | NIX02 | Automation Script Executed with Elevated Privileges | **TP** | marc ran .email-backup.sh via sudo (NOPASSWD misconfiguration) → script executed as root |
| 20 | NIX02 | Executable Permissions Assigned in /tmp | **TP** | root ran chmod +x linpeas (same suffix as WEB01/NIX01) — same attacker operating as root |
| 21 | NIX02 | Possible Persistence via SSH Key Injection | **TP** | vim edited /root/.ssh/authorized_keys (swap files confirm interactive edit) — backdoor SSH key injected |
| 22 | WIN01 | Successful Null Session Enumeration | **TP** | Inbound SMB from 10.10.16.14 with null SID (RemoteUserID S-1-0-0) — unauthenticated recon |
| 23 | WIN01 | Suspicious Process Access – wininit → lsass | **FP** | wininit.exe is lsass.exe's parent process — this is normal OS initialization; access mask 0x1000000 (minimal perms); predates attacker activity |
| 24 | WIN01 | Possible SMB Brute Force / Password Spraying | **TP** | ~300 NTLM login failures from 10.10.16.14 over ~80 seconds; success at 13:28:40 as john |
| 25 | WIN01 | Suspicious Access to PowerShell History File | **TP** | john ran winPEAS.ps1; winPEAS read ConsoleHost_history.txt which contained plaintext Administrator credentials |
| 26 | WIN01 | High-Privileged Account Login from Poor Reputation IP | **TP** | Administrator login (Logon Type 3 + Type 10/RDP) from 10.10.16.14 following winPEAS credential theft |
| 27 | WIN01 | Potential Malware Staging in AppData\Local | **TP** | revshell1337.exe created in AppData\Local\ via RDP session; outbound to 10.10.16.14:1337 confirmed C2 |
| 28 | WIN01 | Suspicious Scheduled Task with AppData\Local Path | **TP** | Scheduled task \Check created to run revshell1337.exe every 2 minutes — persistence |
| 29 | WIN01 | Suspicious Process Access – powershell → lsass | **TP** | winPEAS.ps1 running as Administrator requested lsass handle (mask 0x1410 includes read memory) — credential scraping |
| 30 | WIN01 | Suspicious Process Access – svchost → lsass | **FP** | Logs show lsass accessing svchost (wrong direction); call trace is all legitimate SSPI DLLs; normal auth behavior |
| 31 | WIN02 | Suspicious Process Access – svchost → lsass | **FP** | Same pattern as WIN01 alert 30; occurs at 11:37, well before attacker activity on WIN02 (14:21) |
| 32 | WIN02 | Successful Null Session Enumeration | **TP** | ~1381 SMB connections from 10.10.16.14 with null SID — heavy automated enumeration |
| 33 | WIN02 | Possible SMB Brute Force / Password Spraying | **TP** | ~689 NTLM failures targeting backup account; SubStatus 0xC000006A confirms username exists; same methodology as WIN01 |
| 34 | WIN02 | Suspicious Reconnaissance Activity | **TP** | backup ran whoami /priv from cmd.exe at Medium integrity — mirrors post-exploitation pattern across all hosts |
| 35 | WIN02 | Headless Command Shell Execution via conhost.exe | **TP** | cmd.exe launched under headless conhost (session 0) as backup — consistent with WMI remote shell after credential spray |
| 36 | WIN02 | Suspicious Password Change via Command Line | **TP** | net user Administrator 'wF&Z226m9Y^g#NDWJT' executed via MonitorFiles.ps1 as Administrator — attacker changed admin password |
| 37 | WIN02 | High-Privileged Account Login from Poor Reputation IP | **TP** | Administrator RDP login (Logon Type 10) from 10.10.16.14 with new password set via MonitorFiles.ps1 28 seconds earlier |
| 38 | WIN02 | Unusual Inter-Process Thread Injection (rdpclip → csrss) | **TP** | rdpclip.exe (Administrator) created remote thread in csrss.exe (SYSTEM) immediately after RDP login — anomalous cross-privilege injection via established RDP session |
| 39 | WIN02 | rundll32.exe Executing DLL with Unusual Arguments | **FP** | shell32.dll SHCreateLocalServerRunDll — legitimate COM server init triggered by Administrator RDP shell; spawned by svchost DcomLaunch; both binaries validly signed |

---
## References / Images
- [[alerts_completed.csv]]
- [[alerts.csv]]
