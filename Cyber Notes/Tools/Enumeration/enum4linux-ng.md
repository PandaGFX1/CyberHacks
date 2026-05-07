Tags: #Status/In-Progress #Type/Tool #Context/Redteam #publish-me

---
## Overview
enum4linux-ng is a rewrite of the original enum4linux tool for enumerating information from Windows and Samba systems over SMB and LDAP. It automates queries that would otherwise require manual use of rpcclient, nmblookup, net, smbclient, and ldapsearch — covering shares, users, groups, OS info, password policies, and more. The `-ng` version adds JSON/YAML output, LDAP support, and better error handling.

## Target / Context
Windows and Samba SMB servers. Most effective against targets allowing null sessions or with known credentials.

---
## Installation

> [!INFO]- Installation Commands:
> ```
> git clone https://github.com/cddmp/enum4linux-ng.git
> cd enum4linux-ng
> pip3 install -r requirements.txt
> ```

---
## Basic Usage

> [!INFO]- Basic Usage:
> Full enumeration (all checks):
> `./enum4linux-ng.py <target> -A`
>
> Authenticated:
> `./enum4linux-ng.py <target> -A -u username -p password`

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-A` | Run all enumeration checks | `./enum4linux-ng.py <IP> -A` |
> | `-u` | Username | `-u administrator` |
> | `-p` | Password | `-p P@ssw0rd` |
> | `-d` | Enable LDAP enumeration (requires domain) | `-d` |
> | `-k` | Kerberos auth (requires domain) | `-k` |
> | `-oJ` | Output results as JSON | `-oJ results.json` |
> | `-oY` | Output results as YAML | `-oY results.yaml` |
> | `-v` | Verbose output | `-v` |
> | `-R` | Enumerate users via RID cycling | `-R` |

---
## Common Use Cases

### Full Null Session Enumeration

> [!INFO]- Commands:
> `./enum4linux-ng.py 10.129.14.128 -A`

### Authenticated Full Enumeration

> [!INFO]- Commands:
> `./enum4linux-ng.py 10.129.14.128 -A -u administrator -p "P@ssw0rd"`

### Save Output as JSON for Parsing

> [!INFO]- Commands:
> `./enum4linux-ng.py 10.129.14.128 -A -oJ results.json`
> `cat results.json | jq .`

---

> [!INFO]- Note
> enum4linux-ng automates many queries but not all. Always follow up with manual rpcclient and smbclient queries — different tools expose different data. Never rely solely on automated enumeration for complete results.

---
## Related Techniques
- [[Service Enumeration]]

## Related Playbooks
- [[Windows Pentest Playbook]]

---
## References / Images
- https://github.com/cddmp/enum4linux-ng
