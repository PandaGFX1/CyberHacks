---
title: "Hydra"
category: "tools"
tags: []
excerpt: "Hydra is a fast and flexible online password cracking tool that supports brute force attacks against live services...."
date: "2026-05-03"
---

---
## Overview
Hydra is a fast and flexible online password cracking tool that supports brute force attacks against live services. Unlike Hashcat which cracks offline hashes, Hydra attacks authentication services directly over the network — supporting dozens of protocols including FTP, SSH, HTTP, and more.

---
## Target / Context
Live network services requiring authentication. Targets include FTP, SSH, HTTP login forms, SMB, RDP, and many more. See https://en.kali.tools/?p=220 for full protocol options.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>apt install hydra</code></li>
  <li><code>dnf install hydra</code></li>
</ul>

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>hydra -l <username> -P <wordlist> <protocol>://<target></code></li>
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
| <code>-l</code> | Single username to use | <code>-l admin</code> |
| <code>-L</code> | Username list file | <code>-L users.txt</code> |
| <code>-p</code> | Single password to use | <code>-p password123</code> |
| <code>-P</code> | Password list file | <code>-P /usr/share/wordlists/rockyou.txt</code> |
| <code>-t</code> | Number of threads to spawn | <code>-t 4</code> |
| <code>-V</code> | Verbose — show every attempt | <code>-V</code> |
| <code>-s</code> | Custom port | <code>-s 2222</code> |
| <code>-f</code> | Stop after first valid credentials found | <code>-f</code> |

</div>
</details>

---
## Common Use Cases

### FTP Brute Force

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>hydra -l user -P passlist.txt ftp://10.10.185.65</code></li>
</ul>

</div>
</details>

### SSH Brute Force

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>hydra -l <username> -P /full/path/to/list 10.10.185.86 -t 4 ssh</code></li>
  <li><code>hydra -l <username> -P /full/path/to/list ssh://10.10.185.86</code></li>
</ul>

</div>
</details>

### POST Web Form Brute Force
Attacking a web login form via HTTP POST request.

Structure: `hydra <username> <wordlist> <target> http-post-form "<path>:<login_creds>:<invalid_response>"`

| Component | Description | Example |
|-----------|-------------|---------|
| `<path>` | Login page URL path | `/login.php` or `/` |
| `<login_creds>` | Form fields with `^USER^` and `^PASS^` placeholders | `username=^USER^&password=^PASS^` |
| `<invalid_response>` | String returned by server on failed login | `F=incorrect` or `:incorrect` |

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>hydra -l <username> -P <wordlist> 10.10.185.65 http-post-form "/:username=^USER^&password=^PASS^:F=incorrect" -V</code></li>
  <li><code>sudo hydra <username> <wordlist> 10.10.185.65 http-post-form "<path>:<login_creds>:<invalid_response>"</code></li>
</ul>
Note: <code>^USER^</code> and <code>^PASS^</code> are replaced with each username/password combination during the attack.

</div>
</details>

---
## Related Concepts
- [Protocols](/knowledge/Networking/Protocols)

## Related Techniques
- Password Cracking

## Related Playbooks
-

---
## References / Images
- https://en.kali.tools/?p=220
