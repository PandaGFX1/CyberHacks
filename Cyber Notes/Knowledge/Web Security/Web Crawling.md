Tags: #Status/In-Progress #Type/Knowledge #Context/Web #Context/Redteam

---
## Overview
Web crawling (also called spidering) is the automated process of systematically browsing a website by following links from page to page and collecting information about its structure, content, and resources. In web reconnaissance, crawlers map the full scope of a target site — including directories, files, comments, and metadata that may not be visible from the main navigation. Two critical crawling targets are `robots.txt` (which reveals restricted paths) and `.well-known` URIs (which expose configuration metadata).

---

## Terminology
| Term | Definition |
|------|------------|
| Seed URL | The initial URL a crawler starts from; defines the entry point of the crawl |
| Crawl Depth | How many links deep the crawler will follow from the seed URL |
| Breadth-First Crawling | Strategy that explores all links on the current page before following any of them deeper |
| Depth-First Crawling | Strategy that follows a single link chain as far as possible before backtracking |
| robots.txt | A plain text file at the web root that tells crawlers which paths to avoid |
| Robots Exclusion Standard | The protocol defining how robots.txt is written and interpreted |
| .well-known | A standardized path (`/.well-known/`) for hosting metadata, configuration, and security disclosure files |
| Sitemap | An XML file listing all URLs the site owner wants indexed; often found via robots.txt |

---
## Core Concepts

### How Web Crawlers Work
1. Start at the **seed URL** and download the page content
2. Parse the HTML to extract all links (internal and external)
3. Add unvisited links to a queue
4. Fetch the next URL from the queue and repeat
5. Continue until the queue is empty, crawl depth is reached, or time/resource limits are hit

Crawlers are heavily shaped by configuration — a targeted crawl might stay within a single domain; a broad crawl can explore an entire web server's structure.

---

### Crawling Strategies

#### Breadth-First Crawling
Explores all links at the current level before going deeper. Produces a broad overview of site structure quickly.
- Good for: mapping the full top-level structure of a website
- Risk: may generate many requests in a short burst, which can trigger rate limiting

#### Depth-First Crawling
Follows a single path of links as deep as possible before backtracking. Reaches deeply nested content efficiently.
- Good for: finding deeply buried pages, following a specific path (e.g., an API or admin flow)
- Risk: can get stuck in deep pagination or dynamically generated URL trees

---

### What Crawlers Can Find
| Data Type | What It Reveals |
|-----------|----------------|
| Internal links | Page structure, hidden directories, admin paths not linked from the main nav |
| External links | Third-party services, CDNs, and partner infrastructure the target depends on |
| HTML comments | Developer notes, internal process details, hardcoded credentials, or vulnerability hints |
| Metadata | Page titles, descriptions, and generator tags revealing CMS or framework versions |
| Sensitive files | Backup files (`.bak`, `.old`), config files (`config.php`, `settings.py`), log files, files containing API keys or passwords |

Context matters: a comment about a database schema combined with a `/files/` directory could indicate a direct path to sensitive data.

---

### robots.txt
A plain text file located at the web root (`/robots.txt`) that tells web crawlers which paths are off-limits. It adheres to the Robots Exclusion Standard and typically targets named user-agents (bot identifiers).

**Common directives:**
| Directive | Purpose |
|-----------|---------|
| `User-agent` | Specifies which crawler the rule applies to (`*` = all crawlers) |
| `Disallow` | Paths the crawler should not access |
| `Allow` | Explicitly permits a path (overrides a Disallow for the same subtree) |
| `Crawl-delay` | Seconds to wait between requests |
| `Sitemap` | URL of the site's XML sitemap |

**Why robots.txt matters for reconnaissance:**
- `Disallow` entries often point directly at sensitive paths — admin panels, backup directories, internal APIs, staging environments
- The file is public and unprotected — it's meant to be read by any client
- Honeypot entries (`Disallow: /honeypot/`) can reveal the target's security awareness level
- Rogue crawlers (and attackers) can ignore robots.txt entirely — it is not an access control mechanism

---

### .well-known URIs
The `/.well-known/` path on a web server is a standardized directory (RFC 5785) for hosting metadata that clients and services need to auto-discover. It allows browsers, mail clients, and apps to locate configuration documents without prior knowledge of the site's structure.

IANA maintains the full registry: https://www.iana.org/assignments/well-known-uris/well-known-uris.xhtml

**Notable .well-known entries:**

| URI Suffix | Description | Status |
|------------|-------------|--------|
| `security.txt` | Contact information for reporting security vulnerabilities to the site owner | Permanent (RFC 9116) |
| `change-password` | Standard URL for directing users to the password change page | Provisional |
| `openid-configuration` | OpenID Connect discovery metadata — exposes authorization and token endpoints | Permanent |
| `assetlinks.json` | Digital asset links for verifying app ownership associated with the domain | Permanent |
| `mta-sts.txt` | SMTP MTA Strict Transport Security policy for email security | Permanent (RFC 8461) |

#### openid-configuration for Web Recon
`/.well-known/openid-configuration` is particularly useful because it exposes the full OpenID Connect implementation for the site. Fetching it returns a JSON document such as:

```json
{
  "issuer": "https://example.com",
  "authorization_endpoint": "https://example.com/oauth2/authorize",
  "token_endpoint": "https://example.com/oauth2/token",
  "userinfo_endpoint": "https://example.com/oauth2/userinfo",
  "jwks_uri": "https://example.com/oauth2/jwks",
  "response_types_supported": ["code", "token", "id_token"],
  "subject_types_supported": ["public"],
  "id_token_signing_alg_values_supported": ["RS256"],
  "scopes_supported": ["openid", "profile", "email"]
}
```

This reveals:
- **Endpoint discovery** — authorization, token, and userinfo endpoints to probe
- **JWKS URI** — JSON Web Key Set, showing cryptographic keys used by the server
- **Supported scopes and response types** — maps out the OAuth/OIDC implementation
- **Algorithm details** — signing algorithms used, which inform token forgery analysis

---

### Crawling Tools
| Tool | Type | Notes |
|------|------|-------|
| Burp Suite Spider | Active scanner | Maps pages, identifies hidden content, integrates with Burp workflow |
| OWASP ZAP Spider | Free / Active | Ajax Spider for JS-heavy apps; passive scan during crawl |
| Scrapy | Python framework | Customizable; suited for complex crawling logic and data extraction |
| ReconSpider | Scrapy-based | Pre-built recon spider; saves output as JSON |
| Apache Nutch | Scalable Java crawler | Enterprise-scale; handles massive crawls across an entire domain or the web |

**ReconSpider quick usage:**
`python3 ReconSpider.py https://example.com` — Saves discovered links, emails, and resources to a JSON file.

---
## Related Concepts
- [[Web Reconnaissance]]
- [[Web Fingerprinting]]
- [[HTTP & HTTPS]]
- [[Website Innerworkings]]

## Related Techniques
- [[Subdomain Enumeration]]

## Related Tools
- [[Burp Suite]]
- [[OWASP ZAP]]

---
## References / Images
- IANA .well-known URI registry: https://www.iana.org/assignments/well-known-uris/well-known-uris.xhtml
- RFC 9116 (security.txt): https://datatracker.ietf.org/doc/html/rfc9116
- RFC 5785 (.well-known): https://datatracker.ietf.org/doc/html/rfc5785
