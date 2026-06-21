---
title: "Hashcat"
category: "tools"
tags: []
excerpt: "Hashcat is the world's fastest and most advanced password recovery tool. Uses GPU acceleration to crack password hashes..."
date: "2026-05-04"
---

---
## Overview
Hashcat is the world's fastest and most advanced password recovery tool. Uses GPU acceleration to crack password hashes using wordlists, brute force, rule-based attacks, and more. Should be run on the host machine rather than a VM to utilize full GPU performance.

---
## Target / Context
Password hashes from any source — Linux `/etc/shadow`, Windows SAM, web application databases, captured network hashes, and more.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo apt install hashcat</code></li>
</ul>

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>hashcat -m <hash_type> -a <attack_mode> hashfile wordlist</code></li>
  <li><code>hashcat hashfile wordlist</code></li>
  <li><code>man hashcat</code></li>
</ul>
Note: Run on host machine, not VM — requires GPU access for best performance.
Use <code>hashcat hashfile wordlist</code> to let Hashcat autodetect the hash type.

</div>
</details>

---
## Flags & Options

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Flags & Options:</span></summary>
<div class="callout-body">

| Flag | Description | Example |
|------|-------------|---------|
| <code>-m</code> | Hash type (numerical format) | <code>-m 0</code> (MD5) / <code>-m 1000</code> (NTLM) |
| <code>-a</code> | Attack mode | <code>-a 0</code> (wordlist) / <code>-a 3</code> (brute force) |
| <code>-o</code> | Output file for cracked hashes | <code>-o cracked.txt</code> |
| <code>--show</code> | Show previously cracked hashes | <code>hashcat --show hashfile</code> |
| <code>--force</code> | Ignore warnings (use cautiously) | <code>--force</code> |
| <code>-r</code> | Apply rule file to wordlist | <code>-r rules/best64.rule</code> |
| <code>--wordlist</code> | Specify wordlist explicitly | <code>--wordlist /usr/share/wordlists/rockyou.txt</code> |
| <code>-1</code> | Define custom charset 1 (use <code>?1</code> in mask) | <code>-1 ?d?u</code> (digits + uppercase) |

</div>
</details>

---
## Common Use Cases

### Wordlist Attack
Crack hashes using a wordlist.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>hashcat -m 0 -a 0 hashes.txt /usr/share/wordlists/rockyou.txt</code></li>
  <li><code>hashcat -m 1000 -a 0 hashes.txt /usr/share/wordlists/rockyou.txt</code></li>
</ul>

</div>
</details>

### Autodetect Hash Type

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>hashcat hashes.txt /usr/share/wordlists/rockyou.txt</code></li>
</ul>

</div>
</details>

### Show Previously Cracked Hashes

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>hashcat --show hashes.txt</code></li>
</ul>

</div>
</details>

### IPMI 2.0 RAKP Hash Cracking
IPMI 2.0 RAKP authentication returns a salted HMAC-SHA1 hash for any valid username — obtainable without authentication. HP iLO factory passwords are 8 uppercase letters and digits. See [IPMI](/knowledge/Networking/IPMI) for the protocol flaw.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>hashcat -m 7300 ipmi.txt -a 3 ?1?1?1?1?1?1?1?1 -1 ?d?u</code></li>
</ul>
— Mode 7300 = IPMI 2.0 RAKP HMAC-SHA1; <code>-a 3</code> = mask attack; <code>?1</code> = custom charset 1; <code>-1 ?d?u</code> = digits + uppercase; 8-char mask covers HP iLO factory password pattern.
<ul class="callout-list">
  <li><code>hashcat -m 7300 ipmi.txt wordlist.txt</code></li>
</ul>
— Dictionary attack for non-HP BMCs with weaker or reused passwords.

</div>
</details>

### Filter Password Length Before Cracking
Script To Filter Password Length

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>awk 'length($0) > 6' wordlist.txt > filtered.txt</code></li>
  <li><code>hashcat -m 0 hashes.txt filtered.txt</code></li>
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
- Script To Filter Password Length
- https://hashcat.net/hashcat/
- https://hashcat.net/wiki/doku.php?id=example_hashes
