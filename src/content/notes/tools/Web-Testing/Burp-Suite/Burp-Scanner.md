---
title: "Burp Scanner"
category: "tools"
tags: []
excerpt: "Burp Scanner is a Professional-only automated vulnerability scanner that builds a site map using a web crawler and then..."
date: "2026-05-03"
---

---
## Overview
Burp Scanner is a Professional-only automated vulnerability scanner that builds a site map using a web crawler and then identifies vulnerabilities through passive analysis and active injection testing. The active scan covers XSS, SQL injection, command injection, SSRF, and dozens of other common vulnerability classes. Not available in Community Edition.

## Target / Context
Web applications within defined scope. Used during professional web application penetration tests for automated vulnerability discovery to supplement manual testing with Repeater and Intruder.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

Part of Burp Suite Professional — see [Burp Suite](/tools/Web-Testing/Burp-Suite/Burp-Suite) for installation.
Community Edition does not include active scanning.

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

1. Define scope in Target tab
2. Dashboard → New Scan
3. Select scan type: Crawl and Audit, Crawl only, or Audit only
4. Configure crawl settings and audit configuration → OK
5. Monitor scan progress in Dashboard → Tasks → View Details

</div>
</details>

---
## Common Use Cases

### Configure Target Scope

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Steps:</span></summary>
<div class="callout-body">

Target tab → Site Map → right-click target host → Add to Scope
To exclude specific paths (e.g., logout URL that would end your session): right-click path → Remove from Scope
Advanced filtering: Target tab → Scope → add regex patterns for include/exclude rules

</div>
</details>

### Run a Crawl (Map the Application)
Burp Crawler follows links and form submissions to build a complete map of accessible pages. It does NOT perform dictionary-based path discovery — use [Burp Intruder](/tools/Web-Testing/Burp-Suite/Burp-Intruder) or [GoBuster](/tools/Enumeration/Gobuster) for that.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Steps:</span></summary>
<div class="callout-body">

1. Dashboard → New Scan → Crawl
2. Scan Configuration tab → Select From Library → choose preset (e.g., "Crawl Strategy - Fastest")
3. Application Login tab:
- Add credentials directly for standard login forms
- Or record a login sequence via the pre-configured browser so Burp can authenticate automatically
4. OK → monitor progress in Dashboard
5. When complete, check Target → Site Map for the full application map

</div>
</details>

### Passive Scan
Analyzes the source of already-visited pages without sending additional requests. Catches surface-level issues such as missing security headers, potential DOM-based XSS, and information disclosure.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Steps:</span></summary>
<div class="callout-body">

Proxy HTTP History → right-click request → Do passive scan
OR: Target Site Map → right-click host → Passively scan this target
Results: Target tab → Issue Activity tab
Priority: High severity + Certain or Firm confidence

</div>
</details>

### Active Scan
Crawls the application and then actively injects payloads to verify vulnerabilities. Covers XSS, SQL injection, command injection, path traversal, SSRF, and more.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Steps:</span></summary>
<div class="callout-body">

1. Dashboard → New Scan → Crawl and Audit
2. Crawl options: same as above
3. Audit Configuration tab → Select From Library → choose preset
- "Audit checks - all issues" for comprehensive testing
- "Audit checks - critical issues only" for high-severity findings only
4. OK → monitor via Dashboard → Tasks → View Details
5. Logger tab in task details shows every request the scanner sent
6. Issue Activity tab → filter High severity + Certain confidence for prioritized findings
7. Click any finding → read advisory, review PoC request/response pair

</div>
</details>

### Start a Targeted Scan from History
Scan a specific request rather than the whole application.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Steps:</span></summary>
<div class="callout-body">

Proxy HTTP History → right-click request → Scan
Select "Active scan" or "Passive scan" to start immediately with default config
Or select "Scan" to configure before running

</div>
</details>

### Generate a Vulnerability Report

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Steps:</span></summary>
<div class="callout-body">

Target tab → Site Map → right-click target host → Issues → Report issues for this host
Select export format — HTML recommended for review
Open in browser: includes vulnerability descriptions, severity ratings, and PoC request/response pairs
This output is supplementary appendix data for a pentest report, not a final deliverable on its own.

</div>
</details>

---
## Passive vs Active Comparison

| Feature | Passive | Active |
|---------|---------|--------|
| Sends new requests | No | Yes |
| Speed | Fast | Slow |
| Coverage | Limited to what's already loaded | Crawls and fuzzes the full application |
| Confidence level | Low to medium | Medium to high |
| Risk to target | None | Can trigger application errors or alerts |
| Requires Pro license | No | Yes |

---
## Related Techniques
- [SQL Injection](/techniques/SQL-Injection)
- [XSS](/techniques/XSS)
- [WordPress Attacks](/techniques/WordPress-Attacks)

## Related Playbooks
- [Linux Pentest Playbook](/playbooks/Linux-Pentest-Playbook)

## Related Tools
- [Burp Suite](/tools/Web-Testing/Burp-Suite/Burp-Suite)
- [Burp Proxy](/tools/Web-Testing/Burp-Suite/Burp-Proxy)
- [Burp Intruder](/tools/Web-Testing/Burp-Suite/Burp-Intruder)
- [OWASP ZAP](/tools/Web-Testing/OWASP-ZAP/OWASP-ZAP)

---
## References / Images
- https://portswigger.net/burp/documentation/scanner
