Tags: #Status/In-Progress #Type/Technique #Context/Network #Context/Redteam

---
## Overview
DNS Enumeration extracts hostnames, subdomains, and IP addresses from DNS infrastructure. It is a core recon technique — a successful zone transfer hands the attacker a complete internal network map, while subdomain brute forcing reveals hidden hosts not indexed publicly.

---
## When To Use
- Early recon phase to map a target's internal and external infrastructure
- When a DNS server is exposed and may be misconfigured to allow zone transfers
- When standard enumeration leaves blind spots (internal hosts not in public DNS)

## Requirements
- Target's DNS server IP or hostname
- A subdomain wordlist (SecLists: `Discovery/DNS/`)
- Network access to UDP/53 (queries) and TCP/53 (zone transfers)

---
## Attack Steps

### Step 1 — Identify Nameservers
Query the target domain's authoritative nameservers:
`dig ns <domain>`
`nslookup -type=NS <domain>`

### Step 2 — Attempt Zone Transfer
Request the full zone file from each identified nameserver:
`dig axfr <domain> @<nameserver>`
`dig axfr internal.<domain> @<nameserver>`

A successful AXFR returns all DNS records for the zone — hostnames, IPs, mail servers, and internal infrastructure. This only works when the server has `allow-transfer any` or incorrectly trusts your source IP.

### Step 3 — Subdomain Brute Forcing
When zone transfers are blocked, test candidate subdomains from a wordlist:

**Manual loop (dig):**
```bash
for sub in $(cat /opt/useful/seclists/Discovery/DNS/subdomains-top1million-110000.txt); do
  dig $sub.<domain> @<nameserver> | grep -v ';\|SOA' | sed -r '/^\s*$/d' | grep $sub | tee -a subdomains.txt
done
```

**Automated with DNSenum** (handles zone transfer + subdomain brute + Google scraping):
See [[DNSenum]] for full usage and flags.

Recommended wordlists:
- `Discovery/DNS/subdomains-top1million-5000.txt` — fast, covers common names
- `Discovery/DNS/subdomains-top1million-110000.txt` — thorough

### Step 4 — Enumerate Record Types
After identifying live hosts, query for additional records:
`dig any <domain> @<nameserver>` — all available records
`dig mx <domain>` — mail servers
`dig txt <domain>` — SPF, DKIM, and other policy records
`dig CH TXT version.bind @<nameserver>` — DNS server version (if not disabled)

---
## Detection
- AXFR requests from non-authoritative IPs logged in DNS server audit logs
- High-volume UDP/53 queries from a single source (brute force pattern)
- Queries for non-existent subdomains generate NXDOMAIN responses — unusual volume is detectable

## Mitigation
- Set `allow-transfer` to specific secondary nameserver IPs only — never `any`
- Enable DNS query logging and alert on high NXDOMAIN rates
- Use split-horizon DNS to serve different zone data to internal vs external resolvers

---
## Related Knowledge
- [[DNS (Domain Name System)]]
- [[Protocols]]

## Related Playbook
- [[Linux Pentest Playbook]]

## Related Tools
- [[DNSenum]]
- [[Nmap]]
- [[nslookup]]

---
## References / Images
- `man dig`
- `man nslookup`
