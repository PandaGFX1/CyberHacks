Tags: #Status/In-Progress #Type/Knowledge #Context/Blueteam #publish-me

---
## Overview
MITRE ATT&CK (Adversarial Tactics, Techniques, and Common Knowledge) is a globally accessible, matrix-based knowledge base of adversary behaviors observed across real-world intrusions. Unlike the [[Cyber Kill Chain]]'s high-level phase model, ATT&CK provides granular documentation of exactly *how* adversaries operate — covering Windows, Linux, macOS, cloud, network, mobile, and container environments. It is widely used for threat modeling, detection engineering, incident investigation, and structured reporting.

---

## Terminology
| Term | Definition |
|------|------------|
| Tactic | High-level adversary objective — the *why* of a technique (e.g., Initial Access, Persistence) |
| Technique | Specific method used to achieve a tactic — documented with a unique ID (e.g., T1021 — Remote Services) |
| Sub-Technique | More specific implementation of a parent technique — extends the parent ID (e.g., T1021.001 — Remote Desktop Protocol) |
| TTP | Tactics, Techniques, and Procedures — the collective behavioral fingerprint of a threat actor |
| ATT&CK Matrix | Visual grid of ATT&CK content — columns are Tactics, cells are Techniques |
| ATT&CK Navigator | Open-source web tool for visualizing, layering, and annotating ATT&CK matrices |
| STIX | Structured Threat Information eXpression — standardized JSON format for sharing cyber threat intelligence |
| CTI | Cyber Threat Intelligence — actionable information about adversary behavior and capabilities |

---
## Core Concepts

### The ATT&CK Matrix
The matrix organizes adversary behavior into Tactics (columns) and Techniques (cells). Each technique documents observed adversary behavior with detection guidance, mitigation recommendations, and real-world usage examples.

Separate matrices exist for:
- **Enterprise** — Windows, Linux, macOS, cloud (AWS/Azure/GCP), network, containers
- **Mobile** — Android and iOS
- **ICS** — Industrial Control Systems

#### Enterprise Tactics

| Tactic | ID | Description |
|--------|----|-------------|
| Reconnaissance | TA0043 | Gather information before gaining access |
| Resource Development | TA0042 | Acquire infrastructure, accounts, and capabilities |
| Initial Access | TA0001 | Gain entry into the target network |
| Execution | TA0002 | Run adversary-controlled code |
| Persistence | TA0003 | Maintain foothold across reboots and logouts |
| Privilege Escalation | TA0004 | Gain higher-level permissions |
| Defense Evasion | TA0005 | Avoid detection and analysis |
| Credential Access | TA0006 | Steal credentials and secrets |
| Discovery | TA0007 | Learn about the environment after access |
| Lateral Movement | TA0008 | Move through the network to reach targets |
| Collection | TA0009 | Gather data of interest to the adversary |
| Command and Control | TA0011 | Communicate with compromised systems |
| Exfiltration | TA0010 | Move collected data out of the network |
| Impact | TA0040 | Disrupt, destroy, or manipulate systems and data |

### Technique and Sub-Technique IDs
Techniques use the format `T<number>` — for example, `T1059` covers Command and Scripting Interpreter.

Sub-Techniques extend the parent: `T<number>.<sub-number>` — for example, `T1059.001` covers PowerShell specifically. This allows detection rules and incident reports to be as precise as the evidence supports.

### Using ATT&CK During Incident Response
Map observed attacker behavior to ATT&CK IDs during an investigation to:
- Build a structured, reproducible incident timeline
- Identify gaps where no detection fired
- Communicate findings to stakeholders in a standardized format
- Export to [[TheHive]] observables or MISP events for threat intelligence sharing

#### Example Mapping Format

| Tactic | Technique | ID | Observed Activity |
|--------|-----------|-----|-------------------|
| Initial Access | Exploit Public-Facing Application | T1190 | Confluence CVE exploited |
| Execution | PowerShell | T1059.001 | PowerShell used to download payload |
| Persistence | Windows Service | T1543.003 | Malicious service registered for persistence |
| Credential Access | LSASS Memory | T1003.001 | Credentials extracted from LSASS |
| Lateral Movement | Remote Desktop Protocol | T1021.001 | RDP used for lateral movement |
| Impact | Data Encrypted for Impact | T1486 | Ransomware deployed |

### Use Cases in Security Operations
ATT&CK is actively used across the full security operations lifecycle, not just as a reference during incidents.

| Use Case | Description |
|----------|-------------|
| Detection and Response | Map known TTPs to detection logic; build SIEM rules targeting specific techniques rather than static indicators |
| Security Evaluation and Gap Analysis | Identify which techniques the environment currently cannot detect; prioritize detection engineering efforts |
| SOC Maturity Assessment | Measure detection coverage across ATT&CK tactics as a structured maturity benchmark |
| Threat Intelligence | Attribute observed TTPs to known threat groups; understand actor playbooks and likely next steps |
| CTI Enrichment | Enrich raw IOC data with behavioral context from ATT&CK technique descriptions |
| Behavioral Analytics Development | Build detection rules around adversary behaviors rather than static file hashes or IP addresses |
| Red Teaming and Penetration Testing | Scope emulation plans and report findings in standardized ATT&CK format |
| Training and Education | Use real-world technique documentation as a training resource for new analysts |

### Relationship to the Cyber Kill Chain
ATT&CK and the [[Cyber Kill Chain]] are complementary frameworks:
- The Kill Chain provides high-level sequential phase awareness
- ATT&CK provides technique-level detail within each phase
- Both are commonly used together in incident reports and threat modeling exercises

### STIX Format for Intelligence Sharing
ATT&CK content and IOC intelligence can be shared in STIX format — a structured JSON standard for expressing and exchanging cyber threat intelligence. CISA publishes STIX packages for major incidents. Tools like MISP and [[TheHive]] can import and export STIX data natively.

---
## Related Concepts
- [[Cyber Kill Chain]]
- [[Incident Response Fundamentals]]
- [[Threat Actors]]

## Related Techniques
-

## Related Tools
- [[TheHive]]

---
## References / Images
- MITRE ATT&CK — https://attack.mitre.org/
- ATT&CK Navigator — https://mitre-attack.github.io/attack-navigator/
- CISA STIX Threat Advisories — https://www.cisa.gov/news-events/alerts
