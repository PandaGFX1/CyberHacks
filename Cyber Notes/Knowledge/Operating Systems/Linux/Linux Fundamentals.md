Tags: #Status/In-Progress #Type/Knowledge #Context/Linux #publish-me

---
## Overview
Linux is a lightweight, open-source operating system based on UNIX, first released by Linus Torvalds in 1991. Highly modular, secure, and customizable, it is widely used in servers, desktops, and embedded systems — and is the default environment for most CTF challenges and penetration testing. Linux comes in many distributions (distros) varying in package management, default tools, and user interfaces. It is generally considered more secure than other operating systems due to its permission model, active community, and rapid patch cycles.

---
## Terminology
| Term | Definition |
|------|------------|
| Shell / Terminal | Interface for entering commands and interacting with the OS |
| Root | Superuser account with full system privileges; prompt shown as `#` |
| Regular User | Standard account with limited privileges; prompt shown as `$` |
| Distro (Distribution) | A packaged version of Linux with its own tools, UI, and package manager |
| File System Hierarchy | Standardized directory structure starting at `/` (root) |
| PID (Process ID) | Unique number assigned to each running process |
| PPID (Parent Process ID) | PID of the process that spawned a given process |
| Daemon | Background service process managed by the OS |
| systemd | Modern init system used to manage services and boot processes |
| System User | UID 1–999; created for system services |
| Local User | UID 1000+; regular human user accounts |
| Absolute Path | Full path from root `/` to a file |
| Relative Path | Path relative to the current working directory |
| PATH Variable | Lists directories the OS searches when looking for commands |
| Inode | Data structure storing file metadata (permissions, ownership, size, timestamps) |
| STDIN | Standard input — data stream 0 |
| STDOUT | Standard output — data stream 1 |
| STDERR | Standard error — data stream 2 |
| Pager | Tool for reading large files one screen at a time (e.g., `more`, `less`) |
| SUID | Set User ID — runs a file with the permissions of its owner |
| SGID | Set Group ID — runs a file with the permissions of its owning group |
| Sticky Bit | Prevents users from deleting files in a directory they don't own |

---
## Core Concepts

### File System Structure
Linux uses a hierarchical file system rooted at `/`.

| Directory | Purpose |
|-----------|---------|
| `/` | Root of the entire file system |
| `/etc` | System configuration files |
| `/var` | Variable data — logs, databases, spool files |
| `/root` | Home directory for the root user |
| `/tmp` | Temporary files; cleared on reboot |
| `/home` | Home directories for regular users |
| `/bin` | Essential user binaries |
| `/usr` | User programs and utilities |
| `/proc` | Virtual filesystem; running processes listed by PID |
| `/etc/passwd` | Contains user and system account info; readable by all users |
| `/etc/shadow` | Stores hashed passwords and expiration info; root access only |
| `/etc/profile` | Stores default settings for user sessions |

`/etc/passwd` fields (colon-separated): `Username : Password : UID : GID : User Info : Home Directory : Shell`
`/etc/shadow` fields (colon-separated): `Username : Hashed Password : Last Change : Min Days : Max Days : Warn : Inactive : Expire`

---

### System Information Commands
Essential commands for gathering basic system information.

| Command | Description |
|---------|-------------|
| `whoami` | Display current username |
| `id` | Return current user identity (UID, GID, groups) |
| `hostname` | Print or set the name of the current host |
| `uname -a` | Print all OS info: kernel name, hostname, kernel release, version, hardware, OS |
| `pwd` | Print the current working directory |
| `ifconfig` | View or assign network interface addresses (deprecated; replaced by `ip`) |
| `ip addr` | Show or manipulate routing, network devices, and interfaces |
| `netstat` | Show active network connections and ports |
| `ss` | Investigate sockets (modern `netstat` replacement) |
| `ps` | Show running processes |
| `ps -aux` | Show all processes with detailed output |
| `who` | Display logged-in users |
| `env` | Print all environment variables — useful for enumeration |
| `lsblk` | List block devices (disks and partitions) |
| `lsusb` | List USB devices |
| `lsof` | List all open files and which processes are using them |
| `lspci` | List PCI devices |
| `ssh user@ip` | Connect to a remote system via Secure Shell |

