Tags: #CompArch #Terminology 

X86 Architecture – Instruction set architecture series for computer processors; Developed by Intel; Defines how a processor handles and executes different instructions passed from the Operating System (OS) and Software Programs 

Registers 

General Purpose Registers – Used most of the time; Most of the instructions are preformed within GPR's. Has 8 registers (EAX, EBX, ECX, EDX, EBP, ESI, EDI, ESP) 

Segment Registers – Point to different segments within memory. Each 16-bit segment register refers to a place in memory where data storage or code execution occurs. 6 segment registers (CS, DS, SS, ES, FS, GS) 

Control Registers – Also known as EFLAGS; Special Purpose Registers (SPR's) that hold information about the most recently performed Arithmetic and Logic Unit operation. Based on the outcome, specific tasks can be performed. 

Instruction Types in x86 

Arithmetic and Logic Instructions – Focus on math and logical operations. Basic math along with logic gates are focused here. AND, OR, XOR, and NOT are the primary gates used. Instructions used: Add, Sub, Inc/Dec, Imul, Idiv 

Data Movement Instructions – Moves data from one place to another. Locations of data can be either in memory or in the registers. Common Instructions of movement: MOV, PUSH, POP, Load Effective Address (LEA) 

Control Flow Instructions – How statements, instructions, or system calls are ordered. Ensures everything flows in an orderly manner. Includes the compare and jump operations. Uses "if, then" statements. 

X86 Stack 

THE Stack – Area in memory used for short-term storage of information by the CPU and the program. Located in RAM. 

Push – Push instruction places its operand onto the top of the hardware supported stack in memory 

Pop – Pop instruction removed the 4-byte data element from the top of the hardware-supported stack into the specified operand 

X86 Subroutine  

Integer Overflow 

Buffer Overflow 

Stack Overflow