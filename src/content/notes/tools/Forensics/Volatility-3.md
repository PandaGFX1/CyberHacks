---
title: "Volatility 3"
category: "tools"
tags: []
excerpt: "Volatility 3 is the industry-standard open-source memory forensics framework. Used to analyze memory images (RAM dumps)..."
date: "2026-03-28"
---

---
## Overview
Volatility 3 is the industry-standard open-source memory forensics framework. Used to analyze memory images (RAM dumps) to identify and extract artifacts — running processes, network connections, injected code, DLLs, command history, and more. Essential for incident response and malware analysis when dealing with volatile evidence.

---
## Target / Context
Memory image files (.mem, .raw, .vmem) acquired from compromised systems. Supports Windows, Linux, and macOS memory images. Run Volatility against the image — never on a live system directly.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>pip install volatility3</code></li>
  <li><code>git clone https://github.com/volatilityfoundation/volatility3.git</code></li>
  <li><code>cd volatility3 && pip install -r requirements.txt</code></li>
</ul>

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>vol3 -f <memoryImage> <plugin></code></li>
  <li><code>vol3 -f wcry.mem windows.pstree.PsTree</code></li>
  <li><code>vol3 -q -f wcry.mem windows.pslist.PsList</code></li>
</ul>
<code>-q</code> — quiet mode; suppresses progress output. Useful when redirecting results to files.

</div>
</details>

---
## Flags & Options

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Flags & Options:</span></summary>
<div class="callout-body">

| Flag | Description | Example |
|------|-------------|---------|
| <code>-f</code> | Path to memory image file | <code>-f wcry.mem</code> |
| <code>-q</code> | Quiet mode — suppress output noise | <code>-q</code> |
| <code>-o</code> | Output directory for extracted files | <code>-o ./output</code> |

</div>
</details>

---
## Common Use Cases

### Run a Single Plugin

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>vol3 -f wcry.mem windows.pstree.PsTree</code></li>
  <li><code>vol3 -f wcry.mem windows.pslist.PsList</code></li>
  <li><code>vol3 -f wcry.mem windows.cmdline.CmdLine</code></li>
  <li><code>vol3 -f wcry.mem windows.netscan.NetScan</code></li>
  <li><code>vol3 -f wcry.mem windows.malfind.Malfind</code></li>
  <li><code>vol3 -f wcry.mem windows.dlllist.DllList</code></li>
  <li><code>vol3 -f wcry.mem windows.filescan.FileScan</code></li>
</ul>
Plugin reference: https://volatility3.readthedocs.io/en/stable/volatility3.plugins.html

</div>
</details>

### Pre-Processing — Run Multiple Plugins at Once
Simultaneously run multiple plugins and save each result to its own file.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>for plugin in windows.malfind.Malfind windows.psscan.PsScan windows.pstree.PsTree windows.pslist.PsList windows.cmdline.CmdLine windows.filescan.FileScan windows.dlllist.DllList; do vol3 -q -f wcry.mem $plugin > wcry.$plugin.txt; done</code></li>
</ul>

</div>
</details>

### Pre-Processing — Extract Strings from Memory Image
Extract human-readable strings from the raw memory image for keyword searching.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>strings wcry.mem > wcry.strings.ascii.txt</code></li>
  <li><code>strings -e l wcry.mem > wcry.strings.unicode_little_endian.txt</code></li>
  <li><code>strings -e b wcry.mem > wcry.strings.unicode_big_endian.txt</code></li>
</ul>

</div>
</details>

---

## Common Plugins Reference

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Plugin Reference:</span></summary>
<div class="callout-body">

| Plugin | Description |
|--------|-------------|
| <code>windows.pslist.PsList</code> | List running processes |
| <code>windows.pstree.PsTree</code> | Display process tree with parent-child relationships |
| <code>windows.psscan.PsScan</code> | Scan for processes — finds hidden/terminated processes |
| <code>windows.cmdline.CmdLine</code> | Show command line arguments for each process |
| <code>windows.netscan.NetScan</code> | Display network connections and listening ports |
| <code>windows.malfind.Malfind</code> | Find injected code and suspicious memory regions |
| <code>windows.dlllist.DllList</code> | List loaded DLLs per process |
| <code>windows.filescan.FileScan</code> | Scan for file objects in memory |

</div>
</details>

---
## Related Techniques
-

## Related Concepts
- [Digital Forensics Fundamentals](/knowledge/Defensive-Security/Digital-Forensics-Fundamentals)

## Related Playbooks
- [Linux Forensics Playbook](/playbooks/Linux-Forensics-Playbook)

---
## References / Images
- https://volatility3.readthedocs.io/en/stable/volatility3.plugins.html
- https://github.com/volatilityfoundation/volatility3
