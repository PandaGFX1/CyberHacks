Tags: #Status/In-Progress #Type/Knowledge #Context/Network #publish-me

---
## Overview
IP addressing defines how devices are identified and located on a network. IPv4 addresses are categorized into classes and split between private and public ranges. Supporting mechanisms — MAC addresses for physical delivery, ARP for local resolution, DHCP for automatic assignment, and NAT/PAT for internet connectivity — work together to ensure data reaches the correct destination across both local and global networks.

---

## Terminology
| Term | Definition |
|------|------------|
| Class A | Range 0–127; used for large enterprise networks and ISPs |
| Class B | Range 128–191; suitable for medium to large networks |
| Class C | Range 192–223; used in residential and small business networks |
| Class D | Range 224–239; reserved for multicast; not assignable to hosts |
| Class E | Range 240–255; reserved for experimental use |
| Private Address | IP address not routable on the public internet (e.g., 192.168.x.x) |
| Public Address | Globally unique IP assigned by ISPs; routable on the internet |
| Multicast | Communication method where data is sent to a group of destinations simultaneously |
| MAC Address | Physical hardware address burned into a NIC; 48-bit, written as XX:XX:XX:XX:XX:XX |
| ARP (Address Resolution Protocol) | Resolves IP addresses to MAC addresses on a local network |
| DHCP (Dynamic Host Configuration Protocol) | Automatically assigns IP addresses to devices on a network |
| NAT (Network Address Translation) | Translates private IP addresses to a public IP for internet communication |
| PAT (Port Address Translation) | A form of NAT that maps multiple private IPs to a single public IP using port numbers |

---
## Core Concepts

### IP Address Classes
| Class | Range | Use Case | Hosts per Network |
|-------|-------|----------|-------------------|
| A | 0–127 | Large enterprise networks, ISPs | Many |
| B | 128–191 | Medium to large networks | Moderate |
| C | 192–223 | Residential and small business | Few |
| D | 224–239 | Multicast communications | N/A |
| E | 240–255 | Experimental / research | N/A |

### Private vs Public Addresses
Private addresses are not routable on the public internet; used within local networks only.

| Class | Private Range |
|-------|--------------|
| A | 10.0.0.0 – 10.255.255.255 |
| B | 172.16.0.0 – 172.31.255.255 |
| C | 192.168.0.0 – 192.168.255.255 |

Public addresses are assigned by ISPs and are globally unique and routable.

### Address Allocation
- **Class A / B** — fewer networks but many hosts per network; suited for large organizations
- **Class C** — many networks with fewer hosts per network; suited for smaller deployments
- **Class D** — multicast only; not assigned to individual hosts
- **Class E** — rarely seen in real network traffic; reserved for research

---
### MAC Addresses
Every NIC has a burned-in physical address (MAC address) used for local network delivery.
- 48-bit address written as six pairs of hex digits: `AA:BB:CC:DD:EE:FF`
- First three pairs identify the manufacturer (OUI); last three identify the device
- Used at Layer 2 (Data Link) of the OSI model — operates only within a local network segment

### ARP (Address Resolution Protocol)
ARP resolves a known IP address to the corresponding MAC address so data can be delivered on the local network.
1. Device broadcasts: "Who has IP `192.168.1.1`?"
2. Device with that IP replies with its MAC address
3. Requesting device caches the result in its ARP table for future use
- ARP operates at Layer 2 and is limited to local network segments
- ARP spoofing is a common attack that poisons ARP tables to redirect traffic

### DHCP and the DORA Process
DHCP automatically assigns IP addresses to devices when they join a network, eliminating manual configuration.

| Step | Name | Description |
|------|------|-------------|
| 1 | Discover | Client broadcasts a request for an IP address |
| 2 | Offer | DHCP server responds with an available IP offer |
| 3 | Request | Client formally requests the offered IP |
| 4 | Acknowledge | Server confirms the assignment; client can now use the IP |

- The router/server records the lease, ensuring future traffic marked with that IP reaches the correct device
- Lease times are configurable; when expired, DORA repeats to renew or obtain a new address

### NAT and PAT
IPv4 provides approximately 4.3 billion addresses — insufficient for global demand. NAT allows many private addresses to share a single public IP.

| Type | Description |
|------|-------------|
| Static NAT | One private IP maps to one dedicated public IP |
| Dynamic NAT | Private IPs mapped to a pool of public IPs |
| PAT (Port Address Translation) | Many private IPs share one public IP, differentiated by port numbers |

- PAT is the most common form used in home and enterprise LANs
- NAT also provides a layer of security by hiding internal addressing from the internet
- Routers perform NAT at the boundary between the LAN and WAN

---
## Related Concepts
- [[Networking Fundamentals]]
- [[OSI Model]]
- [[LAN Topologies]]
- [[Subnetting]]
- [[IP Routing]]
- [[Packets and Frames]]

## Related Techniques
-

---
## References / Images
- RFC 791
- IP address class diagrams from networking textbooks
