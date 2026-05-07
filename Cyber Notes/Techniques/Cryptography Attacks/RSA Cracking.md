Tags: #Status/In-Progress #Type/Technique #Context/Cryptography #Context/Redteam

---
## Overview
RSA cracking involves attacking weaknesses in RSA encryption implementations to recover plaintext or private keys. Common targets include small key sizes, weak prime generation, shared factors between keys, and low public exponents.

---
## When To Use
- Target is using RSA encryption with potentially weak parameters
- CTF challenge involves encrypted data with an RSA public key provided
- Public key has unusual or small values for n, e, or d

## Requirements
- RSA public key or ciphertext
- Knowledge of RSA parameters (n, e, c)
- Python or RSACTFTool installed

---
## Attack Steps
1. Extract RSA parameters from the public key (`n`, `e`, ciphertext `c`)
2. Identify weakness — small `e`, small `n`, shared prime factors, or known attacks (Wiener, Hastad, etc.)
3. Use RSACTFTool to automatically attempt common attacks against the key
4. If RSACTFTool fails, manually factor `n` using factordb.com or msieve
5. Reconstruct private key and decrypt ciphertext

---
## Detection
- Monitoring for unusual key sizes or parameters during TLS inspection
- Use of deprecated or weak RSA key sizes (< 2048-bit)

## Mitigation
- Use RSA key sizes of 2048-bit minimum; 4096-bit recommended
- Use modern alternatives like ECC (Ed25519) where possible
- Ensure strong prime generation during key creation

---
## Related Knowledge
- [[Public Key Basics]]
- [[Cryptography Basics]]

## Related Playbook
-

## Related Tools
- [[RSACTFTool]]
- [[RSATool]]

---
## References / Images
- https://github.com/Ganapati/RsaCtfTool
- https://github.com/ius/rsatool
- https://factordb.com
