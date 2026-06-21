---
title: "Elastic Stack"
category: "tools"
tags: []
excerpt: "The Elastic Stack (formerly the ELK Stack) is an open-source log aggregation, search, and visualization platform widely..."
date: "2026-04-25"
---

---
## Overview
The Elastic Stack (formerly the ELK Stack) is an open-source log aggregation, search, and visualization platform widely deployed as a SIEM in enterprise environments. It consists of four components: **Elasticsearch** (storage and search engine), **Logstash** (log ingestion and parsing), **Kibana** (web-based query and visualization interface), and **Beats/Fleet agents** (lightweight log shippers on endpoints). For threat hunting and incident response, analysts primarily interact with **Kibana's Discover** interface to query ingested Windows event logs, Sysmon telemetry, and Zeek network logs. Elastic Security extends Kibana with pre-built detection rules, a Timeline view, and AI-assisted alert analysis.

## Target / Context
- Security operations centers using Elastic as a SIEM
- Threat hunters querying Windows audit logs, Sysmon telemetry, and Zeek network logs
- Incident responders correlating multi-source events to reconstruct an attack chain
- CJCA and SOC analyst certification prep

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation (Docker Compose — recommended):</span></summary>
<div class="callout-body">

The official Elastic documentation provides a Docker Compose deployment that includes Elasticsearch, Kibana, and Fleet Server.
See: https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html

</div>
</details>

---
## Basic Usage — Navigating Kibana

When you first land in Kibana, everything happens through the **Discover** view. Here is how to orient yourself:

**Step 1 — Open Discover**
Click the hamburger icon (top left) → select **Discover** from the sidebar.

**Step 2 — Select an Index Pattern (Log Source)**
Below the search bar there is a dropdown for the active index. This controls *which log sources* your query runs against.

| Index Pattern | What it Contains |
|--------------|-----------------|
| `windows*` | Windows Audit Logs, Sysmon logs, PowerShell logs |
| `zeek*` | Zeek network monitoring logs (DNS, HTTP, SSL, conn) |

Switch the index based on what type of data you need. A query for a Sysmon event ID will return nothing if you are searching the wrong index.

**Step 3 — Set a Time Range**
Use the date picker in the top right corner. For a full investigation with no known timeframe, set it to "Last 15 years" so nothing is excluded. Once you identify a timestamp of interest, narrow the window to reduce noise.

**Step 4 — Add Fields as Columns**
By default Discover shows every field in the raw log, which is overwhelming. The left sidebar shows **Available Fields**. Hover over any field name and click the blue **+** button to pin it as a column in the results table. This makes it easy to compare events at a glance.

**Step 5 — Search**
Type a query in the search bar using KQL (covered below) and click **Update** or press Enter.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Changing Timezone:</span></summary>
<div class="callout-body">

Navigate to <code>http://<target-ip>:<port>/app/management/kibana/settings</code> to adjust the Kibana timezone. By default it may be UTC — adjust if your investigation timestamps need to match local time.

</div>
</details>

---
## KQL — Kibana Query Language

KQL is the query language used in the Discover search bar. It is field-based and straightforward to learn.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>KQL Syntax Reference:</span></summary>
<div class="callout-body">

| Syntax | Description | Example |
|--------|-------------|---------|
| <code>field:value</code> | Match exact value | <code>event.code:1</code> |
| <code>field:"multi word"</code> | Exact phrase (use quotes for spaces) | <code>process.name:"ONENOTE.EXE"</code> |
| <code>field:value*</code> | Wildcard — matches anything after the prefix | <code>file.name:invoice*</code> |
| <code>field:*value*</code> | Wildcard on both sides — contains match | <code>process.command_line:*invoice.bat*</code> |
| <code>AND</code> | Both conditions must match | <code>event.code:1 AND host.hostname:WS001</code> |
| <code>OR</code> | Either condition matches | <code>event.code:4624 OR event.code:4625</code> |
| <code>NOT</code> | Exclude matching results | <code>NOT dns.question.name:www.google.com</code> |
| <code>( )</code> | Group conditions | <code>(event.code:4624 OR event.code:4625) AND source.ip:192.168.1.10</code> |
| <code>field:<hash></code> | Match by hash or long string | <code>process.hash.sha256:<hash></code> |

