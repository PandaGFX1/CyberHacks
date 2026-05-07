Tags: #Status/In-Progress #Type/Knowledge #Context/Network #publish-me

---
## Overview
The Open Systems Interconnection (OSI) Model provides a standardized 7-layer framework for network communication, defining how devices send, receive, and interpret data. It allows interoperability between different systems and technologies by assigning specific responsibilities to each layer.

---

## Terminology
| Term | Definition |
|------|------------|
| Encapsulation | Process of adding header/control information to data as it passes down the OSI layers before transmission |
| Decapsulation | Process of stripping header/control information from data as it passes up the OSI layers after receipt |
| Frame | Layer 2 unit of data; contains MAC addressing but no IP information |
| Packet | Layer 3 unit of data; contains IP addressing for routing |
| Segment | Layer 4 unit of data; contains port and reliability information |
| PDU (Protocol Data Unit) | Generic term for the data unit at each OSI layer |

---
## Core Concepts

### The 7 Layers
[[Assets/Images/Pasted image 20250402222722.png|OSI With Protocols]]
[[Assets/Images/Pasted image 20250402222805.png|OSI With TCP/IP Protocols]]

| Layer | Name | Data Unit | Responsibility | Example Protocols |
|-------|------|-----------|----------------|-------------------|
| 7 | Application | Data | User-facing protocols and interactions | HTTP, FTP, DNS, SMTP |
| 6 | Presentation | Data | Data translation, encryption, compression | SSL/TLS, JPEG, ASCII |
| 5 | Session | Data | Connection management, checkpoints, session uniqueness | NetBIOS, RPC |
| 4 | Transport | Segment | Reliable/unreliable transmission, flow control | TCP, UDP |
| 3 | Network | Packet | Routing, IP addressing, reassembly | IP, ICMP, OSPF, RIP |
| 2 | Data Link | Frame | Physical addressing via MAC, error detection | Ethernet, PPP |
| 1 | Physical | Bits | Electrical/optical signal transmission, hardware | Cables, switches, hubs |

### Layer Responsibilities In Detail

#### Layer 7 — Application
- Provides protocol rules for user-facing applications
- May include GUI interactions
- Examples: web browsers, email clients, FTP clients

#### Layer 6 — Presentation
- Standardizes data format between systems
- Handles encryption and decryption
- Handles compression for efficient transmission

#### Layer 5 — Session
- Opens, maintains, and closes communication sessions
- Implements checkpoints for data synchronization
- Ensures session uniqueness between communicating devices

#### Layer 4 — Transport
- **TCP** — connection-oriented; guarantees delivery and order
- **UDP** — connectionless; faster but no delivery guarantee
- Manages flow control and error recovery

#### Layer 3 — Network
- Routes packets between different networks
- Assigns and reads IP addresses
- Routers operate at this layer

#### Layer 2 — Data Link
- Handles physical addressing using MAC addresses
- Detects transmission errors
- Switches operate at this layer (also Layer 3 for managed switches)

#### Layer 1 — Physical
- Transmits raw bits over a physical medium
- Covers cables, connectors, voltage levels, and signal timing

### Encapsulation & Decapsulation
[[Assets/Images/Pasted image 20250402223549.png|Encapsulation Example]]

- **Encapsulation** — as data travels *down* the layers, each layer adds its own header (and sometimes trailer) before passing to the next
- **Decapsulation** — as data travels *up* the layers on the receiving end, each layer strips its header before passing upward
- Each layer only processes the information relevant to it

---
## Related Concepts
- [[IP Addressing]]
- [[LAN Topologies]]
- [[Networking Fundamentals]]
- [[Protocols]]

## Related Techniques
- [[Packet Analysis]]

---
## References / Images
- [[Assets/Images/Pasted image 20250402222722.png|OSI With Protocols]]
- [[Assets/Images/Pasted image 20250402222805.png|OSI With TCP/IP Protocols]]
- [[Assets/Images/Pasted image 20250402223549.png|Encapsulation Example]]
- RFC 1122
- Networking textbooks and vendor documentation
