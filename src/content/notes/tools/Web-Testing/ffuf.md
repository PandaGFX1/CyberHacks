---
title: "Ffuf"
category: "tools"
tags: []
excerpt: "ffuf (Fuzz Faster U Fool) is a fast, Go-based web fuzzer that uses a  keyword as a placeholder in a URL, header, or..."
date: "2026-05-11"
---

---
## Overview
ffuf (Fuzz Faster U Fool) is a fast, Go-based web fuzzer that uses a `FUZZ` keyword as a placeholder in a URL, header, or POST body — replacing it with each entry from a wordlist on every request. It is the go-to tool for directory and file enumeration, parameter discovery, VHost brute-forcing, and any other web fuzzing task that benefits from speed and flexible filtering.

## Target / Context
Any web application endpoint. Most commonly used during the recon and enumeration phases to discover hidden directories, files, GET/POST parameters, and virtual hosts.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>go install github.com/ffuf/ffuf/v2@latest</code></li>
</ul>
Requires Go installed: <code>sudo apt install -y golang</code>

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

Place <code>FUZZ</code> anywhere in the URL, header value, or POST body where you want wordlist entries substituted:
<ul class="callout-list">
  <li><code>ffuf -w <wordlist> -u http://<target>/FUZZ</code></li>
  <li><code>ffuf -w <wordlist> -u "http://<target>/page.php?param=FUZZ"</code></li>
  <li><code>ffuf -w <wordlist> -u http://<target>/FUZZ -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "param=FUZZ"</code></li>
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
| <code>-w</code> | Wordlist path | <code>-w /usr/share/seclists/Discovery/Web-Content/common.txt</code> |
| <code>-u</code> | Target URL with FUZZ placeholder | <code>-u http://target/FUZZ</code> |
| <code>-e</code> | File extensions to append to each wordlist entry | <code>-e .php,.html,.bak,.js</code> |
| <code>-X</code> | HTTP method | <code>-X POST</code> |
| <code>-H</code> | Custom request header | <code>-H "Content-Type: application/x-www-form-urlencoded"</code> |
| <code>-d</code> | POST body data (use FUZZ in value to fuzz parameters) | <code>-d "username=admin&password=FUZZ"</code> |
| <code>-ic</code> | Ignore comments in wordlist (lines starting with <code>#</code>) | <code>-ic</code> |
| <code>-v</code> | Verbose output — shows full URL and redirect location | <code>-v</code> |
| <code>-o</code> | Write output to file | <code>-o results.txt</code> |
| <code>-of</code> | Output format (<code>json</code>, <code>csv</code>, <code>ejson</code>, <code>html</code>, <code>md</code>, <code>all</code>) | <code>-of json</code> |
| <code>-t</code> | Number of concurrent threads (default: 40) | <code>-t 50</code> |
| <code>-rate</code> | Maximum requests per second | <code>-rate 500</code> |
| <code>-timeout</code> | HTTP request timeout in seconds | <code>-timeout 10</code> |

</div>
</details>

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Recursion Flags:</span></summary>
<div class="callout-body">

| Flag | Description | Example |
|------|-------------|---------|
| <code>-recursion</code> | Automatically re-fuzz discovered directories | <code>-recursion</code> |
| <code>-recursion-depth</code> | Maximum recursion depth | <code>-recursion-depth 2</code> |

</div>
</details>

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Filter & Match Flags:</span></summary>
<div class="callout-body">

| Flag | Description | Example |
|------|-------------|---------|
| <code>-mc</code> | **Match** — include only responses with these status codes (default: 200-299,301,302,307,401,403,405,500) | <code>-mc 200,301</code> |
| <code>-fc</code> | **Filter** — exclude responses with these status codes | <code>-fc 404,400</code> |
| <code>-ms</code> | **Match** — include only responses of this size in bytes | <code>-ms 3456</code> |
| <code>-fs</code> | **Filter** — exclude responses of this size in bytes | <code>-fs 0,1024</code> |
| <code>-mw</code> | **Match** — include only responses with this word count | <code>-mw 5-10</code> |
| <code>-fw</code> | **Filter** — exclude responses with this word count | <code>-fw 219</code> |
| <code>-ml</code> | **Match** — include only responses with this line count | <code>-ml 20</code> |
| <code>-fl</code> | **Filter** — exclude responses with this line count | <code>-fl 10</code> |
| <code>-mt</code> | **Match** — include only responses exceeding this response time (ms) | <code>-mt >500</code> |

</div>
</details>

---
## Common Use Cases

### Wordlists — SecLists Reference

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Recommended Wordlists:</span></summary>
<div class="callout-body">

| Wordlist | Best For |
|----------|---------|
| <code>Discovery/Web-Content/common.txt</code> | General-purpose; broad range of common dirs and files |
| <code>Discovery/Web-Content/directory-list-2.3-medium.txt</code> | Directory brute-force; large and thorough |
| <code>Discovery/Web-Content/raft-large-directories.txt</code> | Massive directory collection; use when medium misses things |
| <code>Discovery/Web-Content/big.txt</code> | Both directories and files; large and slow |
| <code>Discovery/DNS/subdomains-top1million-5000.txt</code> | VHost and subdomain fuzzing |
Install SecLists: <code>sudo apt install seclists</code> or clone from https://github.com/danielmiessler/SecLists

</div>
</details>

---

### Directory Enumeration

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>ffuf -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt -u http://<target>/FUZZ</code></li>
</ul>
Sends each wordlist entry as a path segment. Responses with status 200/301 indicate discovered directories.

</div>
</details>

---

### File Enumeration
Adding `-e` appends extensions to each wordlist entry, so `config` becomes `config.php`, `config.html`, etc. This increases request volume — balance thoroughness against scan speed.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>ffuf -w /usr/share/seclists/Discovery/Web-Content/common.txt -u http://<target>/FUZZ -e .php,.html,.txt,.bak,.js -v</code></li>
</ul>
Common extensions to target:
- <code>.php</code> — server-side scripting
- <code>.bak</code> — backup files (often not protected)
- <code>.html</code> — static pages
- <code>.txt</code> — notes, credentials, logs
- <code>.js</code> — client-side logic and potentially exposed API keys

</div>
</details>

---

### Recursive Fuzzing
Recursive mode automatically re-fuzzes any directory ffuf discovers, building out the full directory tree without manual intervention. A 301 redirect from the server tells ffuf to start a new fuzzing process within that directory.

Note: Recursion is resource-intensive. Limit depth and rate on real targets to avoid overwhelming the server or triggering defences.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>ffuf -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt -ic -u http://<target>/FUZZ -e .html -recursion -recursion-depth 2 -rate 500</code></li>
</ul>
<code>-ic</code> strips comment lines from the wordlist to prevent <code>#</code> characters being sent as path entries.

</div>
</details>

---

### GET Parameter Fuzzing

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>ffuf -w /usr/share/seclists/Discovery/Web-Content/common.txt -u "http://<target>/page.php?param=FUZZ" --hc 404</code></li>
</ul>
Use when curl reveals a parameter name exists but the valid value is unknown — replace the value with <code>FUZZ</code>.

</div>
</details>

---

### POST Parameter Fuzzing
POST parameters are transmitted in the request body rather than the URL. The `-d` flag sets the body; `-H` sets the correct content type so the server parses the data correctly.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>ffuf -u http://<target>/login.php -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "username=admin&password=FUZZ" -w /usr/share/seclists/Passwords/Common-Credentials/10-million-password-list-top-1000.txt -mc 200 -v</code></li>
</ul>
Matches only 200 responses — useful when the login page returns 200 on success and a redirect or different code on failure.

</div>
</details>

---

### VHost Fuzzing
Brute-forces the HTTP `Host` header to find virtual hosts not exposed via DNS. ffuf replaces `FUZZ` inside the header value with each wordlist entry.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>ffuf -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt -u http://<target-ip> -H "Host: FUZZ.<target-domain>" -fs <default-response-size></code></li>
</ul>
Run a baseline request first to get the default response size, then use <code>-fs</code> to filter it out — valid VHosts return a noticeably different response size.

</div>
</details>

---

### Validate Findings
Not every hit is a real vulnerability. Before acting on a finding, verify it manually — this avoids false positives and confirms the real impact without risking data modification.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Validation Workflow:</span></summary>
<div class="callout-body">

1. **Reproduce the request** — run <code>curl <discovered-url></code> to confirm the response
2. **Inspect headers before body** — <code>curl -I <url></code> returns only headers; check <code>Content-Type</code> and <code>Content-Length > 0</code> to confirm there is real content before pulling the full response
3. **Confirm it is a vulnerability** — look for error messages, unexpected content, or behaviour that differs from normal
4. **Proof of Concept only** — if exploiting (e.g. SQL injection), extract the database version; do not modify data or gather sensitive user records
Example: <code>curl -I http://<target>/backup/passwords.txt</code> — a <code>Content-Length > 0</code> confirms the file exists and has content without leaking its contents

</div>
</details>

---
## Related Techniques
- [VHost Fuzzing](/techniques/VHost-Fuzzing)
- [API Fuzzing](/techniques/API-Fuzzing)
- [Subdomain Enumeration](/techniques/Subdomain-Enumeration)

## Related Playbooks
- [Linux Pentest Playbook](/playbooks/Linux-Pentest-Playbook)
- [Windows Pentest Playbook](/playbooks/Windows-Pentest-Playbook)

---
## References / Images
- https://github.com/ffuf/ffuf
- https://github.com/danielmiessler/SecLists
