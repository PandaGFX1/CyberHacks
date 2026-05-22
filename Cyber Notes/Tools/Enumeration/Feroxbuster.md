Tags: #Status/In-Progress #Type/Tool #Context/Web #Context/Redteam

---
## Overview
Feroxbuster is a fast, recursive web content discovery tool written in Rust. It is designed for brute-force discovery of unlinked content — files and directories that exist on a web server but are not linked from any public page. Its primary differentiator from Gobuster is built-in automatic recursion: Feroxbuster continuously fans out into newly discovered directories without manual intervention, making it more thorough for deeply nested applications. It also includes wildcard response detection to avoid false positives on servers that return 200 for all requests.

## Target / Context
Web servers during the enumeration and recon phase of a CTF or engagement. Best choice when the target application has a complex, multi-level directory structure and you need deep recursive scanning without manually re-running the tool for each discovered path.

---
## Installation

> [!INFO]- Installation Commands:
> Linux quick install:
> `curl -sL https://raw.githubusercontent.com/epi052/feroxbuster/main/install-nix.sh | sudo bash -s $HOME/.local/bin`
>
> Alternative via cargo (Rust package manager):
> `cargo install feroxbuster`
>
> Kali/Parrot (apt):
> `sudo apt install feroxbuster`

---
## Basic Usage

> [!INFO]- Basic Usage:
> `feroxbuster --url http://<target> -w /path/to/wordlist`
>
> Recursive scan with extension filtering:
> `feroxbuster --url http://<target> -w /usr/share/seclists/Discovery/Web-Content/raft-large-directories.txt -x php,html,bak`

---
## Flags & Options

> [!INFO]- Core Flags:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `--url` | Target URL | `--url http://target.com` |
> | `-w` | Wordlist path | `-w /usr/share/seclists/Discovery/Web-Content/raft-large-directories.txt` |
> | `-x` | File extensions to append | `-x php,html,bak,js` |
> | `-t` | Number of concurrent threads (default: 50) | `-t 100` |
> | `-d` | Maximum recursion depth (default: 4) | `-d 2` |
> | `--no-recursion` | Disable automatic recursion | `--no-recursion` |
> | `-o` | Write output to file | `-o results.txt` |
> | `-k` | Disable TLS certificate verification | `-k` |
> | `-H` | Custom header | `-H "Authorization: Bearer token"` |
> | `--proxy` | Route traffic through a proxy | `--proxy http://127.0.0.1:8080` |
> | `--rate-limit` | Limit requests per second | `--rate-limit 100` |

> [!INFO]- Filter Flags:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-s` / `--status-codes` | **Include** only responses with these status codes (allowlist; default: all) | `-s 200,204,301,302` |
> | `-C` / `--filter-status` | **Exclude** responses with these status codes (denylist) | `-C 404,500` |
> | `-S` / `--filter-size` | **Exclude** responses of this size in bytes | `-S 1024` |
> | `-W` / `--filter-words` | **Exclude** responses with this word count | `-W 0-10` |
> | `-N` / `--filter-lines` | **Exclude** responses with this line count | `-N 50` |
> | `-X` / `--filter-regex` | **Exclude** responses whose body or headers match this regex | `-X "Access Denied"` |
> | `--filter-similar-to` | **Exclude** responses similar to a given URL (removes near-duplicates) | `--filter-similar-to http://target/404` |
> | `--dont-scan` | Skip specific URLs or patterns even when found during recursion | `--dont-scan /uploads` |

---
## Common Use Cases

### Recursive Directory Discovery
Feroxbuster's main use case. It discovers directories, then automatically starts new scans within each one up to the configured depth.

> [!INFO]- Commands:
> `feroxbuster --url http://<target> -w /usr/share/seclists/Discovery/Web-Content/raft-large-directories.txt -d 2 -t 50`
>
> With extensions and size filtering to reduce noise:
> `feroxbuster --url http://<target> -w /usr/share/seclists/Discovery/Web-Content/common.txt -x php,bak -S 0 -C 404`

---

### Filtered Scan — Reducing Noise
Combine filters to zero in on meaningful responses. Status and size filters are the most effective first pass.

> [!INFO]- Commands:
> Include only successful and redirect responses:
> `feroxbuster --url http://<target> -w wordlist.txt -s 200,301,302`
>
> Exclude a known error page size and filter a common error message:
> `feroxbuster --url http://<target> -w wordlist.txt -S 10240 -X "error" -C 404,500`

---

### Excluding Known Uninteresting Paths
Useful when recursion is enabled but certain paths (e.g. media uploads, cached assets) would generate excessive noise.

> [!INFO]- Commands:
> `feroxbuster --url http://<target> -w wordlist.txt --dont-scan /uploads --dont-scan /assets`

---
## Related Techniques
- [[VHost Fuzzing]]
- [[Subdomain Enumeration]]

## Related Playbooks
- [[Linux Pentest Playbook]]

---
## References / Images
- https://github.com/epi052/feroxbuster
