Tags: #Status/In-Progress #Type/Tool #Context/Network #Context/Linux #Context/Blueteam

---
## Overview
TCPDump is a command-line packet capture and analysis tool. Captures live network traffic from an interface or reads from saved PCAP files. Filters allow precise capture of specific protocols, hosts, ports, and TCP flags. Core tool for network analysis, traffic inspection, and incident response.

## Target / Context
Any network interface on a Linux system. Run with `sudo` for full interface access. Output can be saved to PCAP for analysis in Wireshark.

---
## Installation

> [!INFO]- Installation Commands:
> `sudo apt install tcpdump`
> Man pages: `man tcpdump` and `man pcap-filter`

---
## Basic Usage

> [!INFO]- Basic Usage:
> `sudo tcpdump [options] [filter expression]`
> `sudo tcpdump -i any`
> `sudo tcpdump -i eth0 -w capture.pcap`

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-i` | Specify network interface | `-i eth0` / `-i any` |
> | `-D` | List all available capture interfaces and exit | `-D` |
> | `-w` | Save captured packets to file | `-w capture.pcap` |
> | `-r` | Read packets from a saved file | `-r capture.pcap` |
> | `-c` | Stop after capturing N packets | `-c 100` |
> | `-n` | Do not resolve IP addresses | `-n` |
> | `-nn` | Do not resolve IPs or ports | `-nn` |
> | `-v / -vv / -vvv` | Increase verbosity | `-vv` |
> | `-q` | Quiet mode — brief packet output | `-q` |
> | `-e` | Include link-level header (MAC addresses) | `-e` |
> | `-A` | Print packet data in ASCII only (no hex) | `-A` |
> | `-X` | Print packet headers and data in hex and ASCII | `-X` |
> | `-XX` | Same as `-X` but also includes the ethernet frame header | `-XX` |
> | `-S` | Display absolute sequence numbers instead of relative | `-S` |
> | `-l` | Line-buffered output — enables piping to grep and other tools | `-l` |
> | `-s` | Snap length — how many bytes of each packet to capture | `-s 0` (full packet) |

---
## Common Use Cases

### List Interfaces

> [!INFO]- Commands:
> `sudo tcpdump -D`

### Capture All Traffic on Any Interface

> [!INFO]- Commands:
> `sudo tcpdump -i any`
> `sudo tcpdump -i eth0 -nn`
> `sudo tcpdump -i eth0 -nnvXX`    # Best practice: no name resolution, verbose, full frame in hex+ASCII

### Save and Read PCAP Files

> [!INFO]- Commands:
> `sudo tcpdump -i eth0 -w capture.pcap`
> `tcpdump -r capture.pcap`
> `tcpdump -r capture.pcap -nn`

### Filter by Host and Port

> [!INFO]- Commands:
> `sudo tcpdump host 10.10.10.1`
> `sudo tcpdump src host 10.10.10.1`
> `sudo tcpdump dst host 10.10.10.1`
> `sudo tcpdump port 80`
> `sudo tcpdump src port 443`
> `sudo tcpdump host 10.10.10.1 and port 22`
> `sudo tcpdump host 10.10.10.1 or host 10.10.10.2`
> `sudo tcpdump not port 443`

### Filter by Protocol

> [!INFO]- Commands:
> `sudo tcpdump tcp`
> `sudo tcpdump udp`
> `sudo tcpdump icmp`
> `sudo tcpdump arp`

### Filter by TCP Flags

> [!INFO]- Commands:
> `sudo tcpdump "tcp[tcpflags] == tcp-syn"`
> `sudo tcpdump "tcp[tcpflags] & tcp-syn != 0"`
> `sudo tcpdump "tcp[tcpflags] & (tcp-syn|tcp-ack) != 0"`

### Filter by Packet Length

> [!INFO]- Commands:
> `sudo tcpdump greater 1000`
> `sudo tcpdump less 64`

### Pipe Output to Other Tools

> [!INFO]- Commands:
> `-l` enables line-buffered mode so output can be piped in real time:
> `sudo tcpdump -i eth0 -l | grep "password"`
> `sudo tcpdump -i eth0 -l -nn | grep "192.168.1."`

### Inspect TCP Flags at Byte Level

> [!INFO]- Commands:
> BPF allows direct byte inspection of packet headers using `proto[offset:size]` syntax.
> The 13th byte (offset 13) of a TCP header contains the flags field:
> `sudo tcpdump -i eth0 'tcp[13] & 2 != 0'`    # SYN flag set (bit 1)
> `sudo tcpdump -i eth0 'tcp[13] & 16 != 0'`   # ACK flag set (bit 4)
> `sudo tcpdump -i eth0 'tcp[13] & 1 != 0'`    # FIN flag set (bit 0)
> This is equivalent to using the named flag filters but gives direct byte-level control.

---
## Output Format Reference

When verbose output is enabled, each packet line contains these fields:

![[Assets/Images/TCPDump Shell Breakdown.png|TCPDump Output Breakdown]]

| Field | Description |
|-------|-------------|
| Timestamp | Time the packet arrived; configurable format |
| Protocol | Upper-layer protocol identified (e.g., IP, TCP) |
| Source & Destination IP.Port | Format: `IP.port` — e.g., `172.16.146.2.21` |
| Flags | TCP flags present in the packet |
| Sequence and Acknowledgement Numbers | Relative by default; use `-S` for absolute numbers |
| Protocol Options | Negotiated TCP values: window size, SACK, scale factors |
| Notes / Next Header | Miscellaneous dissector notes; encapsulated protocol details |

Verbosity level controls how much of this is shown — higher verbosity reveals more header fields.

---
## Filter Syntax Reference

> [!INFO]- Filter Syntax:
> | Syntax | Description | Example |
> |--------|-------------|---------|
> | `host HOSTNAME` | Match source or destination host | `host 10.10.10.1` |
> | `src host HOSTNAME` | Match source host only | `src host 10.10.10.1` |
> | `dst host HOSTNAME` | Match destination host only | `dst host 10.10.10.1` |
> | `port PORT` | Match source or destination port | `port 443` |
> | `src/dst port PORT` | Match source or destination port | `src port 22` |
> | `proto[expr:size]` | Inspect specific byte(s) in header | `ip[9:1] == 6` (TCP) |
> | `greater / less LENGTH` | Filter by packet length | `greater 1000` |
> | `and, or, not` | Logical operators for combining filters | `host x and port 80` |

---
## Capture Timing — When to Apply Filters

Filters can be applied at capture time or post-capture when reading a PCAP file:

| When | Tradeoff |
|------|----------|
| During capture | Reduces file size and speeds up writes; risk losing data if scope is wrong |
| Post-capture on PCAP | Preserves everything; safer when unsure what to look for; can be slow on large files |

---
## Related Concepts
- [[Network Traffic Analysis]]
- [[Packets and Frames]]
- [[Protocols]]
- [[Ports]]

## Related Techniques
- [[Packet Sniffing]]
- [[Packet Analysis]]

## Related Playbooks
-

---
## References / Images
- BPF Filter Reference (Miro): https://miro.com/app/board/o9J_klSqCSY=/
