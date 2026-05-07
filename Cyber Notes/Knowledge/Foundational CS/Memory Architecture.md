Tags: #Status/Complete #Type/Knowledge #Context/Hardware #publish-me

---
## Overview
Memory architecture defines how data is stored, accessed, and managed across different types of memory in a computer system. It directly impacts system performance, latency, and data throughput.

---

## Terminology
| Term                   | Definition                                                    |
| ---------------------- | ------------------------------------------------------------- |
| Latency                | Time between a request and data delivery                      |
| Throughput (Bandwidth) | Rate of data transfer (bits per second)                       |
| Buffering              | Temporary storage of data during transfer                     |
| Cache Hit              | Data found in cache; no need to access main memory            |
| Cache Miss             | Data not in cache; must be fetched from main memory           |
| Temporal Locality      | Recently accessed data is likely to be reused                 |
| Spatial Locality       | Data near recently accessed locations is likely accessed next |

---
## Core Concepts

### Memory Hierarchy
Memory types are organized by speed, cost, and volatility. More volatile = faster but loses data without power.

| Level | Type                                  | Volatile? |
| ----- | ------------------------------------- | --------- |
| 1     | Registers                             | Yes       |
| 2     | Cache                                 | Yes       |
| 3     | RAM                                   | Yes       |
| 4     | ROM                                   | No        |
| 5     | Secondary Storage (HDD/SSD)           | No        |
| 6     | External Storage (USB, Optical, Tape) | No        |

### RAM vs ROM
| Feature    | RAM              | ROM              |
| ---------- | ---------------- | ---------------- |
| Volatility | Volatile         | Non-volatile     |
| Speed      | Fast read/write  | Slower writes    |
| Use        | Active processes | Firmware storage |

### SRAM vs DRAM
| Feature          | SRAM           | DRAM               |
| ---------------- | -------------- | ------------------ |
| Speed            | Faster         | Slower             |
| Cost             | More expensive | Cheaper            |
| Refresh Required | No             | Yes                |
| Use              | Cache memory   | Main system memory |

### Types of ROM
| Type   | Description                                      |
| ------ | ------------------------------------------------ |
| PROM   | Programmable once                                |
| EPROM  | Erased with UV light; must be physically removed |
| EEPROM | Electrically erasable; reprogrammable in-circuit |

### Cache Memory
High-speed memory sitting between the CPU and RAM that reduces access time to frequently used data.

- **Cache Hit** – Data found in cache; fast retrieval
- **Cache Miss** – Data not in cache; fetched from main memory
- **Temporal Locality** – Recently accessed data is reused soon
- **Spatial Locality** – Nearby data is likely accessed together

### Disk Performance Metrics
- **Seek Time** – Time to move read/write head to correct track
- **Rotational Latency** – Time for sector to rotate under the head
- **Transfer Time** – Time to read/write the data
- **Spin-Up Time** – Time for disk to reach operating speed

> Disk Access Time = Seek Time + Rotational Latency + Transfer Time (+ Spin-Up if starting)

### Secondary Storage

#### Hard Disk Drives (HDD)
- Magnetic storage with spinning platters
- Mechanical components → slower but cheaper

| Structure | Description                           |
| --------- | ------------------------------------- |
| Tracks    | Concentric circles on a platter       |
| Sectors   | Smallest unit (typically 512B or 4KB) |
| Clusters  | Groups of sectors                     |

#### Solid State Drives (SSD)
- No moving parts; uses flash memory
- Faster and more reliable than HDDs

#### RAID (Redundant Array of Independent Disks)
Combines multiple drives for performance and/or redundancy.

| RAID Level | Strategy             | Fault Tolerance   |
| ---------- | -------------------- | ----------------- |
| RAID 0     | Striping             | None              |
| RAID 1     | Mirroring            | 1 drive           |
| RAID 5     | Striping + Parity    | 1 drive           |
| RAID 6     | Double Parity        | 2 drives          |
| RAID 10    | Mirroring + Striping | 1 per mirror pair |

### External Storage
Storage outside the main system — major attack vector, especially in air-gapped environments.

| Type                   | Description                               |
| ---------------------- | ----------------------------------------- |
| Magnetic Tape          | Sequential access, low cost, archival use |
| Optical Media          | CD/DVD/Blu-ray; laser-based storage       |
| SD Cards / Flash Media | Solid-state portable storage              |

> [!WARNING] Security Note
> Physical media is a significant attack vector. A U.S. military breach was caused by an infected USB device that spread malware across classified networks.

---
## Related Concepts
- [[CPU Architecture]]
- [[Data Representation]]
- [[Input and Output]]

## Related Techniques
- 

## Related Tools
- 

---
## References / Images
- Memory hierarchy diagram
- Cache structure visuals
- RAID layout diagrams