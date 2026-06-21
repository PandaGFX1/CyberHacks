---
title: "Metasploit"
category: "tools"
tags: []
excerpt: "Metasploit is the world's most widely used penetration testing framework. It supports information gathering, scanning,..."
date: "2026-03-29"
---

---
## Overview
Metasploit is the world's most widely used penetration testing framework. It supports information gathering, scanning, exploitation, payload generation, post-exploitation, and reporting. The core product is **Metasploit Framework** — an open-source CLI used for CTF and pentest work. Metasploit Pro adds a GUI and task automation for enterprise use.

The framework is organized into modules — each module is a self-contained unit targeting a specific vulnerability, service, or technique. Modules are chained together during an engagement: auxiliary modules for scanning, exploit modules for gaining access, payload modules for establishing sessions, and post modules for further actions after compromise.

## Target / Context
Any networked system — supports Windows, Linux, web applications, mobile, and more. Core tool for the exploitation and post-exploitation phases of any engagement.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo apt install metasploit-framework</code></li>
</ul>
Initialize the database before first use:
<ul class="callout-list">
  <li><code>systemctl start postgresql</code></li>
  <li><code>msfdb init</code></li>
</ul>

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

Start the console: <code>msfconsole</code>
Check database connection: <code>db_status</code>

See [MSFConsole](/tools/Frameworks/Metasploit/MSFConsole) for full navigation and exploitation workflow.
See [MSFVenom](/tools/Frameworks/Metasploit/MSFVenom) for standalone payload generation.
See [Meterpreter](/tools/Frameworks/Metasploit/Meterpreter) for post-exploitation commands.

</div>
</details>

---
## Flags & Options

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Core Module Parameters:</span></summary>
<div class="callout-body">

| Parameter | Description | Example |
|-----------|-------------|---------|
| <code>RHOSTS</code> | Target IP, CIDR range, range, or file path | <code>set RHOSTS 10.10.10.1</code> / <code>set RHOSTS file:/path</code> |
| <code>RPORT</code> | Target port | <code>set RPORT 445</code> |
| <code>PAYLOAD</code> | Payload to use with the exploit module | <code>set PAYLOAD windows/x64/meterpreter/reverse_tcp</code> |
| <code>LHOST</code> | Attacker IP (your machine) | <code>set LHOST 10.10.10.5</code> |
| <code>LPORT</code> | Attacker listening port | <code>set LPORT 4444</code> |
| <code>SESSION</code> | Session ID for post-exploitation modules | <code>set SESSION 1</code> |

</div>
</details>

---
## Common Use Cases

### Module Types

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Module Reference:</span></summary>
<div class="callout-body">

| Module | Description |
|--------|-------------|
| Auxiliary | Scanners, crawlers, fuzzers — information gathering and support modules |
| Encoders | Encode payloads to evade signature-based detection |
| Evasion | Attempt to bypass antivirus and endpoint security software |
| Exploits | Hold and deliver exploits against specific vulnerabilities |
| NOPs | No Operation instructions — used for padding and shellcode alignment |
| Payloads | Code executed on the target after successful exploitation |
| Post | Post-exploitation modules — privilege escalation, persistence, data gathering |

</div>
</details>

### Payload Types

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Payload Reference:</span></summary>
<div class="callout-body">

| Type | Description |
|------|-------------|
| Adapters | Wraps single payloads into different formats (e.g., PowerShell adapter wraps a shell payload) |
| Singles | Self-contained; no additional download or stager needed (e.g., add a user, execute a command) |
| Stagers | Establishes the connection channel between Metasploit and the target for staged delivery |
| Stages | The actual payload downloaded by the stager after initial connection is established |

**Inline vs Staged payload identification:**
- Inline (single <code>_</code>): <code>generic/shell_reverse_tcp</code> — self-contained, no stager required
- Staged (uses <code>/</code>): <code>windows/x64/shell/reverse_tcp</code> — requires stager to fetch the stage

Use inline payloads when the attack vector has size restrictions or a staged connection isn't reliable.
Use staged payloads when you want a smaller initial footprint and a full Meterpreter session.

</div>
</details>

---
## Related Techniques
-

## Related Playbooks
- [Red Team](/playbooks/Methodologies/Red-Team)

---
## References / Images
- Metasploit Framework Docs: https://adfoster-r7.github.io/metasploit-framework/
- Metasploit Unleashed: https://www.offsec.com/metasploit-unleashed/
- Working with Payloads: https://docs.rapid7.com/metasploit/working-with-payloads/
- LSASS Memory (hashdump context): https://redcanary.com/threat-detection-report/techniques/lsass-memory/
