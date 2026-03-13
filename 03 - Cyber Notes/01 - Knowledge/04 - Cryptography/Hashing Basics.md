Tags: #Cryptography #Terminology

Refer to: [[Hashcat]] and [[JohnTheRipper]]

- **Purpose: Helps to protect data's integrity and ensure confidentiality, but hiding plaintext and ensuring you have an unaltered version of a file.

- Hashing Resources:
	- Websites: [CrackStation](https://crackstation.net/)and [Hashes.com](https://hashes.com/en/decrypt/hash)
	- Hash Recognition Tool: [hashID](https://pypi.org/project/hashID/)and [hash-identifier](https://gitlab.com/kalilinux/packages/hash-identifier/-/tree/kali/master)and [Online HASH ID](https://www.tunnelsup.com/hash-analyzer/)
	- Tools for cracking hashes: [[Hashcat]] and [[JohnTheRipper]]
	- How HMACs work: [HMAC Walkthrough](https://tryhackme-images.s3.amazonaws.com/user-uploads/5f04259cf9bf5b57aed2c476/room-content/5f04259cf9bf5b57aed2c476-1725294564965.svg)

- Terms To Know:
	- Hash Value: Fixed-size string that is computed by a hash function.
	-  Hash Function: Takes an input of arbitrary size and returns an output/digest that data, which is a fixed-size string.
	- Hash Collision: When two different inputs give the same output
	- Salt: Randomly generated value stored in a database and should be unique to each user - Added to beginning or end - Don't need to be kept private.
	- Password Salting: Adding a random value to a password before it is hashed.
	- Keyed-Hash Message Authentication Code (HMAC): Type of message authentication code (MAC) that uses cryptographic hash function in combination with a secret key to verify the authenticity and integrity of data. 
	- General Electric Comprehensive Operating System (GECOS): 5th field in Linux user account record. Stores general information such as full name, office number, etc.
	- Word Mangling: John uses only the information provided in the username to try and work out possible passwords heuristically by slightly changing the letters and numbers contained within the username
- Hashing Algorithms:
	- Message-Digest Algorithm 5 (MD5): `md5sum`
	- Secure Hash Algorithm 1 (SHA1): `sha1sum`
	- Secure Hash Algorithm 256 (SHA256): `sha256sum`
	- Secure Hash Algorithm 512 (SHA512): `sha512sum`
- Linux `/etc/shadow`:
	- Fields are seperated by colons: `$prefix$options$salt$hash`
	- Common Unix-style Password Prefixes:
		- Use: `man 5 crypt`
		- Common Algorithms:
			- yescrypt
			- gost-yescrypt
			- scrypt
			- bcrypt
			- sha512crypt
			- SunMD5
			- md5crypt
- MS Windows SAM
	- Passwords stored in Security Accounts Manager.
	- Hashed using NTLM, which is a variant of MD4. Visually identical to MD4 and MD5 hashes.
		- NThash is the hash format modern Windows OS uses to store user and service passwords.
- Quick Hash Type Detecting:
	- MD5: 32 characters/Hex Digits
	- SHA1: 40 characters/Hex Digits
	- SHA256: 64 Characters/Hex Digits
	- SHA512: 128 Characters/Hex Digits
- How HMAC Works:
	- Secret key is padded to the block size of hash function
	- Padded key is XORed with a constant (usually a block of zeros or ones)
	- Message is hashed using the hash function with the XORed key
	- The result from step 3 is then hashed again with the same hash function but using the padded key XORed with another constant
	- Final output is the HMAC value, typically a fixed-string size.



