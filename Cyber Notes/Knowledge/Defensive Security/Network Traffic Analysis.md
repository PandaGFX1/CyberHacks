#Status/In-Progress #Type/Knowledge #Context/Blueteam #Context/Network

---
## Overview
Network Traffic Analysis (NTA) is the process of capturing and examining network traffic to characterize port and protocol usage, establish behavioral baselines, detect anomalies, and respond to threats. It is a versatile discipline used in incident response, threat hunting, network troubleshooting, and forensics. Because NTA requires visibility into live traffic flows, placement and permissions are critical before any capture begins.

---

## Terminology
| Term | Definition |
|------|------------|
| NTA | Network Traffic Analysis — examining packet flows to detect anomalies, threats, or errors |
| PCAP | Packet Capture file format used to save raw network traffic for later analysis |
| BPF | Berkeley Packet Filter — common filtering syntax shared across capture tools (tcpdump, Wireshark, TShark) |
| Promiscuous Mode | NIC mode that allows capture of all traffic on a segment, not just traffic destined to the host |
| Baseline | A recorded snapshot of normal network behavior used to identify deviations |
| Mirrored Port / SPAN | Switch port configured to copy traffic from other ports for passive inspection |
| Network Tap | Hardware device that duplicates traffic from a cable for capture without altering the data flow |
| PDU | Protocol Data Unit — the unit of data at each OSI layer (frame, packet, segment, etc.) |

---

## Core Concepts

### Capture Modes
NTA can be performed passively or actively, each with different infrastructure requirements.

| Mode | Description | Requirements |
|------|-------------|--------------|
| Passive | Copy traffic without interaction; data flows normally | Mirrored port or SPAN, NIC in promiscuous mode, capture tool |
| Active (In-line) | Device sits in the traffic path as an invisible next-hop | Topology change, in-line device or host with multiple NICs, storage |

Both modes require explicit **permission** — capturing traffic can violate policy or law (e.g., HIPAA environments). Always confirm authorization before capturing.

### Placement
Sensor placement directly determines what traffic is visible:
- **Internet-facing ingress** — best position when the suspected threat originates from the internet; provides a full picture of inbound and outbound flows
- **Segment-level** — needed in switched environments where VLANs and switch ports do not forward traffic outside the broadcast domain; you must be on the relevant segment
- **Closest to the source** — always aim for the sensor position nearest the problem to reduce noise

### Why a Baseline Matters
Without a baseline, separating legitimate traffic from anomalous traffic is guesswork. With a baseline, known-good communications can be filtered out immediately, leaving only deviations for investigation. Baselines become critical when integrating NTA with IDS/IPS, firewalls, or SIEM tools like Splunk or the ELK Stack.

---

## Analysis Framework

NTA analysis follows four phases derived from data analysis practice:

| Phase | Description | Practical Goal |
|-------|-------------|----------------|
| Descriptive | Characterize the data set based on individual packet attributes | Define scope — what hosts, protocols, and time range are in scope? |
| Diagnostic | Identify causes, effects, and interactions between components | Filter out noise; isolate the relevant traffic flows |
| Predictive | Identify trends and deviations across the capture | Note patterns — is a host beaconing at regular intervals? |
| Prescriptive | Determine what action to take to eliminate or prevent the issue | Summarize findings and recommend a response |

### Diagnostic Phase — Filtering Approach
- Start with **standard protocols** (TCP, UDP) and clear out anything irrelevant before drilling down
- Most external attacks must traverse the internet boundary — start at the inbound link
- **Host-to-host traffic within a LAN** is often suspicious — end-user hosts rarely talk to each other directly
- Filter on protocol keywords rather than just ports: `ftp-data` or `http.request.method == "GET"` give more precise results than filtering on port numbers alone

### Key Components of Effective Analysis
- **Know your environment** — understand what normal looks like before looking for abnormal
- **Placement is key** — the closer to the source of the issue, the cleaner the data
- **Persistence** — issues are not always frequent or obvious; repeat captures across different time windows

---

## Common Analysis Patterns
- Regular check-ins from a host to an external IP at the same time each day — potential C2 beaconing
- A random high port bound once or twice on a host — potential backdoor or lateral movement
- Unusual user agent strings in HTTP traffic — potential automated tool or malware
- Host-to-host LAN traffic that bypasses normal infrastructure paths — potential lateral movement
- Large outbound data transfers to unfamiliar destinations — potential exfiltration

---

## NTA Toolset
| Tool | Type | Use Case |
|------|------|----------|
| [[TCPDump]] | CLI | Headless capture and filtering; scriptable; output to PCAP |
| [[Wireshark]] | GUI / CLI (TShark) | Deep packet inspection; protocol dissection; GUI-based analysis |
| NGrep | CLI | Pattern matching within packet payloads using regex |
| Elastic Stack / SIEM | Platform | Aggregate and correlate traffic logs at scale |
| Network Taps / SPAN | Hardware | Physical traffic mirroring for passive captures |

---

## Related Concepts
- [[Packets and Frames]]
- [[OSI Model]]
- [[Protocols]]
- [[Intrusion Detection Systems (IDS)]]
- [[Intro to SIEM]]

## Related Techniques
- [[Packet Analysis]]
- [[Packet Sniffing]]

---
## References / Images
- [[Assets/Images/Network Traffic Analysis Workflow.png]]
