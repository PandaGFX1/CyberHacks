#Status/In-Progress #Type/Knowledge #Context/Windows #publish-me

---
## Overview
Event Tracing for Windows (ETW) is a high-performance, kernel-level tracing facility built into Windows that enables dynamic generation, collection, and analysis of events from both user-mode applications and kernel-mode drivers. ETW predates Windows Event Logs and operates at a lower level — it is the underlying mechanism that powers Sysmon, Windows Defender, Windows Firewall, and many other security-relevant subsystems. For defenders, ETW provides access to rich telemetry that the standard Windows Security log does not expose: system calls, DLL loads, .NET assembly execution, process and thread creation at the kernel level, and much more.

[[Assets/Images/Event Tracing for Windows Architecture Diagram.png|ETW Architecture Diagram]]

---

## Terminology
| Term | Definition |
|------|------------|
| Provider | A component that generates and publishes ETW events; identified by a GUID and name |
| Controller | A process that starts, stops, and configures trace sessions; enables/disables providers |
| Consumer | A process that subscribes to a trace session and receives events for processing or storage |
| Trace Session | An active ETW session that connects enabled providers to a consumer; has configurable buffers and a log destination |
| Channel | A logical event destination that organizes events; only channeled events can be consumed via the Windows Event Log |
| ETL File | Event Trace Log; binary file output from a trace session; used for offline analysis and forensics |
| GUID | Globally Unique Identifier; used to identify ETW providers since friendly names are aliases |
| Level | Filtering threshold for event verbosity (1=Critical, 2=Error, 3=Warning, 4=Informational, 5=Verbose) |
| Keywords | Bitmask flags that further filter which events within a provider are captured |
| PPL | Protected Process Light; a Windows security feature that restricts which processes can interact with a protected service |
| MOF | Managed Object Format; used by legacy ETW providers to define event schemas |

---
## Core Concepts

### ETW Architecture

ETW operates through four primary component types that work together to produce and consume events:

| Component | Role | Example |
|-----------|------|---------|
| Controllers | Manage trace sessions — start, stop, enable, and disable providers | `logman.exe`, Performance Monitor |
| Providers | Applications and drivers that generate events and publish them to ETW | `Microsoft-Windows-Kernel-Process`, `Microsoft-Windows-DotNETRuntime` |
| Consumers | Subscribe to sessions and receive events for processing, display, or storage | Event Viewer, SilkETW, custom apps using the ETW API |
| Channels | Logical containers that organize events; enable selective subscription | `Security`, `Operational`, `Diagnostic`, `Debug` |

ETL files serve as durable storage for trace output, enabling offline forensic analysis and long-term archiving independent of live system state.

---

### ETW Provider Types

| Provider Type | Description | Use Case |
|--------------|-------------|----------|
| MOF (Managed Object Format) | Legacy providers that define event schemas using MOF; common in older Windows components | Kernel-level events from older subsystems |
| WPP (Windows Software Trace Preprocessor) | Uses source code macros and annotations; low-level kernel-mode tracing; primarily for driver debugging | Kernel driver debugging and low-level component tracing |
| Manifest-Based | Rely on XML manifest files to define event structure; most modern Windows components use this type | Dynamic, self-describing event generation in modern Windows services |
| TraceLogging | Simplified API with minimal code overhead; self-describing events without a separate manifest | Modern application telemetry, Defender, Windows components |

---

### Trace Session Structure

When you view a trace session (e.g., via `logman.exe query "EventLog-System" -ets`), the critical data for each subscribed provider is:

| Field | Significance |
|-------|-------------|
| Provider Name / GUID | Identifies what is being traced |
| Level | Maximum severity captured (higher number = more verbose) |
| Keywords Any | Bitmask controlling which event subcategories are captured |

Adjusting Keywords allows fine-grained control over event volume — capturing only the subset relevant to a specific hunt rather than all events from a provider.

---

### Important ETW Providers for Security

| Provider | GUID / Path | What it Exposes |
|----------|------------|-----------------|
| `Microsoft-Windows-Kernel-Process` | — | Process and thread creation and termination at the kernel level; more reliable than Sysmon for detecting PPID spoofing |
| `Microsoft-Windows-Kernel-File` | — | File system operations at the kernel level; captures file reads and writes before user-mode filtering |
| `Microsoft-Windows-DotNETRuntime` | — | .NET assembly loading, JIT compilation, GC events; critical for detecting execute-assembly and BYOL attacks |
| `Microsoft-Windows-Threat-Intelligence` | — | Deep endpoint telemetry used by EDR products; requires PPL — see Restricted Providers below |
| `OpenSSH` | — | SSH session events on Windows when OpenSSH is installed |
| `Microsoft-Windows-WinRM` | — | WinRM session events; detect remote PowerShell and lateral movement |
| `Microsoft-Windows-Winlogon` | — | Logon/logoff events at the service layer; `Diagnostic` and `Operational` channels |

---

### Restricted Providers

Some ETW providers are restricted to processes running with specific privileges. The most significant is:

