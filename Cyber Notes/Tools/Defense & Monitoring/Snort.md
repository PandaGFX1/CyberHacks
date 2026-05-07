Tags: #Status/In-Progress #Type/Tool #Context/Linux #Context/Blueteam

---
## Overview
Snort is one of the most widely used open-source Intrusion Detection System (IDS) solutions, developed in 1998. It uses both signature-based and anomaly-based detection defined in rule files. Snort ships with built-in rule files covering a variety of known attack patterns and supports custom rules for traffic not covered by defaults.

---
## Target / Context
Network traffic monitoring and intrusion detection on Linux systems. Can monitor traffic for a single host or an entire network (requires promiscuous mode). Operates as a packet sniffer, packet logger, or full NIDS.

---
## Installation

> [!INFO]- Installation Commands:
> `sudo apt install snort`
> During installation you must provide the network interface and IP range.
> To monitor an entire network, enable promiscuous mode on the host's network interface.

---
## Basic Usage

> [!INFO]- Basic Usage:
> `sudo snort -q -l /var/log/snort -i lo -A console -c /etc/snort/snort.conf`

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-q` | Quiet mode; suppresses banner and init info | `sudo snort -q` |
> | `-l` | Sets the output logging directory | `-l /var/log/snort` |
> | `-i` | Network interface to monitor | `-i eth0` |
> | `-A` | Alert mode | `-A console` |
> | `-c` | Config file to use | `-c /etc/snort/snort.conf` |
> | `-r` | Read and analyze a PCAP file instead of live traffic | `-r Task.pcap` |

---
## Common Use Cases

### Packet Sniffer Mode
Reads and displays network packets without performing analysis. Useful for network monitoring and troubleshooting.

> [!INFO]- Commands:
> `sudo snort -v -i eth0`

### Packet Logging Mode
Performs detection on live network traffic in real-time, displays alerts on console, and logs traffic as PCAP.

> [!INFO]- Commands:
> `sudo snort -q -l /var/log/snort -i eth0 -A console -c /etc/snort/snort.conf`

### NIDS Mode
Primary mode — monitors network traffic in real-time and applies rule files to identify known attack patterns.

> [!INFO]- Commands:
> `sudo snort -q -l /var/log/snort -i eth0 -A console -c /etc/snort/snort.conf`

### PCAP File Detection
Analyze a previously captured PCAP file against Snort rules instead of live traffic.

> [!INFO]- Commands:
> `sudo snort -q -l /var/log/snort -r Task.pcap -A console -c /etc/snort/snort.conf`

### Writing a Custom Rule
Open `local.rules` and add custom detection logic.

> [!INFO]- Commands:
> `sudo nano /etc/snort/rules/local.rules`
> `alert icmp any any -> 127.0.0.1 any (msg:"Loopback Ping Detected"; sid:10003; rev:1;)`

---
## Rule Format
[[Assets/Images/Pasted image 20250417065401.png|ICMP Rule Example]]

| Component | Description |
|-----------|-------------|
| Action | What to do when rule triggers (alert, log, drop) |
| Protocol | Protocol to match (tcp, udp, icmp, ip) |
| Source IP | Where traffic originates; use `any` for all |
| Source Port | Port traffic originates from |
| Destination IP | Where traffic is going; use `$HOME_NET` for local network |
| Destination Port | Port traffic is destined for |
| `msg` | Message displayed when rule triggers |
| `sid` | Unique rule identifier |
| `rev` | Revision number; increment on each rule change |

**Example rule:**
`alert icmp any any -> 127.0.0.1 any (msg:"Loopback Ping Detected"; sid:10003; rev:1;)`

## File Locations
| Path | Purpose |
|------|---------|
| `/etc/snort/` | Snort root directory |
| `/etc/snort/snort.conf` | Main configuration file |
| `/etc/snort/rules/` | Rule files directory |
| `/etc/snort/rules/local.rules` | Custom user-defined rules |

---
## Related Concepts
- [[Intrusion Detection Systems (IDS)]]
- [[Log Fundamentals]]

## Related Techniques
-

## Related Playbooks
-

---
## References / Images
- [[Assets/Images/Pasted image 20250417065401.png|ICMP Rule Example]]
