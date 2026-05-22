Tags: #Status/In-Progress #Type/Knowledge #Context/Linux #Context/Programming #publish-me

---
## Overview
Bash (Bourne Again Shell) is the default scripting language on most Unix-based systems. Unlike compiled programming languages, bash scripts are interpreted at runtime — the shell reads and executes each line without a compilation step. Scripts automate repetitive tasks and control program flow through conditionals, loops, and functions. Bash does not differentiate between data types — strings, integers, and booleans are all handled contextually.

---

## Terminology
| Term | Definition |
|------|------------|
| Shebang | First line of a script declaring the interpreter path, e.g. `#!/bin/bash` |
| Special Variable | Built-in bash variable with a predefined purpose (e.g. `$?`, `$#`, `$0`) |
| Exit Code | Numeric value returned by a process to indicate success (0) or failure (non-zero) |
| Array | Variable holding an ordered list of values, indexed starting at 0 |
| Function | Reusable named block of code that accepts parameters and returns an exit code |
| Interpreter | Program that reads and executes script code at runtime without compilation |
| Conditional Execution | Flow control that runs code only when a specified condition evaluates as true |
| xtrace | Bash debug mode (`-x`) that prints each command before executing it |

---
## Core Concepts

### Script Execution
Every bash script should begin with a shebang line declaring which interpreter to use:

`#!/bin/bash` — for bash specifically
`#!/usr/bin/env bash` — portable shebang that searches PATH for bash

Three ways to execute a script:
- `bash script.sh <arguments>` — explicitly invoke bash
- `sh script.sh <arguments>` — use the system POSIX shell
- `./script.sh` — run directly (requires execute permission: `chmod +x script.sh`)

A script is executed by the interpreter — it does not create its own process the way compiled programs do.

---

### Arguments, Variables, and Arrays

#### Arguments
Up to 9 arguments can be passed to a script at runtime (`$1`–`$9`). `$0` is reserved for the script name itself.

#### Special Variables
| Variable | Meaning |
|----------|---------|
| `$0` | Script name |
| `$1`–`$9` | Positional arguments passed at runtime |
| `$#` | Total count of arguments passed |
| `$@` | All arguments as a list |
| `$$` | PID of the currently running process |
| `$?` | Exit status of the last command (0 = success, non-zero = failure) |

#### Variables
- Assign: `name=value` (no spaces around `=`)
- Reference: `$name`
- Assign from argument: `domain=$1`
- All variables are global by default — use `local` inside functions to prevent collisions

#### Arrays
- Assign: `servers=(web1 web2 web3)`
- Access by index: `echo ${servers[0]}` → `web1`
- Indices start at 0
- Quote values containing spaces to treat them as a single element

---

### Comparison Operators

#### String Operators
| Operator | Meaning |
|----------|---------|
| `==` | Equal to |
| `!=` | Not equal to |
| `<` | Less than (ASCII order) — requires `[[ ]]` |
| `>` | Greater than (ASCII order) — requires `[[ ]]` |
| `-z` | String is empty (null) |
| `-n` | String is not empty |

Always quote string variables to avoid word-splitting: `if [[ "$var" == "value" ]]`

Use `man ascii` to compare character ASCII values when working with `<` and `>` string comparisons.

#### Integer Operators
| Operator | Meaning |
|----------|---------|
| `-eq` | Equal to |
| `-ne` | Not equal to |
| `-lt` | Less than |
| `-le` | Less than or equal to |
| `-gt` | Greater than |
| `-ge` | Greater than or equal to |

Example: `if [ $# -lt 1 ]` — checks whether fewer than 1 argument was passed.

#### File Operators
| Operator | Meaning |
|----------|---------|
| `-e` | File or directory exists |
| `-f` | Is a regular file |
| `-d` | Is a directory |
| `-L` | Is a symbolic link |
| `-N` | File was modified since last read |
| `-O` | Current user owns the file |
| `-G` | File's group ID matches current user's group |
| `-s` | File size is greater than 0 |
| `-r` | File has read permission |
| `-w` | File has write permission |
| `-x` | File has execute permission |

Example: `if [ -e "$1" ]` — checks whether the argument passed to the script exists on disk.

#### Logical Operators
| Operator | Meaning |
|----------|---------|
| `!` | Logical NOT — negates the condition |
| `&&` | Logical AND — both conditions must be true |
| `\|\|` | Logical OR — either condition can be true |

Example: `if [[ -e "$1" && -r "$1" ]]` — file exists and is readable.

---

### Arithmetic
Use `$(( ))` for arithmetic evaluation. Bash performs integer division — there are no floating point results.

| Operator | Operation |
|----------|-----------|
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division (integer) |
| `%` | Modulus (remainder) |
| `variable++` | Increment by 1 |
| `variable--` | Decrement by 1 |

- Evaluate: `echo $((10 + 10))` → `20`
- Increment in-place: `((counter++))`
- Get string/variable length: `echo ${#variable}`

---

### Input and Output

#### Reading User Input
`read -p "Select your option: " opt` — displays a prompt on the same line and stores the result in `$opt`.

#### Output with tee
`tee` writes to both stdout and a file simultaneously. The `-a` / `--append` flag prevents overwriting existing content:

`result=$(command | tee -a output.txt)` — displays output, appends to file, and captures to variable.

---

### Flow Control — Loops

#### For Loop
Iterates over a list, range, or array until data is exhausted:

- List: `for ip in 10.10.10.1 10.10.10.2; do ping -c 1 $ip; done`
- Range: `for i in {1..10}; do echo $i; done`
- Array: `for item in "${array[@]}"; do echo $item; done`

