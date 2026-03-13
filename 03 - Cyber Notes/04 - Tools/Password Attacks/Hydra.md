Tags: #Cryptography #Commands #Tools  #Linux  

Refer to: [[Hashing Basics]] and [[Protocols]]

- Hydra is a brute force online password cracking program.
- Information on the options of each protocol in Hydra [Kali Hydra Tool Page](https://en.kali.tools/?p=220)
- Installation:
	- `apt install hydra`
	- `dnf install hydra`

- Commands:
	- FTP: `hydra -l user -P passlist.txt ftp://10.10.185.65`
		- `-l`: Sets username to use
		- `-P`: Sets password list to use
		- `ftp://`: Sets protocol to use
	- SSH: `hydra -l <username> -P <full path to list> 10.10.185.86 -t 4 ssh`
		- `-t`: Sets number of threads to spawn
		- `ssh`: Specifies the protocol
			- Could also do `ssh://ip`
	- POST Web Form: `sudo hydra <username> <wordlist> 10.10.185.65 http-post-form "<path>:<login_creds>:<invalid_response>`
		- `http-post-form`: Sets the protocol/type
		- `<path>`: Login page URL such as login.php
		- `<login_credentials>`: Username and password used to login.
		- `<invalid_response>`: Part of response on failure
		- `-V`: Verbose output for every attempt
	- Full POST Example: `hydra -l <username> -P <wordlist> 10.10.185.65 http-post-form "/:username=^USER^&password=^PASS^:F=incorrect" -V`
		- The `^USER^` and `^PASS^` says to replace those values with the specified username/password.
		- The `F=incorrect` is a string that appears in the server reply when the login fails.
			- Could just put `:incorrect` as well.