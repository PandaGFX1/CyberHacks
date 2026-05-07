Tags: #Status/In-Progress #Type/Tool #Context/Network #Context/Web #Context/Redteam

---
## Overview
GoBuster is a brute-force enumeration tool used for reconnaissance. It enumerates web directories, DNS subdomains, virtual hosts, Amazon S3 buckets, and Google Cloud Storage by brute-forcing with wordlists. A go-to tool for the early recon phase of a CTF or engagement.

---
## Target / Context
Web servers, DNS infrastructure, and cloud storage. Key distinction for HTB and CTF use:
- **DNS mode** — enumerates subdomains across multiple machines tied to a domain
- **VHost mode** — enumerates virtual hosts running on a single machine/IP (use this for single-target HTB boxes)

[[Assets/Images/Pasted image 20250408161507.png|DNS vs Vhosts]]
[[Assets/Images/Pasted image 20250408161748.png|Different Use Cases]]

---
## Installation

> [!INFO]- Installation Commands:
> See https://github.com/OJ/gobuster for installation instructions.

---
## Basic Usage

> [!INFO]- Basic Usage:
> `gobuster [command] -u "http://target.thm" -w /path/to/wordlist`
> SecLists Common Directories is recommended as a wordlist.

---
## Flags & Options

> [!INFO]- Global Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-u` | Target URL | `-u "http://example.thm"` |
> | `-w` | Wordlist path | `-w /usr/share/wordlists/...` |
> | `-t` | Number of threads (default 10) | `-t 50` |
> | `-o` | Write results to file | `-o results.txt` |
> | `--delay` | Time to wait between requests | `--delay 500ms` |
> | `--debug` | Troubleshoot errors | `--debug` |

---
## Common Use Cases

### Directory Enumeration
Brute-force directories and files on a web server.

> [!INFO]- Commands:
> `gobuster dir --help`
> `gobuster dir -u "http://www.example.thm" -w /usr/share/wordlists/dirbuster/... -r`
> `gobuster dir -u "https://example.thm" -w /usr/share/wordlists/... -x .php,.js`

> [!INFO]- Dir Flags:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-c` | Cookie to pass with each request | `-c "session=abc123"` |
> | `-x` | File extensions to scan for | `-x .php,.js` |
> | `-H` | Custom header to pass with each request | `-H "Authorization: Bearer token"` |
> | `-k` | Skip TLS certificate check (CTF/self-signed certs) | `-k` |
> | `-P` | Password for authenticated requests | `-P password` |
> | `-U` | Username for authenticated requests | `-U admin` |
> | `-s` | Status codes to display | `-s 200,301` |
> | `-b` | Status codes to exclude | `-b 404,403` |
> | `-r` | Follow redirects | `-r` |

---
### DNS Subdomain Enumeration
Enumerate subdomains by combining a domain with wordlist entries and performing DNS lookups.
Example output: `blog.example.thm`, `shop.example.thm`

> [!INFO]- Commands:
> `gobuster dns --help`
> `gobuster dns -d example.thm -w /usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt`

> [!INFO]- DNS Flags:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-d` | Domain to enumerate | `-d example.thm` |
> | `-c` | Show CNAME records (cannot use with `-i`) | `-c` |
> | `-i` | Show IP addresses the domain resolves to | `-i` |
> | `-r` | Custom DNS server for resolving | `-r 8.8.8.8` |

---
### VHost Enumeration
Enumerate virtual hosts running on the same machine. Use this for single-IP HTB targets.
Virtual hosts are IP-based and run on the same server — unlike DNS subdomains which may point to different machines.

> [!INFO]- Commands:
> `gobuster vhost --help`
> `gobuster vhost -u "http://10.10.120.125" --domain example.thm -w /usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt --append-domain --exclude-length 250-320`
> Note: If you omit `--append-domain` results will be `blog.thm` instead of `blog.example.thm`

> [!INFO]- /etc/hosts Workflow:
> **When to add to /etc/hosts before scanning:**
> - If using a hostname as the base URL (`-u http://example.thm`): your system needs to resolve it, so add it first
> - If using an IP as the base URL (`-u http://10.10.10.1`): gobuster connects directly to the IP — no /etc/hosts entry needed for the scan
> - Recommendation: always use the IP as the base URL for VHost scans; specify the domain separately with `--domain`
>
> **After finding a VHost:**
> - Add the discovered VHost to /etc/hosts to browse it in your browser
> - `echo "10.10.10.1   found-vhost.example.thm" | sudo tee -a /etc/hosts`
> - The discovered VHost will return a different response only if the web server has a corresponding VHost configuration

> [!INFO]- VHost Flags:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-u` | Base URL (use IP for HTB) | `-u "http://10.10.10.1"` |
> | `--domain` | Appends domain to each wordlist entry | `--domain example.thm` |
> | `--append-domain` | Forms full hostname: `word.example.thm` | `--append-domain` |
> | `--exclude-length` | Exclude responses by body length | `--exclude-length 250-320` |
> | `-m` | HTTP method to use | `-m POST` |
> | `-r` | Follow HTTP redirects | `-r` |

---
## Related Concepts
- [[HTTP & HTTPS]]
- [[DNS (Domain Name System)]]

## Related Techniques
- [[DNS Enumeration]]

## Related Playbooks
- [[Linux Pentest Playbook]]

---
## References / Images
- [[Assets/Images/Pasted image 20250408161507.png|DNS vs Vhosts]]
- [[Assets/Images/Pasted image 20250408161748.png|Different Use Cases]]
- [[Assets/Images/Pasted image 20250408155025.png|Useful Usage]]
- https://github.com/OJ/gobuster
