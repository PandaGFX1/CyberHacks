Tags: #Status/Complete #Type/Knowledge #Context/Cryptography #publish-me

---
## Overview
Hashing transforms plaintext into a fixed-size digest using a one-way function, making it irreversible by design. It is used to protect data integrity, support confidentiality, and securely store passwords. Unlike encryption, hashed data cannot be decrypted — only compared against a new hash of the same input.

---

## Terminology
| Term | Definition |
|------|------------|
| Hash Function | Takes input of arbitrary size and produces a fixed-size output (digest) |
| Hash Value / Digest | Fixed-size string output produced by a hash function |
| Hash Collision | When two different inputs produce the same hash output |
| Salt | Random value added to a password before hashing; unique per user |
| Password Salting | Adding salt to prevent precomputed attacks such as rainbow tables |
| HMAC | Keyed-Hash Message Authentication Code; combines a secret key with a hash function |
| NThash | Modern Windows password hash format; MD4-based |
| Rainbow Table | Precomputed table of hash values used to reverse hash lookups |

---
## Core Concepts

### Hashing Algorithms
| Algorithm | Command | Output Length |
|-----------|---------|---------------|
| MD5 | `md5sum` | 32 hex characters |
| SHA1 | `sha1sum` | 40 hex characters |
| SHA256 | `sha256sum` | 64 hex characters |
| SHA512 | `sha512sum` | 128 hex characters |

### Salting
- A **salt** is a random value added to a password before hashing
- Unique per user — prevents two users with the same password from having the same hash
- Defeats precomputed rainbow table attacks
- Salt is stored alongside the hash so verification can reproduce it

### HMAC (Keyed-Hash Message Authentication Code)
Combines a secret key with a hash function to verify both **integrity and authenticity**.

Process:
1. Key is padded to block size
2. Key is XORed with a constant
3. Message is hashed with the modified key
4. Result is hashed again with a second modified key
5. Output is a fixed-size HMAC value

### Linux Password Storage
Passwords stored in `/etc/shadow` — see [[Linux Fundamentals]] for file structure detail.

Format: `$prefix$options$salt$hash`
Fields separated by colons. View algorithm info: `man 5 crypt`

| Algorithm | Prefix |
|-----------|--------|
| yescrypt | `$y$` |
| gost-yescrypt | `$gy$` |
| scrypt | `$7$` |
| bcrypt | `$2b$` |
| sha512crypt | `$6$` |
| md5crypt | `$1$` |
| SunMD5 | `$md5` |

### Windows Password Storage
- Stored in **SAM (Security Accounts Manager)** — see [[Windows Fundamentals]]
- Uses **NTLM (MD4-based)** hashing
- Modern format: **NThash**

### Hash Identification Quick Reference
| Hash Type | Length | Notes |
|-----------|--------|-------|
| MD5 | 32 hex chars | Legacy, fast — avoid for passwords |
| SHA1 | 40 hex chars | Deprecated for security use |
| SHA256 | 64 hex chars | Common integrity verification |
| SHA512 | 128 hex chars | Strong password hashing |

---
## Related Concepts
- [[Cryptography Basics]]
- [[Linux Fundamentals]]
- [[Windows Fundamentals]]

## Related Techniques
- [[Password Cracking]]

---
## References / Images
- Hash function diagrams
- HMAC workflow visualization
- `/etc/shadow` structure examples
- CrackStation: https://crackstation.net
- Hashes.com: https://hashes.com
