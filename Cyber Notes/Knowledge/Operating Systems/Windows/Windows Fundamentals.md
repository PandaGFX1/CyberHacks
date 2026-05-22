Tags: #Status/In-Progress #Type/Knowledge #Context/Windows #publish-me

---
## Overview
Windows Fundamentals cover the core components, utilities, file system, user management, and security features of modern Windows operating systems. Knowledge of these is essential for system administration, troubleshooting, forensic analysis, and understanding the Windows security model.

---

## Terminology
| Term | Definition |
|------|------------|
| NTFS | New Technology File System; default Windows file system since Windows NT |
| ADS (Alternate Data Streams) | NTFS feature allowing multiple data streams per file; used legitimately and maliciously |
| EFS (Encrypting File System) | NTFS built-in encryption for files and folders |
| UAC (User Account Control) | Windows security feature requiring elevation confirmation for admin actions |
| MSConfig | System Configuration utility for diagnosing startup and boot issues |
| Registry | Central hierarchical database storing all system and application configuration |
| VSS (Volume Shadow Copy Service) | Creates snapshots of volumes for backup and restore purposes |
| Patch Tuesday | Microsoft's monthly update release cycle; typically 2nd Tuesday of each month |
| SID (Security Identifier) | Unique identifier assigned to every user and group account; used for access control |
| SAM (Security Accounts Manager) | Database storing local user credentials and group memberships |
| DACL | Discretionary Access Control List; defines user/group access to a securable object |
| SACL | System Access Control List; records access attempts for auditing purposes |
| ACE | Access Control Entry; one rule within an ACL, specifying a principal and permission |
| SCM (Service Control Manager) | Windows component managing the lifecycle of system services; accessed via `services.msc` |
| SMB | Server Message Block; protocol used for Windows file and printer sharing |
| WMI | Windows Management Instrumentation; subsystem for managing devices and applications programmatically |
| AppLocker | Microsoft application whitelisting solution controlling which programs users can run |
| GPO | Group Policy Object; policy settings pushed to domain-joined machines from a Domain Controller |
| LSA | Local Security Authority; enforces security policy and creates access tokens at logon |

---
## Core Concepts

### Windows Version History
Windows began as a graphical shell for MS-DOS. Windows 95 was the first full integration of Windows and DOS. Windows NT 3.1 Advanced Server was the first Windows Server product line.

| Version | NT Version | Notes |
|---------|-----------|-------|
| Windows NT 4 | 4.0 | First stable NT workstation |
| Windows 2000 | 5.0 | AD introduced |
| Windows XP | 5.1 | Most widely deployed desktop |
| Windows Server 2003/2003 R2 | 5.2 | |
| Windows Vista / Server 2008 | 6.0 | UAC introduced |
| Windows 7 / Server 2008 R2 | 6.1 | |
| Windows 8 / Server 2012 | 6.2 | |
| Windows 8.1 / Server 2012 R2 | 6.3 | |
| Windows 10 / Server 2016 / 2019 | 10.0 | WSL introduced |

Query version via PowerShell: `Get-WmiObject -Class Win32_OperatingSystem | select Version,BuildNumber`

---

