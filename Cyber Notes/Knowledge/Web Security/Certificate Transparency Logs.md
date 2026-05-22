Tags: #Status/In-Progress #Type/Knowledge #Context/Web

---
## Overview
Certificate Transparency (CT) Logs are public, append-only ledgers that record the issuance of every SSL/TLS certificate by a Certificate Authority. Originally designed to detect rogue or misissued certificates, CT logs are invaluable for web reconnaissance because TLS certificates routinely contain Subject Alternative Names (SANs) that list all associated subdomains — providing a comprehensive subdomain inventory without ever querying the target's DNS.

---

## Terminology
| Term | Definition |
|------|------------|
| Certificate Authority (CA) | Trusted entity that issues and signs TLS certificates |
| CT Log | Public, append-only ledger recording certificates submitted by CAs |
| Signed Certificate Timestamp (SCT) | Cryptographic proof that a certificate was submitted to a CT log at a specific time |
| Subject Alternative Name (SAN) | Certificate field listing all domains and subdomains the certificate is valid for |
| Rogue Certificate | An unauthorized or fraudulent certificate issued by a trusted CA |
| Merkle Tree | Cryptographic tree structure used by CT logs to ensure integrity and tamper-resistance |
| Web PKI | Web Public Key Infrastructure — the trust system underpinning all secure HTTPS communication |
| Pre-Certificate | A draft certificate submitted to CT logs before the final certificate is issued to the site owner |

---
## Core Concepts

### Why Certificate Transparency Was Created
Before CT logs, a CA could silently issue certificates for any domain without the domain owner's knowledge. Attackers who compromised or coerced a CA could create certificates for `bank.com` or `google.com` to perform man-in-the-middle attacks undetected. CT logs solve this by requiring every certificate issuance to be publicly logged — making unauthorized certificates visible to anyone monitoring the logs.

CT logs serve three purposes:
1. **Early detection of rogue certificates** — domain owners can monitor logs for unauthorized issuances for their domains
2. **CA accountability** — public record creates audit trail; CAs can be held accountable for misissued certificates
3. **Strengthening Web PKI** — the entire TLS trust chain becomes more auditable and resilient

---

### How CT Logs Work
1. **Certificate Issuance** — A website owner requests a TLS certificate from a CA. The CA verifies domain ownership and creates a pre-certificate.
2. **Log Submission** — The CA submits the pre-certificate to multiple CT logs (each operated by a different organization). Once added, entries cannot be modified or deleted.
3. **Signed Certificate Timestamp (SCT)** — Each CT log returns an SCT — a cryptographic proof that the pre-certificate was logged at a specific time. The SCT is embedded in the final certificate.
4. **Browser Verification** — When a user connects to the site, the browser verifies the certificate's embedded SCTs against public CT logs to confirm the certificate was legitimately issued and logged.
5. **Monitoring and Auditing** — CT logs are continuously monitored by security researchers, domain owners, and automated tools looking for anomalies.

---

### Merkle Tree Integrity
CT logs use a **Merkle Tree** cryptographic structure to ensure that entries cannot be modified or deleted without detection:
- Each certificate is a leaf node with a unique hash
- Parent nodes contain hashes of their child nodes
- The **Merkle Root** is a single hash representing the entire log
- To verify any certificate, you need: the certificate's hash, its sibling hash, and the root hash — a short proof chain regardless of log size
- Any tampering changes the root hash, making modification immediately detectable

This structure is the same cryptographic primitive used in blockchain and Git to guarantee data integrity.

---

### CT Logs for Web Reconnaissance
CT logs are one of the most effective passive subdomain discovery methods because:
- Every TLS certificate's SAN field lists all covered subdomains
- Coverage is comprehensive — certificates must be logged to work in modern browsers (Chrome, Firefox require SCTs)
- Historical data is preserved — old and expired certificates remain in logs, revealing legacy subdomains with potentially outdated software

**What you can find:**
- Active subdomains covered by current certificates
- Development and staging subdomains (e.g., `dev.example.com`, `staging.example.com`)
- Legacy subdomains from old certificates that may still be live but forgotten
- API endpoints and internal services exposed via wildcard certificates

---

### Searching CT Logs

#### crt.sh
| Feature | Detail |
|---------|--------|
| Access | Free, no registration, browser and API |
| Query | Domain or wildcard (e.g., `%.example.com`) |
| Output | Certificate details, SAN entries, issuance history |
| API | Returns JSON; automatable with curl and jq |

Search all certificates issued for a domain and filter for specific subdomains:
`curl -s "https://crt.sh/?q=example.com&output=json" | jq -r '.[] | select(.name_value | contains("dev")) | .name_value' | sort -u`

Extract all unique subdomains from CT results:
`curl -s "https://crt.sh/?q=example.com&output=json" | jq -r '.[].name_value' | sort -u`

#### Censys
| Feature | Detail |
|---------|--------|
| Access | Registration required (free tier available) |
| Query | Domain, IP, or certificate attributes with advanced filtering |
| Output | In-depth analysis including misconfigurations, related hosts, and certificate chains |
| API | Available; useful for large-scale automated searches |

---
## Related Concepts
- [[Web Reconnaissance]]
- [[DNS (Domain Name System)]]
- [[TLS & SSL]]
- [[OSINT]]

## Related Techniques
- [[Subdomain Enumeration]]

---
## References / Images
- crt.sh: https://crt.sh
- RFC 6962 (Certificate Transparency): https://datatracker.ietf.org/doc/html/rfc6962
- IANA CT Log list: https://www.certificate-transparency.org/known-logs
