#Status/In-Progress #Type/Tool #Context/Blueteam

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

> [!INFO]- Installation (Docker Compose — recommended):
> The official Elastic documentation provides a Docker Compose deployment that includes Elasticsearch, Kibana, and Fleet Server.
> See: https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html

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

> [!INFO]- Changing Timezone:
> Navigate to `http://<target-ip>:<port>/app/management/kibana/settings` to adjust the Kibana timezone. By default it may be UTC — adjust if your investigation timestamps need to match local time.

---
## KQL — Kibana Query Language

KQL is the query language used in the Discover search bar. It is field-based and straightforward to learn.

> [!INFO]- KQL Syntax Reference:
> | Syntax | Description | Example |
> |--------|-------------|---------|
> | `field:value` | Match exact value | `event.code:1` |
> | `field:"multi word"` | Exact phrase (use quotes for spaces) | `process.name:"ONENOTE.EXE"` |
> | `field:value*` | Wildcard — matches anything after the prefix | `file.name:invoice*` |
> | `field:*value*` | Wildcard on both sides — contains match | `process.command_line:*invoice.bat*` |
> | `AND` | Both conditions must match | `event.code:1 AND host.hostname:WS001` |
> | `OR` | Either condition matches | `event.code:4624 OR event.code:4625` |
> | `NOT` | Exclude matching results | `NOT dns.question.name:www.google.com` |
> | `( )` | Group conditions | `(event.code:4624 OR event.code:4625) AND source.ip:192.168.1.10` |
> | `field:<hash>` | Match by hash or long string | `process.hash.sha256:<hash>` |

**How field names work:** Elastic uses dot-notation for nested fields. `process.parent.name` means the `name` field inside the `parent` object inside `process`. Fields come from the log source — Sysmon fields look like `process.name`, `file.path`, `destination.ip`. Windows Security events use `winlog.event_data.*` for event-specific fields.

---
## Elastic Common Schema (ECS)
ECS is a shared field naming standard that ensures consistent field names across all log sources ingested into the Elastic Stack. When Windows audit logs, Sysmon telemetry, Linux syslogs, and network logs all use the same field names, queries and dashboards work identically across sources.

> [!INFO]- ECS Advantages:
> | Advantage | Description |
> |-----------|-------------|
> | Unified Data View | All log sources share the same field names — no source-specific mapping required per query |
> | Improved Search Efficiency | A single KQL query works across different data sources simultaneously |
> | Enhanced Correlation | Correlate Windows, Linux, and network events using the same field name |
> | Better Visualization | Dashboards and aggregations apply consistently across data sources |
> | Interoperability | Compatible with Elastic Security detection rules and pre-built dashboards out of the box |

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

> [!INFO]- Key Fields by Category:
> | Category | Fields |
> |----------|--------|
> | Event identification | `event.code`, `winlog.event_id` |
> | Process | `process.name`, `process.pid`, `process.args`, `process.command_line`, `process.executable`, `process.hash.sha256` |
> | Parent process | `process.parent.name`, `process.parent.command_line`, `process.parent.pid` |
> | File | `file.name`, `file.path`, `file.extension` |
> | Network | `source.ip`, `destination.ip`, `destination.port` |
> | DNS | `dns.question.name`, `dns.answers.data`, `dns.resolved_ip`, `zeek.dns.answers` |
> | Host | `host.hostname`, `host.name` |
> | Authentication | `winlog.event_data.LogonType`, `winlog.event_data.TargetUserName` |
> | PowerShell | `powershell.file.script_block_text` |

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

> [!INFO]- Browser Download Query:
> Add columns: `process.name`, `process.executable`, `file.name`, `host.hostname`
>
> `event.code:15 AND file.name:*suspicious-file*`
>
> Expand a matching event to inspect `process.name` — this shows which browser or application wrote the file. Record the timestamp as a point of interest for timeline anchoring.

---

### File Creation (Sysmon Event ID 11)
Catches file writes from any process (not just browsers). The `*` wildcard at the end of a filename also matches its Zone.Identifier stream — confirming internet origin even if Event ID 15 was not captured.

> [!INFO]- File Creation Query:
> Add columns: `file.name`, `file.path`, `host.hostname`, `process.name`
>
> `event.code:11 AND file.name:suspicious-file*`
>
> Multiple hostname results mean the file appeared on more than one machine — a strong lateral spread indicator.

---

### Tracing a Process Execution Chain (Sysmon Event ID 1)
Process creation events let you trace the full execution chain from initial file open through to child processes and network connections. Work top-down: what opened the file → what did it spawn → what did those children do?

