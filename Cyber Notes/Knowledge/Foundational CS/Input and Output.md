Tags: #Status/Complete #Type/Knowledge #Context/Hardware #publish-me

---
## Overview
Input and Output (I/O) refers to how a computer system communicates with external devices and transfers data between hardware components. It includes data transfer methods, communication protocols, and hardware interfaces.

---

## Terminology
| Term                       | Definition                                                     |
| -------------------------- | -------------------------------------------------------------- |
| Bus                        | Logical pathway for data transfer between components           |
| Trace                      | Physical wiring on the motherboard                             |
| Bus Master                 | Device that currently controls the bus                         |
| Bus Arbiter                | Component that determines which device becomes the bus master  |
| Interface                  | Connection point between an external device and the system bus |
| Interrupt                  | Signal from hardware requesting CPU attention                  |
| Exception                  | Internal event triggered during execution                      |
| DMA (Direct Memory Access) | Transfers data directly to/from memory without CPU involvement |

---
## Core Concepts

### Bus Arbitration
Bus arbitration determines which device gains control of the system bus.

| Type                    | Description                                             |
| ----------------------- | ------------------------------------------------------- |
| Centralized Arbitration | Single arbiter controls access                          |
| Daisy Chain             | Devices share a line; priority based on position        |
| Independent Request     | Each device has its own request line                    |
| Polling                 | Priority rotates dynamically                            |
| Distributed Arbitration | Devices collectively determine access using identifiers |

### Bus Communication
- **Serial Communication** – One bit at a time; asynchronous (uses handshaking)
- **Parallel Communication** – Multiple bits at once; synchronous (uses clock signal); limited to short distances

### Bus Lines
| Line         | Function                  |
| ------------ | ------------------------- |
| Address Line | Specifies memory location |
| Data Line    | Transfers data            |
| Control Line | Sends commands            |
| Power Line   | Supplies power            |

### I/O Control Methods
| Method                     | Description                                                      |
| -------------------------- | ---------------------------------------------------------------- |
| Programmed I/O             | CPU continuously checks device status                            |
| Interrupt-Driven I/O       | Device signals CPU when ready                                    |
| Direct Memory Access (DMA) | Transfers data directly to/from memory without CPU involvement   |
| Channel I/O                | Uses dedicated hardware for data transfer (common in mainframes) |

### Direct Memory Access (DMA)
DMA allows devices to transfer data directly to memory without CPU involvement.

1. Device sends request to DMA controller
2. DMA requests CPU to pause
3. CPU grants access
4. DMA transfers data between device and memory

Common in devices like USB and sound cards.

### Interrupts and Exceptions
| Type                         | Description                                 |
| ---------------------------- | ------------------------------------------- |
| Trap                         | Intentional, software-generated interrupt   |
| Fault                        | Recoverable error                           |
| Abort                        | Severe, non-recoverable error               |
| Maskable Interrupt           | Can be ignored by the CPU                   |
| Non-Maskable Interrupt (NMI) | Cannot be ignored; used for critical errors |

### System Architecture (x86 Example)
- **Northbridge** – Handles communication with memory
- **Southbridge** – Handles I/O devices
- Bridges act as communication translators between components

### Common Interfaces
| Interface | Purpose                                                 |
| --------- | ------------------------------------------------------- |
| SCSI      | Multi-device parallel interface (older storage systems) |
| SATA      | Connects storage devices                                |
| PCIe      | High-speed expansion bus                                |
| USB       | General-purpose peripheral interface                    |
| RS-232    | Serial communication standard                           |

### Display Interfaces
| Interface   | Description                           |
| ----------- | ------------------------------------- |
| VGA         | Analog video                          |
| DVI         | Digital video                         |
| HDMI        | Audio + video (modern standard)       |
| DisplayPort | High bandwidth, multi-display support |

---
## Related Concepts
- [[CPU Architecture]]
- [[Memory Architecture]]

## Related Techniques
- 

## Related Tools
- 

---
## References / Images
- Bus diagrams
- DMA flow diagrams
- Interface comparison charts