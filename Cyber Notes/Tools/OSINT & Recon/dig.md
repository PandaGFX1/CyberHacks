Tags: #Status/In-Progress #Type/Tool #Context/Network #Context/Redteam #publish-me

---
## Overview
dig (Domain Information Groper) is a command-line DNS querying tool that sends queries directly to any specified nameserver and displays the raw response — including flags, TTL, section headers, and server information. Unlike nslookup, dig returns the full DNS response structure, making it the standard tool for DNS troubleshooting, record enumeration, version fingerprinting, and zone transfer attempts.

## Target / Context
DNS servers and domain names. Used for passive and active DNS reconnaissance, zone transfer exploitation, and DNS server fingerprinting during footprinting.

---
## Installation

> [!INFO]- Installation Commands:
> ```
> # Debian/Ubuntu
> sudo apt install dnsutils -y
> 
> # RHEL/CentOS/Fedora
> sudo yum install bind-utils -y
> ```

---
## Basic Usage

> [!INFO]- Basic Usage:
> ```
> dig <domain>                          # Query A record using default resolver
> dig <record-type> <domain>            # Query a specific record type
> dig <record-type> <domain> @<server>  # Query a specific DNS server directly
> ```

The `@<server>` syntax tells dig which DNS server to query. Without it, dig uses the system's configured resolver from `/etc/resolv.conf`.

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `@<server>` | DNS server to query | `dig A example.com @8.8.8.8` |
> | `A / AAAA / MX / NS / TXT / SOA / ANY / AXFR` | Record type to request | `dig MX example.com` |
> | `+short` | Return only the answer with no metadata | `dig +short A example.com` |
> | `+noall +answer` | Show only the answer section | `dig +noall +answer A example.com` |
> | `+trace` | Trace the full DNS resolution path from root servers down | `dig +trace example.com` |
> | `-x` | Reverse DNS lookup — IP to hostname (PTR record) | `dig -x 8.8.8.8` |
> | `+tcp` | Force TCP instead of UDP | `dig +tcp axfr example.com @<ns>` |
> | `CH TXT version.bind` | Query CHAOS class to fingerprint server version | `dig CH TXT version.bind @<server>` |

---
## Common Use Cases

### DNS Record Queries

> [!INFO]- Commands:
> ```
> dig A example.com @<server>           # IPv4 address records
> dig ns example.com @<server>          # Nameserver records — reveals hosting provider
> dig mx example.com @<server>          # Mail exchange records
> dig txt example.com @<server>         # TXT records (SPF, DKIM, domain verification)
> dig any example.com @<server>         # All record types (not all servers honor this)
> dig CH TXT version.bind @<server>     # Fingerprint DNS server software version
> ```

### Zone Transfer (AXFR)

> [!INFO]- Commands:
> ```
> dig axfr <domain> @<nameserver>               # Request full zone transfer
> dig axfr internal.<domain> @<nameserver>      # Zone transfer for a split-horizon internal zone
> ```
> AXFR succeeds only if the server allows transfers from your source IP. When `allow-transfer { any; }` is misconfigured, the full zone file is returned — exposing every hostname and IP address for the domain.

---
---
## Reading dig Output
Understanding the dig output structure makes troubleshooting and recon much faster. Using `dig google.com` as an example:

```
; <<>> DiG 9.18.24 <<>> google.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 16449
;; flags: qr rd ad; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;google.com.            IN      A

;; ANSWER SECTION:
google.com.     0       IN      A       142.251.47.142

;; Query time: 0 msec
;; SERVER: 172.23.176.1#53(172.23.176.1) (UDP)
;; WHEN: Thu Jun 13 10:45:58 SAST 2024
;; MSG SIZE  rcvd: 54
```

**Header line:**
- `opcode: QUERY` — standard DNS query type
- `status: NOERROR` — query succeeded (other values: NXDOMAIN = host not found, SERVFAIL, REFUSED)
- `id` — unique identifier for this query/response pair

**Flags:**
| Flag | Meaning |
|------|---------|
| `qr` | Query Response — this is a response, not a query |
| `rd` | Recursion Desired — client requested recursive resolution |
| `ad` | Authentic Data — resolver considers the data authentic (DNSSEC context) |

**Section counts:** `QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0` — how many records appear in each section.

**Question Section:** Confirms what was asked — `google.com. IN A` means "what is the IPv4 address for google.com?"

**Answer Section:** The actual result — `google.com. 0 IN A 142.251.47.142` — the `0` is the TTL (seconds until cache expires). A TTL of 0 means the response is not cacheable.

**Footer:**
- `Query time` — how long the server took to respond
- `SERVER` — which DNS server answered and the protocol used (UDP or TCP)
- `MSG SIZE rcvd` — size of the DNS response packet in bytes

**opt pseudosection:** If present, indicates EDNS (Extension Mechanisms for DNS) is enabled, allowing larger message sizes and DNSSEC support.

---
## Related Techniques
- [[DNS Enumeration]]

## Related Playbooks
- [[Linux Pentest Playbook]]

---
## References / Images
- `man dig`
- `dig -h`
