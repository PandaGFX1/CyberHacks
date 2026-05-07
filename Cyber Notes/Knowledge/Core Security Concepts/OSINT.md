Tags: #Status/In-Progress #Type/Knowledge #Context/OSINT #publish-me

---
## Overview
Open Source Intelligence (OSINT) is the process of collecting and analyzing publicly available information to support reconnaissance, investigations, or threat intelligence. It is a core phase of penetration testing engagements and red team operations, used to map attack surfaces before any direct interaction with a target.

---

## Terminology
| Term | Definition |
|------|------------|
| OSINT | Open Source Intelligence; intelligence gathered from publicly available sources |
| Passive Reconnaissance | Gathering information without directly interacting with the target |
| Active Reconnaissance | Gathering information through direct interaction with the target |
| Attack Surface | The total set of exposed points an attacker could use to gain access |
| Dorking | Using advanced search operators to find sensitive information via search engines |

---
## Core Concepts

### OSINT Sources
- Search engines and indexed web content
- Social media and professional networks
- Public records and government databases
- DNS and WHOIS records
- Certificate transparency logs
- Internet-connected device search engines (Shodan, Censys)
- Data breach databases

---

### Passive Recon Approach
Start with the main website — companies list their offered services, giving clues about technologies and third-party vendors they use. Always work from what you can see toward what you cannot. The goal is mapping the attack surface without ever touching the target systems directly.

Key questions at every step:
- What can we see? What reasons explain why it's visible?
- What can we **not** see, and why?
- What technologies are in use, and what vulnerabilities do those technologies have?

---

### Domain and Certificate Enumeration

**Certificate Transparency Logs (crt.sh)**
SSL/TLS certificates include subject alternative names (SANs) that often enumerate subdomains not visible in DNS. Certificate transparency (RFC 6962) requires logging of all certificates issued by a Certificate Authority to public, auditable logs.

Search for subdomains via crt.sh:
`curl -s "https://crt.sh/?q=targetcompany.com&output=json" | jq .`

Filter for unique subdomains:
`curl -s "https://crt.sh/?q=targetcompany.com&output=json" | jq . | grep name | cut -d":" -f2 | grep -v "CN=" | cut -d'"' -f2 | awk '{gsub(/\\n/,"\n");}1;' | sort -u`

**Resolve subdomains to IPs:**
`for i in $(cat subdomainlist); do host $i | grep "has address" | grep targetcompany.com | cut -d" " -f1,4; done`
— If an IP is hosted by a third party, targeting it requires their permission.

**DNS record enumeration:**
`dig any targetcompany.com`
- **A records** — IP addresses
- **MX records** — mail servers (identifies email provider)
- **NS records** — authoritative nameservers (identifies DNS/hosting provider)
- **TXT records** — SPF, DMARC, DKIM, and third-party verification keys; may reveal additional IPs and service providers

**Shodan IP investigation:**
Once IP addresses are identified, investigate each one through Shodan to see open ports, services, and banners:
`for i in $(cat ip-addresses.txt); do shodan host $i; done`

See [[Shodan]] for full tool reference.

---

### Cloud Resource Discovery
Cloud storage (AWS S3 buckets, Azure blobs, GCP Cloud Storage) is frequently added to DNS by administrators for internal use. Misconfigurations can expose documents, presentations, source code, SSH keys, and credentials.

**Google Dorking for cloud storage:**
`inurl:s3.amazonaws.com intext:"targetcompany"`
`inurl:blob.core.windows.net intext:"targetcompany"`
`inurl:storage.googleapis.com intext:"targetcompany"`

Search for company abbreviations and acronyms — cloud buckets are often named after internal codenames.

**Useful tools:**
- https://crt.sh — certificate transparency logs
- https://domain.glass — infrastructure intelligence, Cloudflare detection
- https://buckets.grayhatwarfare.com — GrayHatWarfare for public cloud bucket discovery

---

### Search Engine Discovery
Search engines index vast amounts of public web content, including sensitive files, admin panels, and configuration data that site owners may not realize are accessible. Using advanced search operators (known as Google Dorking or Google Hacking) allows targeted retrieval of this information without ever touching the target's infrastructure.

**Essential search operators:**

