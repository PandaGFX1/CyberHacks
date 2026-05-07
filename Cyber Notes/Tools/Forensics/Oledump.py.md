Tags: #Status/In-Progress #Type/Tool #Context/Blueteam

---
## Overview
Oledump.py is a Python tool for analyzing OLE2 files and conducting static analysis on potentially malicious Office documents — particularly Excel files containing embedded VBA macros. OLE2 (Object Linking and Embedding) files use Compound File Binary Format to store multiple data types such as documents, spreadsheets, and presentations in a single file.

---
## Target / Context
Suspicious Microsoft Office files (.xls, .doc, .ppt) that may contain embedded macros or malicious VBA code. Used during static malware analysis to inspect document internals without executing them.

---
## Installation

> [!INFO]- Installation Commands:
> `pip install oledump`
> Or download directly: https://blog.didierstevens.com/programs/oledump-py/

---
## Basic Usage

> [!INFO]- Basic Usage:
> `oledump.py <file>`
> `oledump.py suspicious.xls`

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-s <number>` | Select a specific data stream to inspect | `oledump.py file.xls -s 4` |
> | `--vbadecompress` | Decompress VBA macros from selected stream (human-readable output instead of hex dump) | `oledump.py file.xls -s 4 --vbadecompress` |

---
## Common Use Cases

### List All Data Streams
Get an overview of all data streams in the file. Look for streams marked `M` indicating a macro.

> [!INFO]- Commands:
> `oledump.py <file>`

### Inspect a Specific Data Stream

> [!INFO]- Commands:
> `oledump.py <file> -s 4`

### Decompress and Read VBA Macro

> [!INFO]- Commands:
> `oledump.py <file> -s 4 --vbadecompress`

---
## Interpreting Results
[[Assets/Images/Pasted image 20250430064815.png|Oledump.py Output]]

| Indicator | Description |
|-----------|-------------|
| `A:` index with `xl/vbaProject.bin` | VBA script is embedded in the document |
| `M` next to a data stream | That stream contains a Macro |
| Data streams (A + numbers) | Individual storage components within the OLE2 file |

> Tip: Start by listing all streams, identify any marked `M`, then use `-s` to select and `--vbadecompress` to read the macro code directly.

---
## Related Concepts
- [[Digital Forensics Fundamentals]]

## Related Techniques
-

## Related Playbooks
-

---
## References / Images
- [[Assets/Images/Pasted image 20250430064815.png|Oledump.py Output]]
- https://blog.didierstevens.com/programs/oledump-py/
