Tags: #Status/In-Progress #Type/Technique #Context/Web #Context/Redteam

---
## Overview
VHost fuzzing discovers hidden virtual hosts on a target web server by brute-forcing the HTTP `Host` header. Because virtual hosts are configured inside the web server (not in DNS), passive subdomain enumeration misses them entirely — they may not have any public DNS record at all. On HTB boxes and real engagements, hidden VHosts often host admin panels, staging environments, or internal tools with weaker access controls than the main site.

---
## When To Use
- After identifying the target's IP and base domain during initial recon
- When the main site seems limited in scope but the server feels like it has more behind it
- Before directory fuzzing — a hidden VHost may have a completely different application with its own attack surface
- When DNS enumeration returns subdomains pointing to the same IP as the main target

## Requirements
- Target IP address
- Base domain name (e.g. `example.thm`)
- A wordlist of subdomain/VHost names (SecLists DNS wordlists work well)
- `/etc/hosts` updated with the base domain → IP mapping

---
## Attack Steps
1. **Add the base domain to `/etc/hosts`** so your tools can reference it by name if needed:
   `echo "<target-ip> <target-domain>" | sudo tee -a /etc/hosts`

2. **Run a baseline request** to record the default response size — used to filter out the "nothing found" response:
   `curl -s -o /dev/null -w "%{http_code} %{size_download}" http://<target-ip>`

3. **Fuzz the Host header** with a wordlist to find VHosts that return a different response from the baseline:
   - Use the target IP (not the hostname) as the base URL so no DNS resolution is needed for the scan itself
   - Filter responses by the baseline response size to isolate valid VHosts

4. **Validate each candidate** — access the discovered VHost manually:
   `curl -s -H "Host: <discovered-vhost>.<domain>" http://<target-ip>`
   Confirm the response body differs from the default page.

5. **Add confirmed VHosts to `/etc/hosts`** to browse them in a browser:
   `echo "<target-ip>   <discovered-vhost>.<domain>" | sudo tee -a /etc/hosts`

6. **Proceed with enumeration** of the newly discovered VHost — directory fuzzing, technology fingerprinting, and further recon.

---
## Tool Commands

### Gobuster VHost Mode

> [!INFO]- Commands:
> `gobuster vhost -u http://<target-ip> --domain <target-domain> -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt --append-domain --exclude-length <baseline-length>`
>
> - Use the IP as the base URL (`-u`) — avoids needing a DNS entry for the scan
> - `--domain` specifies the base domain to append to each wordlist entry
> - `--append-domain` builds full hostnames: `word.example.thm`
> - `--exclude-length` filters responses that match the default page length

### ffuf VHost Mode

> [!INFO]- Commands:
> `ffuf -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt -u http://<target-ip> -H "Host: FUZZ.<target-domain>" -fs <baseline-response-size>`
>
> `-fs` filters by response size — set to the baseline response size from your curl probe.
>
> Tighter filtering if size alone is not enough:
> `ffuf -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt -u http://<target-ip> -H "Host: FUZZ.<target-domain>" -fs <size> -fc 302`

### Feroxbuster

> [!INFO]- Commands:
> `feroxbuster --url http://<target-ip> -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt -H "Host: FUZZ.<target-domain>" --filter-size <baseline-size>`

---
## Filtering Strategy

The server returns a default response for every unknown hostname. The challenge is separating real VHosts from that noise.

| Response Code | What It Means | Action |
|--------------|---------------|--------|
| 200 | Success — likely a valid VHost | Investigate |
| 301 / 302 | Redirect — may point to a valid VHost or just redirect to main site | Follow redirect and check destination |
| 403 | Forbidden — the VHost exists but access is restricted | Investigate; restricted VHosts are often admin interfaces |
| 400 | Bad Request — malformed Host header entry | Filter out; the VHost does not exist |
| Default size match | Same response as baseline | Filter out via `--exclude-length` or `-fs` |

**Note on 403s:** Do not blindly filter 403 responses. A 403 on a VHost means the server recognises it and is actively denying access — the host is real. An admin panel returning 403 is worth investigating for authentication bypasses, default credentials, or other entry points.

**Filtering with shell pipes:** If the tool's built-in filters are not precise enough, pipe output through `grep -v "403\|400"` only after confirming those codes are genuinely noise for your target. For VHost scans, 403s are almost always worth keeping.

---
## Detection
- Large volumes of HTTP requests with rapidly varying `Host` header values from a single IP
- Requests for hostnames that do not exist in DNS or internal records
- Web application firewall (WAF) or IDS rules on Host header pattern matching

## Mitigation
- Configure web servers to return a generic response (or drop the connection) for unrecognised Host headers — this prevents fingerprinting of the VHost list
- Do not expose internal VHosts on externally reachable IPs
- Use split-horizon DNS to ensure internal VHosts are only resolvable on the internal network

---
## Related Knowledge
- [[Virtual Hosts]]
- [[HTTP & HTTPS]]
- [[DNS (Domain Name System)]]

## Related Playbook
- [[Linux Pentest Playbook]]

## Related Tools
- [[Gobuster]]
- [[ffuf]]
- [[Feroxbuster]]

---
## References / Images
- SecLists DNS wordlists: https://github.com/danielmiessler/SecLists/tree/master/Discovery/DNS
- PortSwigger Virtual Hosting: https://portswigger.net/web-security/host-header
