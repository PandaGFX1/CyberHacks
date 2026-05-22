Tags: #Status/In-Progress #Type/Tool #Context/Blueteam

---
## Overview
CAPA (Common Analysis Platform for Artifacts) is a tool developed by FireEye Mandiant that identifies capabilities present in executable files. It analyzes PE files, ELF binaries, .NET modules, shellcode, and sandbox reports against a ruleset describing common behaviors — revealing what a program can do (network communication, file manipulation, process injection, etc.) without manual reverse engineering. Core tool for malware analysis and threat hunting.

---
## Target / Context
Executable files suspected of being malicious. Primarily used on Windows for analyzing PE binaries. Output maps to MITRE ATT&CK, MAEC, and MBC frameworks.

---
## Installation

> [!INFO]- Installation Commands:
> Download from: https://github.com/mandiant/capa/releases
> Place `capa.exe` in working directory or add to PATH

---
## Basic Usage

> [!INFO]- Basic Usage:
> `capa <binary>`
> `capa.exe .\cryptbot.bin`
> `capa cryptbot.bin`
> `capa -h`

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-h` | Display help | `capa -h` |
> | `-v` | Increase verbosity | `capa.exe .\cryptbot.bin -v` |
> | `-vv` | Maximum verbosity | `capa.exe .\cryptbot.bin -vv` |
> | `-j` | Output as JSON file | `capa -j -vv .\cryptbot.bin > output.json` |

---
## Common Use Cases

### Basic Analysis

> [!INFO]- Commands:
> `capa.exe .\cryptbot.bin`
> `capa.exe .\cryptbot.bin -v > cryptbot_v.txt`
> `capa.exe .\cryptbot.bin -vv > cryptbot_vv.txt`

### JSON Output for CAPA Explorer Web

> [!INFO]- Commands:
> `capa -j -vv .\cryptbot.bin > cryptbot_vv.json`
> Upload JSON to CAPA Explorer Web (available online and offline) for visual analysis.

---
## Interpreting Results

### First Block — File Information
| Field | Description |
|-------|-------------|
| Cryptographic Algorithms | Hash values of the file |
| Analysis | Type of analysis performed (static/dynamic) |
| OS | Identified target OS and applicable capabilities |
| Arch | Binary architecture (x86, x64, etc.) |
| Path | File location |

### MITRE ATT&CK Mapping
Format: `ATT&CK Tactic::ATT&CK Technique::Technique Identifier`
Sub-technique format: `ATT&CK Tactic::Technique::Sub-Technique::Identifier[.]Sub-ID`

### MAEC (Malware Attribute Enumeration and Characterization)
Encodes and communicates complex malware details including behaviors, artifacts, and interconnections.

| MAEC Value | Description |
|------------|-------------|
| Launcher | Triggers actions — dropping payloads, activating persistence, connecting to C2, executing functions |
| Downloader | Downloads and executes other files — fetching payloads, pulling updates, executing secondary stages |

### MBC (Malware Behavior Catalogue)
Catalogue of malware objectives and behaviors. Links to ATT&CK methods.
Reference: https://github.com/MBCProject/mbc-markdown/blob/main/mbc_summary.md

**Format:**
`OBJECTIVE::Behavior::Method[Identifier]`
Example: `ANTI-STATIC ANALYSIS::Executable Code::Argument Obfuscation[B0032.020]`

`OBJECTIVE::Behavior::[Identifier]`
Example: `COMMUNICATION::HTTP Communication::[C0002]`

| MBC Objective | Description |
|---------------|-------------|
| Anti-Behavioral Analysis | Malware avoids detection by hindering sandboxes or debuggers |
| Anti-Static Analysis | Malware obstructs static analysis to hide intentions |
| Collection | Malware identifies and gathers information from the target |
| C2 | Malware communicates with attacker infrastructure for RCE and data exfiltration |
| Credential Access | Malware aims to steal account credentials |
| Micro-Behavior | Actions not necessarily malicious but commonly abused |

> Tip: Break results down line by line and think logically about what the malware is doing. Left side = what was identified, right side = how it performs that action.

### Namespaces
Groups rules with the same purpose into categories.
[[Assets/Images/Pasted image 20250429083129.png|Namespaces Grouping]]

Format: `Capability(Rule Name)::TLN(Top-Level Namespace)/Namespace`
Example: `reference anti-VM strings::Anti-Analysis/anti-vm/vm-detection`

| Component | Description |
|-----------|-------------|
| TLN (Top-Level Namespace) | Broadest grouping category |
| Namespace | Sub-grouping under TLN (e.g., `anti-vm/vm-detection`) |
| Capability | Name of the specific rule flagged |

Example: `anti-analysis/anti-vm/vm-detection` and `anti-analysis/obfuscation` share the same TLN but detect different things.

Reference: https://github.com/MBCProject/capa-rules-1?tab=readme-ov-file#namespace-organization

---
## Related Concepts
- [[Digital Forensics Fundamentals]]

## Related Techniques
-

## Related Playbooks
-

---
## References / Images
- [[Assets/Images/Pasted image 20250429083129.png|Namespaces Grouping]]
- https://github.com/mandiant/capa/releases
- https://github.com/MBCProject/mbc-markdown/blob/main/mbc_summary.md
- https://github.com/MBCProject/capa-rules-1?tab=readme-ov-file#namespace-organization
