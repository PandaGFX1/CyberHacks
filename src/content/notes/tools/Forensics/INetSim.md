---
title: "INetSim"
category: "tools"
tags: []
excerpt: "INetSim (Internet Services Simulation Suite) is a tool used for dynamic malware analysis. It creates a fake network..."
date: "2026-03-28"
---

---
## Overview
INetSim (Internet Services Simulation Suite) is a tool used for dynamic malware analysis. It creates a fake network environment that simulates internet services, allowing you to observe how malicious software behaves — what it connects to, what it downloads, and how it communicates — without exposing a real network.

---
## Target / Context
Malware analysis lab environments. Run on a dedicated analysis VM to intercept and simulate outbound malware connections. Pairs with packet capture tools for full behavioral analysis.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo apt install inetsim</code></li>
</ul>

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo inetsim</code></li>
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
| Config file | Main configuration file | <code>/etc/inetsim/inetsim.conf</code> |
| <code>dns_default_ip</code> | DNS responses resolve to this IP | Set to your analysis machine IP |

</div>
</details>

---
## Common Use Cases

### Configure and Start INetSim

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo nano /etc/inetsim/inetsim.conf</code></li>
</ul>
Uncomment <code>dns_default_ip</code> and set it to your machine's IP address.
<ul class="callout-list">
  <li><code>sudo inetsim</code></li>
</ul>

</div>
</details>

### Mimic Malware Downloading a Secondary Payload
Simulates how malware reaches out to external servers to download additional binaries or scripts.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>sudo wget https://<INetSim IP>/second_payload.zip --no-check-certificate</code></li>
</ul>
Note: All files returned by INetSim are fake — safe to download in the analysis environment.

</div>
</details>

### Read Connection Report
After analysis, review what connections the malware attempted.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>cat /var/log/inetsim/report/<report file></code></li>
  <li><code>ls /var/log/inetsim/report/</code></li>
</ul>

</div>
</details>

---
## Related Concepts
- [Digital Forensics Fundamentals](/knowledge/Defensive-Security/Digital-Forensics-Fundamentals)

## Related Techniques
-

## Related Playbooks
-

---
## References / Images
- https://www.inetsim.org/documentation.html