> [!INFO]- Process Execution Queries:
> **Find processes started by a specific file (e.g., a OneNote document opening a payload):**
> `event.code:1 AND process.command_line:*invoice.one*`
>
> **Find everything spawned by a specific application:**
> Add columns: `process.name`, `process.args`, `process.pid`, `process.parent.name`
> `event.code:1 AND process.parent.name:"ONENOTE.EXE"`
>
> **Trace all child processes of a specific batch file:**
> `event.code:1 AND process.parent.command_line:*invoice.bat*`
>
> **Investigate everything a specific PID did:**
> Add column: `event.code`
> `process.pid:"9944" AND process.name:"powershell.exe"`
> — Review all event codes fired by this PID to see file writes, DNS lookups, and network connections.

---

### Network Connections (Sysmon Event ID 3)
Captures outbound TCP/UDP connections made by processes (excludes most browser traffic — use Zeek for that).

> [!INFO]- Network Connection Query:
> Add columns: `source.ip`, `destination.ip`, `destination.port`, `process.name`
>
> `event.code:3 AND host.hostname:<hostname>`
>
> Look for connections to external IPs on unusual ports, or repeated beaconing (regular intervals to the same destination).

---

### DNS Analysis (Zeek Logs)
Switch the index to `zeek*` for DNS queries. Zeek captures what browsers and other processes resolve — essential for detecting C2 domains and data exfiltration.

> [!INFO]- DNS Hunt Workflow:
> 1. Switch index to `zeek*`
> 2. Set the time range to your window of interest
> 3. Add columns: `dns.question.name`, `dns.answers.data`, `source.ip`
>
> **Hunt all DNS queries from a host:**
> `source.ip:<host-ip> AND dns.question.name:*`
>
> **Exclude known noisy domains (iteratively clean the results):**
> `source.ip:<host-ip> AND dns.question.name:* NOT dns.question.name:www.google.com`
>
> Use the left sidebar **Top 5 Values** for `dns.question.name` to identify high-frequency domains — apply negative filters on the known-good ones until anomalies surface.
>
> **Look up a suspicious IP directly:**
> Just type the IP in the search bar — Elastic will return all log entries referencing it across any field.

---

### DNS Events by Process (Sysmon Event ID 22)
Correlates DNS resolutions with the specific process that triggered them. Useful when you already have a suspicious process and want to see what domains it reached out to.

> [!INFO]- DNS Event Query:
> Add columns: `process.name`, `dns.question.name`, `destination.ip`
>
> `event.code:22 AND process.name:"<suspicious-process>"`

---

### Hunting Lateral Movement (Logon Events 4624 / 4625)
Network logons (Logon Type 3) from unexpected source IPs are a primary indicator of lateral movement via PsExec, WinRM, or SMB file share access.

> [!INFO]- Lateral Movement Query:
> Add columns: `source.ip`, `winlog.event_data.TargetUserName`, `winlog.event_data.LogonType`, `host.hostname`
>
> `(event.code:4624 OR event.code:4625) AND winlog.event_data.LogonType:3 AND source.ip:<suspicious-host-ip>`
>
> - `4624` = Successful logon (attacker got in)
> - `4625` = Failed logon (brute force attempt visible here)
> - `LogonType:3` = Network logon — this is what PsExec and WinRM produce
>
> Exclude the machine's own service accounts and known admin IPs to isolate unauthorized activity.

---

### Hunting Persistence (Scheduled Tasks / Registry)
Common persistence mechanisms show up as child processes of cmd.exe or PowerShell creating scheduled tasks, or registry writes.

> [!INFO]- Persistence Hunt Queries:
> **Scheduled task creation via PowerShell:**
> `powershell.file.script_block_text:"Register-ScheduledTask"`
>
> **schtasks.exe spawned (command-line task creation):**
> `event.code:1 AND process.name:"schtasks.exe"`
>
> **Look for the parent of schtasks — what triggered it?**
> `event.code:1 AND process.name:"schtasks.exe" AND process.parent.name:"cmd.exe"`

---

### Hunting Credential Dumping (LSASS Access)
Tools like Mimikatz access lsass.exe to dump credentials from memory. Sysmon Event ID 10 captures process access events.

> [!INFO]- Credential Dumping Queries:
> **Find LSASS access events:**
> `event.code:10 AND winlog.event_data.TargetImage:*lsass*`
>
> **Hunt for Mimikatz in PowerShell script blocks:**
> `powershell.file.script_block_text:"Invoke-Mimikatz"`
>
> **Hunt for common Mimikatz keywords:**
> `powershell.file.script_block_text:"sekurlsa"`

---

### Checking a File Hash Across All Hosts
Determine if a malicious binary has spread to multiple machines.

