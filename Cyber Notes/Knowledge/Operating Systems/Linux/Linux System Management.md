Tags: #Status/In-Progress #Type/Knowledge #Context/Linux #publish-me

---
## Overview
Linux system management covers the administration of users, packages, services, processes, and scheduled tasks. Understanding these mechanisms is essential for both system administration and penetration testing — user account misconfigurations, overly permissive service accounts, and scheduled tasks are common attack surfaces.

---
## Terminology
| Term | Definition |
|------|------------|
| sudo | "Superuser do" — allows permitted users to execute commands with elevated privileges |
| su | Switch user — authenticates via PAM and switches to another user context |
| PAM | Pluggable Authentication Module — handles authentication for Linux services |
| Daemon | Background service process running silently |
| systemd | Modern init system; manages services, boot processes, and system state |
| init | First process started by the kernel (PID 1); manages all other processes |
| PID | Process ID — unique number assigned to each running process |
| PPID | Parent PID — the PID of the process that spawned the current one |
| Zombie | A stopped process that still has an entry in the process table |
| Cron | Task scheduler using time-based expressions to run jobs at set intervals |
| Crontab | Configuration file storing scheduled cron jobs |
| Repository | Remote server hosting packages and their metadata for a Linux distribution |
| Dependency | A package required by another package to function correctly |

---
## Core Concepts

### User Management
`/etc/shadow` is only readable and writable by root — it stores encrypted passwords for all users. Authentication is typically handled through PAM.

| Command | Description |
|---------|-------------|
| `sudo <command>` | Execute a command with superuser privileges |
| `su` | Switch to root (default) or another user |
| `su -c "command" <user>` | Execute a single command as a different user |
| `whoami` | Show current user |
| `id` | Show UID, GID, and group memberships |
| `useradd -m <user>` | Create a new user with a home directory |
| `userdel <user>` | Delete a user account and associated files |
| `usermod -L <user>` | Lock a user's password (disable login) |
| `passwd <user>` | Change a user's password |
| `addgroup <group>` | Add a group to the system |
| `delgroup <group>` | Delete a group |
| `usermod -aG <group> <user>` | Add a user to a group |

Users can belong to multiple groups, granting access to group-owned files and directories. The principle of least privilege applies — users should only have the access they need.

---

### Package Management
Packages are archives containing software binaries, configuration files, and dependency metadata. Different distributions use different package management systems.

| Tool | Type | Description |
|------|------|-------------|
| `dpkg` | Low-level | Install, build, remove, and manage `.deb` packages directly |
| `apt` | High-level | Front-end for dpkg with dependency resolution and repository management |
| `aptitude` | High-level | Alternative to apt with an interactive interface |
| `snap` | Universal | Install and manage snap packages with automatic updates |
| `gem` | Ruby | Front-end to RubyGems — standard Ruby package manager |
| `pip` | Python | Install Python packages not available in the Debian archive |
| `git` | Source | Distributed version control; used to clone and install tools from GitHub |

Repositories are labeled as stable, testing, or unstable. Most systems use the stable (main) repository.
Repository list: `/etc/apt/sources.list`

#### Common apt Commands
| Command | Description |
|---------|-------------|
| `apt-cache search <keyword>` | Search for packages by keyword |
| `apt-cache show <package>` | View detailed info about a package |
| `apt list --installed` | List all installed packages |
| `sudo apt install <package> -y` | Install a package |
| `sudo apt update` | Refresh package lists from repositories |
| `sudo apt dist-upgrade` | Upgrade all packages including kernel |

#### Installing from Source
```
git clone <github_url> [destination]        # Clone a repository
wget <repo_url>                             # Download a .deb package
sudo dpkg -i <package.deb>                 # Install the downloaded package
```

---

### Service and Process Management
Services (daemons) run silently in the background. Most modern Linux distributions use **systemd** as the init system. Running processes are visible in `/proc/` organized by PID.

