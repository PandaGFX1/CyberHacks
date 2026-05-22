Tags: #Status/Complete #Type/Knowledge #Context/Network #publish-me

---
## Overview
Network protocols define the rules and conventions for communication between devices on a network. They ensure reliable delivery, proper addressing, and standardized interactions across diverse systems. Protocols operate at different layers of the OSI model and can be connection-oriented (TCP) or connectionless (UDP).

---

## Terminology
| Term | Definition |
|------|------------|
| Protocol | A set of rules governing how devices communicate on a network |
| Connection-Oriented | Communication that establishes a session before data transfer (e.g., TCP) |
| Connectionless | Communication that sends data without establishing a session (e.g., UDP) |
| ARP Cache | Local table mapping IP addresses to MAC addresses for quick lookup |
| DORA | DHCP process: Discover → Offer → Request → Acknowledge |
| TLS/SSL | Encryption layer added to HTTP to create HTTPS |
| Autonomous System | A network or group of networks under a single administrative domain (used in BGP) |

---
## Core Concepts

### Transport Protocols
Full detail covered in [[Packets and Frames]].

| Protocol | Type | Use |
|----------|------|-----|
| TCP (Transmission Control Protocol) | Connection-oriented | Reliable, ordered delivery; uses 3-way handshake |
| UDP (User Datagram Protocol) | Connectionless | Fast, minimal overhead; suitable for streaming and gaming |

### Addressing Protocols

#### ARP (Address Resolution Protocol)
Maps IP addresses to MAC addresses on a local network.

[[Assets/Images/Pasted image 20250401160028.png|ARP Process]]

- Maintains an **ARP cache** for quick lookups
- **ARP Request** — broadcast asking for the MAC address of a given IP
- **ARP Reply** — unicast response providing the MAC address

#### DHCP (Dynamic Host Configuration Protocol)
Automatically assigns IP addresses and network configuration to devices.

[[Assets/Images/Pasted image 20250401160321.png|DHCP DORA]]

| Step | Name | Description |
|------|------|-------------|
| 1 | Discover | Client broadcasts to find a DHCP server |
| 2 | Offer | Server offers an available IP address |
| 3 | Request | Client requests the offered IP |
| 4 | Acknowledge | Server confirms the assignment |

#### ICMP (Internet Control Message Protocol)
Used for network diagnostics and error reporting.
- `ping` — tests connectivity and round-trip time
- `traceroute` — maps the path packets take across networks

### Application Protocols

#### Web
Full detail covered in [[HTTP & HTTPS]].

| Protocol | Port | Description |
|----------|------|-------------|
| HTTP | 80 | Web communication |
| HTTPS | 443 | Encrypted web communication via TLS/SSL |

[[Assets/Images/Pasted image 20250403083220.png|TLS Negotiation]]

#### DNS
Full detail covered in [[DNS (Domain Name System)]].

Translates human-readable domain names to IP addresses.

#### File Transfer
| Protocol | Port | Description |
|----------|------|-------------|
| FTP | 21 | Client-server file transfer; commands: `USER` `PASS` `RETR` `STOR` `LIST` |
| FTPS | 990 | FTP over TLS |
| SFTP | 22 | FTP tunneled over SSH |

#### Remote Access
| Protocol | Port | Description |
|----------|------|-------------|
| SSH | 22 | Secure encrypted remote terminal access |
| RDP | 3389 | Secure graphical remote desktop access |
| Telnet | 23 | Insecure plaintext remote terminal; see [[Linux Fundamentals]] |

#### File & Device Sharing
| Protocol | Port | Description |
|----------|------|-------------|
| SMB | 445 | File and printer sharing across networks |

#### Email Protocols
| Protocol | Port | Role | Key Commands |
|----------|------|------|--------------|
| SMTP | 25/465/587 | Sending email | `HELO/EHLO` `MAIL FROM` `DATA` `.` |
| POP3 | 110/995 | Retrieving email (downloads and removes from server) | `USER` `PASS` `STAT` `LIST` `RETR` `DELE` `QUIT` |
| IMAP | 143/993 | Syncing email (keeps mail on server) | `LOGIN` `SELECT` `FETCH` `MOVE` `COPY` `LOGOUT` |

### Routing Protocols
Determine paths for data across networks by exchanging topology and reachability information.

| Protocol | Description |
|----------|-------------|
| OSPF (Open Shortest Path First) | Shares full network topology; computes shortest paths |
| RIP (Routing Information Protocol) | Simple hop-count-based routing; max 15 hops |
| EIGRP (Enhanced Interior Gateway Routing Protocol) | Cisco proprietary; shares reachability and cost metrics |
| BGP (Border Gateway Protocol) | Internet-wide routing between autonomous systems |

---
## Related Concepts
- [[OSI Model]]
- [[Packets and Frames]]
- [[Ports]]
- [[IP Addressing]]
- [[LAN Topologies]]
- [[DNS (Domain Name System)]]
- [[HTTP & HTTPS]]

## Related Techniques
- [[Packet Analysis]]
- [[Packet Sniffing]]

---
## References / Images
- [[Assets/Images/Pasted image 20250401160028.png|ARP Process]]
- [[Assets/Images/Pasted image 20250401160321.png|DHCP DORA]]
- [[Assets/Images/Pasted image 20250403083220.png|TLS Negotiation]]
- Networking textbooks, RFCs, and vendor documentation
