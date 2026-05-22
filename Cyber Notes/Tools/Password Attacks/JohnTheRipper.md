Tags: #Status/In-Progress #Type/Tool #Context/Linux #Context/Redteam

---
## Overview
John the Ripper (JtR) is a powerful open-source password cracking tool. Use the **Jumbo John** extended version for maximum format support. Supports wordlist attacks, single crack mode, custom rules, and includes companion tools for converting file formats (zip, rar, SSH keys, shadow files) into crackable hashes.

---
## Target / Context
Password hashes from Linux shadow files, Windows NTLM, ZIP/RAR archives, SSH private keys, and many more formats. Offline cracking tool — requires the hash file locally.

---
## Installation

> [!INFO]- Installation Commands:
> `sudo apt install john`
> Use Jumbo John for extended format support: https://www.openwall.com/john/

---
## Basic Usage

> [!INFO]- Basic Usage:
> `john [options] [file path]`
> `john --wordlist=/usr/share/wordlists/rockyou.txt hash_to_crack.txt`
> `john --format=raw-md5 --wordlist=/usr/share/wordlists/rockyou.txt hash_to_crack.txt`
> `john --list=formats`

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `--wordlist` | Specify wordlist to use | `--wordlist=/usr/share/wordlists/rockyou.txt` |
> | `--format` | Specify hash format | `--format=raw-md5` / `--format=nt` |
> | `--single` | Single crack mode using GECOS field and word mangling | `--single --format=raw-md5` |
> | `--rule` | Apply a named custom rule | `--rule=PoloPassword` |
> | `--list=formats` | List all supported hash formats | `john --list=formats` |
> | `--show` | Show previously cracked passwords | `john --show hash.txt` |

---
## Common Use Cases

### Wordlist Attack

> [!INFO]- Commands:
> `john --wordlist=/usr/share/wordlists/rockyou.txt hash_to_crack.txt`
> `john --format=raw-md5 --wordlist=/usr/share/wordlists/rockyou.txt hash_to_crack.txt`
> Windows NTLM format flag: `--format=nt`

---
### Linux Shadow File Cracking
Must unshadow first to combine `/etc/passwd` and `/etc/shadow` into one crackable file.

> [!INFO]- Commands:
> `unshadow [path to passwd] [path to shadow] > unshadowed.txt`
> `john --wordlist=/usr/share/wordlists/rockyou.txt unshadowed.txt`
> `john --format=sha512crypt --wordlist=/usr/share/wordlists/rockyou.txt unshadowed.txt`

---
### Single Crack Mode
Uses information from the GECOS field alongside word mangling techniques to generate candidates.
Example mutations: `Markus → MArkus, Markus1, Markus!`

> [!INFO]- Commands:
> `john --single --format=[format] [path to file]`
> Note: Prepend the hash with the username before running single crack mode.
> Format: `username:hash` — Example: `mike:1efee03cdc`

---
### Custom Rules
Define rules in `/etc/john/john.conf` or `/opt/john/john.conf`.

> [!INFO]- Commands:
> `john --wordlist=[path to wordlist] --rule=PoloPassword [path to hash file]`

> [!INFO]- Rule Syntax Reference:
> | Modifier | Description |
> |----------|-------------|
> | `Az` | Append characters to end of word |
> | `A0` | Prepend characters to start of word |
> | `c` | Capitalize character positionally |
> | `[0-9]` | Match any digit 0-9 |
> | `[!$%@]` | Match any of these symbols |

Example rule definition in `john.conf`:
`[List.Rules:PoloPassword]`
`cAz"[0-9] [!£$%@]"`
- `c` — Capitalize first letter
- `Az` — Append to end
- `[0-9]` — Followed by a digit
- `[!£$%@]` — Followed by a symbol

Full reference: https://www.openwall.com/john/doc/RULES.shtml

---
### Cracking ZIP Files

> [!INFO]- Commands:
> `zip2john [options] [zip file] > zip_hash.txt`
> `john --wordlist=/usr/share/wordlists/rockyou.txt zip_hash.txt`

---
### Cracking RAR Archives

> [!INFO]- Commands:
> `rar2john [rar file] > rar_hash.txt`
> `john --wordlist=/usr/share/wordlists/rockyou.txt rar_hash.txt`

---
### IPMI 2.0 RAKP Hash Cracking
IPMI 2.0 RAKP hashes are obtainable without authentication due to a protocol-level flaw. See [[IPMI]] for context.

> [!INFO]- Commands:
> `john --format=rakp --wordlist=/usr/share/wordlists/rockyou.txt ipmi.txt`

### Cracking SSH Key Passwords
Converts an `id_rsa` private key into a crackable hash format.

> [!INFO]- Commands:
> `python /usr/share/john/ssh2john.py [id_rsa file] > ssh_hash.txt`
> `john --wordlist=/usr/share/wordlists/rockyou.txt ssh_hash.txt`

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
- https://www.openwall.com/john/
- https://www.openwall.com/john/doc/RULES.shtml
