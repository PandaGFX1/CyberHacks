Tags: #Status/Complete #Type/Knowledge #Context/Hardware #publish-me

---
## Overview
This note covers the boot process and file systems for Windows and Linux. It includes hardware initialization via BIOS/UEFI, disk partitioning schemes, file system types, and the full boot sequence from POST through kernel initialization to user login.

---
## Terminology
| Term | Definition |
|------|------------|
| BIOS | Basic Input/Output System; legacy firmware interface managing the boot process |
| UEFI | Unified Extensible Firmware Interface; modern BIOS replacement with larger drive support and Secure Boot |
| POST | Power On Self Test; hardware initialization and error check before booting |
| MBR | Master Boot Record; 512-byte boot sector containing boot loader and partition table |
| GPT | GUID Partition Table; modern MBR replacement supporting larger disks and integrity checks |
| GRUB | Grand Unified Bootloader; common Linux boot loader |
| Partition | Logical division of a physical disk into separate storage segments |
| Sector | Smallest addressable unit on a disk; typically 512 bytes |
| Metadata | Data about data — e.g., MFT in NTFS, FAT tables |
| Allocated Space | Disk blocks actively used by files |
| Unallocated Space | Free disk space not assigned to any file |

---
## Core Concepts

### Hard Drive Types
| Drive Type | Description |
|------------|-------------|
| HDD (Hard Disk Drive) | Magnetic platters divided into sectors; slower, mechanical |
| SSD (Solid State Drive) | Flash memory in NAND cells; no moving parts; faster and non-volatile |

Commands: `fdisk -l` — view disk info | `parted -l` — view unallocated space

### Firmware — BIOS vs UEFI
| Feature | BIOS | UEFI |
|---------|------|------|
| Age | Legacy | Modern |
| Drive Size Support | Limited | Large drives (2TB+) |
| Boot Speed | Slower | Faster |
| Security | Basic | Secure Boot support |
| Partition Style | MBR | GPT |

### Partitioning — MBR vs GPT
| Feature | MBR | GPT |
|---------|-----|-----|
| Max Drive Size | 2TB | 9.4ZB |
| Max Partitions | 4 primary | 128 |
| Integrity Checks | No | CRC values stored |
| Associated Firmware | BIOS | UEFI |

MBR structure: Boot Loader (446 bytes) | Disk Partition Table (64 bytes) | Magic Number `AA55` (2 bytes)

### File Systems

#### Windows
| File System | Use Case |
|-------------|---------|
| FAT | Legacy systems |
| NTFS | Modern Windows — see [[Windows Fundamentals]] for permissions detail |

Command: `fsutil fsinfo ntfsinfo C:` — view NTFS file system info

#### Linux
| File System | Use Case |
|-------------|---------|
| ext3 | Older Linux systems |
| ext4 | Standard modern Linux file system |

Commands: `mount | column -t` — view mounted file systems | `df -h` — view disk space allocation

#### macOS / iOS
- **APFS (Apple File System)** — default on modern Apple devices

### Boot Process — Linux
1. **BIOS/UEFI** — runs POST, executes MBR
2. **MBR** — loads GRUB
3. **GRUB** — executes the Linux kernel
4. **Kernel** — loads `/sbin/init`
5. **Init** — executes runlevel programs from `/etc/rc.d/rc*.d/`

| Init System | Description |
|-------------|-------------|
| SysV | Traditional boot system using runlevels |
| Systemd | Modern init system; flexible and robust |

Systemd unit types: `.service` | `.mount` | `.target`
Commands: `systemctl list-units` — list active units

### Boot Process — Windows
1. **BIOS/UEFI** — runs POST, executes MBR
2. **MBR** — executes Windows Boot Manager (WBM)
3. **Windows Boot Manager** — loads Windows OS Loader
4. **Windows OS Loader** — loads NT OS Kernel
5. **NT OS Kernel** — executes `smss.exe` and `csrss.exe`
6. **Winlogon** — `wininit.exe` reaches login screen
7. **Explorer** — `explorer.exe` runs after user login

---
## Related Concepts
- [[Memory Architecture]]
- [[Windows Fundamentals]]
- [[Linux Fundamentals]]
- [[Operating System Fundamentals]]

## Related Techniques
-

---
## References / Images
- BIOS vs UEFI comparison diagrams
- MBR structure diagram
- Linux SysV vs Systemd boot flow diagrams
- Windows boot process illustration
