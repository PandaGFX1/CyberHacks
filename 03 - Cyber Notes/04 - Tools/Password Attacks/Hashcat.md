Tags: #Cryptography #Algorithms #Commands #Tools #Offensive

Refer to: [[Hashing Basics]]

Image: [[Pasted image 20250406140707.png|Script To Filter Password Length]]

External Resources:
	- Hashcat Manpage: [Hashcat](https://hashcat.net/hashcat/)
	- Hash formats and password prefixes:[Hashcat Example Hashes](https://hashcat.net/wiki/doku.php?id=example_hashes)

- Run Hashcat on Host Machine.
- Usage: `hashcat -m <hash_type> -a <attack_mode> hashfile wordlist`
	- Check hash-type numerical format: `man hashcat`
	- Can also do `hashcat hashfile wordlist` to have it autodetect the hash-type.