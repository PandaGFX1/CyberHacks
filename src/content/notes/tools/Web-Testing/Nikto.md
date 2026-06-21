---
title: "Nikto"
category: "tools"
tags: []
excerpt: "Nikto is an open-source web server scanner that checks targets for over 6,700 potentially dangerous files, outdated..."
date: "2026-05-07"
---

---
## Overview
Nikto is an open-source web server scanner that checks targets for over 6,700 potentially dangerous files, outdated server software, version-specific problems, and common misconfigurations. It performs both passive fingerprinting (reading headers and banners) and active probing (requesting known paths). Nikto is primarily a vulnerability assessment tool but is also widely used in the fingerprinting phase of web reconnaissance to identify server software versions, installed CMS platforms, and exposed sensitive files quickly.

## Target / Context
Web servers and web applications. Useful during both fingerprinting and initial vulnerability assessment. Works against HTTP and HTTPS targets; supports virtual host scanning.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

```
# Kali / Debian (pre-packaged):
sudo apt install nikto -y

# From source:
sudo apt update && sudo apt install -y perl
git clone https://github.com/sullo/nikto
cd nikto/program
chmod +x ./nikto.pl
```

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>nikto -h <target></code></li>
  <li><code>nikto -h https://example.com</code></li>
  <li><code>nikto -h 10.10.10.1 -p 8080</code></li>
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
| <code>-h</code> | Target host (IP, hostname, or URL) | <code>-h https://example.com</code> |
| <code>-p</code> | Port to scan (default 80/443) | <code>-p 8080</code> |
| <code>-ssl</code> | Force SSL/HTTPS | <code>-ssl</code> |
| <code>-vhost</code> | Scan a specific virtual host | <code>-vhost admin.example.com</code> |
| <code>-Tuning</code> | Limit scan to specific check categories (see table below) | <code>-Tuning b</code> |
| <code>-o</code> | Output file | <code>-o results.txt</code> |
| <code>-Format</code> | Output format (txt, csv, htm, xml, json) | <code>-Format json</code> |
| <code>-nointeractive</code> | Suppress prompts (useful in scripts) | <code>-nointeractive</code> |
| <code>-evasion</code> | Apply IDS/WAF evasion techniques (1–9) | <code>-evasion 1</code> |
| <code>-useproxy</code> | Route through a proxy | <code>-useproxy http://127.0.0.1:8080</code> |
| <code>-timeout</code> | Request timeout in seconds | <code>-timeout 10</code> |
| <code>-update</code> | Update the Nikto plugin database | <code>-update</code> |

</div>
</details>

#### Tuning Codes
| Code | Category |
|------|----------|
| `0` | File upload vulnerabilities |
| `1` | Interesting file discovery |
| `2` | Misconfiguration checks |
| `3` | Information disclosure |
| `4` | Injection tests (XSS, SQL, etc.) |
| `5` | Remote file retrieval |
| `6` | Denial of service tests |
| `7` | Remote access tests |
| `8` | Command execution tests |
| `9` | SQL injection |
| `a` | Authentication bypass |
| `b` | Software identification (fingerprinting only) |
| `c` | Remote source inclusion |
| `x` | Reverse tuning — exclude the specified type |

---
## Common Use Cases

### Full Scan Against a Web Server

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>nikto -h https://example.com</code></li>
</ul>
— Runs all checks; output includes identified server software, risky files, outdated software, and misconfigurations.

</div>
</details>

### Fingerprinting Only (Software Identification)

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>nikto -h example.com -Tuning b</code></li>
</ul>
— Limits the scan to software identification checks only. Useful when fingerprinting without triggering noisy vulnerability probes.

</div>
</details>

### HTTPS Target on Non-Standard Port

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>nikto -h 10.10.10.1 -p 8443 -ssl</code></li>
</ul>

</div>
</details>

### Virtual Host Scanning

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>nikto -h 10.10.10.1 -vhost admin.example.com</code></li>
</ul>
— Sends <code>Host: admin.example.com</code> with all requests. Required when the target IP hosts multiple virtual hosts and you want to scan a specific one.

</div>
</details>

### Save Output for Reporting

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>nikto -h https://example.com -o nikto-results.html -Format htm</code></li>
</ul>

</div>
</details>

---
## Related Techniques
- [Web Fingerprinting](/knowledge/Web-Security/Web-Fingerprinting)

## Related Playbooks
- [Linux Pentest Playbook](/playbooks/Linux-Pentest-Playbook)

---
## References / Images
- https://github.com/sullo/nikto
- `nikto -Help`
