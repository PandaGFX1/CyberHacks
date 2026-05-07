Tags: #Status/In-Progress #Type/Tool #Context/Web #Context/Redteam

---
## Overview
Burp Proxy intercepts all HTTP and HTTPS traffic between a browser and the back-end server, allowing real-time examination and modification of requests and responses. It is the entry point for all Burp Suite workflows — traffic captured here is forwarded to Repeater, Intruder, or Scanner.

## Target / Context
Any web application. Used during active web penetration testing to intercept, manipulate, and replay HTTP/HTTPS traffic.

---
## Installation

> [!INFO]- Installation Commands:
> Part of Burp Suite — see [[Burp Suite]] for installation.

---
## Basic Usage

> [!INFO]- Basic Usage:
> 1. Launch Burp Suite — proxy listener starts on `127.0.0.1:8080` by default
> 2. Configure browser to route traffic through the proxy (see use cases below)
> 3. Enable interception: Proxy tab → Intercept → toggle On
> 4. Browse the target — requests are held until forwarded or dropped

---
## Flags & Options

> [!INFO]- Proxy Listener Settings:
> Proxy → Proxy Settings → Proxy Listeners
> | Setting | Description |
> |---------|-------------|
> | Listener port | Default 8080 — change to any available port if needed |
> | Bind to loopback only | Default — use `0.0.0.0` to receive traffic from other hosts |
> | Redirect to host | Forces all traffic to a specific target regardless of Host header |

---
## Common Use Cases

### Configure the Pre-Built Browser
Use Burp's embedded Chromium browser — no proxy configuration or certificate installation required.

> [!INFO]- Steps:
> Proxy tab → Intercept → Open Browser

### Configure FoxyProxy (Real Browser)
Route a real Firefox instance through Burp. Recommended over manual proxy settings.

> [!INFO]- Steps:
> 1. Install the FoxyProxy extension in Firefox
> 2. Open FoxyProxy → Options → Add
> 3. IP: `127.0.0.1`, Port: `8080` (match your configured listener port)
> 4. Enable the proxy entry in FoxyProxy

### Install the CA Certificate (HTTPS)
Required for HTTPS interception when using a real browser. Without it, HTTPS traffic fails or triggers browser certificate warnings on every request.

> [!INFO]- Steps:
> 1. With Burp running and the browser proxied, navigate to `http://burp`
> 2. Click "CA Certificate" to download the cert
> 3. Firefox: `about:preferences#privacy` → View Certificates → Authorities tab → Import
> 4. Check "Trust this CA to identify websites" → OK

### Set Target Scope
Limit Burp to only process traffic matching your target — reduces noise from browser background requests.

> [!INFO]- Steps:
> 1. Target tab → Site Map → right-click the target host → Add to Scope
> 2. Proxy → Proxy Settings → under interception rules, select "and URL is in target scope"
> To exclude specific paths (e.g., logout): right-click the path → Remove from Scope

### Intercept and Modify a Request
Hold a request before it reaches the server, make changes, then forward it.

> [!INFO]- Steps:
> 1. Proxy tab → Intercept → toggle On
> 2. Browse to trigger the request — it is held in the Intercept pane
> 3. Edit headers, parameters, or body content as needed
> 4. Forward (send as-is), Drop (discard), or CTRL+R to send to Repeater

### Intercept Responses
Modify the server's response before the browser renders it. Useful for enabling disabled form fields, revealing hidden inputs, or bypassing client-side validation.

> [!INFO]- Steps:
> 1. Proxy → Proxy Settings → Response Interception Rules → enable "Intercept responses"
> 2. After forwarding a request, the response is held for editing
> Example: change `type="number"` to `type="text"` to allow arbitrary text in a numeric field

### Persistent Automatic Response Modification
Apply the same response transformation on every matching response without manual interception each time.

> [!INFO]- Steps:
> Proxy → Proxy Settings → HTTP Match and Replace Rules → Add
> | Field | Value |
> |-------|-------|
> | Type | Response Body |
> | Match | `type="number"` |
> | Replace | `type="text"` |
> | Regex Match | False |

### Match and Replace (Requests)
Automatically transform outgoing request headers or body content on every request.

> [!INFO]- Example — Override User-Agent:
> Proxy → Proxy Settings → HTTP Match and Replace Rules → Add
> | Field | Value |
> |-------|-------|
> | Type | Request Header |
> | Match | `^User-Agent.*$` |
> | Replace | `User-Agent: HackTheBox Agent 1.0` |
> | Regex Match | True |

### View HTTP History
All captured requests and responses are logged in Proxy → HTTP History. If a request was modified, the pane header reads "Original Request" — click it to toggle between original and edited versions.

Both HTTP history and WebSockets history are maintained. WebSockets history shows asynchronous updates and data-fetch requests that fire after the initial page load, which is useful during advanced web testing.

### Proxy External CLI Tools Through Burp
Route command-line tool traffic through Burp to inspect and modify it alongside browser traffic.

> [!INFO]- Proxychains:
> Edit `/etc/proxychains4.conf` — comment out the existing socks4 line and add:
> `http 127.0.0.1 8080`
> Run any command through proxychains: `proxychains -q <command>`
> The `-q` flag suppresses proxychains' connection output from the terminal.

> [!INFO]- Metasploit Module:
> Inside a Metasploit module's options: `set PROXIES HTTP:127.0.0.1:8080`

---
## Related Techniques
- [[SQL Injection]]
- [[XSS]]

## Related Playbooks
- [[Linux Pentest Playbook]]

## Related Tools
- [[Burp Suite]]
- [[Burp Repeater]]
- [[Burp Intruder]]
- [[OWASP ZAP]]

---
## References / Images
- https://portswigger.net/burp/documentation/desktop/tools/proxy
