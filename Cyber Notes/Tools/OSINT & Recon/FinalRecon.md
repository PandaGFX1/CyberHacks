Tags: #Status/In-Progress #Type/Tool #Context/Web #Context/OSINT #Context/Redteam

---
## Overview
FinalRecon is a Python-based automated web reconnaissance framework that consolidates multiple recon techniques into a single modular tool. It can perform SSL certificate inspection, WHOIS lookups, HTTP header analysis, web crawling, DNS enumeration (40+ record types), subdomain enumeration via multiple APIs, directory brute force, and Wayback Machine queries — all from a single command. Useful for quickly running a broad passive and active recon sweep at the start of an engagement.

## Target / Context
Web applications and domains. Covers both passive recon (WHOIS, certificates, Wayback Machine) and active recon (crawling, directory enumeration, port scanning). Useful as a first pass before diving into targeted tooling.

---
## Installation

> [!INFO]- Installation Commands:
> ```
> git clone https://github.com/thewhiteh4t/FinalRecon.git
> cd FinalRecon
> pip3 install -r requirements.txt
> chmod +x ./finalrecon.py
> ```

---
## Basic Usage

> [!INFO]- Basic Usage:
> `./finalrecon.py --help`
> `./finalrecon.py --headers --whois --url http://example.com`
> `./finalrecon.py --full --url http://example.com`

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description |
> |------|-------------|
> | `--url <URL>` | Target URL (required for all scans) |
> | `--headers` | Retrieve and analyze HTTP headers |
> | `--sslinfo` | Get SSL/TLS certificate information |
> | `--whois` | Perform a WHOIS lookup for the domain |
> | `--crawl` | Crawl the target website for links and resources |
> | `--dns` | Perform DNS enumeration (queries 40+ record types) |
> | `--sub` | Enumerate subdomains using multiple data sources |
> | `--dir` | Brute-force directories on the target (supports custom wordlists) |
> | `--wayback` | Retrieve archived URLs from the Wayback Machine |
> | `--ps` | Run a fast port scan on the target |
> | `--full` | Run all modules in sequence |

---
## Common Use Cases

### Targeted Recon (Selected Modules)

> [!INFO]- Commands:
> `./finalrecon.py --headers --whois --url http://example.com`
> — Runs header analysis and WHOIS lookup only. Good starting point for passive recon.

### SSL Certificate Inspection + DNS Enumeration

> [!INFO]- Commands:
> `./finalrecon.py --sslinfo --dns --url https://example.com`
> — Combines certificate metadata (expiry, CN, SANs) with a 40+ record DNS enumeration.

### Full Automated Recon Sweep

> [!INFO]- Commands:
> `./finalrecon.py --full --url http://example.com`
> — Runs all modules sequentially. Results are saved to a local JSON report.

### Subdomain Enumeration

> [!INFO]- Commands:
> `./finalrecon.py --sub --url http://example.com`
> — Queries multiple sources including crt.sh, AnubisDB, ThreatMiner, CertSpotter, VirusTotal API, Shodan API, and BeVigil API. Returns a combined and deduplicated subdomain list.

---
## Related Techniques
- [[Subdomain Enumeration]]
- [[DNS Enumeration]]

## Related Playbooks
- [[Linux Pentest Playbook]]
- [[OSINT Playbook]]

---
## References / Images
- https://github.com/thewhiteh4t/FinalRecon
