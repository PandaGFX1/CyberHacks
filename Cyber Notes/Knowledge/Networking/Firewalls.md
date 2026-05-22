Tags: #Status/In-Progress #Type/Knowledge #Context/Network #Context/Blueteam #publish-me

---
## Overview
Firewalls are network security devices or software that monitor and control incoming and outgoing network traffic based on predetermined security rules. They act as a barrier between trusted internal networks and untrusted external networks, preventing unauthorized access while allowing legitimate communications. Firewalls can be hardware-based, software-based, or cloud-hosted.

---

## Terminology
| Term | Definition |
|------|------------|
| Stateless Firewall | Filters packets independently based on rules; does not track connection state |
| Stateful Firewall | Tracks active connections in a state table; permits packets based on connection history |
| Proxy Firewall | Acts as intermediary between clients and servers; can filter content at the application layer |
| NGFW (Next-Generation Firewall) | Combines traditional firewall with application awareness, IPS, and deep packet inspection |
| DMZ (Demilitarized Zone) | Network segment exposed to untrusted networks but isolated from internal infrastructure |
| Ruleset / Policy | Set of security rules defining what traffic is allowed or blocked |
| NAT (Network Address Translation) | Translates private IP addresses to public ones; hides internal addressing |
| DPI (Deep Packet Inspection) | Examines packet payload content beyond headers to detect threats |
| IPS (Intrusion Prevention System) | Detects and actively prevents malicious network activity |
| WAF (Web Application Firewall) | Sits between web requests and the web server; protects against application-layer attacks |
| State Table | Record of active connections maintained by a stateful firewall |
| Netfilter | Core Linux kernel framework providing packet filtering, NAT, and connection tracking |

---
## Core Concepts

### Firewall Types
| Type | OSI Layer | Description |
|------|-----------|-------------|
| Stateless Firewall | Layer 3–4 | Filters packets on predefined rules only; no connection tracking; fast but limited |
| Stateful Firewall | Layer 3–4 | Tracks active connections; automatically permits subsequent packets on established sessions |
| Hardware Firewall | Perimeter | Dedicated appliance placed at the network perimeter |
| Software Firewall | Host | Installed on endpoints or servers; manages traffic locally |
| Cloud Firewall | Cloud | Hosted firewall service for SaaS and hybrid network environments |
| Proxy Firewall | Layer 7 | Acts as intermediary; inspects content; masks internal IPs |
| NGFW | Layer 3–7 | Deep packet inspection, IPS, heuristic analysis, SSL/TLS decryption, threat intelligence |

### Firewall Rules
Rules define which traffic is allowed or blocked. Each rule contains:

| Component | Description |
|-----------|-------------|
| Source Address | Origin of the traffic |
| Destination Address | Target system or network |
| Port | Network port number |
| Protocol | Communication protocol (TCP, UDP, ICMP, etc.) |
| Action | Allow, Deny, or Forward |
| Direction | Inbound, Outbound, or Forwarded |

| Action | Description |
|--------|-------------|
| Allow | Permit the traffic through |
| Deny | Block the traffic |
| Forward | Redirect traffic to another network segment |

### Advanced Features
- **Deep Packet Inspection (DPI)** — examines payload content for embedded threats
- **Intrusion Prevention System (IPS)** — detects and prevents malicious activity in real time
- **VPN Support** — allows secure remote access through encrypted tunnels
- **Logging and Alerts** — records firewall activity for auditing and security monitoring

### Network Placement
- Firewalls are placed at the **network perimeter** between internal and external networks
- A **DMZ** isolates public-facing services (e.g., web servers) from the internal network
- Defense-in-depth strategies layer multiple firewalls at different network segments

### Linux Firewalls
The Linux kernel uses the **Netfilter** framework as the foundation for all firewall utilities.

[[Assets/Images/Pasted image 20250416191913.png|Netfilter Hierarchy]]

- Provides packet filtering, NAT, and connection tracking
- All Linux firewall tools build on top of Netfilter

| Tool | Description |
|------|-------------|
| iptables | Widely used tool built on Netfilter; long-standing standard |
| nftables | Successor to iptables; enhanced filtering and NAT capabilities |
| firewalld | Built on Netfilter; provides predefined rules and network zones |
| ufw | Uncomplicated Firewall; simplifies rule creation by wrapping iptables |

---
## Related Concepts
- [[Networking Fundamentals]]
- [[Protocols]]
- [[Ports]]
- [[DNS (Domain Name System)]]
- [[OSI Model]]

## Related Techniques
-

## Related Tools
- [[iptables]]
- [[Uncomplicated Firewall (UFW)]]
- [[Windows Defender Firewall]]
- [[Snort]]

---
## References / Images
- [[Assets/Images/Pasted image 20250416191913.png|Netfilter Hierarchy]]
- Networking textbooks, vendor documentation, security best practices
- Official Linux firewall documentation (iptables, nftables, ufw man pages)
