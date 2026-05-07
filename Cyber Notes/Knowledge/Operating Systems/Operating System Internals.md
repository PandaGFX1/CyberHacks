Tags: #Status/Complete #Type/Knowledge #Context/Hardware #publish-me

---
## Overview
This note covers OS internals including virtual memory management, device driver architecture, and virtualization components for both Windows and Linux systems. These concepts are foundational for understanding how operating systems manage hardware resources, memory, and virtualized environments.

> [!INFO]- Backlog
> When content grows, split into separate notes — `Virtual Memory.md`, `Device Drivers.md`, and `Virtualization.md`

---
## Terminology
| Term | Definition |
|------|------------|
| Virtual Memory | OS feature compensating for physical memory shortages by temporarily moving pages to disk |
| Paging / Swapping | Copying virtual memory pages between disk and RAM |
| Thrashing | Excessive swapping causing severe performance degradation |
| Page Frame | Fixed-size block of physical memory (typically 4KB) |
| PTE (Page Table Entry) | Maps a virtual page to a physical page frame |
| Driver | Software allowing the OS and hardware to communicate |
| Hypervisor (VMM) | Software that creates and manages Virtual Machines |
| Binary Rewriting | Technique for intercepting and modifying instructions in virtualization |

---
## Core Concepts

### Virtual Memory

#### How It Works
- Divides each process into small chunks called **pages** (typically 4KB per page frame)
- Maps virtual addresses used by processes to physical RAM addresses
- Pages not actively used are moved to a **swap/page file** on disk

#### Key Structures
| Structure | Purpose |
|-----------|---------|
| Page Frame Tables | Map virtual pages to physical memory locations |
| Page Directories | Point to specific page tables |
| Page Tables | Contain Page Table Entries (PTEs) |
| PTE | Contains page address; maps virtual to physical page frame |
| Swap / Page File | Disk space used for memory not currently needed in RAM |

#### Thrashing
- Occurs when excessive swapping dominates CPU time
- Results in severe performance degradation
- Caused by insufficient RAM for active working sets

### Device Drivers — Windows

| Driver Type | Description |
|-------------|-------------|
| Function Driver | Communicates directly with the hardware device |
| Filter Driver | Performs auxiliary processing alongside the function driver |
| Software Driver | Runs in kernel mode; may not require direct hardware access |

#### Driver Routines
| Routine | Description |
|---------|-------------|
| Initialization Routine | Registers driver routines when module is loaded |
| Add-Device Routine | Triggered when a Plug and Play device is detected |
| Start I/O Routine | Initiates data transfer to/from the device |
| Dispatch Routine | Main function for I/O operations; called by the OS |
| ISR (Interrupt Service Routine) | Triggered by a hardware interrupt |
| DPC (Deferred Procedure Call) | Ends ISR processing and returns control to the OS |

### Device Drivers — Linux
- Privileged, memory-resident routines for low-level hardware handling
- All devices appear in the `/dev` directory
- Devices are treated as files; file operations mirror Windows dispatch routines

| Device Type | Description |
|-------------|-------------|
| Block Device | 512-byte chunks, random access (e.g., disk drives) |
| Character Device | Unbuffered direct access to hardware |

### Virtualization

#### Virtual Machine Monitor (VMM) / Hypervisor
Software that creates and manages Virtual Machines by acting as the interface between guest OS and physical hardware.

| VMM Type | Description |
|----------|-------------|
| Hypervisor VMM | Maximum control and performance; uses its own drivers |
| Host OS VMM | Installed on existing OS; I/O redirected to VM |
| Service OS VMM | Combines hypervisor robustness with host OS flexibility |

#### Guest OS Virtualization Techniques
| Technique | Description |
|-----------|-------------|
| Virtualization Application | Software layer enabling VM creation |
| Binary Rewriting | Intercepts and modifies instructions for compatibility |
| Shared Kernel Virtualization | Guest OS shares the host kernel |

### Root File System
- Contains all libraries, files, and utilities required for OS functionality
- Foundation of the OS directory structure

---
## Related Concepts
- [[Memory Architecture]]
- [[Boot and File Systems]]
- [[Linux Fundamentals]]
- [[Windows Fundamentals]]

## Related Techniques
-

## Related Tools
-

---
## References / Images
- Memory management diagrams (paging, swapping)
- Windows and Linux driver stack illustrations
- Hypervisor and guest OS virtualization diagrams
