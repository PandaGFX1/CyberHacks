#Status/In-Progress #Type/Tool #Context/Blueteam #Context/Windows #publish-me

---
## Overview
System Monitor (Sysmon) is a Windows system service and device driver from Microsoft Sysinternals that runs persistently across reboots to monitor and log system activity to the Windows event log. It provides detailed telemetry about process creation, network connections, file creation time changes, driver loads, DLL loads, registry changes, DNS queries, and more — capturing data that the standard Windows Security log does not. Sysmon is a cornerstone of endpoint detection in SOC environments and is essential for detecting advanced attacker behavior like DLL hijacking, process injection, credential dumping, and living-off-the-land techniques.

Sysmon events appear under: `Applications and Services Logs → Microsoft → Windows → Sysmon → Operational`

## Target / Context
- Windows endpoints and servers in a SOC or monitored environment
- Threat hunting and incident response on Windows systems
- Detection engineering for Elastic, Splunk, Sentinel, and other SIEMs

---
## Installation

> [!INFO]- Installation Commands:
> Download Sysmon from Microsoft Sysinternals: https://docs.microsoft.com/en-us/sysinternals/downloads/sysmon
>
> **Install with default config (basic monitoring):**
> `sysmon.exe -accepteula -i`
>
> **Install with hash logging and network monitoring enabled:**
> `sysmon.exe -accepteula -i -h md5,sha256,imphash -l -n`
>
> | Flag | Description |
> |------|-------------|
> | `-i` | Install Sysmon |
> | `-accepteula` | Accept the EULA silently |
> | `-h md5,sha256,imphash` | Hash algorithms to compute for process images |
> | `-l` | Log loading of modules (DLLs) — Event ID 7 |
> | `-n` | Log network connections — Event ID 3 |
> | `-u` | Uninstall Sysmon |
> | `-c <config.xml>` | Apply or update a configuration file |
>
> **Apply a custom XML configuration (recommended):**
> `sysmon.exe -c sysmon-config.xml`
>
> **Sysmon for Linux (separate project):**
> https://github.com/Sysinternals/SysmonForLinux

---
## Basic Usage

> [!INFO]- Viewing Sysmon Events:
> Event Viewer → Applications and Services Logs → Microsoft → Windows → Sysmon → Operational
>
> Filter by Event ID using the Filter Current Log pane, or query with `Get-WinEvent`:
> `Get-WinEvent -LogName 'Microsoft-Windows-Sysmon/Operational' -FilterHashtable @{ID=1} | Select-Object TimeCreated, Message`

---
## Flags & Options

> [!INFO]- Key Flags:
> | Flag | Description |
> |------|-------------|
> | `-i [config.xml]` | Install; optionally apply a config file at install time |
> | `-c <config.xml>` | Apply a new or updated config to a running Sysmon instance |
> | `-c` (no file) | Print the currently applied configuration |
> | `-u` | Uninstall Sysmon (removes the service and driver) |
> | `-s` | Print the schema for the current Sysmon version |
> | `-h <algorithms>` | Comma-separated hash algorithms: md5, sha1, sha256, imphash |
> | `-n` | Enable network connection logging (Event ID 3) |
> | `-l` | Enable image/module load logging (Event ID 7) |

---
## Configuration

Sysmon's behavior is controlled by an XML configuration file. Without a config, Sysmon logs everything — which generates enormous volume. A well-tuned config filters out noise and highlights high-fidelity signals.

**Community configurations (start here before writing custom):**
- SwiftOnSecurity config (broad coverage, widely used): https://github.com/SwiftOnSecurity/sysmon-config
- Olaf Hartong modular config (modular, maintained): https://github.com/olafhartong/sysmon-modular

**Config structure:** Rules use `include` or `exclude` conditions per event type. The default behavior (when no rule matches) is set per event type — either `default include` or `default exclude`.

```xml
<Sysmon schemaversion="4.30">
  <EventFiltering>
    <!-- Log all process creation events -->
    <RuleGroup name="ProcessCreate" groupRelation="or">
      <ProcessCreate onmatch="exclude">
        <!-- Exclude noisy legitimate processes -->
        <Image condition="is">C:\Windows\System32\svchost.exe</Image>
      </ProcessCreate>
    </RuleGroup>
    <!-- Log DLL loads — switch from include to exclude to log everything -->
    <RuleGroup name="ImageLoad" groupRelation="or">
      <ImageLoad onmatch="include">
        <ImageLoaded condition="contains">clr.dll</ImageLoaded>
        <ImageLoaded condition="contains">mscoree.dll</ImageLoaded>
      </ImageLoad>
    </RuleGroup>
  </EventFiltering>
</Sysmon>
```

