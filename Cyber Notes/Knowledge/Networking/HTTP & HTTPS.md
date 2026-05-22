Tags: #Status/In-Progress #Type/Knowledge #Context/Network #Context/Web #publish-me

---
## Overview
HTTP (HyperText Transfer Protocol) is the set of rules for communicating with web servers to transmit webpage data including HTML, images, videos, and other resources. HTTPS is the encrypted, secure version of HTTP using TLS/SSL. HTTP is a stateless protocol — each request is independent — and uses cookies to maintain session state across requests. All HTTP communications follow a client-server model: the client requests a resource and the server processes and returns it.

---

## Terminology
| Term | Definition |
|------|------------|
| HTTP | HyperText Transfer Protocol; rules for transmitting web data between clients and servers |
| HTTPS | Encrypted version of HTTP using TLS/SSL |
| FQDN | Fully Qualified Domain Name — the complete domain name used to locate a host |
| URL (Uniform Resource Locator) | Structured address specifying how to locate a resource on the internet |
| Stateless Protocol | Each request is independent; server retains no memory of previous requests |
| Cookie | Small data stored on the client device to maintain session state with a server |
| Query String | Additional parameters appended to a URL (e.g., `?id=1`) |
| Fragment | Reference to a specific section within a resource (client-side only) |
| Header | Metadata attached to HTTP requests and responses providing context and instructions |
| CRUD | Create, Read, Update, Delete — the four standard API operations |
| REST API | Representational State Transfer — architectural pattern for web APIs using HTTP methods |
| cURL | Client URL — command-line tool for making HTTP requests and transferring data |

---
## Core Concepts

### URL Structure
Resources over HTTP/HTTPS are accessed via a URL (Uniform Resource Locator). A Fully Qualified Domain Name (FQDN) is entered as a URL to reach a desired website.

| Component | Description | Example |
|-----------|-------------|---------|
| Scheme | Protocol to use; ends with `://` | `http://`, `https://`, `ftp://` |
| User Info | Optional credentials separated by `@` | `admin:password@` |
| Host / Domain | Server domain name or IP address | `inlanefreight.com` |
| Port | Separated from host with `:` — HTTP defaults to 80, HTTPS to 443 | `:80` |
| Path | Location of the resource; server returns `index.html` if omitted | `/dashboard.php` |
| Query String | Parameters passed to the server; multiple separated by `&` | `?login=true&user=admin` |
| Fragment | Client-side reference to a section within the resource | `#section-2` |

---

### HTTP Flow
1. Browser checks `/etc/hosts` first for local DNS overrides, then queries a DNS server to resolve the domain to an IP address
2. A `GET /` request is sent to the resolved IP on the appropriate port
3. The web server receives the request and processes it — returns `index.html` by default for root requests
4. Server sends an HTTP response with a status code (e.g., `200 OK`) and the file contents
5. Browser renders the response and presents it to the user

`/etc/hosts` can be manually edited to add local DNS records — useful for redirecting traffic during testing.

---

### HTTPS Flow
HTTPS encrypts all HTTP traffic using TLS/SSL. When a client connects with `http://` instead of `https://`, the server issues a `301 Moved Permanently` redirect to port 443.

Handshake sequence:
1. **Client Hello** — client sends supported TLS versions, cipher suites, and random data
2. **Server Hello** — server responds with chosen cipher and its SSL certificate
3. **Certificate Verification** — client verifies the certificate and sends its own
4. **Encrypted Handshake** — both sides confirm encryption is working; all subsequent traffic is encrypted

**HTTP Downgrade Attack:** An attacker can set up a MiTM proxy to intercept traffic and strip HTTPS back to HTTP, capturing plaintext data. Most modern browsers, servers, and HSTS headers protect against this. Even with HTTPS, DNS queries may reveal visited domains if not using encrypted DNS (e.g., `8.8.8.8`, `1.1.1.1`) or a VPN.

---

### HTTP Methods
| Method | Purpose |
|--------|---------|
| GET | Retrieve a resource; parameters passed via URL query string |
| POST | Submit data to the server; body carries parameters — used for forms, logins, file uploads |
| PUT | Create or replace a resource entirely on the server |
| PATCH | Partially update an existing resource (vs. PUT which replaces entirely) |
| DELETE | Remove a resource — if unprotected, can be exploited for DoS |
| HEAD | Fetch headers only; no body returned |
| OPTIONS | List methods accepted by the server — useful for API enumeration |
| TRACE | Echoes request back to sender; usually disabled |
| CONNECT | Establishes a secure tunnel (used for HTTPS proxying) |

