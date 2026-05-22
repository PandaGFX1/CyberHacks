Tags: #Status/In-Progress #Type/Tool #Context/Network

---
## Overview
nslookup is a command-line tool for querying DNS records. Used to resolve domain names to IP addresses, look up specific record types, and troubleshoot DNS issues. Available on both Linux and Windows.

---
## Target / Context
DNS servers and domain name resolution. Useful during recon to map domains, find mail servers, identify subdomains, and verify DNS configuration.

---
## Installation

> [!INFO]- Installation Commands:
> Pre-installed on most Linux and Windows systems
> `sudo apt install dnsutils`

---
## Basic Usage

> [!INFO]- Basic Usage:
> `nslookup www.example.com`
> `man nslookup`

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `type=A` | Query A records (IPv4) | `nslookup -type=A example.com` |
> | `type=AAAA` | Query AAAA records (IPv6) | `nslookup -type=AAAA example.com` |
> | `type=MX` | Query mail exchange records | `nslookup -type=MX example.com` |
> | `type=TXT` | Query TXT records | `nslookup -type=TXT example.com` |
> | `type=NS` | Query nameserver records | `nslookup -type=NS example.com` |

---
## Common Use Cases

### Resolve a Domain

> [!INFO]- Commands:
> `nslookup www.example.com`

### Query Specific Record Types

> [!INFO]- Commands:
> `nslookup -type=MX example.com`
> `nslookup -type=TXT example.com`
> `nslookup -type=NS example.com`

---
## Related Concepts
- [[DNS (Domain Name System)]]
- [[Ports]]

## Related Techniques
-

## Related Playbooks
-

---
## References / Images
-
