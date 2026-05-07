#Status/In-Progress #Type/Knowledge #Context/Blueteam

---
## Overview
Threat hunting is an active, human-led, hypothesis-driven practice that systematically searches network and endpoint data for stealthy threats that evade automated detection systems. Unlike reactive security monitoring, threat hunting turns the posture proactive — hunters actively seek out adversaries rather than waiting for alerts to fire. The principal objective is to substantially reduce dwell time by identifying malicious activity at the earliest stages of the attack lifecycle.

The median time between a security breach and its detection is roughly three weeks. Threat hunting exists to shrink that window.

---

## Terminology
| Term | Definition |
|------|------------|
| Dwell Time | The time between initial compromise and detection — the primary metric threat hunting aims to reduce |
| Adversary | Any entity — cybercriminal, insider, hacktivist, or state-sponsored operator — that seeks to infiltrate systems and cause harm or gain |
| APT | Advanced Persistent Threat; a sophisticated, well-resourced threat actor (often nation-state) that maintains long-term, covert access to high-value targets |
| TTPs | Tactics, Techniques, and Procedures — describes *what* an adversary does (tactics), *how* they do it (techniques), and the step-by-step execution (procedures) |
| Indicator | A piece of technical data combined with context that points to adversary activity — Data + Context = Indicator |
| IOC | Indicator of Compromise; digital artifacts derived from active or past intrusions — file hashes, IPs, domains, registry keys, suspicious user agents |
| Threat | A combination of three factors: **Intent** (the adversary's motivation), **Capability** (tools, resources, and funding), and **Opportunity** (conditions that allow the attack to proceed) |
| Campaign | A collection of related incidents sharing similar TTPs and targeting patterns attributed to the same threat actor or objective |
| Hypothesis | An educated, testable prediction about adversary activity used to direct a hunt |
| Baseline | A documented record of normal behavior in an environment; required to distinguish anomalies from routine activity |
| CTI | Cyber Threat Intelligence; processed information about threats that enables defenders to anticipate and counter adversary actions |
| TIP | Threat Intelligence Platform; a system for aggregating, analyzing, and sharing threat intelligence across teams or organizations |

---
## Core Concepts

### Threat Hunting vs Threat Intelligence
Both disciplines are distinct but tightly interconnected:

| Aspect | Threat Intelligence | Threat Hunting |
|--------|--------------------|----|
| Primary posture | Predictive | Reactive and proactive |
| Goal | Anticipate adversary moves; understand targets and methods | Determine if an adversary is present now, or was present and evaded detection |
| Output | Intelligence reports, IOC feeds, TTP profiles | Confirmed findings, new detection rules, updated playbooks |
| Consumers | Executives, SOC teams, IR teams | SOC Analysts L3, IR specialists |

Threat intelligence informs and feeds hunting operations. A new IOC feed or TTP report should trigger a targeted hunt. Hunting results, in turn, refine and improve intelligence products.

---

### The Threat Hunting Process

| Phase | Description |
|-------|-------------|
| 1 — Setting the Stage | Establish prerequisites: SIEM, EDR, IDS in place and functioning; current environment baseline documented; threat landscape understood; high-value assets identified |
| 2 — Formulating Hypotheses | Develop testable predictions based on new threat intelligence, tool alerts, or environmental anomalies (e.g., *"A lateral movement technique using PsExec is being used on the finance VLAN"*) |
| 3 — Designing the Hunt | Define scope, tools, data sources, and IOCs to search for; build any custom queries or scripts needed; ensure the hypothesis is testable with available data |
| 4 — Data Gathering and Examination | Execute the hunt — collect logs, query SIEMs, and examine endpoints; refine hypotheses if initial searches are unproductive |
| 5 — Evaluating Findings | Interpret results; determine if findings confirm adversary presence; document impacted systems, behavior, and blast radius |
| 6 — Mitigating Threats | Isolate compromised systems, remove malware, patch vulnerabilities, block IOCs in security controls |
| 7 — After the Hunt | Document methods and outcomes; update threat intelligence platforms; enhance detection rules; refine playbooks; share findings with relevant teams |

Continuous improvement closes the loop — every completed hunt should make the next one faster and more effective.

---

### When to Hunt

Hunting should be initiated under any of the following conditions:
- New threat intelligence surfaces on an adversary targeting your sector
- New IOCs are associated with a known threat actor
- Multiple network anomalies are detected within a short window
- An incident response engagement is underway (hunting augments the IR investigation)
- Periodic proactive hunts as part of the security program cadence

---

### Relationship to Incident Response

Threat hunting and incident response are distinct disciplines that frequently operate together. A hunt may trigger an incident; an active incident may prompt a parallel hunting effort.

| IR Phase | Threat Hunting Role |
|----------|---------------------|
| Preparation | Hunting team establishes rules of engagement, courses of action, and tool readiness |
| Detection & Analysis | Hunters augment investigations, validate whether IOCs indicate a real incident, and surface artifacts that automated tools miss |
| Containment, Eradication, and Recovery | Role depends on organizational policy — hunters may be asked to assist or hand off to IR |
| Post-Incident Activity | Hunters contribute recommendations, refine detection rules, and improve future hunt playbooks |

See [[Incident Response Fundamentals]] for the full IR lifecycle.

---

### Relationship to Risk Assessment

Risk assessment directly informs hunt prioritization. By identifying the organization's most critical assets and most likely threat vectors, it guides where hunters focus their efforts.

Risk assessment contributes to threat hunting by:
- **Prioritizing hunting efforts** — focus resources on the highest-impact asset classes
- **Understanding the threat landscape** — align hunts with threat actors known to target your industry
- **Highlighting vulnerabilities** — surface gaps that adversaries are most likely to exploit
- **Informing threat intelligence use** — identify which intelligence feeds are most relevant
- **Refining IR plans** — ensure hunting findings feed back into updated response procedures

---

### Cyber Threat Intelligence (CTI)

CTI transforms raw data about threats into processed, actionable intelligence. Its primary objective is to shift defense from reactive to anticipatory.

#### Four Principles of Good Intelligence

| Principle | Description |
|-----------|-------------|
| Relevance | Applies directly to the organization's environment and threat profile |
| Timeliness | Communicated quickly enough to act on — stale intelligence has diminished value |
| Actionability | Provides specific, executable guidance the defense team can implement |
| Accuracy | Verified and validated — unverified intelligence can lead to wasted effort or false responses |

#### CTI Categories

Intelligence is classified into three categories, each serving a different audience:

| Category | Audience | Focus | Answers |
|----------|----------|-------|---------|
| Strategic | Executives, VPs, leadership | Business risk; high-level adversary operations overview | Who and Why |
| Operational | SOC managers, IR leads | Adversary campaign details; specific targeting patterns | How and Where |
| Tactical | Network defenders, SOC analysts | Immediate technical IOCs; attack specifics that occurred or are imminent | What (specific indicators) |

The highest value CTI analysts can produce intelligence that spans all three layers, offering both executive-level context and analyst-level actionable detail.

#### Processing a Tactical Intelligence Report

1. Comprehend the report's scope and narrative — understand what threat it covers and what organization or sector it targets
2. Spot and classify IOCs — categorize by type: hash, IP, domain, registry key, user agent, TTP
3. Comprehend the attack lifecycle — map the described activity to the [[Cyber Kill Chain]] or [[MITRE ATT&CK Framework]]
4. Analyze and validate the IOCs — cross-reference against VirusTotal, threat intel databases, and other reports
5. Incorporate IOCs into security infrastructure — push to SIEM rules, firewall blocklists, EDR detections
6. Launch a proactive hunt — use the IOCs and TTPs to hunt for the described activity in your environment
7. Continuous monitoring and learning — maintain detection rules as the threat evolves

---

### The Diamond Model of Intrusion Analysis

The Diamond Model is a conceptual framework that structures the fundamental components of any cyber intrusion, enabling more systematic threat analysis, detection, and prediction.

[[Assets/Images/Diamond Model of Intrusion Analysis.png|Diamond Model of Intrusion Analysis]]

| Component | Description |
|-----------|-------------|
| Adversary | The individual, group, or nation-state responsible for the intrusion — may be initially unknown and identified through attribution |
| Capability | The TTPs the adversary employs — malware, exploit kits, living-off-the-land techniques |
| Infrastructure | Physical and virtual resources the adversary uses to conduct operations — C2 servers, domains, IP ranges, compromised hosts |
| Victim | The target of the intrusion — an individual, organization, or system |

The core relationship: an **adversary** uses **capabilities** via **infrastructure** to compromise a **victim**.

The model captures complex relationships between these four nodes and enables:
- Building a complete picture of a specific threat actor's operations
- Correlating multiple intrusions into campaigns
- Predicting future targets or infrastructure based on known patterns
- Informing detection strategies by targeting adversary capabilities and infrastructure

---

### Threat Hunting Team Structure

| Role | Responsibility |
|------|---------------|
| Threat Hunter | Deep technical specialist who executes hunts; analyzes logs, builds queries, and identifies adversary artifacts |
| Threat Intelligence Analyst | Collects intelligence from feeds, ISACs, dark web monitoring, and vendor reports; understands the current threat landscape and predicts emerging trends |
| Incident Responder | Manages confirmed incidents; leads containment, eradication, and recovery when a hunt escalates |
| Forensic Expert | Conducts disk, memory, and log forensics; produces detailed evidence reports |
| Data Analyst / Scientist | Applies statistical models, ML algorithms, and data mining to large datasets to surface behavioral patterns |
| Security Engineer / Architect | Designs and maintains the security infrastructure the hunting team depends on |
| Network Security Analyst | Specializes in network traffic and behavior; identifies anomalies in flow data and protocol use |
| SOC Manager | Coordinates the team, ensures resource availability, and manages communication with leadership |

---

### Pyramid of Pain
The Pyramid of Pain defines how much effort an adversary must expend to adapt when a given indicator type is blocked. Detections at the TTP level force fundamental behavioral changes; hash-based detection is trivially defeated.

See [[Incident Response Fundamentals]] for the full Pyramid of Pain table.

---
## Related Concepts
- [[Incident Response Fundamentals]]
- [[SOC Fundamentals]]
- [[Cyber Kill Chain]]
- [[MITRE ATT&CK Framework]]
- [[Log Fundamentals]]
- [[Defensive Security Intro]]

## Related Techniques
-

## Related Tools
- [[Elastic Stack]]
- [[Sysmon]]
- [[SilkETW]]
- [[TheHive]]
- [[Wireshark]]
- [[TCPDump]]

---
## References / Images
- [[Assets/Images/Diamond Model of Intrusion Analysis.png|Diamond Model of Intrusion Analysis]]
- MITRE ATT&CK Navigator — https://mitre-attack.github.io/attack-navigator/
