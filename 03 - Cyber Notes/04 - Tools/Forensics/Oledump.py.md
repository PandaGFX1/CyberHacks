Tags: #Forensics #Tools #Commands 

Refer to: 

- Python tool that analyzes OLE2 files and conducts static analysis on potentially malicious Excel documents. 
- OLE2 Files: Commonly called Structured Storage or Compound File Binary Format. OLE stands for Object Linking and Embedding.
	- Typically used to store multiple data types, such as documents, spreadsheets, presentations, etc.
- Usage:
	- `oledump.py <file>`
	- `oledump.py <file> -s 4`: Selects to look at the 4th data stream
	- `oledump.py <file> -s 4 --vbadecompress`: Automatically decompress VBA macros from the selected data stream. Makes it not hex dump.
- Interpreting Results:
	- Reference Image: [[Pasted image 20250430064815.png|Oledump.py Output]]
	- Sets `A:` with a value of `xl/vbaProject.bin` which signifies that a VBA script might be embedded in the document.
	- The A (index) +Numbers are called data streams.
	- A Data Stream with the letter `M` means there is a Macro.