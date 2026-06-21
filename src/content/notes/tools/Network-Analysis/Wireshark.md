---
title: "Wireshark"
category: "tools"
tags: []
excerpt: "Wireshark is a GUI-based network packet capture and analysis tool. Provides deep inspection of hundreds of protocols,..."
date: "2026-04-15"
---

---
## Overview
Wireshark is a GUI-based network packet capture and analysis tool. Provides deep inspection of hundreds of protocols, real-time capture, and PCAP file analysis. Widely used for network troubleshooting, protocol analysis, and forensics.

## Target / Context
Live network interfaces or saved PCAP files. Available on Linux and Windows. Pairs with TCPDump for headless capture then GUI analysis.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo apt install wireshark</code></li>
</ul>
Or download from https://www.wireshark.org/download.html

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

Open Wireshark, select an interface, and click the shark fin to start capture.
To open a PCAP: File -> Open -> select file
To save current capture: File -> Save (or select format from File menu)
Start a capture with filters: Capture -> Options -> select interface -> add capture filter

</div>
</details>

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

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Flags & Options:</span></summary>
<div class="callout-body">

| Feature | Description |
|---------|-------------|
| Display Filters | Filter packets shown in the view without discarding captured data |
| Capture Filters | Filter which packets are captured — BPF syntax, same as TCPDump |
| Expert Analysis | Bottom-left status bar — shows warnings, errors, and anomalies |
| Follow Stream | Right-click a packet -> Follow -> TCP/UDP/HTTP Stream |
| Statistics | Protocol hierarchy, conversations, endpoints, I/O graphs |

</div>
</details>

---
## Capture Filters

Applied **before** capture starts using BPF syntax. Reduces data written to disk — irreversible; data not matching is never captured.
Access: Capture -> Capture Filters, or Capture -> Options -> filter field per interface.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Capture Filter Examples:</span></summary>
<div class="callout-body">

| Filter | Result |
|--------|--------|
| <code>host x.x.x.x</code> | Capture only traffic involving a specific host (bi-directional) |
| <code>net x.x.x.x/24</code> | Capture traffic to or from a specific subnet |
| <code>src net x.x.x.x/24</code> | Capture traffic sourcing from a specific network only |
| <code>dst net x.x.x.x/24</code> | Capture traffic destined to a specific network only |
| <code>port 443</code> | Capture only traffic on port 443 |
| <code>not port 22</code> | Capture everything except port 22 |
| <code>port 80 and port 443</code> | Capture traffic matching both ports |
| <code>portrange 0-1024</code> | Capture traffic on all well-known ports |
| <code>ip</code> / <code>tcp</code> / <code>ether</code> | Capture only traffic of the specified protocol type |
| <code>broadcast</code> / <code>multicast</code> / <code>unicast</code> | Capture by traffic delivery type |

</div>
</details>

---
## Display Filters

Applied **after** capture or while capture is running. All captured data is retained — display filters only affect what is shown. Green input field means the filter syntax is valid.
Access: filter bar at the top, or Bookmarks toolbar dropdown.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Display Filter Examples:</span></summary>
<div class="callout-body">

| Filter | Result |
|--------|--------|
| <code>ip.addr == x.x.x.x</code> | Show all traffic involving an IP (OR match — src or dst) |
| <code>ip.addr == x.x.x.x/24</code> | Show traffic involving any host in the subnet |
| <code>ip.src == x.x.x.x</code> | Show only traffic from a specific source IP |
| <code>ip.dst == x.x.x.x</code> | Show only traffic to a specific destination IP |
| <code>tcp.port == 443</code> | Filter by TCP port |
| <code>tcp.port != 22</code> | Exclude a specific port |
| <code>dns</code> / <code>http</code> / <code>ftp</code> / <code>arp</code> | Show only the specified protocol |
| <code>tcp.flags.syn == 1</code> | Show SYN packets |
| <code>!(arp or dns or icmp)</code> | Exclude noise protocols |
| <code>http.request.method == "GET"</code> | Show only HTTP GET requests |
| <code>ftp.request.command</code> | Show FTP commands (credentials visible in clear text) |
| <code>ftp-data</code> | Show FTP data transfers (reconstructable files) |
| <code>rdp</code> | Show RDP traffic (requires TLS decryption to be meaningful) |
| <code>tcp.stream eq 5</code> | Isolate a specific TCP conversation by stream number |
| <code>and</code> / <code>or</code> / <code>not</code> | Combine filters with logical operators |

</div>
</details>

Note: filtering for `http` is not the same as filtering for `port 80` — Wireshark identifies HTTP by protocol markers (GET/POST), not port number alone.
Display filter processing can be slow on large captures. Consider breaking large PCAPs into smaller chunks.

---
## Common Use Cases

### Search Packet Contents

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Steps:</span></summary>
<div class="callout-body">

<code>CTRL+F</code> -> select "Packet Details" -> search for plaintext strings

</div>
</details>

### Follow a TCP Stream

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Steps:</span></summary>
<div class="callout-body">

Right-click any packet in a TCP conversation -> Follow -> TCP Stream
Wireshark reassembles the full session into readable text (both directions shown in different colors).
Works for any TCP-based protocol — HTTP, FTP, SMTP, etc.
The display filter <code>tcp.stream eq <N></code> is applied automatically to isolate that stream.
Use to pull credentials, file contents, or full HTTP responses from a capture.

</div>
</details>

### Extract Files from a Capture

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Steps:</span></summary>
<div class="callout-body">

Requires the full conversation to be captured before extraction.
File -> Export Objects -> select protocol format (HTTP, FTP-DATA, SMB, etc.)
Wireshark lists all transferable objects found in the capture for selective export.