</div>
</details>

**How field names work:** Elastic uses dot-notation for nested fields. `process.parent.name` means the `name` field inside the `parent` object inside `process`. Fields come from the log source — Sysmon fields look like `process.name`, `file.path`, `destination.ip`. Windows Security events use `winlog.event_data.*` for event-specific fields.

---
## Elastic Common Schema (ECS)
ECS is a shared field naming standard that ensures consistent field names across all log sources ingested into the Elastic Stack. When Windows audit logs, Sysmon telemetry, Linux syslogs, and network logs all use the same field names, queries and dashboards work identically across sources.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>ECS Advantages:</span></summary>
<div class="callout-body">

| Advantage | Description |
|-----------|-------------|
| Unified Data View | All log sources share the same field names — no source-specific mapping required per query |
| Improved Search Efficiency | A single KQL query works across different data sources simultaneously |
| Enhanced Correlation | Correlate Windows, Linux, and network events using the same field name |
| Better Visualization | Dashboards and aggregations apply consistently across data sources |
| Interoperability | Compatible with Elastic Security detection rules and pre-built dashboards out of the box |

</div>
</details>

When both an ECS field and a source-specific field are available — for example `event.code` (ECS) vs `winlog.event_id` (Winlogbeat-specific) — prefer the ECS field when writing queries intended to work across multiple data sources.

#### Discovering Available Fields
Before writing a KQL query, use the **Discover** view to verify which fields exist in your index:
1. Use free-text search to find a known value — e.g., search `4625` to find all fields containing that event code
2. Expand a matching event and examine the field names listed — ECS fields use dot-notation (e.g., `event.code`), source-specific fields carry the beat prefix (e.g., `winlog.event_id`)
3. Prefer ECS fields for cross-source queries; use source-specific fields when targeting beat-specific data such as `winlog.event_data.SubStatus`

Useful Elastic documentation for field reference:
- ECS Reference: https://www.elastic.co/guide/en/ecs/current/ecs-reference.html
- Winlogbeat ECS fields: https://www.elastic.co/guide/en/beats/winlogbeat/current/exported-fields-ecs.html
- Winlogbeat security fields: https://www.elastic.co/guide/en/beats/winlogbeat/current/exported-fields-security.html
- Filebeat ECS fields: https://www.elastic.co/guide/en/beats/filebeat/current/exported-fields-ecs.html

---
## Flags & Options

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Key Fields by Category:</span></summary>
<div class="callout-body">

| Category | Fields |
|----------|--------|
| Event identification | <code>event.code</code>, <code>winlog.event_id</code> |
| Process | <code>process.name</code>, <code>process.pid</code>, <code>process.args</code>, <code>process.command_line</code>, <code>process.executable</code>, <code>process.hash.sha256</code> |
| Parent process | <code>process.parent.name</code>, <code>process.parent.command_line</code>, <code>process.parent.pid</code> |
| File | <code>file.name</code>, <code>file.path</code>, <code>file.extension</code> |
| Network | <code>source.ip</code>, <code>destination.ip</code>, <code>destination.port</code> |
| DNS | <code>dns.question.name</code>, <code>dns.answers.data</code>, <code>dns.resolved_ip</code>, <code>zeek.dns.answers</code> |
| Host | <code>host.hostname</code>, <code>host.name</code> |
| Authentication | <code>winlog.event_data.LogonType</code>, <code>winlog.event_data.TargetUserName</code> |
| PowerShell | <code>powershell.file.script_block_text</code> |

</div>
</details>

---
## Common Use Cases

### Understanding the Available Log Sources
Before hunting, understand what data you have. The Stuxbot scenario used in HTB demonstrates a typical Elastic SIEM log setup:

