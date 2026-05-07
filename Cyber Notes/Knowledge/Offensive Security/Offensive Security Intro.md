Tags: #Status/In-Progress #Type/Knowledge #Context/Redteam #publish-me

---
## Overview
Offensive security is the practice of proactively identifying and exploiting security weaknesses in systems, applications, and networks to improve an organization's overall security posture. Unlike defensive security — which reacts to threats — offensive security simulates real adversaries to expose vulnerabilities before malicious actors can. It spans multiple domains: web applications, network infrastructure, cloud environments, mobile devices, physical access controls, and human behavior. Each domain requires specialized knowledge, distinct toolsets, and tailored methodologies.

---

## Terminology
| Term | Definition |
|------|------------|
| Attack Surface | Total set of entry points an attacker can use to compromise a system or environment |
| IaaS | Infrastructure as a Service; cloud model where VMs, storage, and networking are rented from a provider |
| PaaS | Platform as a Service; cloud model providing managed frameworks and databases as services |
| SaaS | Software as a Service; cloud model delivering full applications over the internet |
| APK | Android Package Kit; the file format for distributing Android applications |
| IPA | iOS App Store Package; the encrypted file format for distributing iOS applications |
| Static Analysis | Analyzing code or binaries without executing them |
| Dynamic Analysis | Analyzing a running application's behavior at runtime |
| Fuzzing | Automated technique that sends malformed or random input to find crashes and vulnerabilities |
| Decompiler | Tool that reconstructs high-level source code from compiled binaries |
| Social Engineering | Manipulation of people through psychological exploitation to bypass security controls |
| IAM | Identity and Access Management; cloud permission system controlling who can access what resources |

---
## Core Concepts

### Offensive Security Domains
Offensive security encompasses seven primary testing domains. Real-world engagements often combine multiple domains — for example, a red team operation may chain network compromise, physical access, and social engineering into a single attack scenario.

---

### Web Application Security Testing
Evaluates websites, web applications, and API endpoints for client-side and server-side vulnerabilities.

Focus areas: front-end attack surfaces, back-end logic flaws, API security, authentication and session management, injection vulnerabilities, access control failures.

Key skills: deep understanding of HTTP/HTTPS, web application architecture, browser behavior, and the OWASP Top 10. Python scripting for request automation and payload generation is highly valuable.

See [[Website Innerworkings]] | [[OWASP Top 10 - 2021]] | [[HTTP & HTTPS]]

---

### Network Security Testing
Evaluates network infrastructure and simulates attacks against connected devices, services, and protocols.

Common vulnerability targets:
- Misconfigured systems and exposed services
- Unpatched software with publicly known CVEs
- Weak or default authentication credentials
- Insecure or deprecated protocols (Telnet, FTP, SNMPv1)
- Poor network segmentation allowing lateral movement between zones
- Exposed management interfaces (SSH, RDP, IPMI, web admin consoles)
- Missing perimeter controls and monitoring

Wireless network testing falls within this domain — evaluating encryption protocols (WEP, WPA2, WPA3), access point configurations, and eavesdropping opportunities on unprotected traffic.

Avoid excessive reliance on automated scanners — manual validation is essential to confirm true positives and identify chained vulnerabilities that scanners miss.

---

### Cloud Security Testing
Evaluates cloud-based infrastructure including virtual machines, storage, serverless functions, containerized applications, and cloud-native services.

#### Cloud Service Models
| Model | Testing Focus |
|-------|--------------|
| IaaS | Virtual machines, network configuration, storage bucket permissions |
| PaaS | Managed databases, platform frameworks, container security |
| SaaS | Application-level security, API endpoints, data access controls |

Cloud testing requires knowing which components are within scope — cloud providers have shared responsibility models that define what the customer owns vs what the provider owns.

#### Common Cloud Vulnerabilities
- Publicly readable or writable storage buckets
- Excessive IAM permissions enabling privilege escalation
- Insecure API implementations and exposed endpoints
- Secrets hardcoded in environment variables or code repositories
- Misconfigured containers (privileged containers, exposed Docker socket)
- Unmonitored or unlogged access to sensitive resources

#### Cloud Testing Process
1. Reconnaissance — enumerate publicly exposed services and storage
2. Access Control Testing — assess IAM policy implementation and permission boundaries
3. Security Misconfiguration — review storage, compute, and networking configurations
4. Virtual Network Analysis — evaluate segmentation, firewall rules, and VPC configurations
5. Data Security Testing — confirm encryption at rest and in transit
6. Application Security Testing — evaluate cloud-hosted applications and APIs

Cloud-specific tools: AWS Inspector, Azure Security Center, CloudSploit, Scout Suite, Prowler.
Container analysis tools: Clair, Trivy, Anchore.

---

### Physical Security Testing
Tests whether physical security controls can be bypassed to gain unauthorized access to facilities, hardware, or systems.

Approach: OSINT and in-person observation to map the facility layout, identify blind spots, and understand access control mechanisms. Direct testing targets badge readers, keypad systems, locks, and camera coverage gaps.

Physical testing is commonly combined with social engineering — posing as maintenance staff, delivery personnel, or employees to bypass access controls that technology alone cannot test.

---

### Social Engineering
Tests the human element of security — whether personnel can be manipulated through psychological exploitation to bypass technical controls.

Social engineering leverages psychological principles: authority, urgency, fear, curiosity, and trust.

| Technique | Description |
|-----------|-------------|
| Phishing | Deceptive emails crafted to harvest credentials or deliver malicious payloads |
| Pretexting | Fabricating a scenario to manipulate a target into providing information or access |
| Baiting | Leaving malicious physical media (USB drives) or digital lures for targets to discover |
| Tailgating | Following an authorized person through a secured access point without authenticating |

