Tags: #Status/In-Progress #Type/Playbook #Context/OSINT #publish-me 

---
## Objective
Conduct passive and active open source intelligence gathering against a target to map their attack surface, identify exposed assets, and discover actionable information before direct engagement.

---
## Prerequisites
- Target domain, organization name, or IP range
- Access to search engines and OSINT tools
- No direct interaction with target systems during passive phase

---
## Phase 1 — Passive Reconnaissance via Google Dorking
Start with search engines to find publicly indexed sensitive information about the target without touching their infrastructure.

### Common Commands

> [!INFO]- Common Commands:
> `"exact phrase"`
> `site:target.com`
> `site:target.com -careers`
> `filetype:pdf site:target.com`
> `intitle:"index of" site:target.com`
> `inurl:admin site:target.com`

### Tools
-

---
## Phase 2 — Device & Asset Discovery
Expand the attack surface by identifying internet-connected assets, open ports, and services belonging to the target using specialized search engines.

### Common Commands

> [!INFO]- Common Commands:
> `shodan search org:"Target Organization"`
> `shodan search hostname:target.com`
> `shodan host <IP>`
> `censys search target.com`

### Tools
- [[Shodan]]
- [[Censys]]

---
## Phase 3 — Breach & Credential Data
Check if target email addresses, domains, or credentials appear in known data breaches. Leaked credentials can be used for password spraying or credential stuffing.

### Common Commands

> [!INFO]- Resources:
> https://haveibeenpwned.com
> https://dehashed.com
> https://intelx.io

### Tools
-

---
## Related Knowledge
- [[OSINT]]

## Related Techniques
- [[OSINT Techniques]]

## Related Playbooks
-

## Related Tools
- [[Shodan]]
- [[Censys]]

---
## References / Images
- https://github.com/cipher387/Advanced-search-operators-list
- https://www.shodan.io/search/examples
- https://support.censys.io/hc/en-us/articles/20720064229140-Censys-Search-Use-Cases
- https://haveibeenpwned.com