| Operator | Description | Example |
|----------|-------------|---------|
| `site:` | Limit results to a specific domain | `site:example.com` |
| `inurl:` | Find pages with a term in the URL | `inurl:login` |
| `filetype:` | Search for a specific file type | `filetype:pdf` |
| `intitle:` | Find pages with a term in the page title | `intitle:"confidential report"` |
| `intext:` / `inbody:` | Search within body text of pages | `intext:"password reset"` |
| `cache:` | View cached version of a page | `cache:example.com` |
| `link:` | Find pages linking to a specific URL | `link:example.com` |
| `related:` | Find websites similar to a given page | `related:example.com` |
| `allintext:` | Pages containing all specified words in body text | `allintext:admin password reset` |
| `allinurl:` | Pages containing all specified words in URL | `allinurl:admin panel` |
| `allintitle:` | Pages containing all specified words in title | `allintitle:confidential report 2024` |
| `AND` | Require all terms to be present | `site:example.com AND (inurl:admin OR inurl:login)` |
| `OR` | Include pages with any of the terms | `"linux" OR "ubuntu" OR "debian"` |
| `NOT` / `-` | Exclude results containing the term | `site:bank.com NOT inurl:login` |
| `" "` | Search for exact phrase | `"information security policy"` |
| `*` | Wildcard — any word or character | `site:example.com filetype:pdf user* manual` |
| `..` | Number range | `site:shop.com "price" 100..500` |
| `numrange:` | Explicit number range | `site:example.com numrange:1000-2000` |

**Google Dorking — Common Patterns:**

*Login and admin panels:*
- `site:example.com inurl:login`
- `site:example.com (inurl:login OR inurl:admin)`

*Exposed documents:*
- `site:example.com filetype:pdf`
- `site:example.com (filetype:xls OR filetype:docx)`

*Configuration files:*
- `site:example.com inurl:config.php`
- `site:example.com (ext:conf OR ext:cnf)`

*Database backups:*
- `site:example.com inurl:backup`
- `site:example.com filetype:sql`

*Cloud storage:*
- `inurl:s3.amazonaws.com intext:"targetcompany"`
- `inurl:blob.core.windows.net intext:"targetcompany"`

Full Google Hacking Database (GHDB): https://www.exploit-db.com/google-hacking-database

---

### Web Archives
The Wayback Machine (web.archive.org) captures and preserves historical snapshots of websites at regular intervals. It indexes billions of pages going back to 1996, making it possible to view a target's website as it appeared in the past.

**How it works:** Web crawlers periodically snapshot websites (daily, weekly, or monthly depending on site activity level). Snapshots include the full page content — HTML, CSS, JavaScript, and sometimes linked resources. Users access them by entering a URL and selecting a date.

**Why it matters for web reconnaissance:**
- **Uncover removed content** — admin panels, login pages, and internal tools removed from the live site may still exist in archives
- **Find legacy vulnerabilities** — old software versions and outdated configurations documented in past snapshots
- **Track infrastructure changes** — identify hosting migrations, subdomain additions/removals, and technology stack changes over time
- **Completely passive** — querying the Wayback Machine produces zero detectable traffic on the target

Access: https://web.archive.org

---

### Staff Enumeration
Employees reveal the organization's tech stack, internal tools, and security posture through their public profiles and contributions.

**LinkedIn / Xing:**
- Job titles reveal organizational structure
- Job postings reveal required technologies (frameworks, languages, tools)
  - Example: A job posting requiring Django experience → search for OWASP Top 10 Django issues to understand the stack
- Employee profiles reveal tenure and roles

**GitHub / Source Code:**
- Employee GitHub profiles may contain:
  - Hardcoded credentials and API tokens in old commits
  - JWT tokens in front-end source code
  - Reused passwords visible in scripts or config files
  - Coding patterns that reveal common mistakes (unparameterized queries, insecure deserialization, etc.)

---
## Related Concepts
- [[Pentesting Fundamentals]]
- [[Footprinting & Enumeration]]

## Related Techniques
- [[OSINT Techniques]]
- [[DNS Enumeration]]

## Related Playbooks
- [[OSINT Playbook]]

## Related Tools
- [[Shodan]]
- [[WHOIS]]
- [[nslookup]]

---
## References / Images
- https://github.com/cipher387/Advanced-search-operators-list
- https://crt.sh
- https://buckets.grayhatwarfare.com
- https://domain.glass
