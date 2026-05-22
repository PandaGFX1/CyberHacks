Tags: #Status/In-Progress #Type/Tool #Context/Windows #Context/Blueteam

---
## Overview
Windows Defender Firewall is the built-in firewall solution in Windows operating systems. It provides basic functionality for allowing or denying specific programs and supports customized inbound and outbound rules. Automatically applies firewall profiles based on the detected network type via Network Location Awareness (NLA).

---
## Target / Context
Windows systems requiring host-based firewall configuration. Applies different rule sets based on network profile — Domain, Private, or Public.

---
## Installation

> [!INFO]- Installation Commands:
> Built into Windows — no installation required
> Open via: `wf.msc`
> Or: Control Panel -> Windows Defender Firewall

---
## Basic Usage

> [!INFO]- Basic Usage:
> `wf.msc`

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Option | Description |
> |--------|-------------|
> | Inbound Rules | Controls traffic coming into the system |
> | Outbound Rules | Controls traffic leaving the system |
> | Domain Profile | Applied when connected to a domain network |
> | Private Profile | Applied when connected to a trusted home network |
> | Public Profile | Applied when connected to untrusted public networks |

---
## Common Use Cases

### View or Change Network Profile
Windows automatically selects a profile based on NLA. Profiles apply different rule sets.

> [!INFO]- Steps:
> Control Panel -> Windows Defender Firewall
> View current profile: Domain / Private / Public

### Create a Custom Outbound or Inbound Rule

> [!INFO]- Steps:
> 1. Open `wf.msc`
> 2. Click Advanced Settings on the left side
> 3. Click Outbound Rules or Inbound Rules
> 4. Click New Rule
> 5. Select Custom
> 6. Select All Programs
> 7. Select protocol type: TCP
> 8. Keep Local Port as default
> 9. Change Remote Port to Specific Ports
> 10. Specify the ports to block
> 11. In the Scope tab keep defaults
> 12. In the Action tab select Block the connection
> 13. Name and save the rule

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
