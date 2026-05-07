Tags: #Status/Complete #Type/Knowledge #Context/Web #publish-me

---
## Overview
JavaScript (JS) is a scripting language used to add interactivity and dynamic behavior to websites. It runs directly in the browser as an interpreted client-side language and works alongside HTML and CSS to enable dynamic content, user interaction, and client-side logic.

---

## Terminology
| Term | Definition |
|------|------------|
| Variable | Named storage location holding a value |
| Function | Reusable block of code designed to perform a specific task |
| Loop | Construct that repeatedly executes code while a condition is true |
| Control Flow | Determines the order of code execution based on conditions |
| Minification | Removes whitespace and comments to reduce file size |
| Obfuscation | Makes code harder to read by renaming variables and adding dummy logic |
| Deobfuscation | Reversing obfuscation to analyze and understand code |
| DOM | Document Object Model; browser's structured representation of an HTML page |

---
## Core Concepts

### Variables
Used to store data values for use throughout a script.

| Declaration | Scope | Notes |
|-------------|-------|-------|
| `var` | Function-scoped | Legacy; avoid in modern JS |
| `let` | Block-scoped | Preferred for mutable values |
| `const` | Block-scoped | Cannot be reassigned after declaration |

### Data Types
`string`, `number`, `boolean`, `null`, `undefined`, `object`

### Functions
- Block of code designed to perform a specific task
- Can be reused throughout a program
- Defined with `function name() {}` or as arrow functions `() => {}`

### Loops
Execute code repeatedly while a condition is true.

| Loop | Use Case |
|------|---------|
| `for` | Known number of iterations |
| `while` | Unknown number of iterations; checks condition first |
| `do...while` | Executes at least once before checking condition |

### Control Flow
| Structure | Description |
|-----------|-------------|
| `if-else` | Executes different code based on a condition |
| `switch` | Multi-branch decision structure for discrete values |

### Integrating JavaScript into HTML

#### Internal JavaScript
Embedded directly in HTML using `<script>` tags.
- In `<head>` — loads before page content
- In `<body>` — interacts with already-loaded elements

#### External JavaScript
Stored in `.js` files and linked via `<script src="file.js">` — improves organization and reusability.

**Quick identification:**
- `<script src="...">` → External JS file
- `<script> ... </script>` → Inline/Internal JS

### Dialogue Functions
Built-in browser functions for user interaction.

| Function | Description |
|----------|-------------|
| `alert()` | Displays a message to the user |
| `prompt()` | Requests text input from the user |
| `confirm()` | Returns `true` or `false` based on user choice |

> [!WARNING] Security Note
> These functions can be abused in XSS attacks — see [[XSS]]

### Minification & Obfuscation
| Technique | Purpose |
|-----------|---------|
| Minification | Reduces file size by removing spaces, comments, and newlines |
| Obfuscation | Makes code harder to reverse-engineer; common in malware |
| Deobfuscation | Reversing obfuscation to analyze code during security testing |

---
## Related Concepts
- [[Website Innerworkings]]
- [[HTTP & HTTPS]]

## Related Techniques
- [[XSS]]

---
## References / Images
- JavaScript function diagrams
- Loop and control flow visualizations
- Internal vs external JS integration examples
