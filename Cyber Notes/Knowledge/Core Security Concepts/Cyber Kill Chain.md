Tags: #Status/In-Progress #Type/Knowledge #Context/Blueteam #publish-me

---
## Overview
The Cyber Kill Chain is a framework developed by Lockheed Martin that models the lifecycle of a cyberattack across seven sequential phases. It helps defenders understand how intrusions unfold, identify where detection and disruption are possible, and prioritize defensive investments accordingly. Attacks do not always progress linearly — adversaries frequently loop through earlier phases as they deepen their foothold or pivot to new systems.

---

## Terminology
| Term | Definition |
|------|------------|
| Kill Chain | A phase-based model describing the sequential stages of a cyberattack |
| Dropper | Malware that delivers and executes a payload on the target system |
| Backdoor | Persistent remote access mechanism installed by an attacker after initial compromise |
| Rootkit | Malware that conceals attacker presence on a system and aids detection evasion |
| C2 (Command and Control) | Infrastructure used by an attacker to remotely manage compromised systems |
| Stager | Lightweight initial payload that downloads or activates the full implant |
| Payload | Malicious code delivered to and executed on a target system |
| LOLBin | Living-off-the-Land Binary — a legitimate OS binary abused for malicious execution without dropping custom tools |

---
## Core Concepts

### The Seven Phases

| Phase | What Happens |
|-------|-------------|
| 1. Reconnaissance | Attacker gathers target information — passive OSINT, port scanning, employee enumeration, infrastructure mapping |
| 2. Weaponization | Attacker builds or adapts a deliverable payload — malware embedded in an exploit or document; may research endpoint defenses to aid evasion |
| 3. Delivery | Payload transferred to the target via any available means — phishing emails, malicious links, drive-by downloads, USB, or physical access |
| 4. Exploitation | Exploit or payload is triggered — a click, opening a document, or visiting a page causes code execution on the target |
| 5. Installation | Attacker establishes persistence — droppers deliver the full implant; backdoors provide ongoing access; rootkits conceal presence |
| 6. Command and Control | Attacker establishes remote communication — outbound beacons, DNS tunneling, or other covert channels to a C2 server |
| 7. Actions on Objectives | Attacker achieves the goal — exfiltrate data, move laterally, deploy ransomware, escalate access, or cause disruption |

### Non-Linear Progression
The Kill Chain is often presented as sequential, but real intrusions are cyclic. Adversaries frequently repeat earlier phases to:
- Enumerate new systems discovered during lateral movement
- Re-weaponize or re-establish persistence after an implant is detected and removed
- Pivot from one compromised network segment into another
- Establish multiple footholds before moving to final objectives

### Defensive Application

Defenders can disrupt an attack at any phase — earlier disruption limits adversary impact.

| Phase | Defensive Opportunity |
|-------|-----------------------|
| Reconnaissance | Block external enumeration; monitor for scanning and OSINT activity |
| Weaponization | Threat intelligence on new exploits; AV/EDR signature updates |
| Delivery | Email filtering, URL blocking, attachment sandboxing |
| Exploitation | Patch management, application hardening, exploit protection (ASLR, DEP) |
| Installation | Endpoint detection, application whitelisting, file integrity monitoring |
| C2 | Egress filtering, DNS monitoring, network anomaly detection |
| Actions on Objectives | Data loss prevention, lateral movement alerts, immutable backups |

---
## Related Concepts
- [[MITRE ATT&CK Framework]]
- [[Incident Response Fundamentals]]
- [[Threat Actors]]
- [[Offensive Security Intro]]

## Related Techniques
-

---
## References / Images
- Lockheed Martin — Intelligence-Driven Computer Network Defense (original Kill Chain paper, 2011)
- LOLBAS Project — https://lolbas-project.github.io/
