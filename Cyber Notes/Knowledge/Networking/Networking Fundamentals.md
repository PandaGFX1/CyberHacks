Tags: #Status/In-Progress #Type/Knowledge #Context/Network #publish-me

---
## Overview
A network is a collection of interconnected devices (nodes) that communicate using links, with the purpose of sharing data, resources, and enabling collaboration. Networks range from a small home LAN to the Internet — the world's largest WAN. All network communication follows standardized rules (protocols) and models (OSI, TCP/IP) that allow diverse devices and vendors to interoperate.

---

## Terminology
| Term | Definition |
|------|------------|
| Node | Any device connected to a network (computer, printer, router, etc.) |
| Link | The physical or logical connection between nodes |
| LAN (Local Area Network) | Network confined to a small geographic area (home, office) |
| WAN (Wide Area Network) | Network spanning large geographic distances; the Internet is a WAN |
| MAN (Metropolitan Area Network) | Network spanning a city or metropolitan area |
| PAN (Personal Area Network) | Short-range personal device network (e.g., Bluetooth) |
| NIC (Network Interface Card) | Hardware that enables a device to connect to a network |
| Topology | The physical or logical layout of a network |
| Protocol | A set of rules governing how data is formatted, sent, and received |
| Internet | The global WAN connecting billions of devices via standardized protocols |

---
## Core Concepts

### Network Types
Networks are categorized by geographic scale and purpose.

| Type | Scope | Example |
|------|-------|---------|
| PAN | Personal devices, short range | Bluetooth headset to phone |
| LAN | Single building or campus | Home or office network |
| MAN | City or metropolitan area | City-wide fiber network |
| WAN | Country or global | The Internet |

### Network Components
A functional network requires several categories of hardware and software working together.

| Component | Role | Examples |
|-----------|------|---------|
| Endpoints | Send and receive data | Computers, phones, printers |
| Intermediary Devices | Route and direct traffic | Routers, switches, hubs |
| NICs | Hardware connecting a device to the network | Ethernet card, Wi-Fi adapter |
| Media | The physical path data travels | Cables, wireless signals |
| Servers | Respond to requests from clients | Web servers, file servers, DNS servers |
| Security Devices | Monitor and filter network traffic | Firewalls, IDS/IPS |
| Protocols | Define how data is formatted, sent, and received | TCP/IP, HTTP, DNS |

### Network Architectures
Different models define how devices in a network relate to each other.

| Architecture | Description | Example |
|--------------|-------------|---------|
| Peer-to-Peer (P2P) | All devices share resources equally; no central server | BitTorrent, small home networks |
| Client/Server | Clients request services from dedicated servers | Web browsing, corporate networks |
| Hybrid | Combines P2P and Client/Server elements | Modern enterprise networks |
| Cloud | Resources hosted and managed by a third-party provider | AWS, Azure, Google Cloud |
| SDN (Software-Defined Networking) | Network control is software-based and centralized | Data center automation |

### Communication Models
Standardized models describe and organize how network communication happens.
- **OSI Model** — 7-layer framework used for troubleshooting and guiding vendor development
- **TCP/IP Model** — 4-layer practical implementation model used on the Internet
- Both help vendors and developers build compatible devices and software

See [[OSI Model]] for full layer breakdown and encapsulation details.

### End-to-End Data Flow
A simplified walkthrough of how data flows when a user accesses a website:
1. **DHCP** — device joins the network and receives an IP address via the DORA process
2. **DNS** — user types a domain name; DNS resolves it to a server IP address
3. **Encapsulation** — data is wrapped in headers at each OSI/TCP-IP layer for transmission
4. **Local Transmission** — data travels across the LAN to the router
5. **NAT** — router translates the private IP to a public IP before sending to the internet
6. **Server Response** — server receives the request, processes it, and sends a response back
7. **Decapsulation** — headers are stripped at each layer; result is displayed to the user

---
## Related Concepts
- [[OSI Model]]
- [[Protocols]]
- [[LAN Topologies]]
- [[Data Transmission Methods]]
- [[Network Media & Connections]]
- [[IP Addressing]]
- [[DNS (Domain Name System)]]
- [[Subnetting]]

## Related Techniques
-

---
## References / Images
-