---
## Event ID Reference

| Event ID | Event Type | Key Fields | Detection Use |
|----------|-----------|-----------|--------------|
| 1 | Process Create | `Image`, `CommandLine`, `ParentImage`, `ParentCommandLine`, `ProcessGuid`, `Hashes` | Execution chains, LOLBins, suspicious parent-child relationships |
| 2 | File Creation Time Changed | `Image`, `TargetFilename`, `CreationUtcTime` | Timestomping — attacker modifying file timestamps |
| 3 | Network Connection | `Image`, `SourceIp`, `DestinationIp`, `DestinationPort`, `Protocol` | C2 beaconing, lateral movement, reverse shells |
| 4 | Sysmon Service State Changed | `State` | Sysmon being stopped (anti-detection) |
| 5 | Process Terminated | `ProcessGuid`, `Image` | Short-lived processes (malware that executes and exits) |
| 6 | Driver Loaded | `ImageLoaded`, `Hashes`, `Signed`, `Signature` | Malicious kernel drivers (rootkits) |
| 7 | Image Loaded (DLL) | `Image`, `ImageLoaded`, `Signed`, `Hashes` | DLL hijacking, C# injection detection (clr.dll, mscoree.dll) |
| 8 | CreateRemoteThread | `SourceImage`, `TargetImage`, `StartAddress` | Process injection — a process creating a thread in another process |
| 9 | RawAccessRead | `Image`, `Device` | Credential dumping tools reading raw disk |
| 10 | Process Access | `SourceImage`, `TargetImage`, `GrantedAccess` | LSASS credential dumping (Mimikatz) — TargetImage ending in lsass.exe |
| 11 | File Created | `Image`, `TargetFilename` | File drops, malware writing to disk |
| 12 | Registry Object Created/Deleted | `Image`, `TargetObject` | Persistence via registry, attacker tool footprint |
| 13 | Registry Value Set | `Image`, `TargetObject`, `Details` | Run key persistence, config modification |
| 14 | Registry Object Renamed | `Image`, `TargetObject`, `NewName` | Registry key rename for stealth |
| 15 | File Create Stream Hash | `Image`, `TargetFilename`, `Hash` | ADS Zone.Identifier — file downloaded from internet |
| 16 | Sysmon Config State Changed | `Configuration`, `ConfigurationFileHash` | Config being updated or tampered with |
| 17 | Pipe Created | `PipeName`, `Image` | Named pipes — common C2 communication channel |
| 18 | Pipe Connected | `PipeName`, `Image` | Client connecting to a named pipe (lateral movement) |
| 19 | WMI Event Filter Activity | `Name`, `Query` | WMI-based persistence |
| 20 | WMI Event Consumer Activity | `Name`, `Destination` | WMI-based persistence execution |
| 21 | WMI Event Consumer to Filter | `Consumer`, `Filter` | WMI subscription binding (persistence) |
| 22 | DNS Query | `Image`, `QueryName`, `QueryResults` | Process resolving domains (C2 domains, exfil) |
| 23 | File Delete Archived | `Image`, `TargetFilename` | Attacker deleting malware artifacts |
| 25 | Process Tampering | `Image`, `Type` | Anti-tampering detection (process hollowing, herpaderping) |
| 26 | File Delete Logged | `Image`, `TargetFilename` | Log file or evidence deletion |

---
## Common Use Cases

### Detecting DLL Hijacking (Event ID 7)

DLL hijacking occurs when a malicious DLL is loaded in place of a legitimate one — exploiting Windows DLL search order. Sysmon Event ID 7 captures every DLL load, including which process loaded it and whether it was signed.

