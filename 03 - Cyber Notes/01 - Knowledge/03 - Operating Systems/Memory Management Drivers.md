Tags: #OS #Terminology

Virtual Memory 

Virtual Memory – A feature of an operating system that enables a computer to be able to compensate shortages of physical memory by transferring pages of data from RAM to disk storage – Done temporarily 

Mapping – Process of translating virtual addresses into real addresses 

Paging/Swapping – Copying of virtual pages from disk to main memory 

Virtual Memory Management 

Virtual Memory Management – Uses concept known as paging to divide each process into small chunks or pages 

Page Frame Size – It is 4 Kb in size – Also called Process Block Size 

Thrashing – Excessive swapping which leads to slow disk access and overall poor system performance 

Virtual Memory Implementation 

Page Frame Tables – Tables that are used to map what goes where 

Virtual Memory Implementation – Commonly implemented by using virtual addresses, page directories, page tables, and a swap/page file 

Virtual Addresses – Every processes identifies all as virtual addresses. These virtual addresses are usable by the process's resources in user mode 

Page Directories – Contains page directory entries that are used as pointed to a specific page table 

Page Tables – Contains Page Table Entries (PTE)  

PTE – PTE contains a specific address, known as a page. Pages identify Page Frame Address of the data being sought 

Swap/Page File – Uses physical disk space to store memory data that is not actively being using in RAM to make room for something that is active 

Windows Device Drivers 

Driver – Software component that lets an OS and a device talk 

Function Driver – Driver in the stack that communicates directly with the device 

Filter Driver – Drivers that preform auxiliary processing 

Software Driver – Always runs in Kernal mode – Doesn't always need kernel mode data and resources 

Initialization Routine – Called when the Linux Kernal Module (LKM) is loaded and is used to register the rest of the driver's routines with the OS 

Add-Device Routine – Drivers that support Plug and Play (PnP) (such as a mouse) implement an add-device routine to send a driver a notification whenever a new device is detected 

Start I/O Routine – Used to initiate data transfer to or from a device 

Dispatch Routine – Started by the OS when called upon to preform I/O operations; main function of a device driver 

Interrupt Service Routine (ISR) - Scheduled by the kernel upon device interrupt to transfer control to the driver's ISR 

Deferred Procedure Call (DPC) - Used to control ISRs. Once an ISR is done, the DPC ends the interrupt and returns to normal   

Linux Device Drivers 

Linux Kernel Device Drivers – A shared library of privileged, memory resident, low level hardware handling routines 

Block Device – Typically 512 bytes in size – Provides access to devices that transfer randomly accessible data in fixed-size blocks (disk drives) 

Character Device – Provides unbuffered, direct access to hardware devices 

Device Naming Routine – Device files are located in /dev folder.  

File Operations – Routines similar to Windows dispatch routines. Devices are treated as files and use standard system calls to communication 

Virtual Machine Monitor (VMM) 

Virtual Machine Monitor (VMM) - Master control program with highest privilege. Manages one or multiple Guest OS's.- Interface between guest OS and the hardware 

Hypervisor VMM – Provides the MOST control, FLEXIBILITY, and PREFORMANCE. - Relies on its own drivers 

Host OS VMM – Installed in an existing, running computer. - Runs alongside the host OS and I/O are redirected to virtual machine 

Service OS VMM – Combines robustness of hypervisor with flexibility of host. - Runs as a component of the hypervisor in a separate VM 

Guest Operating System Virtualization 

Virtualization Application -  

Binary Rewriting -  

Shared Kernel Virtualization 

Shared Kernel Virtualization 

The Kernel -  

Root File System – Contains ALL of the libraries, files, and utilities necessary for the OS to function. 

Hypervisor Virtualization 

Hypervisor – AKA a Virtual Machine Monitor (VMM) - Software that creates and runs Virtual Machines (VMs)