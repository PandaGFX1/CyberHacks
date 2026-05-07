Tags: #Status/Reference #Type/Knowledge #Context/Linux #publish-me

---
## Overview
Solaris is a UNIX-based operating system originally developed by Sun Microsystems in the 1990s, later acquired by Oracle Corporation. Known for robustness, scalability, and support for high-end hardware, it is widely used in enterprise environments for mission-critical applications including database management, cloud computing, and virtualization. Solaris differs from Linux distributions in its proprietary nature, package management, service management, and file system tools.

---
## Terminology
| Term | Definition |
|------|------------|
| SMF | Service Management Facility — Solaris init/service management system replacing SysV |
| IPS | Image Packaging System — Solaris package manager |
| ZFS | Zettabyte File System — default on Solaris; supports snapshots, data compression, integrity checks |
| SPARC | Sun's proprietary processor architecture targeted by Solaris |
| truss | Solaris system call tracer (equivalent to `strace` on Linux) |
| pfiles | Solaris tool to list open files for a process (equivalent to `lsof -c` on Linux) |
| showrev | Solaris system info command (similar to `uname -a` but more detailed) |

---
## Core Concepts

### Solaris vs Linux Distributions

| Aspect | Linux | Solaris |
|--------|-------|---------|
| License | Open-source | Proprietary (Oracle) |
| Source Code | Publicly available and modifiable | Closed source |
| Package Manager | apt, dnf, rpm, etc. | IPS (`pkgadd`) |
| Service Management | systemd | SMF (`svcadm`) |
| File System | ext4, Btrfs, XFS, etc. | ZFS |
| Hardware | x86, ARM, RISC-V | SPARC and x86 |
| RBAC | Available on some distros | Built-in |
| Hypervisor | KVM, VirtualBox | Oracle VM Server for SPARC (built-in) |

**Key differences:**
- **ZFS** — Solaris default; provides data compression, snapshots, and high scalability
- **SMF** — more advanced service management than systemd; better reliability and availability for services
- **IPS** — Solaris package management; includes built-in RBAC and mandatory access controls not standard across all Linux distributions

---

### Command Equivalents

#### System Information
| Task | Linux | Solaris |
|------|-------|---------|
| System info | `uname -a` | `showrev -a` (includes patch level and hardware provider) |

#### Package Management
| Task | Linux | Solaris |
|------|-------|---------|
| Install package | `sudo apt-get install apache2` | `pkgadd -d SUNWapchr` |

#### Permission Management
| Task | Linux | Solaris |
|------|-------|---------|
| Change permissions | `chmod 700 filename` | `chmod 700 filename` (same) |
| Find SUID files | `find / -perm 4000` | `find / -perm -4000` (note the `-` prefix) |

#### NFS
Solaris has its own NFS implementation using the `share` command. Configuration stored in `/etc/dfs/dfstab`.

| Task | Linux | Solaris |
|------|-------|---------|
| Share NFS directory | Edit `/etc/exports` | `share -F nfs -o rw /export/home` |
| Mount NFS share | `mount -t nfs <server>:/share /mnt` | `mount -F nfs 10.10.10.10:/nfs_share /mnt/local` |

#### Process and File Inspection
| Task | Linux | Solaris |
|------|-------|---------|
| List open files by process | `sudo lsof -c apache2` | `pfiles $(pgrep httpd)` |
| Trace system calls | `sudo strace -p $(pgrep apache2)` | `truss -p $(pgrep httpd)` |

**truss vs strace:**
- `truss` can trace signals sent to a process — `strace` cannot
- `truss` traces system calls made by child processes — `strace` only traces the specified process
- `truss` is useful for diagnosing errors, performance issues, and revealing sensitive data in application calls

---
## Related Concepts
- [[Linux Fundamentals]]
- [[Operating System Fundamentals]]
- [[Boot and File Systems]]

## Related Techniques
-

---
## References / Images
- Oracle Solaris documentation
- `man showrev`, `man truss`, `man pfiles`
