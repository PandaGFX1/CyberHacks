Tags: #Status/In-Progress #Type/Tool #Context/Blueteam

---
## Overview
TheHive is an open-source Security Incident Response Platform (SIRP) designed for SOC and DFIR teams to manage and investigate security incidents. It provides case management, alert triage, observable/IOC tracking, MITRE ATT&CK TTP mapping, and analyst task workflows in a centralized web interface. Developed and maintained by StrangeBee; current major version is TheHive 5, which introduced a full UI rewrite with improved dashboards, alert preprocessing, and integrated ATT&CK mapping.

## Target / Context
SOC analysts and incident responders managing active security incidents. Integrates with Cortex (automated observable analysis) and MISP (threat intelligence sharing). Relevant to CJCA certification prep.

---
## Installation

> [!INFO]- Installation (Docker Compose):
> `docker compose up -d`
> Access the web UI at http://localhost:9000 after 60-90 seconds.
> Default credentials: admin@thehive.local / secret — change immediately.
>
> Stack requirements:
> - TheHive 5 application container
> - Elasticsearch (data backend)
> - MinIO (file and attachment storage)

---
## Basic Usage

> [!INFO]- Login and Initial Setup:
> 1. Navigate to http://localhost:9000
> 2. Log in with default admin credentials
> 3. Change the default password immediately
> 4. Create an organization under Admin → Organizations
> 5. Add analyst user accounts and assign roles (analyst, org-admin)

---
## Flags & Options

> [!INFO]- Key Interface Sections:
> | Section | Purpose |
> |---------|---------|
> | Alerts | Incoming detections from connected tools awaiting analyst triage |
> | Cases | Full investigations — each case bundles tasks, observables, timelines, and evidence |
> | Tasks | Individual work items assigned to analysts within a case |
> | Observables | IOCs and artifacts (IPs, hashes, domains, URLs, emails) linked to alerts or cases |
> | Dashboards | Metrics, open case counts, and investigation status overview |
> | MITRE ATT&CK | TTP mapping panel — add observed techniques to alerts and cases |

---
## Common Use Cases

### Creating a Case from an Alert

> [!INFO]- Promote Alert to Case:
> 1. Navigate to Alerts → select the relevant alert
> 2. Review auto-extracted observables and severity
> 3. Click "Create Case from Alert" to promote to full investigation
> 4. Set severity (Low / Medium / High / Critical) and assign to an analyst
> 5. Add tasks for each investigation step (triage, containment, eradication, reporting)
> 6. Attach evidence files, screenshots, and logs

### Managing Observables (IOCs)

> [!INFO]- Adding and Tracking Observables:
> 1. Inside a Case, go to the Observables tab
> 2. Click "Add Observable" and select the type: ip, domain, url, hash, mail, filename, etc.
> 3. Enter the value — mark as IOC if it confirms compromise
> 4. Add tags and a description for context
> 5. Run Cortex analyzers on the observable if Cortex is connected (VirusTotal, Shodan, DNS enrichment, etc.)
> 6. Review analyzer reports and mark relevant findings as important

### Mapping MITRE ATT&CK TTPs

> [!INFO]- Linking Techniques to a Case:
> 1. Open a Case and navigate to the MITRE ATT&CK panel
> 2. Browse or search the ATT&CK matrix by tactic or technique name
> 3. Select the observed technique (e.g., Persistence → T1543.003 — Windows Service)
> 4. Link it to the case — included in the case summary and exportable for reporting
> 5. Repeat for all observed adversary behaviors throughout the investigation

### Running Cortex Analysis

> [!INFO]- Automated Observable Enrichment:
> Requires Cortex connected to TheHive via API key.
> 1. Select an observable in a case or alert
> 2. Click "Run Analyzers"
> 3. Select analyzers: VirusTotal_GetReport, MISPWarningLists, Shodan_Host, etc.
> 4. View enriched report inline on the observable
> 5. Promote high-value findings to case-level observables

### Exporting to MISP

> [!INFO]- Threat Intelligence Sharing:
> Requires MISP connector configured in TheHive settings.
> 1. Inside a finalized Case, use the MISP export option
> 2. TheHive exports IOCs and ATT&CK mappings as a MISP event
> 3. MISP distributes the event to connected threat intelligence sharing communities

---
## Related Techniques
- [[Incident Response Fundamentals]]

## Related Playbooks
-

---
## References / Images
- TheHive Documentation — https://docs.strangebee.com/thehive/
- TheHive GitHub — https://github.com/TheHive-Project/TheHive
- Cortex (analysis engine) — https://github.com/TheHive-Project/Cortex
- MISP (threat intelligence platform) — https://www.misp-project.org/
