Tags: #Status/Complete #Type/Knowledge #Context/Network #publish-me

---
## Overview
Subnetting divides a network into smaller, manageable segments, improving efficiency, security, and routing. Using a subnet mask, subnetting defines network boundaries and limits the number of hosts per subnet — making it essential for network segmentation, IP address organization, and routing design.

---

## Terminology
| Term | Definition |
|------|------------|
| Subnet Mask | 32-bit value separating the network and host portions of an IP address (e.g., `255.255.255.0`) |
| Network Address | Identifies the start of a subnet; not assignable to a host (e.g., `192.168.1.0`) |
| Host Address | Identifies an individual device within the subnet (e.g., `192.168.1.100`) |
| Default Gateway | Device that routes traffic outside the local subnet (e.g., `192.168.1.1`) |
| RFC 1918 | Standard defining private IP address ranges not routable on the public internet |
| CIDR | Classless Inter-Domain Routing; shorthand notation for subnet masks (e.g., `/24`) |

---
## Core Concepts

### Subnet Mask
- 32-bit value written as four bytes (e.g., `255.255.255.0`)
- Defines which bits belong to the **network** portion and which to the **host** portion
- Devices on the same subnet share the same network portion

### Subnet Components
| Component | Purpose | Example |
|-----------|---------|---------|
| Network Address | Identifies the subnet itself; not assignable to hosts | `192.168.1.0` |
| Host Addresses | Assignable to individual devices on the subnet | `192.168.1.1` – `192.168.1.253` |
| Default Gateway | Routes traffic destined for other networks | `192.168.1.254` or `192.168.1.1` |
| Broadcast Address | Sends data to all hosts on the subnet; not assignable | `192.168.1.255` |

### RFC 1918 Private IP Ranges
Private addresses are not routable on the public internet — used within local networks only.

| Class | Range | CIDR |
|-------|-------|------|
| A | 10.0.0.0 – 10.255.255.255 | 10.0.0.0/8 |
| B | 172.16.0.0 – 172.31.255.255 | 172.16.0.0/12 |
| C | 192.168.0.0 – 192.168.255.255 | 192.168.0.0/16 |

### Why Subnet?
- **Efficiency** — reduces unnecessary broadcast traffic
- **Security** — isolates network segments from each other
- **Routing** — enables more precise and efficient routing decisions
- **Management** — organizes devices into logical groups

---
## Related Concepts
- [[IP Addressing]]
- [[LAN Topologies]]
- [[OSI Model]]
- [[Protocols]]

## Related Techniques
-

---
## References / Images
- RFC 1918: Private IP Addressing Standards
- Subnet mask diagrams and CIDR notation examples
