---
title: "Wenum"
category: "tools"
tags: []
excerpt: "wenum is the actively maintained fork of wfuzz, developed by WebFuzzForge. It is a Python-based web fuzzer designed for..."
date: "2026-05-11"
---

---
## Overview
wenum is the actively maintained fork of wfuzz, developed by WebFuzzForge. It is a Python-based web fuzzer designed for parameter discovery and flexible input manipulation. Where ffuf excels at speed and directory enumeration, wenum is purpose-built for parameter fuzzing — systematically testing GET and POST parameter values to surface input validation flaws, hidden parameters, and injection points. Its standout feature is a real-time terminal dashboard that shows live request statistics, match counts, and filter summaries as the scan runs.

## Target / Context
Web application parameters — GET query strings, POST bodies, and custom headers. Best used after initial directory enumeration has identified interesting endpoints that accept user-controlled input.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

Requires <code>pipx</code> for isolated Python environment management:
<ul class="callout-list">
  <li><code>sudo apt install pipx</code></li>
  <li><code>pipx ensurepath</code></li>
  <li><code>sudo pipx ensurepath --global</code></li>
</ul>

Install wenum:
<ul class="callout-list">
  <li><code>pipx install git+https://github.com/WebFuzzForge/wenum</code></li>
  <li><code>pipx runpip wenum install setuptools</code></li>
</ul>

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

Place <code>FUZZ</code> in the URL where the parameter value should be tested:
<ul class="callout-list">
  <li><code>wenum -w <wordlist> -u "http://<target>/page.php?param=FUZZ"</code></li>
</ul>

Hide noise (e.g. 404 responses) with <code>--hc</code>:
<ul class="callout-list">
  <li><code>wenum -w /usr/share/seclists/Discovery/Web-Content/common.txt --hc 404 -u "http://<target>/page.php?x=FUZZ"</code></li>
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
| <code>-u</code> | Target URL with FUZZ placeholder | <code>-u "http://target/page.php?x=FUZZ"</code> |
| <code>-X</code> | HTTP method | <code>-X POST</code> |
| <code>-H</code> | Custom request header | <code>-H "Content-Type: application/x-www-form-urlencoded"</code> |
| <code>-d</code> | POST body data | <code>-d "y=FUZZ"</code> |
| <code>-p</code> | Proxy to route traffic through | <code>-p http://127.0.0.1:8080</code> |

</div>
</details>

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Filter & Match Flags:</span></summary>
<div class="callout-body">

| Flag | Description | Example |
|------|-------------|---------|
| <code>--hc</code> | **Hide** responses with these status codes | <code>--hc 404,400</code> |
| <code>--sc</code> | **Show** only responses with these status codes | <code>--sc 200</code> |
| <code>--hl</code> | **Hide** responses with this line count | <code>--hl 10</code> |
| <code>--sl</code> | **Show** only responses with this line count | <code>--sl 5</code> |
| <code>--hw</code> | **Hide** responses with this word count | <code>--hw 219</code> |
| <code>--sw</code> | **Show** only responses with this word count | <code>--sw 5</code> |
| <code>--hs</code> | **Hide** responses with this size in bytes | <code>--hs 1024</code> |
| <code>--ss</code> | **Show** only responses with this size in bytes | <code>--ss 512</code> |
| <code>--hr</code> | **Hide** responses whose body matches this regex | <code>--hr "Invalid parameter"</code> |
| <code>--sr</code> | **Show** only responses whose body matches this regex | <code>--sr "admin"</code> |
| <code>--filter</code> | Show only responses matching a regex (plugins still process hidden) | <code>--filter "Login"</code> |
| <code>--hard-filter</code> | Hide responses matching a regex AND prevent plugin processing | <code>--hard-filter "Login"</code> |

</div>
</details>

---
## Common Use Cases

### GET Parameter Fuzzing
Use `curl` to probe an endpoint first to confirm the parameter name, then automate value discovery with wenum.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

Probe manually first to confirm parameter behaviour:
<ul class="callout-list">
  <li><code>curl "http://<target>/get.php?x=test"</code></li>
</ul>

Automate with wenum once the parameter name is known:
<ul class="callout-list">
  <li><code>wenum -w /usr/share/seclists/Discovery/Web-Content/common.txt --hc 404 -u "http://<target>/get.php?x=FUZZ"</code></li>
</ul>

Combining filters — show only 200 responses with more than 5 words:
<ul class="callout-list">
  <li><code>wenum -w wordlist.txt --sc 200 --sw 5 -u "http://<target>/page.php?x=FUZZ"</code></li>
</ul>

</div>
</details>

---

### POST Parameter Fuzzing

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

Probe with curl to identify the parameter and confirm POST behaviour:
<ul class="callout-list">
  <li><code>curl -d "" "http://<target>/post.php"</code></li>
</ul>

Fuzz the parameter value:
<ul class="callout-list">
  <li><code>wenum -w /usr/share/seclists/Discovery/Web-Content/common.txt --hc 404 -u "http://<target>/post.php" -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "y=FUZZ"</code></li>
</ul>

</div>
</details>

---

### Regex-Based Filtering
Useful when status codes alone aren't enough to distinguish valid from invalid responses — the server returns 200 for everything but the response body differs.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

Show only responses containing "admin":
<ul class="callout-list">
  <li><code>wenum -w wordlist.txt --sr "admin" -u "http://<target>/FUZZ"</code></li>
</ul>

Hide responses with a known error message:
<ul class="callout-list">
  <li><code>wenum -w wordlist.txt --hr "Invalid parameter value" -u "http://<target>/page.php?x=FUZZ"</code></li>
</ul>

Combine with status filter:
<ul class="callout-list">
  <li><code>wenum -w wordlist.txt --sc 200,301,302 --sr "admin|password" -u "https://<target>/FUZZ"</code></li>
</ul>

</div>
</details>

---
## Related Techniques
- [API Fuzzing](/techniques/API-Fuzzing)
- [VHost Fuzzing](/techniques/VHost-Fuzzing)

## Related Playbooks
- [Linux Pentest Playbook](/playbooks/Linux-Pentest-Playbook)

---
## References / Images
- https://github.com/WebFuzzForge/wenum
