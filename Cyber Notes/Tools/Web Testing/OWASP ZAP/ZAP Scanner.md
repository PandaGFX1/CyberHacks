Tags: #Status/In-Progress #Type/Tool #Context/Web #Context/Redteam

---
## Overview
ZAP Scanner covers the full site mapping and vulnerability scanning workflow: Spider to map linked pages, Ajax Spider to catch JavaScript-loaded content, passive analysis that runs automatically on all captured traffic, and active scanning that injects payloads to confirm vulnerabilities. Unlike Burp's active scanner, ZAP Scanner is completely free.

## Target / Context
Web applications added to ZAP scope. The typical workflow is: Spider → Ajax Spider → Active Scan. Passive scanning runs automatically throughout — no manual trigger needed.

---
## Installation

> [!INFO]- Installation Commands:
> Part of OWASP ZAP — see [[OWASP ZAP]] for installation.

---
## Basic Usage

> [!INFO]- Recommended Workflow:
> 1. Browse the target using ZAP's browser — ZAP begins passive scanning automatically
> 2. Run Spider to map all linked pages (adds to scope if not already in it)
> 3. Run Ajax Spider to catch JavaScript-loaded content the regular spider missed
> 4. Review Sites tab to confirm coverage
> 5. Run Active Scan to inject payloads and confirm vulnerabilities
> 6. Review Alerts tab — prioritize High severity findings
> 7. Generate report when done

---
## Common Use Cases

### Spider — Map Linked Pages
Crawls the target by following links and form submissions. Does not do dictionary-based path brute-forcing — use [[ZAP Fuzzer]] for that.

> [!INFO]- Steps:
> History tab or Site Map → right-click request → Attack → Spider
> If prompted that the target is not in scope, click Yes to add it automatically
> When complete: Sites tab (main UI) shows all discovered endpoints
> HUD shortcut: HUD right pane, Sites Tree button (1st) shows the current map at any point

### Ajax Spider — Catch JavaScript Content
Supplements the regular spider by executing JavaScript and capturing AJAX requests that fire after the page loads. Always run after the regular spider.

> [!INFO]- Steps:
> ZAP main UI: right-click target in Sites tab → Attack → Ajax Spider
> HUD shortcut: right pane, 3rd button
> Takes significantly longer than the regular spider — let it run until it reports no new URLs

### Passive Scanner — Automatic Analysis
Runs automatically on every request and response ZAP sees — no separate trigger needed. Catches surface-level issues: missing security headers, potential DOM-based XSS, information disclosure in responses, and similar low-effort findings.

Results appear in the Alerts tab (main UI) as traffic is captured. Left HUD pane shows the alert count for the current page; right pane shows the total across the app.

### Active Scan — Inject and Verify

> [!INFO]- Steps:
> 1. Ensure the site has been spidered first (active scan uses the site map as its target list)
> 2. HUD right pane → Active Scan, or right-click target in Sites tab → Attack → Active Scan
> 3. Active scan will auto-run the spider first if the site map is empty
> 4. Monitor progress in the ZAP main UI — scan status shown in the toolbar
> 5. Alerts tab → filter by Risk = High for the most critical findings
> 6. Click any alert to view: description, risk level, CWE reference, and PoC request/response pair
> 7. Use the URL in the alert details to replay the request via ZAP Request Editor or HUD for manual confirmation

### Generate a Vulnerability Report

> [!INFO]- Steps:
> Reports menu → Generate HTML Report (XML and Markdown also available)
> Open in browser — includes vulnerability list with severity, CWE/WASC references, and PoC request/response evidence

---
## Passive vs Active Comparison

| Feature | Passive | Active |
|---------|---------|--------|
| Sends new requests | No | Yes |
| Speed | Instant — runs as you browse | Slow — crawls and fuzzes the whole app |
| Coverage | Only what has already been loaded | Full application after spidering |
| Confidence | Low to medium | Medium to high |
| Risk to target | None | May trigger alerts or application errors |
| Requires manual trigger | No — always running | Yes |

---
## Related Techniques
- [[SQL Injection]]
- [[XSS]]
- [[WordPress Attacks]]

## Related Playbooks
- [[Linux Pentest Playbook]]

## Related Tools
- [[OWASP ZAP]]
- [[ZAP Proxy]]
- [[ZAP Fuzzer]]
- [[Burp Scanner]]

---
## References / Images
- https://www.zaproxy.org/docs/desktop/ui/dialogs/spider/
- https://www.zaproxy.org/docs/desktop/addons/ajax-spider/
