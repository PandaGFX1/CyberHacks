---
title: "Burp Repeater"
category: "tools"
tags: []
excerpt: "Burp Repeater manually replays any captured HTTP request, allowing rapid parameter changes and repeated submission..."
date: "2026-05-03"
---

---
## Overview
Burp Repeater manually replays any captured HTTP request, allowing rapid parameter changes and repeated submission without re-navigating the application. The primary tool for manual payload testing, endpoint exploration, and confirming vulnerabilities before escalating to automated scanning.

## Target / Context
Individual HTTP requests captured by Burp Proxy. Used throughout web application testing whenever a specific request needs repeated testing with varied inputs.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

Part of Burp Suite — see [Burp Suite](/tools/Web-Testing/Burp-Suite/Burp-Suite) for installation.

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

1. In the Proxy Intercept pane or HTTP History, right-click a request → Send to Repeater (CTRL+R)
2. Navigate to Repeater tab (CTRL+SHIFT+R)
3. Modify the request — edit parameters, headers, body, or method
4. Click Send — the response appears in the right pane

</div>
</details>

---
## Flags & Options

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Repeater Controls:</span></summary>
<div class="callout-body">

| Action | Shortcut / Location |
|--------|---------------------|
| Send to Repeater | CTRL+R from anywhere in Burp |
| Navigate to Repeater tab | CTRL+SHIFT+R |
| Change HTTP method | Method dropdown in request pane — toggles GET/POST without rewriting the request |
| URL-encode selected text | Select text → CTRL+U (or right-click → Convert Selection → URL → URL-encode key characters) |
| Encode while typing | Right-click → enable "URL-encode as you type" |

</div>
</details>

---
## Common Use Cases

### Manual Payload Testing

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Example — SQL Injection:</span></summary>
<div class="callout-body">

1. Capture a login POST request in Proxy
2. CTRL+R to send to Repeater
3. Replace the password value with <code>' OR 1=1-- -</code>
4. Click Send — inspect the response for authentication bypass indicators (redirect, welcome message, changed body length)

</div>
</details>

### Bypass Client-Side Input Filters

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Example — XSS via Numeric Field:</span></summary>
<div class="callout-body">

1. Submit valid data through a number-only form field to capture the request in Proxy
2. CTRL+R to send to Repeater
3. Replace the numeric parameter value with <code><script>alert("XSS")</script></code>
4. URL-encode the payload: CTRL+U
5. Send — if the server doesn't validate input type server-side, the payload executes

</div>
</details>

### Encoding and Decoding
Burp Inspector (accessible within Repeater) handles inline encoding/decoding as you edit. For bulk or multi-step encoding operations, use the standalone Decoder tab.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Supported Encoding Schemes:</span></summary>
<div class="callout-body">

| Scheme | Common Use |
|--------|-----------|
| URL encoding | Required for special characters in query strings and form data |
| Full URL encoding | Encodes every character, not just key characters |
| Unicode URL encoding | Used for WAF bypass (<code>%u0027</code> for single quote) |
| HTML encoding | For XSS payload preparation or testing HTML injection |
| Base64 | Cookie, token, and binary data manipulation |
| ASCII Hex | For binary and raw byte data representation |

</div>
</details>

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Decoder Tab:</span></summary>
<div class="callout-body">

Paste input → select encoding/decoding scheme → output is immediately shown
Chain multiple transforms by copying output and pasting into a new input field
Useful for multi-layered encoding like Base64-encoded JSON containing URL-encoded values

</div>
</details>

---
## Related Techniques
- [SQL Injection](/techniques/SQL-Injection)
- [XSS](/techniques/XSS)

## Related Playbooks
- [Linux Pentest Playbook](/playbooks/Linux-Pentest-Playbook)

## Related Tools
- [Burp Suite](/tools/Web-Testing/Burp-Suite/Burp-Suite)
- [Burp Proxy](/tools/Web-Testing/Burp-Suite/Burp-Proxy)
- [Burp Intruder](/tools/Web-Testing/Burp-Suite/Burp-Intruder)

---
## References / Images
- https://portswigger.net/burp/documentation/desktop/tools/repeater
