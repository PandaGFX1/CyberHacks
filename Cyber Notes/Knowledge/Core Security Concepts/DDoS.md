Tags: #Status/In-Progress #Type/Knowledge #Context/Blueteam #publish-me

---
## Overview
A Distributed Denial of Service (DDoS) attack is a malicious attempt to disrupt the normal operation of a website, server, or online service by overwhelming it with a flood of traffic from multiple sources simultaneously. Unlike a standard DoS attack from a single source, DDoS attacks use networks of compromised devices to amplify the attack to a scale that is difficult to block or absorb.

---

## Terminology
| Term | Definition |
|------|------------|
| DoS (Denial of Service) | Attack from a single source that floods a target to disrupt service |
| DDoS (Distributed Denial of Service) | Coordinated denial of service attack launched from multiple sources simultaneously |
| Botnet | A network of compromised devices controlled by an attacker and used to conduct the attack |
| C2 (Command and Control) | Attacker infrastructure used to direct botnet traffic |
| Amplification Attack | Exploits misconfigured servers to multiply attack traffic volume beyond what the attacker generates |
| Smokescreen Attack | A DDoS used to distract defenders while a simultaneous intrusion attempt occurs |

---
## Core Concepts

### DoS vs DDoS

| Type | Source | Characteristics |
|------|--------|-----------------|
| DoS | Single attacker or system | Limited by single source bandwidth; easier to block by IP |
| DDoS | Many compromised devices (botnet) | Massively scalable; distributed sources are difficult to block |

### Botnet Composition
Botnets used for DDoS can include any internet-connected device the attacker has compromised:
- Personal computers
- Servers
- IoT devices (cameras, routers, smart appliances)

Device owners are typically unaware their system is participating in an attack.

### Impact

| Impact Area | Description |
|-------------|-------------|
| Availability | End users lose access to services during the attack |
| Financial | Revenue loss during outage plus cost of mitigation |
| Reputational | Customer and partner trust damaged by service failure |
| Operational | Staff and systems diverted to incident response |
| Smokescreen | DDoS can mask a simultaneous intrusion attempt against the same target |

---
## Related Concepts
- [[Security Principles]]
- [[Threat Actors]]
- [[Incident Response Fundamentals]]

## Related Techniques
-

---
## References / Images
-
