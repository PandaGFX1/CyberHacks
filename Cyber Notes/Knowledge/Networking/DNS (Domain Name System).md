Tags: #Status/In-Progress #Type/Knowledge #Context/Network #publish-me

---
## Overview
DNS (Domain Name System) translates human-readable domain names into IP addresses, allowing devices to communicate over the internet without memorizing numeric addresses. It provides a hierarchical naming system that resolves domain names to IPv4/IPv6 addresses, mail servers, and other resources — making it essential for web browsing, email delivery, and network services.

---

## Terminology
| Term | Definition |
|------|------------|
| TLD (Top-Level Domain) | Rightmost part of a domain name (e.g., .com, .org, .uk) |
| gTLD (Generic TLD) | Purpose-based TLDs (e.g., .com, .edu, .gov) |
| ccTLD (Country Code TLD) | Country-based TLDs (e.g., .uk, .us, .de) |
| Second-Level Domain | Located left of the TLD; up to 63 characters (e.g., tryhackme in tryhackme.com) |
| Subdomain | Additional sections left of the second-level domain (e.g., jupiter.servers.tryhackme.com) |
| TTL (Time-To-Live) | Time in seconds a DNS response should be cached before expiring |
| Authoritative DNS Server | Stores definitive DNS records for a domain; provides the final answer in resolution |
| Recursive DNS Server | Resolves domain names on behalf of clients; maintains a local cache |
| Root DNS Server | Top of the DNS hierarchy; redirects requests to the correct TLD server |

---
## Core Concepts

### Domain Hierarchy
Domains follow a structured hierarchy read right to left.

[[Assets/Images/Pasted image 20250402111741.png|DNS Hierarchy]]

- **TLD** → **Second-Level Domain** → **Subdomain(s)**
- Example: `jupiter.servers.tryhackme.com`
  - TLD: `.com`
  - Second-Level Domain: `tryhackme`
  - Subdomains: `jupiter.servers`
- Subdomain naming rules: a-z, 0-9, hyphens allowed; cannot start/end with hyphen or have consecutive hyphens
- Max total domain length: **253 characters**

### DNS Server Types
| Type | Description |
|------|-------------|
| DNS Root Server | Responsible for top-level domains; only queried when downstream servers don't respond; 13 exist globally; managed by ICANN |
| Authoritative Nameserver | Holds definitive answers for its zone; responds only to queries in its area of responsibility |
| Non-Authoritative Nameserver | Not responsible for a zone; collects info via recursive or iterative querying |
| Caching DNS Server | Caches responses from other nameservers for a duration set by the authoritative server's TTL |
| Forwarding Server | Forwards all queries to another DNS server rather than resolving them directly |
| Resolver | Performs name resolution locally (in the client OS or router); not authoritative |

Most DNS traffic is unencrypted — ISPs and on-path attackers can see all DNS queries. Encrypted alternatives: **DNS over TLS (DoT)**, **DNS over HTTPS (DoH)**, and **DNSCrypt**.

---

### DNS Record Types
| Record | Purpose                                                                                                                                     |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| A      | Resolves domain to an IPv4 address                                                                                                          |
| AAAA   | Resolves domain to an IPv6 address                                                                                                          |
| CNAME  | Alias pointing to another domain name; requires an additional DNS lookup                                                                    |
| MX     | Mail exchange server for the domain; includes a priority flag                                                                               |
| TXT    | Stores arbitrary text; used for SPF, DKIM, DMARC, and domain ownership validation                                                           |
| NS     | Name server records — identify authoritative nameservers for the domain; reveals hosting provider                                           |
| SOA    | Start of Authority — located in the domain's zone file; specifies the primary nameserver, responsible email address, and zone serial number |
| PTR    | Reverse lookup — maps an IP address back to a hostname                                                                                      |
| SRV    | Defines the hostname and port number for specific services                                                                                  |

### DNS Resolution Process
[[Assets/Images/Pasted image 20250402123037.png|DNS Request Process]]

1. Client checks **local cache** — if found, returns cached result using TTL
2. If not cached, request sent to **Recursive DNS Server** (often provided by ISP)
3. Recursive DNS checks its cache — if not found, queries **Root DNS Servers**
4. Root servers redirect to the appropriate **TLD Server** (.com, .org, etc)
5. TLD server forwards to the **Authoritative DNS Server** (example.com)
6. Authoritative server returns the definitive DNS record
7. Result is cached by the Recursive DNS server for TTL duration

### Recursive DNS Server
- Resolves domain names on behalf of clients
- Maintains local cache of recently resolved domains
- Reduces lookup time for frequently accessed domains

### Root DNS Servers
- Serve as the backbone of the DNS hierarchy
- Do not resolve domains directly — redirect to correct TLD servers

### Authoritative DNS Server
- Stores definitive DNS records for a domain
- Handles updates and changes to domain records
- Provides the final answer in the DNS resolution chain
- Example nameservers: `kip.ns.cloudflare.com`, `uma.ns.cloudflare.com`

---

### The Hosts File
The hosts file is a simple text file that maps hostnames to IP addresses directly on the local machine, bypassing the DNS resolution process entirely. It is the original method of hostname resolution — predating DNS — and still functions as a local override that takes priority over DNS lookups.

| OS | Location |
|----|----------|
| Windows | `C:\Windows\System32\drivers\etc\hosts` |
| Linux / macOS | `/etc/hosts` |

Editing the hosts file requires administrator or root privileges. Each entry follows the format:
`<IP address>` `<tab>` `<hostname>`