| Source | Index | What it Captures |
|--------|-------|-----------------|
| Windows Audit Logs | `windows*` | Logon events (4624/4625), log cleared (104), scheduled task creation |
| Sysmon | `windows*` | Process creation, network connections, file writes, DNS queries, registry changes |
| PowerShell Logs | `windows*` | Script block text, module loading, command execution |
| Zeek | `zeek*` | DNS resolutions, HTTP requests, SSL certificates, connection metadata |

> Sysmon does NOT capture network connections made by browsers by default — use Zeek for browser-initiated traffic.

---

### Detecting a Browser File Download (Sysmon Event ID 15)
Event ID 15 fires when a browser saves a file and attaches a Zone.Identifier Alternate Data Stream (ADS), which marks the file as internet-origin. This is one of the earliest indicators in a phishing delivery chain.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Browser Download Query:</span></summary>
<div class="callout-body">

Add columns: <code>process.name</code>, <code>process.executable</code>, <code>file.name</code>, <code>host.hostname</code>

<ul class="callout-list">
  <li><code>event.code:15 AND file.name:*suspicious-file*</code></li>
</ul>

Expand a matching event to inspect <code>process.name</code> — this shows which browser or application wrote the file. Record the timestamp as a point of interest for timeline anchoring.

</div>
</details>

---

### File Creation (Sysmon Event ID 11)
Catches file writes from any process (not just browsers). The `*` wildcard at the end of a filename also matches its Zone.Identifier stream — confirming internet origin even if Event ID 15 was not captured.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>File Creation Query:</span></summary>
<div class="callout-body">

Add columns: <code>file.name</code>, <code>file.path</code>, <code>host.hostname</code>, <code>process.name</code>

<ul class="callout-list">
  <li><code>event.code:11 AND file.name:suspicious-file*</code></li>
</ul>

Multiple hostname results mean the file appeared on more than one machine — a strong lateral spread indicator.

</div>
</details>

---

### Tracing a Process Execution Chain (Sysmon Event ID 1)
Process creation events let you trace the full execution chain from initial file open through to child processes and network connections. Work top-down: what opened the file → what did it spawn → what did those children do?

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Process Execution Queries:</span></summary>
<div class="callout-body">

**Find processes started by a specific file (e.g., a OneNote document opening a payload):**
<ul class="callout-list">
  <li><code>event.code:1 AND process.command_line:*invoice.one*</code></li>
</ul>

**Find everything spawned by a specific application:**
Add columns: <code>process.name</code>, <code>process.args</code>, <code>process.pid</code>, <code>process.parent.name</code>
<ul class="callout-list">
  <li><code>event.code:1 AND process.parent.name:"ONENOTE.EXE"</code></li>
</ul>

**Trace all child processes of a specific batch file:**
<ul class="callout-list">
  <li><code>event.code:1 AND process.parent.command_line:*invoice.bat*</code></li>
</ul>

**Investigate everything a specific PID did:**
Add column: <code>event.code</code>
<ul class="callout-list">
  <li><code>process.pid:"9944" AND process.name:"powershell.exe"</code></li>
</ul>
— Review all event codes fired by this PID to see file writes, DNS lookups, and network connections.

</div>
</details>

---

### Network Connections (Sysmon Event ID 3)
Captures outbound TCP/UDP connections made by processes (excludes most browser traffic — use Zeek for that).

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Network Connection Query:</span></summary>
<div class="callout-body">

Add columns: <code>source.ip</code>, <code>destination.ip</code>, <code>destination.port</code>, <code>process.name</code>

<ul class="callout-list">
  <li><code>event.code:3 AND host.hostname:<hostname></code></li>
</ul>

Look for connections to external IPs on unusual ports, or repeated beaconing (regular intervals to the same destination).

</div>
</details>

---

### DNS Analysis (Zeek Logs)
Switch the index to `zeek*` for DNS queries. Zeek captures what browsers and other processes resolve — essential for detecting C2 domains and data exfiltration.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>DNS Hunt Workflow:</span></summary>
<div class="callout-body">

