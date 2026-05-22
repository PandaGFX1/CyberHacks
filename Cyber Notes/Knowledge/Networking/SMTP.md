Tags: #Status/In-Progress #Type/Knowledge #Context/Network #publish-me

---
## Overview
SMTP (Simple Mail Transfer Protocol) is the standard protocol for sending email between servers and from email clients to their outgoing mail server. It operates primarily on TCP/25 (server-to-server) and TCP/587 (client-to-server with authentication). SMTP transmits in cleartext by default; encrypted variants use STARTTLS or TCP/465 (SMTPS). Mail spoofing, open relay abuse, and user enumeration via VRFY/EXPN are the primary attack vectors during penetration tests.

---

## Terminology
| Term | Definition |
|------|------------|
| SMTP | Simple Mail Transfer Protocol — used to send and relay email |
| ESMTP | Extended SMTP — extension of SMTP supporting AUTH, STARTTLS, and other extensions; triggered by `EHLO` |
| MUA | Mail User Agent — the client software (Outlook, Thunderbird) that composes and sends email |
| MSA | Mail Submission Agent — validates and relays email from MUA to MTA; also called Relay Server |
| MTA | Mail Transfer Agent — software that routes email between servers; checks for spam/size |
| MDA | Mail Delivery Agent — delivers email to the recipient's mailbox |
| Open Relay | SMTP server misconfigured to forward email from any sender to any recipient |
| Mail Spoofing | Forging the sender address in an email — enabled by open relays and weak authentication |
| STARTTLS | Command to upgrade a plaintext SMTP connection to TLS encryption |
| SPF | Sender Policy Framework — DNS TXT record specifying authorized sending IPs for a domain |
| DKIM | DomainKeys Identified Mail — cryptographic email signature to verify sender authenticity |
| DMARC | Domain-based Message Authentication, Reporting and Conformance — policy combining SPF and DKIM |

---
## Core Concepts

### Mail Flow
Email delivery follows a pipeline of agents:

`Client (MUA) → Submission Agent (MSA) → Mail Transfer Agent (MTA) → Mail Delivery Agent (MDA) → Mailbox (POP3 / IMAP)`

1. Client composes email and uploads it to the MTA (with MSA validation)
2. MTA checks email for size, spam, and stores it temporarily
3. MTA performs DNS MX record lookup to find the recipient's mail server IP
4. Data is relayed to the destination SMTP server
5. MDA delivers the email to the recipient's mailbox
6. Recipient retrieves it via **IMAP** (server-synced) or **POP3** (download and delete)

---

### SMTP Commands
| Command | Parameters | Description |
|---------|-----------|-------------|
| `HELO` | `<hostname>` | Client identifies itself; starts session (basic SMTP) |
| `EHLO` | `<hostname>` | Client identifies itself using ESMTP — enables extensions like AUTH and STARTTLS |
| `AUTH PLAIN` | `<base64-credentials>` | Authenticate using PLAIN mechanism (safe over TLS) |
| `MAIL FROM:` | `<sender@domain>` | Specify the sender email address |
| `RCPT TO:` | `<recipient@domain> [NOTIFY=success,failure]` | Specify the recipient; optionally request delivery notification |
| `DATA` | *(body follows, end with `.` on its own line)* | Begin email body transmission |
| `RSET` | — | Abort current transmission; keep connection open |
| `VRFY` | `<username>` | Check if a mailbox exists — used for user enumeration; may return 252 even for nonexistent users |
| `EXPN` | `<alias>` | Expand a mailing list alias to its members — reveals usernames |
| `NOOP` | — | Keep connection alive; server responds with 250 OK |
| `QUIT` | — | End the session |

**Example: Send an email manually via telnet/netcat:**
```
EHLO attacker.local
MAIL FROM: <test@attacker.local>
RCPT TO: <target@victim.com> NOTIFY=success,failure
DATA
From: <test@attacker.local>
To: <target@victim.com>
Subject: Test
Date: Mon, 04 Apr 2026 12:00:00 +0000

Test message body.
.
QUIT
```

---

### Default Configuration
Config file: `/etc/postfix/main.cf`

Key settings:
| Setting | Description |
|---------|-------------|
| `myhostname` | FQDN of the mail server |
| `mydomain` | Domain name of the mail server |
| `myorigin` | Domain added to unqualified addresses |
| `inet_interfaces` | Network interfaces to listen on |
| `mydestination` | Domains this server receives mail for |
| `mynetworks` | IP ranges authorized to relay through this server |
| `relayhost` | Upstream relay server |
| `smtpd_banner` | Banner shown to connecting clients |

---

### Dangerous Settings
| Setting | Risk |
|---------|------|
| `mynetworks = 0.0.0.0/0` | Open relay — allows anyone to send email through the server |
| `smtpd_recipient_restrictions` not set | No relay restrictions; allows spam relay |
| `disable_vrfy_command = no` | VRFY command enabled — exposes user enumeration |
| STARTTLS not enforced | Credentials sent in cleartext |

**Open relay abuse:** Attackers route email through a trusted relay server to bypass spam filters. Administrators who misconfigure `mynetworks` to allow all IPs (both external and internal) create open relays that can be abused in external and internal tests.

---

### Footprinting SMTP

Scan ports 25, 465, and 587 with [[Nmap]] (`-sV -sC`). The `smtp-open-relay` NSE script runs 16 tests specifically to identify open relay configuration. See [[Nmap]] for full script usage.

Connect via proxy: `CONNECT <target-ip>:25 HTTP/1.0`

---

### User Enumeration
VRFY and EXPN can confirm username existence before brute-forcing other services like SSH.

See [[smtp-user-enum]] for the dedicated tool.

**Quick manual VRFY:** connect with netcat or telnet to port 25 and send `VRFY <username>` interactively.

> [!INFO]- Note on Response Code 252
> Some SMTP servers respond with `252 Cannot VRFY user` even for users that do exist — treating this as "user doesn't exist" causes false negatives. Use RCPT TO as an alternative verification method.

**SecLists username wordlist for SMTP enumeration:**
`/opt/useful/seclists/Usernames/Names/names.txt`

> The footprinting-specific wordlist referenced in the original HTB module is superseded by SecLists — use SecLists for more comprehensive username lists.

---

## Related Concepts
- [[Protocols]]
- [[Ports]]
- [[IMAP & POP3]]
- [[Footprinting & Enumeration]]

## Related Techniques
- [[Service Enumeration]]

## Related Tools
- [[smtp-user-enum]]
- [[Nmap]]

---
## References / Images
- `man postfix`
- https://serversmtp.com/smtp-error/
- RFC 5321 (SMTP), RFC 5322 (Internet Message Format)
