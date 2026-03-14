Tags: #Exploitation #Tools #Commands #Linux 

Refer to: [[SQL Injection]] and [[OWASP Top 10 - 2021]] and [[SQL Fundamentals]]

- SQLMap:
	- Automated tool for detecting and exploiting SQL injection vulnerabilities.
- Usage with GET based testing:
	- **NOTE**: Sometimes you must inspect element to get the GET request URL.
	- PUT URL IN SINGLE QUOTES
	- Start by testing a url with: `-u`
	- Then enumerate the databases:
		- `sqlmap -u http://... --dbs`
	- Enumerate the tables:
		- `sqlmap -u http://... -D database_name --tables`
	- Dump Table Records:
		- `sqlmap -u http://... -D database_name -T table_name --dump`
- Usage with POST based testing (login forms, registration forms, etc):
	- First you must intercept a POST request on the login page and save it as a text file.
	- Use command to input the request saved in the text file:
		- `sqlmap -r intercepted_request.txt`
- Options:
	- `--help`: List all available flags to use.
	- `--wizard`: SQLMap will guide you through each step and ask questions
	- `--dbs`: Extract all database names
	- `-D database_name --tables`: Extract information about the tables.
	- `-D database_name -T table_name --dump`: Enumerate records in a table
	- `-u`: Test URLs
	- `-r`: Read a text file
	- `--level=5`: Preform in-depth scans.
- Identifying vulnerable URLs/requests:
	- Sometimes URL's use a GET parameter to retrieve data.
		- Example: `http://sqlmaptesting/search?cat=1`
	- Use SQLMap:
			- `sqlmap -u http://sqlmaptesting.thm/search/cat=1`
	- **NOTE**: GET Requests are not always made in the URL. 
		- To check: `Right Click -> Inspect -> Network -> Submit -> Copy Value Of Request`
