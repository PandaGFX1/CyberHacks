Tags: #Status/In-Progress #Type/Knowledge #Context/Web #Context/Redteam

---
## Overview
Virtual hosting is the web server configuration that allows a single server to host multiple websites or applications, differentiating between them using the HTTP `Host` header rather than separate IP addresses. Understanding virtual hosts is critical in web reconnaissance because additional websites may live on the same IP as the main target — and those secondary sites often have weaker security, older software, or admin interfaces not intended for public access.

---

## Terminology
| Term | Definition |
|------|------------|
| Virtual Host (VHost) | A web server configuration entry that maps a hostname to a specific website or application |
| HTTP Host Header | A request header sent by the browser telling the server which domain/subdomain the client wants |
| Name-Based VHosting | Multiple websites share one IP; the Host header determines which site to serve |
| IP-Based VHosting | Each website gets a dedicated IP address; no reliance on the Host header |
| Port-Based VHosting | Different websites are separated by port number on the same IP |
| VHost Fuzzing | Brute-forcing the Host header to discover hidden virtual hosts on a server |
| Split-Horizon DNS | A DNS configuration where internal and external DNS return different records for the same domain |

---
## Core Concepts

### Subdomains vs Virtual Hosts — Key Distinction

This is a commonly confused pairing. Understanding the difference is essential for choosing the right enumeration approach.

**Subdomains** operate at the DNS layer — they answer "which machine do I connect to?" When a browser resolves `blog.example.com`, DNS returns an IP address. That IP could be a completely different server from `example.com`, or it could be the same server.

**Virtual Hosts** operate at the web server layer — they answer "which website should this machine serve me?" When multiple websites share a single IP, the web server reads the HTTP `Host` header to decide which site to return. VHosts are configured inside the web server (Apache, Nginx, IIS) and have no DNS component of their own.

| Concept | Layer | Answers | Mechanism |
|---------|-------|---------|-----------|
| Subdomain | DNS | Which machine to connect to | DNS A/AAAA record |
| Virtual Host | Web server | Which website to serve from that machine | HTTP Host header |

**Practical implication for HTB/CTFs:**
1. You discover the target at `10.10.10.1` and add `10.10.10.1 example.thm` to `/etc/hosts`
2. Browsing `http://example.thm` works — the web server sees `Host: example.thm` and serves the main site
3. VHost fuzzing reveals `admin.example.thm` — this isn't in DNS, but the web server has a VHost config for it
4. You add `10.10.10.1 admin.example.thm` to `/etc/hosts` and browse to it

---

### How Host-Based Routing Works
When a browser requests `http://blog.example.com`:
1. DNS resolves `blog.example.com` → IP address (e.g., `192.168.1.1`)
2. Browser connects to `192.168.1.1:80` and sends `GET / HTTP/1.1` with `Host: blog.example.com`
3. The web server reads the `Host` header and matches it to a VHost configuration
4. The correct site's content is returned

The `Host` header functions as a switch — a single server can host dozens of different websites as long as it has a VHost configuration entry for each one.

---

### Types of Virtual Hosting

#### Name-Based Virtual Hosting
Uses only the HTTP `Host` header to differentiate sites. Multiple domains share one IP address.
- Most common type — cost-effective and easy to configure
- Works for HTTP and HTTPS (with SNI for TLS)
- Limitation: some older protocols don't support the Host header

#### IP-Based Virtual Hosting
Each website gets a dedicated IP address. The server determines which site to serve based on the destination IP.
- No Host header required — works with any protocol
- Less scalable and more expensive (requires multiple IPs)
- Useful when strict isolation between sites is required

#### Port-Based Virtual Hosting
Different websites use different ports on the same IP (e.g., `:8080`, `:8443`, `:8888`).
- Less common — requires users to know the port number
- Useful for internal tools and development environments where user-friendliness is not a priority

---

### VHost Discovery

VHosts don't require DNS records — a web server will respond to a Host header even if no corresponding DNS entry exists. This means passive DNS enumeration misses VHosts that aren't in DNS.

**VHost fuzzing** finds these by brute-forcing the `Host` header:
1. Send HTTP requests to the target IP with `Host: wordlist-entry.example.com`
2. Identify responses that differ from the default (different status code, content length, or body)
3. Add confirmed VHosts to `/etc/hosts` to access them

**Tools:** [[Gobuster]] (vhost mode), Feroxbuster, ffuf

---

### /etc/hosts Workflow for VHost Discovery

Understanding when you need to edit `/etc/hosts` prevents confusion during CTFs and engagements:

| Scenario | /etc/hosts needed? | Why |
|----------|-------------------|-----|
| Running Gobuster with IP as base URL | No — for the scan | Gobuster connects directly to the IP; no DNS needed |
| Running Gobuster with hostname as base URL | Yes — for the scan | Your system needs to resolve the hostname to connect |
| Browsing a discovered VHost in your browser | Yes | Browser needs to resolve the hostname to the correct IP |
| Accessing any internal/CTF domain | Yes | Internal domains have no public DNS entry |

**Standard workflow:**
1. Add target IP and base domain: `10.10.10.1   example.thm`
2. Run VHost scan using IP directly: `gobuster vhost -u http://10.10.10.1 --domain example.thm -w wordlist.txt --append-domain`
3. For each confirmed VHost, add it to `/etc/hosts`: `10.10.10.1   discovered-vhost.example.thm`
4. Browse the discovered VHost in your browser

---
## Related Concepts
- [[DNS (Domain Name System)]]
- [[HTTP & HTTPS]]
- [[Web Reconnaissance]]

## Related Techniques
- [[Subdomain Enumeration]]

## Related Tools
- [[Gobuster]]

---
## References / Images
-
