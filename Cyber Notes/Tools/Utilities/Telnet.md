Tags: #Status/Reference #Type/Tool #Context/Network #Context/Linux #publish-me

---
## Overview
Telnet is an insecure plaintext protocol used to establish raw TCP connections to remote hosts and services. While largely replaced by SSH for remote administration, Telnet remains useful for manually interacting with and testing network services such as HTTP, SMTP, POP3, and FTP.

## Target / Context
Any service accepting raw TCP connections — commonly used for banner grabbing and manual protocol testing during recon.

---
## Installation

> [!INFO]- Installation Commands:
> Pre-installed on most Linux systems.
> `sudo apt install telnet`

---
## Basic Usage

> [!INFO]- Basic Usage:
> `telnet <IP> <PORT>`
> Establishes a raw TCP connection to the specified host and port. Supports `anonymous` login on some services.

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | IP | Target IP address or hostname | `telnet 10.10.10.1` |
> | PORT | Target port number | `telnet 10.10.10.1 80` |

---
## Common Use Cases

### Manual HTTP Request
Connect to port 80 and send a raw HTTP request.

> [!INFO]- Commands:
> `telnet <IP> 80`
> Then type: `GET /file HTTP/1.1`
> Then type: `Host: anything`

### SMTP Testing
Connect to port 25 and interact with the mail server.

> [!INFO]- Commands:
> `telnet <IP> 25`
> See [[Protocols]] for SMTP commands (HELO, MAIL FROM, DATA etc.)

### POP3 Testing
Connect to port 110 and interact with mail retrieval.

> [!INFO]- Commands:
> `telnet <IP> 110`
> See [[Protocols]] for POP3 commands (USER, PASS, LIST, RETR etc.)

### FTP-style File Navigation
FTP commands sent over the Telnet connection — not native Telnet commands.

> [!INFO]- Commands:
> `ls` — list files in current directory
> `get <filename>` — retrieve a file
> `put <filename>` — upload a file
> `cd <directory>` — change directory

---
## Related Concepts
- [[Protocols]]
- [[Ports]]
- [[Linux Fundamentals]]

## Related Techniques
-

## Related Playbooks
-

---
## References / Images
-
