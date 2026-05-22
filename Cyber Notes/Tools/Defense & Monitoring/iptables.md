Tags: #Status/In-Progress #Type/Tool #Context/Linux #Context/Blueteam #publish-me

---
## Overview
iptables is the primary userspace utility for configuring the Netfilter packet filtering framework built into the Linux kernel. It controls incoming, outgoing, and forwarded network traffic using a system of tables, chains, rules, targets, and matches. Introduced in Linux 2.4 (2000) as a replacement for ipchains and ipfwadm, it remains widely used despite newer alternatives like nftables.

## Target / Context
Linux host-based firewall configuration — traffic filtering, NAT, packet manipulation, and logging. Sits directly on top of the Netfilter kernel framework. UFW and FirewallD are front-ends that abstract iptables complexity.

---
## Installation

> [!INFO]- Installation Commands:
> Pre-installed on most Linux distributions.
> Install if missing: `sudo apt install iptables -y`
> Persist rules across reboots: `sudo apt install iptables-persistent -y`

---
## Basic Usage

> [!INFO]- Basic Usage:
> `sudo iptables -L` — list all current rules
> `sudo iptables -L -v -n` — verbose listing with packet counts and no DNS resolution
> `sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT` — append rule to INPUT chain
> `sudo iptables -D INPUT 1` — delete rule number 1 from INPUT chain
> `sudo iptables -F` — flush (clear) all rules in all chains

---
## Flags & Options

> [!INFO]- Common Flags:
> | Flag | Description |
> |------|-------------|
> | `-A <chain>` | Append a rule to a chain |
> | `-I <chain> [num]` | Insert a rule at a specific position |
> | `-D <chain> <num>` | Delete a rule by number |
> | `-F [chain]` | Flush all rules from a chain (or all chains) |
> | `-L [chain]` | List rules |
> | `-t <table>` | Specify table (default: filter) |
> | `-j <target>` | Jump to a target action |
> | `-p <protocol>` | Match protocol (tcp, udp, icmp) |
> | `-s <ip>` | Match source IP |
> | `-d <ip>` | Match destination IP |
> | `--dport <port>` | Match destination port |
> | `--sport <port>` | Match source port |
> | `-v` | Verbose output |
> | `-n` | Numeric output — no DNS resolution |

---
## Common Use Cases

### Tables
Tables organize rules by function. Specify with `-t <table>`.

> [!INFO]- Tables Reference:
> | Table | Purpose | Built-in Chains |
> |-------|---------|-----------------|
> | `filter` | Filter traffic by IP, port, protocol — default table | INPUT, OUTPUT, FORWARD |
> | `nat` | Modify source/destination IP addresses | PREROUTING, POSTROUTING |
> | `mangle` | Modify packet header fields | PREROUTING, OUTPUT, INPUT, FORWARD, POSTROUTING |
> | `raw` | Configure special packet processing | PREROUTING, OUTPUT |

### Chains
Chains define where in the packet flow rules are evaluated.

> [!INFO]- Chains Reference:
> | Chain | Description |
> |-------|-------------|
> | INPUT | Packets destined for the local machine |
> | OUTPUT | Packets originating from the local machine |
> | FORWARD | Packets routed through the machine from one interface to another |
> | PREROUTING | Modify destination IP before routing table processes incoming packets |
> | POSTROUTING | Modify source IP after routing table processes outgoing packets |
>
> User-defined chains can group rules for cleaner management and can be added to any table.

### Targets
Targets define the action taken when a rule matches. Specified with `-j <target>`.

> [!INFO]- Targets Reference:
> | Target | Description |
> |--------|-------------|
> | ACCEPT | Allow packet through |
> | DROP | Silently discard packet |
> | REJECT | Discard packet and send ICMP error to source |
> | LOG | Log packet info to syslog — does not stop processing |
> | SNAT | Modify source IP (used for private-to-public NAT) |
> | DNAT | Modify destination IP (used for port forwarding) |
> | MASQUERADE | Like SNAT but for dynamic/changing source IPs |
> | REDIRECT | Redirect packet to another port or IP |
> | MARK | Tag packet with a Netfilter mark for routing or further processing |

### Matches
Matches specify criteria that must be met for a rule to apply.

> [!INFO]- Matches Reference:
> | Match | Description |
> |-------|-------------|
> | `-p tcp` / `-p udp` | Match by protocol |
> | `--dport <port>` | Match destination port |
> | `--sport <port>` | Match source port |
> | `-s <ip>` | Match source IP address |
> | `-d <ip>` | Match destination IP address |
> | `-m state --state <state>` | Match connection state (NEW, ESTABLISHED, RELATED) |
> | `-m multiport --dports <ports>` | Match multiple ports or ranges |
> | `-m string --string <str>` | Match packets containing a specific string |
> | `-m limit --limit <rate>` | Match at a rate limit |
> | `-m conntrack` | Match based on connection tracking info |
> | `-m mark --mark <val>` | Match based on Netfilter mark value |
> | `-m mac --mac-source <mac>` | Match based on source MAC address |
> | `-m iprange --src-range <range>` | Match based on IP address range |

### Example Rules

> [!INFO]- Commands:
> Allow SSH inbound: `sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT`
> Allow established connections: `sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT`
> Block an IP: `sudo iptables -A INPUT -s 10.10.10.10 -j DROP`
> Allow HTTP and HTTPS: `sudo iptables -A INPUT -p tcp -m multiport --dports 80,443 -j ACCEPT`
> Log and drop everything else: `sudo iptables -A INPUT -j LOG && sudo iptables -A INPUT -j DROP`
> NAT masquerade for outbound traffic: `sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE`

---
## Related Concepts
- [[Linux Hardening]]
- [[Firewalls]]
- [[Linux Networking]]

## Related Techniques
-

## Related Playbooks
-

---
## References / Images
- `man iptables`
- `man iptables-extensions`
