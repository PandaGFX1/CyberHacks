Tags: #Status/In-Progress #Type/Tool #Context/Web #Context/Redteam

---
## Overview
Burp Suite is the industry-standard web application penetration testing framework. It intercepts, modifies, replays, fuzzes, and scans HTTP/HTTPS traffic between a browser and a server. Community Edition covers core manual testing features; Professional and Enterprise editions add an automated scanner, unlimited fuzzing speed, and saved project support.

## Target / Context
Web and mobile applications. Used throughout active web application penetration testing for traffic interception, vulnerability discovery, exploitation, and reporting.

---
## Installation

> [!INFO]- Installation Commands:
> Download from https://portswigger.net/burp/communitydownload
> No apt install — use the official installer for your OS.
> JAR option (requires JRE): `java -jar /path/to/burpsuite.jar`
> Launch via terminal: `burpsuite`

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
| [[Burp Proxy]] | Intercept, inspect, and modify HTTP/HTTPS traffic — core workflow starting point |
| [[Burp Repeater]] | Manually replay and modify individual requests — essential for payload testing |
| [[Burp Intruder]] | Automated fuzzing and brute-forcing — throttled in Community |
| [[Burp Scanner]] | Passive and active vulnerability scanning — active scan is Pro only |
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
- [[Web Application Proxies]]
- [[HTTP & HTTPS]]
- [[Website Innerworkings]]
- [[OWASP Top 10 - 2021]]

## Related Techniques
- [[XSS]]
- [[SQL Injection]]
- [[WordPress Attacks]]

## Related Playbooks
- [[Linux Pentest Playbook]]
- [[Windows Pentest Playbook]]

---
## References / Images
- https://portswigger.net/burp
- https://portswigger.net/burp/documentation
