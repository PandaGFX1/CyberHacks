Tags: #Status/In-Progress #Type/Knowledge #Context/Web #Context/Redteam

---
## Overview
Web reconnaissance is the systematic process of collecting information about a target website or web application before conducting deeper analysis or exploitation. It maps the attack surface, identifies assets, uncovers hidden information, and gathers intelligence that guides all subsequent phases of an engagement. Recon divides cleanly into active techniques (which interact directly with the target) and passive techniques (which rely entirely on public sources).

---

## Terminology
| Term | Definition |
|------|------------|
| Active Reconnaissance | Techniques that interact directly with the target — higher detection risk |
| Passive Reconnaissance | Techniques using public third-party sources — minimal detection risk |
| Attack Surface | All exposed points an attacker could exploit to gain access |
| Banner Grabbing | Retrieving service banners to identify software names and versions |
| Fingerprinting | Identifying the technologies, frameworks, OS, and WAF powering a web application |
| Virtual Host (VHost) | A web server configuration hosting multiple sites on one IP via the HTTP Host header |
| Subdomain | An extension of a primary domain (e.g., blog.example.com) that may point to different infrastructure |
| Certificate Transparency (CT) Logs | Public, append-only logs of every TLS certificate issued — useful for subdomain discovery |
| robots.txt | A file telling crawlers which paths to avoid; often reveals sensitive or hidden directories |
| .well-known | A standardized directory on web servers for configuration metadata and security disclosures |
| Google Dorking | Using advanced search operators to find sensitive information indexed by search engines |

---

## Core Concepts

### Active Reconnaissance Techniques
Active techniques interact directly with the target's infrastructure. They yield more specific data but carry a higher risk of triggering IDS/IPS alerts and firewall rules.

| Technique | Description | Example | Tools | Detection Risk |
|-----------|-------------|---------|-------|----------------|
| Port Scanning | Identify open ports and services | Scan for 80 (HTTP) and 443 (HTTPS) | Nmap, Masscan | High |
| Vulnerability Scanning | Probe for known vulnerabilities and misconfigurations | Check for SQLi and XSS flaws | Nessus, OpenVAS, Nikto | High |
| Network Mapping | Map network topology and connected devices | Trace packet path with traceroute | Traceroute, Nmap | Medium–High |
| Banner Grabbing | Retrieve service banners to identify software versions | Connect to port 80 and read HTTP header | Netcat, curl | Low |
| OS Fingerprinting | Identify the OS running on the target | Use Nmap -O to detect Windows vs Linux | Nmap, Xprobe2 | Low |
| Service Enumeration | Determine specific versions of running services | Use Nmap -sV to identify Apache vs Nginx version | Nmap | Low |
| Web Spidering | Crawl a website to map pages, directories, and files | Run ZAP Spider to discover hidden resources | Burp Suite, OWASP ZAP | Low–Medium |

---

### Passive Reconnaissance Techniques
Passive techniques rely entirely on public data. They never touch the target's infrastructure and are effectively undetectable.

| Technique | Description | Example | Tools | Detection Risk |
|-----------|-------------|---------|-------|----------------|
| Search Engine Queries | Use operators to find exposed files, panels, and config | `site:example.com filetype:pdf` | Google, Shodan, DuckDuckGo | Very Low |
| WHOIS Lookups | Query domain registration databases for registrant, registrar, nameservers | Look up registration dates and contact info | whois, online WHOIS services | Very Low |
| DNS Enumeration | Analyse DNS records to map infrastructure and discover subdomains | Use dig to enumerate MX, NS, and A records | dig, nslookup, DNSenum | Very Low |
| Web Archive Analysis | Review historical snapshots of the target's site | Use Wayback Machine to find old admin pages | Wayback Machine | Very Low |
| Social Media Analysis | Gather employee info and tech stack clues from public profiles | Search LinkedIn for job titles and required tech | LinkedIn, OSINT tools | Very Low |
| Code Repository Analysis | Search GitHub for exposed credentials or config | Find API keys in old commits or config files | GitHub, GitLab | Very Low |
| Certificate Transparency | Search CT logs for subdomains listed in TLS certificates | Query crt.sh for all certificates issued to example.com | crt.sh, Censys | Very Low |

---

### Recon Workflow
Passive recon should always precede active recon. Build a complete picture using public data first, then use active techniques to confirm and expand findings.

1. WHOIS and DNS lookups — registrant info, nameservers, IP ranges, hosting provider
2. Certificate Transparency — comprehensive subdomain list without touching the target
3. Search engine dorking — exposed files, admin panels, sensitive directories
4. Social media and code repositories — staff, tech stack, leaked credentials
5. Web archive review — old application versions, removed pages, historical configuration
6. Active fingerprinting — service versions, OS detection, WAF identification
7. Web crawling — page structure, hidden directories, sensitive file discovery

---

## Related Concepts
- [[OSINT]]
- [[Footprinting & Enumeration]]
- [[Virtual Hosts]]
- [[Certificate Transparency Logs]]
- [[Web Fingerprinting]]
- [[Web Crawling]]

## Related Techniques
- [[DNS Enumeration]]
- [[Subdomain Enumeration]]

## Related Playbooks
- [[Linux Pentest Playbook]]
- [[OSINT Playbook]]

## Related Tools
- [[WHOIS]]
- [[dig]]
- [[DNSenum]]
- [[Gobuster]]
- [[Nmap]]
- [[Nikto]]
- [[FinalRecon]]
- [[Shodan]]

---
## References / Images
-
