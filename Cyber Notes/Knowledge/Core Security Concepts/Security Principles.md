Tags: #Status/In-Progress #Type/Knowledge #Context/Redteam #Context/Blueteam #publish-me

---
## Overview
Security principles guide how organizations protect data, systems, and resources. They establish a foundation for confidentiality, integrity, availability, and proper access management — forming the basis for security policy, system design, and threat response across both offensive and defensive disciplines.

---

## Terminology
| Term | Definition |
|------|------------|
| CIA Triad | Core information security model: Confidentiality, Integrity, Availability |
| Non-Repudiation | Assurance that a party cannot deny the authenticity of their actions or messages |
| Authentication | Verification of the identity of a user, process, or device |
| Privacy | Proper handling and protection of sensitive personal information |
| Risk | Potential for a damaging event; quantified by likelihood × severity |
| Threat | Any potential cause of an incident that could result in harm to a system or organization |
| Vulnerability | Weakness in a system that could be exploited by a threat |
| Defense in Depth | Layered security approach ensuring failure of one control doesn't compromise overall security |
| PIM (Privileged Identity Management) | Maps user roles to appropriate system access roles |
| PAM (Privileged Access Management) | Manages and enforces policies around privileged access |
| Threat Modeling | Structured process for identifying, analyzing, and mitigating security threats |
| CSIRT | Computer Security Incident Response Team; manages security incidents |
| STRIDE | Threat modeling framework covering six threat categories |
| PASTA | Process for Attack Simulation and Threat Analysis; risk-centric threat modeling framework |

---
## Core Concepts

### CIA Triad
Core model for information security policy — all three elements must be continuously addressed.

| Principle | Description | Example Techniques |
|-----------|-------------|-------------------|
| Confidentiality | Protects data from unauthorized access or misuse | Access control, encryption, need-to-know policies |
| Integrity | Ensures information remains accurate unless authorized changes occur | Hashing, digital signatures, access control |
| Availability | Data must be accessible when needed | Redundancy, reliable hardware, secure protocols |
| Non-Repudiation | Ensures a party cannot deny the authenticity of their actions or the messages they sent | Digital signatures, audit logs |
| Authentication | Verifies the identity of a user, process, or device before granting access | Passwords, biometrics, MFA |
| Privacy | Governs the proper handling of sensitive personal information | Data minimization, consent management, anonymization |

Example: HR employees can access employee records; other departments have limited access — enforces Confidentiality.

### Defense in Depth
Uses multiple varied layers of security controls to provide redundancy.
- Failure of one layer does not compromise overall security
- Layers may include: network controls, endpoint protection, access management, monitoring, encryption

### Risk Framework
Understanding the relationship between risk, threats, and vulnerabilities is foundational to all security work.

| Concept | Definition |
|---------|------------|
| Risk | The potential for a damaging event to occur; quantified by **likelihood × severity of impact** |
| Threat | Any potential cause of an incident — could be a malicious actor, natural event, or system failure |
| Vulnerability | A weakness in a system that a threat can exploit |

For a system to be compromised, three conditions must align: a threat must exist, the threat must be capable of exploiting a vulnerability, and exploitation must result in potential damage. Managing risk means identifying threats and vulnerabilities proactively and applying controls to reduce either likelihood or impact.

### Principles of Privilege
Ensures users have appropriate access levels based on role and data sensitivity.

| Concept | Description |
|---------|-------------|
| PIM (Privileged Identity Management) | Maps user roles to system access roles |
| PAM (Privileged Access Management) | Manages privileges; enforces password policies, auditing, and attack surface reduction |

### Security Models

#### Bell-La Padula Model
Focuses on **confidentiality** — prevents unauthorized disclosure of information.
[[Assets/Images/Pasted image 20260308123326.png|Bell-La Padula Model]]

Rule: **No write down, no read up** — users can read at or below their level, write only above.

| Aspect | Detail |
|--------|--------|
| Use Case | Government and military environments |
| Advantages | Simple, hierarchical, proven in practice |
| Disadvantages | Requires trust; awareness of object existence may leak information |

#### Biba Model
Focuses on **integrity** — prevents unauthorized modification of information.
[[Assets/Images/Pasted image 20260308143259.png|Biba Model]]

Rule: **No write up, no read down** — users can write at or below their level, read only above.

| Aspect | Detail |
|--------|--------|
| Use Case | Development and environments requiring data integrity |
| Advantages | Simple; addresses integrity gaps left by Bell-La Padula |
| Disadvantages | Multiple access levels can introduce delays |

### Threat Modeling
Structured process for reviewing, improving, and testing security protocols.

Key steps: Preparation → Identification → Mitigation → Review

Includes: threat intelligence, asset identification, mitigation planning, risk assessment.

#### STRIDE Framework
| Threat | Description | Mitigation |
|--------|-------------|------------|
| Spoofing Identity | Impersonating users or systems | Authentication, API keys, encryption |
| Tampering with Data | Unauthorized data modification | Anti-tampering measures, integrity checks |
| Repudiation | Denying actions were performed | Logging and audit trails |
| Information Disclosure | Unauthorized data exposure | Access controls, encryption |
| Denial of Service | Exhausting system resources | Rate limiting, redundancy |
| Elevation of Privilege | Gaining unauthorized higher access | Least privilege, privilege monitoring |

#### PASTA Framework
Process for Attack Simulation and Threat Analysis — risk-centric approach.
- Aligns threat modeling to business objectives
- Simulates attacker perspective to identify likely attack paths

### Incident Response
Six-phase structured process for resolving security incidents — managed by CSIRT.
[[Assets/Images/Pasted image 20260308144331.png|Incident Classification]]

Incidents are rated by urgency and impact. Full detail in [[Incident Response Fundamentals]].

---
## Related Concepts
- [[Operating System Fundamentals]]
- [[Incident Response Fundamentals]]
- [[Defensive Security Intro]]

## Related Techniques
-

## Related Tools
-

---
## References / Images
- [[Assets/Images/Pasted image 20260308123326.png|Bell-La Padula Model]]
- [[Assets/Images/Pasted image 20260308143259.png|Biba Model]]
- [[Assets/Images/Pasted image 20260308144331.png|Incident Classification]]
- STRIDE threat modeling reference
- PASTA framework documentation
