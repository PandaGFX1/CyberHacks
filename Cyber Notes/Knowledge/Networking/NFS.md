Tags: #Status/In-Progress #Type/Knowledge #Context/Network #publish-me

---
## Overview
NFS (Network File System) is a distributed file system protocol developed by Sun Microsystems that allows file systems to be mounted and accessed over a network as if they were local. NFS is primarily used between Linux and Unix systems and cannot communicate with SMB servers. Authentication is delegated to the RPC protocol layer, meaning NFS itself has no built-in auth mechanism — access is controlled by UID/GID mappings between client and server, which can be exploited when those mappings differ.

---

## Terminology
| Term | Definition |
|------|------------|
| NFS | Network File System — protocol for remote file system access over a network |
| RPC | Remote Procedure Call — underlying protocol NFS uses for communication |
| ONC-RPC | Open Network Computing RPC (also called SUN-RPC) — NFS transport layer; exposes on TCP/UDP port 111 |
| XDR | External Data Representation — system-independent data format used by RPC |
| portmapper | Service on port 111 that maps RPC program numbers to port numbers |
| pNFS | Parallel NFS — NFSv4.1 extension allowing parallel access to files across multiple servers |
| UID/GID | User/Group ID — Linux identifiers used by NFS for authorization |
| root_squash | Config option that maps root UID/GID to anonymous — prevents remote root from having root on share |
| no_root_squash | Dangerous: remote root user keeps root privileges on the NFS share |
| /etc/exports | NFS server config file listing shared directories and their access rules |
| showmount | Tool to list NFS shares exported by a server |

---
## Core Concepts

### Protocol Overview
NFS is governed by Internet standard RFCs and uses ONC-RPC as its transport protocol. It exposes on **TCP/UDP port 111** (portmapper) and **TCP/UDP port 2049** (NFS service itself; required in NFSv4+).

NFS has no native authentication or authorization mechanism. Authentication is handled by RPC via UNIX UID/GID. The server translates client user info into file system permissions. Because the server does not verify that client UID/GID mappings match its own, an attacker who controls UID 0 on their machine effectively has root access to any NFS share mounted without `root_squash`.

---

### NFS Versions
| Version | Key Characteristics |
|---------|---------------------|
| NFSv2 | Older; widely supported; originally operated over UDP only |
| NFSv3 | Variable file size, better error reporting; not fully compatible with NFSv2; only requires client authentication |
| NFSv4 | Kerberos support, firewall-friendly (single port 2049), ACLs, stateful protocol, IPv6 and TLS support; requires user authentication |
| NFSv4.1 | Adds parallel NFS (pNFS) — clients can access multiple storage servers simultaneously for scale; adds session trunking (multipathing) so one session can use multiple network paths for redundancy; still uses TCP/UDP 2049 only |

---

### /etc/exports Configuration
The exports file specifies which directories are shared and what rules apply. Format: `<directory> <host_or_subnet>(<options>)`

**Options:**
| Option | Description |
|--------|-------------|
| `rw` | Read and write permissions |
| `ro` | Read-only permissions |
| `sync` | Synchronous writes — slightly slower but consistent |
| `async` | Asynchronous writes — faster but risk of inconsistency on crash |
| `secure` | Only ports below 1024 allowed (privileged ports only) |
| `insecure` | Ports above 1024 allowed — weaker |
| `no_subtree_check` | Disable subtree checking — improves reliability for exported subdirectories |
| `root_squash` | Map remote root to anonymous UID/GID — default safe behavior |
| `no_root_squash` | Remote root retains root privileges on share — **dangerous** |
| `nohide` | Export subdirectories mounted below an exported directory |

Create an export entry:
`echo '/mnt/nfs 10.129.14.0/24(sync,no_subtree_check)' >> /etc/exports`
`systemctl restart nfs-kernel-server`
`exportfs` — display current active exports

---

### Dangerous Settings
| Setting | Risk |
|---------|------|
| `rw` | Combined with `no_root_squash`, attacker with local root can write anything |
| `insecure` | Non-privileged ports allowed — less trust verification |
| `nohide` | Mounts nested below exported dirs also become accessible |
| `no_root_squash` | Remote root == local root on the share — full privilege escalation if mounted |

---

### Footprinting NFS
NFS enumeration requires ports 111 and 2049. Scan with [[Nmap]] using NFS NSE scripts (`--script nfs*`) to list available shares, their contents, and stats.

Show available shares from Linux: `showmount -e <target>`

Mount a share locally:
`mkdir target-NFS && sudo mount -t nfs <target>:/ ./target-NFS/ -o nolock`

Use `ls -nl` after mounting to see numeric UID/GID — useful for identifying the real user accounts owning files on the server.

Unmount when done: `sudo umount ./target-NFS`

> [!INFO]- Note on Windows-to-Linux Mounts
> After mounting a Windows NFS share to a Linux machine, check file permissions — you may need root to access certain files.

---

### Privilege Escalation via NFS
When you have SSH access to a system and want to read files from a restricted directory:

1. If the target has an NFS share with `no_root_squash`, mount it on your attack machine
2. Create a local user matching the target's UID
3. Upload a shell binary with SUID set as that UID
4. Execute the shell via SSH to elevate to that user's context

This works because `no_root_squash` lets you write files as root on the share, and the SUID bit executes with the file owner's UID on the target.

---

## Related Concepts
- [[Linux Networking]]
- [[Protocols]]
- [[Footprinting & Enumeration]]

## Related Techniques
- [[Service Enumeration]]

## Related Tools
- [[Nmap]]

---
## References / Images
- `man exports`
- `man showmount`
- RFC 7530 (NFSv4), RFC 8881 (NFSv4.1)
