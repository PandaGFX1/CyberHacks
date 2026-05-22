Tags: #Status/In-Progress #Type/Technique #Context/Web #Context/Redteam

---
## Overview
SQL Injection (SQLi) occurs when unsanitized user input is interpreted as SQL code by a database, allowing attackers to manipulate queries to bypass authentication, extract data, modify records, or execute commands. It is one of the most common and impactful web vulnerabilities.

---
## When To Use
- Web application takes user input that is used in a database query
- Login forms, search fields, URL parameters, or any input reflected in a query
- Application returns database errors or behaves differently based on input

## Requirements
- Target web application with unsanitized input passed to a SQL query
- Knowledge of basic SQL syntax
- Optional: SQLMap for automated detection and exploitation

---
## Attack Steps
1. Identify input fields that interact with a database (login, search, URL params)
2. Test for SQLi by injecting a single quote `'` and observing errors or behavior changes
3. Craft injection payload to manipulate the query logic

**Example — Authentication Bypass:**

Normal query:
`SELECT * FROM users WHERE username = 'John' AND password = 'Un#detectable444';`

Injected password: `abc' OR 1=1;-- -`

Resulting query:
`SELECT * FROM users WHERE username = 'John' AND password = 'abc' OR 1=1;-- -';`

The `OR 1=1` always evaluates to true — `-- -` comments out the rest of the query, bypassing authentication entirely.

4. Escalate — attempt UNION-based, blind, or error-based injection to extract data
5. Automate with [[SQLMap]] for full enumeration and exploitation

---
## Detection
- Unexpected SQL error messages in application responses
- Anomalous database queries in application or server logs
- WAF alerts triggered by SQL syntax in input fields
- Unusual authentication patterns or access to unauthorized records

## Mitigation
- Use parameterized queries / prepared statements — never concatenate user input into SQL
- Implement input validation and sanitization
- Deploy a WAF to filter malicious input
- Apply principle of least privilege to database accounts
- Disable verbose database error messages in production

---
## Related Knowledge
- [[SQL Fundamentals]]
- [[OWASP Top 10 - 2021]]

## Related Playbook
- [[Linux Pentest Playbook]]
- [[Windows Pentest Playbook]]

## Related Tools
- [[SQLMap]]
- [[Burp Repeater]]

---
## References / Images
- OWASP SQL Injection: https://owasp.org/www-community/attacks/SQL_Injection
- PortSwigger SQLi Reference: https://portswigger.net/web-security/sql-injection