> [!INFO]- Hash Hunt Query:
> Add column: `host.hostname`
>
> `process.hash.sha256:<full-sha256-hash>`
>
> If you see multiple hostnames in the results, the file has spread — this changes the incident scope significantly.

---

### PowerShell Script Block Analysis
PowerShell logs script block content when script block logging is enabled — invaluable for spotting encoded commands, downloaders, and post-exploitation tools.

> [!INFO]- PowerShell Analysis:
> `powershell.file.script_block_text:<keyword>`
>
> Useful keywords to hunt for:
> | Keyword | What it Indicates |
> |---------|------------------|
> | `DownloadString` | In-memory payload download |
> | `DownloadFile` | File download to disk |
> | `-EncodedCommand` | Obfuscated PowerShell execution |
> | `Invoke-Expression` (or `IEX`) | Executing code from a string — strong IOC |
> | `Invoke-Mimikatz` | Credential dumping |
> | `sekurlsa` | Mimikatz module for credential extraction |
> | `Register-ScheduledTask` | Persistence via scheduled task |

---

### Building Dashboard Visualizations
Dashboards in Kibana are containers for multiple visualizations — they provide at-a-glance views for SOC analysts during triage. Below are four common security dashboard visualizations built using the Kibana Lens interface.

**General setup steps (apply to all visualizations below):**
1. Hamburger menu → **Dashboard** → **Create new dashboard** → **Create visualization**
2. Set the time range wide (e.g., 15 years) before filtering
3. Select the correct index pattern from the index dropdown (e.g., `windows*`)
4. Select visualization type from the dropdown above the main section (Table is common for security views)
5. Click **Save and return** when done; save the dashboard with its time range pinned

> [!INFO]- Failed Logon Attempts (All Users) — Event Code 4625:
> Tracks all failed Windows logon attempts ranked by user and machine.
>
> 1. Filter: `event.code is 4625`
> 2. Verify `user.name.keyword` exists in the index via the left sidebar search
> 3. Configure rows and metrics in Lens:
>    - Row: `user.name.keyword` (1000 values) → Display Name: **Username**
>    - Metric: Count → Display Name: **# of Logins**
>    - Row: `host.hostname.keyword` → Display Name: **Event logged by**
>    - Row: `winlog.logon.type.keyword` → Display Name: **Logon Type**
> 4. Click **# of Logins** column header → Sort descending
> 5. Add exclusion filters for known noise accounts: `user.name.keyword is not <noise-account>`
> 6. Add KQL to the top search bar to exclude computer accounts and scope to Security log:
>    `NOT user.name: *$ AND winlog.channel.keyword: Security`
>    - `NOT user.name: *$` — excludes computer accounts, which end in `$`
>    - `winlog.channel.keyword: Security` — restricts to the Security event log only

> [!INFO]- Failed Logon Attempts (Disabled Accounts) — Event Code 4625 + SubStatus 0xC0000072:
> Same as the failed logon visualization above but filtered to accounts that failed specifically because they are disabled.
>
> Follow the Failed Logon Attempts setup, then add one additional filter:
> `winlog.event_data.SubStatus: 0xC0000072`
>
> SubStatus `0xC0000072` is the Windows status code indicating the account is currently disabled.

> [!INFO]- Successful RDP Logon by Service Accounts — Event Code 4624:
> Monitors successful remote desktop logons by service accounts, which should rarely initiate RDP sessions interactively.
>
> 1. Filter: `event.code is 4624` (successful logon)
> 2. Filter: `winlog.logon.type is RemoteInteractive` (Logon Type 10 = RDP)
> 3. KQL: `user.name: svc-*` (adjust the prefix to match your service account naming convention)
> 4. Add row: `related.ip.keyword` — shows the source IP initiating the RDP connection

> [!INFO]- Local Group Membership Changes — Event Codes 4732 / 4733:
> Tracks users added to or removed from security-enabled local groups such as Administrators.
> - **4732** — Member added to a security-enabled local group
> - **4733** — Member removed from a security-enabled local group
>
> 1. Filter: `event.code is one of 4732, 4733`
> 2. Filter: `group.name is administrators`
> 3. Configure rows:
>    - `winlog.event_data.MemberSid.keyword` — which user was changed
>    - `group.name.keyword` — which group was affected
>    - `event.action.keyword` — whether they were added or removed
>    - `host.name.keyword` — which host reported the event
> 4. For time-boxed views, customize the time range per visualization using an absolute date range (e.g., Jan 1–Jan 31) rather than a relative range — Elasticsearch uses bucket aggregation intervals for relative ranges which may miss events

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
- [[Threat Hunting]]

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
