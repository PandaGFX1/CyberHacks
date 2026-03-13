Tags: #Cryptography #Commands #Tools #Algorithms #Linux  

Refer to: [[Hashing Basics]]

Image: [[Pasted image 20250406140707.png|Script To Filter Password Length]]

External Resources: [JohnTheRipper](https://www.openwall.com/john/) and [OpenWall Wiki](https://www.openwall.com/john/)

- Use the Jumbo John extended version

- John Common Usage: `john [options] [file path]`
	- EX: `john --wordlist=/usr/share/wordlists/rockyou.txt has_to_crack.txt`
	- EX: `john --format=raw-md5 --wordlist=/usr/share/wordlists/rockyou.txt hash_to_crack.txt`
	- Check John's formats: `john --list=formats`
	- Windows Format: `nt`

- John Usage For Linux Shadow:
	- First unshadow: `unshadow [path to passwd] [path to shadow] > [file to output to]`
	- Sometimes you may need to specify shadow format: `--format=sha512crypt`

- Single Crack Mode:
	- Takes information from the GECOS field to add to wordlist as well as using word mangling techniques.
	- EX: `MArkus, Markus1, Markus!`
	- Usage: `john --single --format=[format] [path to file]`
	- NOTE: To use single crack mode you have to prepend the hash with the username
		- EX: `mike:1efee03cdc`

- Custom Rules:
	- Read More: [Custom Rules](https://www.openwall.com/john/doc/RULES.shtml)
	- Defined in: `/etc/john/john.conf` or `/opt/john/john.conf`
	- Using a rule: `john --wordlist=[path to wordlist] --rule=PoloPassword [path to hash file]`
	- Usage:
		- Uses regex style patterns.
		- Define name of rule: `[List.Rules:THMRules]`
		- Take the word and append it with the characters you define: `Az`
		- Take the word and prepend it with the characters you define: `A0`
		- Capitalize the character positionally: `c`
		- Example:
			- Name of rule: `[List.Rules:PoloPassword]`
			- Rules: `cAz"[0-9] [!£$%@]"`
				- Capitalize the letter: `c`
				- Append to end of the word: `Az`
				- A number in the range 0-9: `[0-9]`
				- Password is followed by one of these symbols: `[!£$%@]`

- Cracking Zip Files:
	- Zip2John Usage: `zip2john [options] [zip file] > [output file]`
	- Then, use john: `john --wordlist=/usr/share/wordlists/rockyou.txt zip_hash.txt`

- Cracking RAR Archive:
	- Rar2John Usage: `rar2john [rar file] > [output file]`
	- Then, use john: `john --wordlist=/usr/share/wordlists/rockyou.txt zip_hash.txt`

- Cracking SSH Key Passwords:
	- ssh2john converts the `id_rsa` private key into a hash format for John.
	- Kali path: `python /usr/share/john/ssh2john.py`
	- Usage: `ssh2john [id_rsa private key file] > [output file]`
	- Then, use john: `john --wordlist=/usr/share/wordlists/rockyou.txt zip_hash.txt`