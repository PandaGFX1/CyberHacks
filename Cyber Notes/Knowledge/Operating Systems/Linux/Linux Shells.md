Tags: #Linux #Commands #Scripting #Tools 

Refer to: [[Linux Fundamentals]]

- Types of shells:
	- Reference Image: [[TryHackMe/Pasted image 20250402221743.png|Comparison Of Common Shells]]
	- `/etc/shells` contains all of the installed shells on the system.
	- Type name of shell to switch to it. EX: `zsh`
	- Permanently change default shell: `chsh -s /usr/bin/zsh`
- Shell Scripting:
	- Always start with a "shebang": `#!/bin/bash`or whichever shell is being used.
	- Must be named with a `.sh` extension
	- Variables: Stores a value
		- `read name`: Stores input in the $name variable.
	- Loops: Loop through and repeat
		- `for i in {1..10}; do echo $i; done`: Iterates from 1 to 10 and echo's the number.
	- Conditional Statements: If something happens, do this.
		- Reference Image:[[TryHackMe/Pasted image 20250402222204.png|Conditional Statements]]