---
title: "Burp Suite"
category: "tools"
tags: []
excerpt: "Burp Suite is the industry-standard web application penetration testing framework. It intercepts, modifies, replays,..."
date: "2026-05-03"
---

---
## Overview
Burp Suite is the industry-standard web application penetration testing framework. It intercepts, modifies, replays, fuzzes, and scans HTTP/HTTPS traffic between a browser and a server. Community Edition covers core manual testing features; Professional and Enterprise editions add an automated scanner, unlimited fuzzing speed, and saved project support.

## Target / Context
Web and mobile applications. Used throughout active web application penetration testing for traffic interception, vulnerability discovery, exploitation, and reporting.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

Download from https://portswigger.net/burp/communitydownload
No apt install — use the official installer for your OS.
JAR option (requires JRE): <code>java -jar /path/to/burpsuite.jar</code>
Launch via terminal: <code>burpsuite</code>

</div>
</details>

---
## Community vs Professional

| Feature | Community | Professional |
|---------|-----------|--------------|
| Proxy, Repeater, Decoder | Yes | Yes |
| Intruder | Rate-limited (~1 req/sec) | Unlimited speed |
| Active Web Scanner | No | Yes |
| Saved Projects | Temporary only | Full project save |
| BApp Store extensions | Limited | Full access |
| Educational/business email trial | No | Free trial available |

Dark mode: Burp → Settings → User Interface → Display

---
## Modules

| Module | Purpose |
|--------|---------|
| [Burp Proxy](/tools/Web-Testing/Burp-Suite/Burp-Proxy) | Intercept, inspect, and modify HTTP/HTTPS traffic — core workflow starting point |
| [Burp Repeater](/tools/Web-Testing/Burp-Suite/Burp-Repeater) | Manually replay and modify individual requests — essential for payload testing |
| [Burp Intruder](/tools/Web-Testing/Burp-Suite/Burp-Intruder) | Automated fuzzing and brute-forcing — throttled in Community |
| [Burp Scanner](/tools/Web-Testing/Burp-Suite/Burp-Scanner) | Passive and active vulnerability scanning — active scan is Pro only |
| Decoder | Encode/decode data across multiple schemes — accessible from any tab |
| Comparer | Diff two requests or responses at word or byte level — useful for comparing auth states |
| Sequencer | Assess randomness of tokens and session values — used in session fixation testing |

---
## BApp Store Extensions

Notable extensions available via Extensions tab → BApp Store:

| Extension | Purpose |
|-----------|---------|
| Active Scan++ | Extends active scanner with additional detection checks |
| Autorize | Tests for authorization bypass vulnerabilities automatically |
| CSRF Scanner | Detects CSRF vulnerabilities |
| Retire.JS | Identifies known-vulnerable JavaScript libraries |
| JS Link Finder | Extracts API endpoints and paths from JavaScript files |
| .NET Beautifier | Reformats .NET request bodies for readability |
| Java Deserialization Scanner | Detects Java deserialization vulnerabilities |
| Backslash Powered Scanner | Tests for server-side injection using backslash-based payloads |
| Software Vulnerability Scanner | Checks detected software versions against known CVEs |
| Headers Analyzer | Identifies missing or misconfigured HTTP security headers |

Install via Extensions → BApp Store → Install. Some extensions require Jython — install it first if prompted.

---
## Related Concepts
- [Web Application Proxies](/knowledge/Web-Security/Web-Application-Proxies)
- [HTTP & HTTPS](/knowledge/Networking/HTTP-HTTPS)
- [Website Innerworkings](/knowledge/Web-Security/Website-Innerworkings)
- [OWASP Top 10 - 2021](/knowledge/Web-Security/OWASP-Top-10---2021)

## Related Techniques
- [XSS](/techniques/XSS)
- [SQL Injection](/techniques/SQL-Injection)
- [WordPress Attacks](/techniques/WordPress-Attacks)

## Related Playbooks
- [Linux Pentest Playbook](/playbooks/Linux-Pentest-Playbook)
- [Windows Pentest Playbook](/playbooks/Windows-Pentest-Playbook)

---
## References / Images
- https://portswigger.net/burp
- https://portswigger.net/burp/documentation
