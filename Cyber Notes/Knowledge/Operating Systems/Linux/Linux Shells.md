Tags: #Status/In-Progress #Type/Knowledge #Context/Linux #Context/Programming #publish-me

---
## Overview
Linux shells provide the command-line interface between the user and the operating system. Different shell types offer varying features, scripting capabilities, and user experiences. The shell prompt is configurable and communicates context (user, host, directory). Shell scripting allows automation of repetitive tasks through executable script files.

---

## Terminology
| Term | Definition |
|------|------------|
| Shell | Command-line interface for interacting with the OS |
| PS1 | Environment variable that controls how the shell prompt is displayed |
| Shebang | First line of a script declaring which interpreter to use (e.g., `#!/bin/bash`) |
| Variable | Named storage location holding a value within a script or session |
| Loop | Programming construct that repeats a block of code |
| Conditional Statement | Logic that executes code only when a condition is met |
| chsh | Command to change a user's default shell |
| Man Page | Built-in documentation for commands accessed via `man` |

---
## Core Concepts

### Shell Types
`/etc/shells` contains all shells installed on the system.

- Switch to a different shell temporarily by typing its name: `zsh`
- Permanently change default shell: `chsh -s /usr/bin/zsh`

| Shell | Description |
|-------|-------------|
| `bash` | Bourne Again Shell — default on most Linux distros |
| `zsh` | Extended bash with better completion and plugins |
| `fish` | User-friendly shell with syntax highlighting |
| `sh` | POSIX-compliant minimal shell |
| `ksh` | Korn shell — common on enterprise UNIX systems |

---

### Prompt Description
The shell prompt communicates context. Root uses `#`; regular users use `$`. The home directory is represented by `~`.

The `PS1` variable in `.bashrc` controls prompt appearance. Common special characters:

| Character | Meaning |
|-----------|---------|
| `\u` | Current username |
| `\h` | Hostname (short) |
| `\w` | Full current working directory |
| `\W` | Current directory name only |
| `\$` | `#` if root, `$` otherwise |
| `\t` | Current time (HH:MM:SS) |
| `\d` | Current date |

Example: `PS1="\u@\h:\w\$ "` → displays `user@host:/current/dir$ `

Edit `.bashrc` to make prompt changes persistent. Resources:
- https://bash-prompt-generator.org/ — visual PS1 builder
- https://github.com/powerline/powerline — advanced prompt framework

---

### Getting Help
| Command | Description |
|---------|-------------|
| `man <tool>` | Full manual page for a command — comprehensive reference |
| `<tool> --help` | Quick help output — faster than man for common flags |
| `<tool> -h` | Short help — supported by some tools as an alias for `--help` |
| `apropos <keyword>` | Search all man page descriptions for a keyword |

`apropos` is useful when you know what you want to do but not which command to use.
Resource: https://explainshell.com/ — paste any command to get a breakdown of every component.

---

### Keyboard Shortcuts

#### Cursor Movement
| Shortcut | Action |
|----------|--------|
| `[CTRL] + A` | Move cursor to beginning of line |
| `[CTRL] + E` | Move cursor to end of line |
| `[CTRL] + ←` / `[CTRL] + →` | Jump backward/forward one word |

#### Editing the Current Line
| Shortcut | Action |
|----------|--------|
| `[CTRL] + U` | Erase from cursor to beginning of line |
| `[CTRL] + K` | Erase from cursor to end of line |
| `[CTRL] + W` | Erase the word before the cursor |
| `[CTRL] + Y` | Paste the last erased text |

#### Process Control
| Shortcut | Action |
|----------|--------|
| `[CTRL] + C` | Terminate current process (sends SIGINT) |
| `[CTRL] + Z` | Suspend current process (sends SIGTSTP) |
| `[CTRL] + D` | Close STDIN / send EOF (End-of-Transmission) |

#### Navigation and Display
| Shortcut | Action |
|----------|--------|
| `[CTRL] + L` | Clear the terminal (same as `clear`) |
| `[CTRL] + R` | Search command history interactively |
| `[↑]` / `[↓]` | Navigate command history |
| `[TAB]` | Auto-complete command, file, or directory name |
| `[ALT] + [TAB]` | Switch between open applications |

#### Zoom
| Shortcut | Action |
|----------|--------|
| `[CTRL] + [+]` | Zoom in |
| `[CTRL] + [-]` | Zoom out |

---

### Shell Scripting
Full coverage of bash scripting — variables, loops, conditionals, functions, operators, and debugging — is documented in [[Shell Scripting]].

---
## Related Concepts
- [[Linux Fundamentals]]
- [[Linux System Management]]
- [[Shell Scripting]]

## Related Techniques
-

---
## References / Images
- GNU Bash documentation
- https://bash-prompt-generator.org/
- https://github.com/powerline/powerline
- https://explainshell.com/