Most web apps rely on GET and POST. REST APIs additionally rely on PUT, PATCH, and DELETE. Use `OPTIONS` to discover which methods an API endpoint accepts.

---

### HTTP Versions
| Version | Year | Key Features |
|---------|------|--------------|
| HTTP/0.9 | 1991 | GET only |
| HTTP/1.0 | 1996 | Added headers and caching support |
| HTTP/1.1 | 1997 | Persistent connections; clear-text; fields separated by newline |
| HTTP/2 | 2015 | Binary data in dictionary form; improved performance and multiplexing |
| HTTP/3 | 2022 | Uses QUIC for faster, secure connections |

---

### HTTP Request Structure
Every HTTP request consists of four parts:

| Part | Description |
|------|-------------|
| Start Line | Method, path, and HTTP version — e.g., `GET /users/login.html HTTP/1.1` |
| Headers | Key-value pairs providing metadata; terminated with a blank line |
| Empty Line | Divides headers from body |
| Body | Data payload — present in POST/PUT requests |

---

### HTTP Response Structure
Every HTTP response consists of:

| Part | Description |
|------|-------------|
| Status Line | HTTP version and response code — e.g., `HTTP/1.1 200 OK` |
| Headers | Key-value metadata |
| Empty Line | Divides headers from body |
| Body | Returned content — HTML, JSON, images, PDFs, etc. |

---

### HTTP Status Codes

| Range   | Category      | Common Examples                                                                                              |
| ------- | ------------- | ------------------------------------------------------------------------------------------------------------ |
| 100–199 | Informational | 100 Continue                                                                                                 |
| 200–299 | Success       | 200 OK, 201 Created                                                                                          |
| 300–399 | Redirection   | 301 Moved Permanently, 302 Found                                                                             |
| 400–499 | Client Errors | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 405 Method Not Allowed, 408 Request Timeout |
| 500–599 | Server Errors | 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout                     |

Servers and CDN providers (Cloudflare, AWS) may implement their own custom codes beyond this list.

---

### HTTP Headers
Headers provide metadata about the request or response. Some are specific to requests or responses; others are general or entity headers common to both.

#### General Headers
Describe the message itself rather than its content.

| Header | Description |
|--------|-------------|
| `Date` | Date and time the message originated; converted to UTC |
| `Connection` | Whether the network connection should stay open after the request — `keep-alive` or `close` |

#### Entity Headers
Describe the content being transferred. Found in responses and POST/PUT requests.

| Header | Description |
|--------|-------------|
| `Content-Type` | Type of content being transferred; includes optional `charset` for encoding |
| `Media-Type` | Similar to Content-Type; can influence how the server interprets input |
| `Boundary` | Separator marker when a message contains multiple content parts — e.g., `boundary="b4e4fbd93540"` |
| `Content-Length` | Size of the body in bytes; required for the server to read the message body |
| `Content-Encoding` | Compression or transformation applied to the content |

#### Request Headers
| Header | Purpose |
|--------|---------|
| `Host` | Target domain — important recon target; may indicate other virtual hosts |
| `User-Agent` | Identifies the client software and version |
| `Referer` | URL of the page that originated this request — should not be trusted by servers |
| `Accept` | Media types the client can handle; `*/*` accepts all |
| `Accept-Encoding` | Supported compression formats |
| `Cookie` | Session cookies sent to the server; multiple cookies separated by `;` |
| `Authorization` | Authentication credentials — `Basic <base64>` or `Bearer <JWT>` |
| `Content-Length` | Size of the request body |

#### Response Headers
| Header | Purpose |
|--------|---------|
| `Set-Cookie` | Instructs client to store a cookie; parsed by browser for future requests |
| `Cache-Control` | Defines caching behavior; `no-cache` prevents sensitive data from being cached |
| `Content-Type` | Type of content returned |
| `Content-Encoding` | Compression method used on the response |
| `Server` | Reveals server software info — recon vector; version can expose known vulnerabilities |
| `Location` | Redirect target — can lead to open redirect if user-modifiable |
| `WWW-Authenticate` | Informs the client what type of authentication is required for the resource |

