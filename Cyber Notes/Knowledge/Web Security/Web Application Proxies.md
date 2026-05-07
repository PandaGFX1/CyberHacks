Tags: #Status/In-Progress #Type/Knowledge #Context/Web

---
## Overview
A web application proxy sits between a browser or client tool and a back-end server, capturing and optionally modifying every HTTP and HTTPS request that passes through it. Unlike packet capture tools such as Wireshark, web proxies operate at the application layer and focus exclusively on HTTP/HTTPS traffic, presenting requests and responses in a structured, human-readable format suited for web application testing.

---
## Terminology

| Term | Definition |
|------|------------|
| Intercepting Proxy | A proxy that holds requests in place for examination and modification before forwarding them to the server |
| Transparent Proxy | A proxy the client is unaware of — traffic is routed through it without explicit browser configuration |
| MITM Proxy | A man-in-the-middle proxy positioned between client and server to intercept and inspect encrypted HTTPS traffic |
| CA Certificate | A Certificate Authority certificate installed in the browser so the proxy can decrypt and re-sign TLS traffic |
| Proxy Listener | The local port the proxy listens on — default 8080 for both Burp Suite and ZAP |
| Scope | A defined set of target hosts that the proxy applies interception rules and logging to |
| HTTP History | The log of all requests and responses captured during a session |
| HUD | Heads Up Display — ZAP's in-browser overlay for controlling proxy features without switching to the main UI |

---
## Core Concepts

### How Web Proxies Work
A web proxy runs locally and acts as a man-in-the-middle between the browser and the target server. The browser is configured to route all traffic to the proxy's listener port, typically `127.0.0.1:8080`. For HTTPS, the proxy's CA certificate must be installed in the browser so the proxy can decrypt TLS traffic, inspect and optionally modify it, then re-encrypt before forwarding. From the browser and server's perspective, the proxy is invisible.

### Difference from Packet Capture
Tools like Wireshark capture all traffic at the network interface level — TCP, UDP, DNS, and everything else. Web proxies operate only at the HTTP/HTTPS layer, presenting application data in a format that can be directly edited, replayed, and tested. Wireshark is better for analyzing raw protocols; web proxies are better for testing application logic.

### Common Use Cases

| Use Case | Description |
|----------|-------------|
| Request Interception | Pause and inspect requests before they reach the server |
| Request Modification | Change parameters, headers, cookies, or body content to test server behavior |
| Response Interception | Modify responses before the browser renders them — useful for bypassing client-side restrictions |
| Fuzzing | Automate sending many payload variations to identify vulnerabilities |
| Vulnerability Scanning | Automated discovery of common web vulnerabilities |
| Web Crawling | Map all accessible pages and endpoints on a target |
| Proxying CLI Tools | Route traffic from tools like curl, Nmap scripts, or Metasploit through the proxy for inspection |

---
## Burp Suite vs ZAP

| Feature | Burp Suite Community | Burp Suite Professional | ZAP by Checkmarx |
|---------|---------------------|------------------------|------------------|
| Cost | Free | Paid | Free (open source) |
| Active Scanner | No | Yes | Yes |
| Intruder Speed | Rate-limited (~1 req/sec) | Unlimited | Unlimited |
| Built-in Browser | Yes (Chromium) | Yes (Chromium) | Yes (Firefox) |
| Extensions | BApp Store (limited) | BApp Store (full) | ZAP Marketplace |
| In-Browser HUD | No | No | Yes |
| Project Saving | Temporary only | Full project support | Full project support |
| Best For | Learning, manual testing | Professional engagements | Free scanner and fast fuzzer |

---
## Related Concepts
- [[HTTP & HTTPS]]
- [[Website Innerworkings]]
- [[TLS & SSL]]

## Related Techniques
- [[XSS]]
- [[SQL Injection]]

## Related Tools
- [[Burp Suite]]
- [[OWASP ZAP]]

---
## References / Images
-
