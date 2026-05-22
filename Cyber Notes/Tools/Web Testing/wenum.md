Tags: #Status/In-Progress #Type/Tool #Context/Web #Context/Redteam

---
## Overview
wenum is the actively maintained fork of wfuzz, developed by WebFuzzForge. It is a Python-based web fuzzer designed for parameter discovery and flexible input manipulation. Where ffuf excels at speed and directory enumeration, wenum is purpose-built for parameter fuzzing — systematically testing GET and POST parameter values to surface input validation flaws, hidden parameters, and injection points. Its standout feature is a real-time terminal dashboard that shows live request statistics, match counts, and filter summaries as the scan runs.

## Target / Context
Web application parameters — GET query strings, POST bodies, and custom headers. Best used after initial directory enumeration has identified interesting endpoints that accept user-controlled input.

---
## Installation

> [!INFO]- Installation Commands:
> Requires `pipx` for isolated Python environment management:
> `sudo apt install pipx`
> `pipx ensurepath`
> `sudo pipx ensurepath --global`
>
> Install wenum:
> `pipx install git+https://github.com/WebFuzzForge/wenum`
> `pipx runpip wenum install setuptools`

---
## Basic Usage

> [!INFO]- Basic Usage:
> Place `FUZZ` in the URL where the parameter value should be tested:
> `wenum -w <wordlist> -u "http://<target>/page.php?param=FUZZ"`
>
> Hide noise (e.g. 404 responses) with `--hc`:
> `wenum -w /usr/share/seclists/Discovery/Web-Content/common.txt --hc 404 -u "http://<target>/page.php?x=FUZZ"`

---
## Flags & Options

> [!INFO]- Core Flags:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-w` | Wordlist path | `-w /usr/share/seclists/Discovery/Web-Content/common.txt` |
> | `-u` | Target URL with FUZZ placeholder | `-u "http://target/page.php?x=FUZZ"` |
> | `-X` | HTTP method | `-X POST` |
> | `-H` | Custom request header | `-H "Content-Type: application/x-www-form-urlencoded"` |
> | `-d` | POST body data | `-d "y=FUZZ"` |
> | `-p` | Proxy to route traffic through | `-p http://127.0.0.1:8080` |

> [!INFO]- Filter & Match Flags:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `--hc` | **Hide** responses with these status codes | `--hc 404,400` |
> | `--sc` | **Show** only responses with these status codes | `--sc 200` |
> | `--hl` | **Hide** responses with this line count | `--hl 10` |
> | `--sl` | **Show** only responses with this line count | `--sl 5` |
> | `--hw` | **Hide** responses with this word count | `--hw 219` |
> | `--sw` | **Show** only responses with this word count | `--sw 5` |
> | `--hs` | **Hide** responses with this size in bytes | `--hs 1024` |
> | `--ss` | **Show** only responses with this size in bytes | `--ss 512` |
> | `--hr` | **Hide** responses whose body matches this regex | `--hr "Invalid parameter"` |
> | `--sr` | **Show** only responses whose body matches this regex | `--sr "admin"` |
> | `--filter` | Show only responses matching a regex (plugins still process hidden) | `--filter "Login"` |
> | `--hard-filter` | Hide responses matching a regex AND prevent plugin processing | `--hard-filter "Login"` |

---
## Common Use Cases

### GET Parameter Fuzzing
Use `curl` to probe an endpoint first to confirm the parameter name, then automate value discovery with wenum.

> [!INFO]- Commands:
> Probe manually first to confirm parameter behaviour:
> `curl "http://<target>/get.php?x=test"`
>
> Automate with wenum once the parameter name is known:
> `wenum -w /usr/share/seclists/Discovery/Web-Content/common.txt --hc 404 -u "http://<target>/get.php?x=FUZZ"`
>
> Combining filters — show only 200 responses with more than 5 words:
> `wenum -w wordlist.txt --sc 200 --sw 5 -u "http://<target>/page.php?x=FUZZ"`

---

### POST Parameter Fuzzing

> [!INFO]- Commands:
> Probe with curl to identify the parameter and confirm POST behaviour:
> `curl -d "" "http://<target>/post.php"`
>
> Fuzz the parameter value:
> `wenum -w /usr/share/seclists/Discovery/Web-Content/common.txt --hc 404 -u "http://<target>/post.php" -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "y=FUZZ"`

---

### Regex-Based Filtering
Useful when status codes alone aren't enough to distinguish valid from invalid responses — the server returns 200 for everything but the response body differs.

> [!INFO]- Commands:
> Show only responses containing "admin":
> `wenum -w wordlist.txt --sr "admin" -u "http://<target>/FUZZ"`
>
> Hide responses with a known error message:
> `wenum -w wordlist.txt --hr "Invalid parameter value" -u "http://<target>/page.php?x=FUZZ"`
>
> Combine with status filter:
> `wenum -w wordlist.txt --sc 200,301,302 --sr "admin|password" -u "https://<target>/FUZZ"`

---
## Related Techniques
- [[API Fuzzing]]
- [[VHost Fuzzing]]

## Related Playbooks
- [[Linux Pentest Playbook]]

---
## References / Images
- https://github.com/WebFuzzForge/wenum
