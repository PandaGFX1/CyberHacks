Tags: #Status/Complete #Type/Knowledge #Context/Hardware #publish-me

---
## Overview
Operating Systems (OS) are software that control most functions of a computer, managing the interaction between users, applications, and hardware. They provide interfaces for user interaction, allocate resources, and ensure system stability and security.

---

## Terminology
| Term | Definition |
|------|------------|
| OS Kernel | Core component of the OS; manages interactions between users, applications, and hardware |
| OS Interface | Layer allowing users to interact with applications, system software, and hardware |
| Process | Executing instance of an application; OS manages its resources |
| Device Driver | Program allowing the OS to communicate with a device; acts as an interpreter |
| File System | Directory structure defining how data is named, stored, organized, and accessed |
| Disk Volume | Portion of a physical disk that the OS presents to users |
| Principle of Least Privilege | Users granted only the access needed to perform their tasks |
| DAC | Discretionary Access Control; ACLs set by the resource owner |
| MAC | Mandatory Access Control; set by administrator; users cannot modify |
| RBAC | Role-Based Access Control; access determined by assigned user roles |

---
## Core Concepts

### OS Architecture
| Component | Description |
|-----------|-------------|
| User | Person interacting with the OS via GUI or CLI |
| Application | Executable code performing specific tasks; also called programs or software |
| OS Interface | Bridges user interaction with system software and hardware |
| OS Kernel | Allocates resources, manages processes, and coordinates hardware access |
| Hardware | Physical components — mechanical, electronic, electrical |

### OS Responsibilities
| Function | Description |
|----------|-------------|
| Memory Management | Tracks and allocates primary memory to processes as needed |
| Processor Management | Allocates CPU to processes; deallocates when complete |
| Device Management | Tracks all devices; assigns them to processes as needed |
| File Management | Allocates and deallocates file storage resources |
| Security | Prevents unauthorized access using passwords and access controls |
| Job Accounting | Tracks time and resources used by jobs and users |
| Performance Control | Records delays between requests and responses |
| Error Detection | Produces dumps, traces, error messages, and debugging outputs |
| Software Coordination | Assigns compilers, interpreters, and utilities to users |

### OS Categories
| Category | Description |
|----------|-------------|
| Single-Tasking | Only one operation runs at a time |
| Multi-Tasking | Multiple operations run concurrently on a single system |
| Multiuser | Multiple users access a single OS simultaneously; common on mainframes |
| Client | Networked OS connecting to servers for shared resources |
| Server | OS designed for running services and sharing resources |
| Cluster | Grouped servers operating as one unit for load balancing |
| Distributed | Interconnected computers communicating over a shared network |

### User Account Types
| Account | OS | Description |
|---------|-----|-------------|
| Administrator | Windows | Privileged account with full system access |
| Root | Linux | Privileged account with full system access |
| Standard / Non-Privileged | Both | Limited access per Principle of Least Privilege |

### Access Control Models
| Model | Description |
|-------|-------------|
| DAC (Discretionary Access Control) | ACLs defined by the resource owner |
| MAC (Mandatory Access Control) | Access rules set by administrator; users cannot override |
| RBAC (Role-Based Access Control) | Access determined by the user's assigned role |

### Security Principles (DOD IA)
Core information assurance measures for protecting systems:

| Principle | Description |
|-----------|-------------|
| Integrity | Ensures data has not been tampered with |
| Availability | Ensures users have access to data and services when needed |
| Authentication | Verifies user identity via passwords, 2FA, biometrics, etc. |
| Confidentiality | Restricts data access to authorized users only |
| Non-Repudiation | Prevents users from denying actions performed on the system |

> These principles align with the CIA Triad — see [[Security Principles]]

### File System Management
| Component | Description |
|-----------|-------------|
| Physical Disk | Hardware storage medium |
| Disk Volume | Portion of disk presented to users by the OS |
| Directories | Containers for organizing files and data |
| Files / Data | Named items used to store information |
| Root Directory | Top-level directory; starting point of the file system hierarchy |

---
## Related Concepts
- [[Operating System Internals]]
- [[Boot and File Systems]]
- [[Memory Architecture]]
- [[Linux Fundamentals]]
- [[Windows Fundamentals]]
- [[Security Principles]]

## Related Techniques
-

## Related Tools
-

---
## References / Images
- OS architecture diagrams
- Process and memory management illustrations
- Access control and security model diagrams
