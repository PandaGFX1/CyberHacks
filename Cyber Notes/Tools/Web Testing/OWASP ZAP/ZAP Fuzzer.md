Tags: #Status/In-Progress #Type/Tool #Context/Web #Context/Redteam

---
## Overview
ZAP Fuzzer automates sending many payload variations to a target parameter for directory enumeration, credential brute-forcing, and parameter injection testing. Unlike Burp Intruder's Community Edition, ZAP Fuzzer has no speed throttle — it runs as fast as the target allows and the machine can sustain.

## Target / Context
Any parameterized HTTP request. Used for directory and endpoint discovery, cookie/token brute-forcing, and parameter fuzzing where speed matters.

---
## Installation

> [!INFO]- Installation Commands:
> Part of OWASP ZAP — see [[OWASP ZAP]] for installation.

---
## Basic Usage

> [!INFO]- Basic Usage:
> 1. Locate the target request in Proxy History or Site Map
> 2. Right-click → Attack → Fuzz
> 3. Locations tab: select the value to fuzz and click Add
> 4. Payloads tab: configure wordlist or payload type
> 5. Processors tab (optional): add transforms to each payload before sending
> 6. Options tab: tune thread count and scan mode
> 7. Start Fuzzer → sort results by Response Code or Size Resp. Body

---
## Configuration Reference

### Locations (Payload Positions)
Select the specific text within the request to replace with fuzzer payloads. Highlight the target value and click Add — a payload configuration dialog opens immediately.

### Payload Types

> [!INFO]- Available Payload Types:
> | Type | Description |
> |------|-------------|
> | File | Load a wordlist from a local file |
> | File Fuzzers | Use built-in ZAP wordlist databases (DirBuster, JBroFuzz, etc.) |
> | Numbers | Generate a numeric sequence with configurable start, end, and increment |
> | Strings | Provide a manual list of values |
> | Script | Run a custom script to generate payloads dynamically |

File Fuzzers wordlists can be extended via the ZAP Marketplace — installing FuzzDB Offensive adds attack-specific lists including `FuzzDB > Attack > OS-CMD-Execution`.

### Processors
Applied to each payload before it is sent. Add via the Processors tab inside the payload configuration dialog.

> [!INFO]- Processor Types:
> | Processor | Use Case |
> |-----------|----------|
> | URL Encode / Decode | Ensure payloads are properly URL-safe |
> | Base64 Encode / Decode | Cookie or token value manipulation |
> | MD5 / SHA-1 / SHA-256 / SHA-512 Hash | When the application stores or compares hashed values |
> | Prefix / Postfix String | Append extensions (`.php`, `.bak`) or prepend path components |
> | Script | Run a custom script on every payload before sending |

### Options

> [!INFO]- Key Options:
> | Setting | Recommendation | Notes |
> |---------|---------------|-------|
> | Concurrent Scanning Threads | 20 | Balance speed against server tolerance and your machine's resources |
> | Depth First | Try all payloads on one position before the next | Best for per-user password brute-forcing |
> | Breadth First | Try one payload across all positions before advancing | Best for password spraying — tries each password for all users before moving on |

---
## Common Use Cases

### Directory and Path Fuzzing

> [!INFO]- Steps:
> 1. Browse to the target using the built-in browser — request appears in Site Map
> 2. Site Map → right-click request → Attack → Fuzz
> 3. Locations: highlight the directory segment of the path → Add
> 4. Payloads: Type = File Fuzzers → select DirBuster wordlist (e.g., `directory-list-2.3-medium.txt`)
> 5. Options: set Concurrent Threads to 20
> 6. Start Fuzzer → sort by Response Code — look for 200s
> 7. Check `Size Resp. Body` — different sizes often indicate a real page vs. a 404 with a custom response body

### Cookie / Parameter Brute Force with Hashing

> [!INFO]- Example — MD5-Hashed Cookie Brute Force:
> History tab → locate a request with a session cookie → right-click → Attack → Fuzz
> Locations: highlight the cookie value → Add
> Payloads: Type = File → load a username wordlist (e.g., seclists top-usernames-shortlist)
> Processors: Add → MD5 Hash
> Start → sort by `Size Resp. Body` — a deviating response size or code indicates a valid match

### Credential Brute Force
Right-click a login POST request from History → Attack → Fuzz.
Mark the password field as the payload location. Use Depth First mode to exhaust all passwords per username before moving to the next.

---
## Reading Results
- **Response Code** — sort by this first; filter for 200 or other non-default codes
- **Size Resp. Body** — a different size from the baseline often means a real hit even when the status code is the same
- **RTT (Round Trip Time)** — elevated RTT on specific payloads can indicate time-based SQL injection

---
## Related Techniques
- [[DNS Enumeration]]
- [[SQL Injection]]
- [[XSS]]

## Related Playbooks
- [[Linux Pentest Playbook]]

## Related Tools
- [[OWASP ZAP]]
- [[ZAP Proxy]]
- [[ZAP Scanner]]
- [[Burp Intruder]]
- [[GoBuster]]
- [[Hydra]]

---
## References / Images
- https://www.zaproxy.org/docs/desktop/addons/fuzzer/