</div>
</details>

### Analyze FTP Traffic

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Steps:</span></summary>
<div class="callout-body">

FTP transmits credentials and data in cleartext.
<code>ftp.request.command</code> — shows all FTP commands including USER and PASS
<code>ftp-data</code> — shows data transfer payloads (raw bytes of transferred files)
To reconstruct a transferred file: filter on <code>ftp-data</code>, right-click the data packet,
Follow -> TCP Stream -> Show and save data as: Raw -> save with original filename

</div>
</details>

### Decrypt RDP Traffic (with RSA Private Key)

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Steps:</span></summary>
<div class="callout-body">

If you have the RSA private key used by the RDP server, Wireshark can decrypt the session.
1. Filter on <code>tcp.port == 3389</code> to confirm traffic is present
2. Edit -> Preferences -> Protocols -> TLS -> RSA Keys list -> Edit ("+")
3. Enter: IP address of the RDP server, port 3389, protocol: <code>tpkt</code> (or leave blank)
4. Select the RSA private key file (.pem or .key)
5. Save and reapply — filter on <code>rdp</code> to view decrypted packets
Note: This same process works for any TLS-encrypted protocol given the correct server key.

</div>
</details>

### Decrypt TLS Traffic (with Key Log File)

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Steps:</span></summary>
<div class="callout-body">

Right Click packet -> Protocol Preferences -> TLS -> Open TLS Preferences
Browse under "(Pre)-Master-Secret log filename" and select the key log file.

</div>
</details>

### Filter by Protocol or Host

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

Display filter examples:
<code>http</code> — show only HTTP traffic
<code>tcp.port == 443</code> — filter by port
<code>ip.addr == 10.10.10.1</code> — filter by IP
<code>tcp.flags.syn == 1</code> — show SYN packets
<code>!(arp or dns or icmp)</code> — exclude noise protocols

</div>
</details>

### Check for Anomalies

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Steps:</span></summary>
<div class="callout-body">

Use the Expert Analysis indicator in the bottom-left status bar.
Yellow/red indicators highlight errors, retransmissions, and suspicious patterns.
Statistics -> Protocol Hierarchy — view protocol breakdown across the entire capture
Statistics -> Conversations — top talkers and per-protocol session breakdown
Analyze tab — TCP stream following, filter preparation, expert info details

</div>
</details>

---
## TShark (CLI Interface)

TShark is the terminal-based counterpart to Wireshark. It shares Wireshark's protocol dissectors, display filter syntax, and capture formats but runs headless. Useful on servers without a desktop environment or when piping output to other tools.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>TShark Flags:</span></summary>
<div class="callout-body">

| Flag | Description |
|------|-------------|
| <code>-D</code> | List available capture interfaces and exit |
| <code>-L</code> | List available link-layer mediums and exit |
| <code>-i <iface></code> | Select capture interface |
| <code>-f <filter></code> | Capture filter in BPF/libpcap syntax (applied during capture) |
| <code>-Y <filter></code> | Display filter (applied to output) |
| <code>-r <file></code> | Read from a PCAP file |
| <code>-w <file></code> | Write to file in pcapng format |
| <code>-c <n></code> | Stop after capturing N packets |
| <code>-a <condition></code> | Autostop condition: duration, filesize, or packet count |
| <code>-P</code> | Print packet summary while writing to file |
| <code>-x</code> | Add hex and ASCII output for each packet |
| <code>-h</code> | Show help |

</div>
</details>

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>TShark Examples:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>tshark -D</code></li>
  <li><code>tshark -i 1 -w /tmp/test.pcap</code></li>
  <li><code>sudo tshark -i eth0 -f "host 172.16.146.2"</code></li>
  <li><code>tshark -r capture.pcap -Y "http.request.method == GET"</code></li>
</ul>

</div>
</details>

---
## Termshark (Terminal UI)

Termshark is a terminal-based UI (TUI) that replicates the Wireshark three-pane interface inside a terminal window. Uses the same capture filters and display filters as Wireshark. Accepts interfaces and filters at startup the same way as TShark.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Termshark Keyboard Shortcuts:</span></summary>
<div class="callout-body">

| Key | Action |
|-----|--------|
| <code>/</code> | Open display filter / stream search |
| <code>Tab</code> | Switch between panes |
| <code>q</code> | Quit |
| <code>Esc</code> | Activate menu |
| <code>c</code> | Switch to copy mode |
| <code>\|</code> | Cycle through pane layouts |
| <code>\</code> | Toggle pane zoom |
| <code>+</code> / <code>-</code> | Adjust horizontal split |
| <code><</code> / <code>></code> | Adjust vertical split |
| <code>:</code> | Activate command-line mode |
| <code>z</code> | Maximize/restore modal dialog |
| <code>?</code> | Display help |
| <code>Shift + Left Mouse</code> | Copy |
| <code>Shift + Right Mouse</code> | Paste |

</div>
</details>

Install: download a stable release binary from the Termshark GitHub releases page and extract — no build required.

---
## Related Concepts
- [Network Traffic Analysis](/knowledge/Defensive-Security/Network-Traffic-Analysis)
- [Packets and Frames](/knowledge/Networking/Packets-and-Frames)
- [Protocols](/knowledge/Networking/Protocols)
- [TLS & SSL](/knowledge/Networking/TLS-SSL)

## Related Techniques
- Packet Analysis
- Packet Sniffing

## Related Playbooks
-

---
## References / Images
- Assets/Images/Protocol Data Unit Breakdown In Wireshark.png
