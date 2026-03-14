Tags: #Networking #Terminology 

Refer to: [[Protocols]]

Open Systems Interconnection Model (OSI): Provides a framework dictating how all networked devices will send, receive and interpret data. Consists of 7 layers. 

Reference Image: [[TryHackMe/Pasted image 20250402222722.png|OSI With Protocols]] and [[TryHackMe/Pasted image 20250402222805.png|OSI With TCP/IP Protocols]]
- Layer 1: Physical Layer - BITS
	- References the physical components of the hardware used in networking. Devices use electrical signals to transfer data.
- Layer 2: Data Link - FRAME
	- Focuses on the physical addressing of the transmission. Receives a packet from Layer 3 and **adds the MAC address of the receiver**.
- Layer 3: Network - PACKET
	- Where routing and reassembly of data takes place.
	- Houses protocols such as OSPF and RIP.
	- Everything is dealt with via IP addresses. Routers are included here.
- Layer 4: Transport - SEGMENT
	- Plays a vital part in transmitting data across a network by using protocol such as TCP and UDP.
- Layer 5: Session - DATA
	- Uses correctly translated and formatted data from layer 6 and creates and maintains the connection to another computer.
	- Responsible for closing the connection if it hasn't been used in a while or is lost. 
	- A session can contain "checkpoints".
	- Sessions are unique, so data cannot travel over different sessions.
- Layer 6: Presentation - DATA
	- Layer in which standardization starts to take place. 
	- Acts as a translator for data to and from layer 7.
	- Security features such as data encryption (HTTPS) occur here.
- Layer 7: Application - DATA
	- Layer in which protocols and rules are in place to determine how a user should interact with data being sent or received.
	- Can incorporate a GUI.