**`Microsoft-Windows-Threat-Intelligence`**
- Provides deep telemetry on process memory operations, DLL injection attempts, process hollowing, and other advanced techniques
- Requires **Protected Process Light (PPL)** rights — the consuming process must be marked as a PPL before Windows will allow it to subscribe
- Anti-malware vendors go through a lengthy certification process to obtain PPL status from Microsoft
- Workarounds to access this provider without PPL exist but require elevated privileges

Reference: https://specterops.io/blog/2023/03/15/uncovering-windows-events/

---

### Interaction via logman

`logman.exe` is the built-in Windows controller for managing ETW trace sessions.

> [!INFO]- logman Commands:
> | Command | Description |
> |---------|-------------|
> | `logman.exe query -ets` | List all currently active trace sessions — shows name, log location, and subscribed providers |
> | `logman.exe query "EventLog-System" -ets` | Inspect a specific active session (provider GUIDs, keywords, levels) |
> | `logman.exe query providers` | List all registered ETW providers and their GUIDs |
> | `logman.exe query providers \| findstr "Winlogon"` | Filter the provider list by name keyword |
> | `logman.exe query providers Microsoft-Windows-Winlogon` | Show a specific provider's keywords, levels, and processes currently using it |
>
> The `logman.exe query providers` output is large — use `findstr` to narrow to relevant providers before examining them.

---

### GUI Alternative — Performance Monitor

Performance Monitor (`perfmon.msc`) provides a graphical interface for the same functionality as `logman.exe`:
- View all active trace sessions by double-clicking
- Start, stop, and modify sessions without command-line syntax
- Visualize event rates over time

Useful for quick exploration; `logman.exe` is preferred for scripting and automation.

---

### Detection Examples Using ETW

#### Detecting PPID Spoofing (Fake Parent Process)

Process creation normally reflects the true parent. Attackers use PPID spoofing to make malicious processes appear to be spawned by legitimate parents (e.g., making `cmd.exe` appear to be spawned by `spoolsv.exe` when PowerShell actually launched it).

Sysmon Event ID 1 records the reported parent — which can be forged. ETW via `Microsoft-Windows-Kernel-Process` records the actual kernel-level parent, making it harder to spoof.

**PPID spoofing demo using psgetsystem:**
```
powershell -ep bypass
Import-Module .\psgetsys.ps1
[MyProcess]::CreateProcessFromParent(<PID-of-spoolsv.exe>, "C:\Windows\System32\cmd.exe", "")
```
Sysmon will show `spoolsv.exe` as parent; ETW kernel process events reveal the true PowerShell parent.

Capture with SilkETW:
`SilkETW.exe -t user -pn Microsoft-Windows-Kernel-Process -ot file -p C:\windows\temp\etw.json`

psgetsystem project: https://github.com/decoder-it/psgetsystem

---

#### Detecting Malicious .NET Assembly Loading (execute-assembly / BYOL)

Attackers using "Bring Your Own Land" (BYOL) techniques load .NET assemblies entirely in memory using frameworks like Cobalt Strike's `execute-assembly`. This bypasses file-based AV but leaves traces in ETW.

The `Microsoft-Windows-DotNETRuntime` provider exposes:

| Keyword | Value | What it Captures |
|---------|-------|-----------------|
| JitKeyword | Part of `0x2038` | JIT compilation events — methods being compiled to native code |
| InteropKeyword | Part of `0x2038` | Managed code interacting with unmanaged/native APIs |
| LoaderKeyword | Part of `0x2038` | Assembly loading events — which .NET assemblies are loaded and from where |
| NGenKeyword | Part of `0x2038` | Pre-compiled (NGen) .NET assembly usage — attackers using pre-compiled assemblies to avoid JIT-related detection |

Capture the subset `0x2038` keywords with SilkETW:
`SilkETW.exe -t user -pn Microsoft-Windows-DotNETRuntime -uk 0x2038 -ot file -p C:\windows\temp\etw.json`

Well-known BYOL tool: **Seatbelt** (GhostPack) — a .NET reconnaissance tool commonly used post-compromise:
`.\Seatbelt.exe TokenPrivileges`

Seatbelt loaded in-memory via execute-assembly will still generate DotNETRuntime ETW events, making it detectable even without a file on disk.

Reference: https://medium.com/threat-hunters-forge/threat-hunting-with-etw-events-and-helk-part-1-installing-silketw-6eb74815e4a0

---
## Related Concepts
- [[Windows Event Logs]]
- [[Windows Fundamentals]]
- [[Threat Hunting]]
- [[Incident Response Fundamentals]]

## Related Techniques
-

## Related Tools
- [[Sysmon]]
- [[SilkETW]]
- [[Elastic Stack]]

---
## References / Images
- [[Assets/Images/Event Tracing for Windows Architecture Diagram.png|ETW Architecture Diagram]]
- SpecterOps — Uncovering Windows Events (PPL and Threat Intelligence provider): https://specterops.io/blog/2023/03/15/uncovering-windows-events/
- SilkETW and ETW threat hunting (HELK): https://medium.com/threat-hunters-forge/threat-hunting-with-etw-events-and-helk-part-1-installing-silketw-6eb74815e4a0
- psgetsystem (PPID spoofing): https://github.com/decoder-it/psgetsystem
- Seatbelt (GhostPack): https://github.com/GhostPack/Seatbelt
- Common parent-child process reference: https://twitter.com/SBousseaden/status/1195373669930983424