### Operating System Structure
The root drive (boot partition) is where Windows is installed — typically `C:\`. Other physical or virtual drives are assigned separate drive letters (e.g., `D:\`, `E:\`).

| Directory | Description |
|-----------|-------------|
| `C:\Perflogs` | Windows performance logs; empty by default |
| `C:\Program Files` | 64-bit programs on 64-bit systems; all programs on 32-bit systems |
| `C:\Program Files (x86)` | 32-bit and 16-bit programs on 64-bit systems |
| `C:\ProgramData` | Hidden folder containing application data shared across all users |
| `C:\Users` | User profiles for every account that has logged on |
| `C:\Users\Default` | Template profile used when a new user account is first created |
| `C:\Users\Public` | Files shared among all local users; accessible over the network by default |
| `C:\Users\<user>\AppData\Roaming` | Per-user app data that follows the user via roaming profiles |
| `C:\Users\<user>\AppData\Local` | Per-user app data specific to the local machine; never synced |
| `C:\Users\<user>\AppData\LocalLow` | Low-integrity app data (e.g., browser protected mode) |
| `C:\Windows` | Core Windows OS files |
| `C:\Windows\System32` | Critical OS components, DLLs, and the Windows API; searched first for DLL resolution |
| `C:\Windows\SysWOW64` | 32-bit DLLs on 64-bit systems; used for WOW64 compatibility |
| `C:\Windows\WinSxS` | Windows Component Store; holds all OS components, updates, and service packs |
| `C:\Windows\System32\Config` | Registry hive files and the SAM database |

Navigate the file system from CMD: `dir` to list contents, `tree` to visualize directory structure.

---

### File Systems
Windows supports multiple file system types. NTFS is the default for internal drives.

| File System | Max File Size | Notes |
|-------------|--------------|-------|
| FAT12 | 32MB | Legacy; used on early floppy disks |
| FAT16 | 2GB | Legacy; limited compatibility use |
| FAT32 | 4GB | Compatible with most devices and operating systems; common for USB/SD cards |
| exFAT | 16 EB | Modern replacement for FAT32; large file support without NTFS overhead |
| NTFS | 16 EB | Default Windows FS; journaling, permissions, encryption, compression |

**FAT32 trade-offs:**
- Pros: Cross-OS compatibility, works on most embedded devices
- Cons: No files over 4GB, no built-in encryption or compression, no journaling

**NTFS trade-offs:**
- Pros: Journaling (recovery from failure), granular permissions (ACL), ADS, EFS encryption, large partition support
- Cons: Limited native support on mobile/non-Windows devices; older media may not support it

### NTFS Permissions
NTFS permissions control access to files and folders at the OS level and apply regardless of how the resource is accessed (local or network).

Viewable via: Right click → Properties → Security, or `icacls <path>`
[[Assets/Images/Pasted image 20250402200711.png|NTFS Permissions]]

#### Standard Permissions

| Permission | Description |
|------------|-------------|
| Full Control | Read, write, modify, delete, change permissions, and take ownership; includes all permissions below |
| Modify | Read, write, and delete files and folders; cannot change permissions or take ownership |
| Read & Execute | View contents and run executables; inherits by both files and folders |
| List Folder Contents | View filenames and subfolder names within a folder; applies to folders only |
| Read | View file contents and attributes; cannot modify, delete, or execute |
| Write | Create files and subfolders, write data, change attributes; cannot delete |

Files and folders inherit NTFS permissions from their parent folder by default; inheritance can be disabled per object.

#### Special Permissions

| Special Permission | Description |
|--------------------|-------------|
| Traverse Folder / Execute File | Navigate through folders without read permission; run program files |
| List Folder / Read Data | View filenames in a folder; read file data |
| Read Attributes | View basic file attributes (read-only, hidden, archive, system) |
| Read Extended Attributes | View extended attributes defined by programs |
| Create Files / Write Data | Create files in a folder; overwrite file data |
| Create Folders / Append Data | Create subfolders; append data to end of a file without modifying existing content |
| Write Attributes | Modify basic file attributes |
| Write Extended Attributes | Modify extended attributes |
| Delete Subfolders and Files | Delete folder contents even without Delete permission on individual items |
| Delete | Delete the file or folder itself |
| Read Permissions | View the ACL on the object |
| Change Permissions | Modify the ACL on the object |
| Take Ownership | Assume ownership of the object |
| Synchronize | Allow threads to synchronize on a file handle; applies only to multithreaded programs |

#### Alternate Data Streams (ADS)
- NTFS-specific feature allowing multiple data streams per file (`$DATA`)
- Legitimate use: metadata storage (e.g., Zone.Identifier marks files downloaded from the internet)
- Security concern: can hide malicious payloads inside legitimate files
- Viewable via PowerShell: `Get-Item -Path <file> -Stream *`

### Share Permissions (SMB)
Share permissions apply when a folder is accessed over the network via SMB. They are separate from NTFS permissions — the most restrictive of the two applies.

| Permission | Description |
|------------|-------------|
| Full Control | Read, Change, and modify share permissions |
| Change | Read and write shared files; create and delete content |
| Read | View file names and contents; execute programs |

Create a network share: Right click folder → Advanced Sharing → Share this folder
Access from Linux: `smbclient //host/"Share Name" -U username`
Mount from Linux: `sudo mount -t cifs -o username=<user>,password=<pass> //<host>/"<share>" /mnt/point`

