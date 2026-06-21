---
title: "Uncomplicated Firewall UFW"
category: "tools"
tags: []
excerpt: "UFW (Uncomplicated Firewall) is a simplified front-end for managing Linux firewall rules. Built on top of iptables and..."
date: "2026-03-28"
---

---
## Overview
UFW (Uncomplicated Firewall) is a simplified front-end for managing Linux firewall rules. Built on top of iptables and Netfilter, it abstracts complex rule syntax into straightforward commands — trading granular control for ease of use. Ideal for quick firewall configuration on Linux servers and desktops.

---
## Target / Context
Linux systems requiring firewall configuration. Sits in a hierarchy of Linux firewall tools — from most complex to simplest: Netfilter → iptables → UFW → Pre-defined rules.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo apt install ufw</code></li>
</ul>

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo ufw status</code></li>
  <li><code>sudo ufw enable</code></li>
  <li><code>sudo ufw disable</code></li>
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
| <code>status</code> | Check current firewall status | <code>sudo ufw status</code> |
| <code>status numbered</code> | Show all active rules with index numbers | <code>sudo ufw status numbered</code> |
| <code>enable</code> | Enable the firewall | <code>sudo ufw enable</code> |
| <code>disable</code> | Disable the firewall | <code>sudo ufw disable</code> |
| <code>allow</code> | Allow traffic on a port or service | <code>sudo ufw allow 80/tcp</code> |
| <code>deny</code> | Deny traffic on a port or service | <code>sudo ufw deny 22/tcp</code> |
| <code>delete</code> | Delete a rule by index number | <code>sudo ufw delete 2</code> |
| <code>default</code> | Set default policy for traffic direction | <code>sudo ufw default allow outgoing</code> |

</div>
</details>

---
## Common Use Cases

### Check Firewall Status

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo ufw status</code></li>
  <li><code>sudo ufw status numbered</code></li>
</ul>

</div>
</details>

### Allow or Deny Traffic

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo ufw allow 80/tcp</code></li>
  <li><code>sudo ufw deny 22/tcp</code></li>
  <li><code>sudo ufw default allow outgoing</code></li>
  <li><code>sudo ufw default deny incoming</code></li>
</ul>

</div>
</details>

### Manage Existing Rules

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo ufw status numbered</code></li>
  <li><code>sudo ufw delete 2</code></li>
</ul>

</div>
</details>

---
## Related Concepts
- [Firewalls](/knowledge/Networking/Firewalls)
- [Ports](/knowledge/Networking/Ports)
- [Protocols](/knowledge/Networking/Protocols)

## Related Techniques
-

## Related Playbooks
-

---
## References / Images
-
