Tags: #Tools #Commands #Linux 

Refer to:

- Options:
	- Limited to ICMP echo and TCP connect scan without root/sudo
		- Connect scan as regular user
		- Syn Scan as root
	- Fast mode: `-F`
	- Ports: `-p[range]`
		- EX: `-p10-1024 or -p-25 or -p-`
	- OS Detection: `-O`
	- Service and Version Detection: `-sV`
	- OS Detection, Version Scanning, Traceroute, Etc: `-A`
	- Force the scan for hosts that may appear down: `-Pn`
	- Updates/verbosity: `-v, -vv, -vvvv, -v2, -v4`
	- Debugging: `-d[1-9]`
	- Control parallel probes: `--min-paralleslism AND --max-paralleslism`
	- Control packet send rate (# of packets per second): `--min-rate AND --max-rate`
	- Max time to wait: `--host-timeout`
- Examples:
	- Ping sweep: `nmap -sn 10.10.7.1/24`
	- List scan (DOES NOT SCAN): `nmap -sL 192.168.0.1/24`
	- Connect scan: `nmap -sT 192.168.124.148`
		- Connect scan tries to complete TCP 3-way handshake
	- Stealth scan: `nmap -sS 192.168.124.148`
		- Only completes the first step in 3-way handshake
	- UDP scan: `nmap -sU 192.168.124.148`
- Output:
	- Scan report saving:
		- Normal output: `-oN`
		- XML Output: `-oX`
		- Grep-able Output: `-oG`
		- Output for all major formats: `-oA` 