#### While Loop
Executes as long as a condition remains true. Requires a counter or state change to avoid an infinite loop:

`while [ $stat -eq 1 ]; do ((stat--)); done`

`break` exits the loop immediately. `continue` skips to the next iteration.

#### Until Loop
The inverse of while — executes until a condition becomes true:

`until [ $counter -eq 10 ]; do ((counter++)); done`

Until loops are uncommon; while loops are preferred in most cases.

---

### Flow Control — Branches

#### If / Elif / Else
```
if [ condition ]
then
    commands
elif [ other_condition ]
then
    commands
else
    commands
fi
```

- `if` — evaluates a single condition
- `elif` — adds an alternative condition if the first is false
- `else` — catches anything that did not match

#### Case Statements
Equivalent to `switch-case` in C or C#. Unlike if-else, case compares a variable against exact patterns only:

```
case $opt in
    "1") function_one ;;
    "2") function_two ;;
    "*") exit 0 ;;
esac
```

Each pattern ends with `;;`. The `"*"` pattern is the catch-all default.

---

### Functions

#### Definition
Functions must be defined before they are called — scripts execute top to bottom, so functions belong at the top of the file.

Method 1 — keyword syntax:
```
function name {
    commands
}
```

Method 2 — POSIX syntax:
```
name() {
    commands
}
```

Call a function by name (no `$`): `name`

#### Parameter Passing
Function parameters work identically to script arguments. Inside the function, `$1`, `$2`, etc. refer to the function's own parameters, not the script's:

```
function greet {
    echo "Hello $1"
}
greet "Noah"
```

#### Variable Scope
Bash variables are global by default. Declare `local` variables inside functions to prevent them from leaking into the rest of the script or colliding with other function variables:

`local result="value"`

#### Return Values
Functions return an exit code (0–255) accessible via `$?`. To return data, use `echo` and capture with command substitution: `output=$(my_function)`.

| Exit Code | Meaning |
|-----------|---------|
| `0` | Success |
| `1` | General error |
| `2` | Misuse of shell built-ins |
| `126` | Command cannot execute |
| `127` | Command not found |
| `128` | Invalid exit argument |
| `128+n` | Fatal signal `n` received |
| `130` | Terminated by Ctrl+C |
| `255` | Exit status out of range |

---

### Debugging
Bash provides built-in debugging flags that can be combined:

- `-x` (xtrace) — prints each command and its expanded arguments before execution
- `-v` (verbose) — prints each line of the script as it is read by the interpreter

Run: `bash -x -v script.sh`

Debugging can also expose how a program handles unexpected input — useful when tracing how malformed values propagate through execution paths.

---

### Reference Script

The following script demonstrates arguments, functions, loops, conditionals, tee, read, and case in a practical context. It resolves a domain to IP addresses, queries WHOIS for network ranges, and pings discovered hosts.

> [!INFO]- CIDR.sh — Domain CIDR Discovery Script
> ```bash
> #!/bin/bash
> 
> # Check for given arguments
> if [ $# -eq 0 ]
> then
>     echo -e "You need to specify the target domain.\n"
>     echo -e "Usage:\n\t$0 <domain>"
>     exit 1
> else
>     domain=$1
> fi
> 
> # Identify network range for the specified IP address(es)
> function network_range {
>     for ip in $ipaddr
>     do
>         netrange=$(whois $ip | grep "NetRange\|CIDR" | tee -a CIDR.txt)
>         cidr=$(whois $ip | grep "CIDR" | awk '{print $2}')
>         cidr_ips=$(prips $cidr)
>         echo -e "\nNetRange for $ip:"
>         echo -e "$netrange"
>     done
> }
> 
> # Ping discovered IP address(es)
> function ping_host {
>     hosts_up=0
>     hosts_total=0
> 
>     echo -e "\nPinging host(s):"
>     for host in $cidr_ips
>     do
>         stat=1
>         while [ $stat -eq 1 ]
>         do
>             ping -c 2 $host > /dev/null 2>&1
>             if [ $? -eq 0 ]
>             then
>                 echo "$host is up."
>                 ((stat--))
>                 ((hosts_up++))
>                 ((hosts_total++))
>             else
>                 echo "$host is down."
>                 ((stat--))
>                 ((hosts_total++))
>             fi
>         done
>     done
> 
>     echo -e "\n$hosts_up out of $hosts_total hosts are up."
> }
> 
> # Resolve domain to IP addresses
> hosts=$(host $domain | grep "has address" | cut -d" " -f4 | tee discovered_hosts.txt)
> echo -e "Discovered IP address:\n$hosts\n"
> ipaddr=$(host $domain | grep "has address" | cut -d" " -f4 | tr "\n" " ")
> 
> # Menu
> echo -e "Additional options available:"
> echo -e "\t1) Identify the corresponding network range of target domain."
> echo -e "\t2) Ping discovered hosts."
> echo -e "\t3) All checks."
> echo -e "\t*) Exit.\n"
> 
> read -p "Select your option: " opt
> 
> case $opt in
>     "1") network_range ;;
>     "2") ping_host ;;
>     "3") network_range && ping_host ;;
>     "*") exit 0 ;;
> esac
> ```

---

## Related Concepts
- [[Linux Shells]]
- [[Linux System Management]]
- [[Linux Fundamentals]]

## Related Techniques
-

---
## References / Images
- https://www.gnu.org/software/bash/manual/bash.html
- `man bash`
