Tags: #Status/In-Progress #Type/Knowledge #Context/Network #publish-me

---
## Overview
MySQL is an open-source relational database management system (RDBMS) developed by Oracle, using SQL to manage and query data. It operates on a client-server model and is commonly deployed in LAMP/LEMP web stacks (Linux, Apache/Nginx, MySQL, PHP). MySQL stores databases on disk (typically with `.sql` extension) and listens on TCP/3306 by default. During penetration tests, misconfigured MySQL instances may expose credentials in config files, allow external connections, or be accessible with default or empty credentials.

---

## Terminology
| Term | Definition |
|------|------------|
| MySQL | Open-source RDBMS by Oracle; uses SQL; default port TCP/3306 |
| MariaDB | Community fork of MySQL; often used interchangeably; maintained after Oracle acquisition |
| LAMP | Linux, Apache, MySQL, PHP — common web stack |
| LEMP | Linux, Nginx, MySQL, PHP — Nginx variant of LAMP |
| Schema | A named collection of tables and objects within a database |
| system schema (sys) | Internal MySQL schema containing system metadata used for management |
| information_schema | ANSI/ISO standard metadata schema; contains data about other databases and tables |
| One-Way Encryption | Hashing passwords in PHP before storing in MySQL — common in web applications |
| mysqld.cnf | MySQL server configuration file |

---
## Core Concepts

### Protocol Overview
MySQL operates on a client-server model. Clients issue SQL queries; the server processes them and returns results or error messages. Multiple clients can query simultaneously. MySQL can be accessed from the local network or the internet depending on configuration.

Error responses from MySQL often contain useful information during penetration tests — they confirm how the application is interacting with the database and can reveal SQL injection opportunities.

MySQL is typically combined with PHP and Apache/Nginx for dynamic websites where the database holds all content PHP scripts reference at runtime.

---

### Default Configuration
Config file: `/etc/mysql/mysql.conf.d/mysqld.cnf`

Key settings:
| Setting | Description |
|---------|-------------|
| `bind-address` | IP the MySQL server listens on; `127.0.0.1` = localhost only; `0.0.0.0` = all interfaces |
| `skip-networking` | Disable TCP/IP connections entirely — local socket only |
| `user` | OS user MySQL runs as |
| `datadir` | Directory where databases are stored |
| `port` | Default 3306 |

---

### Dangerous Settings
| Setting | Risk |
|---------|------|
| `user = root` | MySQL process runs as OS root — exploitation can lead to full system compromise |
| `password` in config | Password stored in plaintext in config file |
| `admin_address` exposed | Admin interface accessible on network |
| `debug = 1` | Verbose debug output can reveal internal data to attackers |
| `sql_warnings = 1` | Single-row INSERT warnings exposed — leaks internal structure |
| `secure_file_priv = ""` | No restriction on file import/export — can read/write arbitrary files on the server |
| `bind-address = 0.0.0.0` | MySQL accessible from any network interface — not just localhost |

---

### Important Databases
| Database | Purpose |
|---------|---------|
| `sys` (system schema) | Tables, metadata, and information for server management |
| `information_schema` | ANSI/ISO standard metadata schema — data about all other databases |
| `mysql` | Core MySQL system tables (users, privileges, grants) |
| `performance_schema` | Runtime performance data |

---

### Footprinting MySQL

Scan port 3306 with [[Nmap]] using the `mysql*` NSE script suite. Some Nmap MySQL script results can produce false positives — manually verify any findings.

---

### Interaction with MySQL Server

Connect with the `mysql` client (`mysql -u <user> -p -h <target>`). Key MySQL commands once connected:

| Command | Description |
|---------|-------------|
| `show databases;` | List all databases |
| `use <database>;` | Switch to a database |
| `show tables;` | List tables in current database |
| `show columns from <table>;` | Describe table structure |
| `select * from <table>;` | Retrieve all rows |
| `select * from <table> where <column> = "<string>";` | Filtered query |

Query the system schema: `use sys; show tables; select host, unique_users from host_summary;`

Query the information schema: `use information_schema; select table_schema, table_name from tables;`

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
- `man mysql`
- MySQL documentation: https://dev.mysql.com/doc/
