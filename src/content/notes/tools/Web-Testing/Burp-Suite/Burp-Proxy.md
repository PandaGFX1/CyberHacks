---
title: "Burp Proxy"
category: "tools"
tags: []
excerpt: "Burp Proxy intercepts all HTTP and HTTPS traffic between a browser and the back-end server, allowing real-time..."
date: "2026-05-03"
---

---
## Overview
Burp Proxy intercepts all HTTP and HTTPS traffic between a browser and the back-end server, allowing real-time examination and modification of requests and responses. It is the entry point for all Burp Suite workflows — traffic captured here is forwarded to Repeater, Intruder, or Scanner.

## Target / Context
Any web application. Used during active web penetration testing to intercept, manipulate, and replay HTTP/HTTPS traffic.

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

1. Launch Burp Suite — proxy listener starts on <code>127.0.0.1:8080</code> by default
2. Configure browser to route traffic through the proxy (see use cases below)
3. Enable interception: Proxy tab → Intercept → toggle On
4. Browse the target — requests are held until forwarded or dropped

</div>
</details>

---
## Flags & Options

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Proxy Listener Settings:</span></summary>
<div class="callout-body">

Proxy → Proxy Settings → Proxy Listeners
| Setting | Description |
|---------|-------------|
| Listener port | Default 8080 — change to any available port if needed |
| Bind to loopback only | Default — use <code>0.0.0.0</code> to receive traffic from other hosts |
| Redirect to host | Forces all traffic to a specific target regardless of Host header |

</div>
</details>

---
## Common Use Cases

### Configure the Pre-Built Browser
Use Burp's embedded Chromium browser — no proxy configuration or certificate installation required.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Steps:</span></summary>
<div class="callout-body">

Proxy tab → Intercept → Open Browser

</div>
</details>

### Configure FoxyProxy (Real Browser)
Route a real Firefox instance through Burp. Recommended over manual proxy settings.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Steps:</span></summary>
<div class="callout-body">

1. Install the FoxyProxy extension in Firefox
2. Open FoxyProxy → Options → Add
3. IP: <code>127.0.0.1</code>, Port: <code>8080</code> (match your configured listener port)
4. Enable the proxy entry in FoxyProxy

</div>
</details>

### Install the CA Certificate (HTTPS)
Required for HTTPS interception when using a real browser. Without it, HTTPS traffic fails or triggers browser certificate warnings on every request.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Steps:</span></summary>
<div class="callout-body">

1. With Burp running and the browser proxied, navigate to <code>http://burp</code>
2. Click "CA Certificate" to download the cert
3. Firefox: <code>about:preferences#privacy</code> → View Certificates → Authorities tab → Import
4. Check "Trust this CA to identify websites" → OK

</div>
</details>

### Set Target Scope
Limit Burp to only process traffic matching your target — reduces noise from browser background requests.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Steps:</span></summary>
<div class="callout-body">

1. Target tab → Site Map → right-click the target host → Add to Scope
2. Proxy → Proxy Settings → under interception rules, select "and URL is in target scope"
To exclude specific paths (e.g., logout): right-click the path → Remove from Scope

</div>
</details>

### Intercept and Modify a Request
Hold a request before it reaches the server, make changes, then forward it.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Steps:</span></summary>
<div class="callout-body">

1. Proxy tab → Intercept → toggle On
2. Browse to trigger the request — it is held in the Intercept pane
3. Edit headers, parameters, or body content as needed
4. Forward (send as-is), Drop (discard), or CTRL+R to send to Repeater

</div>
</details>

### Intercept Responses
Modify the server's response before the browser renders it. Useful for enabling disabled form fields, revealing hidden inputs, or bypassing client-side validation.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Steps:</span></summary>
<div class="callout-body">

1. Proxy → Proxy Settings → Response Interception Rules → enable "Intercept responses"
2. After forwarding a request, the response is held for editing
Example: change <code>type="number"</code> to <code>type="text"</code> to allow arbitrary text in a numeric field

</div>
</details>

### Persistent Automatic Response Modification
Apply the same response transformation on every matching response without manual interception each time.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Steps:</span></summary>
<div class="callout-body">

Proxy → Proxy Settings → HTTP Match and Replace Rules → Add
| Field | Value |
|-------|-------|
| Type | Response Body |
| Match | <code>type="number"</code> |
| Replace | <code>type="text"</code> |
| Regex Match | False |

</div>
</details>

### Match and Replace (Requests)
Automatically transform outgoing request headers or body content on every request.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Example — Override User-Agent:</span></summary>
<div class="callout-body">

Proxy → Proxy Settings → HTTP Match and Replace Rules → Add
| Field | Value |
|-------|-------|
| Type | Request Header |
| Match | <code>^User-Agent.*$</code> |
| Replace | <code>User-Agent: HackTheBox Agent 1.0</code> |
| Regex Match | True |

</div>
</details>

### View HTTP History
All captured requests and responses are logged in Proxy → HTTP History. If a request was modified, the pane header reads "Original Request" — click it to toggle between original and edited versions.

Both HTTP history and WebSockets history are maintained. WebSockets history shows asynchronous updates and data-fetch requests that fire after the initial page load, which is useful during advanced web testing.

### Proxy External CLI Tools Through Burp
Route command-line tool traffic through Burp to inspect and modify it alongside browser traffic.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Proxychains:</span></summary>
<div class="callout-body">

Edit <code>/etc/proxychains4.conf</code> — comment out the existing socks4 line and add:
<ul class="callout-list">
  <li><code>http 127.0.0.1 8080</code></li>
</ul>
Run any command through proxychains: <code>proxychains -q <command></code>
The <code>-q</code> flag suppresses proxychains' connection output from the terminal.

</div>
</details>

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Metasploit Module:</span></summary>
<div class="callout-body">

Inside a Metasploit module's options: <code>set PROXIES HTTP:127.0.0.1:8080</code>

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
- [Burp Repeater](/tools/Web-Testing/Burp-Suite/Burp-Repeater)
- [Burp Intruder](/tools/Web-Testing/Burp-Suite/Burp-Intruder)
- [OWASP ZAP](/tools/Web-Testing/OWASP-ZAP/OWASP-ZAP)

---
## References / Images
- https://portswigger.net/burp/documentation/desktop/tools/proxy
