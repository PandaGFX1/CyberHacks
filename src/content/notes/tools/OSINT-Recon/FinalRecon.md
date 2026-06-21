---
title: "FinalRecon"
category: "tools"
tags: []
excerpt: "FinalRecon is a Python-based automated web reconnaissance framework that consolidates multiple recon techniques into a..."
date: "2026-05-07"
---

---
## Overview
FinalRecon is a Python-based automated web reconnaissance framework that consolidates multiple recon techniques into a single modular tool. It can perform SSL certificate inspection, WHOIS lookups, HTTP header analysis, web crawling, DNS enumeration (40+ record types), subdomain enumeration via multiple APIs, directory brute force, and Wayback Machine queries — all from a single command. Useful for quickly running a broad passive and active recon sweep at the start of an engagement.

## Target / Context
Web applications and domains. Covers both passive recon (WHOIS, certificates, Wayback Machine) and active recon (crawling, directory enumeration, port scanning). Useful as a first pass before diving into targeted tooling.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

```
git clone https://github.com/thewhiteh4t/FinalRecon.git
cd FinalRecon
pip3 install -r requirements.txt
chmod +x ./finalrecon.py
```

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>./finalrecon.py --help</code></li>
  <li><code>./finalrecon.py --headers --whois --url http://example.com</code></li>
  <li><code>./finalrecon.py --full --url http://example.com</code></li>
</ul>

</div>
</details>

---
## Flags & Options

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Flags & Options:</span></summary>
<div class="callout-body">

| Flag | Description |
|------|-------------|
| <code>--url <URL></code> | Target URL (required for all scans) |
| <code>--headers</code> | Retrieve and analyze HTTP headers |
| <code>--sslinfo</code> | Get SSL/TLS certificate information |
| <code>--whois</code> | Perform a WHOIS lookup for the domain |
| <code>--crawl</code> | Crawl the target website for links and resources |
| <code>--dns</code> | Perform DNS enumeration (queries 40+ record types) |
| <code>--sub</code> | Enumerate subdomains using multiple data sources |
| <code>--dir</code> | Brute-force directories on the target (supports custom wordlists) |
| <code>--wayback</code> | Retrieve archived URLs from the Wayback Machine |
| <code>--ps</code> | Run a fast port scan on the target |
| <code>--full</code> | Run all modules in sequence |

</div>
</details>

---
## Common Use Cases

### Targeted Recon (Selected Modules)

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>./finalrecon.py --headers --whois --url http://example.com</code></li>
</ul>
— Runs header analysis and WHOIS lookup only. Good starting point for passive recon.

</div>
</details>

### SSL Certificate Inspection + DNS Enumeration

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>./finalrecon.py --sslinfo --dns --url https://example.com</code></li>
</ul>
— Combines certificate metadata (expiry, CN, SANs) with a 40+ record DNS enumeration.

</div>
</details>

### Full Automated Recon Sweep

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>./finalrecon.py --full --url http://example.com</code></li>
</ul>
— Runs all modules sequentially. Results are saved to a local JSON report.

</div>
</details>

### Subdomain Enumeration

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>./finalrecon.py --sub --url http://example.com</code></li>
</ul>
— Queries multiple sources including crt.sh, AnubisDB, ThreatMiner, CertSpotter, VirusTotal API, Shodan API, and BeVigil API. Returns a combined and deduplicated subdomain list.

</div>
</details>

---
## Related Techniques
- [Subdomain Enumeration](/techniques/Subdomain-Enumeration)
- [DNS Enumeration](/techniques/DNS-Enumeration)

## Related Playbooks
- [Linux Pentest Playbook](/playbooks/Linux-Pentest-Playbook)
- [OSINT Playbook](/playbooks/OSINT-Playbook)

---
## References / Images
- https://github.com/thewhiteh4t/FinalRecon
