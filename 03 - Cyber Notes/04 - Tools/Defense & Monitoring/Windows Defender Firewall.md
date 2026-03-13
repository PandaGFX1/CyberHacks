Tags: #Tools #Defense #Windows 

Refer to: [[Firewall Fundamentals]] and [[Firewall Basics]] and [[OSI Model]] and [[Ports]] and [[Protocols]]

- Windows Defender Firewall:
	- Built-in firewall in Windows OS's. Contains all basic functionality for creating, allowing, or denying specific program as well as customized rules.
- Network Profiles:
	- Determines current network based on Network Location Awareness (NLA) and applies that profile firewall setting for you.
	- Private Networks:
		- Includes the firewall configurations to apply when connected to home network.
	- Guest Or Public Networks:
		- Firewall configuations to apply when connected to a public or untrusted network (coffee shops, resturants, etc.)
- Custom Rules:
	- Steps:
		- Click `Advanced Settings On Left Side`
		- Click `Outbound Rules` or `Inbound Rules`
		- Click `New Rule`
		- Select `Custom`
		- Select `All Programs`
		- Select protocol type `TCP`
		- Keep `Local port` as it is
		- Change `Remote Port` to `Specific Ports`
		- Specify the ports to block
		- In the `Scope` tab keep defaults
		- In the `Action` tab `Block the connection`