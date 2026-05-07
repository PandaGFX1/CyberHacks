Tags: #Status/In-Progress #Type/Knowledge #Context/Network #publish-me

---
## Overview
IPMI (Intelligent Platform Management Interface) is a set of standardized specifications for hardware-based host management. It operates independently of the host's BIOS, CPU, firmware, and OS — allowing administrators to manage, monitor, and recover systems even when they are powered off, unresponsive, or failing. IPMI runs over UDP/623 and is implemented by a Baseboard Management Controller (BMC). During penetration tests, IPMI is significant because default credentials are rarely changed, and IPMI 2.0 contains a critical authentication vulnerability that allows offline hash cracking of any valid BMC account.

---

## Terminology
| Term | Definition |
|------|------------|
| IPMI | Intelligent Platform Management Interface — hardware-based out-of-band management specification |
| BMC | Baseboard Management Controller — micro-controller implementing IPMI; embedded ARM system running Linux, connected directly to motherboard |
| iDRAC | Integrated Dell Remote Access Controller — Dell's BMC implementation |
| iLO | Integrated Lights-Out — HP's BMC implementation |
| DRAC | Dell Remote Access Controller — older name for iDRAC |
| RAKP | Remote Authenticated Key Exchange Protocol — authentication protocol in IPMI 2.0; contains a critical flaw |
| ICMB | Intelligent Chassis Management Bus — allows communication between chassis |
| IPMB | Intelligent Platform Management Bus — extends the BMC |
| Hashcat Mode 7300 | Mode for cracking IPMI 2.0 RAKP HMAC-SHA1 hashes |
| out-of-band management | Managing a device via a separate channel (BMC network port) independent of the OS |

---
## Core Concepts

### What IPMI Does
IPMI provides management capabilities that work regardless of OS state:

| Scenario | IPMI Capability |
|----------|----------------|
| Before OS boots | Modify BIOS settings, configure boot order |
| Host fully powered off | Power on/off, configure hardware |
| OS unresponsive/crashed | Reboot, reinstall OS remotely |
| Normal operations | Monitor CPU/memory/temps, query hardware inventory, review event logs |

IPMI requires:
- **Baseboard Management Controller (BMC)** — micro-controller with its own power source
- **LAN connection** — BMC has a dedicated network port
- Battery or standby power — so it operates when the main system is off

---

### Components
| Component | Function |
|-----------|----------|
| BMC | Core IPMI component; micro-controller running embedded Linux |
| ICMB | Interface for chassis-to-chassis communication |
| IPMB | Extends BMC capabilities to additional components |
| IPMI Memory | Stores system event log, repository data |
| Communications Interfaces | Local, serial, LAN, ICMB, PCI Management Bus |

Common BMCs encountered in penetration tests:
- **HP iLO** — HP servers
- **Dell iDRAC** — Dell servers
- **Supermicro IPMI** — Supermicro hardware

BMC access gives full control over the motherboard: monitor, reboot, power off, or reinstall the OS.

---

### Default Credentials
Default passwords are almost never changed in enterprise environments:

| BMC | Default Username | Default Password |
|-----|-----------------|-----------------|
| Dell iDRAC | `root` | `calvin` |
| HP iLO | `Administrator` | 8-character random string (numbers + uppercase letters) |
| Supermicro IPMI | `ADMIN` | `ADMIN` |

HP iLO uses a factory-generated password — an 8-character string of uppercase letters and digits. If the RAKP hash is retrieved, it can be brute-forced offline with [[Hashcat]] using mode 7300 against a mask covering all combinations of 8 uppercase letters and numbers.

---

### IPMI 2.0 RAKP Authentication Vulnerability
IPMI 2.0 has a critical design flaw in the RAKP authentication protocol:

1. During authentication, the **server sends a salted SHA1 or MD5 hash of the user's password** to the client
2. This hash can be captured by any attacker who sends a valid authentication request
3. The hash can be cracked offline using a dictionary attack (**Hashcat mode 7300**)
4. This works for **any valid user account** on the BMC — not just admin accounts

There is no direct fix — the flaw is in the protocol specification itself. Mitigations:
- Use long, complex unique passwords on all BMC accounts
- Network segmentation — restrict access to BMC management interfaces
- Monitor for unusual RAKP authentication attempts

Passwords cracked from IPMI hashes are often reused across the entire system.

---

### Footprinting IPMI

Scan UDP/623 with [[Nmap]] using the `ipmi-version` NSE script to confirm the IPMI service and firmware version.

Identify IPMI version and dump RAKP password hashes using the `ipmi_version` and `ipmi_dumphashes` auxiliary modules in [[MSFConsole]].

Crack RAKP hashes offline with [[Hashcat]] (RAKP mode) or [[JohnTheRipper]] (RAKP format). No server access required — the hash is obtainable from any valid username due to the protocol-level RAKP flaw.

Many BMCs also expose:
- Web-based management console (HTTP/HTTPS)
- SSH or Telnet CLI access
- These should also be tested for default credentials

---

## Related Concepts
- [[Protocols]]
- [[Ports]]
- [[Footprinting & Enumeration]]
- [[Networking Fundamentals]]

## Related Techniques
- [[Service Enumeration]]

## Related Tools
- [[Nmap]]
- [[Hashcat]]
- [[JohnTheRipper]]
- [[MSFConsole]]

---
## References / Images
- https://www.rapid7.com/blog/post/2013/07/02/a-penetration-testers-guide-to-ipmi/
- IPMI 2.0 Specification
