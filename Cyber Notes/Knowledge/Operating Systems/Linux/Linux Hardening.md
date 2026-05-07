Tags: #Status/In-Progress #Type/Knowledge #Context/Linux #Context/Blueteam #publish-me

---
## Overview
Linux hardening reduces the attack surface of a system through access control, firewall configuration, service minimization, and log monitoring. While Linux systems present a smaller attack surface than Windows — especially outside of Active Directory environments — misconfigurations in services, permissions, and network exposure still create exploitable vulnerabilities.

---
## Terminology
| Term | Definition |
|------|------------|
| Hardening | Process of reducing a system's attack surface through configuration and restriction |
| iptables | Linux firewall utility that uses Netfilter to filter, NAT, and mangle network packets |
| Netfilter | Linux kernel framework providing hooks to intercept and modify network traffic |
| nftables | Modern replacement for iptables with improved syntax and performance |
| UFW | Uncomplicated Firewall — simplified front-end for iptables |
| FirewallD | Dynamic firewall manager with zone and service-based configuration |
| TCP Wrappers | Host-based access control tool restricting services by source IP or hostname |
| fail2ban | Tool that blocks hosts after a configurable number of failed login attempts |
| SELinux | Mandatory Access Control system integrated into the Linux kernel |
| AppArmor | MAC system using application profiles; simpler alternative to SELinux |
| Lynis | Security auditing tool for Linux systems |
| rkhunter / chkrootkit | Rootkit detection tools |

---
## Core Concepts

### Security Hardening Practices
Linux systems are less prone to mass malware than Windows, but require deliberate hardening — particularly when internet-exposed.

**Essential hardening steps:**

| Practice | Description |
|----------|-------------|
| Keep OS and packages updated | `sudo apt update && sudo apt dist-upgrade` |
| Disable unnecessary services | Reduces the number of open attack surfaces |
| Remove unencrypted authentication mechanisms | Enforce SSH keys over passwords |
| Disable root SSH login | Edit `/etc/ssh/sshd_config` — `PermitRootLogin no` |
| Disable password-based SSH | `PasswordAuthentication no` in `sshd_config` |
| Enforce least privilege | Users should only have access they need; restrict sudo to specific commands |
| Enable fail2ban | Block IPs after repeated failed logins |
| Enable NTP and Syslog | Accurate timestamps for logs; ensure logs are running |
| Enforce unique user accounts | No shared accounts |
| Enforce strong passwords with aging | Prevent reuse; expire passwords periodically |
| Lock accounts after failures | Prevent brute-force via PAM lockout |
| Disable unwanted SUID/SGID binaries | Audit with `find / -perm -4000` and cross-reference GTFOBins (https://gtfobins.github.io/) |
| Use SELinux or AppArmor | Add MAC layer on top of standard permissions |
| Run periodic audits | Tools like Lynis scan for misconfigurations and vulnerabilities |

Security is a continuous process — this list is not exhaustive.

---

### TCP Wrappers
TCP Wrappers provide host-based access control for network services based on IP address or hostname.

Configuration files:
- `/etc/hosts.allow` — specifies which services and hosts ARE allowed
- `/etc/hosts.deny` — specifies which services and hosts are NOT allowed

**Rule precedence:** `/etc/hosts.allow` is checked first. First matching rule wins.

| Example | Meaning |
|---------|---------|
| `sshd : 10.129.14.0/24` | Allow SSH from this subnet |
| `ALL : .inlanefreight.com` | Allow all services from this domain |
| `ftpd : 10.129.22.0/24` | Allow FTP from this IP range |
| `ALL : ALL` (in hosts.deny) | Deny everything not explicitly allowed |

---

### Firewall Setup

#### Linux Firewall Ecosystem
| Tool | Description |
|------|-------------|
| Netfilter | Kernel framework — base layer; all others build on it |
| iptables | Direct rule-based interface to Netfilter |
| nftables | Modern replacement for iptables — better syntax, better performance; not compatible with iptables rules |
| UFW | Simplified iptables front-end — see [[Uncomplicated Firewall (UFW)]] |
| FirewallD | Dynamic firewall with zones and services; supports complex configurations |

#### iptables
iptables provides direct rule-based access to Netfilter using tables, chains, targets, and matches for precise packet filtering, NAT, and packet manipulation — see [[iptables]] for full syntax reference.

---

### System Logs and Monitoring
Logs are critical for detecting intrusions, diagnosing issues, and supporting forensic investigations. On Linux, logs are stored as flat files under `/var/log/`.

#### Log Types and Locations

| Log Type | Location | Contents |
|----------|----------|----------|
| Kernel | `/var/log/kern.log` | Kernel events, hardware drivers, system calls — useful for detecting unusual kernel-level activity |
| System | `/var/log/syslog` | System-level events: service start/stop, reboots, login attempts |
| Authentication | `/var/log/auth.log` | User authentication attempts — more detailed than syslog for auth events |
| fail2ban | `/var/log/fail2ban.log` | Failed login attempts and blocked IPs |
| Apache access | `/var/log/apache2/access.log` | Web server requests |
| Apache error | `/var/log/apache2/error.log` | Web server errors and application issues |
| Nginx | `/var/log/nginx/access.log` | Nginx web server requests |
| OpenSSH (Ubuntu) | `/var/log/auth.log` | SSH login attempts |
| OpenSSH (RHEL) | `/var/log/secure` | SSH login attempts |
| MySQL | `/var/log/mysql/mysql.log` | MySQL database activity |
| PostgreSQL | `/var/log/postgresql/postgresql-version-main.log` | PostgreSQL activity |
| systemd journal | `/var/log/journal/` | Unified binary log for all systemd-managed services |

Kernel logs can reveal vulnerable or outdated drivers, suspicious system calls, and early indicators of malware or rootkit activity. Application access logs show who accessed a service, what was requested, and from where.

#### Log Analysis Tools
| Command | Purpose |
|---------|---------|
| `tail -f /var/log/syslog` | Stream new log entries in real time |
| `grep "Failed" /var/log/auth.log` | Filter for failed login attempts |
| `journalctl -u ssh.service` | View systemd journal for SSH service |
| `sed`, `awk`, `cut` | Parse and extract fields from log entries |

Additional monitoring tools: `syslog`, `rsyslog`, `ss`, `lsof`, ELK stack (Elasticsearch, Logstash, Kibana).

---
## Related Concepts
- [[Linux Fundamentals]]
- [[Linux Networking]]
- [[Linux System Management]]
- [[Firewalls]]
- [[Log Fundamentals]]
- [[Intrusion Detection Systems (IDS)]]
- [[Defensive Security Intro]]

## Related Tools
- [[iptables]]
- [[Uncomplicated Firewall (UFW)]]
- [[Snort]]
- [[Windows Defender Firewall]]

---
## References / Images
- https://gtfobins.github.io/ — SUID/SGID privilege escalation reference
- Lynis documentation
