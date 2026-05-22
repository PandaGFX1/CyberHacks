Tags: #Status/In-Progress #Type/Knowledge #Context/Redteam #publish-me

---
## Overview
Footprinting is the systematic process of gathering information about a target system's infrastructure, services, and configurations before attempting exploitation. It combines passive gathering (OSINT, third-party sources) with active enumeration (direct service interaction) across six structured layers — from internet presence down to OS-level details. The goal is not to exploit systems but to map every possible way in.

---

## Terminology
| Term | Definition |
|------|------------|
| Footprinting | Systematic reconnaissance to discover a target's attack surface |
| Enumeration | Active querying of live systems to extract service, user, and configuration data |
| OSINT | Open Source Intelligence — passive information gathering using only public sources |
| Attack Surface | All exposed interfaces and services an attacker could potentially target |
| Infrastructure-Based Enumeration | Identifying internet presence, gateways, and accessible services |
| Host-Based Enumeration | Enumerating services and processes running on a specific host |
| OS-Based Enumeration | Identifying OS type, patch level, internal configuration, and sensitive files |
| Passive Reconnaissance | Gathering information without directly contacting the target |
| Active Reconnaissance | Gathering information through direct interaction with the target |

---
## Core Concepts

### Enumeration Principles
Footprinting is about understanding what you can see, why you can see it, and what it tells you — as much as what you cannot see and why.

Key questions to ask at every stage:
- What can we see? What reasons might explain why it is visible?
- What image does what we see create for us?
- What do we gain from it, and how can we use it?
- What can we **not** see, and why?

Three core principles:
1. There is always more than meets the eye — consider every angle.
2. Distinguish between what is visible and what is obscured.
3. There are always ways to gain more information — keep probing.

Penetration tests are time-limited, so complete enumeration is never guaranteed. The primary goal is not exploiting machines — it is discovering how they *can* be exploited.

---

### Enumeration Methodology
A structured, experience-based framework that organizes enumeration into three levels and six layers. Internal infrastructure testing (intranet, Active Directory) applies the same model differently — the first two layers (Internet Presence, Gateway) do not fully apply to internal infrastructure.

| Level | Layers |
|-------|--------|
| Infrastructure-Based Enumeration | Internet Presence, Gateway |
| Host-Based Enumeration | Accessible Services, Processes |
| OS-Based Enumeration | Privileges, OS Setup |

Think of each layer as a wall to pass through. Only attempt brute force as a last resort.

---

### Layer 1 — Internet Presence
**Objective:** Identify all externally accessible infrastructure and interfaces. Find every possible target.

| Category | Examples |
|----------|---------|
| Domains | Registered domain names, historical records |
| Subdomains | Subdomain enumeration via crt.sh, DNS brute forcing |
| vHosts | Virtual hosts on a single IP |
| ASN | Autonomous System Numbers — identify IP ranges the organization controls |
| Netblocks | IP address ranges belonging to the target |
| Cloud Instances | AWS S3 buckets, Azure blobs, GCP storage |
| Security Measures | WAF, CDN (Cloudflare), rate limiting |

OSINT is conducted at this layer and is entirely passive — no direct contact with target systems.

---

### Layer 2 — Gateway
**Objective:** Identify security measures protecting the external and internal infrastructure. Understand what you are dealing with before engaging.

| Category | Examples |
|----------|---------|
| Firewalls | Packet filtering, stateful inspection |
| DMZ | Demilitarized zone separating public-facing services from internal networks |
| IPS/IDS | Intrusion prevention/detection systems |
| EDR | Endpoint Detection and Response |
| Proxies | Reverse proxies, load balancers |
| NAC | Network Access Control |
| Network Segmentation | VLANs, internal zone separation |
| VPN | Virtual Private Network endpoints |
| CDN | Content delivery networks (Cloudflare, Akamai) |

---

### Layer 3 — Accessible Services
**Objective:** Identify and understand every accessible interface and service hosted externally or internally. This is the primary focus of active service enumeration.

| Category | What to Determine |
|----------|--------------------|
| Service Type | Protocol — FTP, SMB, SSH, HTTP, etc. |
| Functionality | What the service does and why it is running |
| Configuration | Default vs. hardened settings |
| Port | Standard or non-standard port |
| Version | Software version — correlate with known CVEs |
| Interface | Web UI, CLI, API, or direct socket |

---

### Layer 4 — Processes
**Objective:** Identify internal processes, their data sources, and their destinations.

| Category | What to Determine |
|----------|--------------------|
| PID | Process ID — ties to running software |
| Processed Data | What data is being handled |
| Tasks | What the process is doing |
| Source | Where data originates |
| Destination | Where data is sent |

Understanding process dependencies helps identify cascading vulnerabilities — compromising one process may expose another.

---

### Layer 5 — Privileges
**Objective:** Identify permissions and privileges granted to accessible services and accounts.

| Category | What to Determine |
|----------|--------------------|
| Groups | Group memberships and their access rights |
| Users | Usernames, roles, and active sessions |
| Permissions | Read, write, execute on files and services |
| Restrictions | What is explicitly denied or filtered |
| Environment | Environment variables, PATH, shell type |

Not every vulnerability grants full access. But believing there is always a path forward — even if the first foothold is limited — is the right mindset.

---

### Layer 6 — OS Setup
**Objective:** Identify internal OS components and configuration.

| Category | What to Determine |
|----------|--------------------|
| OS Type | Linux distro, Windows version, Solaris |
| Patch Level | Missing patches and known vulnerabilities |
| Network Config | Interfaces, routing, DNS settings |
| OS Environment | Environment variables, shell, scheduled tasks |
| Configuration Files | Service configs, application configs |
| Sensitive Private Files | SSH keys, credentials, API tokens |

---

## Related Concepts
- [[Offensive Security Intro]]
- [[Pentesting Fundamentals]]
- [[OSINT]]

## Related Techniques
- [[Port Scanning]]
- [[Service Enumeration]]
- [[DNS Enumeration]]

## Related Playbooks
- [[Linux Pentest Playbook]]
- [[Windows Pentest Playbook]]

## Related Tools
- [[Nmap]]
- [[Shodan]]

---
## References / Images
- HTB Academy — Footprinting module
- https://www.rapid7.com/blog/post/2013/07/02/a-penetration-testers-guide-to-ipmi/
