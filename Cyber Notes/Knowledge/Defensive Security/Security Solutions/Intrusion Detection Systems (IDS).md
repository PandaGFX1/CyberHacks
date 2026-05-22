Tags: #Status/Complete #Type/Knowledge #Context/Blueteam #publish-me

---
## Overview
An Intrusion Detection System (IDS) monitors network traffic and host activity to detect malicious or suspicious behavior. Operating similarly to a security camera, an IDS generates alerts based on signature-based and anomaly-based detection — but does not actively block traffic. Example: an attacker bypassing a firewall through a legitimate-looking connection would still be flagged by an IDS.

---

## Terminology
| Term | Definition |
|------|------------|
| IDS | Intrusion Detection System; monitors and alerts on suspicious activity |
| HIDS | Host Intrusion Detection System; installed on individual hosts |
| NIDS | Network Intrusion Detection System; monitors traffic across the entire network |
| Signature | Known pattern of malicious activity used to identify threats |
| Anomaly | Deviation from established baseline behavior flagged as a potential threat |
| Baseline | Profile of normal network or system behavior used for anomaly detection |
| False Positive | Alert triggered by legitimate activity incorrectly flagged as malicious |
| Zero-Day | Previously unknown vulnerability or attack with no existing signature |

---
## Core Concepts

### Deployment Modes
[[Assets/Images/Pasted image 20250417063447.png|NIDS vs HIDS]]

| Type | Scope | Advantages | Limitations |
|------|-------|------------|-------------|
| HIDS | Individual host | Detailed host-level visibility | Resource-intensive; hard to scale |
| NIDS | Entire network | Centralized network-wide detection | Less visibility into individual host activity |

### Detection Methods

#### Signature-Based Detection
- Matches traffic against a database of known attack patterns
- Fast and accurate for known threats
- Cannot detect zero-day attacks without an existing signature
- Ideal for environments with smaller, well-defined threat surfaces

#### Anomaly-Based Detection
- Establishes a baseline of normal behavior
- Flags deviations from baseline as potential threats
- Can detect zero-day attacks and novel techniques
- May produce false positives — requires fine-tuning to reduce noise

#### Hybrid Detection
- Combines signature and anomaly-based detection
- Uses signatures for known threats; anomaly analysis for unknown threats
- Provides broader coverage with reduced blind spots

### IDS vs Firewall
Both are defensive tools but serve different functions:
- **Firewall** — actively blocks or allows traffic based on rules
- **IDS** — passively monitors and alerts but does not block traffic

See [[Firewalls]] for firewall detail.

---
## Related Concepts
- [[Intro to SIEM]]
- [[Firewalls]]
- [[SOC Fundamentals]]
- [[Defensive Security Intro]]

## Related Techniques
-

## Related Tools
- [[Snort]]
---
## References / Images
- [[Assets/Images/Pasted image 20250417063447.png|NIDS vs HIDS]]
- Snort IDS documentation