> [!INFO]- DLL Hijacking Detection:
> **Setup:** In your sysmon config, find the ImageLoad section and change `onmatch="include"` to `onmatch="exclude"` temporarily to log all DLL loads, then apply the config:
> `sysmon.exe -c sysmon-config.xml`
>
> **In Event Viewer:** Filter for Event ID 7, then use Find (Ctrl+F) to search for the suspected process name or DLL name.
>
> **Indicators to look for:**
> - A DLL loaded from a non-standard path (e.g., `C:\Users\...\appdata\` instead of `C:\Windows\System32\`)
> - `Signed: false` on a DLL that is expected to be Microsoft-signed
> - A DLL with the correct name but loaded before the legitimate system path version

---

### Detecting Unmanaged PowerShell / C# Assembly Injection (Event IDs 7 and 8)

C# is a "managed" language — it requires the .NET Common Language Runtime (CLR) to execute. The CLR is loaded into a process via `clr.dll` and `mscoree.dll`. If these DLLs appear in a process that would never normally run managed code (e.g., `notepad.exe`, `spoolsv.exe`), it indicates that a .NET assembly was injected into that process.

Execute-assembly (used in Cobalt Strike and other C2 frameworks) and PSInject are common attack tools that exploit this.

> [!INFO]- Injection Detection via Event ID 7:
> Filter Event ID 7 for DLL loads matching:
> - `clr.dll` — Core CLR runtime
> - `clrjit.dll` — CLR JIT compiler
> - `mscoree.dll` — .NET framework bootstrapper
>
> A process like `spoolsv.exe` loading `clr.dll` is a strong injection indicator.
>
> **PowerShell injection demo (PSInject):**
> `powershell -ep bypass`
> `Import-Module .\Invoke-PSInject.ps1`
> `Invoke-PSInject -ProcId <PID-of-target> -PoshCode "<base64-encoded-PS-command>"`
>
> PSInject project: https://github.com/EmpireProject/PSInject
>
> **Complement with Event ID 8 (CreateRemoteThread):** If a process creates a thread in another process, Event ID 8 fires. SourceImage + TargetImage together reveal the injector and the victim process.

---

### Detecting Credential Dumping via LSASS (Event ID 10)

Mimikatz and similar tools dump credentials by opening a handle to the `lsass.exe` process (the Local Security Authority Subsystem Service) with `PROCESS_VM_READ` access. Sysmon Event ID 10 (Process Access) captures this.

> [!INFO]- LSASS Dumping Detection:
> Filter for Event ID 10 where `TargetImage` ends with `lsass.exe`.
>
> Key indicators:
> - `TargetImage: C:\Windows\System32\lsass.exe`
> - `SourceImage` from a suspicious or unexpected path (temp folder, user profile)
> - `GrantedAccess: 0x1010` or `0x1410` — these masks include `PROCESS_VM_READ`
> - `SourceUser` and `TargetUser` mismatch
>
> **Mimikatz execution for reference:**
> `mimikatz.exe`
> `privilege::debug`
> `sekurlsa::logonpasswords`
>
> Mimikatz project: https://github.com/gentilkiwi/mimikatz

---

### Detecting Suspicious Parent-Child Process Relationships (Event ID 1)

Certain parent-child process relationships are normal; others are red flags. For example, `Word.exe` spawning `cmd.exe` is a common malicious macro indicator. `svchost.exe` spawning `powershell.exe` is unusual.

> [!INFO]- Parent-Child Relationship Detection:
> Filter Event ID 1 and add `ParentImage` and `ParentCommandLine` as visible fields.
>
> Suspicious combinations to hunt for:
> | Parent | Child | Suspicion |
> |--------|-------|-----------|
> | `winword.exe` / `excel.exe` | `cmd.exe`, `powershell.exe`, `wscript.exe` | Macro execution |
> | `svchost.exe` | `cmd.exe`, `powershell.exe` | Unusual service host behavior |
> | `explorer.exe` | `powershell.exe -enc ...` | Encoded command execution from shell |
> | `spoolsv.exe` | `cmd.exe` | Print Spooler exploitation (PrintNightmare) |
>
> Common parent-child reference: https://twitter.com/SBousseaden/status/1195373669930983424

---
## Related Techniques
- [[Threat Hunting]]

## Related Playbooks
- [[Windows Pentest Playbook]]

---
## References / Images
- Sysmon Download and Documentation: https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon
- SwiftOnSecurity Sysmon Config: https://github.com/SwiftOnSecurity/sysmon-config
- Olaf Hartong Sysmon Modular: https://github.com/olafhartong/sysmon-modular
- PSInject Project: https://github.com/EmpireProject/PSInject
- Mimikatz: https://github.com/gentilkiwi/mimikatz
- Sysmon for Linux: https://github.com/Sysinternals/SysmonForLinux
