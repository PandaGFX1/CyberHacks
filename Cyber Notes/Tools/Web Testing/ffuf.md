Tags: #Status/In-Progress #Type/Tool #Context/Web #Context/Redteam

---
## Overview
ffuf (Fuzz Faster U Fool) is a fast, Go-based web fuzzer that uses a `FUZZ` keyword as a placeholder in a URL, header, or POST body — replacing it with each entry from a wordlist on every request. It is the go-to tool for directory and file enumeration, parameter discovery, VHost brute-forcing, and any other web fuzzing task that benefits from speed and flexible filtering.

## Target / Context
Any web application endpoint. Most commonly used during the recon and enumeration phases to discover hidden directories, files, GET/POST parameters, and virtual hosts.

---
## Installation

> [!INFO]- Installation Commands:
> `go install github.com/ffuf/ffuf/v2@latest`
> Requires Go installed: `sudo apt install -y golang`

---
## Basic Usage

> [!INFO]- Basic Usage:
> Place `FUZZ` anywhere in the URL, header value, or POST body where you want wordlist entries substituted:
> `ffuf -w <wordlist> -u http://<target>/FUZZ`
> `ffuf -w <wordlist> -u "http://<target>/page.php?param=FUZZ"`
> `ffuf -w <wordlist> -u http://<target>/FUZZ -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "param=FUZZ"`

---
## Flags & Options

> [!INFO]- Core Flags:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-w` | Wordlist path | `-w /usr/share/seclists/Discovery/Web-Content/common.txt` |
> | `-u` | Target URL with FUZZ placeholder | `-u http://target/FUZZ` |
> | `-e` | File extensions to append to each wordlist entry | `-e .php,.html,.bak,.js` |
> | `-X` | HTTP method | `-X POST` |
> | `-H` | Custom request header | `-H "Content-Type: application/x-www-form-urlencoded"` |
> | `-d` | POST body data (use FUZZ in value to fuzz parameters) | `-d "username=admin&password=FUZZ"` |
> | `-ic` | Ignore comments in wordlist (lines starting with `#`) | `-ic` |
> | `-v` | Verbose output — shows full URL and redirect location | `-v` |
> | `-o` | Write output to file | `-o results.txt` |
> | `-of` | Output format (`json`, `csv`, `ejson`, `html`, `md`, `all`) | `-of json` |
> | `-t` | Number of concurrent threads (default: 40) | `-t 50` |
> | `-rate` | Maximum requests per second | `-rate 500` |
> | `-timeout` | HTTP request timeout in seconds | `-timeout 10` |

> [!INFO]- Recursion Flags:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-recursion` | Automatically re-fuzz discovered directories | `-recursion` |
> | `-recursion-depth` | Maximum recursion depth | `-recursion-depth 2` |

> [!INFO]- Filter & Match Flags:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-mc` | **Match** — include only responses with these status codes (default: 200-299,301,302,307,401,403,405,500) | `-mc 200,301` |
> | `-fc` | **Filter** — exclude responses with these status codes | `-fc 404,400` |
> | `-ms` | **Match** — include only responses of this size in bytes | `-ms 3456` |
> | `-fs` | **Filter** — exclude responses of this size in bytes | `-fs 0,1024` |
> | `-mw` | **Match** — include only responses with this word count | `-mw 5-10` |
> | `-fw` | **Filter** — exclude responses with this word count | `-fw 219` |
> | `-ml` | **Match** — include only responses with this line count | `-ml 20` |
> | `-fl` | **Filter** — exclude responses with this line count | `-fl 10` |
> | `-mt` | **Match** — include only responses exceeding this response time (ms) | `-mt >500` |

---
## Common Use Cases

### Wordlists — SecLists Reference

> [!INFO]- Recommended Wordlists:
> | Wordlist | Best For |
> |----------|---------|
> | `Discovery/Web-Content/common.txt` | General-purpose; broad range of common dirs and files |
> | `Discovery/Web-Content/directory-list-2.3-medium.txt` | Directory brute-force; large and thorough |
> | `Discovery/Web-Content/raft-large-directories.txt` | Massive directory collection; use when medium misses things |
> | `Discovery/Web-Content/big.txt` | Both directories and files; large and slow |
> | `Discovery/DNS/subdomains-top1million-5000.txt` | VHost and subdomain fuzzing |
> Install SecLists: `sudo apt install seclists` or clone from https://github.com/danielmiessler/SecLists

