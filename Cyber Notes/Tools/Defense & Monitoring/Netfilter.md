Tags: #Tools #Defense #Linux #Commands 

Refer to: [[Firewall Fundamentals]] and [[Firewall Basics]] and [[OSI Model]] and [[Ports]] and [[Protocols]]

Reference Image: [[TryHackMe/Pasted image 20250416192159.png|Netfilter Hierarchy]]

- Netfilter:
	- Netfilter is essentially the basis of Linux firewalls. It is hard to make rules for, but interacts directly with the OS in configuring firewalls.
- IPTables:
	- Built on top of netfilter to allow easier use (I think) but still can be a little complicated. Does give good control.
- UFW
	- Built on top of IPtables/Netfilter and allow for super simple configuration of rules. Easy to use, but not as much control
- Pre-Defined Rules:
	- Pretty self explanatory. Super easy, but no control.

- Using UFW:
	- `sudo ufw status`: Check firewall status
	- `sudo ufw enable`: Enable firewall
	- `sudo ufw status numbered`: Shows all active rules in a number order
	- `sudo ufw delete 2`: Delete the rule using the numbers listed
	- `sudo ufw default allow outgoing`: By default allow all outgoing traffic
	- `sudo ufw deny 22/tcp`: Denys all incoming port 22 traffic