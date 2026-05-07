Tags: #Status/Complete #Type/Knowledge #Context/Hardware #publish-me

---
## Overview
ARM (Advanced RISC Machine) is a CPU architecture widely used in mobile devices, embedded systems, and low-power computing environments. ARM designs the architecture but does not manufacture the physical chips. ARM processors are based on the Reduced Instruction Set Computer (RISC) model, which focuses on executing smaller, simpler instructions at high speed.

---

## Terminology
| Term | Definition |
|------|------------|
| RISC (Reduced Instruction Set Computer) | CPU design philosophy that uses a smaller set of simple instructions to achieve faster execution |
| Register | Small, fast storage location inside the CPU |
| General Purpose Register (GPR) | Registers used for general computations |
| Special Purpose Register (SPR) | Registers used for specific control or system functions |

---
## Core Concepts

### Benefits of ARM Architecture
- High performance with strong energy efficiency
- Lower heat production compared to many other architectures
- Built-in security features
- Large ecosystem with widespread industry support

### Registers
ARM processors contain multiple registers used for storing data and controlling execution.
- Typically includes **37 total registers**, with **30 General Purpose Registers (GPRs)**
- Registers are typically **32 bits in length**

#### Special Purpose Registers
- **MSP (Main Stack Pointer)**
- **PSP (Process Stack Pointer)**
- **LR (Link Register)** – Stores return address for subroutines
- **PC (Program Counter)** – Points to the next instruction
- **CPSR (Current Program Status Register)**

#### Current Program Status Register (CPSR)
A 32-bit register that holds information about the current state of the processor.
- Bits **31–28** → Condition flags (status of operations)
- Bits **27–8** → Typically unused/reserved
- Bits **7–0** → Processor state and control information

### Modes of Operation
ARM processors operate in different modes depending on execution context:
- **User Mode** – Normal execution mode for applications
- **FIQ (Fast Interrupt Request)** – High-priority interrupt handling
- **IRQ (Interrupt Request)** – General-purpose interrupt handling
- **Supervisor Mode** – Used by the operating system
- **Abort Mode** – Triggered on memory access errors
- **Undefined Mode (UND)** – Triggered by undefined instructions
- **System Mode** – Privileged mode for OS-level operations

### Instruction States
- **ARM State** – 32-bit instructions; more flexible and complex
- **Thumb State** – 16-bit (sometimes 32-bit) instructions; more compact and efficient

Thumb instructions are generally smaller, improving performance and memory usage.

### Flow Control
- **Branch Instructions** – Control the flow of execution within a program

#### Conditional Branching
- Allows execution based on conditions (similar to "if-then" logic)
- Implemented using condition codes attached to instructions

### Stack Operations
The stack is a memory region used for temporary data storage during execution.
- Follows **Last In, First Out (LIFO)** structure
- Used for storing local variables, return addresses, and function data

#### Stack Instructions
- **PUSH** – Adds data to the stack
- **POP** – Removes data from the stack
- Stack typically grows by **32 bits per entry**
- Growth direction (up/down) depends on implementation

#### Stack Pointer
- Points to the top of the stack
- Determines where the next data value will be stored

### Subroutines
Subroutines are reusable blocks of instructions used to perform repeated tasks.
- Used when the same operation is performed on different data
- Implemented using **branch and link instructions**
- Return address is typically stored in the **Link Register (LR)**

---
## Related Concepts
- [[CPU Architecture]]
- [[x86 Architecture]]

## Related Techniques
- 

## Related Tools
- 

---
## References / Images
- ARM architecture diagrams (register layout, instruction pipeline)
- Official ARM documentation