---

### Directory Enumeration

> [!INFO]- Commands:
> `ffuf -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt -u http://<target>/FUZZ`
> Sends each wordlist entry as a path segment. Responses with status 200/301 indicate discovered directories.

---

### File Enumeration
Adding `-e` appends extensions to each wordlist entry, so `config` becomes `config.php`, `config.html`, etc. This increases request volume — balance thoroughness against scan speed.

> [!INFO]- Commands:
> `ffuf -w /usr/share/seclists/Discovery/Web-Content/common.txt -u http://<target>/FUZZ -e .php,.html,.txt,.bak,.js -v`
> Common extensions to target:
> - `.php` — server-side scripting
> - `.bak` — backup files (often not protected)
> - `.html` — static pages
> - `.txt` — notes, credentials, logs
> - `.js` — client-side logic and potentially exposed API keys

---

### Recursive Fuzzing
Recursive mode automatically re-fuzzes any directory ffuf discovers, building out the full directory tree without manual intervention. A 301 redirect from the server tells ffuf to start a new fuzzing process within that directory.

Note: Recursion is resource-intensive. Limit depth and rate on real targets to avoid overwhelming the server or triggering defences.

> [!INFO]- Commands:
> `ffuf -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt -ic -u http://<target>/FUZZ -e .html -recursion -recursion-depth 2 -rate 500`
> `-ic` strips comment lines from the wordlist to prevent `#` characters being sent as path entries.

---

### GET Parameter Fuzzing

> [!INFO]- Commands:
> `ffuf -w /usr/share/seclists/Discovery/Web-Content/common.txt -u "http://<target>/page.php?param=FUZZ" --hc 404`
> Use when curl reveals a parameter name exists but the valid value is unknown — replace the value with `FUZZ`.

---

### POST Parameter Fuzzing
POST parameters are transmitted in the request body rather than the URL. The `-d` flag sets the body; `-H` sets the correct content type so the server parses the data correctly.

> [!INFO]- Commands:
> `ffuf -u http://<target>/login.php -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "username=admin&password=FUZZ" -w /usr/share/seclists/Passwords/Common-Credentials/10-million-password-list-top-1000.txt -mc 200 -v`
> Matches only 200 responses — useful when the login page returns 200 on success and a redirect or different code on failure.

---

### VHost Fuzzing
Brute-forces the HTTP `Host` header to find virtual hosts not exposed via DNS. ffuf replaces `FUZZ` inside the header value with each wordlist entry.

> [!INFO]- Commands:
> `ffuf -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt -u http://<target-ip> -H "Host: FUZZ.<target-domain>" -fs <default-response-size>`
> Run a baseline request first to get the default response size, then use `-fs` to filter it out — valid VHosts return a noticeably different response size.

---

### Validate Findings
Not every hit is a real vulnerability. Before acting on a finding, verify it manually — this avoids false positives and confirms the real impact without risking data modification.

> [!INFO]- Validation Workflow:
> 1. **Reproduce the request** — run `curl <discovered-url>` to confirm the response
> 2. **Inspect headers before body** — `curl -I <url>` returns only headers; check `Content-Type` and `Content-Length > 0` to confirm there is real content before pulling the full response
> 3. **Confirm it is a vulnerability** — look for error messages, unexpected content, or behaviour that differs from normal
> 4. **Proof of Concept only** — if exploiting (e.g. SQL injection), extract the database version; do not modify data or gather sensitive user records
> Example: `curl -I http://<target>/backup/passwords.txt` — a `Content-Length > 0` confirms the file exists and has content without leaking its contents

---
## Related Techniques
- [[VHost Fuzzing]]
- [[API Fuzzing]]
- [[Subdomain Enumeration]]

## Related Playbooks
- [[Linux Pentest Playbook]]
- [[Windows Pentest Playbook]]

---
## References / Images
- https://github.com/ffuf/ffuf
- https://github.com/danielmiessler/SecLists
