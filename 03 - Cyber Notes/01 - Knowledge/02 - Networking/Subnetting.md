Tags: #Networking #Terminology 

- **Achieved by splitting up the number of hosts that can fit within a network by using a subnet mask.

- Subnet Mask: Represented by four bytes (32 bits) ranging from 0-255.
- Subnets use IP addresses in 3 different ways: `Identify the network address, host address, and default gateway`
	- Network Address: Indentifies the start of the actual network and indentify's a networks existense. EX: `192.168.1.0`
	- Host Address: Used to identify a device on the subnet. EX: `192.168.1.100`
	- Default Gateway: Special address assigned to a device on the network that is capable of sending information to another network. EX: `192.168.1.254 or 192.168.1.1`
- RFC 1918:
	- Three private IP ranges:
		- 10.0.0.0 - 10.255.255.255 (10/8)
		- 172.16.0.0 - 172.31.255.255 (172.16/12)
		- 192.168.0.0 - 192.168.255.255 (192.168/16)