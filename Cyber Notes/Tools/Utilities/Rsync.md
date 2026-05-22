Tags: #Status/In-Progress #Type/Tool #Context/Linux #publish-me

---
## Overview
Rsync is an open-source tool for fast, efficient file synchronization and backup — locally or over a network. It only transfers the portions of files that have changed, minimizing bandwidth and time. Rsync supports encryption via SSH and can be automated with cron for scheduled backups.

## Target / Context
Linux systems requiring file backup, synchronization between servers, or incremental backup workflows.

---
## Installation

> [!INFO]- Installation Commands:
> `sudo apt install rsync -y`

---
## Basic Usage

> [!INFO]- Basic Usage:
> Backup local directory to remote server:
> `rsync -av /path/to/source user@backup_server:/path/to/destination`
>
> Restore from remote backup:
> `rsync -av user@remote_host:/path/to/backup /path/to/local`

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-a` | Archive mode — preserves permissions, timestamps, symlinks, owner, group | `rsync -a src/ dst/` |
> | `-v` | Verbose — show detailed transfer progress | `rsync -av src/ dst/` |
> | `-z` | Compress data during transfer | `rsync -avz src/ dst/` |
> | `-e ssh` | Use SSH as the transport for encryption | `rsync -avz -e ssh src/ user@host:/dst/` |
> | `--backup` | Create incremental backups of changed files | `rsync --backup src/ dst/` |
> | `--backup-dir` | Specify directory to store incremental backups | `rsync --backup --backup-dir=/backups src/ dst/` |
> | `--delete` | Remove files from destination not present in source | `rsync --delete src/ dst/` |

---
## Common Use Cases

### Backup Local Directory to Remote Server

> [!INFO]- Commands:
> `rsync -av /path/to/mydirectory user@backup_server:/path/to/backup/directory`

### Encrypted Backup Over SSH with Incremental History

> [!INFO]- Commands:
> `rsync -avz -e ssh --backup --backup-dir=/path/to/backup/folder --delete /path/to/mydirectory user@backup_server:/path/to/backup/directory`

### Restore Backup from Remote

> [!INFO]- Commands:
> `rsync -av user@remote_host:/path/to/backup/directory /path/to/mydirectory`

### Automated Backup with Cron and SSH Keys
SSH key-based authentication is required for unattended backups.

> [!INFO]- Setup Commands:
> `ssh-keygen -t rsa -b 2048`
> `ssh-copy-id user@backup_server`
>
> Create script `RSYNC_Backup.sh`:
> ```
> #!/bin/bash
> rsync -avz -e ssh /path/to/mydirectory user@backup_server:/path/to/backup/directory
> ```
> `chmod +x RSYNC_Backup.sh`
>
> Add to crontab (`crontab -e`):
> `0 * * * * /path/to/RSYNC_Backup.sh`

### Pentesting — Footprint and Abuse Rsync
Rsync servers can expose file shares without requiring authentication. When credentials are found during a pentest, always try them against Rsync.

> [!INFO]- Commands:
> Detect Rsync service:
> `sudo nmap -sV -p 873 <target>`
>
> Probe for accessible shares (anonymous):
> `nc -nv 127.0.0.1 873`
>
> List contents of an open share:
> `rsync -av --list-only rsync://127.0.0.1/dev`
>
> Sync all files from an open share to attack host:
> `rsync -av rsync://127.0.0.1/dev`
>
> Sync via SSH (if server requires it):
> `rsync -av -e ssh rsync://127.0.0.1/dev`
>
> Sync via non-standard SSH port:
> `rsync -av -e "ssh -p2222" rsync://127.0.0.1/dev`

---
## Related Concepts
- [[Linux System Management]]
- [[Linux Networking]]

## Related Techniques
- [[Service Enumeration]]

## Related Playbooks
- [[Linux Pentest Playbook]]

---
## References / Images
- `man rsync`
- https://book.hacktricks.xyz/network-services-pentesting/873-pentesting-rsync
- https://phoenixnap.com/kb/how-to-rsync-over-ssh
