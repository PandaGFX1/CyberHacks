Tags: #Status/In-Progress #Type/Tool #Context/Web #Context/Network #publish-me

---
## Overview
cURL (Client URL) is a command-line tool and library for transferring data using various protocols — primarily HTTP/HTTPS but also FTP, SFTP, SCP, and more. Unlike a web browser, cURL outputs raw responses to STDOUT without rendering HTML, CSS, or JavaScript, making it ideal for scripting, automation, API interaction, and web application testing. Core tool for inspecting HTTP behavior, crafting custom requests, and interacting with APIs from the command line.

## Target / Context
Web application testing, REST API interaction, file transfers, authentication testing, and automation scripts. Available on Linux, macOS, and Windows.

---
## Installation

> [!INFO]- Installation Commands:
> Pre-installed on most Linux distros and macOS.
> Install on Ubuntu/Debian: `sudo apt install curl -y`
> Help: `curl -h` or `curl --help all` or `man curl`

---
## Basic Usage

> [!INFO]- Basic Usage:
> `curl <URL>` — send a GET request and print response to STDOUT
> `curl -v <URL>` — verbose; shows full request and response headers
> `curl -vvv <URL>` — more verbose detail

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-v` | Verbose — show request and response headers | `curl -v http://example.com` |
> | `-I` | Send HEAD request — show response headers only | `curl -I http://example.com` |
> | `-i` | Include response headers in output (full response) | `curl -i http://example.com` |
> | `-H` | Set a custom request header | `curl -H 'Content-Type: application/json' <URL>` |
> | `-A` | Set User-Agent string | `curl -A 'Mozilla/5.0' <URL>` |
> | `-X` | Specify HTTP method | `curl -X POST <URL>` |
> | `-d` | Send POST body data | `curl -d 'username=admin&password=admin' <URL>` |
> | `-u` | Pass username:password for basic auth | `curl -u admin:password <URL>` |
> | `-b` | Send a cookie with the request | `curl -b 'PHPSESSID=abc123' <URL>` |
> | `-L` | Follow redirects | `curl -L <URL>` |
> | `-O` | Save output to file using remote filename | `curl -O http://example.com/file.zip` |
> | `-o` | Save output to a specified file | `curl -o myfile.zip <URL>` |
> | `-s` | Silent mode — suppress progress output | `curl -s <URL>` |
> | `-k` | Skip SSL certificate verification | `curl -k https://local-dev.example.com` |

---
## Common Use Cases

### Basic GET Request

> [!INFO]- Commands:
> `curl http://example.com` — raw HTML to STDOUT
> `curl -v http://example.com` — full request/response with headers
> `curl -I http://example.com` — headers only (HEAD request)

### POST Request with Form Data

> [!INFO]- Commands:
> `curl -X POST -d 'username=admin&password=admin' http://<IP>:<PORT>/login.php`
> Add `-L` to follow the redirect that most login forms issue after successful auth:
> `curl -X POST -d 'username=admin&password=admin' -L http://<IP>:<PORT>/login.php`

### Authenticated Request with Cookie

> [!INFO]- Commands:
> Use `-b` to include a session cookie obtained after login:
> `curl -b 'PHPSESSID=c1nsa6op7vtk7kdis7bcnbadf1' http://<IP>:<PORT>/dashboard`
> POST with cookie and JSON body:
> `curl -X POST -d '{"search":"london"}' -b 'PHPSESSID=c1nsa6op7vtk7kdis7bcnbadf1' -H 'Content-Type: application/json' http://<IP>:<PORT>/search.php`

### HTTP Basic Authentication

> [!INFO]- Commands:
> Using `-u` flag:
> `curl -u admin:password http://<IP>:<PORT>/admin`
> Alternatively embed credentials in URL:
> `curl http://admin:password@<IP>:<PORT>/admin`
> Manually set Authorization header with base64 encoded credentials:
> `curl -H 'Authorization: Basic YWRtaW46cGFzc3dvcmQ=' http://<IP>:<PORT>/admin`

### Custom Headers and SSL Skip

> [!INFO]- Commands:
> Set custom headers: `curl -H 'X-Forwarded-For: 127.0.0.1' http://example.com`
> Skip SSL verification (for self-signed or expired certs): `curl -k https://example.com`

### REST API — CRUD Operations

> [!INFO]- Commands:
> **Read (GET):** `curl http://<IP>:<PORT>/api.php/city/london`
> Pipe to `jq` for formatted JSON output: `curl http://<IP>:<PORT>/api.php/city/ | jq`
>
> **Create (POST):** `curl -X POST http://<IP>:<PORT>/api.php/city/ -d '{"city_name":"HTB_City","country_name":"HTB"}' -H 'Content-Type: application/json'`
>
> **Update (PUT):** `curl -X PUT http://<IP>:<PORT>/api.php/city/london -d '{"city_name":"New_City","country_name":"HTB"}' -H 'Content-Type: application/json'`
>
> **Delete (DELETE):** `curl -X DELETE http://<IP>:<PORT>/api.php/city/New_City`
>
> Use `-X OPTIONS` to check which methods the API accepts.

### Copy Request from Browser DevTools

> [!INFO]- Steps:
> 1. Open DevTools (`F12` or `Ctrl+Shift+I`) → Network tab
> 2. Perform the action in the browser
> 3. Right-click the request → Copy → Copy as cURL
> 4. Paste the full curl command into terminal — all headers and cookies included

### IMAP/POP3 Mail Server Testing

> [!INFO]- Commands:
> Connect to IMAP over TLS and enumerate banner/certificate:
> `curl -k 'imaps://<target>' --user <user>:<pass>`
> `curl -k 'imaps://<target>' --user <user>:<pass> -v`
> — Verbose output reveals TLS version, full SSL certificate (CN, org, expiry), and server banner including mail server version
>
> POP3 over TLS:
> `curl -k 'pop3s://<target>' --user <user>:<pass> -v`

---
## Related Concepts
- [[HTTP & HTTPS]]
- [[IMAP & POP3]]
- [[Protocols]]

## Related Techniques
- [[HTTP Interception]]

## Related Playbooks
-

---
## References / Images
- `man curl`
- https://curl.se/docs/
