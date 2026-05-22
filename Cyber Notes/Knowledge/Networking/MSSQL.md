Tags: #Status/In-Progress #Type/Knowledge #Context/Network #publish-me

---
## Overview
MSSQL (Microsoft SQL Server) is Microsoft's enterprise relational database management system. It was originally built for Windows but now runs on Linux and macOS as well. MSSQL is popular in .NET application stacks and Windows domain environments. It defaults to TCP/1433 and authenticates via Windows Authentication (local SAM or Active Directory) or SQL Server Authentication. Impacket's `mssqlclient.py` is the primary pentesting client for remote interaction.

---

## Terminology
| Term | Definition |
|------|------------|
| MSSQL | Microsoft SQL Server — enterprise RDBMS; default port TCP/1433 |
| SSMS | SQL Server Management Studio — GUI admin client for MSSQL; commonly installed on servers |
| T-SQL | Transact-SQL — Microsoft's SQL dialect with procedural extensions; used to interact with MSSQL |
| Windows Authentication | MSSQL auth via local SAM or Active Directory — no separate SQL credentials needed |
| SQL Server Authentication | Separate username/password stored within SQL Server — `sa` account is the default admin |
| sa | System Administrator account in MSSQL — often left enabled with weak or empty password |
| Linked Servers | MSSQL feature allowing one server to query another — can be abused for lateral movement |
| xp_cmdshell | Stored procedure in MSSQL that executes OS commands — disabled by default; powerful if enabled |
| Named Pipes | Alternative connection method to TCP; can be abused for authentication relay |

---
## Core Concepts

### Protocol Overview
MSSQL listens on TCP/1433 by default. Authentication occurs via:
- **Windows Authentication** — client presents Windows credentials; validated against local SAM or an Active Directory domain controller
- **SQL Server Authentication** — standalone `sa` (System Administrator) account and other SQL-local accounts

By default, encryption is not enforced on connections and self-signed certificates are used — both are attackable via certificate spoofing or credential interception.

---

### MSSQL Clients
| Client | Notes |
|--------|-------|
| SSMS | GUI client; commonly installed on the server itself; may have saved credentials |
| mssql-cli | Linux/macOS command-line client |
| SQL Server PowerShell | `Import-Module SQLPS`; built into Windows Server |
| HeidiSQL | Lightweight GUI client |
| Impacket mssqlclient.py | Best option for pentesters — see [[Impacket]] |

`locate mssqlclient` — find Impacket's client on Kali/Parrot.

---

### Default Databases
| Database | Purpose |
|---------|---------|
| `master` | Tracks all system-level information for the SQL Server instance |
| `model` | Template for all newly created databases; changes here propagate to new databases |
| `msdb` | Used by SQL Server Agent for scheduling jobs and alerts |
| `tempdb` | Stores temporary objects and intermediate results |
| `resource` | Read-only; contains system objects included with SQL Server |

---

### Default Configuration
- MSSQL first runs as `NT SERVICE\MSSQLSERVER`
- Windows Authentication enabled by default; encryption not enforced
- Self-signed certificates used by default

---

### Dangerous Settings
| Setting | Risk |
|---------|------|
| No encryption on connections | Credentials transmitted in cleartext |
| Self-signed certificates | Can be spoofed — attacker can intercept credentials |
| Named pipes enabled | Vulnerable to authentication relay attacks |
| `sa` account enabled with weak password | Default admin account often forgotten; credential stuffing target |
| `xp_cmdshell` enabled | Direct OS command execution from SQL queries |

---

### Footprinting MSSQL

Scan port 1433 with [[Nmap]] using the `ms-sql-*` NSE script suite — covers version info, empty passwords, xp_cmdshell status, NTLM info, table enumeration, and hash dumping. See [[Nmap]] for full script reference.

Identify MSSQL instances with the `mssql_ping` auxiliary module in [[MSFConsole]].

---

### Interaction with MSSQL

Connect from Linux using Impacket's mssqlclient.py with Windows authentication — see [[Impacket]].

**Enumerate databases:**
`select name from sys.databases`

**Query data:**
`select * from accounts.dbo.devsacc where name = 'HTB';`

**Check current user:**
`select system_user;`

**Check server version:**
`select @@version;`

---

## Related Concepts
- [[SQL Fundamentals]]
- [[Protocols]]
- [[Ports]]
- [[Footprinting & Enumeration]]

## Related Techniques
- [[SQL Injection]]
- [[Service Enumeration]]

## Related Tools
- [[Nmap]]
- [[SQLMap]]

---
## References / Images
- Microsoft SQL Server documentation
- Impacket GitHub: https://github.com/SecureAuthCorp/impacket