Process: OSINT and reconnaissance → develop targeted attack scenario → execute → document and debrief.

Ethical constraints: do not cause lasting psychological harm or damage workplace morale. If a situation escalates beyond the planned scenario, stop and reveal identity immediately.

See [[Social Engineering]] for foundational knowledge.

---

### Mobile Security Testing
Tests mobile applications and devices for vulnerabilities in storage, network communication, authentication, and platform-specific security controls.

A proper testing environment is required before beginning:
- **Android**: access to rooted and non-rooted devices (or emulators)
- **iOS**: access to jailbroken and non-jailbroken devices (or simulators)

| Platform | Distribution Format | Notes |
|----------|-------------------|-------|
| Android | APK file | Open ecosystem; can be decompiled with JADX into readable Java code |
| iOS | IPA file | Encrypted by default; enforces strict sandboxing, code signing, and hardware security |

#### Android Security Testing
- Applications are distributed as APK files
- Static analysis: decompile with JADX to review manifest, permissions, and source code
- Dynamic analysis: use Frida to hook into running processes and inspect runtime behavior

#### iOS Security Testing
- Applications are distributed as IPA files, encrypted by default
- Platform enforces sandboxing, code signing, and hardware-backed security (Secure Enclave)
- Objection and Frida can bypass certain security controls for testing purposes

Key iOS areas to assess: Keychain usage and data protection class, certificate pinning implementation, local storage practices, URL scheme handling, biometric authentication.

#### Common Mobile Vulnerabilities
- Insecure local data storage (plaintext credentials, unprotected databases, unencrypted files)
- Absent or bypassable SSL/TLS certificate pinning enabling MiTM attacks
- Hardcoded credentials or API keys in the application binary
- Insecure inter-process communication (IPC) channels
- Client-side injection vulnerabilities in WebViews

#### Mobile Testing Tools
| Tool | Purpose |
|------|---------|
| ADB (Android Debug Bridge) | Android device management, shell access, and APK installation |
| JADX | Android APK decompiler — outputs readable Java/Kotlin source code |
| Frida | Dynamic instrumentation framework; hooks into running processes on Android and iOS |
| Objection | Runtime mobile exploration tool built on Frida; bypasses security controls for testing |
| Burp Suite Mobile Assistant | Intercepts and manipulates mobile HTTP/HTTPS traffic |
| Ghidra | Reverse engineering platform for binary analysis |

---

### Reverse Engineering
Analyzing compiled software, firmware, or binaries to understand behavior, discover vulnerabilities, or recover logic — without access to original source code.

Common use cases: malware analysis, vulnerability research, protocol analysis, firmware security evaluation, license validation bypass research.

#### Core Knowledge Requirements
- Assembly language and CPU architectures (x86, x86-64, ARM)
- Memory layout: stack (function calls, local variables), heap (dynamic memory allocation), code and data segments
- OS internals and how applications interact with the kernel
- Common software design patterns and calling conventions
- Networking protocols and API communication for protocol analysis

#### Toolchain
| Tool Type | Examples | Purpose |
|-----------|---------|---------|
| Disassemblers | IDA Pro, Ghidra, Radare2 | Convert binary machine code to readable assembly |
| Debuggers | GDB, WinDbg, x64dbg | Step through program execution at runtime; inspect memory and registers |
| Decompilers | Ghidra (built-in), dnSpy (C#/.NET), ILSpy (.NET), JADX (Android) | Reconstruct approximate high-level source from compiled binary |

Use both static analysis (examining code without running it) and dynamic analysis (observing behavior at runtime) for complete coverage.

Anti-reverse engineering techniques — obfuscation, packing, anti-debugging tricks — are common in commercial software and malware. Learn to identify and work around them.

---

### Career and Daily Life

#### Daily Routine
Offensive security requires constant skill maintenance alongside active engagement work:
- Follow cybersecurity news, CVE publications, and threat intelligence feeds
- Conduct vulnerability research, exploitation, and post-exploitation requiring patience and creative thinking
- Maintain frequent communication with clients; document all findings in real time
- Dedicate time to tool research, lab practice, and learning new techniques

#### Utilizing Penetration Testing Results
Findings are only valuable if they drive action:
- Understand the organization's risk tolerance and tailor recommendations accordingly
- Every finding must include: clear technical description, business impact analysis, and risk rating
- Provide actionable remediation: specific patch references, configuration guidance, and architectural changes
- Balance security improvements against operational constraints — include both short-term fixes and long-term improvements

#### Profession and Career Path
- Offensive security roles exist across all sectors: finance, healthcare, government, technology, and consulting
- Most practitioners start in entry-level IT or security roles before specializing
- Practical experience (CTFs, bug bounties, home labs) and certifications are primary qualification paths
- Skills transfer well into broader security leadership, architecture, and threat intelligence roles
- Contribute to the community: bug bounty programs, open-source security tools, security research, and writing

---
## Related Concepts
- [[Pentesting Fundamentals]]
- [[Defensive Security Intro]]
- [[Threat Actors]]
- [[Social Engineering]]
- [[Website Innerworkings]]
- [[OWASP Top 10 - 2021]]

## Related Techniques
- [[SQL Injection]]
- [[XSS]]

## Related Tools
- [[Nmap]]
- [[Metasploit]]
- [[Burp Suite]]
- [[OpenVAS]]
- [[Gobuster]]

---
## References / Images
- MITRE ATT&CK: https://attack.mitre.org
- OWASP Testing Guide: https://owasp.org/www-project-web-security-testing-guide
- Frida Dynamic Instrumentation: https://frida.re
- JADX Android Decompiler: https://github.com/skylot/jadx
