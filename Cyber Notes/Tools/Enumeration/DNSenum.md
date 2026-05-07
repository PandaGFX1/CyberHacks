Tags: #Status/In-Progress #Type/Tool #Context/Redteam #publish-me

---
## Overview
DNSenum is a DNS enumeration tool written in Perl that automates the discovery of subdomains, DNS records, zone transfers, and brute-forced hostnames for a target domain. It queries the DNS server directly, attempts zone transfers to retrieve the full DNS zone, and falls back to wordlist-based brute-force enumeration. DNSenum can also scrape Google for additional subdomains and perform reverse lookups and WHOIS queries in a single pass.

**Key capabilities:**
- DNS Record Enumeration — A, AAAA, NS, MX, and TXT records for a comprehensive DNS overview
- Zone Transfer Attempts — automatically tries AXFR against all discovered nameservers
- Subdomain Brute-Forcing — wordlist-based enumeration of candidate subdomains
- Google Scraping — queries Google to find additional subdomains not listed in DNS records directly
- Reverse Lookup — identifies domains associated with discovered IP addresses via PTR records
- WHOIS Lookup — performs WHOIS queries on discovered domains for ownership and registration details

## Target / Context
DNS servers for a target domain — used during external recon to enumerate subdomains, mail servers, name servers, and attempt unauthorized zone transfers.

---
## Installation

> [!INFO]- Installation Commands:
> `sudo apt install dnsenum`

---
## Basic Usage

> [!INFO]- Basic Usage:
> Enumerate a domain against a specific DNS server:
> `dnsenum --dnsserver <dns_server_ip> --enum -p 0 -s 0 <target_domain>`

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `--dnsserver` | Specify the DNS server to query | `--dnsserver 10.129.14.128` |
> | `--enum` | Enable full enumeration mode | `--enum` |
> | `-p` | Number of Google pages to scrape for subdomains (0 = disable) | `-p 0` |
> | `-s` | Number of scraping results to return (0 = disable) | `-s 0` |
> | `-o` | Output file for results | `-o subdomains.txt` |
> | `-f` | Wordlist for subdomain brute forcing | `-f /path/to/wordlist.txt` |
> | `--threads` | Number of threads | `--threads 10` |
> | `--noreverse` | Skip reverse lookups | `--noreverse` |
> | `--nocolor` | Disable colored output | `--nocolor` |
> | `-r` | Enable recursive enumeration on subdomains | `-r` |

---
## Common Use Cases

### Full Subdomain Enumeration Against Internal DNS Server

> [!INFO]- Commands:
> `dnsenum --dnsserver 10.129.14.128 --enum -p 0 -s 0 -o subdomains.txt -f /opt/useful/seclists/Discovery/DNS/subdomains-top1million-110000.txt inlanefreight.htb`

### External Domain Enumeration (Public DNS)

> [!INFO]- Commands:
> `dnsenum --enum -p 0 -s 0 -o subdomains.txt -f /opt/useful/seclists/Discovery/DNS/subdomains-top1million-5000.txt targetcompany.com`

### Zone Transfer Attempt
DNSenum automatically attempts AXFR zone transfers against all name servers found. If a zone transfer succeeds, the full DNS zone is returned without needing a wordlist.

> [!INFO]- Commands:
> Zone transfer attempt is automatic during `--enum`. To test manually with dig:
> `dig axfr <domain> @<nameserver>`

### Manual Subdomain Brute Force Loop (without DNSenum)

> [!INFO]- Commands:
> ```bash
> for sub in $(cat /opt/useful/seclists/Discovery/DNS/subdomains-top1million-110000.txt); do
>   dig $sub.inlanefreight.htb @10.129.14.128 \
>   | grep -v ';\|SOA' | sed -r '/^\s*$/d' | grep $sub | tee -a subdomains.txt
> done
> ```

---
## Related Techniques
- [[DNS Enumeration]]

## Related Playbooks
- [[Linux Pentest Playbook]]

---
## References / Images
- SecLists DNS wordlists: https://github.com/danielmiessler/SecLists/tree/master/Discovery/DNS
