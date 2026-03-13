Tags: #Tools #Commands #Linux 

Refer to: 

- Manpages:
	- TCPDmp Manpage: `man tcpdump`
	- PCAP-Filter Manpage: `man pcap-filter`
- Options:
	- Specify the interface: `-i any
	- Save output: `-w FILE
	- Read output: `-r FILE
	- Specify # of packets to capture: `-c COUNT
	- Don't resolve IP Addresses: `-n
	- Don't resolve ports: `-nn
	- More verbose: `-v, -vv, -vvv
	- Quick output; brief packet information: `-q`
	- Link-level header (Include MAX addresses): `-e`
	- Packet data in ASCII: `-A`
	- Packet data in hex: `-xx`
	- Packet headers and data in hex and ASCII: `-X`
- Specifications:
	- Specify host (src/dst): `host HOSTNAME
	- Specify the source/destination: `src/dst host HOSTNAME
	- Specify the port: `port PORT#
	- Specify the source/destination port: `src/dst port PORT#
- Operators:
	- Logical Operators: `and, or, not
- Filters:
	- Filter for TCP flags: `tcp[tcpflags]`
		- Filter for only SYN set: `tcpdump "tcp[tcpflags] == tcp-syn"`
		- Filter for atleast SYN set: `tcpdump "tcp[tcpflags] & tcp-syn != 0"
		- Filter for atleast SYN or ACK set: `tcpdump "tcp[tcpflags] & (tcp-syn|tcp-ack) != 0"`
	- Filter contents of any bye in the header: `proto[expr:size]
		- Proto refers to arp, ether, icmp, ip, ip6, tcp, udp
		- Expr refers to the byte offset where 0 is the first byte
		- Size refers to the number of bytes which can be one, two, or four
	-  Filter by protocol: ip, ip6, udp, tcp, icmp, arp
	- Filter for greater/less than or equal to length: `greater/less LENGTH
