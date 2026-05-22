Tags: #Status/Complete #Type/Knowledge #Context/Web #publish-me

---
## Overview
The Open Web Application Security Project (OWASP) is a non-profit organization focused on improving software security. The OWASP Top 10 is a regularly updated list of the most critical web application security risks — last updated in 2021. It serves as a foundational reference for understanding, testing, and mitigating common web vulnerabilities.

---

## Terminology
| Term | Definition |
|------|------------|
| Access Control | Mechanism that restricts what authenticated users are allowed to do |
| IDOR | Insecure Direct Object Reference; exposes internal identifiers allowing unauthorized access |
| Injection | Attack where unsanitized user input is interpreted as code or commands |
| Threat Modeling | Process of identifying and addressing security flaws during design phase |
| SRI (Subresource Integrity) | Browser mechanism to verify third-party script integrity via hash |
| JWT (JSON Web Token) | Token used to verify integrity and authenticity of transmitted data |
| SSRF | Server-Side Request Forgery; forces a server to make requests on an attacker's behalf |

---
## Core Concepts

### 1. Broken Access Control
Occurs when authorization checks are not properly enforced, allowing users to access or modify resources they shouldn't.
- See [[IDOR]]

**IDOR Example:**
`https://bank.thm/account?id=111111` → change to `id=222222` to access another user's account

### 2. Cryptographic Failures
Improper or missing encryption protecting sensitive data in transit or at rest.
- Weak or absent encryption in transit
- Weak or absent encryption at rest
- Flat-file databases stored in accessible locations (e.g., `/var/www`) can be downloaded and queried directly

### 3. Injection
Occurs when user input is not properly sanitized and interpreted as commands.

| Type | Description |
|------|-------------|
| SQL Injection | Injecting SQL queries to manipulate or extract database data |
| Command Injection | Injecting OS commands for remote execution |

- See [[SQL Injection]]
- See [[Command Injection]]

### 4. Insecure Design
Flaws in application architecture rather than implementation — cannot be patched, must be redesigned.
- Example: OTP brute force possible due to no request rate limiting
- Prevention: perform threat modeling during development phase

### 5. Security Misconfiguration
Improper or incomplete configuration of security controls.
- Default credentials left unchanged
- Debug interfaces exposed (e.g., `/console`)
- Misconfigured permissions
- Missing security headers

### 6. Vulnerable and Outdated Components
Using software with known, unpatched vulnerabilities.
- Example: outdated WordPress version with a known RCE exploit
- Prevention: maintain a software inventory and patch regularly

### 7. Identification and Authentication Failures
Weak or broken authentication mechanisms.
- Brute force attacks enabled by no rate limiting
- Weak or default credentials
- Predictable session tokens
- Username enumeration via re-registration (e.g., `" admin"` bypasses uniqueness check for `admin`)

### 8. Software and Data Integrity Failures
Lack of integrity verification for code or data.

#### Software Integrity
- Third-party scripts loaded without validation
- Prevention: use **Subresource Integrity (SRI)** hashes

#### Data Integrity — JWT Vulnerabilities
- JWTs verify integrity via cryptographic signatures
- Vulnerable if misconfigured — e.g., `"alg": "none"` disables signature verification entirely

### 9. Security Logging and Monitoring Failures
Without proper logging, attacks go undetected and unresponded to.

Logs should capture:
- HTTP status codes
- Timestamps
- Usernames
- IP addresses
- Endpoints accessed

Detection indicators:
- Repeated unauthorized access attempts
- Suspicious IP patterns
- Automated scanning tool signatures

### 10. Server-Side Request Forgery (SSRF)
Forces a server to make requests on behalf of an attacker, bypassing network restrictions.

Capabilities:
- Internal network enumeration
- Access to restricted internal services
- Potential for RCE in some configurations

Flow: Attacker → vulnerable application → attacker-controlled or internal server

- See [[SSRF]]

---
## Related Concepts
- [[Website Innerworkings]]
- [[HTTP & HTTPS]]
- [[JavaScript Essentials]]
- [[SQL Fundamentals]]

## Related Techniques
- [[IDOR]]
- [[SQL Injection]]
- [[Command Injection]]
- [[XSS]]
- [[SSRF]]

---
## References / Images
- OWASP Top 10 (2021): https://owasp.org/Top10
- TryHackMe OWASP Top 10 Room
