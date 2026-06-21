---
title: "ZAP Proxy"
category: "tools"
tags: []
excerpt: "ZAP Proxy intercepts HTTP and HTTPS traffic between the browser and the back-end server, allowing real-time examination..."
date: "2026-05-03"
---

---
## Overview
ZAP Proxy intercepts HTTP and HTTPS traffic between the browser and the back-end server, allowing real-time examination and modification of requests and responses. The Replacer feature extends this by applying automatic find-and-replace rules to every request or response without needing manual interception each time.

## Target / Context
Any web application. Used during active web penetration testing to inspect and manipulate HTTP/HTTPS traffic. Paired with [ZAP Fuzzer](/tools/Web-Testing/OWASP-ZAP/ZAP-Fuzzer) and [ZAP Scanner](/tools/Web-Testing/OWASP-ZAP/ZAP-Scanner) for the full testing workflow.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

Part of OWASP ZAP — see [OWASP ZAP](/tools/Web-Testing/OWASP-ZAP/OWASP-ZAP) for installation and setup.

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

1. Launch ZAP and open the built-in browser, or proxy a real browser through ZAP (see [OWASP ZAP](/tools/Web-Testing/OWASP-ZAP/OWASP-ZAP) for CA cert setup)
2. Toggle interception on: green button (top right of ZAP UI) or CTRL+B
3. Browse to the target — the held request appears in the top-right pane of the ZAP UI
4. Examine, modify, then forward or drop the request

</div>
</details>

---
## Common Use Cases

### Intercept and Forward a Request

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Steps:</span></summary>
<div class="callout-body">

1. CTRL+B to enable interception
2. Browse to the target — request is held and shown in the ZAP UI top-right pane
3. **Step** — forward the current request and automatically intercept the response; use this to examine every page action one at a time
4. **Continue** — release all remaining held requests; use this once you have the specific request you need and want the rest to pass through

Via HUD: left pane 2nd button toggles interception from within the browser

</div>
</details>

### Intercept and Modify Responses
Useful for enabling disabled form fields, revealing hidden inputs, or bypassing client-side restrictions before the browser renders the page.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Steps:</span></summary>
<div class="callout-body">

1. With interception enabled, click **Step** after forwarding the triggering request
2. ZAP automatically holds the response for editing before it reaches the browser
3. Modify the response body as needed (e.g., remove <code>disabled</code> attribute, change <code>type="number"</code> to <code>type="text"</code>)
4. Forward the modified response

HUD shortcut: left pane 3rd button (light bulb) enables disabled inputs and shows hidden fields on the current page without intercepting each response manually.

</div>
</details>

### Automatic Modification — Replacer
Persist request or response changes across every matching request without manual interception. Access via CTRL+R or Tools → Options → Replacer.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Example — Override User-Agent:</span></summary>
<div class="callout-body">

Click Add
| Field | Value |
|-------|-------|
| Description | Custom User-Agent |
| Match Type | Request Header (will add if not present) |
| Match String | User-Agent |
| Replacement String | HackTheBox Agent 1.0 |
| Enable | True |
Initiators tab controls where this rule applies — default is all HTTP(S) messages.

</div>
</details>

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Example — Persistent Response Body Change:</span></summary>
<div class="callout-body">

| Field | Value |
|-------|-------|
| Match Type | Response Body String |
| Match String | <code>type="number"</code> |
| Replacement String | <code>type="text"</code> |
| Enable | True |
Applies automatically on every page load — no need to intercept and re-edit each response.

</div>
</details>

### View Proxy History
Proxy → History tab (main UI) or the bottom History pane.
Can filter and sort by host, method, status code, or response size. Right-click any request to send it directly to the Fuzzer or re-open in the Request Editor.

### Encoding and Decoding
ZAP's Encoder/Decoder/Hash tool is available via CTRL+E. Add tabs for any scheme (Base64, URL, MD5, SHA, HTML) — input transforms in real time. Chain multiple transforms by copying output into a new input tab. This is a utility, not a core workflow step — use it when a parameter or payload needs encoding before sending.

---
## Related Techniques
- [SQL Injection](/techniques/SQL-Injection)
- [XSS](/techniques/XSS)

## Related Playbooks
- [Linux Pentest Playbook](/playbooks/Linux-Pentest-Playbook)

## Related Tools
- [OWASP ZAP](/tools/Web-Testing/OWASP-ZAP/OWASP-ZAP)
- [ZAP Fuzzer](/tools/Web-Testing/OWASP-ZAP/ZAP-Fuzzer)
- [ZAP Scanner](/tools/Web-Testing/OWASP-ZAP/ZAP-Scanner)
- [Burp Proxy](/tools/Web-Testing/Burp-Suite/Burp-Proxy)

---
## References / Images
- https://www.zaproxy.org/docs/desktop/ui/dialogs/replacer/
