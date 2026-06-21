---
title: "Gobuster"
category: "tools"
tags: []
excerpt: "GoBuster is a brute-force enumeration tool used for reconnaissance. It enumerates web directories, DNS subdomains,..."
date: "2026-05-11"
---

---
## Overview
GoBuster is a brute-force enumeration tool used for reconnaissance. It enumerates web directories, DNS subdomains, virtual hosts, Amazon S3 buckets, and Google Cloud Storage by brute-forcing with wordlists. A go-to tool for the early recon phase of a CTF or engagement.

---
## Target / Context
Web servers, DNS infrastructure, and cloud storage. Key distinction for HTB and CTF use:
- **DNS mode** — enumerates subdomains across multiple machines tied to a domain
- **VHost mode** — enumerates virtual hosts running on a single machine/IP (use this for single-target HTB boxes)

DNS vs Vhosts
Different Use Cases

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

See https://github.com/OJ/gobuster for installation instructions.

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>gobuster [command] -u "http://target.thm" -w /path/to/wordlist</code></li>
</ul>
SecLists Common Directories is recommended as a wordlist.

</div>
</details>

---
## Flags & Options

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Global Flags & Options:</span></summary>
<div class="callout-body">

| Flag | Description | Example |
|------|-------------|---------|
| <code>-u</code> | Target URL | <code>-u "http://example.thm"</code> |
| <code>-w</code> | Wordlist path | <code>-w /usr/share/wordlists/...</code> |
| <code>-t</code> | Number of threads (default 10) | <code>-t 50</code> |
| <code>-o</code> | Write results to file | <code>-o results.txt</code> |
| <code>--delay</code> | Time to wait between requests | <code>--delay 500ms</code> |
| <code>--debug</code> | Troubleshoot errors | <code>--debug</code> |

</div>
</details>

---
## Common Use Cases

### Directory Enumeration
Brute-force directories and files on a web server.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>gobuster dir --help</code></li>
  <li><code>gobuster dir -u "http://www.example.thm" -w /usr/share/wordlists/dirbuster/... -r</code></li>
  <li><code>gobuster dir -u "https://example.thm" -w /usr/share/wordlists/... -x .php,.js</code></li>
</ul>

</div>
</details>

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Dir Flags:</span></summary>
<div class="callout-body">

| Flag | Description | Example |
|------|-------------|---------|
| <code>-c</code> | Cookie to pass with each request | <code>-c "session=abc123"</code> |
| <code>-x</code> | File extensions to scan for | <code>-x .php,.js</code> |
| <code>-H</code> | Custom header to pass with each request | <code>-H "Authorization: Bearer token"</code> |
| <code>-k</code> | Skip TLS certificate check (CTF/self-signed certs) | <code>-k</code> |
| <code>-P</code> | Password for authenticated requests | <code>-P password</code> |
| <code>-U</code> | Username for authenticated requests | <code>-U admin</code> |
| <code>-s</code> | Status codes to display | <code>-s 200,301</code> |
| <code>-b</code> | Status codes to exclude | <code>-b 404,403</code> |
| <code>-r</code> | Follow redirects | <code>-r</code> |

</div>
</details>

---
### DNS Subdomain Enumeration
Enumerate subdomains by combining a domain with wordlist entries and performing DNS lookups.
Example output: `blog.example.thm`, `shop.example.thm`

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>gobuster dns --help</code></li>
  <li><code>gobuster dns -d example.thm -w /usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt</code></li>
</ul>

</div>
</details>

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>DNS Flags:</span></summary>
<div class="callout-body">

| Flag | Description | Example |
|------|-------------|---------|
| <code>-d</code> | Domain to enumerate | <code>-d example.thm</code> |
| <code>-c</code> | Show CNAME records (cannot use with <code>-i</code>) | <code>-c</code> |
| <code>-i</code> | Show IP addresses the domain resolves to | <code>-i</code> |
| <code>-r</code> | Custom DNS server for resolving | <code>-r 8.8.8.8</code> |

</div>
</details>

---
### VHost Enumeration
Enumerate virtual hosts running on the same machine. Use this for single-IP HTB targets.
Virtual hosts are IP-based and run on the same server — unlike DNS subdomains which may point to different machines.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>gobuster vhost --help</code></li>
  <li><code>gobuster vhost -u "http://10.10.120.125" --domain example.thm -w /usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt --append-domain --exclude-length 250-320</code></li>
</ul>
Note: If you omit <code>--append-domain</code> results will be <code>blog.thm</code> instead of <code>blog.example.thm</code>

</div>
</details>

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>/etc/hosts Workflow:</span></summary>
<div class="callout-body">

**When to add to /etc/hosts before scanning:**
- If using a hostname as the base URL (<code>-u http://example.thm</code>): your system needs to resolve it, so add it first
- If using an IP as the base URL (<code>-u http://10.10.10.1</code>): gobuster connects directly to the IP — no /etc/hosts entry needed for the scan
- Recommendation: always use the IP as the base URL for VHost scans; specify the domain separately with <code>--domain</code>

**After finding a VHost:**
- Add the discovered VHost to /etc/hosts to browse it in your browser
<ul class="callout-list">
  <li><code>echo "10.10.10.1   found-vhost.example.thm" | sudo tee -a /etc/hosts</code></li>
</ul>
- The discovered VHost will return a different response only if the web server has a corresponding VHost configuration

</div>
</details>

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>VHost Flags:</span></summary>
<div class="callout-body">

| Flag | Description | Example |
|------|-------------|---------|
| <code>-u</code> | Base URL (use IP for HTB) | <code>-u "http://10.10.10.1"</code> |
| <code>--domain</code> | Appends domain to each wordlist entry | <code>--domain example.thm</code> |
| <code>--append-domain</code> | Forms full hostname: <code>word.example.thm</code> | <code>--append-domain</code> |
| <code>--exclude-length</code> | Exclude responses by body length | <code>--exclude-length 250-320</code> |
| <code>-m</code> | HTTP method to use | <code>-m POST</code> |
| <code>-r</code> | Follow HTTP redirects | <code>-r</code> |

</div>
</details>

---
## Related Concepts
- [HTTP & HTTPS](/knowledge/Networking/HTTP-HTTPS)
- [DNS (Domain Name System)](/knowledge/Networking/DNS-Domain-Name-System)
- [Virtual Hosts](/knowledge/Web-Security/Virtual-Hosts)

## Related Techniques
- [DNS Enumeration](/techniques/DNS-Enumeration)
- [VHost Fuzzing](/techniques/VHost-Fuzzing)

## Related Playbooks
- [Linux Pentest Playbook](/playbooks/Linux-Pentest-Playbook)

---
## References / Images
- DNS vs Vhosts
- Different Use Cases
- Useful Usage
- https://github.com/OJ/gobuster
