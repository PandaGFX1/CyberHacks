Tags: #Status/In-Progress #Type/Tool #Context/Network

---
## Overview
WHOIS is a command-line tool for querying domain registration information from public WHOIS databases. Returns registrant details, registrar info, nameservers, registration dates, and contact information. Useful during passive recon to gather intelligence on a target domain without directly interacting with their infrastructure.

---
## Target / Context
Domain names and IP address ranges. Core passive recon tool — queries public registration databases, not the target directly.

---
## Installation

> [!INFO]- Installation Commands:
> `sudo apt install whois`

---
## Basic Usage

> [!INFO]- Basic Usage:
> `whois www.example.com`
> `man whois`

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-h` | Specify WHOIS server to query | `whois -h whois.arin.net 10.10.10.1` |
> | `-p` | Specify port for WHOIS server | `whois -p 43 example.com` |

---
## Common Use Cases

### Query Domain Registration Info

> [!INFO]- Commands:
> `whois example.com`

### Query an IP Address

> [!INFO]- Commands:
> `whois 10.10.10.1`

### Penetration Testing Use Cases

> [!INFO]- Phishing Domain Verification:
> Use WHOIS to assess whether an email sender's domain is suspicious:
> - **Registration date** — recently registered domains (days/weeks old) are a red flag
> - **Privacy service** — registrant hidden behind a privacy proxy (common in phishing infrastructure)
> - **Nameservers** — known malicious hosting providers or bulletproof hosters
>
> `whois <suspicious-domain>` — check registrar, creation date, and nameservers

> [!INFO]- C2 Infrastructure Identification:
> If malware analysis reveals a C2 domain, WHOIS identifies the hosting provider:
> - Retrieve the registrar and abuse contact information
> - Report the domain to the hosting provider's abuse desk
> - Identify the IP range used and correlate with known threat infrastructure
>
> `whois <c2-domain>` — extract hosting provider, ASN, and registrant contact

> [!INFO]- Threat Actor Attribution:
> Different domains registered by the same actor often share nameservers, registrars, or contact details:
> - Pivot from a known malicious domain to related infrastructure via shared nameserver entries
> - Historical WHOIS records reveal ownership changes and contact patterns over time
> - Useful for building a profile of recurring threat actor infrastructure
>
> Historical WHOIS records: https://whoisfreaks.com/

---
## Related Concepts
- [[DNS (Domain Name System)]]

## Related Techniques
-

## Related Playbooks
-

## Related Tools
- [[nslookup]]

---
## References / Images
-
