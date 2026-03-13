Tags: #Defense #Tools #Web 

Refer to: [[Hashing Basics]] and [[Cryptography Basics]]

- CyberChef:
	- Web-based application designed to help with various operation tasks within a web browser. Known as a Swiss Army Knife for data.
	- Tasks range from simple encoding like XOR or Base64 to more complex operations such as AES encryption.
- Accessing the tool:
	- Online with a web browser
	- Local copy on your own machine through the web browser
- Navigating the interface:
	- Most of it is self explanatory.
	- You can add a whole folder or just a file as input
	- You can add multiple tabs as well
	- You can replace input with output
- Though Process:
	- Reference Image: [[Pasted image 20250424072611.png|CyberChef Thought Process]]
	- Step By Step:
		- Set a clear objective: `What do I want to accomplish?`
		- Put data into the input area
		- During research you find the text might be some for of encryption/encoding, so open that category and determine what it is.
		- Check output: `Have we achieved our result?`
- Categories of CyberChef:
	- Extractors:
		- Extract IP Addresses
		- Extract Email Addresses
		- Extract URLs
	- Date and Time:
		- From UNIX Timestamp
		- To UNIX Timestamp
	- Data Format:
		- From Base64
			- Manually:
				- Convert ASCII to Binary and Concatenate together
				- Separate into 6 characters each
				- Convert to Base64 using Base64 Index
		- URL Decode
		- From Base85
		- From Base58
		- ToBase62