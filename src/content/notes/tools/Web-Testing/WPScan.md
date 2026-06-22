---
title: "WPScan"
category: "tools"
tags: []
excerpt: "WPScan is a black-box WordPress security scanner used to identify vulnerabilities, enumerate plugins and themes, detect..."
date: "2026-06-22"
---

---
## Overview
WPScan is a black-box WordPress security scanner used to identify vulnerabilities, enumerate plugins and themes, detect user accounts, and audit WordPress installations. It is commonly used during web application reconnaissance to surface exploitable components in WordPress-based targets.

## Target / Context
WordPress-based web applications during external or internal web penetration testing.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>gem install wpscan</code></li>
</ul>
Docker: <code>docker pull wpscanteam/wpscan</code>

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>wpscan --url https://<target></code></li>
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
| <code>--url</code> | Target WordPress URL | <code>--url https://10.129.12.10</code> |
| <code>-e p</code> | Enumerate installed plugins | <code>-e p</code> |
| <code>-e u</code> | Enumerate user accounts | <code>-e u</code> |
| <code>-e t</code> | Enumerate installed themes | <code>-e t</code> |
| <code>-e ap</code> | Enumerate all plugins (passive + aggressive) | <code>-e ap</code> |
| <code>--plugins-detection</code> | Set plugin detection mode: passive, mixed, aggressive | <code>--plugins-detection aggressive</code> |
| <code>--disable-tls-checks</code> | Skip TLS/SSL certificate verification | <code>--disable-tls-checks</code> |
| <code>--no-banner</code> | Suppress the WPScan banner in output | <code>--no-banner</code> |
| <code>-t</code> | Number of threads to use | <code>-t 100</code> |
| <code>-o</code> | Write output to a file | <code>-o wpscan_results.txt</code> |
| <code>--api-token</code> | WPScan API token for vulnerability data from WPVulnDB | <code>--api-token <token></code> |
| <code>--password-attack</code> | Attack method for brute force: <code>xmlrpc</code> or <code>wp-login</code> | <code>--password-attack xmlrpc</code> |
| <code>-U</code> | Target username(s) for brute force; comma-separated | <code>-U admin,editor</code> |
| <code>-P</code> | Path to password wordlist for brute force | <code>-P /usr/share/wordlists/rockyou.txt</code> |

</div>
</details>

---
## Common Use Cases

### Plugin Enumeration (Aggressive)
Enumerates all plugins using aggressive detection — sends more requests but finds more results.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>wpscan -e p --url https://10.129.12.10 --disable-tls-checks --no-banner --plugins-detection aggressive -t 100</code></li>
</ul>

</div>
</details>

### User Enumeration
Enumerate WordPress user accounts, which can then be targeted for brute-force or credential testing.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>wpscan --url https://<target> -e u --disable-tls-checks</code></li>
</ul>

</div>
</details>

### Full Enumeration
Enumerate plugins, themes, users, and timthumbs in a single run.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>wpscan --url https://<target> -e ap,at,u --disable-tls-checks --no-banner -t 50</code></li>
</ul>

</div>
</details>

### Password Brute Force
Brute-force credentials against a WordPress login using either the xmlrpc.php endpoint or the wp-login form. The xmlrpc method is generally faster and less likely to be blocked.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>wpscan --password-attack xmlrpc -t 20 -U <user1>,<user2> -P <wordlist.txt> --url http://<target></code></li>
  <li><code>wpscan --password-attack wp-login -t 5 -U <username> -P <wordlist.txt> --url http://<target></code></li>
</ul>

</div>
</details>

| Flag | Description |
|------|-------------|
| `--password-attack xmlrpc` | Attack via the XML-RPC endpoint (faster; multiple credentials per request) |
| `--password-attack wp-login` | Attack via the standard login form |
| `-U <user>` | Target username(s); comma-separated for multiple |
| `-P <file>` | Path to the password wordlist |

### Vulnerability Research via Metasploit
After identifying a plugin or theme version, search for known exploits in Metasploit.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>msfconsole -q</code></li>
  <li><code>search wordpress <plugin-name></code></li>
  <li><code>use 0</code></li>
</ul>
<code>info 0</code> — verify the module targets the identified version before using

</div>
</details>

---
## Related Techniques
- [WordPress Attacks](/techniques/WordPress-Attacks)
- [SQL Injection](/techniques/SQL-Injection)

## Related Playbooks
- [Linux Pentest Playbook](/playbooks/Linux-Pentest-Playbook)
- [Red Team](/playbooks/Methodologies/Red-Team)

---
## References / Images
- https://github.com/wpscanteam/wpscan
