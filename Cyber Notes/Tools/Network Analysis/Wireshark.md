Tags: #Status/In-Progress #Type/Tool #Context/Network #Context/Blueteam

---
## Overview
Wireshark is a GUI-based network packet capture and analysis tool. Provides deep inspection of hundreds of protocols, real-time capture, and PCAP file analysis. Widely used for network troubleshooting, protocol analysis, and forensics.

## Target / Context
Live network interfaces or saved PCAP files. Available on Linux and Windows. Pairs with TCPDump for headless capture then GUI analysis.

---
## Installation

> [!INFO]- Installation Commands:
> `sudo apt install wireshark`
> Or download from https://www.wireshark.org/download.html

---
## Basic Usage

> [!INFO]- Basic Usage:
> Open Wireshark, select an interface, and click the shark fin to start capture.
> To open a PCAP: File -> Open -> select file
> To save current capture: File -> Save (or select format from File menu)
> Start a capture with filters: Capture -> Options -> select interface -> add capture filter

---
## GUI Layout

Wireshark presents three panes during capture or file analysis:

| Pane | Location | Description |
|------|----------|-------------|
| Packet List | Top | One row per packet. Columns: Number, Time, Source, Destination, Protocol, Info. Columns are configurable. |
| Packet Details | Middle | Expandable tree showing each protocol layer in OSI order (lower-layer encapsulation at top). Click any field for details. |
| Packet Bytes | Bottom | Raw hex and ASCII of the selected packet. Non-printable bytes shown as `.`. Selecting a field in the Details pane highlights the corresponding bytes here. |

The status bar at the bottom-left shows the **Expert Analysis** indicator — yellow/red flags indicate errors, retransmissions, resets, and suspicious anomalies.

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Feature | Description |
> |---------|-------------|
> | Display Filters | Filter packets shown in the view without discarding captured data |
> | Capture Filters | Filter which packets are captured — BPF syntax, same as TCPDump |
> | Expert Analysis | Bottom-left status bar — shows warnings, errors, and anomalies |
> | Follow Stream | Right-click a packet -> Follow -> TCP/UDP/HTTP Stream |
> | Statistics | Protocol hierarchy, conversations, endpoints, I/O graphs |

---
## Capture Filters

Applied **before** capture starts using BPF syntax. Reduces data written to disk — irreversible; data not matching is never captured.
Access: Capture -> Capture Filters, or Capture -> Options -> filter field per interface.

> [!INFO]- Capture Filter Examples:
> | Filter | Result |
> |--------|--------|
> | `host x.x.x.x` | Capture only traffic involving a specific host (bi-directional) |
> | `net x.x.x.x/24` | Capture traffic to or from a specific subnet |
> | `src net x.x.x.x/24` | Capture traffic sourcing from a specific network only |
> | `dst net x.x.x.x/24` | Capture traffic destined to a specific network only |
> | `port 443` | Capture only traffic on port 443 |
> | `not port 22` | Capture everything except port 22 |
> | `port 80 and port 443` | Capture traffic matching both ports |
> | `portrange 0-1024` | Capture traffic on all well-known ports |
> | `ip` / `tcp` / `ether` | Capture only traffic of the specified protocol type |
> | `broadcast` / `multicast` / `unicast` | Capture by traffic delivery type |

---
## Display Filters

Applied **after** capture or while capture is running. All captured data is retained — display filters only affect what is shown. Green input field means the filter syntax is valid.
Access: filter bar at the top, or Bookmarks toolbar dropdown.

> [!INFO]- Display Filter Examples:
> | Filter | Result |
> |--------|--------|
> | `ip.addr == x.x.x.x` | Show all traffic involving an IP (OR match — src or dst) |
> | `ip.addr == x.x.x.x/24` | Show traffic involving any host in the subnet |
> | `ip.src == x.x.x.x` | Show only traffic from a specific source IP |
> | `ip.dst == x.x.x.x` | Show only traffic to a specific destination IP |
> | `tcp.port == 443` | Filter by TCP port |
> | `tcp.port != 22` | Exclude a specific port |
> | `dns` / `http` / `ftp` / `arp` | Show only the specified protocol |
> | `tcp.flags.syn == 1` | Show SYN packets |
> | `!(arp or dns or icmp)` | Exclude noise protocols |
> | `http.request.method == "GET"` | Show only HTTP GET requests |
> | `ftp.request.command` | Show FTP commands (credentials visible in clear text) |
> | `ftp-data` | Show FTP data transfers (reconstructable files) |
> | `rdp` | Show RDP traffic (requires TLS decryption to be meaningful) |
> | `tcp.stream eq 5` | Isolate a specific TCP conversation by stream number |
> | `and` / `or` / `not` | Combine filters with logical operators |

Note: filtering for `http` is not the same as filtering for `port 80` — Wireshark identifies HTTP by protocol markers (GET/POST), not port number alone.
Display filter processing can be slow on large captures. Consider breaking large PCAPs into smaller chunks.

---
## Common Use Cases

### Search Packet Contents

> [!INFO]- Steps:
> `CTRL+F` -> select "Packet Details" -> search for plaintext strings

### Follow a TCP Stream

