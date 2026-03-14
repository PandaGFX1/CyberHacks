Tags: #Forensics #Tools #Commands 

Refer to: 

- Used when dealing with memory images as evidence. Commands are executed to identify and extract specific artifacts from memory images.
- Usage:
	- `vol3 -f <memoryImage> <plugin>`
	- Example: `vol3 -f wcry.mem windows.pstree.PsTree`
	- `-q`: Quiet mode to not show results. Good for big usage of command.
- Plugins:
	- Most plugins are sort of in the name, such as `cmdline` shows the processes command line arguments.
	- Refer to: [Volatility Plugins](https://volatility3.readthedocs.io/en/stable/volatility3.plugins.html)
- Pre-Processing Results:
	- Allows for processing results of various different plugins simultaniously.
	- Run a loop statement: `for plugin in windows.malfind.Malfind windows.psscan.PsScan windows.pstree.PsTree windows.pslist.PsList windows.cmdline.CmdLine windows.filescan.FileScan windows.dlllist.DllList; do vol3 -q -f wcry.mem $plugin > wcry.$plugin.txt; done`
- Pre-Processing With Strings:
	- Extracting ASCII: `strings wcry.mem > wcry.strings.ascii.txt`
	- Extract Little-Endian: `strings -e 1 wcry.mem > wcry.strings.unicode_little_endian.txt`
	- Extract Big-Endian: `strings -e b wcry.mem > wcry.strings.unicode_big_endian.txt`