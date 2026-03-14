Tags: #Networking #Terminology 

Refer to: [[OSI Model]] and [[Packets and Frames]]

- Transmission Control Protocol (TCP/IP): Designed with reliability and guarantee in mind. Reserves a constant connection between two devices. Incorporates error checking. Uses the TCP 3-Way Handshake. 
- User Datagram Protocol (UDP/IP): No error checking or reliability. Built for speed. No synchronization. Leaves the application layer (user software) to decide if there is any control over how quickly packets are sent. Good for sending small pieces of data fast, such as video gaming or streaming.
- Address Resolution Protocol (ARP): Responsible for allowing devices to identify themselves on a network. Allows a device to associate its MAC address with an IP address. Devices use an **ARP cache** to store identifiers. Reference Image: [[TryHackMe/Pasted image 20250401160028.png|ARP Process]]
	- ARP Request: Broadcasted message on a network asking for a MAC address that owns an IP address.
	- ARP Reply: Reply given to the requesting device to signify that device with a certain MAC owns that IP address.
- Dynamic Host Configuration Protocol (DHCP): When a device connects to a network, an IP address is automatically given, if not manually assigned, by using DHCP. Reference Image: [[TryHackMe/Pasted image 20250401160321.png|DHCP DORA]] 
	- DHCP Discover: Reaches out to DHCP server to ask for a IP address
	- DHCP Offer: DHCP Server responds with an IP address
	- DHCP Request: Device replies to DHCP server confirming the IP.
	- DHCP ACK: DCHP Server replies back acknowledging the completion.
- Domain Name System (DNS): Provides a simple way for communication among devices on the internet without remembering complex numbers. Translates IP addresses to domain names. Refer to: [[DNS In Depth]]
- Internet Control Message Protocol (ICMP): Mainly uses for network diagnostics with commands such as `ping` and `traceroute`
- File Transfer Protocol (FTP): Used by a file-sharing application built on a client-server model.
	- Example Commands:
		- `USER`: Input the username
		- `PASS`: Enter the password
		- `RETR`: Download a file
		- `STOR`: Upload a file from client
		- `LIST`: List files in the current working directory (same as ls).
- Secure Shell (SSH): Used to securely login to system via a text-based interface for management.
- HyperText Transfer Protocol (HTTP): Powers the World Wide Web. Browser uses this to download text, images, and videos of web pages.
- HyperText Transfer Protocol Secure (HTTPS): Exact same, but uses TLS/SSL for encryption, to be secure. Reference Image: [[TryHackMe/Pasted image 20250403083220.png|TLS Negotiation]]
- Server Message Block (SMB): Protocol is similar to FTP, but SMB allows you to share devices like printers.
- Remote Desktop Protocol (RDP): Protocol is a secure means of logging into a system using a visual desktop interface.
- Telnet Example: [[Linux Fundamentals]]
- Simple Mail Transfer Protocol (SMTP): Defines how a mail client talks with a mail server and how a mail server talks with another. Allows for send of an email.
	- Example Commands:
		- `HELO` or `EHLO`: Initiates an SMTP session.
		- `MAIL FROM`: Specifies the sender's email address.
		- `DATA`: Client will be sending the content of the email message.
		- `.`: Sent on a line by itself to indicate the end of the email.
- Post Office Protocol Version 3 (POP3): Allows client to communicate with a mail server and retrieve emails. Email sent relying on SMTP and retrieved using POP3.
	- Example Commands:
		- `USER <username>`: Pass the username.
		- `PASS <password>`: Pass a password.
		- `STAT`: Requests number of messages and size.
		- `LIST`: Lists all messages and size.
		- `RETR <message_number>`: Retrieves the specified message.
		 - `DELE <message_number>`: Marks a message for deletion.
		 - `QUIT`: Ends the session and applies changes.
- Internet Message Access Protocol (IMAP): Allows synchronization of email clients and syncs read, moved, and deleted messages.
	- Example Commands:
		- `LOGIN <username> <password>`: Pass login credentials.
		- `SELECT <mailbox>`: Select the mailbox folder to work with
		- `FETCH <mail_number> <data_item_name>`: Example `fetch 3 body[]` to fetch message number 3, header and body.
		- `MOVE <sequence_set> <mailbox>`: Move the message to another mail box
		- `COPY <sequence_set> <data_item_name>`: Copies the message to another mailbox
		- `LOGOUT`: Logs out


- Open Shortest Path First (OSPF): Allows routers to share information about the network topology and calculate the most efficient and shortest path for data transmission.
- Routing Information Protocol (RIP): Simple routing protocol used in small networks. Routers share information about networks they can reach and the number of hops required. Based on this information they build a routing table and choose the route with the fewest hops.
- Enhanced Interior Gateway Routing Protocol (EIGRP): CISCO propriety routing protocol that combines aspect of different routing algorithms. Allows routers to share information about networks they can reach and the cost (bandwidth or delay). Use this information for most efficient path.
- Border Gateway Protocol (BGP): Primary routing protocol used on the internet. Allows different networks to exchange routing information and establish paths for data to travel. Helps ensure data can be routed efficiently across the Internet.
