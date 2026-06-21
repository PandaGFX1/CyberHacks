---
title: "TCPDump"
category: "tools"
tags: []
excerpt: "TCPDump is a command-line packet capture and analysis tool. Captures live network traffic from an interface or reads..."
date: "2026-05-17"
---

---
## Overview
TCPDump is a command-line packet capture and analysis tool. Captures live network traffic from an interface or reads from saved PCAP files. Filters allow precise capture of specific protocols, hosts, ports, and TCP flags. Core tool for network analysis, traffic inspection, and incident response.

## Target / Context
Any network interface on a Linux system. Run with `sudo` for full interface access. Output can be saved to PCAP for analysis in Wireshark.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo apt install tcpdump</code></li>
</ul>
Man pages: <code>man tcpdump</code> and <code>man pcap-filter</code>

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo tcpdump [options] [filter expression]</code></li>
  <li><code>sudo tcpdump -i any</code></li>
  <li><code>sudo tcpdump -i eth0 -w capture.pcap</code></li>
</ul>

</div>
</details>

---
## Flags & Options

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Flags & Options:</span></summary>
<div class="callout-body">

| Flag | Description | Example |
|------|-------------|---------|
| <code>-i</code> | Specify network interface | <code>-i eth0</code> / <code>-i any</code> |
| <code>-D</code> | List all available capture interfaces and exit | <code>-D</code> |
| <code>-w</code> | Save captured packets to file | <code>-w capture.pcap</code> |
| <code>-r</code> | Read packets from a saved file | <code>-r capture.pcap</code> |
| <code>-c</code> | Stop after capturing N packets | <code>-c 100</code> |
| <code>-n</code> | Do not resolve IP addresses | <code>-n</code> |
| <code>-nn</code> | Do not resolve IPs or ports | <code>-nn</code> |
| <code>-v / -vv / -vvv</code> | Increase verbosity | <code>-vv</code> |
| <code>-q</code> | Quiet mode — brief packet output | <code>-q</code> |
| <code>-e</code> | Include link-level header (MAC addresses) | <code>-e</code> |
| <code>-A</code> | Print packet data in ASCII only (no hex) | <code>-A</code> |
| <code>-X</code> | Print packet headers and data in hex and ASCII | <code>-X</code> |
| <code>-XX</code> | Same as <code>-X</code> but also includes the ethernet frame header | <code>-XX</code> |
| <code>-S</code> | Display absolute sequence numbers instead of relative | <code>-S</code> |
| <code>-l</code> | Line-buffered output — enables piping to grep and other tools | <code>-l</code> |
| <code>-s</code> | Snap length — how many bytes of each packet to capture | <code>-s 0</code> (full packet) |

</div>
</details>

---
## Common Use Cases

### List Interfaces

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo tcpdump -D</code></li>
</ul>

</div>
</details>

### Capture All Traffic on Any Interface

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo tcpdump -i any</code></li>
  <li><code>sudo tcpdump -i eth0 -nn</code></li>
</ul>
<code>sudo tcpdump -i eth0 -nnvXX</code>    # Best practice: no name resolution, verbose, full frame in hex+ASCII

</div>
</details>

### Save and Read PCAP Files

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo tcpdump -i eth0 -w capture.pcap</code></li>
  <li><code>tcpdump -r capture.pcap</code></li>
  <li><code>tcpdump -r capture.pcap -nn</code></li>
</ul>

</div>
</details>

### Filter by Host and Port

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo tcpdump host 10.10.10.1</code></li>
  <li><code>sudo tcpdump src host 10.10.10.1</code></li>
  <li><code>sudo tcpdump dst host 10.10.10.1</code></li>
  <li><code>sudo tcpdump port 80</code></li>
  <li><code>sudo tcpdump src port 443</code></li>
  <li><code>sudo tcpdump host 10.10.10.1 and port 22</code></li>
  <li><code>sudo tcpdump host 10.10.10.1 or host 10.10.10.2</code></li>
  <li><code>sudo tcpdump not port 443</code></li>
