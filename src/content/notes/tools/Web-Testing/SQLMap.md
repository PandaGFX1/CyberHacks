---
title: "SQLMap"
category: "tools"
tags: []
excerpt: "SQLMap is an automated tool for detecting and exploiting SQL injection vulnerabilities. Handles detection,..."
date: "2026-03-28"
---

---
## Overview
SQLMap is an automated tool for detecting and exploiting SQL injection vulnerabilities. Handles detection, fingerprinting, and exploitation — including database enumeration and data extraction.

## Target / Context
Web applications with SQL injection vulnerabilities. Supports GET and POST-based testing. Pairs with Burp Suite to capture and replay requests.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo apt install sqlmap</code></li>
</ul>

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sqlmap -u "http://target.thm/search?id=1"</code></li>
  <li><code>sqlmap --help</code></li>
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
| <code>-u</code> | Target URL to test | <code>-u "http://target.thm/page?id=1"</code> |
| <code>-r</code> | Read request from a saved file | <code>-r intercepted_request.txt</code> |
| <code>--dbs</code> | Enumerate all database names | <code>sqlmap -u "..." --dbs</code> |
| <code>-D</code> | Specify database name | <code>-D database_name</code> |
| <code>--tables</code> | List tables in specified database | <code>-D mydb --tables</code> |
| <code>-T</code> | Specify table name | <code>-T users</code> |
| <code>--dump</code> | Dump records from specified table | <code>-D mydb -T users --dump</code> |
| <code>--level</code> | Scan depth (1-5) | <code>--level=5</code> |
| <code>--wizard</code> | Guided step-by-step mode | <code>sqlmap --wizard</code> |

</div>
</details>

---
## Common Use Cases

### GET-based Testing
Test a URL with a GET parameter. Note: PUT URL IN SINGLE QUOTES.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sqlmap -u "http://target.thm/search?cat=1" --dbs</code></li>
  <li><code>sqlmap -u "http://target.thm/search?cat=1" -D database_name --tables</code></li>
  <li><code>sqlmap -u "http://target.thm/search?cat=1" -D database_name -T table_name --dump</code></li>
</ul>
Note: GET parameters are not always in the URL. Check via: Right Click -> Inspect -> Network -> Submit -> Copy Request URL

</div>
</details>

### POST-based Testing
Capture a POST request from Burp Suite and save it to a file, then pass it to SQLMap.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sqlmap -r intercepted_request.txt</code></li>
  <li><code>sqlmap -r intercepted_request.txt --dbs</code></li>
  <li><code>sqlmap -r intercepted_request.txt -D database_name -T table_name --dump</code></li>
</ul>

</div>
</details>

---
## Related Concepts
- [SQL Fundamentals](/knowledge/Web-Security/SQL-Fundamentals)
- [OWASP Top 10 - 2021](/knowledge/Web-Security/OWASP-Top-10---2021)

## Related Techniques
- [SQL Injection](/techniques/SQL-Injection)

## Related Playbooks
-

---
## References / Images
-
