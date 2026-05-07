Tags: #Status/Complete #Type/Knowledge #Context/Network #publish-me

---
## Overview
Ports are numerical identifiers used to route network traffic to specific processes or services on a device. They allow multiple applications to share a single IP address while keeping communications separated. Ranging from 0 to 65535, ports are divided into well-known, registered, and dynamic ranges — and are critical for network communication, service identification, and firewall configuration.

---

## Terminology
| Term | Definition |
|------|------------|
| Well-Known Ports | Ports 0–1023; reserved for core system services and protocols |
| Registered Ports | Ports 1024–49151; assigned to user-level or proprietary services |
| Dynamic / Private Ports | Ports 49152–65535; temporary ports used for client-side connections |
| Port Binding | A service listening on a specific port for incoming connections |
| TCP Port | Port used for reliable, connection-oriented communication |
| UDP Port | Port used for connectionless, low-latency communication |

---
## Core Concepts

### Port Ranges
| Range | Type | Use |
|-------|------|-----|
| 0–1023 | Well-Known | System and standard services |
| 1024–49151 | Registered | Applications and user services |
| 49152–65535 | Dynamic / Private | Temporary client-side connections |

### Common Ports Reference
| Port | Protocol | Service |
|------|----------|---------|
| 21 | TCP | FTP (File Transfer Protocol) |
| 22 | TCP | SSH / SFTP (Secure Shell / Secure File Transfer) |
| 23 | TCP | Telnet |
| 25 | TCP | SMTP (Simple Mail Transfer Protocol) |
| 53 | TCP/UDP | DNS (Domain Name System) |
| 80 | TCP | HTTP (HyperText Transfer Protocol) |
| 110 | TCP | POP3 (Post Office Protocol v3) |
| 143 | TCP | IMAP (Internet Message Access Protocol) |
| 443 | TCP | HTTPS (HTTP Secure) |
| 445 | TCP | SMB (Server Message Block) |
| 465/587 | TCP | SMTPS (SMTP Secure) |
| 990 | TCP | FTPS (FTP Secure) |
| 993 | TCP | IMAPS (IMAP Secure) |
| 995 | TCP | POP3S (POP3 Secure) |
| 3389 | TCP | RDP (Remote Desktop Protocol) |

### Protocol Associations
- **TCP ports** — reliable, connection-oriented; used for web, email, file transfer
- **UDP ports** — low-latency, connectionless; used for DNS, VoIP, and streaming

### Port Utilities
- Firewalls use ports to allow or block traffic at the service level
- Network monitoring tools track port activity for security and performance
- Services bind to specific ports to listen for incoming connections
- Port scanning reveals open services on a target system

---
## Related Concepts
- [[OSI Model]]
- [[Packets and Frames]]
- [[DNS (Domain Name System)]]
- [[Firewalls]]
- [[Protocols]]

## Related Techniques
- [[Port Scanning]]
- [[Service Enumeration]]

---
## References / Images
- RFC documentation for individual protocols
- Networking textbooks and vendor documentation
