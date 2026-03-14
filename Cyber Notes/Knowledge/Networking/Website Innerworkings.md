Tags: #Networking #Terminology 

Refer to: [[HTTP In Depth]] and [[Protocols]] and [[Packets and Frames]]

Reference Image: [[TryHackMe/Pasted image 20250402154451.png|Request and Response]] 

- Front-End (Client-Side): Way a browser renders a website
- Back-End (Server-Side): A server that processes your request and returns a response

- CSS: Used to make websites look pretty and dynamic by adding styling options.
- HyperText Markup Language (HTML): Language websites are written in. Uses elements (also known as tags) and tells browser how to display the content.
	- Reference Image: [[TryHackMe/Pasted image 20250402154758.png|HTML Snippet]]
	- `<!DOCTYPE HTML>`: Defines that the page is a HTML5 document for standardization.
	- `<html>`: Root element of the HTML page - all other elements come after
	- `<head>`: Element contains information about the page. EX: Page title
	- `<body>`: Element defines the HTML document's body. Only content inside the body is shown in browser.
	- `<h1>`: Large heading
	- `<p>`: Paragraph
	- Examples of attributes in elements:
		- `<img src="img/cat.jpg">`
		- `<p class="bold-text">`
		- `<p id="example">`
- JaveScript (JS): Allows pages to become interactive and control the functionality of web pages. Can dynamically updated the page in real time, so when an event occurs stuff can change.
	- Loaded within `<script>` tags or included remotely with the src attribute. EX: `<script src="/location/of/javascript_file.js"></script>`
	- Find a HTML element with the ID of "demo" and changes content to "Hack The Planet": `document.getElementByID("demo").innerHTML = "Hack The Planet";`
	- Changes the text of an element with the "demo" ID to "Button Clicked" after the button is clicked: `<button onclick='document.getElementById("demo").innerHTML = "Button Clicked";'>Click Me!</button>`
- Sensitive Data Exposure: Occurs when a website doesn't properly protect (or remove) sensitive information to the end user. Usually on the site's front-end source code.
	- Always review the source code and look for hidden credentials or links.
- HTML Injection: Vulnerability that occurs when unfiltered user input is displayed on the page. Unsanitized user input is often used in other frontend and backend functionality. This is client-side attack.
	- Reference Image: [[TryHackMe/Pasted image 20250402160028.png|HTML Injection]]
	- 