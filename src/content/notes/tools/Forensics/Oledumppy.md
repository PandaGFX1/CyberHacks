---
title: "Oledumppy"
category: "tools"
tags: []
excerpt: "Oledump.py is a Python tool for analyzing OLE2 files and conducting static analysis on potentially malicious Office..."
date: "2026-03-28"
---

---
## Overview
Oledump.py is a Python tool for analyzing OLE2 files and conducting static analysis on potentially malicious Office documents — particularly Excel files containing embedded VBA macros. OLE2 (Object Linking and Embedding) files use Compound File Binary Format to store multiple data types such as documents, spreadsheets, and presentations in a single file.

---
## Target / Context
Suspicious Microsoft Office files (.xls, .doc, .ppt) that may contain embedded macros or malicious VBA code. Used during static malware analysis to inspect document internals without executing them.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>pip install oledump</code></li>
</ul>
Or download directly: https://blog.didierstevens.com/programs/oledump-py/

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>oledump.py <file></code></li>
  <li><code>oledump.py suspicious.xls</code></li>
</ul>

</div>
</details>

---
## Flags & Options

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Flags & Options:</span></summary>
<div class="callout-body">

| Flag | Description | Example |
|------|-------------|---------|
| <code>-s <number></code> | Select a specific data stream to inspect | <code>oledump.py file.xls -s 4</code> |
| <code>--vbadecompress</code> | Decompress VBA macros from selected stream (human-readable output instead of hex dump) | <code>oledump.py file.xls -s 4 --vbadecompress</code> |

</div>
</details>

---
## Common Use Cases

### List All Data Streams
Get an overview of all data streams in the file. Look for streams marked `M` indicating a macro.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>oledump.py <file></code></li>
</ul>

</div>
</details>

### Inspect a Specific Data Stream

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>oledump.py <file> -s 4</code></li>
</ul>

</div>
</details>

### Decompress and Read VBA Macro

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>oledump.py <file> -s 4 --vbadecompress</code></li>
</ul>

</div>
</details>

---
## Interpreting Results
Oledump.py Output

| Indicator | Description |
|-----------|-------------|
| `A:` index with `xl/vbaProject.bin` | VBA script is embedded in the document |
| `M` next to a data stream | That stream contains a Macro |
| Data streams (A + numbers) | Individual storage components within the OLE2 file |

> Tip: Start by listing all streams, identify any marked `M`, then use `-s` to select and `--vbadecompress` to read the macro code directly.

---
## Related Concepts
- [Digital Forensics Fundamentals](/knowledge/Defensive-Security/Digital-Forensics-Fundamentals)

## Related Techniques
-

## Related Playbooks
-

---
## References / Images
- Oledump.py Output
- https://blog.didierstevens.com/programs/oledump-py/
