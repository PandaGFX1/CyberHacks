Tags: #Status/In-Progress #Type/Tool #Context/Web #Context/Redteam

---
## Overview
Burp Intruder automates sending many payload variations to a target parameter — making it the core tool for fuzzing, directory enumeration, credential brute-forcing, and parameter injection within Burp Suite. Community Edition is rate-limited to approximately 1 request per second. For high-speed fuzzing without a Pro license, use [[OWASP ZAP]]'s fuzzer or CLI tools like [[GoBuster]] or [[Hydra]] instead.

## Target / Context
Any parameterized HTTP request. Used for directory and endpoint discovery, credential attacks, parameter fuzzing, and Active Directory web application spraying.

---
## Installation

> [!INFO]- Installation Commands:
> Part of Burp Suite — see [[Burp Suite]] for installation.

---
## Basic Usage

> [!INFO]- Basic Usage:
> 1. Right-click a request in Proxy History or Intercept pane → Send to Intruder (CTRL+I)
> 2. Navigate to Intruder tab (CTRL+SHIFT+I) — Target field is populated from the request
> 3. Positions tab — clear auto-detected markers, then select the target parameter and click Add §
> 4. Payloads tab — configure wordlist or payload type
> 5. Settings tab — configure matching, filtering, and resource options
> 6. Click Start Attack

---
## Flags & Options

> [!INFO]- Attack Types:
> | Type | Behavior | Best For |
> |------|----------|----------|
> | Sniper | One payload set inserted at each marked position in turn | Single-parameter fuzzing |
> | Battering Ram | One payload set inserted at ALL positions simultaneously | Testing one value across multiple params at once |
> | Pitchfork | Multiple payload sets inserted in parallel (set 1 → pos 1, set 2 → pos 2) | Known username/password pairs |
> | Cluster Bomb | Multiple payload sets — all combinations tested | Full credential brute-force |

> [!INFO]- Payload Types:
> | Type | Description |
> |------|-------------|
> | Simple List | Static wordlist — load from file or enter manually |
> | Runtime File | Loads entries line-by-line during the attack — avoids high memory usage for very large lists |
> | Character Substitution | Tries permutations using defined character swaps (e.g., leet speak) |
> | Numbers | Generates a numeric sequence with configurable range, step, and format |
> | Dates | Generates date sequences in configurable formats |

---
## Common Use Cases

### Directory and Path Fuzzing

> [!INFO]- Steps:
> 1. Capture a `GET /DIRECTORY/ HTTP/1.1` request in Proxy → CTRL+I
> 2. Positions tab → Clear § → select the directory name portion → Add §
> 3. Payloads tab → Type: Simple List → Load → select wordlist (e.g., `seclists/Discovery/Web-Content/common.txt`)
> 4. Payload Processing → Add Rule → "Skip if matches regex" → pattern: `^\..*$` (skips dotfile entries)
> 5. Settings tab → Grep - Match → Clear → type `200 OK` → Add (flags successful responses)
> 6. Start Attack → sort by the grep match column to isolate hits

### Credential Brute Force

> [!INFO]- Steps:
> 1. Capture a login POST request → CTRL+I
> 2. Positions tab → use Pitchfork attack type
> 3. Mark the username and password fields as separate payload positions
> 4. Payload Set 1: username list; Payload Set 2: password list
> 5. Start Attack → sort by response length or status code to identify a successful login

### Password Spraying (AD Web Applications)
Targets OWA (Outlook Web Access), SSL VPN portals, RDS web clients, Citrix, and custom web applications using Active Directory authentication.

> [!INFO]- Steps:
> 1. Capture a failed login POST request → CTRL+I
> 2. Positions tab → Sniper attack type → mark only the username field
> 3. Set the password field to a fixed spray value (e.g., `Winter2024!`) before marking positions
> 4. Load a username list as the payload
> 5. Start Attack → filter by response code and body length to find a valid login

---
## Settings Reference

> [!INFO]- Grep Options:
> | Option | Purpose |
> |--------|---------|
> | Grep - Match | Flag responses that contain a specific string — useful for isolating 200 OK or error messages |
> | Grep - Extract | Pull a specific value out of each response into the results table — useful when responses are long |

> [!INFO]- Payload Processing Rules:
> Applied to every wordlist entry before it is sent.
> | Rule Type | Example Use |
> |-----------|-------------|
> | Skip if matches regex | Skip dotfiles: `^\..*$` |
> | Add prefix | Prepend a path component |
> | Add suffix | Append `.php`, `.bak`, or other extensions |
> | Encode | URL-encode or hash payloads before sending |

> [!INFO]- Resource Pool:
> Configure via Settings tab → Resource Pool
> Controls the number of concurrent threads and request rate — relevant for managing impact on the target or staying within rate limits.
> Community Edition thread count does not bypass the overall speed throttle.

---
## Related Techniques
- [[DNS Enumeration]]
- [[SQL Injection]]
- [[XSS]]

## Related Playbooks
- [[Linux Pentest Playbook]]

## Related Tools
- [[Burp Suite]]
- [[Burp Proxy]]
- [[GoBuster]]
- [[Hydra]]
- [[OWASP ZAP]]

---
## References / Images
- https://portswigger.net/burp/documentation/desktop/tools/intruder
- https://portswigger.net/burp/documentation/desktop/tools/intruder/configure-attack/payload-types
