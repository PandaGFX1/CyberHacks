Tags: #Status/In-Progress #Type/Knowledge #Context/Windows #publish-me

---
## Overview
Active Directory (AD) is a Microsoft Windows service used to centralize the management of users, computers, groups, and other resources within a domain. It enables secure authentication, authorization, and administration across networked environments. AD is managed via Domain Controllers running AD Domain Services and integrates with Group Policy for configuration enforcement.

---

## Terminology
| Term | Definition |
|------|------------|
| Windows Domain | Group of users and computers managed under centralized administration |
| Domain Controller (DC) | Server that runs AD services and stores all directory data |
| AD DS (Active Directory Domain Services) | Core AD service providing a catalog of all network objects |
| Security Principal | Any entity (user, machine, group) that can be authenticated and assigned permissions |
| OU (Organizational Unit) | Container used to organize users, computers, and groups within AD |
| GPO (Group Policy Object) | Collection of settings applied to OUs for centralized configuration management |
| Trust Relationship | Link allowing users from one domain to access resources in another |
| Forest | Collection of multiple AD trees with separate namespaces |
| Tree | Multiple domains sharing a namespace under a common root |
| Enterprise Admins | Group with privileges across all domains in the enterprise |

---
## Core Concepts

### AD DS Objects

#### Users
- Security principals representing people or services
- Protected against accidental deletion by default
- Delegation allows limited admin tasks (e.g., password resets) to be assigned to other users
- PowerShell can modify attributes and reset passwords

#### Machines
- Security principals representing computers; named as `ComputerName$`
- Machine passwords are automatically rotated
- Local admins by default but access is restricted

#### Security Groups
Collections of users, machines, and other groups for simplified permission management.

| Default Group | Description |
|---------------|-------------|
| Domain Admins | Full control over the entire domain |
| Server Operators | Can manage domain servers |
| Backup Operators | Can bypass file permissions for backup purposes |
| Account Operators | Can manage most user accounts |
| Domain Users | All user accounts in the domain |
| Domain Computers | All workstations and servers in the domain |
| Domain Controllers | All DCs in the domain |

### Organizational Units (OUs)
Containers used to organize AD objects and simplify GPO application and delegation.

[[Assets/Images/Pasted image 20250402211304.png|OUs]]

Default OUs: Builtin, Computers, Domain Controllers, Users, Managed Service Accounts

- OUs simplify delegation of administrative tasks
- Linked GPOs apply to the OU and all sub-OUs
- Delegation assigns limited admin tasks to non-admin users per OU

### Group Policy Objects (GPOs)
Collections of settings applied to OUs for centralized configuration management.

1. Create GPO under `Group Policy Objects`
2. Link GPO to target OU
3. Configure user or computer policy settings
4. Settings propagate to all objects within the OU and sub-OUs

- Policies can target computers or users independently
- OUs should be separated for: Workstations, Servers, Domain Controllers

### Authentication Methods

#### Kerberos (Default)
Ticket-based authentication protocol used by modern Windows domains.

[[Assets/Images/Pasted image 20250402212933.png|Kerberos Part 1]]
[[Assets/Images/Pasted image 20250402212955.png|Kerberos Part 2]]
[[Assets/Images/Pasted image 20250402213017.png|Kerberos Part 3]]

> [!INFO]- Backlog
> Document full Kerberos ticket flow (AS-REQ, TGT, TGS) when revisiting with HTB content

#### NetNTLM (Legacy)
Challenge-response protocol maintained for backward compatibility.

[[Assets/Images/Pasted image 20250402213051.png|NetNTLM]]

> [!INFO]- Backlog
> Document NTLM challenge-response flow when revisiting with HTB content

### Trees, Forests, and Trusts

#### Tree
Multiple domains sharing a namespace under a common root domain.

[[Assets/Images/Pasted image 20250402213224.png|Tree]]

- Separates administration while enabling centralized control
- `Enterprise Admins` group holds privileges across all domains

#### Forest
Collection of multiple trees with separate namespaces.

[[Assets/Images/Pasted image 20250402213440.png|Forest]]

#### Trust Relationships
| Type | Description |
|------|-------------|
| One-way trust | Domain A trusts Domain B → users from B can access A's resources |
| Two-way trust | Both domains can mutually authorize access |

---
## Related Concepts
- [[Windows Fundamentals]]
- [[Windows PowerShell]]
- [[Windows Command Line]]

## Related Techniques
- [[AD Enumeration]]
- [[Kerberoasting]]
- [[Trust Exploitation]]

---
## References / Images
- [[Assets/Images/Pasted image 20250402211304.png|OUs]]
- [[Assets/Images/Pasted image 20250402212933.png|Kerberos Part 1]]
- [[Assets/Images/Pasted image 20250402212955.png|Kerberos Part 2]]
- [[Assets/Images/Pasted image 20250402213017.png|Kerberos Part 3]]
- [[Assets/Images/Pasted image 20250402213051.png|NetNTLM]]
- [[Assets/Images/Pasted image 20250402213224.png|Tree]]
- [[Assets/Images/Pasted image 20250402213440.png|Forest]]
- Microsoft AD Documentation
