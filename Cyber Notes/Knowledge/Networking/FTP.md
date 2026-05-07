Tags: #Status/In-Progress #Type/Knowledge #Context/Network #publish-me

---
## Overview
FTP (File Transfer Protocol) is one of the oldest application-layer protocols for transferring files between a client and server over TCP/IP. It uses two separate channels — a control channel on TCP/21 for commands and a data channel on TCP/20 for file transfer. FTP transmits credentials and data in cleartext, making it a high-value target during network penetration tests. Misconfigured FTP servers frequently allow anonymous access and file uploads, which can lead to Local File Inclusion or Remote Code Execution vulnerabilities.

---

## Terminology
| Term | Definition |
|------|------------|
| FTP | File Transfer Protocol — application-layer protocol using TCP ports 20 (data) and 21 (control) |
| FTPS | FTP Secure — FTP with TLS/SSL encryption added |
| SFTP | SSH File Transfer Protocol — secure file transfer tunneled over SSH; not related to FTP |
| TFTP | Trivial File Transfer Protocol — simplified, connectionless FTP variant using UDP; no authentication |
| Active Mode | Client opens a random port and tells the server; server connects back to client — blocked by client-side firewalls |
| Passive Mode | Server opens a random port and tells the client; client connects to server — firewall-friendly |
| vsFTPd | Very Secure FTP Daemon — one of the most widely deployed FTP servers on Linux |
| Anonymous FTP | Login using `anonymous` as username and any email as password; used for public file distribution |
| SUID | Set User ID — file permission bit that runs a file with owner's privileges; relevant to FTP upload exploitation |

---
## Core Concepts

### Active vs Passive Mode
FTP requires a second channel for actual data transfers. How that channel is opened determines whether a firewall blocks it:

| Mode | How It Works | Firewall Behavior |
|------|-------------|-------------------|
| Active | Client sends PORT command with its IP and port; server initiates data connection back to client | Client-side firewalls block inbound server connection |
| Passive | Client sends PASV command; server responds with its IP and port; client initiates data connection | Client-initiated — passes through most firewalls |

Most modern FTP clients default to passive mode for compatibility.

---

### TFTP (Trivial File Transfer Protocol)
TFTP is a stripped-down FTP variant designed for simple file transfers where authentication is not needed.

- Uses **UDP** — connectionless and unreliable; no error correction
- No user authentication — access controlled only by OS file permissions
- No directory listing
- Typically used in local/protected networks for network booting (PXE), router firmware delivery, and device configuration
- Files accessible to all users globally by default

| TFTP Command | Description |
|-------------|-------------|
| `connect` | Set remote host and optional port |
| `get` | Transfer file(s) from remote to local |
| `put` | Transfer file(s) from local to remote |
| `status` | Show current transfer mode, connection status, timeout |
| `verbose` | Toggle verbose output |
| `quit` | Exit TFTP |

---

### vsFTPd Default Configuration
vsFTPd is configured via `/etc/vsftpd.conf`. Many settings are not included in the default config file and require the man page for reference. `/etc/ftpusers` denies specific system users from FTP access even if they have valid OS accounts.

Key configuration options:

| Setting | Description |
|---------|-------------|
| `listen=YES` | Run vsFTPd in standalone mode |
| `anonymous_enable=YES` | Allow anonymous login — common in internal environments |
| `local_enable=YES` | Allow local OS user accounts to log in |
| `write_enable=YES` | Allow write commands (STOR, DELE, RNFR, RNTO, etc.) |
| `local_umask=022` | File permission mask for uploaded files |
| `dirmessage_enable=YES` | Show .message file content when entering a directory |
| `use_localtime=YES` | Use local server time for directory listings |
| `xferlog_enable=YES` | Log all uploads and downloads |
| `connect_from_port_20=YES` | Use port 20 for data connections in active mode |
| `chroot_local_user=YES` | Jail local users to their home directory |
| `ssl_enable=YES` | Enable SSL/TLS support |
| `hide_ids=YES` | Replace user/group names with "ftp" in listings — obscures real usernames |
| `pasv_min_port` / `pasv_max_port` | Define port range for passive mode data connections |

---

### Dangerous Settings
| Setting | Risk |
|---------|------|
| `anonymous_enable=YES` | Anyone can connect and browse/download without credentials |
| `write_enable=YES` | Combined with anonymous access allows anonymous file uploads |
| `anon_upload_enable=YES` | Explicitly allows anonymous uploads |
| `anon_mkdir_write_enable=YES` | Allows anonymous users to create directories |
| `no_anon_password=YES` | No password prompt for anonymous login |
| `hide_ids=YES` | Attackers see "ftp" owner on all files — harder to identify real accounts, but also hides ownership cues |

If write access is enabled, uploaded files can be leveraged for **Local File Inclusion (LFI)** if the FTP root overlaps with a web root, or for **Remote Code Execution** via FTP log poisoning.

---

### Footprinting FTP

Scan port 21 and grab the service banner with [[Nmap]] (`-sV -sC`). FTP-specific NSE scripts can probe supported commands, auth methods, and anonymous login status.

Test manual interaction by connecting with [[Telnet]] or netcat — the FTP banner reveals the server software and version. For TLS-enabled FTP, use `openssl s_client -connect <target>:21 -starttls ftp` to inspect the certificate (CN, organization, expiry).

Download all files from an anonymous FTP share at once: `wget -m --no-passive ftp://anonymous:anonymous@<target>`

---

## Related Concepts
- [[Protocols]]
- [[Ports]]
- [[Footprinting & Enumeration]]

## Related Techniques
- [[Service Enumeration]]

## Related Tools
- [[Nmap]]
- [[Telnet]]

---
## References / Images
- `man vsftpd.conf`
- https://web.archive.org/web/20230326204635/https://www.smartfile.com/blog/the-ultimate-ftp-commands-list/
- https://en.wikipedia.org/wiki/List_of_FTP_server_return_codes
