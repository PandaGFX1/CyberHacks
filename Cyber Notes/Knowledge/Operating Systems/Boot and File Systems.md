Tags: #OS #Terminology

Hard Drives 

Low-level Format – Creates cylinders, track, and sectors (commonly 512 bytes in size) - Occurs at the hardware level (the first aka low level) - Cannot be formatted by the user. 

Partitioning – makes a hard drive usable, logically divides a disk into segments, which can be logically formatted to store data 

Disk Cylinder Space 

Disk Cylinder Information – fdisk –l 

Unallocated Space Command: parted –l 

Boot Process 

Basic Input/Output System (BIOS) 

BIOS – Most legacy computers use this firmware interface for managing the boot process. Provides limited features; firmware security, boot disk sizes, and the number of avaliable partitions due to partitioning type 

Power On Self Test (POST) 

Power on Self Test (POST) - Bridges all various parts of PC and interfaces them. Scans and makes sure that there are no errors before fully booting 

United Extensible Firmware Interface (UEFI) 

UEFI – Modern computers fully support this. Replaces BIOS as the standard. Starts before booting the OS. Supports larger hard drives, faster boot times, and more security features. 

Physical Layer 

Hard Disk Drives (HDD) - Filled with magnetic disks that store data – Seperated into sectors 

Solid State Drives (SSD) - Utilized flash memory written into NAND memory cells – No moving parts – Faster than HDD and non-volatile 

File Systems 

File Allocation Table (FAT) - Windows Legacy Systems utilize this 

New Technology File System (NTFS) - New Windows Systems use this 

The Apple File Table – Apple/iOS use this 

Ext3/ext4 - Linux Operation Systems utilize this 

Windows File System Information Command – fsutil fsinfo ntfsinfo C: 

File Systems – Windows  

Linux File System Information Command – mount | column –t 

Disk Space Allocated – df –h 

Data 

Sectors – Made up of 512 bytes 

Allocated – A file is actively using the block/cluster - Represented as 1 in binary 

Unallocated – Sometimes referred to as "free space" - Represented as 0 in binary 

Metadata - "data about data" - Includes Master File Table (MFT), New Technology File System (NTFS), File Allocation Table (FAT). 

Boot Process – Linux 

BIOS – Basic Input/Output System which executes the MBR 

MBR – Master Boot Record which executed GRUB 

- Boot Loader – Made up of 446 bytes 
    
- Disk Partition Table (DPT) - Takes up 64 bytes. All partitions recorded here 
    
- Magic Number – Takes up 2 bytes and is fixed to AA55 
    

- Could use GPT (GUID Partition Table) 
    
- MBR only works with disks up to 2 TB. Only supports up to 4 primary partitions 
    

GRUB – Grand Unified Bootloader which executed THE Kernel 

Kernel – Kernel executes /sbin/init 

Init – Init executes runlevel programs 

Runlevel – Runlevel Programs are executed from /etc/rc.d/rc*.d/ 

GUID Partition Table (GPT) 

GPT – New standard replacing MBR. Associated with UEFI. Can be much larger than MBR – Also stores cyclic redundancy check (CRC) values. 

SysV 

SySV – Older version of the linux boot system. State of machine is defined by runlevels when using SysV. 

Systemd 

Systemd – OS startup program that is extremely flexible and robust 

- Service Units – These are the services we've been starting and stopping. Ends in .service 
    
- Mount Units – These mount filesystems, these unit files end in .mount 
    
- Target Units – These group together other units, the files end in .target 
    

- Run systemctl list-units – To look at the units 
    
- Cd /etc/boot and then ls – View files that are involved in boot process 
    

Boot Process – Windows 

BIOS – Basic Input/Output System which executes the MBR 

MBR – Master Boot Record which executes Windows Boot Manager 

WBM – Windows Boot Manager executes the Windows OS Loader 

Windows OS Loader – Loads the NT OS Kernel 

NT OS Kernel – Initializes the OS sessions by executing SMSS.exe and Csrss.exe 

Winlogon Initialization – Windows reaches the login screen by running wininit.exe 

Explorer Initialization – Once a user authenticates, exeplorer.exe is initialized