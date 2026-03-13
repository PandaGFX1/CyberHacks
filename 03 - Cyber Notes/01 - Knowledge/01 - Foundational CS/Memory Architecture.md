Tags: #CompArch #Terminology 

Key Terms 

Latency - The time between data entering a device and leaving it. Lower the latency, the higher the speed. 

Throughput - Rate at which data is loaded from and stored to memory. Also known as MEMORY BANDWIDTH. - Measured in BITS per Second. 

Buffering - Action of storing data in a region of physical memory called a buffer. 

Rotational Latency - Time required for the desired sector to rotate under the head (Rotational Speed) 

Seek Time - Time is takes head to move to desired track from current track (Seek out the right track) 

Transfer Time - Time needed to read from or write to the data sector. (Transfer of data) 

Spin-Up Time - Time required for the disk to hit operating RPMs (Start-Up Time) 

Disk-Access Time - How long it takes to retrieve data from the storage device. Sum of Rotational Latency, Seek Time, Transfer Time, and Spin-Up Time. 

Memory 

Volatile Memory – Only stores data while the computer is on and applications are running 

Non-Volatile Memory – Data is still retained even when power is lost; Known as permanent storage. (EX: Floppy Disk, Compact Disc, Internal Hard Drive, External Hard Drive, Flash Drive, SD card) 

Order of Volatility 

Most to Least Volatile: 

Registers 

Cache 

RAM 

ROM 

Hard Drives 

External Memory (USB, CD) 

Cache Memory  

Cache Memory - High Speed memory used to synchronize with the high speed CPU. Usually between the CPU and the RAM.  

Cache Hit - Processor needs to access main memory, so it checks the cache first. If it finds what it needs in the cache then you get a hit and it uses the cache. 

Principle of Locality  

Temporal Locality - References the SAME data often 

Spatial Locality - References data in a close STORAGE location. (Sequence) 

RAM vs ROM 

RAM - Random Access Memory; Temporary Storage (Volatile); Uses GBs; Writing Data is faster 

ROM - Read Only Memory; Permanent Storage (Non-Volatile); Uses MBs; Writing data is slower 

Random Access Memory (RAM) 

SRAM - Static Random Access Memory; Uses FOUR to TEN transistor latch circuit; Retains data as long as power is there 

DRAM - Dynamic Random Access Memory; Uses ONE transistor/capacitor; Much cheaper but requires a charge every few milliseconds (continuous energy) 

Read-Only Memory 

Programable ROM - All bits are set to 1 when it is blank. As data is added to it a voltage is applied to change the bits to 0. Causes permanent change.  

Erasable Programable ROM - EPROM must be removed in order to be reprogrammed. Uses ultra violet light to be erased. 

Electrically Programable ROM - EEPROM can be erased a reprogramed ONE byte at a time. Does not need to be removed to be reprogramed. - Reprogram up to a million times 

Secondary Memory 

Magnetic Disks (HDDs) - Data is stored by leaving an electric charge on a spinning metallic disk. Has one or more platters of data. - 350 to 400 I/O Operations per Second;  Mechanical 

Tracks - Thousands of tightly packed concentric circles 

Sectors - Basic unit of data storage; Each sector can hold 512 bytes of data, but newer ones can hold up to 4096 bytes (4 KB) 

Clusters - Groups of Sectors 

Solid State Drive (SSD) - No moving parts; Makes accessing data easier and faster. - Up to 80,000 I/O Operations per Second; Logical 

Redundant Array of Inexpensive Disks (RAID) 

Parity means EQUAL 

Striping (RAID 0) - Data is segmented logically 

Mirroring (RAID 1) - Duplication of data from one disk to another; Provides redundancy; Drops performance 

Striping with Parity (RAID 5) - Has Parity Bits; Requires ATLEAST 3 drives; Can only sustain one drive going down 

Striping with Double Parity (RAID 6) - Has 2 parity bits per drive; Requires ATLEAST 4 drives; Up to 2 drives can go down 

Striping with Mirrors (RAID 10) - Combination of RAID 1 and 0 (Hence 10); Duplicates and segments data across 2 drives but also provides a mirror (duplicate) back-up. 

External Memory 

External Storage – Often referred to as AUXILIARY STORAGE. Contains data but ins't store inside of a computer's memory or storage. 

Magnetic Tapes – Strip of film with a magnetic coating allowing for data storage; Wound onto a reel; Inexpensive; Data must be accessed sequentially 

Optical Disc – Low power laser is used to read or write. Data is stored by creating deprecations (called pits) and land in-between each pit. (Pits and land represent 1s and 0s). CD can hold 700 MB, DVD can hold 4.7 GB, Blu-Ray can hold 25 GB. 

SD Cards – Write and erase memory in blocks or sections. Contains many tiny electrical circuits which retain charge when not in use. Data is erased when a slightly higher voltage is applied. SD can hold 2 GB, SD HC is over 2GB (up to 32 GB), SD XC is over 32 GB (up to 2 TB), SD UC is over 2 TB (up to 128 TB). 

Operation Buckshot Yankee 

2008 Breach of Military Computers. Known as a "parking lot attack". 

Military member found a random USB in the parking lot in the middle east and plugged it into his computer. It had malware on it and it uploaded itself to the U.S. Central Command network and spread.