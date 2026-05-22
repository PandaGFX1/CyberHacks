Tags: #Status/Complete #Type/Knowledge #Context/Hardware #publish-me

---
## Overview
x86 architecture is a family of instruction set architectures (ISA) developed by Intel, defining how a CPU executes instructions, manages memory, and interacts with software. It is one of the most widely used architectures in modern computing and is foundational for understanding low-level programming and exploitation.

---

## Terminology
| Term                               | Definition                                                                |
| ---------------------------------- | ------------------------------------------------------------------------- |
| ISA (Instruction Set Architecture) | Defines the set of instructions a CPU can execute                         |
| Register                           | Small, high-speed storage location inside the CPU                         |
| Stack                              | Region of memory operating in Last-In, First-Out (LIFO) order             |
| EFLAGS                             | Register storing status flags from ALU operations (Zero, Carry, Overflow) |
| EBP (Base Pointer)                 | Points to the base of the current stack frame                             |
| ESP (Stack Pointer)                | Points to the top of the current stack                                    |

---
## Core Concepts

### General Purpose Registers (GPRs)
Used for arithmetic, logic, and data movement operations.

| Register | Common Use                                  |
| -------- | ------------------------------------------- |
| EAX      | Accumulator; stores return values           |
| EBX      | Base register; general use                  |
| ECX      | Counter; used in loops                      |
| EDX      | Data; used in I/O and multiplication        |
| ESI      | Source index; string/memory operations      |
| EDI      | Destination index; string/memory operations |
| EBP      | Base pointer; marks base of stack frame     |
| ESP      | Stack pointer; tracks top of stack          |

### Segment Registers
Used in segmented memory models to point to different memory segments.

| Register   | Segment                      |
| ---------- | ---------------------------- |
| CS         | Code Segment                 |
| DS         | Data Segment                 |
| SS         | Stack Segment                |
| ES, FS, GS | Additional/extended segments |

### Control & Status Registers
- **EFLAGS** – Stores status flags from ALU operations (Zero Flag, Carry Flag, Overflow Flag)
- **Control Registers (CR0–CR4)** – Manage CPU modes and memory management (e.g., paging)

### Instruction Types

#### Arithmetic & Logic
Perform mathematical and logical operations.

| Instruction          | Operation                  |
| -------------------- | -------------------------- |
| ADD / SUB            | Addition / Subtraction     |
| INC / DEC            | Increment / Decrement      |
| IMUL / IDIV          | Signed multiply / divide   |
| AND / OR / XOR / NOT | Bitwise logical operations |

#### Data Movement
Move data between registers, memory, and the stack.

| Instruction | Operation                              |
| ----------- | -------------------------------------- |
| MOV         | Copy data from source to destination   |
| PUSH / POP  | Add/remove data from the stack         |
| LEA         | Load effective address into a register |

#### Control Flow
Control the order of execution.

| Instruction | Operation                                 |
| ----------- | ----------------------------------------- |
| CMP         | Compare two values (sets EFLAGS)          |
| JMP         | Unconditional jump                        |
| JE / JNE    | Jump if equal / not equal                 |
| CALL        | Jump to function and store return address |
| RET         | Return execution to caller                |

### The Stack
A region of memory (in RAM) used for temporary data storage during execution.
- Operates in **Last-In, First-Out (LIFO)** order
- Managed using **ESP** (stack pointer) and **EBP** (base/frame pointer)
- **PUSH** – Adds data to the top of the stack
- **POP** – Removes data from the top of the stack

### Subroutines (Functions)
Reusable blocks of code called and returned using the stack.
- **CALL** – Jumps to function and stores return address on the stack
- **RET** – Pops return address from stack and resumes execution
- Stack stores return addresses, function arguments, and local variables

> [!WARNING] Security Note
> The stack's predictable structure makes it a primary target for exploitation techniques such as buffer overflows and return-oriented programming.

---
## Related Concepts
- [[CPU Architecture]]
- [[Memory Architecture]]
- [[Data Representation]]
- [[Multi-Processing]]
- [[ARM Processor Architecture]]

## Related Techniques
- [[Buffer Overflow]]
- [[Stack-Based Exploitation]]
- [[Return-Oriented Programming (ROP)]]
- [[Integer Overflow]]

## Related Tools
- 

---
## References / Images
- x86 register diagram
- Stack frame visualization