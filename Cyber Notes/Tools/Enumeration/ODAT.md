Tags: #Status/In-Progress #Type/Tool #Context/Redteam #publish-me

---
## Overview
ODAT (Oracle Database Attacking Tool) is an open-source Python tool for enumerating and exploiting Oracle Database servers. It identifies valid SIDs/service names, tests credential combinations, checks for known vulnerabilities (SQL injection, remote code execution, privilege escalation), and can perform actions such as uploading files to the server when proper access is established. ODAT is the primary pentesting tool for Oracle TNS enumeration.

## Target / Context
Oracle Database servers exposing TNS listener on TCP/1521. Most effective when SID/service names are unknown and credentials need to be bruteforced or discovered.

---
## Installation

> [!INFO]- Installation Commands:
> Option 1 — apt:
> `sudo apt install odat`
>
> Option 2 — manual build with dependencies:
> ```bash
> sudo apt-get update
> sudo apt-get install -y build-essential python3-dev libaio1
> cd ~
> wget https://files.pythonhosted.org/packages/source/c/cx_Oracle/cx_Oracle-8.3.0.tar.gz
> tar xzf cx_Oracle-8.3.0.tar.gz
> cd cx_Oracle-8.3.0
> python3 setup.py build
> sudo python3 setup.py install
> cd ~
> git clone https://github.com/quentinhardy/odat.git
> cd odat/
> pip install python-libnmap
> git submodule init && git submodule update
> sudo apt-get install python3-scapy -y
> sudo pip3 install colorlog termcolor passlib python-libnmap pycryptodome openpyxl
> sudo apt-get install build-essential libgmp-dev -y
> ```

---
## Basic Usage

> [!INFO]- Basic Usage:
> Show help:
> `./odat.py -h`
>
> Run all modules against a target:
> `./odat.py all -s <target>`

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-s` | Target IP address | `-s 10.129.204.235` |
> | `-p` | Target port (default 1521) | `-p 1521` |
> | `-d` | Database SID or service name | `-d XE` |
> | `-U` | Username | `-U scott` |
> | `-P` | Password | `-P tiger` |
> | `--sysdba` | Connect as SYSDBA | `--sysdba` |
> | `all` | Run all enumeration and attack modules | `./odat.py all -s <IP>` |
> | `sidguesser` | Brute-force valid SIDs | `./odat.py sidguesser -s <IP>` |
> | `passwordguesser` | Brute-force credentials for a known SID | `./odat.py passwordguesser -s <IP> -d XE` |
> | `utlfile` | Upload/download files using UTL_FILE | `./odat.py utlfile ...` |
> | `dbmsxslprocessor` | Upload files using DBMS_XSLPROCESSOR | |
> | `externaltable` | Read files via external tables | |
> | `tde` | Transparent Data Encryption checks | |

---
## Common Use Cases

### Full Reconnaissance Scan

> [!INFO]- Commands:
> `./odat.py all -s 10.129.204.235`
> Returns: database version, running processes, user accounts, vulnerabilities, misconfigurations.

### SID Brute Forcing
When the database SID/service name is unknown, brute-force it:

> [!INFO]- Commands:
> ODAT method:
> `./odat.py sidguesser -s 10.129.204.235`
>
> Nmap method:
> `sudo nmap -p1521 -sV 10.129.204.235 --open --script oracle-sid-brute`
>
> Hydra method:
> `hydra -L /opt/useful/seclists/Discovery/SNMP/common-snmp-community-strings.txt -e nsr -s 1521 -t4 oracle -S <target>`

### File Upload to Web Root (Webshell)
Upload a file to the server's web root if a web server is running on the same host:

> [!INFO]- Commands:
> ```
> # Test with a benign file first
> echo "ODAT Upload Test" > testing.txt
> ./odat.py utlfile -s 10.129.204.235 -d XE -U scott -P tiger \
>   --sysdba --putFile C:\\inetpub\\wwwroot testing.txt ./testing.txt
>
> # Verify the upload succeeded
> curl -X GET http://10.129.204.235/testing.txt
> ```
>
> Linux web root: `/var/www/html`
> Windows web root: `C:\inetpub\wwwroot`
> Always use benign-looking file names to avoid AV/IDS detection.

---
## Related Techniques
- [[Service Enumeration]]

## Related Playbooks
- [[Linux Pentest Playbook]]

---
## References / Images
- https://github.com/quentinhardy/odat
- Oracle TNS: [[Oracle TNS]]
