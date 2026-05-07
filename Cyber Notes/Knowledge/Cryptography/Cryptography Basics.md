Tags: #Status/Complete #Type/Knowledge #Context/Cryptography #publish-me

---
## Overview
Cryptography ensures secure communication in the presence of adversaries by transforming information into unreadable formats for unauthorized users. It provides confidentiality, integrity, authentication, and non-repudiation — implemented using symmetric and asymmetric encryption and underpinned by mathematical operations like XOR and modulo arithmetic.

---

## Terminology
| Term | Definition |
|------|------------|
| Symmetric Encryption | Uses the same key for both encryption and decryption |
| Asymmetric Encryption | Uses a key pair — public key to encrypt, private key to decrypt |
| Plaintext | Original unencrypted data |
| Ciphertext | Encrypted output of a plaintext message |
| Key | Secret value used to encrypt or decrypt data |
| XOR (Exclusive OR) | Bitwise operation fundamental to many encryption algorithms |
| Modulo (mod) | Returns the remainder of division; used in cryptographic computations |

---
## Core Concepts

### Symmetric Encryption (Private Key Cryptography)
Uses the **same key** for both encryption and decryption. Fast but requires secure key exchange.

| Algorithm | Key Size | Notes |
|-----------|----------|-------|
| DES | 56-bit | Legacy; considered insecure |
| 3DES (Triple DES) | 168-bit (effective ~112-bit) | Applies DES three times |
| AES | 128, 192, or 256-bit | Current standard; widely used |

### Asymmetric Encryption (Public Key Cryptography)
Uses a **key pair** — public key encrypts, private key decrypts. Slower but solves key distribution problem.
See [[Public Key Basics]] 
| Algorithm | Key Size | Notes |
|-----------|----------|-------|
| RSA | 2048, 3072, 4096-bit | Most widely used asymmetric algorithm |
| Diffie-Hellman | 2048-bit minimum (3072/4096 recommended) | Key exchange protocol |
| ECC (Elliptic Curve Cryptography) | 256-bit | Comparable security to 3072-bit RSA at smaller key size |

### XOR Operation (Exclusive OR)
Fundamental bitwise operation used in many encryption schemes.

#### Truth Table
| A | B | A ⊕ B |
|---|---|-------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

**Key Properties:**
- `A ⊕ A = 0`
- `A ⊕ 0 = A`
- Commutative and associative

**Reversibility — How XOR Decryption Works:**
Let `P` = plaintext, `K` = key, `C` = ciphertext
- Encrypt: `C = P ⊕ K`
- Decrypt: `C ⊕ K = (P ⊕ K) ⊕ K = P ⊕ (K ⊕ K) = P ⊕ 0 = P`

### Modulo Operator (mod / %)
Returns the remainder of division. Used extensively in cryptographic algorithms.

- Syntax: `X % Y` = remainder when X is divided by Y
- Example: `25 % 5 = 0` because `25 = 5 × 5 + 0`

**Properties:**
- Result always falls in range `0` to `Y - 1` for positive Y
- **Not reversible** — `X % 5 = 4` has infinite possible values of X
- This irreversibility is what makes modulo useful in cryptography

---
## Related Concepts
- [[Public Key Basics]]
- [[Data Representation]]
- [[TLS & SSL]]

## Related Techniques
-

## Related Tools
-

---
## References / Images
- Symmetric vs asymmetric key usage diagrams
- XOR operation truth table illustrations
- Modulo arithmetic examples
