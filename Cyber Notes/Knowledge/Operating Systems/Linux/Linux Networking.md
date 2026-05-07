Tags: #Status/In-Progress #Type/Knowledge #Context/Linux #Context/Network #publish-me

---
## Overview
Linux networking covers interface configuration, access control models, troubleshooting tools, and remote access protocols. As a pentester, understanding how to configure interfaces, analyze traffic, and leverage remote desktop protocols is essential for both assessment work and setting up testing environments.

---
## Terminology
| Term | Definition |
|------|------------|
| NAC | Network Access Control — enforces security policies on devices before granting network access |
| DAC | Discretionary Access Control — resource owner sets who can access it |
| MAC | Mandatory Access Control — OS enforces access based on security labels; owner cannot override |
| RBAC | Role-Based Access Control — permissions assigned based on organizational roles |
| SELinux | Security-Enhanced Linux — MAC system integrated into the kernel |
| AppArmor | MAC system using application profiles; simpler than SELinux |
| NFS | Network File System — protocol for mounting and managing remote file systems |
| VPN | Virtual Private Network — encrypted tunnel between client and server |
| RDP | Remote Desktop Protocol — primarily Windows; provides full graphical remote access |
| VNC | Virtual Network Computing — cross-platform graphical remote desktop |
| X11 | X Window System — protocol for rendering GUI applications on a remote display |
| XDMCP | X Display Manager Control Protocol — manages remote X sessions over UDP/177 |

---
## Core Concepts

### Network Interface Configuration
Network interfaces can be configured interactively or persistently. `ifconfig` is deprecated on modern systems — `ip` is the replacement.

| Command | Description |
|---------|-------------|
| `ip addr` | Show all network interfaces and IP addresses |
| `ifconfig` | Legacy; view or assign interface addresses |
| `sudo ifconfig eth0 up` | Bring an interface up |
| `sudo ip link set eth0 up` | Bring an interface up (modern) |
| `sudo ifconfig eth0 192.168.1.2` | Assign an IP address |
| `sudo ifconfig eth0 netmask 255.255.255.0` | Assign a netmask |
| `sudo route add default gw 192.168.1.1 eth0` | Add a default gateway |

#### Persistent Configuration
Edit `/etc/network/interfaces` to make changes survive a reboot:
```
auto eth0
iface eth0 inet static
  address 192.168.1.2
  netmask 255.255.255.0
  gateway 192.168.1.1
  dns-nameservers 8.8.8.8 8.8.4.4
```
Apply: `sudo systemctl restart networking`

#### DNS Configuration
Edit `/etc/resolv.conf` to set DNS servers:
```
nameserver 8.8.8.8
nameserver 8.8.4.4
```

---

### Network Access Control (NAC)
NAC ensures only authorized and compliant devices are granted network access. Three primary models:

| Model | Description |
|-------|-------------|
| DAC (Discretionary) | Resource owner defines who can access their resources |
| MAC (Mandatory) | OS enforces access based on security labels — owner cannot override; used in government, military, healthcare, and finance |
| RBAC (Role-Based) | Permissions assigned by role — easier to manage at scale |

NAC enforcement tools in Linux:
- **SELinux** — fine-grained MAC integrated into the kernel; defines permissions per process and file; complex to configure
- **AppArmor** — MAC using application profiles; simpler than SELinux; implemented as a Linux Security Module (LSM)
- **TCP Wrappers** — restrict access to services based on source IP address (see [[Linux Hardening]])

---

### Network Troubleshooting
| Tool | Description |
|------|-------------|
| `ping <host>` | Test connectivity using ICMP packets |
| `traceroute <host>` | Trace the route packets take to a destination; `* * *` indicates a device not responding to ICMP |
| `netstat -a` | Display active network connections and listening ports |
| `ss` | Modern socket statistics tool — `netstat` replacement |
| `tcpdump` | Capture and analyze network traffic — see [[TCPDump]] |
| `wireshark` | GUI packet analysis — see [[Wireshark]] |
| `nmap` | Port scanning and service enumeration — see [[Nmap]] |

---

### Network Services

#### SSH (Secure Shell)
SSH provides encrypted remote access, command execution, and file transfer. It operates on a client-server model — the server runs `sshd`, clients connect with `ssh`. Uses **TCP/22**.

| Task | Command |
|------|---------|
| Install | `sudo apt install openssh-server -y` |
| Status | `systemctl status ssh` |
| Connect | `ssh <username>@<ip>` |
| Connect with X11 forwarding | `ssh -X <username>@<ip>` |
| Config file | `/etc/ssh/sshd_config` |