</ul>

</div>
</details>

### Filter by Protocol

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo tcpdump tcp</code></li>
  <li><code>sudo tcpdump udp</code></li>
  <li><code>sudo tcpdump icmp</code></li>
  <li><code>sudo tcpdump arp</code></li>
</ul>

</div>
</details>

### Filter by TCP Flags

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo tcpdump "tcp[tcpflags] == tcp-syn"</code></li>
  <li><code>sudo tcpdump "tcp[tcpflags] & tcp-syn != 0"</code></li>
  <li><code>sudo tcpdump "tcp[tcpflags] & (tcp-syn|tcp-ack) != 0"</code></li>
</ul>

</div>
</details>

### Filter by Packet Length

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo tcpdump greater 1000</code></li>
  <li><code>sudo tcpdump less 64</code></li>
</ul>

</div>
</details>

### Pipe Output to Other Tools

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<code>-l</code> enables line-buffered mode so output can be piped in real time:
<ul class="callout-list">
  <li><code>sudo tcpdump -i eth0 -l | grep "password"</code></li>
  <li><code>sudo tcpdump -i eth0 -l -nn | grep "192.168.1."</code></li>
</ul>

</div>
</details>

### Inspect TCP Flags at Byte Level

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

BPF allows direct byte inspection of packet headers using <code>proto[offset:size]</code> syntax.
The 13th byte (offset 13) of a TCP header contains the flags field:
<code>sudo tcpdump -i eth0 'tcp[13] & 2 != 0'</code>    # SYN flag set (bit 1)
<code>sudo tcpdump -i eth0 'tcp[13] & 16 != 0'</code>   # ACK flag set (bit 4)
<code>sudo tcpdump -i eth0 'tcp[13] & 1 != 0'</code>    # FIN flag set (bit 0)
This is equivalent to using the named flag filters but gives direct byte-level control.

</div>
</details>

---
## Output Format Reference

When verbose output is enabled, each packet line contains these fields:

TCPDump Output Breakdown

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

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Filter Syntax:</span></summary>
<div class="callout-body">

| Syntax | Description | Example |
|--------|-------------|---------|
| <code>host HOSTNAME</code> | Match source or destination host | <code>host 10.10.10.1</code> |
| <code>src host HOSTNAME</code> | Match source host only | <code>src host 10.10.10.1</code> |
| <code>dst host HOSTNAME</code> | Match destination host only | <code>dst host 10.10.10.1</code> |
| <code>port PORT</code> | Match source or destination port | <code>port 443</code> |
| <code>src/dst port PORT</code> | Match source or destination port | <code>src port 22</code> |
| <code>proto[expr:size]</code> | Inspect specific byte(s) in header | <code>ip[9:1] == 6</code> (TCP) |
| <code>greater / less LENGTH</code> | Filter by packet length | <code>greater 1000</code> |
| <code>and, or, not</code> | Logical operators for combining filters | <code>host x and port 80</code> |

</div>
</details>

---
## Capture Timing — When to Apply Filters

Filters can be applied at capture time or post-capture when reading a PCAP file:

| When | Tradeoff |
|------|----------|
| During capture | Reduces file size and speeds up writes; risk losing data if scope is wrong |
| Post-capture on PCAP | Preserves everything; safer when unsure what to look for; can be slow on large files |

---
## Related Concepts
- [Network Traffic Analysis](/knowledge/Defensive-Security/Network-Traffic-Analysis)
- [Packets and Frames](/knowledge/Networking/Packets-and-Frames)
- [Protocols](/knowledge/Networking/Protocols)
- [Ports](/knowledge/Networking/Ports)

## Related Techniques
- Packet Sniffing
- Packet Analysis

## Related Playbooks
-

---
## References / Images
- BPF Filter Reference (Miro): https://miro.com/app/board/o9J_klSqCSY=/
