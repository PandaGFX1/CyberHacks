Tags: #Status/In-Progress #Type/Tool #Context/Redteam #publish-me

---
## Overview
smtp-user-enum is a Perl tool for enumerating valid user accounts on an SMTP server by exploiting the VRFY, EXPN, and RCPT TO commands. Each mode sends targeted SMTP commands and evaluates responses to determine whether a given username is valid. It is commonly used to build a username list for credential attacks against SMTP, SSH, or other services on the same host.

## Target / Context
SMTP servers — particularly those allowing VRFY/EXPN queries or accepting RCPT TO without full authentication. Most effective when the SMTP server runs on the same machine as SSH or other login services.

---
## Installation

> [!INFO]- Installation Commands:
> `sudo apt install smtp-user-enum`

---
## Basic Usage

> [!INFO]- Basic Usage:
> VRFY mode against a single target:
> `smtp-user-enum -M VRFY -U usernames.txt -t 10.129.42.195`

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-M` | Enumeration method: VRFY, EXPN, or RCPT | `-M VRFY` |
> | `-U` | Wordlist of usernames to test | `-U /path/to/usernames.txt` |
> | `-u` | Single username to test | `-u admin` |
> | `-t` | Single target IP | `-t 10.129.42.195` |
> | `-T` | File containing multiple target IPs | `-T mail-servers.txt` |
> | `-D` | Domain to append to usernames (e.g., for RCPT TO) | `-D example.com` |
> | `-w` | Timeout per connection in seconds (default 5) | `-w 10` |
> | `-p` | SMTP port (default 25) | `-p 587` |
> | `-v` | Verbose output | `-v` |

---
## Common Use Cases

### VRFY Mode — Direct User Existence Check

> [!INFO]- Commands:
> `smtp-user-enum -M VRFY -U usernames.txt -t 10.129.42.195`
>
> Note: Some servers return 252 (ambiguous) for all VRFY queries regardless of user validity — use RCPT as a backup.

### EXPN Mode — Expand Mailing List Aliases

> [!INFO]- Commands:
> `smtp-user-enum -M EXPN -u admin1 -t 10.0.0.1`
> `smtp-user-enum -M EXPN -D example.com -U usernames.txt -t 10.0.0.1`

### RCPT TO Mode — Most Reliable Method
RCPT TO is the most reliable method as it is harder for the server to lie about — the server must respond with whether it accepts delivery.

> [!INFO]- Commands:
> `smtp-user-enum -M RCPT -U users.txt -T mail-server-ips.txt`
> `smtp-user-enum -M RCPT -U usernames.txt -t 10.129.42.195 -w 10`
>
> Increase timeout (`-w 10`) for slow or rate-limited servers.

---

> [!INFO]- Username Wordlists
> Use SecLists for comprehensive username lists:
> `/opt/useful/seclists/Usernames/Names/names.txt`
> `/opt/useful/seclists/Usernames/xato-net-10-million-usernames.txt`

---
## Related Techniques
- [[Service Enumeration]]

## Related Playbooks
- [[Linux Pentest Playbook]]

---
## References / Images
- `man smtp-user-enum`
- https://github.com/danielmiessler/SecLists/tree/master/Usernames