#### systemctl — Service Control
| Command | Description |
|---------|-------------|
| `systemctl start <service>` | Start a service |
| `systemctl stop <service>` | Stop a service |
| `systemctl restart <service>` | Restart a service |
| `systemctl status <service>` | Show current status and recent logs |
| `systemctl enable <service>` | Enable service to start on boot (adds to SysV) |
| `systemctl disable <service>` | Disable service from starting on boot |
| `systemctl list-units --type=service` | List all active services |
| `sudo systemctl daemon-reload` | Reload systemd config after editing unit files |

#### journalctl — Service Logs
| Command | Description |
|---------|-------------|
| `journalctl -u <service>` | Show logs for a specific service |
| `journalctl -u ssh.service --no-pager` | Show SSH logs without pager |

#### Process States
Processes can be: **running**, **waiting** (for event or resource), **stopped**, or **zombie** (stopped but still in process table).

#### ps — Process Status
| Command | Description |
|---------|-------------|
| `ps` | List processes for current session |
| `ps -aux` | List all processes with user, CPU, and memory info |

#### kill — Send Signals to Processes
| Command | Description |
|---------|-------------|
| `kill -l` | List all available signals |
| `kill -9 <PID>` | Force kill a process (SIGKILL) |
| `pkill <name>` | Kill processes by name |
| `pgrep <name>` | Find PID of a process by name |
| `killall <name>` | Kill all processes with a given name |

#### Common Signals
| Signal | Number | Description |
|--------|--------|-------------|
| SIGHUP | 1 | Terminal controlling the process was closed |
| SIGINT | 2 | Interrupt from user (`[CTRL+C]`) |
| SIGQUIT | 3 | Quit from user (`[CTRL+D]`) |
| SIGKILL | 9 | Immediately kill — no cleanup, not graceful |
| SIGTERM | 15 | Graceful program termination |
| SIGSTOP | 19 | Stop process — cannot be handled |
| SIGTSTP | 20 | User suspension (`[CTRL+Z]`) — can be handled |

#### Background and Foreground Processes
- `[CTRL+Z]` — suspend a running process
- `jobs` — list suspended/background jobs
- `bg` — resume suspended process in background
- `fg <job#>` — bring a background job to the foreground
- `command &` — launch a process directly in the background

---

### Task Scheduling
Tasks can be automated to run at specific times or regular intervals using **systemd timers** or **cron**.

#### systemd Timers
systemd timers require two unit files: a `.timer` and a `.service`.

**1. Create the timer unit** (`/etc/systemd/system/mytimer.timer`):
```
[Unit]
Description=My Timer

[Timer]
OnBootSec=3min
OnUnitActiveSec=1hour

[Install]
WantedBy=timers.target
```

**2. Create the service unit** (`/etc/systemd/system/mytimer.service`):
```
[Unit]
Description=My Service

[Service]
ExecStart=/full/path/to/my/script.sh

[Install]
WantedBy=multi-user.target
```

**3. Activate:**
```
sudo systemctl daemon-reload
sudo systemctl start mytimer.timer
sudo systemctl enable mytimer.timer
```

#### Cron
Cron is simpler than systemd timers — all jobs are stored in `crontab`. Edit with `crontab -e`.

Cron expression format: `Minute Hour DayOfMonth Month DayOfWeek /path/to/command`

| Field | Range | Notes |
|-------|-------|-------|
| Minute | 0–59 | |
| Hour | 0–23 | |
| Day of Month | 1–31 | |
| Month | 1–12 | |
| Day of Week | 0–7 | Sunday = 0 and 7 |

| Example | Meaning |
|---------|---------|
| `0 */6 * * * /path/to/script.sh` | Every 6 hours |
| `0 0 1 * * /path/to/script.sh` | First day of every month at midnight |
| `* * * * * /path/to/script.sh` | Every minute |

**systemd vs cron:** systemd offers more event triggers and options; cron is simpler and sufficient for most time-based scheduling.

---
## Related Concepts
- [[Linux Fundamentals]]
- [[Linux File System]]
- [[Boot and File Systems]]
- [[Operating System Fundamentals]]

## Related Techniques
-

---
## References / Images
- systemd documentation
- `man crontab`
