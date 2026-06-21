---
title: "JohnTheRipper"
category: "tools"
tags: []
excerpt: "John the Ripper (JtR) is a powerful open-source password cracking tool. Use the Jumbo John extended version for maximum..."
date: "2026-05-04"
---

---
## Overview
John the Ripper (JtR) is a powerful open-source password cracking tool. Use the **Jumbo John** extended version for maximum format support. Supports wordlist attacks, single crack mode, custom rules, and includes companion tools for converting file formats (zip, rar, SSH keys, shadow files) into crackable hashes.

---
## Target / Context
Password hashes from Linux shadow files, Windows NTLM, ZIP/RAR archives, SSH private keys, and many more formats. Offline cracking tool — requires the hash file locally.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo apt install john</code></li>
</ul>
Use Jumbo John for extended format support: https://www.openwall.com/john/

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>john [options] [file path]</code></li>
  <li><code>john --wordlist=/usr/share/wordlists/rockyou.txt hash_to_crack.txt</code></li>
  <li><code>john --format=raw-md5 --wordlist=/usr/share/wordlists/rockyou.txt hash_to_crack.txt</code></li>
  <li><code>john --list=formats</code></li>
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
| <code>--wordlist</code> | Specify wordlist to use | <code>--wordlist=/usr/share/wordlists/rockyou.txt</code> |
| <code>--format</code> | Specify hash format | <code>--format=raw-md5</code> / <code>--format=nt</code> |
| <code>--single</code> | Single crack mode using GECOS field and word mangling | <code>--single --format=raw-md5</code> |
| <code>--rule</code> | Apply a named custom rule | <code>--rule=PoloPassword</code> |
| <code>--list=formats</code> | List all supported hash formats | <code>john --list=formats</code> |
| <code>--show</code> | Show previously cracked passwords | <code>john --show hash.txt</code> |

</div>
</details>

---
## Common Use Cases

### Wordlist Attack

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>john --wordlist=/usr/share/wordlists/rockyou.txt hash_to_crack.txt</code></li>
  <li><code>john --format=raw-md5 --wordlist=/usr/share/wordlists/rockyou.txt hash_to_crack.txt</code></li>
</ul>
Windows NTLM format flag: <code>--format=nt</code>

</div>
</details>

---
### Linux Shadow File Cracking
Must unshadow first to combine `/etc/passwd` and `/etc/shadow` into one crackable file.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>unshadow [path to passwd] [path to shadow] > unshadowed.txt</code></li>
  <li><code>john --wordlist=/usr/share/wordlists/rockyou.txt unshadowed.txt</code></li>
  <li><code>john --format=sha512crypt --wordlist=/usr/share/wordlists/rockyou.txt unshadowed.txt</code></li>
</ul>

</div>
</details>

---
### Single Crack Mode
Uses information from the GECOS field alongside word mangling techniques to generate candidates.
Example mutations: `Markus → MArkus, Markus1, Markus!`

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>john --single --format=[format] [path to file]</code></li>
</ul>
Note: Prepend the hash with the username before running single crack mode.
Format: <code>username:hash</code> — Example: <code>mike:1efee03cdc</code>

</div>
</details>

---
### Custom Rules
Define rules in `/etc/john/john.conf` or `/opt/john/john.conf`.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>john --wordlist=[path to wordlist] --rule=PoloPassword [path to hash file]</code></li>
</ul>

</div>
</details>

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Rule Syntax Reference:</span></summary>
<div class="callout-body">

| Modifier | Description |
|----------|-------------|
| <code>Az</code> | Append characters to end of word |
| <code>A0</code> | Prepend characters to start of word |
| <code>c</code> | Capitalize character positionally |
| <code>[0-9]</code> | Match any digit 0-9 |
| <code>[!$%@]</code> | Match any of these symbols |

</div>
</details>

Example rule definition in `john.conf`:
`[List.Rules:PoloPassword]`
`cAz"[0-9] [!£$%@]"`
- `c` — Capitalize first letter
- `Az` — Append to end
- `[0-9]` — Followed by a digit
- `[!£$%@]` — Followed by a symbol

Full reference: https://www.openwall.com/john/doc/RULES.shtml

---
### Cracking ZIP Files

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>zip2john [options] [zip file] > zip_hash.txt</code></li>
  <li><code>john --wordlist=/usr/share/wordlists/rockyou.txt zip_hash.txt</code></li>
</ul>

</div>
</details>

---
### Cracking RAR Archives

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>rar2john [rar file] > rar_hash.txt</code></li>
  <li><code>john --wordlist=/usr/share/wordlists/rockyou.txt rar_hash.txt</code></li>
</ul>

</div>
</details>

---
### IPMI 2.0 RAKP Hash Cracking
IPMI 2.0 RAKP hashes are obtainable without authentication due to a protocol-level flaw. See [IPMI](/knowledge/Networking/IPMI) for context.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>john --format=rakp --wordlist=/usr/share/wordlists/rockyou.txt ipmi.txt</code></li>
</ul>

</div>
</details>

### Cracking SSH Key Passwords
Converts an `id_rsa` private key into a crackable hash format.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>python /usr/share/john/ssh2john.py [id_rsa file] > ssh_hash.txt</code></li>
  <li><code>john --wordlist=/usr/share/wordlists/rockyou.txt ssh_hash.txt</code></li>
</ul>

</div>
</details>

---
## Related Concepts
- [Hashing Basics](/knowledge/Cryptography/Hashing-Basics)
- [IPMI](/knowledge/Networking/IPMI)

## Related Techniques
- Password Cracking

## Related Playbooks
-

---
## References / Images
- https://www.openwall.com/john/
- https://www.openwall.com/john/doc/RULES.shtml
