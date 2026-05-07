Tags: #Status/In-Progress #Type/Knowledge #Context/Network #publish-me

---
## Overview
SNMP (Simple Network Management Protocol) is a protocol for monitoring and managing network devices — routers, switches, servers, IoT devices, and more. It transmits control commands via agents over UDP/161 and sends unsolicited alerts (traps) over UDP/162. SNMP is routinely misconfigured with default or weak community strings, and SNMPv1/v2c transmit community strings in plaintext, making them easy to intercept or brute-force during network penetration tests.

---

## Terminology
| Term | Definition |
|------|------------|
| SNMP | Simple Network Management Protocol — network device monitoring and management protocol |
| Agent | Software running on a managed device that responds to SNMP queries |
| Manager | Client that queries SNMP agents for information |
| Community String | Essentially a password that controls read or read/write access to SNMP data; transmitted in cleartext in v1/v2c |
| Trap | Unsolicited alert sent from an SNMP agent to the manager when a specific event occurs (UDP/162) |
| MIB | Management Information Base — a text file defining all queryable SNMP objects for a device in a tree hierarchy |
| OID | Object Identifier — unique address identifying an object in the MIB tree; a sequence of numbers |
| ASN.1 | Abstract Syntax Notation One — format used to write MIB files |
| SNMPwalk | Tool to recursively query all OIDs from an SNMP agent |
| onesixtyone | Tool for brute-forcing SNMP community strings |
| braa | Tool for mass-querying SNMP OIDs across multiple hosts |
| rwuser | Config directive granting read/write access to OID tree — often misconfigured |

---
## Core Concepts

### Protocol Architecture
SNMP uses **UDP/161** for manager-to-agent queries and **UDP/162** for agent-to-manager traps (asynchronous alerts without explicit requests). SNMP objects must have unique addresses (OIDs) known to both client and server for value exchange.

---

### MIB and OID Structure
The **Management Information Base (MIB)** is a vendor-neutral text file that describes all queryable objects on a device. It is written in ASN.1 and does not contain data — it defines where to find information and what format it takes. MIBs ensure interoperability across manufacturers.

Each object in the MIB has an **Object Identifier (OID)** — a sequence of numbers (e.g., `1.3.6.1.2.1.1.1.0`) that uniquely identifies a node in a hierarchical tree. The OID encodes the path from the root of the tree to the object.

OID lookup: https://www.alvestrand.no/objectid/

---

### SNMP Versions
| Version | Authentication | Encryption | Notes |
|---------|---------------|-----------|-------|
| SNMPv1 | None (community string) | None | Still used in small networks; anyone can read/modify |
| SNMPv2c | Community string | None | Most common; adds bulk queries; community string in plaintext |
| SNMPv3 | Username + password (pre-shared key) | Yes (AES/DES) | Secure; more complex to configure |

Most organizations have not migrated to SNMPv3 because the configuration is significantly more complex.

---

### Community Strings
Community strings function as passwords controlling SNMP access. They have no standard format and can be named arbitrarily — but in practice, many organizations use predictable patterns (e.g., based on hostname or location). Standard defaults: `public` (read-only), `private` (read-write).

- **Read-only** community string: allows querying OIDs
- **Read-write** community string: allows querying and modifying device settings

If bound to specific IP addresses, strings are often named after the hostname. In networks with 100+ SNMP-enabled devices, community strings often follow a pattern — useful for generating targeted wordlists.

---

### Default Configuration
Config file: `/etc/snmp/snmpd.conf`
Consult man page for all available settings.

---

### Dangerous Settings
| Setting | Risk |
|---------|------|
| `rwuser noauth` | Read-write access to full OID tree with no authentication |
| `rwcommunity <string> <IPv4>` | Read-write access for the specified community string regardless of source IP |
| `rwcommunity6 <string> <IPv6>` | Same as above for IPv6 |
| Default `public` community string | Widely known; gives unauthenticated read access in SNMPv1/v2c |
| Default `private` community string | Gives read-write access if not changed |

---

### Footprinting SNMP

Scan UDP/161 with [[Nmap]] (`-sU`). Multiple SNMP NSE scripts enumerate interfaces, running processes, installed software, network connections, and can brute-force community strings. See [[Nmap]] for full script reference.

Once a community string is known, walk the full MIB tree with **snmpwalk** to enumerate all exposed OIDs. Brute-force community strings with **onesixtyone** using a wordlist. Once a valid community string is found, mass-query specific OID ranges across multiple hosts with **braa**.

---

## Related Concepts
- [[Protocols]]
- [[Ports]]
- [[Networking Fundamentals]]
- [[Footprinting & Enumeration]]

## Related Techniques
- [[Service Enumeration]]

## Related Tools
- [[Nmap]]

---
## References / Images
- `man snmpd.conf`
- https://secf00tprint.github.io/blog/passwords/crunch/advanced/en
