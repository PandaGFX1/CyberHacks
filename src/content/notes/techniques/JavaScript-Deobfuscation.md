---
title: "JavaScript Deobfuscation"
category: "techniques"
tags: []
excerpt: "JavaScript deobfuscation is the process of converting obfuscated, minified, or packed JavaScript into human-readable..."
date: "2026-05-16"
---

---
## Overview
JavaScript deobfuscation is the process of converting obfuscated, minified, or packed JavaScript into human-readable form to understand its functionality. Because JavaScript runs client-side in the browser, anyone who can view the page source can access the code — developers use obfuscation to protect intellectual property or add a shallow layer of security; attackers use it to hide malicious logic from scanners and analysts. Deobfuscation is a core skill in web application testing, CTF challenges, and malware analysis.

---
## When To Use
- Analyzing client-side JavaScript for hidden API endpoints, credentials, or authentication logic
- CTF challenges involving encoded or obfuscated scripts
- Malware analysis of browser-delivered JavaScript payloads
- Security testing where functionality appears to be deliberately concealed from inspection

## Requirements
- Browser with developer tools (Chrome or Firefox)
- Access to beautifier/unpacker tools (online or local)
- Basic JavaScript syntax knowledge — see [JavaScript Essentials](/knowledge/Web-Security/JavaScript-Essentials)

---
## Attack Steps

### Step 1 — Locate the JavaScript
View the page source and identify all JavaScript: inline `<script>` blocks and external `.js` files referenced via `<script src="...">`. Navigate directly to the `src` path in the browser to read the raw file. Look for `.min.js` extensions — a reliable indicator of minification.

### Step 2 — Identify the Obfuscation Type
Recognizing the obfuscation method determines which tool to use:

| Type | Indicators | Deobfuscation Method |
|------|-----------|----------------------|
| Minified | Single long line; readable variable names; `.min.js` extension | Beautify |
| Packed | Opens with `function(p,a,c,k,e,d)` pattern | Unpack |
| Advanced | Random variable names; Base64 encoded strings throughout; no clear text | Reverse engineer |
| JSFuck / jjencode / aaencode | Unusual notation using only `[]!+` or similar encoding | Use dedicated decoders |

### Step 3 — Deobfuscate

#### Minified Code — Beautify
Format minified code back into readable structure with proper indentation:
- **Browser Dev Tools**: open source view → click the `{}` Pretty Print button at the bottom left
- **prettier.io/playground** — paste and auto-format
- **beautifier.io** — paste and format with configurable indent style

#### Packed Code — Unpack
Packed code uses the `function(p,a,c,k,e,d)` pattern to rebuild code from a dictionary at runtime. The dictionary keys and values are visible, but reading them manually is impractical:
- Use **unPacker** at matthewfl.com/unPacker.html — remove any blank lines before the script or deobfuscation may fail
- Alternative: locate the final `return` statement in the packer function and replace the execution call with `console.log()` to print the unpacked output to the browser console without running it

#### Advanced Obfuscation — Reverse Engineer
Tools like obfuscator.io produce code with no readable strings, randomised variable names, and Base64-encoded string arrays. Online tools can only partially reverse these:
- Identify the overall structure — what functions exist and what they call
- Trace data flow from input to output, following variable assignments
- Insert `console.log()` at strategic points to inspect values at runtime
- Look for calls to `eval()` or `atob()` — these decode and execute strings at runtime, making them high-value inspection points

### Step 4 — Analyze the Code
With deobfuscated code in hand, read through it and identify:
- `XMLHttpRequest` calls — note the URL, HTTP method (GET/POST), and any data being sent; these reveal hidden endpoints
- Hardcoded credentials, API tokens, or secret keys assigned to variables
- Any functions that construct strings dynamically before passing them to `eval()` or `fetch()`
- Logic that gates behaviour based on server responses

When encountering unfamiliar objects or methods, look them up by name to understand what they do.

### Step 5 — Decode Encoded Strings
After deobfuscation, individual strings may still be encoded. The three most common types:

#### Base64
Recognizable by: alphanumeric characters plus `+`, `/`, and `=` padding; length divisible by 4.
- Decode: `echo <encoded> | base64 -d`
- Encode: `echo <text> | base64`

#### Hex
Recognizable by: only characters `0-9` and `a-f`, no other symbols.
- Encode: `echo <text> | xxd -p`
- Decode: `echo <hex> | xxd -p -r`

#### ROT13
Recognizable by: still resembles readable English; each letter is shifted 13 positions in the alphabet. Applying the transformation twice restores the original.
- `echo <text> | tr 'A-Za-z' 'N-ZA-Mn-za-m'`

For unknown encoding types, use a cipher identifier (dcode.fr or boxentriq.com) or paste into [CyberChef](/tools/Cryptography/CyberChef) and use the Magic recipe to detect the encoding automatically.

---
## Detection
- Heavily obfuscated JavaScript in a production application is not inherently malicious, but is a notable signal during a security review
- `eval()` called on a dynamically constructed or Base64-decoded string is a high-risk pattern — commonly used to execute deobfuscated payloads at runtime
- Outbound requests to unexpected endpoints revealed after deobfuscation indicate hidden exfiltration or C2 channels

## Mitigation
Obfuscation is not a security control. Anyone with browser access to a web application can deobfuscate client-side JavaScript given enough time. Sensitive logic, credentials, API keys, and business rules must never exist exclusively in client-side code — they belong server-side where they are not accessible to the browser.

---
## Related Knowledge
- [JavaScript Essentials](/knowledge/Web-Security/JavaScript-Essentials)
- [Website Innerworkings](/knowledge/Web-Security/Website-Innerworkings)

## Related Playbook
- [Linux Pentest Playbook](/playbooks/Linux-Pentest-Playbook)

## Related Tools
- [CyberChef](/tools/Cryptography/CyberChef)

---
## References / Images
- jsconsole.com — browser-based JavaScript console for testing snippets
- prettier.io/playground — JavaScript beautifier
- beautifier.io — JavaScript beautifier and formatter
- matthewfl.com/unPacker.html — packed JavaScript unpacker
- obfuscator.io — advanced JavaScript obfuscator (used to understand output format when reversing)
- jsfuck.com — JSFuck notation encoder
- boxentriq.com/code-breaking/cipher-identifier — automated cipher type identifier
- dcode.fr — cipher identifier and multi-format decoder
