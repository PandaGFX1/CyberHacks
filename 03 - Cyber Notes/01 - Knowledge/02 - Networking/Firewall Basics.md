Tags: #Networking #Terminology 

Refer to: [[Ports]] and [[Protocols]]

Snort Reference: [Snort](https://www.snort.org/)

- Firewalls:
	- Preform packet inspection to determine answers to questions such as:
		- Where the traffic is coming from? (has the firewall been told to accept/deny traffic from a specific network?)
		- Where is the traffic going to? (has the firewall been told to accept/deny traffic destined for a specific network?)
		- What port is the traffic for? (has the firewall been told to accept/deny traffic destined for port 80 only?)
		- What protocol is the traffic using? (has the firewall been told to accept/deny traffic that is UDP, TCP or both?)
	- Categories of firewalls:
		- Stateful: Uses entire information from a connection rather than inspection an individual packet. Determines behavior of a device based upon entire connection.
			- Consumes many resources.
			- Will block entire device if a connection from a host is bad.
		- Stateless: Uses a static set of rules to determine whether or not individual packets are acceptable.
			- Will not block an entire device.
			- Only effective as well as the rules they are defined with.
			- Great at receiving large amount of traffic from a set of hosts (DDOS attack)