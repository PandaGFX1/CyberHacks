Tags: #Status/In-Progress #Type/Tool #Context/Network #Context/Redteam

---
## Overview
Hydra is a fast and flexible online password cracking tool that supports brute force attacks against live services. Unlike Hashcat which cracks offline hashes, Hydra attacks authentication services directly over the network — supporting dozens of protocols including FTP, SSH, HTTP, and more.

---
## Target / Context
Live network services requiring authentication. Targets include FTP, SSH, HTTP login forms, SMB, RDP, and many more. See https://en.kali.tools/?p=220 for full protocol options.

---
## Installation

> [!INFO]- Installation Commands:
> `apt install hydra`
> `dnf install hydra`

---
## Basic Usage

> [!INFO]- Basic Usage:
> `hydra -l <username> -P <wordlist> <protocol>://<target>`

---

## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-l` | Single username to use | `-l admin` |
> | `-L` | Username list file | `-L users.txt` |
> | `-p` | Single password to use | `-p password123` |
> | `-P` | Password list file | `-P /usr/share/wordlists/rockyou.txt` |
> | `-t` | Number of threads to spawn | `-t 4` |
> | `-V` | Verbose — show every attempt | `-V` |
> | `-s` | Custom port | `-s 2222` |
> | `-f` | Stop after first valid credentials found | `-f` |

---
## Common Use Cases

### FTP Brute Force

> [!INFO]- Commands:
> `hydra -l user -P passlist.txt ftp://10.10.185.65`

### SSH Brute Force

> [!INFO]- Commands:
> `hydra -l <username> -P /full/path/to/list 10.10.185.86 -t 4 ssh`
> `hydra -l <username> -P /full/path/to/list ssh://10.10.185.86`

### POST Web Form Brute Force
Attacking a web login form via HTTP POST request.

Structure: `hydra <username> <wordlist> <target> http-post-form "<path>:<login_creds>:<invalid_response>"`

| Component | Description | Example |
|-----------|-------------|---------|
| `<path>` | Login page URL path | `/login.php` or `/` |
| `<login_creds>` | Form fields with `^USER^` and `^PASS^` placeholders | `username=^USER^&password=^PASS^` |
| `<invalid_response>` | String returned by server on failed login | `F=incorrect` or `:incorrect` |

> [!INFO]- Commands:
> `hydra -l <username> -P <wordlist> 10.10.185.65 http-post-form "/:username=^USER^&password=^PASS^:F=incorrect" -V`
> `sudo hydra <username> <wordlist> 10.10.185.65 http-post-form "<path>:<login_creds>:<invalid_response>"`
> Note: `^USER^` and `^PASS^` are replaced with each username/password combination during the attack.

---
## Related Concepts
- [[Protocols]]

## Related Techniques
- [[Password Cracking]]

## Related Playbooks
-

---
## References / Images
- https://en.kali.tools/?p=220
