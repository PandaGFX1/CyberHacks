Tags: #Status/In-Progress #Type/Tool #Context/Redteam #publish-me

---
## Overview
SQLplus (SQLplus) is Oracle's command-line client for connecting to and interacting with Oracle Database instances. During penetration tests it is used to authenticate to Oracle databases (including with `AS SYSDBA` for elevated access), enumerate tables and users, extract password hashes for offline cracking, and verify exploitation paths like webshell uploads.

## Target / Context
Oracle Database instances accessible via TNS listener on TCP/1521. Requires valid credentials (or SYSDBA privileges via an authenticated path from [[ODAT]]).

---
## Installation

> [!INFO]- Installation Commands:
> Option 1 — apt:
> `sudo apt install oracle-instantclient-sqlplus`
>
> Option 2 — manual install script (handles library dependencies):
> ```bash
> wget https://download.oracle.com/otn_software/linux/instantclient/214000/instantclient-basic-linux.x64-21.4.0.0.0dbru.zip
> wget https://download.oracle.com/otn_software/linux/instantclient/214000/instantclient-sqlplus-linux.x64-21.4.0.0.0dbru.zip
> sudo mkdir -p /opt/oracle
> sudo unzip -d /opt/oracle instantclient-basic-linux.x64-21.4.0.0.0dbru.zip
> sudo unzip -d /opt/oracle instantclient-sqlplus-linux.x64-21.4.0.0.0dbru.zip
> export LD_LIBRARY_PATH=/opt/oracle/instantclient_21_4:$LD_LIBRARY_PATH
> export PATH=$LD_LIBRARY_PATH:$PATH
> source ~/.bashrc
> sqlplus -V
> ```
>
> Fix `libsqlplus.so` error:
> `sudo sh -c "echo /usr/lib/oracle/**{VERSION}**/client64/lib > /etc/ld.so.conf.d/oracle-instantclient.conf"; sudo ldconfig`
> Find version: `find / -name sqlplus 2>/dev/null`
>
> Guide: https://www.geeksforgeeks.org/how-to-install-sqlplus-on-linux/

---
## Basic Usage

> [!INFO]- Basic Usage:
> `sqlplus <username>/<password>@<host>/<SID_or_service>`
>
> Standard connection:
> `sqlplus scott/tiger@10.129.204.235/XE`
>
> Connect as SYSDBA:
> `sqlplus scott/tiger@10.129.204.235/XE as sysdba`

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Option | Description | Example |
> |--------|-------------|---------|
> | `as sysdba` | Connect with SYSDBA privileges | `sqlplus user/pass@host/SID as sysdba` |
> | `as sysoper` | Connect with SYSOPER privileges | `sqlplus user/pass@host/SID as sysoper` |
> | `-S` | Silent mode — suppress banners and prompts | `sqlplus -S user/pass@host/SID` |
> | `/nolog` | Start sqlplus without connecting | `sqlplus /nolog` |

---
## Common Use Cases

### Database and Table Enumeration

> [!INFO]- Commands:
> `select table_name from all_tables;` — list all accessible tables
> `select owner, table_name from all_tables order by owner;` — tables by schema
> `select column_name, data_type from all_tab_columns where table_name = 'USERS';`

### Check Current User Privileges

> [!INFO]- Commands:
> `select * from user_role_privs;` — current user's roles and privileges
> `select * from session_privs;` — current session's effective privileges
> `select grantee, privilege from dba_sys_privs where grantee = 'SCOTT';` — requires DBA

### Extract Password Hashes (SYSDBA required)

> [!INFO]- Commands:
> `select name, password from sys.user$;`
> Hashes can be cracked offline using Hashcat or JohnTheRipper.

### Check if SYSDBA Login is Possible
When user has appropriate privileges or the database is misconfigured:

> [!INFO]- Commands:
> `sqlplus scott/tiger@10.129.204.235/XE as sysdba`
> After logging in: `show user;` — should return `USER is "SYS"`

---
## Related Techniques
- [[Service Enumeration]]

## Related Playbooks
- [[Linux Pentest Playbook]]

---
## References / Images
- https://docs.oracle.com/cd/E11882_01/server.112/e41085/sqlqraa001.htm#SQLQR985
- https://www.geeksforgeeks.org/how-to-install-sqlplus-on-linux/
- Oracle TNS context: [[Oracle TNS]]