#### Security Headers
| Header | Purpose |
|--------|---------|
| `Content-Security-Policy` | Defines allowed content sources; prevents XSS by restricting script/style origins |
| `Strict-Transport-Security` | Enforces HTTPS; prevents protocol downgrade attacks |
| `X-Content-Type-Options: nosniff` | Prevents MIME type sniffing attacks |
| `Referrer-Policy` | Controls how much referrer info is sent during navigation |

**CSP example:** `Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.example.com`
**HSTS example:** `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`

---

### Cookies
- Small pieces of data stored on client devices to maintain session state across stateless HTTP requests
- Set by server via `Set-Cookie` response header; sent back by client via `Cookie` request header
- Used for session tracking, preferences, and authentication

---

### Authentication

#### HTTP Basic Auth
HTTP Basic Auth is handled directly by the web server to protect specific pages or directories. Credentials are base64-encoded and sent in the `Authorization` header.

`Authorization: Basic YWRtaW46cGFzc3dvcmQ=` (base64 of `admin:password`)

Modern apps use JWT tokens instead: `Authorization: Bearer <token>`

#### Form-Based Auth (POST + Cookie)
Most login forms are built in server-side languages (PHP, etc.) and use HTTP POST to submit credentials. On success, the server returns a `Set-Cookie` header with a session token, which the browser stores and sends on subsequent requests.

---

### Browser DevTools
Built into most modern browsers — not just for developers. Essential for web pentesting.

- Open: `F12` or `Ctrl+Shift+I`
- **Network tab** — captures all HTTP requests made by the page
- **Filter URLs** — search for specific requests
- **Click a request** — view full headers, body, cookies, and response
- **Right-click → Copy → Copy as cURL** — generates a full `curl` command replicating the exact request including all headers and cookies
- **Application → Storage → Cookies** — view, edit, or manually add cookies with the `+` button

---

### CRUD / REST APIs
APIs allow programmatic access to server resources. Many interact with a database where the table and row are specified in the URL.

#### API Standards
| Standard | Description | Format | Best For |
|----------|-------------|--------|---------|
| SOAP | Simple Object Access Protocol; rigid, XML-based messaging with a strict schema and stateful operation support | XML | Enterprise integrations, financial services, legacy systems |
| REST | Representational State Transfer; uses standard HTTP methods and URL paths; stateless and flexible | JSON, XML, or raw | Modern web APIs, public APIs, microservices |

REST is the dominant standard for modern web APIs. SOAP is still used in legacy enterprise environments where strict data contracts and stateful transactions are required.

#### CRUD Operations
| Operation | HTTP Method | Description |
|-----------|-------------|-------------|
| Create | POST | Add a new entry to a resource |
| Read | GET | Retrieve entries; wildcard or partial matches often supported |
| Update | PUT | Replace an entire entry; PATCH updates a partial entry |
| Delete | DELETE | Remove an entry — unprotected endpoints are a vulnerability |

`PUT` vs `PATCH`: PUT replaces the entire entry; PATCH applies partial modifications. Check `OPTIONS` header to confirm which the API accepts.

API interactions typically require authentication via `Authorization: Bearer <JWT>` or a session cookie. Use `| jq` to format JSON responses in the terminal.

---

### Virtual Hosts
Allows a single web server to host multiple websites by mapping each domain to a different root directory.
- `one.com` → `/var/www/website_one`
- `two.com` → `/var/www/website_two`

---

### Content Delivery Networks (CDN)
Distributes static website files across thousands of servers worldwide.
- Routes requests to the nearest server rather than the origin
- Reduces latency and improves load times for global users

---
## Related Concepts
- [[DNS (Domain Name System)]]
- [[TLS & SSL]]
- [[Website Innerworkings]]
- [[Web Application Proxies]]

## Related Techniques
- [[HTTP Interception]]
- [[Session Manipulation]]

## Related Tools
- [[curl]]
- [[Burp Proxy]]

---
## References / Images
- [[Assets/Images/Pasted image 20250402140805.png|URL Breakdown]]
- [[Assets/Images/Pasted image 20250402153217.png|Status Code Cheat Sheet]]
- [[Assets/Images/Pasted image 20250402154148.png|Cookie Exchange Process]]
- [[Assets/Images/Pasted image 20250405095423.png|HTTP Request and Response Example]]
- [[Assets/Images/Pasted image 20250405101407.png|HTTP Response Image]]
- RFC 2616, RFC 7230–7235
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
