---
title: "CyberChef"
category: "tools"
tags: []
excerpt: "CyberChef is a web-based Swiss Army Knife for data operations. Supports a wide range of tasks — from simple encoding..."
date: "2026-04-05"
---

---
## Overview
CyberChef is a web-based Swiss Army Knife for data operations. Supports a wide range of tasks — from simple encoding like XOR or Base64 to complex operations such as AES encryption. Available online or as a local copy run through a web browser.

## Target / Context
Any data requiring encoding, decoding, encryption, decryption, extraction, or format conversion. Commonly used during CTF challenges and forensics investigations.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

No installation required — access online or download a local copy.
See https://gchq.github.io/CyberChef/ for online access and downloads.

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

1. Set a clear objective: What do I want to accomplish?
2. Put data into the input area
3. Select or search for the relevant operation from the sidebar
4. Check output: Have we achieved our result?
Tips: You can add a whole folder or file as input, use multiple tabs, and replace input with output.

</div>
</details>

---
## Flags & Options

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Flags & Options:</span></summary>
<div class="callout-body">

| Option | Description |
|--------|-------------|
| Input | Accepts text, files, or entire folders |
| Tabs | Multiple tabs supported for parallel operations |
| Replace Input | Swap output back into input for chained operations |

</div>
</details>

---
## Common Use Cases

### Data Encoding / Decoding

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

Operations: From Base64, To Base64, URL Decode, From Base85, From Base58, To Base62

</div>
</details>

### Extracting Data

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

Operations: Extract IP Addresses, Extract Email Addresses, Extract URLs

</div>
</details>

### Date and Time Conversion

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

Operations: From UNIX Timestamp, To UNIX Timestamp

</div>
</details>

### Thought Process for Unknown Data
CyberChef Thought Process

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Steps:</span></summary>
<div class="callout-body">

1. Set objective — what format or value are you trying to recover?
2. Input the data
3. Research what encoding or encryption might be in use — browse categories
4. Apply operations and verify output matches expectation

</div>
</details>

---
## Related Concepts
- [Cryptography Basics](/knowledge/Cryptography/Cryptography-Basics)
- [Hashing Basics](/knowledge/Cryptography/Hashing-Basics)

## Related Techniques
-

## Related Playbooks
-

---
## References / Images
- CyberChef Thought Process
- https://gchq.github.io/CyberChef/
