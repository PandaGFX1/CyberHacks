Tags: #Status/In-Progress #Type/Knowledge #Context/Blueteam #publish-me

---
## Overview
Security is divided into specialized domains, each focused on a distinct area of risk. Understanding these domains provides context for how security teams, tools, and processes are structured across an organization. Each domain has its own dedicated roles, tools, and threat landscape — but all share the same foundation: protecting the CIA triad.

---

## Terminology
| Term | Definition |
|------|------------|
| Security Domain | A distinct area of cybersecurity practice with its own tools, risks, and personnel |
| Security by Design | Incorporating security from the earliest stages of development rather than as an afterthought |
| Shared Responsibility Model | Framework dividing security obligations between a cloud provider and its customers |
| RTO (Recovery Time Objective) | Maximum acceptable downtime before operations must resume |
| RPO (Recovery Point Objective) | Maximum acceptable data loss measured in time |
| Defense in Depth | Layered security strategy where failure of one control does not compromise overall security |
| IAM (Identity and Access Management) | Framework for managing user identities and controlling access to resources |
| CISO | Chief Information Security Officer — executive responsible for the entire InfoSec program |
| Purple Team | Collaboration between red and blue teams to improve both attack and defense capabilities simultaneously |

---
## Core Concepts

### Application Security
Protects software applications from threats throughout their entire lifecycle — from development through deployment and ongoing maintenance. The primary goal is ensuring applications are built and operated in a way that supports the CIA triad.

Key practices:
- **Security by design** — security must be the first consideration, not an afterthought
- Threat modeling, secure code reviews, and static analysis during development
- Rigorous vulnerability testing before deployment
- Ongoing monitoring and patching post-deployment

### Operational Security (OpSec)
Covers the processes, practices, and decisions related to handling and protecting data assets throughout their lifecycle. Focuses on identifying what information is critical, how it could be exposed, and putting protective controls in place.

Key controls: access controls, asset management, change management.

### Disaster Recovery & Business Continuity (DR/BC)
Ensures an organization can continue operating during and after a significant disruption.

| Concept | Description |
|---------|-------------|
| Disaster Recovery (DR) | Restores critical systems and data following a catastrophic event |
| Business Continuity (BC) | Ensures the business keeps operating even if temporary adjustments are needed |
| RTO | Maximum acceptable downtime before operations must resume |
| RPO | Maximum acceptable amount of data loss measured in time |

Normally managed by a dedicated team who assess risks and design recovery plans in advance.

### Cloud Security
Securing data and workloads hosted in cloud environments. Cloud security differs from traditional on-premises security because responsibility is shared between the cloud provider and the customer.

| Responsibility | Party |
|----------------|-------|
| Physical infrastructure, hardware, hypervisors | Cloud provider |
| Configuration, data, access controls, applications | Customer / Security team |

Key risks: insecure APIs, misconfigured cloud storage, weak IAM policies.
Key areas: Data Protection, Identity and Access Management (IAM), Network Security, Compliance.

### Physical Security
Protection of the hardware, facilities, and documents that store and process data. Applies Defense in Depth — multiple layers designed to deter, detect, delay, and respond to physical threats.

Responsibility extends beyond a dedicated physical security team — every employee plays a role. Physical penetration testers test the effectiveness of physical controls alongside technical assessments.

### Mobile Security
Secures mobile devices against unauthorized access, unsecured networks, and malicious applications. Mobile devices are high-value targets because they contain banking information, personal data, contacts, and communications.

| Layer | Controls |
|-------|----------|
| Device Security | Passcodes, biometrics, physical lockout policies |
| Data Security | Encryption, secure backups |
| Network Security | VPNs, secure communication protocols |
| Application Security | App vetting, permissions management, secure development practices |

### Internet of Things (IoT) Security
Securing internet-connected devices beyond traditional computers — thermostats, smart appliances, vehicles, cameras, industrial sensors, and more. IoT devices present unique challenges due to their constraints and scale.

Key challenges:
- Limited processing power and memory make advanced security difficult to implement
- Deployed in large numbers across diverse environments
- Difficult to patch or update at scale

Key stakeholders: Device Manufacturers, Network Administrators, Application Developers.

### Security Roles
Security is a team discipline — many distinct roles contribute to an organization's posture. All of these roles intersect with penetration testing in some way.

| Role | Responsibilities |
|------|-----------------|
| Chief Information Security Officer (CISO) | Oversees the entire InfoSec program; sets security strategy and policy; accountable for the organization's security posture |
| Security Architect | Designs secure systems, networks, and infrastructure; defines security standards that pentesters evaluate |
| Penetration Tester | Identifies vulnerabilities through authorized simulated attacks; actively exploits weaknesses to validate real-world impact |
| Incident Response Specialist | Manages and responds to security incidents; works with pentesters post-engagement to share findings and improve response |
| Security Analyst | Monitors systems for threats; analyzes security data; uses pentest results to improve detection and alerting |
| Compliance Specialist | Ensures adherence to regulatory and security standards; uses pentest reports to demonstrate compliance and close gaps |

---
## Related Concepts
- [[Security Principles]]
- [[Defensive Security Intro]]
- [[Threat Actors]]

## Related Techniques
-

---
## References / Images
-
