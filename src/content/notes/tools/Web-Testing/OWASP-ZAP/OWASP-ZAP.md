---
title: "OWASP ZAP"
category: "tools"
tags: []
excerpt: "ZAP (Zed Attack Proxy), maintained as 'ZAP by Checkmarx' under the Linux Foundation's Software Security Project, is a..."
date: "2026-05-03"
---

---
## Overview
ZAP (Zed Attack Proxy), maintained as "ZAP by Checkmarx" under the Linux Foundation's Software Security Project, is a free and open-source web application security testing framework. It provides the core features of Burp Suite Professional — intercepting proxy, active vulnerability scanner, and unlimited-speed fuzzer — with no paid tier or throttling. Previously an OWASP project, ZAP moved to independent governance in 2023 and remains actively developed.

## Target / Context
Web applications. The go-to free alternative to Burp Suite Professional when an active scanner or high-speed fuzzer is needed. Especially useful in CTF environments and community-edition-only setups where Burp's throttled Intruder is too slow.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

Download from https://www.zaproxy.org/download/
Choose the installer for your OS and follow installation instructions.
JAR option (requires JRE): <code>java -jar /path/to/zap.jar</code>
Launch via terminal: <code>zaproxy</code>
Dark mode: Tools → Options → Display → "Flat Dark" in Look and Feel

</div>
</details>

---
## Basic Setup

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Quick Start:</span></summary>
<div class="callout-body">

1. Launch ZAP (<code>zaproxy</code>)
2. Use the built-in Firefox browser (browser icon in toolbar) — pre-configured to route through ZAP; no proxy or cert setup required
3. Or configure FoxyProxy in a real browser to <code>127.0.0.1:8080</code>

</div>
</details>

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Proxy Listener Port:</span></summary>
<div class="callout-body">

Tools → Options → Network → Local Servers/Proxies
Default: 8080 — change if there is a conflict with Burp or another tool

</div>
</details>

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>CA Certificate (for real browser HTTPS):</span></summary>
<div class="callout-body">

Tools → Options → Network → Server Certificates → Save
Firefox: <code>about:preferences#privacy</code> → View Certificates → Authorities → Import
Check "Trust this CA to identify websites" and "Trust this CA to identify email users" → OK
Not required when using ZAP's built-in browser.

</div>
</details>

---
## Heads Up Display (HUD)
ZAP's in-browser overlay that surfaces the most common ZAP controls directly within the browser window, without switching back to the main UI. Enable via the rightmost green circle button on the ZAP toolbar.

The HUD is not a separate module — it is a UI layer on top of all ZAP features. The intercept toggle, fuzzer access, spider, and active scan are all reachable from the HUD. Full details for each are in the relevant child notes.

| HUD Element | Side | Function |
|-------------|------|----------|
| Interception toggle | Left, 2nd button | Enable/disable request interception |
| Enable hidden/disabled fields | Left, 3rd button (light bulb) | Enable disabled inputs and reveal hidden form fields on current page |
| Comments | Left, "+" button | Show HTML comment markers on the current page |
| Alert count — page | Left pane count | Number of alerts on the current page only |
| Sites Tree | Right, 1st button | View all mapped endpoints in the Sites Tree |
| Ajax Spider | Right, 3rd button | Start Ajax Spider on the current page |
| Active Scan | Right pane button | Start active vulnerability scan against current scope |
| Alert count — total | Right pane count | Total alerts found across the whole application |

---
## Modules

| Module | Purpose |
|--------|---------|
| [ZAP Proxy](/tools/Web-Testing/OWASP-ZAP/ZAP-Proxy) | Intercept and modify requests and responses; Replacer for persistent changes |
| [ZAP Fuzzer](/tools/Web-Testing/OWASP-ZAP/ZAP-Fuzzer) | Automated fuzzing and brute-forcing with no speed throttle |
| [ZAP Scanner](/tools/Web-Testing/OWASP-ZAP/ZAP-Scanner) | Spider, Ajax Spider, passive scan, and active vulnerability scan |

---
## ZAP Marketplace Extensions

Access: ZAP toolbar → Manage Add-ons icon → Marketplace tab. Prefer Release builds — Beta and Alpha add-ons may cause instability.

| Add-On | Stability | Purpose |
|--------|-----------|---------|
| FuzzDB Files | Release | Adds large FuzzDB wordlist collection for directory and parameter fuzzing |
| FuzzDB Offensive | Release | Attack-focused wordlists — OS command injection, SQLi, XSS payloads, etc. |

After installing FuzzDB Offensive, additional categories appear under File Fuzzers in the fuzzer payload screen, including `FuzzDB > Attack > OS-CMD-Execution`.

---
## Related Concepts
- [Web Application Proxies](/knowledge/Web-Security/Web-Application-Proxies)
- [HTTP & HTTPS](/knowledge/Networking/HTTP-HTTPS)

## Related Techniques
- [XSS](/techniques/XSS)
- [SQL Injection](/techniques/SQL-Injection)

## Related Playbooks
- [Linux Pentest Playbook](/playbooks/Linux-Pentest-Playbook)

## Related Tools
- [Burp Suite](/tools/Web-Testing/Burp-Suite/Burp-Suite)

---
## References / Images
- https://www.zaproxy.org/
- https://github.com/zaproxy/zaproxy
