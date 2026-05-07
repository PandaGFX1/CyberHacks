Tags: #Status/In-Progress #Type/Knowledge #Context/Network #publish-me

---
## Overview
SMB (Server Message Block) is a client-server protocol for sharing files, directories, printers, and other network resources. Originally Windows-native, it is available on Linux and Unix via Samba, enabling cross-platform file sharing. SMB access rights are defined by Access Control Lists (ACLs) set at the share level, not locally on the server. Null sessions (anonymous access) and weak Samba configurations are common attack vectors during network penetration tests.

---

## Terminology
| Term | Definition |
|------|------------|
| SMB | Server Message Block — network protocol for resource sharing over TCP |
| CIFS | Common Internet File System — dialect of SMB aligned with SMBv1; used by Samba |
| Samba | Open-source SMB/CIFS implementation for Linux/Unix — enables cross-platform file sharing |
| NetBIOS | Network Basic Input/Output System — legacy naming/session API used with older SMB (TCP 137–139) |
| NBNS | NetBIOS Name Server — hostname registration service (enhanced version: WINS) |
| WINS | Windows Internet Name Service — Windows-extended version of NBNS |
| Workgroup | A group name identifying a collection of computers on an SMB network |
| Null Session | Anonymous SMB connection with no credentials — used to enumerate shares and users |
| ACL | Access Control List — defines share-level read/write permissions |
| RPC | Remote Procedure Call — mechanism underlying SMB service queries; accessed via rpcclient |
| RID | Relative Identifier — unique ID for user/group objects within a domain; used in enumeration |
| DC | Domain Controller — manages authentication for Windows domains; keeps user/password in NTDS.dit and SAM |

---
## Core Concepts

### Protocol Overview
SMB operates over TCP with a three-way handshake before establishing a connection. It uses:
- **TCP 445** — direct SMB over TCP/IP (modern, no NetBIOS needed)
- **TCP 137–139** — SMB over NetBIOS (legacy Samba/older Windows)

The server shares portions of its local file system as *shares*. ACLs define access per user or group at the share level. A workgroup is a simple peer-to-peer grouping; a domain adds centralized authentication via a Domain Controller.

---

### SMB Versions
| Version | OS | Notable Change |
|---------|-----|----------------|
| CIFS | Windows NT 4.0 | Communication via NetBIOS interface |
| SMB 1.0 | Windows 2000 | Direct connection via TCP |
| SMB 2.0 | Windows Vista / Server 2008 | Performance improvements, improved message signing, caching |
| SMB 2.1 | Windows 7 / Server 2008 R2 | Locking mechanisms |
| SMB 3.0 | Windows 8 / Server 2012 | Multichannel connections, end-to-end encryption, remote storage |
| SMB 3.0.2 | Windows 8.1 / Server 2012 R2 | Stability improvements |
| SMB 3.1.1 | Windows 10 / Server 2016+ | Pre-auth integrity checking, AES-128 encryption |

- SMB 3.0+ — Samba can participate as a full Active Directory domain member
- SMB 4.0+ — Samba can act as an AD domain controller

Samba uses two daemons: `smbd` (file sharing, resource access) and `nmbd` (NetBIOS name registration, browsing).

---

### Samba Configuration
Config file: `/etc/samba/smb.conf`
Restart: `sudo systemctl restart smbd`

**Global settings** (apply to all shares unless overridden):

| Setting | Example | Description |
|---------|---------|-------------|
| `workgroup` | `WORKGROUP` | Name of the Windows workgroup |
| `server string` | `%h server (Samba, Ubuntu)` | String shown when a connection is initiated |
| `netbios name` | `ubuntu` | NetBIOS hostname for the server |
| `interfaces` | `127.0.0.0/8 eth0` | Bind Samba to specific interfaces |
| `bind interfaces only` | `yes` | Only listen on listed interfaces |
| `log file` | `/var/log/samba/log.%m` | Per-machine log file |
| `max log size` | `1000` | Max log size in KB |
| `map to guest` | `bad user` | Map unknown users to guest account |
| `usershare allow guests` | `yes` | Allow guest access to user shares |

**Share-level settings** (defined in `[sharename]` sections):

| Setting | Example | Description |
|---------|---------|-------------|
| `comment` | `Home Directories` | Description of the share |
| `path` | `/home/user/share` | Path to the shared directory |
| `browseable` | `yes` | Show share in network browse list |
| `read only` | `no` | Allow write access |
| `guest ok` | `no` | Allow unauthenticated access |
| `valid users` | `%S` | Restrict access to specific users |
| `write list` | `@staff` | Users/groups with write access |
| `create mask` | `0700` | Permission mask for new files |

---

### Dangerous Settings
| Setting | Risk |
|---------|------|
| `browseable = yes` | Share is listed in browse list — attackers can enumerate available shares |
| `guest ok = yes` | Unauthenticated access; null session access to files |
| `read only = no` | Write access enabled — can be abused for file placement |
| `map to guest = bad user` | Failed auth maps to guest — enables anonymous access to shares |
| `smb passwd file` stored in writable location | Credential file can be replaced or read |

---

### Footprinting SMB

Scan ports 139 and 445 with [[Nmap]] (`-sV -sC`). Nmap alone provides limited info — manual interaction with dedicated tools reveals far more.

List and connect to shares via null session from Linux using **smbclient** (`-N` for no password, `-L` to list shares). Check server status locally (requires access) with `smbstatus`. Get a quick permissions overview across all shares with **smbmap**. Perform null session enumeration via [[NetExec]].

---

### RPC Enumeration
Remote Procedure Call (RPC) underlies SMB queries. `rpcclient` allows manual interaction with SMB servers to extract user, group, and domain information. See [[rpcclient]] for full connection syntax and query reference.

---

### enum4linux-ng
Automated SMB/LDAP enumeration tool that wraps rpcclient, nmblookup, net, and smbclient queries. See [[enum4linux-ng]] for full usage.

Always use multiple tools — different tools expose different data. Never rely solely on automated enumeration.

---

## Related Concepts
- [[Protocols]]
- [[Ports]]
- [[Networking Fundamentals]]
- [[Footprinting & Enumeration]]

## Related Techniques
- [[Service Enumeration]]

## Related Tools
- [[NetExec]]
- [[rpcclient]]
- [[enum4linux-ng]]
- [[Nmap]]

---
## References / Images
- `man smb.conf`
- `man samba`
