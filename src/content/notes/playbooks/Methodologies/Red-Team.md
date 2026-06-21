---
title: "Red Team"
category: "playbooks"
tags: []
excerpt: "Simulate adversary behavior to identify exploitable vulnerabilities, test detection capabilities, and evaluate an..."
date: "2026-05-03"
---

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

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Common Commands:</span></summary>
<div class="callout-body">

<code>whois <domain></code> — registration info
<code>nslookup <domain></code> / <code>dig <domain></code> — DNS enumeration
Shodan, Censys — search for exposed services
LinkedIn, GitHub — OSINT on employees and credentials

</div>
</details>

### Tools
- [WHOIS](/tools/OSINT-Recon/WHOIS)
- [nslookup](/tools/OSINT-Recon/nslookup)
- [OSINT Playbook](/playbooks/OSINT-Playbook)

---
## Phase 2 — Initial Access
Gain a foothold on the target environment.

### Common Commands

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Common Commands:</span></summary>
<div class="callout-body">

Phishing campaigns targeting identified employees
Exploitation of externally exposed services (web apps, VPN, RDP)
Credential stuffing using leaked password lists

</div>
</details>

### Tools
- [Metasploit](/tools/Frameworks/Metasploit/Metasploit)
- [Hydra](/tools/Password-Attacks/Hydra)
- [Burp Suite](/tools/Web-Testing/Burp-Suite/Burp-Suite)
- [NetExec](/tools/Enumeration/NetExec)
- [xfreerdp](/tools/Utilities/xfreerdp)

---
## Phase 3 — Post-Exploitation & Lateral Movement
Maintain access, escalate privileges, and move laterally across the environment.

### Common Commands

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Common Commands:</span></summary>
<div class="callout-body">

Enumerate local users, groups, and network shares
Dump credentials with Mimikatz / secretsdump
Use compromised credentials to pivot to additional hosts

</div>
</details>

### Tools
- [Metasploit](/tools/Frameworks/Metasploit/Metasploit)
- [PEASS-ng](/tools/Post-Exploitation/PEASS-ng)

---
## Phase 4 — Impact & Objective Achievement
Demonstrate impact — access sensitive data, simulate exfiltration, or achieve the defined mission objective (e.g., reach a specific system, steal a crown jewel).

### Common Commands

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Common Commands:</span></summary>
<div class="callout-body">

Document artifacts: screenshots, hashes, accessed files
Prepare evidence for the red team report

</div>
</details>

---
## Related Techniques
- [SQL Injection](/techniques/SQL-Injection)
- [RSA Cracking](/techniques/Cryptography-Attacks/RSA-Cracking)

## Related Playbooks
- [OSINT Playbook](/playbooks/OSINT-Playbook)
- [Linux Pentest Playbook](/playbooks/Linux-Pentest-Playbook)
- [Windows Pentest Playbook](/playbooks/Windows-Pentest-Playbook)

## Related Tools
- [Metasploit](/tools/Frameworks/Metasploit/Metasploit)
- [Nmap](/tools/Enumeration/Nmap)
- [Gobuster](/tools/Enumeration/Gobuster)
- [Hydra](/tools/Password-Attacks/Hydra)
- [Burp Suite](/tools/Web-Testing/Burp-Suite/Burp-Suite)
- [NetExec](/tools/Enumeration/NetExec)
- [xfreerdp](/tools/Utilities/xfreerdp)
- [PEASS-ng](/tools/Post-Exploitation/PEASS-ng)
- [WPScan](/tools/Web-Testing/WPScan)

---
## References / Images
- MITRE ATT&CK Framework — https://attack.mitre.org/
- PTES (Penetration Testing Execution Standard)
- Red Team Development and Operations by Joe Vest
