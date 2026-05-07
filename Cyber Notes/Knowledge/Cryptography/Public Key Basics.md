Tags: #Status/Complete #Type/Knowledge #Context/Cryptography #publish-me

---
## Overview
Public key (asymmetric) cryptography uses a mathematically linked key pair to enable secure communication, authentication, and digital signatures. The public key encrypts or verifies; the private key decrypts or signs. While slower than symmetric encryption, it solves the key distribution problem and is commonly combined with symmetric encryption for performance.

---

## Terminology
| Term | Definition |
|------|------------|
| Public Key | Shared key used to encrypt data or verify signatures |
| Private Key | Secret key used to decrypt data or create signatures |
| Key Pair | Mathematically linked public and private keys |
| Digital Signature | Data signed with a private key; verified with the corresponding public key |
| Certificate Authority (CA) | Trusted entity that signs certificates to establish a chain of trust |
| Chain of Trust | Hierarchy where a CA vouches for a certificate, and the OS/browser trusts the CA |
| Diffie-Hellman | Protocol for establishing a shared secret over an insecure channel |
| PGP / GPG | Pretty Good Privacy / GNU Privacy Guard; used for file encryption and signing |

---
## Core Concepts

### Asymmetric Encryption
- Uses a **key pair** — public key is shared freely, private key must remain secret
- Often used to securely exchange symmetric session keys
- Slower than symmetric encryption — typically used for key exchange and authentication only

### RSA
Based on the mathematical difficulty of factoring large prime numbers.

| Variable | Description |
|----------|-------------|
| `p`, `q` | Large prime numbers |
| `n` | Product of `p × q` |
| `e` | Public exponent |
| `d` | Private exponent |
| `m` | Plaintext message |
| `c` | Ciphertext |

- **Public key:** `(n, e)`
- **Private key:** `(n, d)`

### Diffie-Hellman Key Exchange
Establishes a **shared secret over an insecure channel** without prior key sharing.
- Often paired with RSA — DH handles key exchange, RSA handles authentication/signatures
- Both parties independently compute an identical shared secret using public and private values

### Other Asymmetric Algorithms
| Algorithm | Description |
|-----------|-------------|
| DSA | Digital Signature Algorithm; designed specifically for signatures |
| ECDSA | Elliptic curve variant of DSA; smaller keys with strong security |
| ECDSA-SK | Hardware-backed security key variant of ECDSA |
| Ed25519 | Modern efficient signature scheme using Curve25519 |
| Ed25519-SK | Hardware-backed variant of Ed25519 |

### SSH Key Authentication
SSH uses asymmetric keys for passwordless authentication.

| Operation | Command |
|-----------|---------|
| Generate key pair | `ssh-keygen -t rsa` |
| Copy public key to remote | `ssh-copy-id user@host` |
| Connect using private key | `ssh -i privateKeyFile user@host` |

- Public key stored in `~/.ssh/authorized_keys` on the target system
- Private key must have permissions `600` or stricter
- A compromised private key means unauthorized access

### Digital Signatures
- Created using the **private key**; verified using the **public key**
- Provides authentication and integrity verification
- Proves the message came from the holder of the private key and was not tampered with

### Certificates & Chain of Trust
Used by websites to prove identity over TLS/HTTPS — see [[TLS & SSL]]

- Certificate signed by an organization → organization trusted by a CA → browser trusts CA
- **Root CAs** are pre-trusted by the OS and browsers
- Free certificates available via Let's Encrypt

### PGP / GPG
Used for file encryption and digital signatures, commonly in secure email.

| Command | Description |
|---------|-------------|
| `gpg --full-gen-key` | Generate a new key pair |
| `gpg --import backup.key` | Import an existing key |
| `gpg --decrypt confidential_message.gpg` | Decrypt a GPG-encrypted file |
| `gpg2john <keyfile>` | Extract hash from passphrase-protected key for cracking |

---
## Related Concepts
- [[Cryptography Basics]]
- [[Hashing Basics]]
- [[TLS & SSL]]

## Related Techniques
- [[RSA Cracking]]

---
## References / Images
- RSA key generation diagrams
- Diffie-Hellman key exchange visualization
- Digital signature workflow diagrams
- Certificate trust chain illustration
