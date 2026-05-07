Tags: #Status/In-Progress #Type/Tool #Context/Web #Context/Redteam

---
## Overview
wafw00f is a Python-based command-line tool that detects Web Application Firewalls (WAFs) by sending crafted HTTP requests and analyzing the responses. It maintains a signature database of 80+ known WAF products (Cloudflare, ModSecurity, Imperva, Akamai, F5, etc.) and matches response patterns, headers, and cookies to identify which WAF is present. Knowing the WAF in advance allows you to select appropriate evasion techniques before active scanning or exploitation.

## Target / Context
Any web application or web server. Run before active scanning tools like Nikto or vulnerability scanners to determine if a WAF is filtering requests and, if so, which product it is.

---
## Installation

> [!INFO]- Installation Commands:
> ```
> pip3 install wafw00f
> # or from source:
> pip3 install git+https://github.com/EnableSecurity/wafw00f
> ```

---
## Basic Usage

> [!INFO]- Basic Usage:
> `wafw00f <target>`
> `wafw00f https://example.com`

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-a` | Test all WAF signatures, not just the first match | `wafw00f -a https://example.com` |
> | `-v` | Verbose output — show each test and response detail | `wafw00f -v https://example.com` |
> | `-l` | List all WAF signatures in the database | `wafw00f -l` |
> | `-o` | Save output to a file | `wafw00f -o results.txt https://example.com` |
> | `-f` | Output format (text, json, csv) | `wafw00f -f json -o out.json https://example.com` |
> | `-p` | Use a proxy for requests | `wafw00f -p http://127.0.0.1:8080 https://example.com` |

---
## Common Use Cases

### Detect WAF Before Active Scanning

> [!INFO]- Commands:
> `wafw00f https://example.com`
> — Returns the WAF product name if detected, or "No WAF detected" if not found.

### Test All Signatures (Thorough Mode)

> [!INFO]- Commands:
> `wafw00f -a https://example.com`
> — Useful when default mode returns no result or gives an uncertain match; exhausts all signatures.

### List All Supported WAF Signatures

> [!INFO]- Commands:
> `wafw00f -l`
> — Shows all ~80+ WAF products the tool can identify; useful to check if your target's WAF is in the database.

### Route Through Burp Proxy

> [!INFO]- Commands:
> `wafw00f -p http://127.0.0.1:8080 https://example.com`
> — Routes requests through Burp Suite to inspect the WAF detection requests and responses.

---
## Related Techniques
- [[Web Fingerprinting]]

## Related Playbooks
- [[Linux Pentest Playbook]]

---
## References / Images
- https://github.com/EnableSecurity/wafw00f