---

### Navigation
| Command | Description |
|---------|-------------|
| `ls` | List files in current directory |
| `ls -l` | Long listing with permissions, owner, size, date |
| `ls -la` | Long listing including hidden files (dotfiles) |
| `ls -lt` | Long listing sorted by modification time |
| `cd <dir>` | Change directory |
| `cd ..` | Go up one directory level |
| `pwd` | Print working directory |
| `tree .` | Display directory structure as a graphical tree |

---

### Working with Files and Directories
| Command | Description |
|---------|-------------|
| `touch <name>` | Create an empty file |
| `mkdir <name>` | Create a directory |
| `mkdir -p /path/to/dir` | Create directory and all parent directories |
| `mv <src> <dst>` | Move or rename a file or directory |
| `cp <file> <dest>` | Copy a file |
| `rm <file>` | Remove a file |
| `rm -r <dir>` | Remove a directory and its contents recursively |
| `cat <file>` | Display file contents; also used to write or pipe text |
| `file <name>` | Identify file type |

Editors: `nano` is simpler and more common. `vim` is more powerful — includes Normal, Insert, Visual, Command, Replace, and Ex modes. Run `vimtutor` to learn vim interactively.

---

### Finding Files and Directories
| Command | Description |
|---------|-------------|
| `which <tool>` | Returns the path to a binary or link |
| `locate <name>` | Fast search using a local database — run `sudo updatedb` to refresh |
| `find <path> <options>` | Powerful file search with filters |

**`find` option reference:**

| Option | Description |
|--------|-------------|
| `-type f` | Match files only |
| `-type d` | Match directories only |
| `-name "*.conf"` | Match by filename pattern |
| `-user root` | Match files owned by a specific user |
| `-size +20k` | Match files larger than 20KB |
| `-newermt 2020-03-03` | Match files newer than the specified date |
| `-exec ls -al {} \;` | Execute a command on each result |
| `2>/dev/null` | Suppress permission denied errors (redirect STDERR to null) |

Example: `find / -type f -name *.conf -user root -size +20k -newermt 2020-03-03 -exec ls -al {} \; 2>/dev/null`

---

### File Descriptors and Redirections
Every process has three default data streams:

| Stream | Number | Description |
|--------|--------|-------------|
| STDIN | 0 | Standard input |
| STDOUT | 1 | Standard output |
| STDERR | 2 | Standard error |

| Operator | Description | Example |
|----------|-------------|---------|
| `>` or `1>` | Redirect STDOUT to a file (overwrites) | `ls > out.txt` |
| `>>` | Append STDOUT to a file | `ls >> out.txt` |
| `<` | Use a file as STDIN | `cat < file.txt` |
| `<<` | Heredoc — feed multi-line input until a delimiter | `cat << EOF > file.txt` |
| `2>/dev/null` | Redirect STDERR to null (suppress errors) | `find / -name x 2>/dev/null` |
| `\|` | Pipe STDOUT of one command as STDIN to the next | `find /etc | grep conf` |

`EOF` is a Linux function that marks the end of input in a heredoc — type content, then type `EOF` on its own line to finish.

---

### Filter Contents
Tools for reading, searching, and processing output.

| Command | Description |
|---------|-------------|
| `more <file>` | Read file one page at a time (forward only) |
| `less <file>` | Read file with forward and backward navigation |
| `head <file>` | Print first 10 lines of a file |
| `tail <file>` | Print last 10 lines of a file |
| `sort <file>` | Sort lines alphabetically by default |
| `grep "pattern" <file>` | Search for lines matching a pattern |
| `grep -v "pattern"` | Exclude lines matching a pattern (inverse grep) |
| `cut -d":" -f1` | Split on delimiter `:` and return the first field |
| `tr ":" " "` | Replace all `:` characters with spaces |
| `column -t` | Display piped input in aligned tabular form |
| `awk '{print $1, $NF}'` | Print first and last fields of each line |
| `sed 's/old/new/g'` | Replace all occurrences of `old` with `new` in a stream |
| `wc -l` | Count lines in input |