**Common use cases:**
| Entry | Purpose |
|-------|---------|
| `127.0.0.1   myapp.local` | Redirect a domain to localhost for local development |
| `192.168.1.20   testserver.local` | Map a custom hostname to a specific local IP for testing |
| `0.0.0.0   unwanted-site.com` | Block a domain by routing it to a non-routable address |
| `10.10.10.1   example.htb` | HTB/CTF — map a lab domain to the target machine IP |

**Security relevance:** Attackers may modify the hosts file as a persistence mechanism (redirecting trusted domains to malicious servers). In penetration testing, pentesters modify their own hosts file to resolve CTF and lab domains without requiring a DNS server.

---

### DNS Configuration (Bind9)
Bind9 is the most common DNS server on Linux. It uses three config file types:

| File | Location | Purpose |
|------|----------|---------|
| `named.conf` | `/etc/bind/` | Main config — includes all other files |
| `named.conf.local` | `/etc/bind/named.conf.local` | Define zones (one domain per zone) |
| `named.conf.options` | `/etc/bind/named.conf.options` | Global settings applying to all zones |
| Zone file | `/etc/bind/db.<domain>` | Actual DNS records for the zone; must have SOA and ≥1 NS record |
| Reverse zone file | `/etc/bind/db.<reversed_octets>` | PTR records for reverse IP-to-hostname lookups |

**Zone vs global options:** Zone-level options override global settings. Global settings apply to all zones unless overridden.

#### Zone File Format
A zone file is a text file that defines all DNS records for a domain. Every zone file must contain at least one SOA and one NS record. Example:

```
$TTL 3600                           ; Default Time-To-Live (1 hour)
@       IN SOA ns1.example.com. admin.example.com. (
            2024060401 ; Serial number (YYYYMMDDNN) — increment on every change
            3600       ; Refresh — how often secondary checks for updates
            900        ; Retry — how long secondary waits before retrying a failed refresh
            604800     ; Expire — when secondary stops serving if primary unreachable
            86400 )    ; Minimum TTL for negative responses

@       IN NS  ns1.example.com.
@       IN NS  ns2.example.com.
@       IN MX  10 mail.example.com.
www     IN A   192.0.2.1
mail    IN A   198.51.100.1
ftp     IN CNAME www.example.com.
```

**Record class field:** `IN` stands for "Internet" — the class identifier for the standard IP protocol suite. Other classes (`CH` for Chaosnet, `HS` for Hesiod) exist but are rarely seen in practice. All standard DNS records use `IN`.

**Zone vs Zone File:**
- A **DNS Zone** is the portion of the namespace managed by a specific authority (typically a domain and all its subdomains)
- A **Zone File** is the text file on the DNS server containing all the resource records for that zone

---

### Dangerous DNS Settings
| Setting | Risk |
|---------|------|
| `allow-query { any; }` | Any host can query the server — enables external enumeration |
| `allow-recursion { any; }` | Anyone can use the server as a recursive resolver — enables DNS amplification attacks |
| `allow-transfer { any; }` | Any host can request a zone transfer — exposes all DNS records |
| `zone-statistics yes` | Collects statistical data; can reveal query patterns |

---

### How dig Works
`dig` (Domain Information Groper) sends DNS queries directly to a specified nameserver and displays the raw response — including flags, TTL, and section headers. The `@<IP>` syntax specifies which DNS server to query; without it, dig uses the system's configured resolver from `/etc/resolv.conf`. See [[dig]] for full command syntax, flag reference, and zone transfer usage.

---

### Zone Transfers Explained
A **zone transfer** is how secondary (slave) DNS servers sync their records from the primary (master) server. It transfers the entire DNS zone file — all hostnames and IP addresses — over TCP/53 using the AXFR protocol.

**How it's supposed to work — 5-step AXFR process:**
1. **Zone Transfer Request (AXFR)** — The secondary DNS server sends a zone transfer request to the primary using the AXFR query type
2. **SOA Record Transfer** — The primary sends its Start of Authority (SOA) record, which includes the serial number. The secondary uses this to determine whether its data is current
3. **DNS Record Transmission** — If the serial number is higher than what the secondary has, the primary sends all DNS records in the zone one by one
4. **Zone Transfer Complete** — The primary signals the end of the zone transfer
5. **Acknowledgement (ACK)** — The secondary confirms successful receipt and processing of the zone data

**Why it's a security issue:**
If `allow-transfer` is set to `any` (or a subnet too broadly), any attacker can request a complete zone file — exposing **all internal hostnames and IP addresses** for the domain. This provides a complete internal network map for free.

Exploit zone transfers with [[dig]] using an AXFR query against the target nameserver. Internal zones (e.g., split-horizon DNS) can be queried the same way with the internal zone name.

---

### Subdomain Brute Forcing
When zone transfers are not possible, enumerate subdomains by querying a wordlist of candidate hostnames against the DNS server. Automate with [[DNSenum]] — it handles subdomain brute forcing, zone transfer attempts, and Google scraping in one pass. See [[DNS Enumeration]] for the full technique.

SecLists subdomain wordlists: `Discovery/DNS/subdomains-top1million-5000.txt` (fast) and `subdomains-top1million-110000.txt` (thorough).

---
## Related Concepts
- [[Networking Fundamentals]]
- [[OSI Model]]
- [[Protocols]]
- [[Ports]]
- [[Footprinting & Enumeration]]

## Related Techniques
- [[DNS Enumeration]]

## Related Tools
- [[dig]]
- [[nslookup]]
- [[DNSenum]]
- [[Nmap]]

---
## References / Images
- [[Assets/Images/Pasted image 20250402111741.png|DNS Hierarchy]]
- [[Assets/Images/Pasted image 20250402123037.png|DNS Request Process]]
- RFCs 1034 and 1035
- https://web.archive.org/web/20250329174745/https://securitytrails.com/blog/most-popular-types-dns-attacks
