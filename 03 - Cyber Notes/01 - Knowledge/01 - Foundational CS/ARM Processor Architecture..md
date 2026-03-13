
**Tags:** #Knowledge #Domain #Subdomain (e.g., #Windows #CompArch #Networking)  

---
## Overview  
High-level explanation of the topic. Think 2-3 sentences summarizing it.  
  
## Key Concepts / Terminology  
- Advanced RISC Machine (ARM) - Chip Processor based on the RISC; Used in smaller based devices (Phones, Wearable devices, etc.) 
- Reduced Instruction Set Computer (RISC) - Microprocessor with the purpose breaking down big tasks to many smaller tasks (instruction sets) to preform at a faster rate.
## Components / Sections
- The ARM CPU Architecture comes with a few added benefits, such as:
	- Integrated Security
	- High Performance & Energy Efficiency
	- Large Ecosystem for global support 
	- Pervasive across markets and locations 
	- Less Heat Production (Smaller size/footprint)

- The ARM CPU Architecture is a little different than other CPU's.  (Check CPU Architecture for more information)
	- The GPR's within the ARM CPU take up 30 of the 37 registers.
	- Special Purpose Registers within the ARM Architecture consist of:
		- Main Stack Pointer (MSP) - Used by the OS kernel and exception handlers (EX: Interrupts).
		- Process Stack Pointer (PSP) - Used exclusively in Thread Mode for application tasks.
		- Link Register (LR / R14) - Hardwired into branch and link (BL) instructions, automatically storing return addresses.
		- Program Counter (PC / R15) - Specialized for PC-relative addressing and points 2 instructions ahead in ARM state. 
		- Current Program Status Register - 32-bit Register used to record/hold information about the state of the program that is currently running.
		- Stack Pointer (SP / R13) - Hardcoded into the PUSH and POP instructions in Thumb mode

- The ARM Architecture also has various different Modes of Operation consisting of:
	- User Mode - Standard program execution state. Used by MOST applications 
	- Faster Interrupt (FIQ) - Supports data transfers or channel processes 
	- Interrupt (IRQ) - Used for general purpose interrupts
	- Supervisor Mode - Protected for the operating system 
	- Abort Mode - This mode is entered after a prefetch abort 
	- Undefined (UND) - Entered when an undefined instruction is executed 
	- System Mode - Privileged user mode for the operation system 

- Examples or definitions  
- Subsection Name  
- Bullet points with details  

---
  
## Related Concepts  
- [[CPU Architecture]]  
- [[Link to another Knowledge note]]  
  
## Related Techniques  
- [[Link to Technique note]]  
*(e.g., SQL Injection, Kerberoasting, etc.)*  
  
## References / Images  
- [[Link to image or attachment]]  
- External references (websites, PDFs)