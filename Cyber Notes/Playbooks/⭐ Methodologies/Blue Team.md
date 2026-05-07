Tags: #Status/In-Progress #Type/Playbook #Context/Blueteam

---
## Objective
Detect, investigate, contain, and recover from security incidents while continuously hardening the environment against future attacks. The blue team's mission is defense — protecting organizational assets, ensuring uptime, and maintaining visibility across the environment.

---
## Prerequisites
- Asset inventory and baseline established
- Logging and SIEM configured and ingesting events
- Incident Response plan documented
- Endpoint detection (AV/EDR) deployed
- Network monitoring tools in place

---
## Phase 1 — Prevention & Hardening
Reduce the attack surface before incidents occur.

### Common Commands

> [!INFO]- Common Commands:
> `sudo apt update && sudo apt dist-upgrade` — keep systems patched
> Review open ports: `sudo nmap -sV <host>`
> Disable unnecessary services: `sudo systemctl disable <service>`
> Check SUID binaries: `find / -perm -4000 2>/dev/null`

### Tools
- [[iptables]]
- [[Uncomplicated Firewall (UFW)]]
- [[Snort]]
- [[OpenVAS]]

---
## Phase 2 — Detection & Monitoring
Continuously monitor for indicators of compromise (IOCs) and suspicious behavior.

### Common Commands

> [!INFO]- Common Commands:
> Monitor auth failures: `grep "Failed" /var/log/auth.log`
> Watch live logs: `tail -f /var/log/syslog`
> Review SIEM alerts for anomalous login times, lateral movement, or privilege escalation
> Capture traffic: `sudo tcpdump -i eth0 -w capture.pcap`

### Tools
- [[Snort]]
- [[TCPDump]]
- [[Wireshark]]
- [[Intro to SIEM]]

---
## Phase 3 — Incident Response
When an incident is detected, follow structured IR procedures.

### Common Commands

> [!INFO]- Common Commands:
> Contain: isolate affected host from network
> Preserve: image disk and capture memory before remediation
> Eradicate: remove malware, close attacker access, patch exploited vulnerability
> Recover: restore from clean backup, monitor for reinfection

### Tools
- [[Volatility 3]]
- [[CAPA]]
- [[INetSim]]
- [[Oledump.py]]

---
## Phase 4 — Post-Incident Review
Document findings, measure response effectiveness, and improve defenses.

### Common Commands

> [!INFO]- Common Commands:
> Write incident report: timeline, indicators, affected systems, remediation steps
> Update detection rules and firewall policies
> Conduct lessons-learned meeting

---
## Related Techniques
-

## Related Playbooks
- [[Linux Forensics Playbook]]

## Related Tools
- [[Snort]]
- [[TCPDump]]
- [[Wireshark]]
- [[Volatility 3]]
- [[OpenVAS]]

---
## References / Images
- NIST SP 800-61 — Computer Security Incident Handling Guide
- MITRE ATT&CK Defender — https://attack.mitre.org/
- SANS Incident Handler's Handbook
