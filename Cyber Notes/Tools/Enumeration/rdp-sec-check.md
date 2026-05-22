Tags: #Status/In-Progress #Type/Tool #Context/Windows #Context/Redteam #publish-me

---
## Overview
rdp-sec-check is a Perl script that enumerates the security protocols and encryption settings supported by an RDP service. It performs a partial RDP handshake (without authenticating) to determine whether the server supports RDP Security mode, TLS, or NLA/CredSSP, and flags weak configurations such as servers accepting unencrypted RDP Security mode.

## Target / Context
Windows hosts with RDP (TCP/3389) exposed. Used during footprinting to identify weak RDP security configurations without needing credentials.

---
## Installation

> [!INFO]- Installation Commands:
> ```
> sudo cpan
> install Encoding::BER
> git clone https://github.com/CiscoCXSecurity/rdp-sec-check.git && cd rdp-sec-check
> ```

---
## Basic Usage

> [!INFO]- Basic Usage:
> ```
> ./rdp-sec-check.pl <target>
> ./rdp-sec-check.pl 10.129.201.248
> ```

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `--port` | Specify a non-default RDP port | `--port 3390` |
> | `--outfile` | Write results to a file | `--outfile results.txt` |

---
## Common Use Cases

### Enumerate RDP Security Protocols

> [!INFO]- Commands:
> ```
> ./rdp-sec-check.pl 10.129.201.248
> ```
> Output shows which security protocols the server supports — RDP Security (weak, unencrypted), TLS, and NLA/CredSSP — and flags configurations that accept the weak RDP Security mode.

---
## Related Techniques
- [[Service Enumeration]]

## Related Playbooks
- [[Windows Pentest Playbook]]

---
## References / Images
- https://github.com/CiscoCXSecurity/rdp-sec-check
