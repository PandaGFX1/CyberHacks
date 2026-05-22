Tags: #Status/In-Progress #Type/Tool #Context/Web #Context/Redteam

---
## Overview
Nikto is an open-source web server scanner that checks targets for over 6,700 potentially dangerous files, outdated server software, version-specific problems, and common misconfigurations. It performs both passive fingerprinting (reading headers and banners) and active probing (requesting known paths). Nikto is primarily a vulnerability assessment tool but is also widely used in the fingerprinting phase of web reconnaissance to identify server software versions, installed CMS platforms, and exposed sensitive files quickly.

## Target / Context
Web servers and web applications. Useful during both fingerprinting and initial vulnerability assessment. Works against HTTP and HTTPS targets; supports virtual host scanning.

---
## Installation

> [!INFO]- Installation Commands:
> ```
> # Kali / Debian (pre-packaged):
> sudo apt install nikto -y
>
> # From source:
> sudo apt update && sudo apt install -y perl
> git clone https://github.com/sullo/nikto
> cd nikto/program
> chmod +x ./nikto.pl
> ```

---
## Basic Usage

> [!INFO]- Basic Usage:
> `nikto -h <target>`
> `nikto -h https://example.com`
> `nikto -h 10.10.10.1 -p 8080`

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-h` | Target host (IP, hostname, or URL) | `-h https://example.com` |
> | `-p` | Port to scan (default 80/443) | `-p 8080` |
> | `-ssl` | Force SSL/HTTPS | `-ssl` |
> | `-vhost` | Scan a specific virtual host | `-vhost admin.example.com` |
> | `-Tuning` | Limit scan to specific check categories (see table below) | `-Tuning b` |
> | `-o` | Output file | `-o results.txt` |
> | `-Format` | Output format (txt, csv, htm, xml, json) | `-Format json` |
> | `-nointeractive` | Suppress prompts (useful in scripts) | `-nointeractive` |
> | `-evasion` | Apply IDS/WAF evasion techniques (1–9) | `-evasion 1` |
> | `-useproxy` | Route through a proxy | `-useproxy http://127.0.0.1:8080` |
> | `-timeout` | Request timeout in seconds | `-timeout 10` |
> | `-update` | Update the Nikto plugin database | `-update` |

#### Tuning Codes
| Code | Category |
|------|----------|
| `0` | File upload vulnerabilities |
| `1` | Interesting file discovery |
| `2` | Misconfiguration checks |
| `3` | Information disclosure |
| `4` | Injection tests (XSS, SQL, etc.) |
| `5` | Remote file retrieval |
| `6` | Denial of service tests |
| `7` | Remote access tests |
| `8` | Command execution tests |
| `9` | SQL injection |
| `a` | Authentication bypass |
| `b` | Software identification (fingerprinting only) |
| `c` | Remote source inclusion |
| `x` | Reverse tuning — exclude the specified type |

---
## Common Use Cases

### Full Scan Against a Web Server

> [!INFO]- Commands:
> `nikto -h https://example.com`
> — Runs all checks; output includes identified server software, risky files, outdated software, and misconfigurations.

### Fingerprinting Only (Software Identification)

> [!INFO]- Commands:
> `nikto -h example.com -Tuning b`
> — Limits the scan to software identification checks only. Useful when fingerprinting without triggering noisy vulnerability probes.

### HTTPS Target on Non-Standard Port

> [!INFO]- Commands:
> `nikto -h 10.10.10.1 -p 8443 -ssl`

### Virtual Host Scanning

> [!INFO]- Commands:
> `nikto -h 10.10.10.1 -vhost admin.example.com`
> — Sends `Host: admin.example.com` with all requests. Required when the target IP hosts multiple virtual hosts and you want to scan a specific one.

### Save Output for Reporting

> [!INFO]- Commands:
> `nikto -h https://example.com -o nikto-results.html -Format htm`

---
## Related Techniques
- [[Web Fingerprinting]]

## Related Playbooks
- [[Linux Pentest Playbook]]

---
## References / Images
- https://github.com/sullo/nikto
- `nikto -Help`
