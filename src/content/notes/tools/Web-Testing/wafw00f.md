---
title: "Wafw00f"
category: "tools"
tags: []
excerpt: "wafw00f is a Python-based command-line tool that detects Web Application Firewalls (WAFs) by sending crafted HTTP..."
date: "2026-05-07"
---

---
## Overview
wafw00f is a Python-based command-line tool that detects Web Application Firewalls (WAFs) by sending crafted HTTP requests and analyzing the responses. It maintains a signature database of 80+ known WAF products (Cloudflare, ModSecurity, Imperva, Akamai, F5, etc.) and matches response patterns, headers, and cookies to identify which WAF is present. Knowing the WAF in advance allows you to select appropriate evasion techniques before active scanning or exploitation.

## Target / Context
Any web application or web server. Run before active scanning tools like Nikto or vulnerability scanners to determine if a WAF is filtering requests and, if so, which product it is.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

```
pip3 install wafw00f
# or from source:
pip3 install git+https://github.com/EnableSecurity/wafw00f
```

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>wafw00f <target></code></li>
  <li><code>wafw00f https://example.com</code></li>
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
| <code>-a</code> | Test all WAF signatures, not just the first match | <code>wafw00f -a https://example.com</code> |
| <code>-v</code> | Verbose output — show each test and response detail | <code>wafw00f -v https://example.com</code> |
| <code>-l</code> | List all WAF signatures in the database | <code>wafw00f -l</code> |
| <code>-o</code> | Save output to a file | <code>wafw00f -o results.txt https://example.com</code> |
| <code>-f</code> | Output format (text, json, csv) | <code>wafw00f -f json -o out.json https://example.com</code> |
| <code>-p</code> | Use a proxy for requests | <code>wafw00f -p http://127.0.0.1:8080 https://example.com</code> |

</div>
</details>

---
## Common Use Cases

### Detect WAF Before Active Scanning

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>wafw00f https://example.com</code></li>
</ul>
— Returns the WAF product name if detected, or "No WAF detected" if not found.

</div>
</details>

### Test All Signatures (Thorough Mode)

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>wafw00f -a https://example.com</code></li>
</ul>
— Useful when default mode returns no result or gives an uncertain match; exhausts all signatures.

</div>
</details>

### List All Supported WAF Signatures

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>wafw00f -l</code></li>
</ul>
— Shows all ~80+ WAF products the tool can identify; useful to check if your target's WAF is in the database.

</div>
</details>

### Route Through Burp Proxy

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>wafw00f -p http://127.0.0.1:8080 https://example.com</code></li>
</ul>
— Routes requests through Burp Suite to inspect the WAF detection requests and responses.

</div>
</details>

---
## Related Techniques
- [Web Fingerprinting](/knowledge/Web-Security/Web-Fingerprinting)

## Related Playbooks
- [Linux Pentest Playbook](/playbooks/Linux-Pentest-Playbook)

---
## References / Images
- https://github.com/EnableSecurity/wafw00f
