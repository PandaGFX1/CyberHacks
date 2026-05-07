Tags: #Status/Todo #Type/Playbook #Context/Redteam

---
## Objective
Simulate adversary behavior to identify exploitable vulnerabilities, test detection capabilities, and evaluate an organization's overall security posture across its people, processes, and technology.

---
## Prerequisites
- Defined scope and rules of engagement (ROE)
- Written authorization from asset owner
- Threat model or target profile (what adversary are we simulating?)
- C2 infrastructure prepared
- OSINT on the target organization complete

---
## Phase 1 — Reconnaissance
Gather intelligence on the target without touching systems (passive) or with limited interaction (active).

### Common Commands

> [!INFO]- Common Commands:
> `whois <domain>` — registration info
> `nslookup <domain>` / `dig <domain>` — DNS enumeration
> Shodan, Censys — search for exposed services
> LinkedIn, GitHub — OSINT on employees and credentials

### Tools
- [[WHOIS]]
- [[nslookup]]
- [[OSINT Playbook]]

---
## Phase 2 — Initial Access
Gain a foothold on the target environment.

### Common Commands

> [!INFO]- Common Commands:
> Phishing campaigns targeting identified employees
> Exploitation of externally exposed services (web apps, VPN, RDP)
> Credential stuffing using leaked password lists

### Tools
- [[Metasploit]]
- [[Hydra]]
- [[Burp Suite]]
- [[NetExec]]
- [[xfreerdp]]

---
## Phase 3 — Post-Exploitation & Lateral Movement
Maintain access, escalate privileges, and move laterally across the environment.

### Common Commands

> [!INFO]- Common Commands:
> Enumerate local users, groups, and network shares
> Dump credentials with Mimikatz / secretsdump
> Use compromised credentials to pivot to additional hosts

### Tools
- [[Metasploit]]
- [[PEASS-ng]]

---
## Phase 4 — Impact & Objective Achievement
Demonstrate impact — access sensitive data, simulate exfiltration, or achieve the defined mission objective (e.g., reach a specific system, steal a crown jewel).

### Common Commands

> [!INFO]- Common Commands:
> Document artifacts: screenshots, hashes, accessed files
> Prepare evidence for the red team report

---
## Related Techniques
- [[SQL Injection]]
- [[RSA Cracking]]

## Related Playbooks
- [[OSINT Playbook]]
- [[Linux Pentest Playbook]]
- [[Windows Pentest Playbook]]

## Related Tools
- [[Metasploit]]
- [[Nmap]]
- [[Gobuster]]
- [[Hydra]]
- [[Burp Suite]]
- [[NetExec]]
- [[xfreerdp]]
- [[PEASS-ng]]
- [[WPScan]]

---
## References / Images
- MITRE ATT&CK Framework — https://attack.mitre.org/
- PTES (Penetration Testing Execution Standard)
- Red Team Development and Operations by Joe Vest
