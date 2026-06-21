---
title: "Nmap"
category: "tools"
tags: []
excerpt: "Nmap (Network Mapper) is the industry-standard open-source tool for network discovery and security auditing. Used for..."
date: "2026-05-04"
---

---
## Overview
Nmap (Network Mapper) is the industry-standard open-source tool for network discovery and security auditing. Used for host discovery, port scanning, service/version detection, OS detection, and scripting. A core tool in every recon and enumeration phase.

---
## Target / Context
Any networked host or range. Requires root/sudo for full functionality — without it, limited to ICMP echo and TCP connect scans only.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo apt install nmap</code></li>
</ul>

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>nmap [options] [target]</code></li>
  <li><code>nmap 10.10.10.1</code></li>
  <li><code>nmap 10.10.10.0/24</code></li>
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
| <code>-F</code> | Fast mode — scans fewer ports | <code>nmap -F 10.10.10.1</code> |
| <code>-p [range]</code> | Specify port range | <code>-p10-1024</code> / <code>-p-25</code> / <code>-p-</code> |
| <code>-O</code> | OS detection | <code>nmap -O 10.10.10.1</code> |
| <code>-sV</code> | Service and version detection | <code>nmap -sV 10.10.10.1</code> |
| <code>-A</code> | OS detection, version scanning, traceroute | <code>nmap -A 10.10.10.1</code> |
| <code>-Pn</code> | Force scan hosts that appear down | <code>nmap -Pn 10.10.10.1</code> |
| <code>-v / -vv / -v4</code> | Verbosity levels | <code>nmap -vv 10.10.10.1</code> |
| <code>-d[1-9]</code> | Debugging level | <code>nmap -d3 10.10.10.1</code> |
| <code>--min-parallelism</code> | Minimum parallel probes | <code>--min-parallelism 10</code> |
| <code>--max-parallelism</code> | Maximum parallel probes | <code>--max-parallelism 100</code> |
| <code>--min-rate</code> | Minimum packets per second | <code>--min-rate 1000</code> |
| <code>--max-rate</code> | Maximum packets per second | <code>--max-rate 5000</code> |
| <code>--host-timeout</code> | Max time to wait per host | <code>--host-timeout 30s</code> |

</div>
</details>

---
## Common Use Cases

### Host Discovery
Identify live hosts on a network without port scanning.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>nmap -sn 10.10.7.1/24</code></li>
  <li><code>nmap -sL 192.168.0.1/24</code></li>
</ul>
Note: <code>-sL</code> is a list scan only — it does NOT actively scan hosts

</div>
</details>

---
### Port Scanning

#### Connect Scan (TCP — No Root Required)
Completes the full TCP 3-way handshake. Detectable but works without root.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>nmap -sT 192.168.124.148</code></li>
  <li><code>nmap -sT -p- 192.168.124.148</code></li>
</ul>

</div>
</details>

#### Stealth Scan (SYN — Root Required)
Sends SYN only — never completes handshake. Faster and less detectable than connect scan.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo nmap -sS 192.168.124.148</code></li>
  <li><code>sudo nmap -sS -p- 192.168.124.148</code></li>
</ul>

</div>
</details>

#### UDP Scan
<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo nmap -sU 192.168.124.148</code></li>
</ul>

</div>
</details>

---
### Service & Version Detection

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>nmap -sV 10.10.10.1</code></li>
  <li><code>nmap -A 10.10.10.1</code></li>
  <li><code>nmap -sC -sV 10.10.10.1</code></li>
</ul>

</div>
</details>

---
### Service-Specific Scripts
Protocol-targeted scans using NSE scripts for service fingerprinting and vulnerability checks.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

**FTP (TCP/21):**
<ul class="callout-list">
  <li><code>sudo nmap -sV -sC -p21 <target></code></li>
  <li><code>sudo nmap -sV -sC -p21 --script-trace <target></code></li>
</ul>

**SMB (TCP/139,445):**
<ul class="callout-list">
  <li><code>sudo nmap -sV -sC -p139,445 <target></code></li>
</ul>

