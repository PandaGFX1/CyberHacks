Tags: #CompArch #Terminology 

ARM Processor Architecture 

ARM – Stands for Advanced RISC Machine. ARM is a chip processor, but they don't actually make their own chips. 

- Majority of mobile phones and wearable devices use ARM based architectures 
    
- ARM Processor is based on the RISC (Reduced Instruction Set Computer) 
    

RISC – Works by preforming smaller instructions but at higher speeds, which allows them to be faster 

Reduced Instruction Set Computer (RISC) - Microprocessor; Purpose is to have smaller instruction sets so that it can perform at a faster rate. RISC breaks it down into many smaller tasks 

Benefits of ARM CPU Architecture: 

- Integrated Security 
    
- High Performance + Energy Efficiency 
    
- Large Ecosystem for global support 
    
- Pervasive across markets and locations 
    
- Less Heat Production 
    

Registers 

General Purpose Registers – ARM has 37 registers; 30 are General Purpose Registers (GPR) 

ARM Registers are 32 bits in length 

Special Purpose Register – MSP, PSP, LR, PC, and CPSR 

Current Program Status Register (CPSR) 

Current Program Status Register (CPSR) - 32 bit register used to record/hold information about the state of the program that is currently running. 

Bits go from 31 and end with 0 on the left. 31-28 represent the condition code. 27-8 are usually unused. 7-0 store information about the processor state. 

Modes of Operation 

User Mode – Standard program execution state. Used by MOST applications 

Fast Interrupt (FIQ) - Supports data transfers or channel processes 

Interrupt (IRQ) - Used for general purpose interrupts 

Supervisor Mode – Protected for the operating system 

Abort Mode – This mode is entered after a prefetch abort 

Undef (UND) - Entered when an undefined instruction is executed 

System Mode – Privileged user mode for the operation system 

ARM Instruction State 

Thumb – Typically 16 bits but can be 32 bits. On average 65% the size of ARM code since its shorter; Faster performance 

ARM: 32 bits. Does not run as fast as Thumb due to longer code, but coding can be more complex 

ARM Flow Controls 

Branch Instructions – Controls the flow of a program 

Conditional Branches 

Conditional Branch – List of codes that allows the flow of the program to become more flexible. Constructed by adding the conditional suffix to the basic branch instruction 

- Works as an "if, then" statement 
    

ARM Stack 

The Stack – Memory region used by the program/process. Part of the memory that gets allocated when a new process is created. Stores temporary data such as local variables of some function – Managed as Last In, First Out (LIFO) data structures 

PUSH/POP - Instructions used to interact with the stack 

- Stacks grows when 32 bits of data are placed on the stack 
    
- Can grow up or down depending on the way in which it's implemented 
    

Stack Pointer – Determines the location that the newest 32 bits of data will be placed 

ARM Subroutine 

Subroutine – Certain set of instructions that is used to help preform repetitive function within a program. - If the same task is preformed continually, but on different sets of data, then a subroutine will be used 

- Subroutines are implemented using branch and move instructions