View shares: `net share` (CMD) or Computer Management GUI → Shared Folders

---

### Windows Sessions

#### Interactive Sessions
A user authenticates directly and receives a GUI or shell:
- Standard logon: entering credentials at the console
- `runas` command: launch a process as a different user
- RDP session: remote interactive logon

#### Non-Interactive Sessions
No user credentials required at logon. Used by the OS to run services and background processes.

| Account | Description |
|---------|-------------|
| `NT AUTHORITY\SYSTEM` (LocalSystem) | Most powerful account on the system — more privileged than local admin; runs core OS tasks |
| `NT AUTHORITY\LocalService` | Lower-privilege version of SYSTEM; has limited network access; used for services that don't need domain credentials |
| `NT AUTHORITY\NetworkService` | Similar to LocalService locally; can authenticate to the network using the computer account |

---

### Services & Processes
Services are long-running processes managed by the **Service Control Manager (SCM)**, accessible via `services.msc`. They can be set to start **Automatically**, **Manually**, or on a **Delayed** timer at boot.

#### Critical System Services
| Service | Role |
|---------|------|
| `smss.exe` | Session Manager — first user-mode process launched by the kernel |
| `csrss.exe` | Client/Server Runtime Subsystem — manages Win32 console and thread creation |
| `wininit.exe` | Initializes services, LSA, and SAM at startup |
| `lsass.exe` | Local Security Authority — enforces security policy, creates access tokens; stores cleartext creds and hashes in memory |
| `services.exe` | Service Control Manager — starts and stops services |
| `winlogon.exe` | Handles logon/logoff UI and loads user profiles |
| `svchost.exe` | Generic host process; multiple instances run different service groups (e.g., RPCSS, DCOM/PnP) |
| `System` | Kernel-mode system process |

`lsass.exe` is a high-value target during post-exploitation — it holds NTLM hashes and sometimes cleartext credentials in memory (see [[Mimikatz]] when created).

#### Service Permissions & Misconfigurations
Services run under a security context (LocalSystem, LocalService, NetworkService, or a custom service account). Misconfigured service permissions are a common privilege escalation vector:
- **Binary path replacement**: if the service binary path is writable, replace with a malicious executable
- **Recovery actions**: services can execute a program on failure — check the Recovery tab in `services.msc`
- **DLL hijacking**: if the service searches for a DLL in a writable path, place a malicious DLL there

Built-in service accounts in order of privilege: `LocalService < NetworkService < LocalSystem`

Recommended practice: create a dedicated service account with only the minimum permissions the service needs.

> See [[Windows Command Line]] for full `sc` command reference.

#### Task Manager
Access: `Ctrl + Shift + Esc` or search "Task Manager"
Useful tabs: Processes (live CPU/RAM/disk/network), Performance, Services, Startup (disable autorun entries), Users (active sessions)

#### Sysinternals Suite
Portable Windows tools for advanced system administration and analysis. Load directly via: `\\live.sysinternals.com\tools` in Windows Explorer, or download from Microsoft.

| Tool | Purpose |
|------|---------|
| Process Explorer | Enhanced Task Manager — shows parent-child process relationships and loaded handles/DLLs |
| Process Monitor | Real-time file system, registry, and process/thread activity monitor |
| TCPView | Live view of all TCP/UDP endpoints and their associated processes |
| PSExec | Execute processes on remote systems |
| Autoruns | Comprehensive view of all autorun locations (more complete than Task Manager) |

Always append `-accepteula` when running Sysinternals tools from the command line.

---

### Windows Management Instrumentation (WMI)
WMI is a PowerShell subsystem providing programmatic access to hardware, OS configuration, processes, services, and more across local and remote systems.

#### WMI Architecture
| Component | Role |
|-----------|------|
| WMI Service | Runs at boot; intermediary between consumers and providers |
| WMI Providers | Monitor and expose data for specific objects (OS, hardware, services, etc.) |
| CIM Object Manager | Processes queries from consumers and routes them to the correct provider |
| WMI Repository | Static database of WMI schema information |
| WMI Consumer | Application sending queries via the CIM Object Manager |

