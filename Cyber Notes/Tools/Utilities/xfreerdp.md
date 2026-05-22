Tags: #Status/In-Progress #Type/Tool #Context/Redteam #Context/Windows #publish-me

---
## Overview
xfreerdp is a free and open-source RDP (Remote Desktop Protocol) client for Linux. It allows testers and administrators to establish remote desktop connections to Windows machines directly from a Linux terminal, making it a standard tool for accessing Windows targets during internal network assessments.

## Target / Context
Windows machines with RDP (port 3389) enabled during internal network penetration testing or lateral movement.

---
## Installation

> [!INFO]- Installation Commands:
> `apt install freerdp2-x11`

---
## Basic Usage

> [!INFO]- Basic Usage:
> `xfreerdp /u:<username> /p:"<password>" /v:<IP>`

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `/u:` | Username for authentication | `/u:john` |
> | `/p:` | Password for authentication | `/p:"Password123"` |
> | `/v:` | Target IP address or hostname | `/v:10.129.12.10` |
> | `/d:` | Domain name | `/d:CORP` |
> | `/port:` | Custom RDP port if not 3389 | `/port:33890` |
> | `/cert:ignore` | Ignore certificate errors (common in pentest environments) | `/cert:ignore` |
> | `/size:` | Set resolution of remote desktop window | `/size:1920x1080` |
> | `/drive:,/path` | Mount a local drive in the remote session for file transfer | `/drive:share,/tmp` |
> | `/dynamic-resolution` | Allow window resize to adjust remote resolution | `/dynamic-resolution` |

---
## Common Use Cases

### Standard RDP Connection
Connect to a Windows target using known credentials.

> [!INFO]- Commands:
> `xfreerdp /u:john /p:"Password123" /v:10.129.12.10 /cert:ignore`

### RDP with Domain Authentication
Connect specifying a domain — required for Active Directory domain accounts.

> [!INFO]- Commands:
> `xfreerdp /u:john /d:CORP /p:"Password123" /v:10.129.12.10 /cert:ignore`

### RDP with Local Drive Mount
Mount a local directory into the remote session, enabling file transfer without SCP or SMB.

> [!INFO]- Commands:
> `xfreerdp /u:john /p:"Password123" /v:10.129.12.10 /drive:share,/tmp /cert:ignore`

---
## Related Techniques
-

## Related Playbooks
- [[Windows Pentest Playbook]]
- [[Red Team]]

---
## References / Images
- https://github.com/FreeRDP/FreeRDP
- man xfreerdp
