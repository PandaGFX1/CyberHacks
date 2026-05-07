Tags: #Status/In-Progress #Type/Knowledge #Context/Blueteam #publish-me

---
## Overview
Incident Response (IR) is the structured approach organizations use to detect, investigate, and respond to cybersecurity incidents. It aims to minimize damage, reduce recovery time, preserve evidence, and prevent future occurrences. Incident handling is not limited to intrusion events — it encompasses any security event with a clear intent to cause harm. A well-defined IR process enables rapid response, supports regulatory compliance, and reduces the financial and operational impact of breaches.

---

## Terminology
| Term | Definition |
|------|------------|
| Event | Any action occurring in a system or network — sending an email, clicking a mouse, or a service starting |
| Incident | An event with a negative consequence — a system crash, data leak, or unauthorized access |
| IT Security Incident | An event with a clear intent to cause harm performed against a computer system |
| Incident Handling | A clearly defined set of procedures for managing and responding to security incidents |
| Containment | Actions taken to limit the spread or impact of an incident |
| Eradication | Removal of malware, backdoors, or vulnerabilities introduced during an incident |
| Recovery | Restoring affected systems to normal, verified operation |
| EDR | Endpoint Detection and Response — monitors endpoint behavior and supports remediation |
| IOC (Indicator of Compromise) | Evidence that a system has been compromised — suspicious IPs, file hashes, registry keys, domains |
| Jump Bag | Pre-staged kit of tools and equipment maintained by IR teams for immediate deployment |
| Chain of Custody | Documentation proving evidence integrity and continuity — required for evidence to be court-admissible |
| Patient Zero | The first system or user infected in an incident; establishing this anchors the incident timeline |

---
## Core Concepts

### Incident Handling Frameworks
Two widely used models describe the IR lifecycle:
- **NIST SP 800-61** — Four-stage model: Preparation → Detection & Analysis → Containment, Eradication, Recovery → Post-Incident Activity
- **SANS/PICERL** — Six-phase model: Preparation → Identification → Containment → Eradication → Recovery → Lessons Learned

Both models describe the same underlying process. The NIST model groups phases more broadly; SANS/PICERL is more granular. Both are referenced across certifications and industry frameworks.

---

### The Six Phases of Incident Response (SANS/PICERL)
[[Assets/Images/Pasted image 20250413182706.png|4 Steps To Incident Response]]

| Phase | Description |
|-------|-------------|
| Preparation | Develop policies, procedures, and tools; train personnel; conduct security awareness activities |
| Identification | Detect and confirm potential incidents using SIEMs, IDS/IPS, and log analysis |
| Containment | Isolate affected systems (short-term); implement fixes to prevent recurrence (long-term) |
| Eradication | Remove malware and vulnerabilities; clean and restore affected systems |
| Recovery | Restore systems to normal operation; monitor for reinfection or recurring issues |
| Lessons Learned | Review the incident; update policies, procedures, and controls; document findings |

---

### NIST Four-Stage Model

IR is a cyclic, not linear, process. As new evidence surfaces, the investigation loops back — new leads produce new IOCs, which reveal new impacted systems. Incident handlers spend the majority of time in Preparation and Detection & Analysis, even during an active incident.

#### Stage 1 — Preparation

Preparation has two distinct objectives:
1. **Establish incident handling capability** — policies, contacts, tools, and procedures for responding when an incident occurs
2. **Prevent incidents proactively** — implement defensive measures that reduce the likelihood and impact of incidents

##### Documentation Requirements
Preparation requires maintaining up-to-date documentation including:
- Contact information and roles for all incident handling team members
- Legal, management, and IT escalation contacts
- Network and system baselines
- Known high-privilege accounts and their justification
- Asset inventory with system owners and sensitivity classifications

All IR documentation and communication channels must be independent from the organization's primary infrastructure — assume adversaries may have access to internal systems.

##### Jump Bag
IR teams maintain a pre-staged jump bag of tools for immediate deployment:
- Forensic workstation or laptop for disk imaging and log analysis
- Digital forensic image acquisition tools
- Log analysis tools
- Network capture tools and packet analyzers
- Write blockers for evidence preservation

##### Protective Measures