**SMTP (TCP/25,465,587):**
<ul class="callout-list">
  <li><code>sudo nmap -sV -sC -p25,465,587 <target></code></li>
  <li><code>sudo nmap -p25 --script smtp-open-relay -v <target></code></li>
</ul>

**IMAP/POP3 (TCP/110,143,993,995):**
<ul class="callout-list">
  <li><code>sudo nmap -sV -sC -p110,143,993,995 <target></code></li>
</ul>

**SNMP (UDP/161):**
<ul class="callout-list">
  <li><code>sudo nmap -sU -p 161 <target></code></li>
  <li><code>sudo nmap -sU -p 161 --script=snmp-info <target></code></li>
  <li><code>sudo nmap -sU -p 161 --script=snmp-interfaces <target></code></li>
  <li><code>sudo nmap -sU -p 161 --script=snmp-processes <target></code></li>
  <li><code>sudo nmap -sU -p 161 --script snmp-brute --script-args snmp-brute.communitiesdb=<wordlist> <target></code></li>
</ul>

**NFS (TCP-UDP/111,2049):**
<ul class="callout-list">
  <li><code>sudo nmap --script nfs* -sV -p111,2049 <target></code></li>
</ul>

**MySQL (TCP/3306):**
<ul class="callout-list">
  <li><code>sudo nmap -sV -sC -p3306 --script mysql* <target></code></li>
</ul>
Note: Some MySQL NSE script results can produce false positives — manually verify findings.

**MSSQL (TCP/1433):**
<ul class="callout-list">
  <li><code>sudo nmap --script ms-sql-info,ms-sql-empty-password,ms-sql-xp-cmdshell,ms-sql-config,ms-sql-ntlm-info,ms-sql-tables,ms-sql-hasdbaccess,ms-sql-dac,ms-sql-dump-hashes --script-args mssql.instance-port=1433,mssql.username=sa,mssql.password=,mssql.instance-name=MSSQLSERVER -sV -p 1433 <target></code></li>
</ul>

**Oracle TNS (TCP/1521):**
<ul class="callout-list">
  <li><code>sudo nmap -p1521 -sV <target> --open</code></li>
  <li><code>sudo nmap -p1521 -sV <target> --open --script oracle-sid-brute</code></li>
</ul>

**IPMI (UDP/623):**
<ul class="callout-list">
  <li><code>sudo nmap -sU --script ipmi-version -p 623 <target></code></li>
</ul>

**RDP (TCP/3389):**
<ul class="callout-list">
  <li><code>nmap -sV -sC -p3389 --script rdp* <target></code></li>
</ul>

**WinRM (TCP/5985,5986):**
<ul class="callout-list">
  <li><code>nmap -sV -sC -p5985,5986 <target></code></li>
</ul>

**Find NSE scripts for a protocol:**
<ul class="callout-list">
  <li><code>find / -type f -name <protocol>* 2>/dev/null | grep scripts</code></li>
  <li><code>sudo nmap --script-updatedb</code></li>
</ul>

</div>
</details>

---
### Output & Saving Results

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>nmap -oN output.txt 10.10.10.1</code></li>
  <li><code>nmap -oX output.xml 10.10.10.1</code></li>
  <li><code>nmap -oG output.gnmap 10.10.10.1</code></li>
  <li><code>nmap -oA output 10.10.10.1</code></li>
</ul>

</div>
</details>

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Output Flags:</span></summary>
<div class="callout-body">

| Flag | Format | Use Case |
|------|--------|---------|
| <code>-oN</code> | Normal text output | Human readable |
| <code>-oX</code> | XML output | Tool integration |
| <code>-oG</code> | Grep-able output | Quick filtering with grep |
| <code>-oA</code> | All major formats | Save everything at once |

</div>
</details>

---
## Related Concepts
- [Ports](/knowledge/Networking/Ports)
- [Protocols](/knowledge/Networking/Protocols)
- [Packets and Frames](/knowledge/Networking/Packets-and-Frames)

## Related Techniques
- [DNS Enumeration](/techniques/DNS-Enumeration)
- Service Enumeration

## Related Playbooks
-

---
## References / Images
- https://nmap.org/docs.html
