Tags: #Status/In-Progress #Type/Knowledge #Context/Network #publish-me

---
## Overview
Oracle TNS (Transparent Network Substrate) is Oracle's proprietary communication protocol for connecting Oracle Database clients to server instances over a network. It supports TCP/IP, UDP, IPv6, and SSL/TLS and is the default listener protocol on TCP/1521. Oracle TNS is common in enterprise healthcare, finance, and retail environments. Misconfigurations in `tnsnames.ora` and weak default credentials (especially the `dbsnmp` account) make Oracle databases attractive targets during external and internal assessments.

---

## Terminology
| Term | Definition |
|------|------------|
| TNS | Transparent Network Substrate — Oracle's proprietary database network protocol |
| Oracle Net Services | Suite that includes TNS; manages name resolution, load balancing, and security |
| tnsnames.ora | Client-side config file listing service names, hosts, ports, and connection details |
| listener.ora | Server-side config defining the listener process that receives incoming TNS connections |
| SID | System Identifier — unique identifier for an Oracle database instance |
| Service Name | Alternative to SID; identifies the database globally; preferred in modern Oracle |
| ODAT | Oracle Database Attacking Tool — open-source tool for enumerating and exploiting Oracle databases |
| SQLplus | Oracle command-line SQL client for interacting with Oracle databases |
| sysdba | System DBA role — highest privilege level in Oracle; equivalent to root access |
| PL/SQL Exclusion List | Blacklist of PL/SQL packages/types blocked from execution via Oracle Application Server |
| DBSNMP | Default Oracle monitoring account; default password: `dbsnmp` |

---
## Core Concepts

### Protocol Overview
Oracle TNS was introduced with Oracle Net Services and supports:
- TCP/IP (most common), UDP, IPX/SPX, AppleTalk
- Built-in encryption via Oracle Net Services (client-server layer over TCP/IP)
- Listener on **TCP/1521** by default
- IPv6 and SSL/TLS in modern versions

The listener receives incoming connection requests and forwards them to the appropriate database instance. Connection details (service name, host, port) are stored in `tnsnames.ora` on the client.

Remotely manageable only in older versions (Oracle 8i/9i); not in 10g/11g.

---

### Configuration Files
Located in `$ORACLE_HOME/network/admin/`:

| File | Side | Purpose |
|------|------|---------|
| `tnsnames.ora` | Client | Maps service names to connection descriptors (host, port, SID/service name) |
| `listener.ora` | Server | Defines listener process parameters — ports, protocols, SID list |

**Key tnsnames.ora settings:**
| Parameter | Description |
|-----------|-------------|
| `DESCRIPTION` | Descriptor providing a name for the database and connection type |
| `ADDRESS` | Host and port for network communication |
| `USER` | Username for connection (when included) |
| `PASSWORD` | Password for connection (when included) |
| `PROTOCOL` | Network protocol used (TCP, TCPS, etc.) |
| `SID` or `SERVICE_NAME` | Target database instance identifier |
| `CONNECT_TIMEOUT` | Connection timeout in seconds |
| `FAILOVER` | Whether to try other addresses on failure |

---

### Default Credentials
| Account | Default Password | Notes |
|---------|-----------------|-------|
| `sys` | `change_on_install` (Oracle 9) | No default in Oracle 10+ |
| `system` | `manager` (Oracle 9) | No default in Oracle 10+ |
| `dbsnmp` | `dbsnmp` | Oracle monitoring account; often not changed |
| `scott` | `tiger` | Classic demo/test account; often present in labs |

---

### Dangerous Settings
| Setting | Risk |
|---------|------|
| Default credentials not changed | `dbsnmp`, `scott/tiger` widely known |
| `listener.ora` no password | Listener can be administered without authentication |
| Writable PL/SQL Exclusion List directory | Blacklist can be modified to enable restricted packages |
| Webshell upload to web root | If web server runs on same host, ODAT can upload shells |

---

### Footprinting Oracle TNS

Scan port 1521 with [[Nmap]] (`-sV --open`). The `oracle-sid-brute` NSE script brute-forces valid SID names from a wordlist. See [[Nmap]] for full script reference.

Perform a full enumeration scan (SIDs, versions, users, vulnerabilities) with [[ODAT]].

---

### Connecting with SQLplus

Connect using the `sqlplus <user>/<password>@<target>/<service-name>` syntax. Append `as sysdba` if the account holds the sysdba privilege. See [[SQLplus]] for installation and full connection syntax.

**Common queries:**
| Query | Purpose |
|-------|---------|
| `select table_name from all_tables;` | List all accessible tables |
| `select * from user_role_privs;` | Show current user's roles and privileges |
| `select name, password from sys.user$;` | Retrieve password hashes for offline cracking (requires sysdba) |

For installation steps and library dependency fixes, see [[SQLplus]].

---

### Webshell Upload via ODAT
If a web server runs on the same host, the `utlfile` module in [[ODAT]] can write files directly to the web root (`/var/www/html` on Linux, `C:\inetpub\wwwroot` on Windows). See [[ODAT]] for the full webshell upload workflow.

---

## Related Concepts
- [[SQL Fundamentals]]
- [[Protocols]]
- [[Ports]]
- [[Footprinting & Enumeration]]

## Related Techniques
- [[Service Enumeration]]

## Related Tools
- [[ODAT]]
- [[SQLplus]]
- [[Nmap]]

---
## References / Images
- `man sqlplus`
- https://docs.oracle.com/cd/E11882_01/server.112/e41085/sqlqraa001.htm#SQLQR985
- https://www.geeksforgeeks.org/how-to-install-sqlplus-on-linux/