| Measure | Description |
|---------|-------------|
| DMARC | Email authentication built on SPF and DKIM — rejects spoofed emails pretending to originate from your domain; requires thorough testing before enforcement to avoid blocking legitimate mail |
| Endpoint Hardening | Follow CIS or Microsoft baselines; disable LLMNR/NetBIOS; implement LAPS; remove local admin from standard users; configure PowerShell Constrained Language Mode |
| Network Segmentation | Divide network to contain blast radius; add IDS/IPS with TLS inspection; restrict non-approved devices |
| Privileged Identity & MFA | Enforce complex passwords; require MFA for all administrative access |
| Vulnerability Management | Continuously scan and remediate high/critical vulnerabilities |
| User Awareness Training | Regular security training plus surprise phishing simulations |
| Active Directory Security | Assess AD for misconfigurations as an attacker would; engage third-party assessors; review frequently as new vulnerabilities emerge |
| Purple Team Exercises | Red team assessments that continuously or eventually inform the blue team — improves detection, visibility, and response across the whole organization |

Monitor for LOLBins — legitimate OS binaries that attackers abuse for execution and privilege escalation without dropping custom tools. See the LOLBAS Project reference below.

---

#### Stage 2 — Detection and Analysis

Detection can originate from any layer of the environment:

| Detection Layer | Sources |
|----------------|---------|
| Network Perimeter | Firewalls, internet-facing IDS/IPS, DMZ sensors |
| Internal Network | Host-based IDS/IPS, internal network monitoring |
| Endpoint | Antivirus, EDR systems |
| Application | Application logs, service logs, authentication logs |
| Human | Employees reporting unusual behavior or suspicious emails |

##### Initial Investigation Checklist
Before assembling a full response team, gather context:
- Date, time, and who detected or reported the incident
- How it was detected and what tool or person surfaced it
- Description of the incident and affected systems
- List of impacted hosts with IP addresses, hostnames, OS types, owners, and purpose
- Document all actions already taken and by whom — flag if incident is still ongoing
- List of malware signatures or indicators if malware is involved

##### Incident Timeline
Build a running timeline sorted by event time throughout the investigation. Each entry should capture:

| Field | Description |
|-------|-------------|
| Date | Date the event occurred |
| Time | Time of event (standardize to UTC where possible) |
| Hostname | System where the event occurred |
| Event Description | What happened |
| Data Source | Log or artifact that captured the event |

Focus the timeline on attacker behavior: when connections were established, what was downloaded, what commands ran.

##### Incident Severity Questions
Answer these questions to prioritize the response:
- What is the exploitation impact?
- What are the requirements to exploit?
- Can business-critical systems be affected?
- Are there suggested remediation steps available?
- How many systems are impacted?
- Is this exploit being actively used in the wild?
- Does the exploit have worm-like propagation capabilities?

Worm capability and in-the-wild exploitation indicate high-sophistication, high-impact incidents requiring the most urgent attention.

##### Incident Confidentiality
IR information is need-to-know only unless legal obligations or management direction specify otherwise. The adversary may still be in the network or may be an insider — limit exposure of investigation details accordingly.

---

#### The Investigation Cycle

Once the initial context is gathered, the investigation enters a three-step repeating cycle:

1. **Create and use IOCs** — document indicators of compromise and search for them across the environment
2. **Identify new leads and impacted systems** — follow IOC hits to surface new evidence
3. **Collect and analyze data from new leads** — examine new systems; add findings back into the timeline and the next round of IOCs

Never focus solely on one specific finding. Leads should drive the investigation — if a finding produces no new leads, continue searching other artifacts.

##### IOC Documentation Standards
| Standard | Description |
|----------|-------------|
| OpenIOC | XML-based language for documenting and sharing structured IOCs |
| YARA | Rule-based format for identifying and classifying malware samples |
| STIX | Structured Threat Information eXpression — JSON format for sharing cyber threat intelligence (CTI); used by CISA advisories |
| Mandiant IOC Editor | GUI tool for creating and editing OpenIOC indicators |

IOCs are added as observables in [[TheHive]] and can be searched across the environment using WMI or PowerShell. When connecting to compromised systems to search for IOCs, use only non-caching connection protocols — WinRM or network logons (type 3). PsExec does not cache credentials when used through the current user's session, but will cache them if credentials are passed explicitly.

##### AI in Threat Detection
AI tools can automate the review of logs, alerts, and reports — reducing analysis time and improving detection accuracy by learning from historical incidents:

- Elastic Security's **Attack Discovery** uses generative AI to analyze alerts and generate comprehensive attack overviews
- Use cases: automated triage and alert prioritization, incident correlation and timeline reconstruction, automated response playbooks, post-incident analysis and learning

##### Data Collection
Collect and preserve system state for new leads. Live response is preferred — shutting down a system wipes RAM, which often contains critical forensic artifacts. Common examination types include malware analysis, disk forensics, and memory forensics. Maintain chain of custody for all evidence to ensure court admissibility.

