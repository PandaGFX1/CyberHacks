Tags: #Status/In-Progress #Type/Knowledge #Context/Network #publish-me

---
## Overview
Virtual Private Networks (VPNs) provide secure, private communication over public networks by encrypting traffic between a client and a VPN server. VPNs enhance privacy, anonymity, and security — but only encrypt traffic between the client and server, not beyond it.

---

## Terminology
| Term | Definition |
|------|------------|
| VPN (Virtual Private Network) | Encrypted tunnel between a client and server over a public network |
| VPN Client | Software on the user's device that encrypts outgoing traffic |
| VPN Server | Receives encrypted traffic, decrypts it, and forwards to the destination |
| Tunneling | Encapsulating one protocol inside another for secure transmission |
| PPP (Point-to-Point Protocol) | Authentication and encryption foundation used by VPN technologies |
| PPTP (Point-to-Point Tunneling Protocol) | Encapsulates PPP packets for transmission over IP networks |
| IPSec (Internet Protocol Security) | Encrypts and authenticates data using the standard IP framework |
| Split Tunneling | VPN configuration where only some traffic routes through the VPN |

---
## Core Concepts

### How VPNs Work
[[Assets/Images/Pasted image 20250401194304.png|Basic VPN Layout]]
[[Assets/Images/Pasted image 20250403083830.png|VPN Traffic Flow]]

1. VPN client encrypts outgoing data on the user's device
2. Encrypted traffic travels over the public network to the VPN server
3. VPN server decrypts the traffic and forwards it to its destination
4. Return traffic is encrypted at the server and sent back to the client

> [!INFO]- Important Limitation
> Only traffic **between client and VPN server** is encrypted — traffic beyond the server is unencrypted

### Single Device VPN
[[Assets/Images/Pasted image 20250403084031.png|Single Device With VPN]]

- Protects a single device's traffic
- Common for personal privacy and secure browsing on public networks

### VPN Technologies
| Protocol | Description |
|----------|-------------|
| PPP | Authentication and encryption foundation; used by higher-level VPN protocols |
| PPTP | Encapsulates PPP packets for IP network transmission; older standard |
| IPSec | Encrypts data at the IP layer; widely used in enterprise and site-to-site VPNs |

### Common VPN Use Cases
- Remote work — secure access to internal company resources
- Public network protection — encrypts traffic on untrusted networks
- Network tunneling — connects remote sites securely
- Privacy — masks user IP and location from destination servers

---
## Related Concepts
- [[Protocols]]
- [[TLS & SSL]]
- [[Networking Fundamentals]]

## Related Techniques
-

---
## References / Images
- [[Assets/Images/Pasted image 20250401194304.png|Basic VPN Layout]]
- [[Assets/Images/Pasted image 20250403083830.png|VPN Traffic Flow]]
- [[Assets/Images/Pasted image 20250403084031.png|Single Device With VPN]]
- RFC 2637 (PPTP), RFC 4301 (IPSec)
- OpenVPN and WireGuard documentation
