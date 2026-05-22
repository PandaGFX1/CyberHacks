Tags: #Status/In-Progress #Type/Tool #Context/Redteam #Context/Windows #publish-me

---
## Overview
NetExec (nxc) is the actively maintained successor to CrackMapExec. It is a post-exploitation and network enumeration tool for assessing large Active Directory and Windows environments. Supports SMB, WinRM, MSSQL, SSH, LDAP, RDP, and other protocols — enables credential testing, share enumeration, remote command execution, and hash dumping from Linux.

> [!INFO]- Note on CrackMapExec:
> CrackMapExec (`cme`) is deprecated and no longer maintained. NetExec (`nxc`) has an identical interface — replace `crackmapexec` with `nxc` in any existing commands. Confirmed broken during HTB CJCA exam (April 2026): apt and pipx installs both failed.

## Target / Context
Windows and Active Directory environments during internal network penetration testing. Primary uses: SMB share enumeration, credential spraying, and remote command execution.

---
## Installation

> [!INFO]- Installation Commands:
> `pipx install netexec`
> `pipx upgrade netexec`

---
## Basic Usage

> [!INFO]- Basic Usage:
> `nxc <protocol> <target>`
> `nxc smb --help`
> `nxc --help`

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `smb` | Target SMB protocol | `nxc smb <IP>` |
> | `winrm` | Target WinRM protocol | `nxc winrm <IP>` |
> | `mssql` | Target MSSQL | `nxc mssql <IP>` |
> | `-u` | Username | `-u john` |
> | `-p` | Password | `-p 'password'` |
> | `-H` | NTLM hash (pass-the-hash) | `-H <hash>` |
> | `--users` | Enumerate domain/local users | `--users` |
> | `--shares` | Enumerate accessible shares | `--shares` |
> | `--continue-on-success` | Keep spraying after first hit | `--continue-on-success` |
> | `--spider <share>` | Spider share contents | `--spider Devs` |
> | `--pattern` | Filter spider results | `--pattern .` |
> | `--get-file` | Download file from share | `--get-file tmp.ps1 tmp.ps1` |
> | `-x` | Execute CMD command | `-x "whoami"` |
> | `-X` | Execute PowerShell command | `-X "whoami"` |
> | `--pass-pol` | Retrieve password policy | `--pass-pol` |
> | `--sam` | Dump SAM hashes (admin required) | `--sam` |
> | `--local-auth` | Authenticate as local account | `--local-auth` |

---
## Common Use Cases

### SMB Version and Host Detection
Identify SMB version and host details. SMBv1 indicates a likely vulnerable/legacy system.

> [!INFO]- Commands:
> `nxc smb <IP>`

### Null Session Enumeration
Test for anonymous access and enumerate users without credentials.

> [!INFO]- Commands:
> `nxc smb <IP> -u '' -p '' --users`

### Guest Session Share Enumeration
List available SMB shares using guest-level access.

> [!INFO]- Commands:
> `nxc smb <IP> -u guest -p '' --shares`

### Password Spraying (SMB)
Spray a single password against a list of usernames. Use `--continue-on-success` to avoid stopping on first hit.

> [!INFO]- Commands:
> `nxc smb <IP> -u <userlist.txt> -p 'password' --continue-on-success`
> `nxc smb <IP> -u <userlist.txt> -p <passlist.txt> --no-bruteforce --continue-on-success`

### Authenticated Share Spidering
Spider a specific share with valid credentials.

> [!INFO]- Commands:
> `nxc smb <IP> -u john -p 'password' --spider Devs --pattern .`

### Remote Command Execution (SMB)
Execute a command on a remote Windows host via SMB (requires admin).

> [!INFO]- Commands:
> `nxc smb <IP> -u Administrator -p 'password' -x "whoami"`

### Remote Command Execution (WinRM)
Execute a command via WinRM (port 5985/47001).

> [!INFO]- Commands:
> `nxc winrm <IP> -u john -p 'password' -x "whoami"`

### File Retrieval from Share
Download a specific file from an accessible SMB share.

> [!INFO]- Commands:
> `nxc smb <IP> -u john -p 'password' --share Devs --get-file tmp.ps1 tmp.ps1`

---
## Related Techniques
- (SMB Password Spraying — see Windows Pentest Playbook)

## Related Playbooks
- [[Windows Pentest Playbook]]
- [[Red Team]]

---
## References / Images
- https://github.com/Pennyw0rth/NetExec
- https://netexec.wiki/
