---
title: "Nslookup"
category: "tools"
tags: []
excerpt: "nslookup is a command-line tool for querying DNS records. Used to resolve domain names to IP addresses, look up..."
date: "2026-04-05"
---

---
## Overview
nslookup is a command-line tool for querying DNS records. Used to resolve domain names to IP addresses, look up specific record types, and troubleshoot DNS issues. Available on both Linux and Windows.

---
## Target / Context
DNS servers and domain name resolution. Useful during recon to map domains, find mail servers, identify subdomains, and verify DNS configuration.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

Pre-installed on most Linux and Windows systems
<ul class="callout-list">
  <li><code>sudo apt install dnsutils</code></li>
</ul>

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>nslookup www.example.com</code></li>
  <li><code>man nslookup</code></li>
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
| <code>type=A</code> | Query A records (IPv4) | <code>nslookup -type=A example.com</code> |
| <code>type=AAAA</code> | Query AAAA records (IPv6) | <code>nslookup -type=AAAA example.com</code> |
| <code>type=MX</code> | Query mail exchange records | <code>nslookup -type=MX example.com</code> |
| <code>type=TXT</code> | Query TXT records | <code>nslookup -type=TXT example.com</code> |
| <code>type=NS</code> | Query nameserver records | <code>nslookup -type=NS example.com</code> |

</div>
</details>

---
## Common Use Cases

### Resolve a Domain

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>nslookup www.example.com</code></li>
</ul>

</div>
</details>

### Query Specific Record Types

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>nslookup -type=MX example.com</code></li>
  <li><code>nslookup -type=TXT example.com</code></li>
  <li><code>nslookup -type=NS example.com</code></li>
</ul>

</div>
</details>

---
## Related Concepts
- [DNS (Domain Name System)](/knowledge/Networking/DNS-Domain-Name-System)
- [Ports](/knowledge/Networking/Ports)

## Related Techniques
-

## Related Playbooks
-

---
## References / Images
-
