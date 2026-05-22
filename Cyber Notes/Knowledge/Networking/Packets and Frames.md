Tags: #Status/Complete #Type/Knowledge #Context/Network #publish-me

---
## Overview
Packets and frames are the fundamental units of data transmission in networks. Packets operate at Layer 3 (Network) of the OSI model and carry IP addressing information for routing, while frames operate at Layer 2 (Data Link) and carry MAC addressing for local delivery. Protocols like TCP and UDP define how packets are constructed, transmitted, and acknowledged across networks.

---

## Terminology
| Term | Definition |
|------|------------|
| Packet | Layer 3 data unit; contains IP headers for routing across networks |
| Frame | Layer 2 data unit; contains MAC addressing for local network delivery |
| TTL (Time To Live) | Expiry counter on a packet; decremented at each hop; packet discarded at 0 |
| Checksum | Value used to verify the integrity of packet data |
| Sequence Number | TCP field used to track order of transmitted segments |
| Acknowledgement Number | TCP field confirming receipt of data up to a specific sequence number |
| SYN | TCP flag used to initiate a connection |
| ACK | TCP flag confirming receipt of data |
| FIN | TCP flag used for graceful connection termination |
| RST | TCP flag for abrupt connection reset |
| Datagram | UDP's term for a transmitted unit of data |

---
## Core Concepts

### Packet Structure
Every packet contains headers and a payload.

| Header Field | Purpose |
|-------------|---------|
| TTL (Time To Live) | Limits packet lifetime; prevents infinite routing loops |
| Checksum | Verifies data integrity during transit |
| Source Address | IP address of the sending device |
| Destination Address | IP address of the receiving device |

### TCP (Transmission Control Protocol)
Connection-oriented and stateful — guarantees reliable, ordered data delivery.

| Header Field | Purpose |
|-------------|---------|
| Source Port / Destination Port | Identifies sending and receiving application |
| Source IP / Destination IP | Identifies sending and receiving device |
| Sequence Number | Tracks order of segments |
| Acknowledgement Number | Confirms receipt of data |
| Checksum | Verifies segment integrity |
| Flags | Controls connection state (SYN, ACK, FIN, RST, DATA) |
| Data | The actual payload |

#### TCP 3-Way Handshake
[[Assets/Images/Pasted image 20250401184707.png|TCP 3-Way Handshake]]

Connection establishment:
1. Client sends **SYN** with Initial Sequence Number (ISN)
2. Server replies **SYN/ACK** with its own ISN
3. Client sends **ACK** with ISN + 1

Connection termination:
[[Assets/Images/Pasted image 20250401190449.png|Closing a TCP Connection]]

1. Initiating side sends **FIN**
2. Receiving side replies **FIN/ACK**
3. Initiating side sends final **ACK**

#### TCP Flags
| Flag | Purpose |
|------|---------|
| SYN | Initiate connection |
| SYN/ACK | Acknowledge and synchronize |
| ACK | Confirm receipt of data |
| FIN | Graceful connection termination |
| RST | Abrupt connection reset |
| DATA | Carries actual payload |

### UDP (User Datagram Protocol)
Connectionless and stateless — faster than TCP but with no delivery guarantee.

[[Assets/Images/Pasted image 20250401191017.png|UDP Datagram Structure]]

| Header Field | Purpose |
|-------------|---------|
| Source Port / Destination Port | Identifies sending and receiving application |
| Source Address / Destination Address | Identifies sending and receiving device |
| TTL | Limits datagram lifetime |
| Data | The actual payload |

- No handshake, no acknowledgements, no sequencing
- Suitable for applications tolerant to packet loss (e.g., video streaming, DNS, VoIP)

### TCP vs UDP
| Feature | TCP | UDP |
|---------|-----|-----|
| Connection | Connection-oriented | Connectionless |
| Reliability | Guaranteed delivery | No guarantee |
| Order | Sequenced | Not sequenced |
| Speed | Slower | Faster |
| Use Cases | Web, email, file transfer | Streaming, DNS, VoIP |

---
## Related Concepts
- [[OSI Model]]
- [[IP Addressing]]
- [[LAN Topologies]]
- [[Protocols]]
- [[Ports]]

## Related Techniques
- [[Packet Analysis]]
- [[Packet Sniffing]]

---
## References / Images
- [[Assets/Images/Pasted image 20250401184707.png|TCP 3-Way Handshake]]
- [[Assets/Images/Pasted image 20250401190449.png|Closing a TCP Connection]]
- [[Assets/Images/Pasted image 20250401191017.png|UDP Datagram Structure]]
- RFC 793 (TCP), RFC 768 (UDP)
- Networking textbooks and vendor documentation