1. Switch index to <code>zeek*</code>
2. Set the time range to your window of interest
3. Add columns: <code>dns.question.name</code>, <code>dns.answers.data</code>, <code>source.ip</code>

**Hunt all DNS queries from a host:**
<ul class="callout-list">
  <li><code>source.ip:<host-ip> AND dns.question.name:*</code></li>
</ul>

**Exclude known noisy domains (iteratively clean the results):**
<ul class="callout-list">
  <li><code>source.ip:<host-ip> AND dns.question.name:* NOT dns.question.name:www.google.com</code></li>
</ul>

Use the left sidebar **Top 5 Values** for <code>dns.question.name</code> to identify high-frequency domains — apply negative filters on the known-good ones until anomalies surface.

**Look up a suspicious IP directly:**
Just type the IP in the search bar — Elastic will return all log entries referencing it across any field.

</div>
</details>

---

### DNS Events by Process (Sysmon Event ID 22)
Correlates DNS resolutions with the specific process that triggered them. Useful when you already have a suspicious process and want to see what domains it reached out to.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>DNS Event Query:</span></summary>
<div class="callout-body">

Add columns: <code>process.name</code>, <code>dns.question.name</code>, <code>destination.ip</code>

<ul class="callout-list">
  <li><code>event.code:22 AND process.name:"<suspicious-process>"</code></li>
</ul>

</div>
</details>

---

### Hunting Lateral Movement (Logon Events 4624 / 4625)
Network logons (Logon Type 3) from unexpected source IPs are a primary indicator of lateral movement via PsExec, WinRM, or SMB file share access.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Lateral Movement Query:</span></summary>
<div class="callout-body">

Add columns: <code>source.ip</code>, <code>winlog.event_data.TargetUserName</code>, <code>winlog.event_data.LogonType</code>, <code>host.hostname</code>

<ul class="callout-list">
  <li><code>(event.code:4624 OR event.code:4625) AND winlog.event_data.LogonType:3 AND source.ip:<suspicious-host-ip></code></li>
</ul>

- <code>4624</code> = Successful logon (attacker got in)
- <code>4625</code> = Failed logon (brute force attempt visible here)
- <code>LogonType:3</code> = Network logon — this is what PsExec and WinRM produce

Exclude the machine's own service accounts and known admin IPs to isolate unauthorized activity.

</div>
</details>

---

### Hunting Persistence (Scheduled Tasks / Registry)
Common persistence mechanisms show up as child processes of cmd.exe or PowerShell creating scheduled tasks, or registry writes.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Persistence Hunt Queries:</span></summary>
<div class="callout-body">

**Scheduled task creation via PowerShell:**
<ul class="callout-list">
  <li><code>powershell.file.script_block_text:"Register-ScheduledTask"</code></li>
</ul>

**schtasks.exe spawned (command-line task creation):**
<ul class="callout-list">
  <li><code>event.code:1 AND process.name:"schtasks.exe"</code></li>
</ul>

**Look for the parent of schtasks — what triggered it?**
<ul class="callout-list">
  <li><code>event.code:1 AND process.name:"schtasks.exe" AND process.parent.name:"cmd.exe"</code></li>
</ul>

</div>
</details>

---

### Hunting Credential Dumping (LSASS Access)
Tools like Mimikatz access lsass.exe to dump credentials from memory. Sysmon Event ID 10 captures process access events.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Credential Dumping Queries:</span></summary>
<div class="callout-body">

**Find LSASS access events:**
<ul class="callout-list">
  <li><code>event.code:10 AND winlog.event_data.TargetImage:*lsass*</code></li>
</ul>

**Hunt for Mimikatz in PowerShell script blocks:**
<ul class="callout-list">
  <li><code>powershell.file.script_block_text:"Invoke-Mimikatz"</code></li>
</ul>

**Hunt for common Mimikatz keywords:**
<ul class="callout-list">
  <li><code>powershell.file.script_block_text:"sekurlsa"</code></li>
</ul>

</div>
</details>

---