#### SSH Versions
| Version | Notes |
|---------|-------|
| SSH-1 | Vulnerable to MITM attacks — deprecated |
| SSH-2 | Current standard — stronger encryption, stability, and security |

#### Authentication Methods
| Method | Description |
|--------|-------------|
| Password | Username + password; susceptible to brute-force |
| Public-Key | Client presents public key; server challenges with it; client decrypts with private key — passphrase protects the private key locally |
| Host-Based | Authentication based on the client hostname |
| Keyboard-Interactive | Prompt/response mechanism (used for 2FA) |
| Challenge-Response | Server issues a challenge; client responds using a shared secret |
| GSSAPI | Kerberos-based authentication for domain environments |

#### Dangerous Settings (`/etc/ssh/sshd_config`)
| Setting | Risk |
|---------|------|
| `PasswordAuthentication yes` | Allows brute-force of known usernames |
| `PermitEmptyPasswords yes` | Users with no password can log in |
| `PermitRootLogin yes` | Direct root login over SSH |
| `Protocol 1` | Uses deprecated, vulnerable SSH-1 |
| `X11Forwarding yes` | Can be exploited (OpenSSH 7.2p1 command injection CVE) |
| `AllowTcpForwarding yes` | Enables port forwarding — potential tunnel abuse |
| `PermitTunnel yes` | Enables tun device tunneling |
| `DebianBanner yes` | Exposes OS version in banner |

**Footprinting SSH:**

Fingerprint the SSH server's ciphers and algorithms with ssh-audit (github.com/jtesta/ssh-audit). Initiate a verbose connection (`ssh -v <user>@<target>`) to observe the banner and offered authentication methods.

#### Reading SSH Banners
| Banner | Meaning |
|--------|---------|
| `SSH-1.99-OpenSSH_3.9p1` | Accepts both SSH-1 and SSH-2 |
| `SSH-2.0-OpenSSH_8.2p1` | SSH-2 only |

#### NFS (Network File System)
NFS allows remote file systems to be mounted and used as if they were local. Useful for file sharing across servers and replicating file systems.

| Task | Command |
|------|---------|
| Install | `sudo apt install nfs-kernel-server -y` |
| Status | `systemctl status nfs-kernel-server` |
| Config | `/etc/exports` |

`/etc/exports` specifies shared directories and access rights. Key options:

| Option | Description |
|--------|-------------|
| `rw` | Read and write access |
| `ro` | Read-only access |
| `no_root_squash` | Root on client retains root privileges on share |
| `root_squash` | Root on client is treated as a normal user |
| `sync` | Data written only after committed to disk |
| `async` | Faster writes but potential inconsistency on crash |

Create and mount an NFS share:
```
echo '/home/user/nfs_share hostname(rw,sync,no_root_squash)' >> /etc/exports
mkdir ~/target_nfs
mount <target-ip>:/path/to/share ~/target_nfs
```

#### OpenVPN
VPNs create an encrypted tunnel between client and a network. Commonly used to access internal networks remotely; pentesters use them to connect to lab environments.

| Task | Command |
|------|---------|
| Install | `sudo apt install openvpn -y` |
| Config | `/etc/openvpn/server.conf` |
| Connect | `sudo openvpn --config internal.ovpn` |

The server generates the `.ovpn` file. `server.conf` controls encryption, tunneling, and traffic shaping.

#### Web Servers
Web servers deliver data over HTTP/HTTPS. Pentesters use them for file transfers, phishing page hosting, and receiving reverse shell callbacks.

| Server | Install | Start | Default Port |
|--------|---------|-------|--------------|
| Apache2 | `sudo apt install apache2 -y` | `sudo systemctl start apache2` | 80 |
| Python3 | `sudo apt install python3 -y` | `python3 -m http.server` | 8000 |
| PHP | (built-in) | `php -S 127.0.0.1:8080` | 8080 |
| Node (http-server) | `npm install http-server` | `http-server -p 8080` | 8080 |

Apache config: `/etc/apache2/apache2.conf` — controls directory access, AllowOverride, and module settings.
Python alternative directory: `python3 -m http.server --directory /path/to/files`

Apache modules: `mod_ssl` (encryption), `mod_proxy` (traffic routing), `mod_rewrite` (URL manipulation), `mod_headers`.

`curl` — transfer files and test web servers from the shell; output goes to STDOUT.
`wget` — download files directly to disk from HTTP/HTTPS/FTP without displaying output.

---

### Remote Desktop Protocols

#### X11 / X Window System
X11 is the standard GUI protocol on UNIX/Linux systems. Unlike RDP and VNC which render graphics on the remote machine and stream them, **X11 renders on the local machine** — reducing remote load and bandwidth. Unencrypted by default; tunnel over SSH to secure.

