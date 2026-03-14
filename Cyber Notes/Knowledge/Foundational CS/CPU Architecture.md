
**Tags:** #Status/Complete #Type/Knowledge #publish-me

---
## Overview  
CPU architecture defines how a computer’s CPU processes instructions, stores data, and interfaces with memory.
  
## Key Concepts / Terminology  
- Boolean Value - Value that represents an output of either higher (1) or low (2)
- Logic Gates - How Engineers implement logic into a digital circuit (hardware) 
- Instruction Set Architecture (ISA) - Defines operations the CPU can execute; Can be thought of as CPU Architecture
- General Purpose Register (GPR) - Hold temporary values while performing different operations.
- Registers - Small, fast storage inside of the CPU (PC, CIR, MDR, MAR, Accumulator)

## Components / Sections
- Logic gates are comprised of a few different values that determine how a signal flows through a circuit  
	- An "And" Gate has to have the same value to result to true (1 & 1 = 1) 
	- An "Or" Gate has to have at least one true value (1 || 0 = 1; 1 || 1 = 1)
	- A "XOR" Gate must have two different values to result to true (1 ^ 0 = 1; 0 ^ 1 = 1; 1 ^ 1 = 0)
	- A "Not" Gate can be added to any of the above gates and simply inverses the answer !(1 ^ 0 = 0) !(1 & 1 = 0)

- Instruction Set Architecture (ISA) consists of Opcode and Operand
- A Little Man Computer is an instruction MODEL of a computer and includes basic features such as a GPR and accumulator
	- Also includes a buffer which is where data just passes through. It stays the same while passing through and is essentially a channel.

- Main Registers (Common in different Architecture's)
	- Program Counter (PC) is a 2-digit Special Purpose Register (SPR) that points the Control Unit (CU) to the memory address of the next instruction; Known as the locator
	- The Current Instruction Register (CIR) is a 3-digit SPR used by the decoder to decode the instruction 
	- The Memory Address Register (MAR) is a 2-digit SPR used to point to the correct memory address to read or write -- Address points to another address 
	- The Memory Data Register (MDR) is a 3-digit SPR used to hold data to be read from or written to the arithmetic and logic unit (ALU) or memory. 
	- The Accumulator is a register for the short-term. Intermediate storage of ALU data in a computer's CPU. Basically where the Input/Output is held for the time being while it's being worked on.

---
  
## Related Concepts  
- [[Memory Architecture]]
- [[Input and Output]]
- [[ARM Processor Architecture.]]
  
## Related Techniques  
- Link to Technique here  
*(e.g., SQL Injection, Kerberoasting, etc.)*  
  
## References / Images  
- Link to image or attachment
- External references (websites, PDFs)