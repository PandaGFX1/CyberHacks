Tags: #Cryptography #Algorithms #Terminology 

- **Purpose: Ensure secure communication in the presence of adversaries

- Symmetric Encryption/Private Key Cryptography: Uses the SAME key to encrypt and decrypt the data
	- Data Encryption Standard (DES): 56-bit key
	 - Triple DES (3DES): DES x3 with 168-bit key, but effective security is 112-bits.
	- Advanced Encryption Standard (AES): 128, 192, or 256 bit key size.
- Asymmetric Encryption/Public Key Cryptography: Uses a PAIR of keys to encrypt and decrypt data (Encrypt with recipients PUBLIC key and recipient decrypts using PRIVATE key)
	- Refer to: [[Public Key Basics]]
	- RSA: Uses 2048, 3072, and 4096 bit keys
	- Diffie-Hellman: Recommended minimum key of 2048, but uses 3072 and 4096 bit keys for enhanced security 
	- Elliptic Curve Cryptography (ECC): ECC can provide the same security that is comparable to a RSA 3072-bit RSA key using a 256-bit key
- XOR Operation (exclusive OR): `0 ⊕ 0 = 0` `0 ⊕ 1 = 1` `1 ⊕ 0 = 1` `1 ⊕ 1 = 0` 
	- Applying XOR to a value with itself results in 0, but applying XOR to any value with 0 leaves it unchanged: `A ⊕ A = 0` `A ⊕ 0 = A`
	- Commutative and Associative
- Reversing XOR
	-  P = Plaintext, K = Shared Key, C = Ciphertext
	-  Start with: `C ⊕ K = (P ⊕ K) ⊕ K`
	-  Due to associative we know: `(P ⊕ K) ⊕ K = P ⊕ (K ⊕ K)`
	-  We also know: `K ⊕ K = 0`
	- Therefore: `(P ⊕ K) ⊕ K = P ⊕ (K ⊕ K) = P ⊕ 0 = P`
- Modulo Operator (% or mod): Remainder of X divided by y (X%Y)
	- Examples: `25%5 = 0 because 25 divided by 5 is 5, with a remainder of 0, i.e., 25 = 5 × 5 + 0`
	- Modulo is NOT reversible. If given `X%5 = 4` infinite values of x would satisfy the equation
	- Always returns a non-negative result less than the divisor: `any integer a and positive integer n, the result of a%n will always be in the range 0 to n − 1.`