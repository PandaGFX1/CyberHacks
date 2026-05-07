Tags: #Status/In-Progress #Type/Knowledge #Context/Web #Context/Redteam

---
## Overview
Web fingerprinting extracts technical details about the technologies, frameworks, and infrastructure powering a target web application. Server software, CMS platforms, programming languages, and WAF products each leave distinctive signatures in HTTP headers, response bodies, error pages, and behavior patterns. Identifying these components early in reconnaissance allows an attacker to research known vulnerabilities, misconfigurations, and default credential sets specific to those technologies.

---

## Terminology
| Term | Definition |
|------|------------|
| Fingerprint | A unique identifier derived from software behavior, headers, or responses that reveals the underlying technology |
| Banner | A string returned by a service (e.g., HTTP Server header) disclosing software name and version |
| WAF (Web Application Firewall) | A security appliance that filters and monitors HTTP requests to protect web applications |
| Server Header | HTTP response header disclosing the web server software and version (e.g., `Server: Apache/2.4.50`) |
| X-Powered-By | HTTP response header revealing the backend technology or framework (e.g., `X-Powered-By: PHP/7.4.3`) |
| CMS | Content Management System — platforms like WordPress, Joomla, or Drupal with identifiable signatures |

---
## Core Concepts

### Why Fingerprinting Matters
Knowing what a target runs narrows the attack surface significantly:
- **Targeted attacks** — research CVEs and public exploits specific to identified software versions
- **Misconfiguration identification** — default settings, exposed config paths, and default credentials are version-specific
- **Priority decisions** — systems running outdated or unsupported software are higher-value targets
- **Comprehensive profiling** — fingerprinting feeds into all subsequent phases of the engagement

---

### Fingerprinting Techniques

#### Banner Grabbing
Retrieve the HTTP response headers using a HEAD or GET request. The `Server` header typically discloses the web server software and version. Redirects may reveal additional technology in subsequent headers.

`curl -I example.com` — Sends a HEAD request and prints only response headers. Use `--head` as an alternative.

Look for:
- `Server: Apache/2.4.50 (Ubuntu)` — web server, version, and OS hint
- `X-Powered-By: PHP/8.1.0` — backend language and version
- Redirect targets (e.g., `Location: https://example.com/wordpress/`) — reveals subdirectory installs

#### Analyzing HTTP Headers
Some headers are less obvious but equally revealing:
- `X-Generator` — CMS version (common in WordPress, Drupal)
- `X-AspNet-Version` — ASP.NET version
- `Set-Cookie` names (e.g., `PHPSESSID` = PHP, `JSESSIONID` = Java/Tomcat, `ASP.NET_SessionId` = ASP.NET)
- `Via` and `X-Cache` — reveal CDN or proxy infrastructure in use

#### Probing for Specific Responses
Send requests to paths known to exist only in certain platforms:
- `/wp-login.php` — WordPress login page
- `/administrator/` — Joomla admin panel
- `/Umbraco/` — Umbraco CMS
- `/.git/HEAD` — exposed Git repository
- `/phpinfo.php` — PHP configuration disclosure

#### Analyzing Page Content
Page source often reveals technology choices:
- HTML comments (e.g., `<!-- Powered by WordPress -->`), generator meta tags (`<meta name="generator" content="WordPress 6.3">`)
- JavaScript library paths (e.g., `/wp-includes/js/`, `/sites/default/files/`) reveal CMS
- CSS class naming conventions (`wp-content`, `drupal-`) are platform-specific

---

### Fingerprinting Tools

| Tool | Description | Use Case |
|------|-------------|----------|
| [[Nikto]] | Web server scanner; identifies outdated software, misconfigurations, and dangerous files | Active scan for known vulnerabilities and version fingerprinting |
| [[wafw00f]] | Dedicated WAF detection tool | Identify which WAF is protecting the target before crafting requests |
| Wappalyzer | Browser extension that identifies web technologies passively | Passive fingerprinting while browsing; identifies CMS, frameworks, analytics |
| BuiltWith | Web profiler showing full technology stack | Quick overview of a target's technology; no installation needed |
| WhatWeb | Command-line tool using a signature database to identify web technologies | Automated fingerprinting from the terminal |
| [[Nmap]] | NSE scripts can fingerprint web servers and applications | Use with `-sV` and web-specific scripts (e.g., `http-headers`, `http-methods`) |
| Netcraft | Online service providing website fingerprinting and hosting history | Passive fingerprinting; reveals hosting provider, technology, and uptime |

---

### WAF Detection
WAFs can block or modify reconnaissance requests. Before active scanning, determine if a WAF is present and which product it is. Use [[wafw00f]] for automated detection.

WAF presence indicators:
- Requests blocked with non-standard status codes (403, 406, 501)
- Response body contains WAF vendor language (e.g., "Access Denied by Cloudflare")
- Cookie injection by the WAF (e.g., `__cfduid`, `X-CDN`)
- Request modification — responses differ subtly from direct server responses

---
## Related Concepts
- [[Web Reconnaissance]]
- [[Web Crawling]]
- [[HTTP & HTTPS]]
- [[Website Innerworkings]]

## Related Techniques
- [[DNS Enumeration]]

## Related Playbooks
- [[Linux Pentest Playbook]]

## Related Tools
- [[Nikto]]
- [[wafw00f]]
- [[Nmap]]
- [[curl]]

---
## References / Images
-
