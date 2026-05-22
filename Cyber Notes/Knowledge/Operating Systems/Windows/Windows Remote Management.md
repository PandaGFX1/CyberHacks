Tags: #Status/In-Progress #Type/Knowledge #Context/Windows #publish-me

---
## Overview
Windows provides three primary remote management protocols: RDP for graphical desktop access, WinRM for command-line and scripting-based management, and WMI for programmatic system configuration and query access. All three are commonly encountered during Windows and Active Directory penetration tests — each provides a different form of remote access and requires different tooling to interact with from Linux.

---

## Terminology
| Term | Definition |
|------|------------|
| RDP | Remote Desktop Protocol — Microsoft's graphical remote desktop; TCP/3389; UDP/3389 for remote admin |
| WinRM | Windows Remote Management — command-line remote management using WS-Management (SOAP); TCP/5985 (HTTP), TCP/5986 (HTTPS) |
| WMI | Windows Management Instrumentation — COM-based interface for reading and writing Windows system settings; TCP/135 init |
| WinRS | Windows Remote Shell — executes arbitrary commands on remote systems; included in WinRM |
| CIM | Common Information Model — standard underlying WMI |
| WBEM | Web-Based Enterprise Management — standard implemented by WMI on Windows |
| WMIC | Windows Management Instrumentation Console — command-line tool for WMI queries (deprecated in Win11) |
| NLA | Network Level Authentication — RDP security feature requiring authentication before session creation |
| evil-winrm | Linux tool for connecting to WinRM; provides an interactive shell |
| xfreerdp | Linux RDP client — see [[xfreerdp]] |
| wmiexec.py | Impacket tool for WMI-based command execution |

---
## Core Concepts

### RDP (Remote Desktop Protocol)
RDP allows full graphical desktop interaction over a network. It operates at the application layer and transmits display output and input commands over an encrypted IP channel.

- Default port: **TCP/3389** (also UDP/3389 for remote administration)
- When behind NAT, requires public IP and port forwarding
- Installed by default on Windows Server; enabled via Server Manager
- Default setting: only connections with **Network Level Authentication (NLA)** allowed

**Security concerns:**
- Many Windows systems still accept weak RDP encryption (RDP Security mode) alongside TLS
- Identity certificates are self-signed by default — clients cannot distinguish a genuine certificate from a forged one
- EDR and threat hunters can identify RDP cookies used by Nmap scans

Scan TCP/3389 with [[Nmap]] (`rdp*` NSE scripts) to fingerprint the service and enumerate security settings. Check for weak encryption and supported security protocols (RDP Security, TLS, NLA) with [[rdp-sec-check]].

Connect from Linux via [[xfreerdp]].

---

### WinRM (Windows Remote Management)
WinRM is the Windows implementation of the WS-Management protocol — a SOAP-based standard for remote management. It is the foundation for PowerShell remoting and remote event log collection.

- Must be explicitly enabled and configured on Windows 10 clients
- Enabled by default starting with Windows Server 2012
- Ports: **TCP/5985** (HTTP), **TCP/5986** (HTTPS)
  - 5985 (HTTP) is almost always used; 5986 (HTTPS) is rarely deployed
- Windows Remote Shell (WinRS) is included in WinRM and allows arbitrary command execution

Scan TCP/5985 and TCP/5986 with [[Nmap]] to confirm WinRM is listening. Connect from Linux using [[evil-winrm]].

---

### WMI (Windows Management Instrumentation)
WMI provides near-universal read/write access to Windows system settings. It is the backbone of many Windows administration tools, and its programmatic access makes it highly valuable for post-exploitation.

- Initializes on **TCP/135** (RPC endpoint mapper); then moves to a random high port
- Access methods: PowerShell (`Get-WmiObject`), VBScript, WMIC console
- WMI consists of multiple programs and a set of repositories called *repositories*
- Commonly used by attackers for persistence, lateral movement, and data collection without writing to disk

Execute WMI commands remotely from Linux using `wmiexec.py` (part of [[Impacket]]). For full `Get-WmiObject` and `Get-CimInstance` query reference, see [[Windows PowerShell]].

---

## Related Concepts
- [[Windows Fundamentals]]
- [[Windows PowerShell]]
- [[Active Directory Basics]]
- [[Footprinting & Enumeration]]

## Related Techniques
- [[Service Enumeration]]

## Related Tools
- [[xfreerdp]]
- [[evil-winrm]]
- [[NetExec]]
- [[Nmap]]
- [[rdp-sec-check]]

---
## References / Images
- Microsoft WinRM documentation
- https://github.com/CiscoCXSecurity/rdp-sec-check
