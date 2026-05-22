Tags: #Status/Complete #Type/Knowledge #Context/Blueteam #publish-me

---
## Overview
A Security Operations Center (SOC) is a dedicated facility operated by a specialized team that continuously monitors an organization's network and resources to identify suspicious activity and prevent damage. SOC teams operate 24/7 and leverage people, processes, and technology to maintain security posture.

---

## Terminology
| Term | Definition |
|------|------------|
| Alert Triage | First-response process to determine the severity and priority of a detected event |
| False Positive | An alert triggered by legitimate activity incorrectly flagged as malicious |
| Threat Hunting | Proactive search for threats that evade automated detection |
| EDR | Endpoint Detection and Response; provides real-time endpoint visibility and response |
| SOAR | Security Orchestration, Automation, and Response; automates incident management workflows |
| XDR | Extended Detection and Response; unified detection across endpoints, network, and cloud |
| EPP | Endpoint Protection Platform; prevents, detects, and remediates malware attacks |
| CISO | Chief Information Security Officer; executive responsible for organizational security strategy |

---
## Core Concepts

### SOC Ecosystem
[[Assets/Images/Pasted image 20250416110543.png|SOC Ecosystem]]

Centralized framework of tools, processes, and personnel enabling detection, analysis, and response across an organization.

### SOC Focus Areas
| Area | Description |
|------|-------------|
| Detection | Identify vulnerabilities, unauthorized activity, policy violations, and network intrusions |
| Response | Support incident response; contain and remediate detected threats |

### SOC Team Structure
[[Assets/Images/Pasted image 20250413183242.png|Pillars of SOC]]
[[Assets/Images/Pasted image 20250413183448.png|SOC Hierarchy]]

| Role | Responsibilities |
|------|-----------------|
| SOC Director | Sets SOC strategy and budget; owns SOC outcomes; reports to CISO |
| SOC Manager | Oversees SOC processes; coordinates with CISO; reports on security posture |
| SOC Analyst L1 | First responder; alert triage and escalation |
| SOC Analyst L2 | Deeper investigation; correlates data from multiple sources |
| SOC Analyst L3 | Proactive threat hunting; manages containment, eradication, and recovery for critical incidents |
| Detection Engineer | Develops and refines detection rules and logic for security solutions |
| Incident Responder | Handles containment, eradication, and recovery during active incidents; may overlap with L3 |
| Threat Intelligence Analyst | Collects and analyzes CTI feeds; enriches alerts with adversary context and attribution |
| Security Engineer | Deploys and configures security solutions; ensures smooth SOC operations |
| Compliance and Governance Specialist | Ensures SOC operations meet regulatory requirements; manages audit and reporting obligations |
| Security Awareness and Training Coordinator | Develops security training programs; coordinates phishing simulations and awareness campaigns |

> Human intervention remains essential — automated systems surface alerts but analysts determine false positives and set priorities

### SOC Processes

#### Alert Triage
First response to a detection. Severity and priority determined using the 5 W's:

| W | Question |
|---|---------|
| Who | User or entity involved |
| What | Nature of the event |
| When | Time the event occurred |
| Where | Location or system impacted |
| Why | Cause or source of the event |

**Example:**
Malware detected on host "GEORGE PC"
- What: Malicious file detected
- When: 13:20, June 5, 2024
- Where: Directory on GEORGE PC
- Who: User George
- Why: File downloaded from a pirated software site

#### The Triaging Process
A structured triage workflow ensures that critical alerts receive appropriate attention without overwhelming the team with false positives.

| Stage | Actions |
|-------|---------|
| Initial Alert Review | Review alert metadata: timestamp, source IP, destination IP, affected systems, triggering rule; analyze associated logs |
| Alert Classification | Classify the alert by severity, impact, and urgency using the organization's predefined classification system |
| Alert Correlation | Cross-reference with other alerts and events; query the SIEM for related activity; check threat intelligence feeds for known IOCs |
| Enrichment | Gather additional context — packet captures, threat intelligence, recon of affected systems — to build a complete picture |
| Risk Assessment | Evaluate potential impact to critical assets, data, or infrastructure; assess likelihood of successful attack or lateral movement |
| Contextual Analysis | Consider asset criticality, data sensitivity, active security controls, and applicable compliance requirements |
| Incident Response Planning | If significant, initiate IRP: document alert details, assign team members, coordinate with other teams |
| Consultation with IT Operations | Engage IT ops or relevant departments when additional context or missing information is needed |
| Response Execution | Determine response actions — close if non-malicious; escalate and contain if confirmed security incident |
| Escalation | Escalate following organizational policy: provide alert summary, severity, potential impact, and initial findings; document all communication |
| Continuous Monitoring | Monitor the situation and incident response progress; maintain open communication across all involved teams |
| De-Escalation | When risk is mitigated and the situation is under control, notify stakeholders with outcome summary and lessons learned |

#### Reporting
- Escalation of alerts to higher-level analysts
- Reports include all 5 W's, thorough analysis, and supporting evidence (screenshots, logs)

#### Incident Response and Forensics
- Higher-level analysts investigate critical detections
- Forensic analysis determines root cause and full impact
- See [[Incident Response Fundamentals]]

### SOC Technology

| Solution | Description |
|----------|-------------|
| SIEM | Collects logs; detects suspicious activity via rules and logic; modern SIEMs include behavioral analytics and ML — see [[Intro to SIEM]] |
| EDR | Real-time and historical endpoint visibility; enables automated response and investigation |
| Firewall | Monitors and controls network traffic — see [[Firewalls]] |
| IDS/IPS | Detects and prevents intrusions — see [[Intrusion Detection Systems (IDS)]] |
| Antivirus | Detects and removes known malware |
| EPP | Prevents, detects, and remediates malware attacks on endpoints |
| XDR | Unified detection across endpoints, network, and cloud |
| SOAR | Automates incident management, threat intelligence, and vulnerability response workflows |

---
## Related Concepts
- [[Defensive Security Intro]]
- [[Log Fundamentals]]
- [[Intro to SIEM]]
- [[Intrusion Detection Systems (IDS)]]
- [[Incident Response Fundamentals]]
- [[Threat Hunting]]
- [[Firewalls]]
- [[Threat Actors]]
- [[Cyber Kill Chain]]
- [[MITRE ATT&CK Framework]]

## Related Techniques
-

## Related Tools
- [[TheHive]]
- [[Elastic Stack]]

---
## References / Images
- [[Assets/Images/Pasted image 20250416110543.png|SOC Ecosystem]]
- [[Assets/Images/Pasted image 20250413183242.png|Pillars of SOC]]
- [[Assets/Images/Pasted image 20250413183448.png|SOC Hierarchy]]
