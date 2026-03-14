Tags: #Networking #Terminology 

Reference Image: [[TryHackMe/Pasted image 20250401194304.png|Basic VPN Layout]] and [[TryHackMe/Pasted image 20250403083830.png|VPN Traffic Flow]] and [[TryHackMe/Pasted image 20250403084031.png|Single Device With VPN]]

- VPNs offer privacy and anonymity.
	- Uses encryption to protect data while remotely connected.
- VPN Technology:
	- PPP: Technology used by Point-to-Point Tunneling Protocol (PPTP) to allow for authentication and provide encryption of data. Use private key and public certificate. 
	- PPTP: Technology that allows the data from PPP to travel and leave a network.
	- Internet Protocol Security (IPSec): Encrypts data using the existing IP framework.
- VPN client encrypts the traffic and then it is decrypted at the next VPN server to allow for decrypted traffic flow within the network.
- NOTE: Traffic is ONLY encrypted between the VPN client and the VPN server. So, OpenSSH encrypts my traffic and then it is decrypted by my raspberry pi, before leaving my network.