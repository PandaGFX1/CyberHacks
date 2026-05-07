Tags: #Status/In-Progress #Type/Tool #Context/Network #Context/Linux #Context/Redteam

---
## Overview
Nmap (Network Mapper) is the industry-standard open-source tool for network discovery and security auditing. Used for host discovery, port scanning, service/version detection, OS detection, and scripting. A core tool in every recon and enumeration phase.

---
## Target / Context
Any networked host or range. Requires root/sudo for full functionality — without it, limited to ICMP echo and TCP connect scans only.

---
## Installation

> [!INFO]- Installation Commands:
> `sudo apt install nmap`

---
## Basic Usage

> [!INFO]- Basic Usage:
> `nmap [options] [target]`
> `nmap 10.10.10.1`
> `nmap 10.10.10.0/24`

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-F` | Fast mode — scans fewer ports | `nmap -F 10.10.10.1` |
> | `-p [range]` | Specify port range | `-p10-1024` / `-p-25` / `-p-` |
> | `-O` | OS detection | `nmap -O 10.10.10.1` |
> | `-sV` | Service and version detection | `nmap -sV 10.10.10.1` |
> | `-A` | OS detection, version scanning, traceroute | `nmap -A 10.10.10.1` |
> | `-Pn` | Force scan hosts that appear down | `nmap -Pn 10.10.10.1` |
> | `-v / -vv / -v4` | Verbosity levels | `nmap -vv 10.10.10.1` |
> | `-d[1-9]` | Debugging level | `nmap -d3 10.10.10.1` |
> | `--min-parallelism` | Minimum parallel probes | `--min-parallelism 10` |
> | `--max-parallelism` | Maximum parallel probes | `--max-parallelism 100` |
> | `--min-rate` | Minimum packets per second | `--min-rate 1000` |
> | `--max-rate` | Maximum packets per second | `--max-rate 5000` |
> | `--host-timeout` | Max time to wait per host | `--host-timeout 30s` |

---
## Common Use Cases

### Host Discovery
Identify live hosts on a network without port scanning.

> [!INFO]- Commands:
> `nmap -sn 10.10.7.1/24`
> `nmap -sL 192.168.0.1/24`
> Note: `-sL` is a list scan only — it does NOT actively scan hosts

---
### Port Scanning

#### Connect Scan (TCP — No Root Required)
Completes the full TCP 3-way handshake. Detectable but works without root.

> [!INFO]- Commands:
> `nmap -sT 192.168.124.148`
> `nmap -sT -p- 192.168.124.148`

#### Stealth Scan (SYN — Root Required)
Sends SYN only — never completes handshake. Faster and less detectable than connect scan.

> [!INFO]- Commands:
> `sudo nmap -sS 192.168.124.148`
> `sudo nmap -sS -p- 192.168.124.148`

#### UDP Scan
> [!INFO]- Commands:
> `sudo nmap -sU 192.168.124.148`

---
### Service & Version Detection

> [!INFO]- Commands:
> `nmap -sV 10.10.10.1`
> `nmap -A 10.10.10.1`
> `nmap -sC -sV 10.10.10.1`

---
### Service-Specific Scripts
Protocol-targeted scans using NSE scripts for service fingerprinting and vulnerability checks.

> [!INFO]- Commands:
> **FTP (TCP/21):**
> `sudo nmap -sV -sC -p21 <target>`
> `sudo nmap -sV -sC -p21 --script-trace <target>`
>
> **SMB (TCP/139,445):**
> `sudo nmap -sV -sC -p139,445 <target>`
>
> **SMTP (TCP/25,465,587):**
> `sudo nmap -sV -sC -p25,465,587 <target>`
> `sudo nmap -p25 --script smtp-open-relay -v <target>`
>
> **IMAP/POP3 (TCP/110,143,993,995):**
> `sudo nmap -sV -sC -p110,143,993,995 <target>`
>
> **SNMP (UDP/161):**
> `sudo nmap -sU -p 161 <target>`
> `sudo nmap -sU -p 161 --script=snmp-info <target>`
> `sudo nmap -sU -p 161 --script=snmp-interfaces <target>`
> `sudo nmap -sU -p 161 --script=snmp-processes <target>`
> `sudo nmap -sU -p 161 --script snmp-brute --script-args snmp-brute.communitiesdb=<wordlist> <target>`
>
> **NFS (TCP-UDP/111,2049):**
> `sudo nmap --script nfs* -sV -p111,2049 <target>`
>
> **MySQL (TCP/3306):**
> `sudo nmap -sV -sC -p3306 --script mysql* <target>`
> Note: Some MySQL NSE script results can produce false positives — manually verify findings.
>
> **MSSQL (TCP/1433):**
> `sudo nmap --script ms-sql-info,ms-sql-empty-password,ms-sql-xp-cmdshell,ms-sql-config,ms-sql-ntlm-info,ms-sql-tables,ms-sql-hasdbaccess,ms-sql-dac,ms-sql-dump-hashes --script-args mssql.instance-port=1433,mssql.username=sa,mssql.password=,mssql.instance-name=MSSQLSERVER -sV -p 1433 <target>`
>
> **Oracle TNS (TCP/1521):**
> `sudo nmap -p1521 -sV <target> --open`
> `sudo nmap -p1521 -sV <target> --open --script oracle-sid-brute`
>
> **IPMI (UDP/623):**
> `sudo nmap -sU --script ipmi-version -p 623 <target>`
>
> **RDP (TCP/3389):**
> `nmap -sV -sC -p3389 --script rdp* <target>`
>
> **WinRM (TCP/5985,5986):**
> `nmap -sV -sC -p5985,5986 <target>`
>
> **Find NSE scripts for a protocol:**
> `find / -type f -name <protocol>* 2>/dev/null | grep scripts`
> `sudo nmap --script-updatedb`

---
### Output & Saving Results

> [!INFO]- Commands:
> `nmap -oN output.txt 10.10.10.1`
> `nmap -oX output.xml 10.10.10.1`
> `nmap -oG output.gnmap 10.10.10.1`
> `nmap -oA output 10.10.10.1`

> [!INFO]- Output Flags:
> | Flag | Format | Use Case |
> |------|--------|---------|
> | `-oN` | Normal text output | Human readable |
> | `-oX` | XML output | Tool integration |
> | `-oG` | Grep-able output | Quick filtering with grep |
> | `-oA` | All major formats | Save everything at once |

---
## Related Concepts
- [[Ports]]
- [[Protocols]]
- [[Packets and Frames]]

## Related Techniques
- [[DNS Enumeration]]
- [[Service Enumeration]]

## Related Playbooks
-

---
## References / Images
- https://nmap.org/docs.html
