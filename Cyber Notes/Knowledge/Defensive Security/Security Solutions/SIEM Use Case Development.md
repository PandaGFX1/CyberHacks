Tags: #Status/In-Progress #Type/Knowledge #Context/Blueteam

---
## Overview
SIEM use case development is the process of translating security requirements into functional detection logic within a SIEM platform. A use case defines a specific scenario the SIEM monitors for — from generic anomalies like repeated failed logins to complex behavioral chains like Office applications spawning MSBuild — and includes the alerting conditions, investigation SOP, and tuning criteria needed to operationalize it.

---

## Terminology
| Term | Definition |
|------|------------|
| Use Case | A defined detection scenario that triggers a SIEM alert under specified conditions |
| TTD | Time to Detection — how quickly the SIEM surfaces an alert after an event occurs |
| TTR | Time to Response — how quickly analysts acknowledge and begin responding to an alert |
| SOP | Standard Operating Procedure — documented steps analysts follow when working an alert |
| IRP | Incident Response Plan — escalation path and containment steps for confirmed incidents |
| SLA | Service Level Agreement — contractual obligation for response time between teams |
| OLA | Operational Level Agreement — internal commitment between teams supporting the SLA |
| LoLBin | Living off the Land Binary — legitimate Windows binary abused for malicious purposes |
| False Positive | An alert triggered by legitimate activity incorrectly flagged as malicious |
| Fine-Tuning | Refining detection logic to reduce false positives while preserving detection coverage |

---
## Core Concepts

### Use Case Development Lifecycle
Use cases follow a structured lifecycle from initial requirements through ongoing maintenance. Each stage should be validated before moving to the next.

| Stage | Purpose |
|-------|---------|
| Requirements | Define what the use case detects and why — the specific threat scenario or business need |
| Data Points | Identify which log sources contain the required fields (user, timestamp, source, destination, etc.) |
| Log Validation | Confirm the required logs are being received and contain complete, usable data |
| Design and Implementation | Define the alert condition, aggregation window, and priority level |
| Documentation | Write the SOP detailing how analysts should investigate and escalate the alert |
| Onboarding | Deploy to a development or staging environment before promoting to production |
| Periodic Update / Fine-tuning | Continuously refine based on analyst feedback; whitelist known-good patterns |

### Design Parameters
Three primary parameters must be defined when implementing a use case:

| Parameter | Description |
|-----------|-------------|
| Condition | The specific event pattern or threshold that triggers the alert — e.g., 10 failed logins within 4 minutes |
| Aggregation | How events are grouped before alerting — grouping by username prevents the same event from firing 10 separate alerts |
| Priority | Severity level based on asset criticality, likelihood of a true positive, and potential impact |

### Building a Use Case
When designing a new detection use case:
1. Identify the detection need and risk — what threat does this address and how severe is the impact?
2. Map to [[MITRE ATT&CK Framework]] — assign the matching Tactic, Technique, and Sub-Technique IDs
3. Define TTD and TTR targets based on the rule execution interval and data ingestion pipeline
4. Write the SOP: fields to examine, enrichment sources, escalation contacts, and decision thresholds
5. Write the IRP for confirmed true positive outcomes
6. Set SLAs and OLAs between the SOC and supporting teams
7. Deploy to a development environment first; promote to production after validation
8. Establish a periodic review cadence and maintain a whitelist of known-good patterns

### Priority and MITRE Mapping
Before implementing a use case, assign a global risk category (High / Medium / Low) and map to:
- **Tactic ID** — the adversary's objective (e.g., Defense Evasion TA0005)
- **Technique ID** — the specific method (e.g., T1127 — Trusted Developer Utilities Proxy Execution)
- **Sub-Technique ID** — the precise implementation (e.g., T1127.001 — MSBuild)

Mapping to [[MITRE ATT&CK Framework]] standardizes reporting and enables gap analysis across the full detection coverage matrix.

### Investigation Template
When an alert fires, the SOP should require the analyst to collect:
- `process.name` — the process that triggered the alert
- `process.parent.name` — what launched that process
- `event.action` — the action taken
- Host where the alert was detected
- User account associated with the machine
- User activity in the ±2 day window around the alert timestamp

After gathering this information, analysts should contact the affected user and examine system logs, antivirus logs, and proxy logs in the SIEM for full visibility before escalating.

---

## Example: MSBuild Launched by Office Application
MSBuild (the Microsoft Build Engine) compiles applications from XML project files — typically invoked by Visual Studio during development. Attackers abuse MSBuild by embedding malicious source code inside a crafted XML config file, then tricking an Office macro into launching it. This is a LoLBin (Living off the Land Binary) technique because it uses a trusted, signed Windows binary to execute arbitrary code.

**Detection scenario:** Word or Excel spawns MSBuild, which executes a malicious payload via an embedded XML project file.

#### MITRE Mapping
| Tactic | Technique | ID |
|--------|-----------|-----|
| Defense Evasion | Trusted Developer Utilities Proxy Execution | TA0005 / T1127 |
| Execution | Trusted Developer Utilities Proxy Execution: MSBuild | TA0002 / T1127.001 |

#### Detection Logic
Monitor for `process.name: MSBuild.exe` where `process.parent.name` is `EXCEL.EXE` or `WINWORD.EXE`.

#### Priority
High — LoLBin abuse is actively used to bypass detection and carries significant risk if missed.

#### SOP Fields to Examine
- `process.name`
- `process.parent.name`
- `event.action`
- Host and user associated with the alert
- User activity ±2 days around alert timestamp

#### False Positive Tuning
MSBuild is a legitimate tool for Windows developers. Exclude known-good parent processes such as `devenv.exe` (Visual Studio) and CI/CD runner processes to avoid alerting on normal development activity.

---
## Related Concepts
- [[Intro to SIEM]]
- [[SOC Fundamentals]]
- [[MITRE ATT&CK Framework]]
- [[Incident Response Fundamentals]]

## Related Techniques
-

---
## References / Images
- Elastic Common Schema Event Fields — https://www.elastic.co/guide/en/ecs/current/ecs-event.html
- MITRE ATT&CK — https://attack.mitre.org/
