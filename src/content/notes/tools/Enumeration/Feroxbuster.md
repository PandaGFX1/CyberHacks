---
title: "Feroxbuster"
category: "tools"
tags: []
excerpt: "Feroxbuster is a fast, recursive web content discovery tool written in Rust. It is designed for brute-force discovery..."
date: "2026-05-11"
---

---
## Overview
Feroxbuster is a fast, recursive web content discovery tool written in Rust. It is designed for brute-force discovery of unlinked content — files and directories that exist on a web server but are not linked from any public page. Its primary differentiator from Gobuster is built-in automatic recursion: Feroxbuster continuously fans out into newly discovered directories without manual intervention, making it more thorough for deeply nested applications. It also includes wildcard response detection to avoid false positives on servers that return 200 for all requests.

## Target / Context
Web servers during the enumeration and recon phase of a CTF or engagement. Best choice when the target application has a complex, multi-level directory structure and you need deep recursive scanning without manually re-running the tool for each discovered path.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

Linux quick install:
<ul class="callout-list">
  <li><code>curl -sL https://raw.githubusercontent.com/epi052/feroxbuster/main/install-nix.sh | sudo bash -s $HOME/.local/bin</code></li>
</ul>

Alternative via cargo (Rust package manager):
<ul class="callout-list">
  <li><code>cargo install feroxbuster</code></li>
</ul>

Kali/Parrot (apt):
<ul class="callout-list">
  <li><code>sudo apt install feroxbuster</code></li>
</ul>

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>feroxbuster --url http://<target> -w /path/to/wordlist</code></li>
</ul>

Recursive scan with extension filtering:
<ul class="callout-list">
  <li><code>feroxbuster --url http://<target> -w /usr/share/seclists/Discovery/Web-Content/raft-large-directories.txt -x php,html,bak</code></li>
</ul>

</div>
</details>

---
## Flags & Options

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Core Flags:</span></summary>
<div class="callout-body">

| Flag | Description | Example |
|------|-------------|---------|
| <code>--url</code> | Target URL | <code>--url http://target.com</code> |
| <code>-w</code> | Wordlist path | <code>-w /usr/share/seclists/Discovery/Web-Content/raft-large-directories.txt</code> |
| <code>-x</code> | File extensions to append | <code>-x php,html,bak,js</code> |
| <code>-t</code> | Number of concurrent threads (default: 50) | <code>-t 100</code> |
| <code>-d</code> | Maximum recursion depth (default: 4) | <code>-d 2</code> |
| <code>--no-recursion</code> | Disable automatic recursion | <code>--no-recursion</code> |
| <code>-o</code> | Write output to file | <code>-o results.txt</code> |
| <code>-k</code> | Disable TLS certificate verification | <code>-k</code> |
| <code>-H</code> | Custom header | <code>-H "Authorization: Bearer token"</code> |
| <code>--proxy</code> | Route traffic through a proxy | <code>--proxy http://127.0.0.1:8080</code> |
| <code>--rate-limit</code> | Limit requests per second | <code>--rate-limit 100</code> |

</div>
</details>

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Filter Flags:</span></summary>
<div class="callout-body">

| Flag | Description | Example |
|------|-------------|---------|
| <code>-s</code> / <code>--status-codes</code> | **Include** only responses with these status codes (allowlist; default: all) | <code>-s 200,204,301,302</code> |
| <code>-C</code> / <code>--filter-status</code> | **Exclude** responses with these status codes (denylist) | <code>-C 404,500</code> |
| <code>-S</code> / <code>--filter-size</code> | **Exclude** responses of this size in bytes | <code>-S 1024</code> |
| <code>-W</code> / <code>--filter-words</code> | **Exclude** responses with this word count | <code>-W 0-10</code> |
| <code>-N</code> / <code>--filter-lines</code> | **Exclude** responses with this line count | <code>-N 50</code> |
| <code>-X</code> / <code>--filter-regex</code> | **Exclude** responses whose body or headers match this regex | <code>-X "Access Denied"</code> |
| <code>--filter-similar-to</code> | **Exclude** responses similar to a given URL (removes near-duplicates) | <code>--filter-similar-to http://target/404</code> |
| <code>--dont-scan</code> | Skip specific URLs or patterns even when found during recursion | <code>--dont-scan /uploads</code> |

</div>
</details>

---
## Common Use Cases

### Recursive Directory Discovery
Feroxbuster's main use case. It discovers directories, then automatically starts new scans within each one up to the configured depth.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>feroxbuster --url http://<target> -w /usr/share/seclists/Discovery/Web-Content/raft-large-directories.txt -d 2 -t 50</code></li>
</ul>

With extensions and size filtering to reduce noise:
<ul class="callout-list">
  <li><code>feroxbuster --url http://<target> -w /usr/share/seclists/Discovery/Web-Content/common.txt -x php,bak -S 0 -C 404</code></li>
</ul>

</div>
</details>

---

### Filtered Scan — Reducing Noise
Combine filters to zero in on meaningful responses. Status and size filters are the most effective first pass.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

Include only successful and redirect responses:
<ul class="callout-list">
  <li><code>feroxbuster --url http://<target> -w wordlist.txt -s 200,301,302</code></li>
</ul>

Exclude a known error page size and filter a common error message:
<ul class="callout-list">
  <li><code>feroxbuster --url http://<target> -w wordlist.txt -S 10240 -X "error" -C 404,500</code></li>
</ul>

</div>
</details>

---

### Excluding Known Uninteresting Paths
Useful when recursion is enabled but certain paths (e.g. media uploads, cached assets) would generate excessive noise.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>feroxbuster --url http://<target> -w wordlist.txt --dont-scan /uploads --dont-scan /assets</code></li>
</ul>

</div>
</details>

---
## Related Techniques
- [VHost Fuzzing](/techniques/VHost-Fuzzing)
- [Subdomain Enumeration](/techniques/Subdomain-Enumeration)

## Related Playbooks
- [Linux Pentest Playbook](/playbooks/Linux-Pentest-Playbook)

---
## References / Images
- https://github.com/epi052/feroxbuster
