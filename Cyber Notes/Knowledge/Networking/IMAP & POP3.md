Tags: #Status/In-Progress #Type/Knowledge #Context/Network #publish-me

---
## Overview
IMAP (Internet Message Access Protocol) and POP3 (Post Office Protocol 3) are the two primary protocols for retrieving email from a mail server. IMAP supports server-side folder management and multi-client synchronization, making it the modern standard. POP3 is a simpler, older protocol that downloads and optionally deletes messages. Both are commonly found in corporate environments and can be fingerprinted for version information and used for credential testing.

---

## Terminology
| Term | Definition |
|------|------------|
| IMAP | Internet Message Access Protocol — server-side email management with folder sync; TCP/143 (unencrypted), TCP/993 (TLS) |
| POP3 | Post Office Protocol 3 — download-and-optionally-delete email retrieval; TCP/110 (unencrypted), TCP/995 (TLS) |
| IMAPS | IMAP over SSL/TLS — encrypted IMAP on port 993 |
| POP3S | POP3 over SSL/TLS — encrypted POP3 on port 995 |
| Dovecot | Common open-source IMAP and POP3 server for Linux |
| Mailbox | Server-side storage location for a user's email |
| UID | Unique Identifier — persistent message ID used by IMAP |
| INBOX | Default IMAP folder for incoming mail |
| SASL | Simple Authentication and Security Layer — framework used for IMAP/POP3 authentication |

---
## Core Concepts

### IMAP vs POP3
| Feature | IMAP | POP3 |
|---------|------|------|
| Email storage | Stays on server | Downloaded to client (optionally deleted) |
| Multi-client sync | Yes — changes sync across all clients | No — each client has independent state |
| Folder management | Full server-side folders | None |
| Offline access | Supported via local copy | Default behavior |
| Protocol style | Stateful, persistent sessions | Simple request/response |
| Default port | 143 (plain), 993 (TLS) | 110 (plain), 995 (TLS) |

SMTP is used to send emails outbound; IMAP/POP3 retrieve emails inbound. IMAP also copies sent emails to a server-side folder so all clients can access them.

---

### IMAP Commands
IMAP commands are prefixed with a tag (e.g., `1`) so the client can match responses to requests. Multiple commands can be sent without waiting for each response.

| Command | Description |
|---------|-------------|
| `1 LOGIN <username> <password>` | Authenticate to the mail server |
| `1 LIST "" *` | List all mailbox folders |
| `1 CREATE "INBOX"` | Create a mailbox with a specified name |
| `1 DELETE "INBOX"` | Delete a mailbox |
| `1 RENAME "ToRead" "Important"` | Rename a mailbox |
| `1 LSUB "" *` | List subscribed/active mailbox folders |
| `1 SELECT INBOX` | Select a mailbox for message access |
| `1 UNSELECT INBOX` | Deselect the current mailbox |
| `1 FETCH <UID> all` | Retrieve all data for a message |
| `1 FETCH <UID> rfc822.text` | Retrieve the email body text |
| `1 FETCH <UID> rfc822.header` | Retrieve only the email headers |
| `1 FETCH <UID> BODY[]` | Retrieve full message (headers + body) |
| `1 CLOSE` | Remove all messages flagged for deletion |
| `1 LOGOUT` | End the session |

---

### POP3 Commands
| Command | Parameters | Description |
|---------|-----------|-------------|
| `USER` | `<username>` | Provide username |
| `PASS` | `<password>` | Provide password |
| `STAT` | — | Returns count and total size of messages in mailbox |
| `LIST` | — | Lists all messages with their IDs and sizes |
| `RETR` | `<id>` | Download message by ID |
| `DELE` | `<id>` | Mark message for deletion |
| `CAPA` | — | List server capabilities |
| `RSET` | — | Reset — cancel pending deletions |
| `QUIT` | — | Commit deletions and end session |

---

### Default Configuration
Managed by **Dovecot** (`dovecot-imapd`, `dovecot-pop3d`).

Key config locations:
- `/etc/dovecot/dovecot.conf` — main configuration
- `/etc/dovecot/conf.d/` — modular config directory

---

### Dangerous Settings
| Setting | Risk |
|---------|------|
| `auth_debug = yes` | Full authentication debug logging — exposes credentials in logs |
| `auth_debug_passwords = yes` | Submitted passwords and schemes logged in plaintext |
| `auth_verbose = yes` | Failed authentication attempts logged with reasons |
| `auth_verbose_passwords = yes` | Passwords used for failed attempts logged (possibly truncated) |
| `auth_anonymous_username` | Enables ANONYMOUS SASL mechanism — allows unauthenticated login |
| Plaintext auth without TLS | Credentials sent in cleartext |

Most companies use third-party email providers, but some run internal mail servers — which are often poorly maintained and misconfigured.

---

### Footprinting IMAP/POP3

Scan ports 110, 143, 993, and 995 with [[Nmap]] (`-sV -sC`) — Nmap retrieves TLS/SSL certificate details including CN, organization, and server location.

Connect with [[curl]] using the IMAPS URL scheme (`curl -k 'imaps://<target>' --user user:pass -v`) to enumerate the server banner and TLS certificate details. See [[curl]] for full flag reference.

Test TLS-enabled connections directly with `openssl s_client -connect <target>:imaps` (IMAP) or `openssl s_client -connect <target>:pop3s` (POP3), then send IMAP/POP3 commands interactively in the session.

---

## Related Concepts
- [[SMTP]]
- [[Protocols]]
- [[Ports]]
- [[Footprinting & Enumeration]]

## Related Techniques
- [[Service Enumeration]]

## Related Tools
- [[Nmap]]
- [[curl]]

---
## References / Images
- `man dovecot`
- https://www.atmail.com/blog/imap-commands/
- RFC 9051 (IMAP4rev2), RFC 1939 (POP3)
