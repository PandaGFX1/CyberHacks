#Status/In-Progress #Type/Tool #Context/Blueteam #Context/Windows

---
## Overview
SilkETW is an open-source C# tool from Mandiant (FireEye) that provides a flexible interface for consuming and analyzing ETW (Event Tracing for Windows) events in real time. It subscribes to ETW providers, captures event data, and outputs it to JSON files or forwards it to Windows Event Log for ingestion by SIEMs. SilkETW fills the gap between raw `logman.exe` trace sessions and fully featured commercial EDRs — enabling defenders and threat hunters to tap into powerful ETW providers like `Microsoft-Windows-Kernel-Process` and `Microsoft-Windows-DotNETRuntime` without building a full ETW consumer from scratch.

## Target / Context
- Threat hunters capturing ETW telemetry not surfaced by Sysmon or standard Windows logs
- Blue teams building detections for PPID spoofing, .NET assembly injection, and living-off-the-land techniques
- SOC labs and incident response environments needing host-level ETW capture

---
## Installation

> [!INFO]- Installation:
> SilkETW GitHub: https://github.com/mandiant/SilkETW
>
> SilkETW is a compiled .NET binary — download the release from the GitHub releases page.
> .NET Framework 4.5 or later is required.
>
> Companion tool **SilkService** allows SilkETW output to be consumed by Windows Event Viewer for SIEM ingestion.

---
## Basic Usage

> [!INFO]- Basic Syntax:
> `SilkETW.exe -t <type> -pn <provider-name> [-uk <keywords>] -ot <output-type> -p <output-path>`
>
> | Flag | Description |
> |------|-------------|
> | `-t user` | Trace user-mode ETW providers |
> | `-t kernel` | Trace kernel-mode ETW providers |
> | `-pn <name>` | Provider name (e.g., `Microsoft-Windows-Kernel-Process`) |
> | `-uk <hex>` | Keyword bitmask to filter which events are captured (optional; omit for all events) |
> | `-ot file` | Output to a JSON file |
> | `-ot eventlog` | Output to Windows Event Log (for SIEM ingestion via SilkService) |
> | `-p <path>` | Output file path (for `-ot file`) |

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-t` | Trace type: `user` or `kernel` | `-t user` |
> | `-pn` | Provider name string | `-pn Microsoft-Windows-DotNETRuntime` |
> | `-uk` | Keyword filter bitmask (hex) | `-uk 0x2038` |
> | `-ot` | Output type: `file` or `eventlog` | `-ot file` |
> | `-p` | Output path for file output | `-p C:\windows\temp\etw.json` |
> | `-f` | Filter events by field value (e.g., process name) | `-f ProcessName,powershell.exe` |
> | `-l` | Log level filter | `-l verbose` |

---
## Common Use Cases

### Detecting PPID Spoofing via Kernel Process Events

PPID (Parent Process ID) spoofing makes a malicious process appear to be spawned by a legitimate parent. Sysmon records the reported parent, which can be forged. The `Microsoft-Windows-Kernel-Process` provider records kernel-level process creation events that reflect the true process relationship.

> [!INFO]- Kernel Process Capture:
> First confirm the provider GUID with logman:
> `logman.exe query providers | findstr "Process"`
>
> Capture events:
> `SilkETW.exe -t user -pn Microsoft-Windows-Kernel-Process -ot file -p C:\windows\temp\etw.json`
>
> Review the JSON output for `ProcessCreate` events. Compare the reported ParentPID against the true kernel-level parent to detect spoofing.
>
> See [[Event Tracing for Windows (ETW)]] for the PPID spoofing detection context.

---

### Detecting In-Memory .NET Assembly Loading

The `execute-assembly` technique (used by Cobalt Strike and other C2 frameworks) loads .NET assemblies directly into memory without writing a file to disk. The `Microsoft-Windows-DotNETRuntime` provider exposes assembly loading and JIT compilation events that reveal this activity.

The keyword bitmask `0x2038` captures the most useful subset:
- **LoaderKeyword** — assembly load events (which assemblies are loaded and from where)
- **JitKeyword** — JIT compilation events (methods being compiled from IL to native code)
- **InteropKeyword** — managed-to-unmanaged code interop events
- **NGenKeyword** — pre-compiled assembly usage (attackers evading JIT-based detection)

> [!INFO]- .NET Runtime Capture:
> `SilkETW.exe -t user -pn Microsoft-Windows-DotNETRuntime -uk 0x2038 -ot file -p C:\windows\temp\etw.json`
>
> Review the output for unexpected assembly names, especially assemblies loaded by processes that should not run managed code (e.g., `notepad.exe`, `explorer.exe`).
>
> Well-known BYOL tool to test with: `.\Seatbelt.exe TokenPrivileges`
> Seatbelt: https://github.com/GhostPack/Seatbelt

---

### Forwarding Events to Windows Event Log (SilkService)

SilkService is the companion service to SilkETW. When SilkETW outputs to `eventlog` mode, SilkService ingests those events into Windows Event Viewer — making them available for Sysmon-style querying and SIEM agent pickup.

> [!INFO]- Event Log Output Mode:
> `SilkETW.exe -t user -pn Microsoft-Windows-Kernel-Process -ot eventlog`
>
> After SilkService is running, events appear under:
> `Applications and Services Logs → SilkETW`
>
> From there, they can be queried with `Get-WinEvent` or forwarded to Elastic/Splunk.

---
## Related Techniques
- [[Threat Hunting]]

## Related Playbooks
-

---
## References / Images
- SilkETW GitHub (Mandiant): https://github.com/mandiant/SilkETW
- Threat Hunting with ETW and HELK (SilkETW walkthrough): https://medium.com/threat-hunters-forge/threat-hunting-with-etw-events-and-helk-part-1-installing-silketw-6eb74815e4a0
- Seatbelt (GhostPack): https://github.com/GhostPack/Seatbelt
