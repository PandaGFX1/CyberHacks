Tags: #Status/Reference #Type/Playbook #Context/Linux #Context/Blueteam #publish-me

---
## Objective
Systematically investigate a Linux system to gather evidence of compromise, identify persistence mechanisms, and reconstruct attacker activity during a forensic investigation.

---
## Prerequisites
- Access to the target Linux system (live or image)
- Root or sudo privileges for full access
- Note which commands are live-analysis only — avoid on forensic images

---
## Phase 1 — System & OS Information
Establish baseline information about the system before investigating further.

### Common Commands

> [!INFO]- Commands:
> `cat /etc/os-release`
> `cat /etc/passwd`
> `cat /etc/group`
> `sudo cat /etc/sudoers`
> `last`
> `cat /var/log/auth.log`
> `grep -i "COMMAND" /var/log/auth.log`

### Tools
- [[Volatility 3]]

---
## Phase 2 — System Configuration
Review network configuration, running processes, and DNS settings.

### Common Commands

> [!INFO]- Commands:
> `cat /etc/hostname`
> `cat /etc/timezone`
> `cat /etc/network/interfaces`
> `ip address show`
> `netstat -natp`
> `ps aux`
> `cat /etc/hosts`
> `cat /etc/resolv.conf`
>
> Note: `ip address show`, `netstat -natp`, and `ps aux` are live analysis only — do not run on forensic images

### Tools
-

---
## Phase 3 — Persistence Mechanisms
Identify how an attacker may have established persistence on the system.

### Common Commands

> [!INFO]- Commands:
> `cat /etc/crontab`
> `ls /etc/init.d/`
> `cat /home/<user>/.bashrc`
> `cat /etc/bash.bashrc`
> `cat /etc/profile`

### Tools
-

---
## Phase 4 — Evidence of Execution
Reconstruct what commands and programs were executed on the system.

### Common Commands

> [!INFO]- Commands:
> `grep -i COMMAND /var/log/auth.log*`
> `cat /home/<user>/.bash_history`
> `cat /home/<user>/.viminfo`

### Tools
-

---
## Phase 5 — Log Files
Review system, authentication, and application logs for suspicious activity.

### Common Commands

> [!INFO]- Commands:
> `cat /var/log/syslog`
> `grep -i "<search term>" /var/log/syslog`
> `cat /var/log/auth.log`
> `grep -i "<search term>" /var/log/auth.log`
> `ls /var/log/`

### Tools
-

---
## Related Knowledge
- [[Digital Forensics Fundamentals]]
- [[Linux Fundamentals]]

## Related Techniques
-

## Related Playbooks
-

## Related Tools
- [[Volatility 3]]
- [[Autopsy]]

---
## References / Images
- https://tryhackme.com/room/linuxforensics
