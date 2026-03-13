Tags: #Commands #Windows #Tools 

Refer to: [[Windows Fundamentals]]

- Commands:
	- `control /name Microsoft.WindowsUpdate`L Access Windows Update Panel
	- `set`: Check your path variable
	- `ver`: Determine the OS version
	- `systeminfo`: System OS information
	- `driverquery`: Driver information
	- `more`: List page by page
	- `ipconfig`: Shows ip information
		- `ipconfig /all`: Shows more information
	- `ping www.example.com`: Simple ping
	- `tracert www.example.com`: Shows traceroute
	- `nslookup example.com`: Standard nslookup.
		- Refer to [[nslookup]]
	- `netstat`: Shows network connections and listening ports
		- `-a`: All established listening connections and ports
		- `-b`: Shows program associated with each listening port and connection
		- `-o`: Shows the process ID (PID) associated with connection
		- `-n`: Uses a numbercal form for addresses and port numbers
	- `dir`: View what is in your current directory
		- `/a`: Shows hidden and system files
		- `/s`: Shows files in the current directory and all sub directories.
	- `tree`: More graphic listing of everything underneath.
	- `type`: Easily view text files
	- `copy`: Copy files.
	- `move`: Move file
	- `del` or `erase`: Delete a file
	- `tasklist`: Shows running processes
		- `tasklist /?`: help page
		- `tasklist /FI "imagename eq sshd.exe`: filter by image name equals
	- `taskkill /PID target`: Kill a process by it's PID.
	- `findstr`: Looks for a string. Essentially, grep.
	- `tasklist /m /fi "pid eq 1304"`: Matches a PID and shows the Modules (.dll's) associated with that process.