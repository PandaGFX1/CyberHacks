Tags: #Status/In-Progress #Type/Tool #Context/Web #Context/Redteam

---
## Overview
XSStrike is an automated XSS vulnerability scanner written in Python. Unlike payload-list tools, it generates context-specific payloads by analyzing how the application processes and reflects input — reducing false positives and increasing bypass success against filters and WAFs. It can crawl entire sites, test GET and POST parameters, detect DOM sinks in JavaScript, and test for blind XSS via a callback listener.

## Target / Context
Web applications with GET/POST parameters, forms, or JavaScript-rendered input. Effective against applications that partially sanitize input but can be bypassed with context-aware payloads.

---
## Installation

> [!INFO]- Installation Commands:
> ```
> git clone https://github.com/s0md3v/XSStrike.git
> cd XSStrike
> pip install -r requirements.txt
> python xsstrike.py
> ```

---
## Basic Usage

> [!INFO]- Basic Usage:
> ```
> python xsstrike.py -u "http://<target>/page?param=test"
> ```
> Analyzes the `param` parameter for XSS injection points and generates context-aware payloads based on the reflected output.

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-u` | Target URL with parameter to test | `-u "http://<target>/search?q=test"` |
> | `--crawl` | Crawl the site and test all discovered parameters | `--crawl` |
> | `--blind` | Test for blind XSS; prints payloads to inject manually | `--blind` |
> | `--fuzzer` | Enable fuzzer mode — tests WAF and filter bypass | `--fuzzer` |
> | `--data` | POST body data | `--data "username=test&pass=test"` |
> | `--params` | Comma-separated list of parameters to test | `--params "q,search"` |
> | `-l` | Log all payloads and results to a file | `-l output.log` |
> | `--skip` | Skip confirmation prompts — non-interactive mode | `--skip` |
> | `--timeout` | Request timeout in seconds | `--timeout 10` |
> | `--proxy` | Route traffic through a proxy | `--proxy "http://127.0.0.1:8080"` |
> | `-t` | Number of threads | `-t 10` |

---
## Common Use Cases

### Basic Parameter Scan

> [!INFO]- Commands:
> ```
> python xsstrike.py -u "http://<target>/page?param=test"
> ```
> Tests a single GET parameter. XSStrike analyzes the reflected context and generates payloads tailored to break out of the surrounding HTML structure.

### Full Site Crawl

> [!INFO]- Commands:
> ```
> python xsstrike.py -u "http://<target>/" --crawl
> ```
> Crawls the site from the provided URL, discovers all links and forms, and tests each discovered parameter. Useful when the full attack surface is unknown.

### POST Parameter Testing

> [!INFO]- Commands:
> ```
> python xsstrike.py -u "http://<target>/login" --data "username=test&password=test"
> ```
> Tests POST body parameters — useful for login forms, search endpoints, or any form that submits via POST.

### WAF and Filter Bypass Fuzzing

> [!INFO]- Commands:
> ```
> python xsstrike.py -u "http://<target>/page?param=test" --fuzzer
> ```
> Attempts to identify filtering rules and generate payloads that evade them. Useful when standard payloads are blocked but the reflection point is confirmed.

### Proxy Through Burp Suite

> [!INFO]- Commands:
> ```
> python xsstrike.py -u "http://<target>/page?param=test" --proxy "http://127.0.0.1:8080"
> ```
> Routes all XSStrike requests through Burp Suite for manual inspection and replay. Useful for capturing working payloads and importing them into Repeater.

---
## Related Techniques
- [[XSS]]

## Related Playbooks
- [[Red Team]]

---
## References / Images
- XSStrike GitHub: https://github.com/s0md3v/XSStrike
- PayloadsAllTheThings XSS: https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/XSS%20Injection/README.md
