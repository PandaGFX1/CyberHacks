Tags: #Status/In-Progress #Type/Tool #Context/Web #Context/Redteam

---
## Overview
Burp Scanner is a Professional-only automated vulnerability scanner that builds a site map using a web crawler and then identifies vulnerabilities through passive analysis and active injection testing. The active scan covers XSS, SQL injection, command injection, SSRF, and dozens of other common vulnerability classes. Not available in Community Edition.

## Target / Context
Web applications within defined scope. Used during professional web application penetration tests for automated vulnerability discovery to supplement manual testing with Repeater and Intruder.

---
## Installation

> [!INFO]- Installation Commands:
> Part of Burp Suite Professional — see [[Burp Suite]] for installation.
> Community Edition does not include active scanning.

---
## Basic Usage

> [!INFO]- Basic Usage:
> 1. Define scope in Target tab
> 2. Dashboard → New Scan
> 3. Select scan type: Crawl and Audit, Crawl only, or Audit only
> 4. Configure crawl settings and audit configuration → OK
> 5. Monitor scan progress in Dashboard → Tasks → View Details

---
## Common Use Cases

### Configure Target Scope

> [!INFO]- Steps:
> Target tab → Site Map → right-click target host → Add to Scope
> To exclude specific paths (e.g., logout URL that would end your session): right-click path → Remove from Scope
> Advanced filtering: Target tab → Scope → add regex patterns for include/exclude rules

### Run a Crawl (Map the Application)
Burp Crawler follows links and form submissions to build a complete map of accessible pages. It does NOT perform dictionary-based path discovery — use [[Burp Intruder]] or [[GoBuster]] for that.

> [!INFO]- Steps:
> 1. Dashboard → New Scan → Crawl
> 2. Scan Configuration tab → Select From Library → choose preset (e.g., "Crawl Strategy - Fastest")
> 3. Application Login tab:
>    - Add credentials directly for standard login forms
>    - Or record a login sequence via the pre-configured browser so Burp can authenticate automatically
> 4. OK → monitor progress in Dashboard
> 5. When complete, check Target → Site Map for the full application map

### Passive Scan
Analyzes the source of already-visited pages without sending additional requests. Catches surface-level issues such as missing security headers, potential DOM-based XSS, and information disclosure.

> [!INFO]- Steps:
> Proxy HTTP History → right-click request → Do passive scan
> OR: Target Site Map → right-click host → Passively scan this target
> Results: Target tab → Issue Activity tab
> Priority: High severity + Certain or Firm confidence

### Active Scan
Crawls the application and then actively injects payloads to verify vulnerabilities. Covers XSS, SQL injection, command injection, path traversal, SSRF, and more.

> [!INFO]- Steps:
> 1. Dashboard → New Scan → Crawl and Audit
> 2. Crawl options: same as above
> 3. Audit Configuration tab → Select From Library → choose preset
>    - "Audit checks - all issues" for comprehensive testing
>    - "Audit checks - critical issues only" for high-severity findings only
> 4. OK → monitor via Dashboard → Tasks → View Details
> 5. Logger tab in task details shows every request the scanner sent
> 6. Issue Activity tab → filter High severity + Certain confidence for prioritized findings
> 7. Click any finding → read advisory, review PoC request/response pair

### Start a Targeted Scan from History
Scan a specific request rather than the whole application.

> [!INFO]- Steps:
> Proxy HTTP History → right-click request → Scan
> Select "Active scan" or "Passive scan" to start immediately with default config
> Or select "Scan" to configure before running

### Generate a Vulnerability Report

> [!INFO]- Steps:
> Target tab → Site Map → right-click target host → Issues → Report issues for this host
> Select export format — HTML recommended for review
> Open in browser: includes vulnerability descriptions, severity ratings, and PoC request/response pairs
> This output is supplementary appendix data for a pentest report, not a final deliverable on its own.

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
- [[SQL Injection]]
- [[XSS]]
- [[WordPress Attacks]]

## Related Playbooks
- [[Linux Pentest Playbook]]

## Related Tools
- [[Burp Suite]]
- [[Burp Proxy]]
- [[Burp Intruder]]
- [[OWASP ZAP]]

---
## References / Images
- https://portswigger.net/burp/documentation/scanner