### Checking a File Hash Across All Hosts
Determine if a malicious binary has spread to multiple machines.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Hash Hunt Query:</span></summary>
<div class="callout-body">

Add column: <code>host.hostname</code>

<ul class="callout-list">
  <li><code>process.hash.sha256:<full-sha256-hash></code></li>
</ul>

If you see multiple hostnames in the results, the file has spread — this changes the incident scope significantly.

</div>
</details>

---

### PowerShell Script Block Analysis
PowerShell logs script block content when script block logging is enabled — invaluable for spotting encoded commands, downloaders, and post-exploitation tools.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>PowerShell Analysis:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>powershell.file.script_block_text:<keyword></code></li>
</ul>

Useful keywords to hunt for:
| Keyword | What it Indicates |
|---------|------------------|
| <code>DownloadString</code> | In-memory payload download |
| <code>DownloadFile</code> | File download to disk |
| <code>-EncodedCommand</code> | Obfuscated PowerShell execution |
| <code>Invoke-Expression</code> (or <code>IEX</code>) | Executing code from a string — strong IOC |
| <code>Invoke-Mimikatz</code> | Credential dumping |
| <code>sekurlsa</code> | Mimikatz module for credential extraction |
| <code>Register-ScheduledTask</code> | Persistence via scheduled task |

</div>
</details>

---

### Building Dashboard Visualizations
Dashboards in Kibana are containers for multiple visualizations — they provide at-a-glance views for SOC analysts during triage. Below are four common security dashboard visualizations built using the Kibana Lens interface.

**General setup steps (apply to all visualizations below):**
1. Hamburger menu → **Dashboard** → **Create new dashboard** → **Create visualization**
2. Set the time range wide (e.g., 15 years) before filtering
3. Select the correct index pattern from the index dropdown (e.g., `windows*`)
4. Select visualization type from the dropdown above the main section (Table is common for security views)
5. Click **Save and return** when done; save the dashboard with its time range pinned

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Failed Logon Attempts (All Users) — Event Code 4625:</span></summary>
<div class="callout-body">

Tracks all failed Windows logon attempts ranked by user and machine.

1. Filter: <code>event.code is 4625</code>
2. Verify <code>user.name.keyword</code> exists in the index via the left sidebar search
3. Configure rows and metrics in Lens:
- Row: <code>user.name.keyword</code> (1000 values) → Display Name: **Username**
- Metric: Count → Display Name: **# of Logins**
- Row: <code>host.hostname.keyword</code> → Display Name: **Event logged by**
- Row: <code>winlog.logon.type.keyword</code> → Display Name: **Logon Type**
4. Click **# of Logins** column header → Sort descending
5. Add exclusion filters for known noise accounts: <code>user.name.keyword is not <noise-account></code>
6. Add KQL to the top search bar to exclude computer accounts and scope to Security log:
<ul class="callout-list">
  <li><code>NOT user.name: *$ AND winlog.channel.keyword: Security</code></li>
  <li><code>NOT user.name: *$` — excludes computer accounts, which end in `$</code></li>
</ul>
- <code>winlog.channel.keyword: Security</code> — restricts to the Security event log only

</div>
</details>

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Failed Logon Attempts (Disabled Accounts) — Event Code 4625 + SubStatus 0xC0000072:</span></summary>
<div class="callout-body">

Same as the failed logon visualization above but filtered to accounts that failed specifically because they are disabled.

Follow the Failed Logon Attempts setup, then add one additional filter:
<ul class="callout-list">
  <li><code>winlog.event_data.SubStatus: 0xC0000072</code></li>
</ul>

SubStatus <code>0xC0000072</code> is the Windows status code indicating the account is currently disabled.

</div>
</details>

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Successful RDP Logon by Service Accounts — Event Code 4624:</span></summary>
<div class="callout-body">

Monitors successful remote desktop logons by service accounts, which should rarely initiate RDP sessions interactively.