Example pipeline:
`find /etc/ -name *.conf 2>/dev/null | grep system` — find `.conf` files, suppress errors, filter for "system"
`apt list --installed | grep -o installed | wc -l` — count installed packages

---

### Regular Expressions
Regular expressions (regex) allow precise searching, filtering, and text manipulation. Available in `grep`, `sed`, `awk`, and many other tools.

| Operator | Description |
|----------|-------------|
| `()` | Group parts of a regex |
| `[]` | Character class — e.g., `[a-z]`, `[0-9]` |
| `{}` | Quantifier — specifies how many times the previous pattern repeats |
| `.` | Match any single character |
| `*` | Match zero or more of the preceding element |
| `^` | Match start of line |
| `$` | Match end of line |

---

### Users and Permissions

#### User Types
| User Type | UID Range | Description |
|-----------|-----------|-------------|
| Root | 0 | Full system access |
| System Users | 1–999 | Created for system services and daemons |
| Local Users | 1000+ | Regular human user accounts |

Permissions are assigned to three entities: **Owner** | **Group** | **Others**

#### Permission Breakdown
```
- rwx rw- r--   1 root root 1641 May 4 23:42 /etc/passwd
  |   |   |     |  |    |
  |   |   |     |  |    └── Group
  |   |   |     |  └─────── User (Owner)
  |   |   └───────────────── Others permissions
  |   └───────────────────── Group permissions
  └───────────────────────── Owner permissions
File type: - = file, d = directory, l = symlink
```

| Permission | Octal | File Effect | Directory Effect |
|------------|-------|-------------|-----------------|
| Read (r) | 4 | View file contents | List directory contents |
| Write (w) | 2 | Modify file | Create, delete, rename files inside |
| Execute (x) | 1 | Run as program | Navigate into directory |

#### Octal Notation
| Binary | Octal | Symbolic |
|--------|-------|----------|
| 111 | 7 | rwx |
| 101 | 5 | r-x |
| 100 | 4 | r-- |
| 110 | 6 | rw- |
| 000 | 0 | --- |

#### Permission Commands
| Command | Description |
|---------|-------------|
| `chmod 755 <file>` | Set permissions using octal notation |
| `chmod u+x <file>` | Add execute for owner using symbolic notation |
| `chmod a-w <file>` | Remove write for all (a=all, o=others, g=group, u=user) |
| `chown user:group <file>` | Change ownership of a file or directory |
| `ls -l` | View permissions on files |

#### Special Permissions
| Permission | Symbol | Description |
|------------|--------|-------------|
| SUID | `s` in owner execute field | Program runs with owner's privileges — risk if executable launches a shell |
| SGID | `s` in group execute field | Program runs with group's privileges |
| Sticky Bit (`T`) | `T` in others execute field | Others have NO execute; cannot see or run files in directory |
| Sticky Bit (`t`) | `t` in others execute field | Others have execute; only owner/root can delete files they don't own |

SUID/SGID binaries can be a privilege escalation vector — check GTFOBins (https://gtfobins.github.io/) if a flagged binary can launch a shell.

---

### Operators
| Operator | Description |
|----------|-------------|
| `&` | Run command in background immediately |
| `&&` | Chain commands; second runs only if first succeeds |
| `;` | Run commands sequentially regardless of success |
| `\|` | Pipe STDOUT of one command as STDIN to next |
| `>` | Redirect output to file (overwrites) |
| `>>` | Append output to file |
| `[CTRL+Z]` | Suspend current process (send SIGTSTP) |
| `bg` | Resume suspended process in background |
| `fg <job#>` | Bring background job to foreground |
| `jobs` | List stopped/background jobs |

---

## Related Concepts
- [[Operating System Fundamentals]]
- [[Linux Shells]]
- [[Linux System Management]]
- [[Linux File System]]
- [[Linux Networking]]
- [[Linux Hardening]]
- [[Boot and File Systems]]
- [[Protocols]]

## Related Techniques
-

---
## References / Images
- Linux File System Hierarchy Standard (FHS)
- SSH and SCP usage documentation
- https://explainshell.com/ — break down any shell command
- https://gtfobins.github.io/ — SUID/SGID privilege escalation reference
