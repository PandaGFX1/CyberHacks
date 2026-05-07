Tags: #Status/In-Progress #Type/Tool #Context/Redteam #Context/OSINT #publish-me

---
## Overview
Shodan is a search engine for internet-connected devices. Unlike traditional web search engines, Shodan continuously scans the internet for open TCP/IP ports and indexes the banners, certificates, and metadata returned by devices — servers, routers, IoT devices, industrial controllers, cameras, and more. It is used both passively (as a search engine) and actively (via CLI) during OSINT and reconnaissance phases to identify a target organization's exposed infrastructure.

## Target / Context
External infrastructure reconnaissance — identifying exposed services, versions, and open ports for a target organization without directly contacting their systems.

---
## Installation

> [!INFO]- Installation Commands:
> `pip install shodan`
> `shodan init <API_KEY>` — initialize with your API key from account.shodan.io

---
## Basic Usage

> [!INFO]- Basic Usage:
> Search by organization:
> `shodan search org:"Target Company"`
>
> Look up a specific IP:
> `shodan host <IP>`

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag/Command | Description | Example |
> |------|-------------|---------|
> | `shodan host <IP>` | Show open ports, services, and banners for an IP | `shodan host 8.8.8.8` |
> | `shodan search <query>` | Search Shodan for matching hosts | `shodan search apache 2.4` |
> | `shodan count <query>` | Count results for a query without showing details | `shodan count org:"Acme Corp"` |
> | `shodan download <filename> <query>` | Download query results to a file | `shodan download results org:"Acme"` |
> | `shodan parse <filename>` | Parse a downloaded results file | `shodan parse results.json.gz` |
> | `shodan myip` | Show your current external IP address | `shodan myip` |
> | `shodan stats <query>` | Return summary stats for a query | `shodan stats port:22` |
> | `shodan alert` | Manage network monitoring alerts | `shodan alert create "My Network" 1.2.3.0/24` |

---
## Common Use Cases

### Investigate a Target's IP Addresses
During passive recon, after identifying IP addresses associated with a target organization (via DNS, crt.sh, WHOIS), run each IP through Shodan to see open ports, service banners, and software versions.

> [!INFO]- Commands:
> Single IP:
> `shodan host <IP>`
>
> From a list of IPs:
> `for i in $(cat ip-addresses.txt); do shodan host $i; done`

### Identify Exposed Services for an Organization
Search for all hosts associated with an organization name or ASN:

> [!INFO]- Commands:
> `shodan search org:"Target Corporation"`
> `shodan search net:1.2.3.0/24`
> `shodan search hostname:targetcompany.com`

### Search for Specific Vulnerable Services
Find exposed instances of specific software versions or configurations:

> [!INFO]- Commands:
> `shodan search "Apache/2.4.49"`
> `shodan search "product:OpenSSH version:7.4"`
> `shodan search port:23` — find exposed Telnet
> `shodan search "default password"`

### Shodan Web UI Filters (for browser-based searches)
| Filter | Example |
|--------|---------|
| `org:` | `org:"Amazon"` |
> | `hostname:` | `hostname:target.com` |
> | `net:` | `net:192.168.1.0/24` |
> | `port:` | `port:22` |
> | `product:` | `product:nginx` |
> | `version:` | `version:2.4.49` |
> | `country:` | `country:US` |
> | `os:` | `os:"Windows Server 2016"` |
> | `ssl.cert.subject.cn:` | `ssl.cert.subject.cn:*.target.com` |

---
## Related Techniques
- [[Service Enumeration]]

## Related Playbooks
- [[OSINT Playbook]]
- [[Linux Pentest Playbook]]

---
## References / Images
- https://account.shodan.io (API key)
- https://www.shodan.io/explore (web search)
- Shodan CLI docs: https://cli.shodan.io
