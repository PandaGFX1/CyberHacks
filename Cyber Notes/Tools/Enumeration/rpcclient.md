Tags: #Status/In-Progress #Type/Tool #Context/Redteam #publish-me

---
## Overview
rpcclient is a command-line tool for executing RPC (Remote Procedure Call) queries against SMB servers using the MS-RPC protocol. It allows manual interaction with an SMB server to enumerate users, groups, shares, domain info, and other details — often accessible even via null session (anonymous connection). It is part of the Samba suite and is one of the primary tools for SMB reconnaissance during penetration tests.

## Target / Context
Windows/Samba SMB servers — both domain and workgroup environments. Effective during null session enumeration when anonymous access is permitted.

---
## Installation

> [!INFO]- Installation Commands:
> Included with Samba:
> `sudo apt install samba-common-bin`

---
## Basic Usage

> [!INFO]- Basic Usage:
> Null session (anonymous):
> `rpcclient -U "" <target>`
> `rpcclient -N -U "" <target>` — skip password prompt
>
> Authenticated:
> `rpcclient -U "username%password" <target>`

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-U` | Username (use `""` for null session) | `rpcclient -U "" <IP>` |
> | `-N` | No password prompt | `rpcclient -N -U "" <IP>` |
> | `-c` | Execute a single command and exit | `rpcclient -N -U "" <IP> -c "srvinfo"` |
> | `-d` | Debug level | `rpcclient -d 2 -U "" <IP>` |

---
## Common Use Cases

### Server and Domain Information

> [!INFO]- Commands:
> `srvinfo` — server version and OS information
> `enumdomains` — enumerate deployed domains on the network
> `querydominfo` — get domain, server, and user info for deployed domains

### Share Enumeration

> [!INFO]- Commands:
> `netshareenumall` — list all available shares
> `netsharegetinfo <share>` — get details on a specific share

### User and Group Enumeration

> [!INFO]- Commands:
> `enumdomusers` — list all domain users (username + RID)
> `queryuser <RID>` — get details on a specific user by RID
> `querygroup <RID>` — get details on a group by RID
> `enumdomgroups` — list all domain groups
> `queryusergroups <RID>` — list groups a user belongs to

### RID Brute-Forcing
When you cannot directly enumerate users but can query by RID, iterate through a range to find valid accounts. RIDs for domain users typically start around 500–1100.

> [!INFO]- Commands:
> ```bash
> for i in $(seq 500 1100); do
>   rpcclient -N -U "" <target> -c "queryuser 0x$(printf '%x\n' $i)" \
>   | grep "User Name\|user_rid\|group_rid" && echo ""
> done
> ```
> Returns user details only for valid/existing RIDs — all others are silent.

### Privilege and Policy Information

> [!INFO]- Commands:
> `enumprivs` — list available privileges
> `getdompwinfo` — get domain password policy info
> `getusrdompwinfo <RID>` — get password policy for a specific user

---
## Related Techniques
- [[Service Enumeration]]

## Related Playbooks
- [[Windows Pentest Playbook]]
- [[Linux Pentest Playbook]]

---
## References / Images
- `man rpcclient`
- Impacket alternative: `samrdump.py <IP>` (https://github.com/SecureAuthCorp/impacket)
