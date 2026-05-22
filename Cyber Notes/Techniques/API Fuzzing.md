Tags: #Status/In-Progress #Type/Technique #Context/Web #Context/Redteam

---
## Overview
API fuzzing is the process of sending unexpected, malformed, or systematically varied inputs to API endpoints to discover vulnerabilities in how the application validates and processes requests. Unlike web directory fuzzing which targets URL paths, API fuzzing targets the parameters, headers, and request bodies that APIs process — looking for injection flaws, authentication bypasses, broken access controls, and improper error handling.

---
## When To Use
- After identifying one or more API endpoints through documentation, traffic analysis, or fuzzing
- When an endpoint accepts user-controlled parameters and there is no known documentation of valid values
- When testing for BOLA (Broken Object Level Authorization) — accessing other users' resources by manipulating ID parameters
- When the application returns verbose error messages that may reveal database structure, internal paths, or framework details
- During comprehensive web application testing as part of the full enumeration phase

## Requirements
- Identified API endpoints (URL, method, and at least one parameter)
- Appropriate authentication token or session cookie if the API requires authentication
- Wordlists for parameter values (SecLists covers common parameter names and values)
- A fuzzing tool: [[ffuf]], [[wenum]], or [[Burp Intruder]]

---
## Attack Steps
1. **Identify the API type** — REST, SOAP, or GraphQL. The type determines where parameters live and what format they take.
2. **Locate endpoints** — check documentation (Swagger UI, `/api/docs`, `/openapi.json`), analyse network traffic in Burp, or fuzz common API path prefixes (`/api/`, `/v1/`, `/graphql`).
3. **Enumerate parameters** — for REST, read path/query parameters from docs or traffic; for SOAP, analyse the WSDL; for GraphQL, run an introspection query to dump the full schema.
4. **Fuzz parameter values** — substitute wordlist entries for each parameter value; start with type-breaking inputs (empty string, very large number, special characters, SQL metacharacters).
5. **Analyse responses** — look for status code changes (200 vs 403 vs 500), response size differences, and error messages that reveal internal behaviour.
6. **Validate promising responses** — reproduce manually with curl; confirm the finding is real before escalating.
7. **Test undocumented endpoints** — brute-force API path prefixes and resource names with a wordlist to find endpoints intentionally hidden from public documentation.

---
## Types of API Fuzzing

| Type | What Gets Fuzzed | Vulnerabilities Targeted |
|------|-----------------|------------------------|
| Parameter Fuzzing | Query parameters, path IDs, request body values | BOLA/IDOR, SQLi, command injection, XSS |
| Data Format Fuzzing | JSON/XML structure, encoding, nesting | Parsing errors, buffer overflows, deserialization bugs |
| Sequence Fuzzing | Order and timing of multiple requests | Race conditions, BFLA, authorization bypasses |

---

## Fuzzing REST APIs with ffuf

> [!INFO]- Discovering Undocumented Endpoints:
> `ffuf -u http://<target>/api/FUZZ -w /usr/share/seclists/Discovery/Web-Content/common.txt -mc 200,201,204,301,302,400,401,403 -v`
> Include 400/401/403 in the match list — these codes often indicate the endpoint exists even if access is denied.
>
> Fuzz path parameter values (e.g. item IDs):
> `ffuf -u http://<target>/api/items/FUZZ -w /usr/share/seclists/Fuzzing/Integers/Integers.txt -mc 200 -v`

---

## Fuzzing REST APIs with wenum

> [!INFO]- GET Parameter Fuzzing:
> `wenum -w /usr/share/seclists/Discovery/Web-Content/common.txt --hc 404 -u "http://<target>/api/items?id=FUZZ"`

> [!INFO]- POST Body Fuzzing:
> `wenum -w /usr/share/seclists/Discovery/Web-Content/common.txt --hc 404 -u "http://<target>/api/items" -X POST -H "Content-Type: application/json" -d '{"id": "FUZZ"}'`

---

## GraphQL Introspection
Before fuzzing a GraphQL API, dump the full schema to understand every available type, query, mutation, and argument. Many servers have introspection disabled in production — its absence is itself a useful signal.

> [!INFO]- Introspection Query:
> `curl -s -X POST http://<target>/graphql -H "Content-Type: application/json" -d '{"query":"{ __schema { queryType { name } types { name fields { name } } } }"}'`
> If introspection is enabled, the response contains the complete schema. Tools like GraphiQL and GraphQL Playground provide an interactive interface for exploring it.

---

## Common Vulnerabilities Found

| Vulnerability | Description | How Fuzzing Finds It |
|---------------|-------------|---------------------|
| BOLA / IDOR | Accessing another user's resource by changing an ID | Try `id=1`, `id=2`, etc. — check if other users' data returns |
| BFLA | Calling a privileged function as an unprivileged user | Fuzz endpoint paths; try admin actions with a regular token |
| SSRF | Server makes unintended requests to internal resources due to a malicious parameter value | Inject internal IP or metadata URL as a parameter value |
| SQLi / Command Injection | Malformed input is executed by the server's database or OS | Inject `'`, `"`, `;`, `|` — watch for 500 errors with database/stack traces |
| Mass Assignment | API accepts and assigns undocumented parameters (e.g. `isAdmin=true`) | Fuzz request body with extra fields |

---

## Validating Findings
Not every anomalous response is a real vulnerability. When a response stands out:
1. Reproduce the exact request manually with curl to confirm repeatability
2. Observe the response body — a stack trace or database error confirms a real issue
3. Create a minimal proof of concept — e.g. for BOLA, show you can read user 2's data while authenticated as user 1; do not modify or delete records
4. If a method returns 405 (Method Not Allowed), try other HTTP methods on the same endpoint — the server knows the endpoint exists, just not with that method

---
## Detection
- Unusual spikes in 4xx/5xx errors on specific endpoints in API gateway logs
- Request bodies or parameters containing SQL metacharacters or path traversal sequences
- Repeated requests to the same endpoint with incrementing integer IDs (BOLA scanning pattern)

## Mitigation
- Validate all input at the server — reject unexpected types, formats, and value ranges
- Enforce object-level authorization — verify the authenticated user owns every resource they request
- Rate-limit API endpoints to prevent automated enumeration
- Disable GraphQL introspection in production

---
## Related Knowledge
- [[Web APIs]]
- [[OWASP Top 10 - 2021]]
- [[HTTP & HTTPS]]

## Related Playbook
- [[Linux Pentest Playbook]]

## Related Tools
- [[ffuf]]
- [[wenum]]
- [[Burp Intruder]]
- [[Burp Repeater]]

---
## References / Images
- OWASP API Security Top 10: https://owasp.org/www-project-api-security/
- PortSwigger API Testing: https://portswigger.net/web-security/api-testing
- SecLists: https://github.com/danielmiessler/SecLists
