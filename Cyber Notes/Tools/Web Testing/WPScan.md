Tags: #Status/In-Progress #Type/Tool #Context/Redteam #Context/Web #publish-me

---
## Overview
WPScan is a black-box WordPress security scanner used to identify vulnerabilities, enumerate plugins and themes, detect user accounts, and audit WordPress installations. It is commonly used during web application reconnaissance to surface exploitable components in WordPress-based targets.

## Target / Context
WordPress-based web applications during external or internal web penetration testing.

---
## Installation

> [!INFO]- Installation Commands:
> `gem install wpscan`
> Docker: `docker pull wpscanteam/wpscan`

---
## Basic Usage

> [!INFO]- Basic Usage:
> `wpscan --url https://<target>`

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `--url` | Target WordPress URL | `--url https://10.129.12.10` |
> | `-e p` | Enumerate installed plugins | `-e p` |
> | `-e u` | Enumerate user accounts | `-e u` |
> | `-e t` | Enumerate installed themes | `-e t` |
> | `-e ap` | Enumerate all plugins (passive + aggressive) | `-e ap` |
> | `--plugins-detection` | Set plugin detection mode: passive, mixed, aggressive | `--plugins-detection aggressive` |
> | `--disable-tls-checks` | Skip TLS/SSL certificate verification | `--disable-tls-checks` |
> | `--no-banner` | Suppress the WPScan banner in output | `--no-banner` |
> | `-t` | Number of threads to use | `-t 100` |
> | `-o` | Write output to a file | `-o wpscan_results.txt` |
> | `--api-token` | WPScan API token for vulnerability data from WPVulnDB | `--api-token <token>` |
> | `--password-attack` | Attack method for brute force: `xmlrpc` or `wp-login` | `--password-attack xmlrpc` |
> | `-U` | Target username(s) for brute force; comma-separated | `-U admin,editor` |
> | `-P` | Path to password wordlist for brute force | `-P /usr/share/wordlists/rockyou.txt` |

---
## Common Use Cases

### Plugin Enumeration (Aggressive)
Enumerates all plugins using aggressive detection — sends more requests but finds more results.

> [!INFO]- Commands:
> `wpscan -e p --url https://10.129.12.10 --disable-tls-checks --no-banner --plugins-detection aggressive -t 100`

### User Enumeration
Enumerate WordPress user accounts, which can then be targeted for brute-force or credential testing.

> [!INFO]- Commands:
> `wpscan --url https://<target> -e u --disable-tls-checks`

### Full Enumeration
Enumerate plugins, themes, users, and timthumbs in a single run.

> [!INFO]- Commands:
> `wpscan --url https://<target> -e ap,at,u --disable-tls-checks --no-banner -t 50`

### Password Brute Force
Brute-force credentials against a WordPress login using either the xmlrpc.php endpoint or the wp-login form. The xmlrpc method is generally faster and less likely to be blocked.

> [!INFO]- Commands:
> `wpscan --password-attack xmlrpc -t 20 -U <user1>,<user2> -P <wordlist.txt> --url http://<target>`
> `wpscan --password-attack wp-login -t 5 -U <username> -P <wordlist.txt> --url http://<target>`

| Flag | Description |
|------|-------------|
| `--password-attack xmlrpc` | Attack via the XML-RPC endpoint (faster; multiple credentials per request) |
| `--password-attack wp-login` | Attack via the standard login form |
| `-U <user>` | Target username(s); comma-separated for multiple |
| `-P <file>` | Path to the password wordlist |

### Vulnerability Research via Metasploit
After identifying a plugin or theme version, search for known exploits in Metasploit.

> [!INFO]- Commands:
> `msfconsole -q`
> `search wordpress <plugin-name>`
> `use 0`
> `info 0` — verify the module targets the identified version before using

---
## Related Techniques
- [[WordPress Attacks]]
- [[SQL Injection]]

## Related Playbooks
- [[Linux Pentest Playbook]]
- [[Red Team]]

---
## References / Images
- https://github.com/wpscanteam/wpscan