#### Key WMI Classes
| Class | Returns |
|-------|---------|
| `Win32_OperatingSystem` | OS version, build number, install date |
| `Win32_Process` | Running processes |
| `Win32_Service` | Windows services |
| `Win32_UserAccount` | Local user accounts |
| `Win32_Bios` | BIOS serial number and version |
| `Win32_ComputerSystem` | Hostname, domain, manufacturer, model |
| `Win32_NetworkAdapterConfiguration` | Network interface config including IPs |

> See [[Windows PowerShell]] for full `Get-WmiObject` and `Get-CimInstance` reference.
> See [[Windows Command Line]] for `wmic` CLI commands.

---

### Microsoft Management Console (MMC)
MMC groups administrative snap-ins into a customized management console. Open via `mmc` in the Start menu.

Add snap-ins: File → Add or Remove Snap-ins
Save a custom console to a `.msc` file — loads automatically next time.

Can manage both local and remote systems. Common use cases: managing users, certificates, event logs, and disk management.

---

### Windows Subsystem for Linux (WSL)
WSL allows native Linux binaries to run on Windows 10/Server 2019+. Uses a real Linux kernel via a Hyper-V subset.

Install: `Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux` (as Administrator)
Then install a distro from the Microsoft Store or via command line.

WSL installs `bash.exe` — run with `bash` in any Windows console. Windows drives accessible via `/mnt/c/`, `/mnt/d/`, etc.

---

### Desktop Experience vs. Server Core
Server Core is a minimal Windows Server installation with no GUI — only command-line, PowerShell, and remote management tools.

| Aspect | Desktop Experience | Server Core |
|--------|-------------------|-------------|
| Interface | Full GUI | CLI only |
| Attack surface | Larger | Smaller |
| Disk/memory usage | Higher | Lower |
| Management | GUI + CLI | CLI, PowerShell, RSAT, MMC |
| Primary config tool | GUI | `sconfig` |

Since Windows Server 2019, you cannot switch from Desktop Experience to Server Core after installation.

Server Core does not support: SCVMM, System Center DPM, SharePoint Server, Project Server.

---

### User Accounts & Permissions
| Account Type | Description |
|-------------|-------------|
| Administrator | Full system access and control |
| Standard User | Limited access; cannot make system-wide changes |

- **Local User & Group Management:** `lusrmgr.msc`
- **UAC (User Account Control):**
  - Default admin accounts bypass elevation prompts for low-risk actions
  - Admin sessions run without elevated privileges until explicitly prompted
  - Prevents unauthorized system-wide changes

#### Authentication vs Authorization
| Concept | Description |
|---------|-------------|
| Authentication | Verifies a user is who they claim to be; requires correct credentials |
| Authorization | Determines the level of access a granted user has |

#### Account Types
| Account | Description |
|---------|-------------|
| Administrator | Highest privilege; can install software, manage devices, settings, and other users; cannot be deleted |
| Guest | Temporary limited access for users without dedicated accounts |
| Local Account | Authenticated by the local machine; credentials stored in SAM (Security Accounts Manager) |
| Domain Account | Authenticated by a Domain Controller; credentials stored in Active Directory — see [[Active Directory Basics]] |

### System Configuration & Management Tools
| Tool | Access | Purpose |
|------|--------|---------|
| MSConfig | `msconfig` | Diagnose startup issues; view all services |
| Task Manager | `taskmgr` | Enable/disable startup items; monitor processes |
| Computer Management | `compmgmt` | Unified console: Task Scheduler, Event Viewer, Shared Folders |
| Performance Monitor | `perfmon` | Monitor local/remote system performance |
| Resource Monitor | `resmon` | Real-time CPU, Disk, Network, Memory usage |
| Disk Management | `compmgmt` → Disk Management | Manage partitions, assign drive letters |
| System Information | `msinfo32.exe` | Environment variables, IP config, hardware summary |
| Event Viewer | `compmgmt` → Event Viewer | View system, security, and application logs |

