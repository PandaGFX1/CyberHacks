Tags: #Status/Complete #Type/Knowledge #Context/Blueteam #publish-me

---
## Overview
Logs are digital footprints left behind by any activity on a system or network — whether from normal operations or malicious intent. They provide a detailed record of system, application, and user activity, enabling security monitoring, incident investigation, troubleshooting, performance analysis, and compliance auditing.

---

## Terminology
| Term | Definition |
|------|------------|
| Log | A recorded entry of an event or activity on a system or network |
| Event ID | Unique identifier assigned to each type of Windows log event |
| Log Analysis | Technique for extracting actionable insights from log data |
| Access Log | Web server log recording all incoming HTTP requests |
| User-Agent | String identifying the client's browser and operating system in HTTP requests |
| Audit Trail | Chronological record of events used for compliance and forensic purposes |

---
## Core Concepts

### Use Cases for Logs
| Use Case | Description |
|----------|-------------|
| Security Monitoring | Detect anomalous behavior through real-time log analysis |
| Incident Investigation | Trace activity during security incidents; support root cause analysis |
| Troubleshooting | Record errors and warnings to diagnose system or application issues |
| Performance Monitoring | Track performance metrics of applications and services |
| Auditing and Compliance | Establish activity trails for regulatory and organizational requirements |

### Types of Logs
[[Assets/Images/Pasted image 20250415121803.png|Types of Logs]]

Log types vary depending on the application or service generating them. Common categories include system logs, application logs, security logs, network logs, and web server access logs.

### Windows Event Logs
Viewable via: `Event Viewer → Windows Logs`
See [[Windows Fundamentals]] for Event Viewer navigation detail.

#### Log Categories
| Category | Description |
|----------|-------------|
| Application Logs | Errors, warnings, and informational messages from applications |
| System Logs | System operations, driver issues, hardware events, and startup processes |
| Security Logs | User authentication, account changes, policy modifications, and security events |

#### Windows Event Log Fields
| Field | Description |
|-------|-------------|
| Description | Detailed information about the activity |
| Log Name | Name of the log file |
| Logged | Timestamp of the activity |
| Event ID | Unique identifier for the event type |

#### Important Event IDs
| Event ID | Description |
|----------|-------------|
| 4624 | Successful logon |
| 4625 | Failed logon |
| 4634 | User logoff |
| 4720 | Account created |
| 4722 | Account enabled |
| 4724 | Attempt to reset password |
| 4725 | Account disabled |
| 4726 | Account deleted |
| 4688 | Process execution |
| 104 | Event log cleared |

### Web Server Access Log Analysis
Web servers log all requests in dedicated log files.

#### Apache Access Log
Location: `/var/log/apache2/access.log`
See [[Linux Fundamentals]] for Linux log directory structure.

| Field | Description |
|-------|-------------|
| IP Address | Origin of the request |
| Timestamp | When the request occurred |
| Request | HTTP method and requested resource |
| Status Code | Server response code |
| User-Agent | Client system and browser details |

#### Log Analysis Commands
| Command | Purpose |
|---------|---------|
| `cat file` | Read a log file |
| `cat file1 file2 > combined` | Combine multiple log files |
| `grep "term" file` | Filter log entries by keyword |
| `less file` | Page through large log files efficiently |

---
## Related Concepts
- [[Intro to SIEM]]
- [[Digital Forensics Fundamentals]]
- [[Incident Response Fundamentals]]
- [[Windows Fundamentals]]
- [[Linux Fundamentals]]

## Related Techniques
-

## Related Tools
-

---
## References / Images
- [[Assets/Images/Pasted image 20250415121803.png|Types of Logs]]
- Microsoft Windows Event ID reference
- Apache log format documentation
