Tags: #Status/In-Progress #Type/Tool #Context/Web #Context/Cryptography

---
## Overview
CyberChef is a web-based Swiss Army Knife for data operations. Supports a wide range of tasks — from simple encoding like XOR or Base64 to complex operations such as AES encryption. Available online or as a local copy run through a web browser.

## Target / Context
Any data requiring encoding, decoding, encryption, decryption, extraction, or format conversion. Commonly used during CTF challenges and forensics investigations.

---
## Installation

> [!INFO]- Installation Commands:
> No installation required — access online or download a local copy.
> See https://gchq.github.io/CyberChef/ for online access and downloads.

---
## Basic Usage

> [!INFO]- Basic Usage:
> 1. Set a clear objective: What do I want to accomplish?
> 2. Put data into the input area
> 3. Select or search for the relevant operation from the sidebar
> 4. Check output: Have we achieved our result?
> Tips: You can add a whole folder or file as input, use multiple tabs, and replace input with output.

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Option | Description |
> |--------|-------------|
> | Input | Accepts text, files, or entire folders |
> | Tabs | Multiple tabs supported for parallel operations |
> | Replace Input | Swap output back into input for chained operations |

---
## Common Use Cases

### Data Encoding / Decoding

> [!INFO]- Commands:
> Operations: From Base64, To Base64, URL Decode, From Base85, From Base58, To Base62

### Extracting Data

> [!INFO]- Commands:
> Operations: Extract IP Addresses, Extract Email Addresses, Extract URLs

### Date and Time Conversion

> [!INFO]- Commands:
> Operations: From UNIX Timestamp, To UNIX Timestamp

### Thought Process for Unknown Data
[[Assets/Images/Pasted image 20250424072611.png|CyberChef Thought Process]]

> [!INFO]- Steps:
> 1. Set objective — what format or value are you trying to recover?
> 2. Input the data
> 3. Research what encoding or encryption might be in use — browse categories
> 4. Apply operations and verify output matches expectation

---
## Related Concepts
- [[Cryptography Basics]]
- [[Hashing Basics]]

## Related Techniques
-

## Related Playbooks
-

---
## References / Images
- [[Assets/Images/Pasted image 20250424072611.png|CyberChef Thought Process]]
- https://gchq.github.io/CyberChef/