[[Assets/Images/Pasted image 20250402201839.png|Event Viewer Types]]
[[Assets/Images/Pasted image 20250402202002.png|Windows Logs Descriptions]]

### Registry
Central hierarchical database storing all system and application configuration.
Access via: `regedit`

Stores: user profiles, installed application settings, folder and icon settings, hardware configuration, network ports in use.

Registry is organized into **Root Keys** (also called **hives**), each with subkeys and values:

| Root Key | Abbreviation | Scope |
|----------|-------------|-------|
| `HKEY_LOCAL_MACHINE` | HKLM | All system settings loaded at boot; hardware loaded dynamically |
| `HKEY_CURRENT_USER` | HKCU | Settings for the currently logged-in user |
| `HKEY_USERS` | HKU | Settings for all user profiles on the system |
| `HKEY_CLASSES_ROOT` | HKCR | File type associations and COM object registration |
| `HKEY_CURRENT_CONFIG` | HKCC | Hardware configuration profile used at startup |

Registry hive files are stored at: `C:\Windows\System32\Config\`
HKCU is stored in: `C:\Users\<USERNAME>\Ntuser.dat`

#### Registry Value Types
| Type | Description |
|------|-------------|
| `REG_SZ` | Fixed-length string value |
| `REG_EXPAND_SZ` | Variable-length string with environment variable expansion |
| `REG_MULTI_SZ` | Multiple strings separated by null characters |
| `REG_BINARY` | Raw binary data |
| `REG_DWORD` | 32-bit unsigned integer |
| `REG_DWORD_LITTLE_ENDIAN` | 32-bit value in little-endian format (same as REG_DWORD) |
| `REG_DWORD_BIG_ENDIAN` | 32-bit value in big-endian format |
| `REG_QWORD` | 64-bit unsigned integer |
| `REG_QWORD_LITTLE_ENDIAN` | 64-bit value in little-endian format (same as REG_QWORD) |
| `REG_LINK` | Symbolic link to another registry key |
| `REG_NONE` | No defined data type |

#### Run and RunOnce Keys — Persistence Locations
These keys contain programs that execute automatically at startup or logon. A common persistence and privilege escalation vector.

| Key | When Executes |
|-----|--------------|
| `HKLM\Software\Microsoft\Windows\CurrentVersion\Run` | On every system startup |
| `HKCU\Software\Microsoft\Windows\CurrentVersion\Run` | On every logon for current user |
| `HKLM\Software\Microsoft\Windows\CurrentVersion\RunOnce` | Once at next system startup, then deleted |
| `HKCU\Software\Microsoft\Windows\CurrentVersion\RunOnce` | Once at next logon for current user, then deleted |

Query via CMD: `reg query HKLM\Software\Microsoft\Windows\CurrentVersion\Run`

### Security Features

#### Security Identifiers (SID)
Every user, group, and computer account is assigned a unique SID automatically at creation. SIDs are stored in the security database and added to the user's access token at logon.

SID format: `S-(revision)-(identifier-authority)-(subauthority-1)-(subauthority-2)-(RID)`

| Component | Description |
|-----------|-------------|
| Revision | Always `1` |
| Identifier Authority | 48-bit value identifying the authority that created the SID (e.g., NT Authority = 5) |
| Subauthority-1 | Identifies the domain or local computer that issued the SID |
| Subauthority-2 | Domain component (in domain environments) |
| RID | Relative Identifier — distinguishes accounts from one another; RID 500 = Administrator, 501 = Guest |

List users and SIDs: `wmic useraccount get name,sid`

#### Security Accounts Manager (SAM) & Access Control
The SAM database stores local user credentials. Rights granted to accounts are defined via Access Control Entries (ACEs) within Access Control Lists (ACLs) attached to securable objects.

Every thread and process started by a user goes through authorization:
- **Access Token** — created by LSA at logon; contains SID, group memberships, and privileges
- **DACL** — checked against the access token to determine whether to allow or deny the requested access
- **SACL** — records access attempts for auditing

#### User Account Control (UAC)
UAC prevents malware and unauthorized changes by requiring elevation confirmation for privileged actions. Admin accounts operate with a standard user token until elevation is needed.

- **Admin Approval Mode**: prompts the administrator to confirm or enter credentials before elevation
- Elevation triggers: installing software, modifying system settings, running apps that request admin
- Check via: `Get-WmiObject -Class Win32_UserAccount | select Name,SID,LocalAccount`

[[Assets/Images/Windows UAC Process.png|UAC Process]]

#### AppLocker
Microsoft's application whitelisting solution — gives administrators granular control over which executables, scripts, DLLs, packaged apps, and installers users can run.

- Rules can be based on: file hash, publisher/signature, file path, product name, or version
- Applied to: security groups or individual users
- **Audit Mode**: log blocked events without enforcing — use before switching to enforcement
- Configured via: Local Group Policy (`gpedit.msc`) or Domain GPO

#### Local Group Policy
Allows administrators to configure system behavior, security settings, and network restrictions.

| Category | Scope |
|----------|-------|
| Computer Configuration | Settings applied regardless of who logs on |
| User Configuration | Settings applied to specific users at logon |

Access: `gpedit.msc` or Start Menu
In domain environments, GPOs are pushed from a Domain Controller to all domain-joined machines.

Notable policy: **Credential Guard** — isolates the LSA process to prevent credential theft attacks.

#### Windows Defender Antivirus
Built-in AV included since Windows Vista / Server 2008. Managed via Windows Security Center.

| Feature | Description |
|---------|-------------|
| Real-Time Protection | Continuously monitors for known threats |
| Cloud-Delivered Protection | Submits suspicious samples to Microsoft for analysis |
| Controlled Folder Access | Blocks unauthorized writes to protected folders; built-in ransomware protection |
| Tamper Protection | Prevents disabling Defender via registry, PowerShell, or Group Policy |
| Automatic Sample Submission | Sends unknown files to cloud protection service for analysis |

Defender cmdlets useful during post-exploitation recon:

| Cmdlet | Purpose |
|--------|---------|
| `Get-MpComputerStatus` | Full AV status — check `AntivirusEnabled`, `RealTimeProtectionEnabled`, `BehaviorMonitorEnabled` |
| `Get-MpPreference` | AV config — exclusion paths, scan schedule, signature update settings |
| `Get-MpThreatDetection` | Active and historical malware detection events |

Windows Defender detects common open-source tools (Metasploit payloads, unmodified Mimikatz). Bypassing requires custom encoding, obfuscation, or in-memory execution.

#### Windows Updates
- Released on **Patch Tuesday** — typically the 2nd Tuesday of each month
- Access via: `control /name Microsoft.WindowsUpdate`

#### Firewall
Access via: `WF.msc` or [[Windows Defender Firewall]]

| Profile | Use Case |
|---------|---------|
| Domain | Active Directory domain networks |
| Private | Trusted home or work networks |
| Public | Untrusted public networks |

Firewall can be centrally managed in a domain environment via Group Policy.

#### Volume Shadow Copy Service (VSS)
- Creates point-in-time snapshots of volumes
- Used for backup, restore points, and system restore
- Security note: attackers often target VSS to prevent recovery after ransomware

### Common Commands
> Full command reference in [[Windows Command Line]]

| Command | Description |
|---------|-------------|
| `hostname` | Displays system hostname |
| `whoami` | Shows current logged-on user |
| `ipconfig` | Shows network configuration |
| `cls` | Clears console screen |
| `netstat` | TCP/IP connection statistics |
| `net user` | Manage network user accounts |
| `findstr` | Search text within files (similar to grep) |

---
## Related Concepts
- [[Windows Command Line]]
- [[Windows PowerShell]]
- [[Windows Remote Management]]
- [[Active Directory Basics]]

## Related Techniques
- [[Windows Pentest Playbook]]

## Related Tools
- [[Windows Defender Firewall]]

---
## References / Images
- [[Assets/Images/Pasted image 20250402200711.png|NTFS Permissions]]
- [[Assets/Images/Pasted image 20250402201839.png|Event Viewer Types]]
- [[Assets/Images/Pasted image 20250402202002.png|Windows Logs Descriptions]]
- https://ss64.com/nt/icacls.html
- Microsoft Windows Documentation
- TryHackMe Windows Fundamentals Room
- HTB Windows Fundamentals Module
