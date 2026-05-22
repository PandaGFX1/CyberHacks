Tags: #Status/In-Progress #Type/Tool #Context/Blueteam

---
## Overview
Volatility 3 is the industry-standard open-source memory forensics framework. Used to analyze memory images (RAM dumps) to identify and extract artifacts — running processes, network connections, injected code, DLLs, command history, and more. Essential for incident response and malware analysis when dealing with volatile evidence.

---
## Target / Context
Memory image files (.mem, .raw, .vmem) acquired from compromised systems. Supports Windows, Linux, and macOS memory images. Run Volatility against the image — never on a live system directly.

---
## Installation

> [!INFO]- Installation Commands:
> `pip install volatility3`
> `git clone https://github.com/volatilityfoundation/volatility3.git`
> `cd volatility3 && pip install -r requirements.txt`

---
## Basic Usage

> [!INFO]- Basic Usage:
> `vol3 -f <memoryImage> <plugin>`
> `vol3 -f wcry.mem windows.pstree.PsTree`
> `vol3 -q -f wcry.mem windows.pslist.PsList`
> `-q` — quiet mode; suppresses progress output. Useful when redirecting results to files.

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-f` | Path to memory image file | `-f wcry.mem` |
> | `-q` | Quiet mode — suppress output noise | `-q` |
> | `-o` | Output directory for extracted files | `-o ./output` |

---
## Common Use Cases

### Run a Single Plugin

> [!INFO]- Commands:
> `vol3 -f wcry.mem windows.pstree.PsTree`
> `vol3 -f wcry.mem windows.pslist.PsList`
> `vol3 -f wcry.mem windows.cmdline.CmdLine`
> `vol3 -f wcry.mem windows.netscan.NetScan`
> `vol3 -f wcry.mem windows.malfind.Malfind`
> `vol3 -f wcry.mem windows.dlllist.DllList`
> `vol3 -f wcry.mem windows.filescan.FileScan`
> Plugin reference: https://volatility3.readthedocs.io/en/stable/volatility3.plugins.html

### Pre-Processing — Run Multiple Plugins at Once
Simultaneously run multiple plugins and save each result to its own file.

> [!INFO]- Commands:
> `for plugin in windows.malfind.Malfind windows.psscan.PsScan windows.pstree.PsTree windows.pslist.PsList windows.cmdline.CmdLine windows.filescan.FileScan windows.dlllist.DllList; do vol3 -q -f wcry.mem $plugin > wcry.$plugin.txt; done`

### Pre-Processing — Extract Strings from Memory Image
Extract human-readable strings from the raw memory image for keyword searching.

> [!INFO]- Commands:
> `strings wcry.mem > wcry.strings.ascii.txt`
> `strings -e l wcry.mem > wcry.strings.unicode_little_endian.txt`
> `strings -e b wcry.mem > wcry.strings.unicode_big_endian.txt`

---

## Common Plugins Reference

> [!INFO]- Plugin Reference:
> | Plugin | Description |
> |--------|-------------|
> | `windows.pslist.PsList` | List running processes |
> | `windows.pstree.PsTree` | Display process tree with parent-child relationships |
> | `windows.psscan.PsScan` | Scan for processes — finds hidden/terminated processes |
> | `windows.cmdline.CmdLine` | Show command line arguments for each process |
> | `windows.netscan.NetScan` | Display network connections and listening ports |
> | `windows.malfind.Malfind` | Find injected code and suspicious memory regions |
> | `windows.dlllist.DllList` | List loaded DLLs per process |
> | `windows.filescan.FileScan` | Scan for file objects in memory |

---
## Related Techniques
-

## Related Concepts
- [[Digital Forensics Fundamentals]]

## Related Playbooks
- [[Linux Forensics Playbook]]

---
## References / Images
- https://volatility3.readthedocs.io/en/stable/volatility3.plugins.html
- https://github.com/volatilityfoundation/volatility3
