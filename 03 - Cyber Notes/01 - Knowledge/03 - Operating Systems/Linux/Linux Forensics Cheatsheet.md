Tags: #Commands #Tools #Linux 

Refer to: [[Linux Fundamentals]] and [[Linux Shells]]

Image: [[Linux-Forensics-Cheatsheet.pdf|Linux Forensics Cheatsheet]]
- Auth.log will show commands ran...
- `ls -la --ful-time`: Shows the full time a file was modified
	- Just use stat.
	- `ls -l`: Shows modification time
	- `ls -u`: Shows access time
	- `date`: Shows modified time
		- `date -r example.txt +"%Y-%m-%d-%H-%M-%S"`: Different formatting.