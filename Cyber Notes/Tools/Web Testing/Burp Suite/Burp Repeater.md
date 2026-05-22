Tags: #Status/In-Progress #Type/Tool #Context/Web #Context/Redteam

---
## Overview
Burp Repeater manually replays any captured HTTP request, allowing rapid parameter changes and repeated submission without re-navigating the application. The primary tool for manual payload testing, endpoint exploration, and confirming vulnerabilities before escalating to automated scanning.

## Target / Context
Individual HTTP requests captured by Burp Proxy. Used throughout web application testing whenever a specific request needs repeated testing with varied inputs.

---
## Installation

> [!INFO]- Installation Commands:
> Part of Burp Suite — see [[Burp Suite]] for installation.

---
## Basic Usage

> [!INFO]- Basic Usage:
> 1. In the Proxy Intercept pane or HTTP History, right-click a request → Send to Repeater (CTRL+R)
> 2. Navigate to Repeater tab (CTRL+SHIFT+R)
> 3. Modify the request — edit parameters, headers, body, or method
> 4. Click Send — the response appears in the right pane

---
## Flags & Options

> [!INFO]- Repeater Controls:
> | Action | Shortcut / Location |
> |--------|---------------------|
> | Send to Repeater | CTRL+R from anywhere in Burp |
> | Navigate to Repeater tab | CTRL+SHIFT+R |
> | Change HTTP method | Method dropdown in request pane — toggles GET/POST without rewriting the request |
> | URL-encode selected text | Select text → CTRL+U (or right-click → Convert Selection → URL → URL-encode key characters) |
> | Encode while typing | Right-click → enable "URL-encode as you type" |

---
## Common Use Cases

### Manual Payload Testing

> [!INFO]- Example — SQL Injection:
> 1. Capture a login POST request in Proxy
> 2. CTRL+R to send to Repeater
> 3. Replace the password value with `' OR 1=1-- -`
> 4. Click Send — inspect the response for authentication bypass indicators (redirect, welcome message, changed body length)

### Bypass Client-Side Input Filters

> [!INFO]- Example — XSS via Numeric Field:
> 1. Submit valid data through a number-only form field to capture the request in Proxy
> 2. CTRL+R to send to Repeater
> 3. Replace the numeric parameter value with `<script>alert("XSS")</script>`
> 4. URL-encode the payload: CTRL+U
> 5. Send — if the server doesn't validate input type server-side, the payload executes

### Encoding and Decoding
Burp Inspector (accessible within Repeater) handles inline encoding/decoding as you edit. For bulk or multi-step encoding operations, use the standalone Decoder tab.

> [!INFO]- Supported Encoding Schemes:
> | Scheme | Common Use |
> |--------|-----------|
> | URL encoding | Required for special characters in query strings and form data |
> | Full URL encoding | Encodes every character, not just key characters |
> | Unicode URL encoding | Used for WAF bypass (`%u0027` for single quote) |
> | HTML encoding | For XSS payload preparation or testing HTML injection |
> | Base64 | Cookie, token, and binary data manipulation |
> | ASCII Hex | For binary and raw byte data representation |

> [!INFO]- Decoder Tab:
> Paste input → select encoding/decoding scheme → output is immediately shown
> Chain multiple transforms by copying output and pasting into a new input field
> Useful for multi-layered encoding like Base64-encoded JSON containing URL-encoded values

---
## Related Techniques
- [[SQL Injection]]
- [[XSS]]

## Related Playbooks
- [[Linux Pentest Playbook]]

## Related Tools
- [[Burp Suite]]
- [[Burp Proxy]]
- [[Burp Intruder]]

---
## References / Images
- https://portswigger.net/burp/documentation/desktop/tools/repeater
