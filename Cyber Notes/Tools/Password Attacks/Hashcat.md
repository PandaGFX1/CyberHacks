Tags: #Status/In-Progress #Type/Tool #Context/Cryptography #Context/Redteam

---
## Overview
Hashcat is the world's fastest and most advanced password recovery tool. Uses GPU acceleration to crack password hashes using wordlists, brute force, rule-based attacks, and more. Should be run on the host machine rather than a VM to utilize full GPU performance.

---
## Target / Context
Password hashes from any source — Linux `/etc/shadow`, Windows SAM, web application databases, captured network hashes, and more.

---
## Installation

> [!INFO]- Installation Commands:
> `sudo apt install hashcat`

---
## Basic Usage

> [!INFO]- Basic Usage:
> `hashcat -m <hash_type> -a <attack_mode> hashfile wordlist`
> `hashcat hashfile wordlist`
> `man hashcat`
> Note: Run on host machine, not VM — requires GPU access for best performance.
> Use `hashcat hashfile wordlist` to let Hashcat autodetect the hash type.

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-m` | Hash type (numerical format) | `-m 0` (MD5) / `-m 1000` (NTLM) |
> | `-a` | Attack mode | `-a 0` (wordlist) / `-a 3` (brute force) |
> | `-o` | Output file for cracked hashes | `-o cracked.txt` |
> | `--show` | Show previously cracked hashes | `hashcat --show hashfile` |
> | `--force` | Ignore warnings (use cautiously) | `--force` |
> | `-r` | Apply rule file to wordlist | `-r rules/best64.rule` |
> | `--wordlist` | Specify wordlist explicitly | `--wordlist /usr/share/wordlists/rockyou.txt` |
> | `-1` | Define custom charset 1 (use `?1` in mask) | `-1 ?d?u` (digits + uppercase) |

---
## Common Use Cases

### Wordlist Attack
Crack hashes using a wordlist.

> [!INFO]- Commands:
> `hashcat -m 0 -a 0 hashes.txt /usr/share/wordlists/rockyou.txt`
> `hashcat -m 1000 -a 0 hashes.txt /usr/share/wordlists/rockyou.txt`

### Autodetect Hash Type

> [!INFO]- Commands:
> `hashcat hashes.txt /usr/share/wordlists/rockyou.txt`

### Show Previously Cracked Hashes

> [!INFO]- Commands:
> `hashcat --show hashes.txt`

### IPMI 2.0 RAKP Hash Cracking
IPMI 2.0 RAKP authentication returns a salted HMAC-SHA1 hash for any valid username — obtainable without authentication. HP iLO factory passwords are 8 uppercase letters and digits. See [[IPMI]] for the protocol flaw.

> [!INFO]- Commands:
> `hashcat -m 7300 ipmi.txt -a 3 ?1?1?1?1?1?1?1?1 -1 ?d?u`
> — Mode 7300 = IPMI 2.0 RAKP HMAC-SHA1; `-a 3` = mask attack; `?1` = custom charset 1; `-1 ?d?u` = digits + uppercase; 8-char mask covers HP iLO factory password pattern.
> `hashcat -m 7300 ipmi.txt wordlist.txt`
> — Dictionary attack for non-HP BMCs with weaker or reused passwords.

### Filter Password Length Before Cracking
[[Assets/Images/Pasted image 20250406140707.png|Script To Filter Password Length]]

> [!INFO]- Commands:
> `awk 'length($0) > 6' wordlist.txt > filtered.txt`
> `hashcat -m 0 hashes.txt filtered.txt`

---
## Related Concepts
- [[Hashing Basics]]
- [[IPMI]]

## Related Techniques
- [[Password Cracking]]

## Related Playbooks
-

---
## References / Images
- [[Assets/Images/Pasted image 20250406140707.png|Script To Filter Password Length]]
- https://hashcat.net/hashcat/
- https://hashcat.net/wiki/doku.php?id=example_hashes
