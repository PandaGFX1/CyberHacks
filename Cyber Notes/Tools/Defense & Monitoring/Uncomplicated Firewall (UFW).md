Tags: #Status/In-Progress #Type/Tool #Context/Linux #Context/Blueteam

---
## Overview
UFW (Uncomplicated Firewall) is a simplified front-end for managing Linux firewall rules. Built on top of iptables and Netfilter, it abstracts complex rule syntax into straightforward commands — trading granular control for ease of use. Ideal for quick firewall configuration on Linux servers and desktops.

---
## Target / Context
Linux systems requiring firewall configuration. Sits in a hierarchy of Linux firewall tools — from most complex to simplest: Netfilter → iptables → UFW → Pre-defined rules.

---
## Installation

> [!INFO]- Installation Commands:
> `sudo apt install ufw`

---
## Basic Usage

> [!INFO]- Basic Usage:
> `sudo ufw status`
> `sudo ufw enable`
> `sudo ufw disable`

---

## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `status` | Check current firewall status | `sudo ufw status` |
> | `status numbered` | Show all active rules with index numbers | `sudo ufw status numbered` |
> | `enable` | Enable the firewall | `sudo ufw enable` |
> | `disable` | Disable the firewall | `sudo ufw disable` |
> | `allow` | Allow traffic on a port or service | `sudo ufw allow 80/tcp` |
> | `deny` | Deny traffic on a port or service | `sudo ufw deny 22/tcp` |
> | `delete` | Delete a rule by index number | `sudo ufw delete 2` |
> | `default` | Set default policy for traffic direction | `sudo ufw default allow outgoing` |

---
## Common Use Cases

### Check Firewall Status

> [!INFO]- Commands:
> `sudo ufw status`
> `sudo ufw status numbered`

### Allow or Deny Traffic

> [!INFO]- Commands:
> `sudo ufw allow 80/tcp`
> `sudo ufw deny 22/tcp`
> `sudo ufw default allow outgoing`
> `sudo ufw default deny incoming`

### Manage Existing Rules

> [!INFO]- Commands:
> `sudo ufw status numbered`
> `sudo ufw delete 2`

---
## Related Concepts
- [[Firewalls]]
- [[Ports]]
- [[Protocols]]

## Related Techniques
-

## Related Playbooks
-

---
## References / Images
-
