Tags: #Commands #Exploitation #Web

Refer to: [[SQL Fundamentals]] and [[Web Application Basics]] and [[OWASP Top 10 - 2021]] and [[SQLMap]]
- Database:
	- Collection of data that can be stored, modified, and retrieved. Store data from several applications in a structured format.
	- Managed by Database Management Systems (DBMS) such as: MySQL, PostgreSQL, SQLite, etc.
- SQL In Action:
	- You input credentials:
		- Username: `John`
		- Password: `Un#detectable444`
	- SQL Query Is Made:
		- `SELECT * FROM users WHERE username = 'John' AND password = 'Un@detectable444';`
- If a website lacks input validation, you can try SQL Injection:
	- Input credentials:
		- Username: `John`
		- Password: `abc' OR 1=1;-- -`
	- SQL Query Is Made:
		- `SELECT * FROM users WHERE username = 'John' AND password = 'abc' OR 1=1;-- -';`
- You can use SQLMap to automate detecting and exploiting SQL Injection vulnerabilites.