---

#### Stage 3 — Containment, Eradication, and Recovery

##### Containment

| Type | Goal | Examples |
|------|------|---------|
| Short-term Containment | Limit spread with minimal footprint on evidence | Isolate system in a VLAN, pull network cable, sinkhole C2 DNS, take forensic image |
| Long-term Containment | Keep attackers out while remediation proceeds | Password resets, firewall rules, host-based IDS rules, patching |

Take a forensic disk image during the short-term containment phase if evidence has not already been preserved.

##### Eradication
After containment, eliminate the root cause:
- Remove malware, implants, and backdoors
- Restore from known-good backups where needed
- Apply patches and configuration changes that were deferred during containment
- Ensure the adversary has been fully evicted before proceeding

##### Recovery
Restore affected systems to production under heavy monitoring:
- Subject all restored systems to heightened logging and alerting — previously compromised systems are frequently targeted again
- Monitor specifically for: unusual logons, suspicious processes, registry changes
- Recovery is often phased over months — early phases focus on immediate security hardening; later phases address permanent structural improvements

---

#### Stage 4 — Post-Incident Activity

##### Reporting
A complete incident report answers:
- What happened and when?
- How did the response team perform?
- Did the business provide the right information and respond quickly enough?
- What actions were taken to contain and eradicate?
- What preventative measures are needed to prevent recurrence?
- What tools, resources, or training gaps were identified?

Evaluate whether playbooks, policies, and procedures need updating based on lessons learned. Use the post-incident review as a training opportunity for junior team members.

The best lessons-learned meetings are held with all stakeholders within a few days of the incident being fully resolved.

---

### Pyramid of Pain
The Pyramid of Pain illustrates how much operational effort it requires for an adversary to change their approach when defenders detect or block different types of indicators. Blocking indicators high on the pyramid forces fundamental changes in attacker behavior.

| Level | Indicator Type | Adversary Effort to Change |
|-------|---------------|---------------------------|
| Highest | TTPs (e.g., PowerShell abuse, living-off-the-land) | Very hard — requires fundamentally changing how they operate |
| High | Tools (e.g., specific C2 framework, RAT) | Challenging — requires acquiring or building new tools |
| Medium | Network / Host Artifacts (e.g., registry keys, user agents) | Annoying — requires operational adjustments |
| Low | Domain Names | Simple — register new domains |
| Lower | IP Addresses | Easy — proxy, VPS, or botnet IP rotation |
| Lowest | Hash Values | Trivial — recompile or repack malware to generate new hash |

Defenders should prioritize detection at the TTP level where possible. Hash-based detection alone is easily defeated.

---

### IR Tool Categories

#### SIEM
Collects logs and events from across the network; correlates data and alerts on suspicious activity.
See [[Intro to SIEM]]

#### Case Management
Centralizes investigation workflow — case tracking, IOC management, MITRE ATT&CK mapping, analyst task assignment.
See [[TheHive]]

#### Forensic Tools
Used for disk and memory acquisition and analysis during investigation.
See [[Digital Forensics Fundamentals]]

#### Network Monitoring
- IDS/IPS for real-time detection — see [[Intrusion Detection Systems (IDS)]]
- Packet capture tools for traffic analysis — see [[Wireshark]], [[TCPDump]]

#### Endpoint Detection & Response (EDR)
Monitors endpoint behavior continuously; facilitates containment, remediation, and forensic evidence collection.

---
## Related Concepts
- [[Defensive Security Intro]]
- [[Digital Forensics Fundamentals]]
- [[Intro to SIEM]]
- [[Intrusion Detection Systems (IDS)]]
- [[Security Principles]]
- [[Threat Hunting]]
- [[Cyber Kill Chain]]
- [[MITRE ATT&CK Framework]]

## Related Techniques
-

## Related Tools
- [[TheHive]]
- [[Wireshark]]
- [[TCPDump]]
- [[Volatility 3]]
- [[Autopsy]]

---
## References / Images
- [[Assets/Images/Pasted image 20250413182706.png|4 Steps To Incident Response]]
- NIST SP 800-61r3 — Computer Security Incident Handling Guide — https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r3.pdf
- LOLBAS Project — https://lolbas-project.github.io/
- The DFIR Report (incident report examples) — https://thedfirreport.com/
- Palo Alto Unit 42 Global IR Report — https://www.paloaltonetworks.com/engage/unit42-2025-global-incident-response-report