1. Filter: <code>event.code is 4624</code> (successful logon)
2. Filter: <code>winlog.logon.type is RemoteInteractive</code> (Logon Type 10 = RDP)
3. KQL: <code>user.name: svc-*</code> (adjust the prefix to match your service account naming convention)
4. Add row: <code>related.ip.keyword</code> — shows the source IP initiating the RDP connection

</div>
</details>

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Local Group Membership Changes — Event Codes 4732 / 4733:</span></summary>
<div class="callout-body">

Tracks users added to or removed from security-enabled local groups such as Administrators.
- **4732** — Member added to a security-enabled local group
- **4733** — Member removed from a security-enabled local group

1. Filter: <code>event.code is one of 4732, 4733</code>
2. Filter: <code>group.name is administrators</code>
3. Configure rows:
- <code>winlog.event_data.MemberSid.keyword</code> — which user was changed
- <code>group.name.keyword</code> — which group was affected
- <code>event.action.keyword</code> — whether they were added or removed
- <code>host.name.keyword</code> — which host reported the event
4. For time-boxed views, customize the time range per visualization using an absolute date range (e.g., Jan 1–Jan 31) rather than a relative range — Elasticsearch uses bucket aggregation intervals for relative ranges which may miss events

</div>
</details>

---

## Elastic Security App
Beyond raw log queries in Discover, the **Elastic Security** app provides analyst-focused features:

| Feature | Description |
|---------|-------------|
| Detection Rules | Pre-built and custom rules that fire automatically on defined conditions — reduces manual hunting for known TTPs |
| Timeline | Chronological multi-source event view for reconstructing an attack chain; supports pinning, annotations, and sharing |
| Attack Discovery | AI-powered alert analysis that groups related alerts and summarizes the attack scope — useful for rapid triage |
| Cases | Integrated case management for tracking investigations, assigning tasks, and documenting findings |

To access: Hamburger menu → Security → any of the above views.

---

## Sysmon Event ID Reference

| Event ID | Event Type | Primary Use |
|----------|-----------|-------------|
| 1 | Process Creation | Trace execution chains; parent-child process relationships |
| 3 | Network Connection | Detect C2 beaconing; outbound connections from processes |
| 10 | Process Access | Detect LSASS dumping and process injection |
| 11 | File Create | Track file drops by any process |
| 12/13 | Registry Create / Set | Detect persistence via registry run keys |
| 15 | File Create Stream Hash | Detect internet-origin files (Zone.Identifier ADS) |
| 22 | DNS Event | Correlate process DNS lookups to domains |

## Windows Security Event ID Reference

| Event ID | Description | Hunting Context |
|----------|-------------|-----------------|
| 4624 | Successful logon | LogonType 3 = lateral movement via network |
| 4625 | Failed logon | Brute force indicator |
| 4648 | Logon with explicit credentials | RunAs / PtH indicator |
| 4768 | Kerberos TGT requested | Kerberoasting baseline |
| 4769 | Kerberos service ticket requested | Kerberoasting activity |
| 104 | Event log cleared | Post-exploitation anti-forensics |

---
## Related Techniques
- [Threat Hunting](/knowledge/Defensive-Security/Threat-Hunting)

## Related Playbooks
-

---
## References / Images
- Elastic Sysmon Integration Docs — https://www.elastic.co/docs/current/integrations/windows
- Sysmon Event ID Reference — https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon
- Zeek Network Security Monitor — https://zeek.org/
- Elastic Security Detection Rules GitHub — https://github.com/elastic/detection-rules
- ECS Reference — https://www.elastic.co/guide/en/ecs/current/ecs-reference.html
- ECS Event Fields — https://www.elastic.co/guide/en/ecs/current/ecs-event.html
- Winlogbeat ECS Fields — https://www.elastic.co/guide/en/beats/winlogbeat/current/exported-fields-ecs.html
- Winlogbeat Security Fields — https://www.elastic.co/guide/en/beats/winlogbeat/current/exported-fields-security.html
- Filebeat ECS Fields — https://www.elastic.co/guide/en/beats/filebeat/current/exported-fields-ecs.html