> [!INFO]- Steps:
> Right-click any packet in a TCP conversation -> Follow -> TCP Stream
> Wireshark reassembles the full session into readable text (both directions shown in different colors).
> Works for any TCP-based protocol — HTTP, FTP, SMTP, etc.
> The display filter `tcp.stream eq <N>` is applied automatically to isolate that stream.
> Use to pull credentials, file contents, or full HTTP responses from a capture.

### Extract Files from a Capture

> [!INFO]- Steps:
> Requires the full conversation to be captured before extraction.
> File -> Export Objects -> select protocol format (HTTP, FTP-DATA, SMB, etc.)
> Wireshark lists all transferable objects found in the capture for selective export.

### Analyze FTP Traffic

> [!INFO]- Steps:
> FTP transmits credentials and data in cleartext.
> `ftp.request.command` — shows all FTP commands including USER and PASS
> `ftp-data` — shows data transfer payloads (raw bytes of transferred files)
> To reconstruct a transferred file: filter on `ftp-data`, right-click the data packet,
>   Follow -> TCP Stream -> Show and save data as: Raw -> save with original filename

### Decrypt RDP Traffic (with RSA Private Key)

> [!INFO]- Steps:
> If you have the RSA private key used by the RDP server, Wireshark can decrypt the session.
> 1. Filter on `tcp.port == 3389` to confirm traffic is present
> 2. Edit -> Preferences -> Protocols -> TLS -> RSA Keys list -> Edit ("+")
> 3. Enter: IP address of the RDP server, port 3389, protocol: `tpkt` (or leave blank)
> 4. Select the RSA private key file (.pem or .key)
> 5. Save and reapply — filter on `rdp` to view decrypted packets
> Note: This same process works for any TLS-encrypted protocol given the correct server key.

### Decrypt TLS Traffic (with Key Log File)

> [!INFO]- Steps:
> Right Click packet -> Protocol Preferences -> TLS -> Open TLS Preferences
> Browse under "(Pre)-Master-Secret log filename" and select the key log file.

### Filter by Protocol or Host

> [!INFO]- Commands:
> Display filter examples:
> `http` — show only HTTP traffic
> `tcp.port == 443` — filter by port
> `ip.addr == 10.10.10.1` — filter by IP
> `tcp.flags.syn == 1` — show SYN packets
> `!(arp or dns or icmp)` — exclude noise protocols

### Check for Anomalies

> [!INFO]- Steps:
> Use the Expert Analysis indicator in the bottom-left status bar.
> Yellow/red indicators highlight errors, retransmissions, and suspicious patterns.
> Statistics -> Protocol Hierarchy — view protocol breakdown across the entire capture
> Statistics -> Conversations — top talkers and per-protocol session breakdown
> Analyze tab — TCP stream following, filter preparation, expert info details

---
## TShark (CLI Interface)

TShark is the terminal-based counterpart to Wireshark. It shares Wireshark's protocol dissectors, display filter syntax, and capture formats but runs headless. Useful on servers without a desktop environment or when piping output to other tools.

> [!INFO]- TShark Flags:
> | Flag | Description |
> |------|-------------|
> | `-D` | List available capture interfaces and exit |
> | `-L` | List available link-layer mediums and exit |
> | `-i <iface>` | Select capture interface |
> | `-f <filter>` | Capture filter in BPF/libpcap syntax (applied during capture) |
> | `-Y <filter>` | Display filter (applied to output) |
> | `-r <file>` | Read from a PCAP file |
> | `-w <file>` | Write to file in pcapng format |
> | `-c <n>` | Stop after capturing N packets |
> | `-a <condition>` | Autostop condition: duration, filesize, or packet count |
> | `-P` | Print packet summary while writing to file |
> | `-x` | Add hex and ASCII output for each packet |
> | `-h` | Show help |

> [!INFO]- TShark Examples:
> `tshark -D`
> `tshark -i 1 -w /tmp/test.pcap`
> `sudo tshark -i eth0 -f "host 172.16.146.2"`
> `tshark -r capture.pcap -Y "http.request.method == GET"`

---
## Termshark (Terminal UI)

Termshark is a terminal-based UI (TUI) that replicates the Wireshark three-pane interface inside a terminal window. Uses the same capture filters and display filters as Wireshark. Accepts interfaces and filters at startup the same way as TShark.

> [!INFO]- Termshark Keyboard Shortcuts:
> | Key | Action |
> |-----|--------|
> | `/` | Open display filter / stream search |
> | `Tab` | Switch between panes |
> | `q` | Quit |
> | `Esc` | Activate menu |
> | `c` | Switch to copy mode |
> | `\|` | Cycle through pane layouts |
> | `\` | Toggle pane zoom |
> | `+` / `-` | Adjust horizontal split |
> | `<` / `>` | Adjust vertical split |
> | `:` | Activate command-line mode |
> | `z` | Maximize/restore modal dialog |
> | `?` | Display help |
> | `Shift + Left Mouse` | Copy |
> | `Shift + Right Mouse` | Paste |

Install: download a stable release binary from the Termshark GitHub releases page and extract — no build required.

---
## Related Concepts
- [[Network Traffic Analysis]]
- [[Packets and Frames]]
- [[Protocols]]
- [[TLS & SSL]]

## Related Techniques
- [[Packet Analysis]]
- [[Packet Sniffing]]

## Related Playbooks
-

---
## References / Images
- [[Assets/Images/Protocol Data Unit Breakdown In Wireshark.png]]