- Default ports: TCP/6000 (first display `:0`), TCP/6001+ for additional displays
- Enable X11 forwarding: `/etc/ssh/sshd_config` → `X11Forwarding yes`
- Forward a remote app to local display: `ssh -X user@<ip> /usr/bin/firefox`

Security risk: an open X server exposes the display over the network. Tools like `xwd` or `xgrabsc` can capture screenshots of X windows.

#### XDMCP (X Display Manager Control Protocol)
XDMCP manages remote X Window sessions using UDP port 177. It allows a full desktop (KDE, GNOME) to be redirected to a remote client. Considered insecure — vulnerable to man-in-the-middle attacks intercepting communication between the remote computer and the X server.

#### VNC (Virtual Network Computing)
VNC provides cross-platform graphical remote desktop access using the RFB protocol. Generally more secure than XDMCP — requires authentication and supports encryption.

- Default port: TCP/5900 (display `:0`); additional displays use TCP/590X
- Two modes: share the host's physical screen, or create a virtual session for the connecting user

| Tool | Notes |
|------|-------|
| TigerVNC | Lightweight; GNOME connections can be unstable |
| TightVNC | Compression-optimized |
| RealVNC | Strong encryption and security |
| UltraVNC | Strong encryption and security |

**TigerVNC setup on Linux:**
```
sudo apt install xfce4 xfce4-goodies tigervnc-standalone-server -y
vncpasswd
touch ~/.vnc/xstartup ~/.vnc/config
```

`~/.vnc/xstartup` — defines how the VNC session is created; `~/.vnc/config` — sets resolution and DPI.

Start server: `vncserver`
List sessions: `vncserver -list`

**SSH tunnel for encrypted VNC:**
`ssh -L 5901:127.0.0.1:5901 -N -f -l <user> <ip>` — creates a local listener on 5901 forwarded through SSH
Connect through tunnel: `xtightvncviewer localhost:5901`

#### RDP (Remote Desktop Protocol)
RDP is Microsoft's remote desktop protocol — primarily used on Windows but accessible from Linux using clients like `xfreerdp` or `remmina`. Provides full graphical desktop interaction. See [[Windows Remote Management]] for footprinting and exploitation context.

---

### R-Services (Berkeley Remote Services)
R-Services are a legacy suite of Unix remote access tools that predate SSH. They transmit in cleartext and have no encryption — largely replaced by SSH. Still found on older commercial Unix systems (Solaris, HP-UX, AIX) and occasionally misconfigured on Linux.

R-Services span **TCP/512, 513, 514** and rely on trust files (`/etc/hosts.equiv` and `~/.rhosts`) for authentication bypass.

| Command | Daemon | Port | Description |
|---------|--------|------|-------------|
| `rcp` | `rshd` | 514/TCP | Remote copy — no overwrite warnings |
| `rexec` | `rexecd` | 512/TCP | Remote shell command execution via plaintext credentials |
| `rlogin` | `rlogind` | 513/TCP | Remote login to Unix hosts; overridden by trust files |
| `rsh` | `rshd` | 514/TCP | Remote shell without login; relies on trust files only |
| `rwho` | `rwhod` | — | Broadcast info about logged-in users |
| `rusers` | — | — | Detailed list of logged-in users over network |

**Trust file format (`/etc/hosts.equiv` — global; `~/.rhosts` — per user):**
```
htb-student       10.0.17.5     # specific user from specific host
+                 10.0.17.10    # any user from this host
+                 +             # any user from any host — fully open
```
`+` is a wildcard meaning "anything." `+ +` in `.rhosts` allows login from any host as any user.

**Footprinting:** Scan TCP ports 512, 513, and 514 with [[Nmap]] (`-sV`).

**Exploiting trust relationships:**
`rlogin 10.0.17.2 -l htb-student` — attempt login if .rhosts permits it

**Enumerate authenticated users:**
`rwho` — broadcasts who is logged in; useful for username collection
`rusers -al 10.0.17.5` — detailed logged-in users including idle time

---
## Related Concepts
- [[Linux Fundamentals]]
- [[Linux Hardening]]
- [[Networking Fundamentals]]
- [[Protocols]]
- [[Firewalls]]
- [[VPN Basics]]
- [[Windows Fundamentals]]
- [[NFS]]
- [[Footprinting & Enumeration]]

## Related Techniques
-

## Related Tools
- [[Nmap]]
- [[Wireshark]]
- [[TCPDump]]
- [[Rsync]]
- [[xfreerdp]]

---
## References / Images
- OpenSSH documentation
- NFS exports man page
- TigerVNC documentation
