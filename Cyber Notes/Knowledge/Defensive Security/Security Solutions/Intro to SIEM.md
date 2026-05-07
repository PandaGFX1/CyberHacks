Tags: #Status/Complete #Type/Knowledge #Context/Blueteam #publish-me

---
## Overview
A Security Information and Event Management (SIEM) system collects logs and data from various endpoints and network devices, centralizes it, and performs correlation to identify suspicious or malicious activity. SIEMs automate the tedious process of manual log review and provide real-time monitoring, alerting, and historical investigation capabilities.

---

## Terminology
| Term | Definition |
|------|------------|
| SIEM | Security Information and Event Management; centralizes log collection and correlation |
| Log Ingestion | Process of collecting and importing logs into the SIEM |
| Correlation Rule | Logical expression that triggers an alert when specific conditions are met |
| Agent / Forwarder | Lightweight tool installed on endpoints to collect and forward logs to a SIEM |
| Syslog | Protocol for sending real-time logs from systems to a central collector |
| Dashboard | Customizable SIEM interface displaying alerts, metrics, and visualizations |
| Host-Centric Log | Log capturing events on an individual host |
| Network-Centric Log | Log capturing events from host communications or internet activity |

---
## Core Concepts

### Key SIEM Features
| Feature | Description |
|---------|-------------|
| Real-time log ingestion | Continuously collects logs as events occur |
| Alerting | Notifies analysts of abnormal or suspicious activity |
| 24/7 monitoring | Provides continuous visibility across the environment |
| Early threat detection | Identifies indicators of compromise before damage escalates |
| Data visualization | Dashboards surface patterns, trends, and anomalies |
| Post-incident investigation | Historical log storage enables forensic analysis |

### Network Visibility

#### Host-Centric Log Sources
Capture events occurring on individual hosts.
- Windows Event Logs, Sysmon, Osquery
- User authentication events
- File access and modification
- Process execution
- Registry modifications
- PowerShell execution

#### Network-Centric Log Sources
Capture events from host communications and internet activity.
- SSH connections
- FTP file access
- Web traffic
- VPN access
- File sharing activity

### Log Sources and Ingestion

#### Windows
- Events recorded and viewable via Event Viewer
- See [[Windows Fundamentals]] for Event Viewer detail

#### Linux
- Logs stored across specific directories by service type

| Log Path | Purpose |
|----------|---------|
| `/var/log/httpd` | HTTP requests, responses, and errors |
| `/var/log/cron` | Cron job execution events |
| `/var/log/auth.log` or `/var/log/secure` | Authentication events |
| `/var/log/kern` | Kernel events |
| `/var/log/apache` | Apache web server logs |

See [[Linux Fundamentals]] for broader Linux log structure detail.

#### Web Servers
- Logs available in standard server directories per web server type

#### Log Ingestion Methods
| Method | Description |
|--------|-------------|
| Agent / Forwarder | Lightweight tool on endpoints; collects and forwards logs to SIEM |
| Syslog | Protocol sending real-time logs to a central SIEM instance |
| Manual Upload | Ingests offline logs for analysis |
| Port Forwarding | Endpoints forward logs to a SIEM listening on a specific port |

### SIEM Business Requirements
| Business Need | Description |
|--------------|-------------|
| Log Aggregation & Normalization | Consolidates data from disparate sources into a common field schema; improves threat visibility and enables correlation across datasets |
| Threat Alerting | Advanced analytics and threat intelligence enable faster, more targeted investigations and reduce mean time to detect |
| Contextualization & Response | Context-driven filtering reduces alert volume and helps analysts distinguish true positives from noise |
| Compliance | Regulatory frameworks (PCI DSS, HIPAA, SOX) commonly mandate SIEM-level log collection, retention, and monitoring |

### Data Flow in a SIEM
1. **Ingest** — Logs from endpoints, servers, network devices, and applications are collected via agents, Syslog, or API feeds
2. **Normalize** — Raw logs from different sources are converted into a common field schema (data normalization and aggregation) so the SIEM engine can query them consistently
3. **Correlate and Detect** — The SIEM applies detection rules, thresholds, and behavioral analytics against the normalized data
4. **Visualize and Act** — SOC analysts work from dashboards, alerts, and incident workflows built on top of the correlated data

### Analyzing Logs and Alerts
SIEM correlates ingested logs against rules defined by SOC analysts to surface actionable alerts.

#### Dashboard Views
Dashboards can be customized to display:
- Alert highlights and triggered rules
- System and health notifications
- Failed login attempts
- Event ingestion counts
- Top visited domains

#### Correlation Rules
Logical expressions that trigger alerts when defined conditions are met.

| Example Condition | Alert Triggered |
|-------------------|-----------------|
| 5 failed logins within 10 seconds | Multiple Failed Login Attempts |
| USB device connected | Removable Media Inserted |
| WinEventLog + EventID 104 | Event Log Cleared |

> [!WARNING] Security Note
> Log clearing (EventID 104) is a common post-exploitation action — a triggered alert here warrants immediate investigation

---
## Related Concepts
- [[SOC Fundamentals]]
- [[Log Fundamentals]]
- [[Defensive Security Intro]]
- [[Windows Fundamentals]]
- [[Linux Fundamentals]]
- [[SIEM Use Case Development]]

## Related Techniques
-

## Related Tools
- [[Elastic Stack]]

---
## References / Images
- SIEM dashboard and correlation rule examples
- Windows Event Log and Linux log directory references
