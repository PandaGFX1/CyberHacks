Tags: #Status/In-Progress #Type/Tool #Context/Linux #Context/Redteam

---
## Overview
Metasploit is the world's most widely used penetration testing framework. It supports information gathering, scanning, exploitation, payload generation, post-exploitation, and reporting. The core product is **Metasploit Framework** — an open-source CLI used for CTF and pentest work. Metasploit Pro adds a GUI and task automation for enterprise use.

The framework is organized into modules — each module is a self-contained unit targeting a specific vulnerability, service, or technique. Modules are chained together during an engagement: auxiliary modules for scanning, exploit modules for gaining access, payload modules for establishing sessions, and post modules for further actions after compromise.

## Target / Context
Any networked system — supports Windows, Linux, web applications, mobile, and more. Core tool for the exploitation and post-exploitation phases of any engagement.

---
## Installation

> [!INFO]- Installation Commands:
> `sudo apt install metasploit-framework`
> Initialize the database before first use:
> `systemctl start postgresql`
> `msfdb init`

---
## Basic Usage

> [!INFO]- Basic Usage:
> Start the console: `msfconsole`
> Check database connection: `db_status`
>
> See [[MSFConsole]] for full navigation and exploitation workflow.
> See [[MSFVenom]] for standalone payload generation.
> See [[Meterpreter]] for post-exploitation commands.

---
## Flags & Options

> [!INFO]- Core Module Parameters:
> | Parameter | Description | Example |
> |-----------|-------------|---------|
> | `RHOSTS` | Target IP, CIDR range, range, or file path | `set RHOSTS 10.10.10.1` / `set RHOSTS file:/path` |
> | `RPORT` | Target port | `set RPORT 445` |
> | `PAYLOAD` | Payload to use with the exploit module | `set PAYLOAD windows/x64/meterpreter/reverse_tcp` |
> | `LHOST` | Attacker IP (your machine) | `set LHOST 10.10.10.5` |
> | `LPORT` | Attacker listening port | `set LPORT 4444` |
> | `SESSION` | Session ID for post-exploitation modules | `set SESSION 1` |

---
## Common Use Cases

### Module Types

> [!INFO]- Module Reference:
> | Module | Description |
> |--------|-------------|
> | Auxiliary | Scanners, crawlers, fuzzers — information gathering and support modules |
> | Encoders | Encode payloads to evade signature-based detection |
> | Evasion | Attempt to bypass antivirus and endpoint security software |
> | Exploits | Hold and deliver exploits against specific vulnerabilities |
> | NOPs | No Operation instructions — used for padding and shellcode alignment |
> | Payloads | Code executed on the target after successful exploitation |
> | Post | Post-exploitation modules — privilege escalation, persistence, data gathering |

### Payload Types

> [!INFO]- Payload Reference:
> | Type | Description |
> |------|-------------|
> | Adapters | Wraps single payloads into different formats (e.g., PowerShell adapter wraps a shell payload) |
> | Singles | Self-contained; no additional download or stager needed (e.g., add a user, execute a command) |
> | Stagers | Establishes the connection channel between Metasploit and the target for staged delivery |
> | Stages | The actual payload downloaded by the stager after initial connection is established |
>
> **Inline vs Staged payload identification:**
> - Inline (single `_`): `generic/shell_reverse_tcp` — self-contained, no stager required
> - Staged (uses `/`): `windows/x64/shell/reverse_tcp` — requires stager to fetch the stage
>
> Use inline payloads when the attack vector has size restrictions or a staged connection isn't reliable.
> Use staged payloads when you want a smaller initial footprint and a full Meterpreter session.

---
## Related Techniques
-

## Related Playbooks
- [[Red Team]]

---
## References / Images
- Metasploit Framework Docs: https://adfoster-r7.github.io/metasploit-framework/
- Metasploit Unleashed: https://www.offsec.com/metasploit-unleashed/
- Working with Payloads: https://docs.rapid7.com/metasploit/working-with-payloads/
- LSASS Memory (hashdump context): https://redcanary.com/threat-detection-report/techniques/lsass-memory/
