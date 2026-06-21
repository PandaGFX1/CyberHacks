---
title: "Snort"
category: "tools"
tags: []
excerpt: "Snort is one of the most widely used open-source Intrusion Detection System (IDS) solutions, developed in 1998. It uses..."
date: "2026-03-28"
---

---
## Overview
Snort is one of the most widely used open-source Intrusion Detection System (IDS) solutions, developed in 1998. It uses both signature-based and anomaly-based detection defined in rule files. Snort ships with built-in rule files covering a variety of known attack patterns and supports custom rules for traffic not covered by defaults.

---
## Target / Context
Network traffic monitoring and intrusion detection on Linux systems. Can monitor traffic for a single host or an entire network (requires promiscuous mode). Operates as a packet sniffer, packet logger, or full NIDS.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo apt install snort</code></li>
</ul>
During installation you must provide the network interface and IP range.
To monitor an entire network, enable promiscuous mode on the host's network interface.

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo snort -q -l /var/log/snort -i lo -A console -c /etc/snort/snort.conf</code></li>
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
| <code>-q</code> | Quiet mode; suppresses banner and init info | <code>sudo snort -q</code> |
| <code>-l</code> | Sets the output logging directory | <code>-l /var/log/snort</code> |
| <code>-i</code> | Network interface to monitor | <code>-i eth0</code> |
| <code>-A</code> | Alert mode | <code>-A console</code> |
| <code>-c</code> | Config file to use | <code>-c /etc/snort/snort.conf</code> |
| <code>-r</code> | Read and analyze a PCAP file instead of live traffic | <code>-r Task.pcap</code> |

</div>
</details>

---
## Common Use Cases

### Packet Sniffer Mode
Reads and displays network packets without performing analysis. Useful for network monitoring and troubleshooting.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo snort -v -i eth0</code></li>
</ul>

</div>
</details>

### Packet Logging Mode
Performs detection on live network traffic in real-time, displays alerts on console, and logs traffic as PCAP.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo snort -q -l /var/log/snort -i eth0 -A console -c /etc/snort/snort.conf</code></li>
</ul>

</div>
</details>

### NIDS Mode
Primary mode — monitors network traffic in real-time and applies rule files to identify known attack patterns.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo snort -q -l /var/log/snort -i eth0 -A console -c /etc/snort/snort.conf</code></li>
</ul>

</div>
</details>

### PCAP File Detection
Analyze a previously captured PCAP file against Snort rules instead of live traffic.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo snort -q -l /var/log/snort -r Task.pcap -A console -c /etc/snort/snort.conf</code></li>
</ul>

</div>
</details>

### Writing a Custom Rule
Open `local.rules` and add custom detection logic.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo nano /etc/snort/rules/local.rules</code></li>
  <li><code>alert icmp any any -> 127.0.0.1 any (msg:"Loopback Ping Detected"; sid:10003; rev:1;)</code></li>
</ul>

</div>
</details>

---
## Rule Format
ICMP Rule Example

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
- [Intrusion Detection Systems (IDS)](/knowledge/Defensive-Security/Security-Solutions/Intrusion-Detection-Systems-IDS)
- [Log Fundamentals](/knowledge/Defensive-Security/Log-Fundamentals)

## Related Techniques
-

## Related Playbooks
-

---
## References / Images
- ICMP Rule Example
