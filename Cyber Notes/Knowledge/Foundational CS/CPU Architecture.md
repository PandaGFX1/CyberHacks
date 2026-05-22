Tags: #Status/Complete #Type/Knowledge #Context/Hardware #publish-me

---
## Overview
CPU architecture defines how a computer's central processing unit (CPU) executes instructions, processes data, and communicates with memory and input/output systems. It serves as the foundation for how software interacts with hardware.

---

## Terminology
| Term                               | Definition                                                                            |
| ---------------------------------- | ------------------------------------------------------------------------------------- |
| Boolean Value                      | Represents a binary state: true (1) or false (0)                                      |
| Logic Gates                        | Fundamental building blocks of digital circuits that perform basic logical operations |
| Instruction Set Architecture (ISA) | Defines the set of instructions a CPU can execute and how they are processed          |
| Register                           | Small, high-speed storage location inside the CPU used to hold data temporarily       |
| General Purpose Register (GPR)     | Registers used for general computations and temporary data storage                    |

---
## Core Concepts

### Logic Gates
Logic gates control how signals are processed within digital circuits.
- **AND Gate** – Outputs 1 only if both inputs are 1
- **OR Gate** – Outputs 1 if at least one input is 1
- **XOR Gate** – Outputs 1 if inputs are different
- **NOT Gate** – Inverts the input (1 → 0, 0 → 1)

These gates form the foundation of the Arithmetic Logic Unit (ALU) and all digital computation.

### Instruction Set Architecture (ISA)
The ISA defines how a CPU operates at a fundamental level.
- Composed of:
  - **Opcode** – The operation to perform
  - **Operand** – The data the operation acts on
- Acts as the interface between software and hardware

### Little Man Computer (LMC) Model
A simplified model used to understand how a CPU works.
- Represents a basic computer with registers (including an accumulator), memory, and an instruction processing cycle
- Includes a **buffer**, which acts as a temporary pathway for data movement
- Useful for visualizing instruction execution and data flow

### CPU Registers
Registers are critical for CPU operation and exist in most architectures.

| Register                           | Function                                                            |
| ---------------------------------- | ------------------------------------------------------------------- |
| Program Counter (PC)               | Points to the memory address of the next instruction to be executed |
| Current Instruction Register (CIR) | Holds the instruction currently being decoded and executed          |
| Memory Address Register (MAR)      | Stores the address in memory that the CPU wants to access           |
| Memory Data Register (MDR)         | Holds the data being read from or written to memory                 |
| Accumulator                        | Stores intermediate results from the ALU during processing          |

---
## Related Concepts
- [[Memory Architecture]]
- [[Input and Output]]
- [[ARM Processor Architecture]]
- [[x86 Architecture]]

## Related Techniques
- 

## Related Tools
- 

---
## References / Images
- CPU architecture diagrams (fetch-decode-execute cycle, register layout)
- Networking textbooks and vendor documentation