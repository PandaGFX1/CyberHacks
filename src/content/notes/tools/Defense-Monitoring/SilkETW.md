---
title: "SilkETW"
category: "tools"
tags: []
excerpt: "SilkETW is an open-source C# tool from Mandiant (FireEye) that provides a flexible interface for consuming and..."
date: "2026-04-17"
---

---
## Overview
SilkETW is an open-source C# tool from Mandiant (FireEye) that provides a flexible interface for consuming and analyzing ETW (Event Tracing for Windows) events in real time. It subscribes to ETW providers, captures event data, and outputs it to JSON files or forwards it to Windows Event Log for ingestion by SIEMs. SilkETW fills the gap between raw `logman.exe` trace sessions and fully featured commercial EDRs — enabling defenders and threat hunters to tap into powerful ETW providers like `Microsoft-Windows-Kernel-Process` and `Microsoft-Windows-DotNETRuntime` without building a full ETW consumer from scratch.

## Target / Context
- Threat hunters capturing ETW telemetry not surfaced by Sysmon or standard Windows logs
- Blue teams building detections for PPID spoofing, .NET assembly injection, and living-off-the-land techniques
- SOC labs and incident response environments needing host-level ETW capture

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation:</span></summary>
<div class="callout-body">

SilkETW GitHub: https://github.com/mandiant/SilkETW

SilkETW is a compiled .NET binary — download the release from the GitHub releases page.
.NET Framework 4.5 or later is required.

Companion tool **SilkService** allows SilkETW output to be consumed by Windows Event Viewer for SIEM ingestion.

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Syntax:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>SilkETW.exe -t <type> -pn <provider-name> [-uk <keywords>] -ot <output-type> -p <output-path></code></li>
</ul>

| Flag | Description |
|------|-------------|
| <code>-t user</code> | Trace user-mode ETW providers |
| <code>-t kernel</code> | Trace kernel-mode ETW providers |
| <code>-pn <name></code> | Provider name (e.g., <code>Microsoft-Windows-Kernel-Process</code>) |
| <code>-uk <hex></code> | Keyword bitmask to filter which events are captured (optional; omit for all events) |
| <code>-ot file</code> | Output to a JSON file |
| <code>-ot eventlog</code> | Output to Windows Event Log (for SIEM ingestion via SilkService) |
| <code>-p <path></code> | Output file path (for <code>-ot file</code>) |

</div>
</details>

---
## Flags & Options

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Flags & Options:</span></summary>
<div class="callout-body">

| Flag | Description | Example |
|------|-------------|---------|
| <code>-t</code> | Trace type: <code>user</code> or <code>kernel</code> | <code>-t user</code> |
| <code>-pn</code> | Provider name string | <code>-pn Microsoft-Windows-DotNETRuntime</code> |
| <code>-uk</code> | Keyword filter bitmask (hex) | <code>-uk 0x2038</code> |
| <code>-ot</code> | Output type: <code>file</code> or <code>eventlog</code> | <code>-ot file</code> |
| <code>-p</code> | Output path for file output | <code>-p C:\windows\temp\etw.json</code> |
| <code>-f</code> | Filter events by field value (e.g., process name) | <code>-f ProcessName,powershell.exe</code> |
| <code>-l</code> | Log level filter | <code>-l verbose</code> |

</div>
</details>

---
## Common Use Cases

### Detecting PPID Spoofing via Kernel Process Events

PPID (Parent Process ID) spoofing makes a malicious process appear to be spawned by a legitimate parent. Sysmon records the reported parent, which can be forged. The `Microsoft-Windows-Kernel-Process` provider records kernel-level process creation events that reflect the true process relationship.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Kernel Process Capture:</span></summary>
<div class="callout-body">

First confirm the provider GUID with logman:
<ul class="callout-list">
  <li><code>logman.exe query providers | findstr "Process"</code></li>
</ul>

Capture events:
<ul class="callout-list">
  <li><code>SilkETW.exe -t user -pn Microsoft-Windows-Kernel-Process -ot file -p C:\windows\temp\etw.json</code></li>
</ul>

Review the JSON output for <code>ProcessCreate</code> events. Compare the reported ParentPID against the true kernel-level parent to detect spoofing.

See [Event Tracing for Windows (ETW)](/knowledge/Operating-Systems/Windows/Event-Tracing-for-Windows-ETW) for the PPID spoofing detection context.

</div>
</details>

---

### Detecting In-Memory .NET Assembly Loading

The `execute-assembly` technique (used by Cobalt Strike and other C2 frameworks) loads .NET assemblies directly into memory without writing a file to disk. The `Microsoft-Windows-DotNETRuntime` provider exposes assembly loading and JIT compilation events that reveal this activity.

The keyword bitmask `0x2038` captures the most useful subset:
- **LoaderKeyword** — assembly load events (which assemblies are loaded and from where)
- **JitKeyword** — JIT compilation events (methods being compiled from IL to native code)
- **InteropKeyword** — managed-to-unmanaged code interop events
- **NGenKeyword** — pre-compiled assembly usage (attackers evading JIT-based detection)

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>.NET Runtime Capture:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>SilkETW.exe -t user -pn Microsoft-Windows-DotNETRuntime -uk 0x2038 -ot file -p C:\windows\temp\etw.json</code></li>
</ul>

Review the output for unexpected assembly names, especially assemblies loaded by processes that should not run managed code (e.g., <code>notepad.exe</code>, <code>explorer.exe</code>).

Well-known BYOL tool to test with: <code>.\Seatbelt.exe TokenPrivileges</code>
Seatbelt: https://github.com/GhostPack/Seatbelt

</div>
</details>

---

### Forwarding Events to Windows Event Log (SilkService)

SilkService is the companion service to SilkETW. When SilkETW outputs to `eventlog` mode, SilkService ingests those events into Windows Event Viewer — making them available for Sysmon-style querying and SIEM agent pickup.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Event Log Output Mode:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>SilkETW.exe -t user -pn Microsoft-Windows-Kernel-Process -ot eventlog</code></li>
</ul>

After SilkService is running, events appear under:
<ul class="callout-list">
  <li><code>Applications and Services Logs → SilkETW</code></li>
</ul>

From there, they can be queried with <code>Get-WinEvent</code> or forwarded to Elastic/Splunk.

</div>
</details>

---
## Related Techniques
- [Threat Hunting](/knowledge/Defensive-Security/Threat-Hunting)

## Related Playbooks
-

---
## References / Images
- SilkETW GitHub (Mandiant): https://github.com/mandiant/SilkETW
- Threat Hunting with ETW and HELK (SilkETW walkthrough): https://medium.com/threat-hunters-forge/threat-hunting-with-etw-events-and-helk-part-1-installing-silketw-6eb74815e4a0
- Seatbelt (GhostPack): https://github.com/GhostPack/Seatbelt
