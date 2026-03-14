Tags: #Forensics #Tools #Commands 

Refer to: 

- Internet Services Simulation Suite (INetSim): Used for dynamic analysis of malware. Allows your to observe the behavior of malicious software by creating a fake network.
- Configuring INetSim:
	- Change the INetSim configuration: `sudo nano /etc/inetsim/inetsim.conf` 
	- Uncomment `dns_default_ip` and set it to your IP.
	- Start the tools: `sudo inetsim`
- Malware tends to download another binary or script. 
- To mimic:
	- On AttackBox and not VM hosting INetSim: `sudo wget https://10.10.126.156/second_payload.zip --no-check-certificate`
	- All downloaded files are fake.
- Mimic'ing essentially shows your how malware acts and how it reaches out to other servers.
- Connection Report:
	- Read the connection report at `/var/log/inetsim/report/`