Tags: #Status/In-Progress #Type/Technique #Context/Network #Context/Web #Context/Redteam

---
## Overview
Subdomain enumeration discovers all subdomains associated with a target domain. Development environments, admin panels, legacy applications, and staging servers frequently live on subdomains with weaker security than the main site — running outdated software, using weaker authentication, or exposing functionality not intended for public access. Enumeration can be active (direct DNS interaction) or passive (public data sources only).

---
## When To Use
- Early in the external recon phase of any web engagement or CTF
- When the main domain presents no obvious foothold but subdomains might
- When looking for dev, staging, or admin panels with weaker access controls
- When building a complete picture of a target's internet-facing attack surface

## Requirements
- A known target domain
- DNS access (standard internet connectivity is sufficient for external targets)
- Wordlists — SecLists Discovery/DNS is the standard source

---
## Attack Steps

### Phase 1 — Zone Transfer Attempt (always try first)
1. Identify the nameservers for the domain: `dig NS example.com`
2. Attempt a zone transfer against each nameserver: `dig axfr example.com @<ns>`
3. If successful, the full zone file is returned — all subdomains and IPs exposed at once
4. Zone transfers succeed only when `allow-transfer` is misconfigured; rare but worth attempting before brute force

---

### Phase 2 — Passive Subdomain Discovery
1. Query Certificate Transparency logs for subdomains embedded in TLS certificate SANs:
   `curl -s "https://crt.sh/?q=example.com&output=json" | jq -r '.[].name_value' | sort -u`
2. Use search engine operators to surface indexed subdomains without querying DNS:
   `site:example.com -www`
3. Check online DNS aggregation databases (SecurityTrails, Shodan, DNS Dumpster) for passively collected records
4. Passive methods produce zero detectable traffic on the target

---

### Phase 3 — Active Brute Force
1. Select a wordlist — start with `subdomains-top1million-5000.txt` for speed; use the 110k list for thoroughness
2. Run [[DNSenum]] for a combined brute force and zone transfer attempt:
   `dnsenum --enum example.com -f /usr/share/seclists/Discovery/DNS/subdomains-top1million-20000.txt -r`
3. Alternatively use [[Gobuster]] DNS mode:
   `gobuster dns -d example.com -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt`
4. Gobuster is faster for raw brute force; DNSenum additionally scrapes Google and attempts zone transfers automatically
5. For recursive subdomain discovery (sub.sub.example.com), use DNSenum with the `-r` flag

---

### Phase 4 — Validation
1. For each discovered subdomain, confirm it is live by making an HTTP/HTTPS request
2. Check the response code, server header, and page content for fingerprinting clues
3. Note any subdomains returning interesting status codes (200, 301, 403) — 403 can still be worth probing
4. Add confirmed live subdomains to your target list for further enumeration

---
## Detection
- High-volume DNS queries in a short time will trigger DNS-based IDS or rate limiting on the target's nameservers
- Zone transfer attempts are logged by all modern DNS servers
- Passive CT log queries and search engine operators produce zero detectable activity on the target

## Mitigation
- Configure DNS servers to deny AXFR to unauthorized sources (restrict `allow-transfer` to known secondaries)
- Enable DNS query rate limiting to slow automated brute-force attempts
- Minimize subdomain exposure — decommission unused subdomains and don't create DNS records for services still in development

---
## Related Knowledge
- [[DNS (Domain Name System)]]
- [[Virtual Hosts]]
- [[Certificate Transparency Logs]]

## Related Playbook
- [[Linux Pentest Playbook]]

## Related Tools
- [[dig]]
- [[DNSenum]]
- [[Gobuster]]

---
## References / Images
- SecLists DNS wordlists: https://github.com/danielmiessler/SecLists/tree/master/Discovery/DNS
- crt.sh: https://crt.sh
