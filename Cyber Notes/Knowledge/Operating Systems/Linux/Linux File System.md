Tags: #Status/In-Progress #Type/Knowledge #Context/Linux #publish-me

---
## Overview
Linux file system management covers how data is stored, organized, and accessed on disk. This includes file system types, the inode data model, disk partitioning, mounting storage devices, and swap space configuration. Understanding these concepts is foundational for forensic investigation, privilege escalation, and system administration.

---
## Terminology
| Term | Definition |
|------|------------|
| Inode | Data structure storing file metadata — permissions, ownership, size, timestamps, and pointers to data blocks |
| Inode Table | Collection of inodes acting as a database for the Linux kernel to track every file and directory |
| Partition | A logical division of a physical disk into separate sections |
| Mounting | Assigning a storage partition or device to a directory in the file system so it can be accessed |
| Mount Point | The directory a partition is mounted to |
| Symlink | Symbolic link — a shortcut or reference pointing to another file or directory |
| Swap Space | Disk space used as overflow when physical RAM is fully utilized |
| Journaling | File system feature that logs changes before writing them, enabling recovery after crashes |
| fdisk | Disk management utility for creating, deleting, and managing partitions |
| /etc/fstab | Configuration file defining partitions and their mount options at boot |

---
## Core Concepts

### File System Types
Linux supports multiple file system formats suited to different use cases.

| File System | Description |
|-------------|-------------|
| ext2 | Older format with no journaling — low overhead, good for USB drives |
| ext3 | Adds journaling to ext2 — more reliable but slower |
| ext4 | Default on most modern Linux systems — journaling, large file support, good performance |
| Btrfs | Advanced features: snapshotting, built-in integrity checks — suited for complex storage |
| XFS | High performance and large file handling — best for high I/O environments |
| NTFS | Originally Windows; used for dual-boot systems or cross-platform external drives |

---

### File Types
Linux treats nearly everything as a file. The three primary file types:

| Type | Description |
|------|-------------|
| Regular File | Contains text (ASCII) or binary data — resides in directories |
| Directory | A special file acting as a container for other files |
| Symbolic Link (Symlink) | A shortcut or reference pointing to another file or directory |

Inodes store metadata for files and directories but do **not** store the filename or the actual data — they contain pointers to the data blocks on disk. The inode table is the kernel's database for every file on the system.

---

### Disk Management
The primary disk management tool in Linux is `fdisk`. Partitioning divides a physical drive into separate logical sections, each of which can use its own file system type.

| Command | Description |
|---------|-------------|
| `sudo fdisk -l` | List all disks and partitions with size and type info |
| `lsblk` | List block devices in a tree view |
| `df -h` | Show disk space usage for mounted file systems |
| `du -sh <dir>` | Show disk usage of a specific directory |

Other partitioning tools: `gpart`, `GParted` (GUI).

---

### Mounting
Mounting assigns a partition or storage device to a directory so it can be accessed like any other directory. Unmounting removes that association.

| Command | Description |
|---------|-------------|
| `mount` | List all currently mounted file systems |
| `sudo mount <device> <mountpoint>` | Mount a device to a directory |
| `sudo umount <mountpoint>` | Unmount a device (cannot unmount if in use) |
| `lsof` | List open files — useful to find what process is using a mounted device |

Example: `sudo mount /dev/sdb1 /mnt/usb`

#### /etc/fstab — Persistent Mounts
`/etc/fstab` defines which partitions are mounted automatically at boot and with what options.

Format: `<device> <mountpoint> <filesystem> <options> <dump> <pass>`

| Option | Description |
|--------|-------------|
| `rw` | Read and write |
| `ro` | Read only |
| `noauto` | Do not mount automatically at boot |
| `user` | Allow regular users to mount |

Example entry: `/dev/sdb1 /mnt/usb ext4 rw,noauto,user 0 0`

#### Mounting NFS Shares
NFS (Network File System) shares are mounted the same way as local devices.

`mount -F nfs <server_ip>:/nfs_share /mnt/local` — mounts a remote NFS share locally

---

### Swap Space
Swap space is used when available physical RAM is fully utilized. Inactive memory pages are moved to swap, freeing RAM for active processes. Swap should be kept separate from the main file system to prevent fragmentation.

**Security note:** Sensitive data may be temporarily stored in swap — encrypt swap space on sensitive systems.

| Command | Description |
|---------|-------------|
| `mkswap <device>` | Prepare a device or file to be used as swap |
| `swapon <device>` | Activate swap space |
| `swapon --show` | Display active swap spaces |
| `free -h` | Show memory and swap usage |

Swap is also used for **hibernation** — the system saves its state (open applications and processes) to swap, powers off, and restores that state on next boot.

---
## Related Concepts
- [[Linux Fundamentals]]
- [[Linux System Management]]
- [[Boot and File Systems]]
- [[Operating System Internals]]

## Related Techniques
-

---
## References / Images
- `man fdisk`, `man mount`, `man fstab`
- Linux FHS documentation
