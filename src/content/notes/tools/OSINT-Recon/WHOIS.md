---
title: "WHOIS"
category: "tools"
tags: []
excerpt: "WHOIS is a command-line tool for querying domain registration information from public WHOIS databases. Returns..."
date: "2026-05-07"
---

---
## Overview
WHOIS is a command-line tool for querying domain registration information from public WHOIS databases. Returns registrant details, registrar info, nameservers, registration dates, and contact information. Useful during passive recon to gather intelligence on a target domain without directly interacting with their infrastructure.

---
## Target / Context
Domain names and IP address ranges. Core passive recon tool — queries public registration databases, not the target directly.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo apt install whois</code></li>
</ul>

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>whois www.example.com</code></li>
  <li><code>man whois</code></li>
</ul>

</div>
</details>

---
## Flags & Options

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Flags & Options:</span></summary>
<div class="callout-body">

| Flag | Description | Example |
|------|-------------|---------|
| <code>-h</code> | Specify WHOIS server to query | <code>whois -h whois.arin.net 10.10.10.1</code> |
| <code>-p</code> | Specify port for WHOIS server | <code>whois -p 43 example.com</code> |

</div>
</details>

---
## Common Use Cases

### Query Domain Registration Info

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>whois example.com</code></li>
</ul>

</div>
</details>

### Query an IP Address

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>whois 10.10.10.1</code></li>
</ul>

</div>
</details>

### Penetration Testing Use Cases

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Phishing Domain Verification:</span></summary>
<div class="callout-body">

Use WHOIS to assess whether an email sender's domain is suspicious:
- **Registration date** — recently registered domains (days/weeks old) are a red flag
- **Privacy service** — registrant hidden behind a privacy proxy (common in phishing infrastructure)
- **Nameservers** — known malicious hosting providers or bulletproof hosters

<code>whois <suspicious-domain></code> — check registrar, creation date, and nameservers

</div>
</details>

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>C2 Infrastructure Identification:</span></summary>
<div class="callout-body">

If malware analysis reveals a C2 domain, WHOIS identifies the hosting provider:
- Retrieve the registrar and abuse contact information
- Report the domain to the hosting provider's abuse desk
- Identify the IP range used and correlate with known threat infrastructure

<code>whois <c2-domain></code> — extract hosting provider, ASN, and registrant contact

</div>
</details>

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Threat Actor Attribution:</span></summary>
<div class="callout-body">

Different domains registered by the same actor often share nameservers, registrars, or contact details:
- Pivot from a known malicious domain to related infrastructure via shared nameserver entries
- Historical WHOIS records reveal ownership changes and contact patterns over time
- Useful for building a profile of recurring threat actor infrastructure

Historical WHOIS records: https://whoisfreaks.com/

</div>
</details>

---
## Related Concepts
- [DNS (Domain Name System)](/knowledge/Networking/DNS-Domain-Name-System)

## Related Techniques
- [Subdomain Enumeration](/techniques/Subdomain-Enumeration)

## Related Playbooks
- [OSINT Playbook](/playbooks/OSINT-Playbook)

## Related Tools
- [nslookup](/tools/OSINT-Recon/nslookup)
- [dig](/tools/OSINT-Recon/dig)
- [FinalRecon](/tools/OSINT-Recon/FinalRecon)

---
## References / Images
-
