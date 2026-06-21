---
title: "Web APIs"
category: "knowledge"
tags: []
excerpt: "A Web API (Application Programming Interface) is a set of rules that allows different software systems to communicate..."
date: "2026-05-11"
---

---
## Overview
A Web API (Application Programming Interface) is a set of rules that allows different software systems to communicate over the web. Web APIs act as the layer between a client (browser, mobile app, or another server) and a server's data or functionality — defining what requests the server accepts, what format the data takes, and what the server will return. Understanding web APIs is essential for web security testing because APIs often expose sensitive functionality with weaker authentication than the main application, and may contain hidden or undocumented endpoints.

---

## Terminology
| Term | Definition |
|------|------------|
| API | Application Programming Interface — a contract defining how two systems communicate |
| Endpoint | A specific URL the server is configured to receive requests on and route to a handler |
| REST | Representational State Transfer — an architectural style using HTTP methods on resource URLs |
| SOAP | Simple Object Access Protocol — XML-based messaging standard with formal structure |
| GraphQL | A query language and runtime that serves all requests through a single endpoint |
| WSDL | Web Services Description Language — XML file describing a SOAP API's operations and parameters |
| Introspection | GraphQL feature that lets clients query the schema itself to discover all available types and operations |
| JSON | JavaScript Object Notation — lightweight data format most REST APIs use for responses |
| XML | eXtensible Markup Language — structured data format used by SOAP and some REST APIs |
| CRUD | Create, Read, Update, Delete — the four standard operations REST maps to HTTP methods |

---
## Core Concepts

### What Is an Endpoint?

This is a common source of confusion. An endpoint is **not** a separate program and it is not a standalone listener. Here is how it actually works:

A web server **is** a program running on the machine and listening on a port (usually 80 for HTTP or 443 for HTTPS). That server stays running and handles every incoming request. An **endpoint** is simply a routing rule inside that server — a configuration entry that says "if a request comes in for this URL path, run this piece of code and return the result."

Think of it like a call centre:
- The call centre building = the web server (always running, always answering)
- The phone number = the IP address and port
- The menu options ("press 1 for billing, press 2 for support") = endpoints (routes the server knows about)
- When you press 2 = sending a `GET /support` request
- The support agent who picks up and reads from their knowledge base = the server-side code that runs, queries a database, and returns JSON

When a request hits `/users/123`, nothing new starts up. The already-running web server reads the URL path, matches it to a configured route, executes the associated handler function, and sends back the response — usually JSON or XML. The "endpoint" is just the address for that route, not a machine or a listener of its own.

---

### REST — Representational State Transfer
REST is the dominant API style for web applications. It organises data as **resources** identified by unique URLs, and uses standard HTTP methods to define what action to take on that resource.

#### HTTP Methods → CRUD
| HTTP Method | CRUD Operation | Example |
|-------------|----------------|---------|
| `GET` | Read | `GET /users/123` — retrieve user 123 |
| `POST` | Create | `POST /users` — create a new user |
| `PUT` | Update (full) | `PUT /users/123` — replace user 123 |
| `PATCH` | Update (partial) | `PATCH /users/123` — update one field |
| `DELETE` | Delete | `DELETE /users/123` — delete user 123 |

#### REST Endpoint Structure
REST endpoints follow a hierarchical URL pattern representing resources:

| URL | Meaning |
|-----|---------|
| `/users` | Collection of all users |
| `/users/123` | Specific user with ID 123 |
| `/users/123/posts` | Posts belonging to user 123 |
| `/products/456/reviews` | Reviews for product 456 |

#### REST Parameter Types
| Parameter Type | Location | Purpose | Example |
|----------------|----------|---------|---------|
| Query Parameters | URL after `?` | Filtering, sorting, pagination | `/users?limit=10&sort=name` |
| Path Parameters | Embedded in URL | Identify a specific resource | `/products/{id}` |
| Request Body | POST/PUT/PATCH body | Create or update a resource | `{ "name": "New Product", "price": 99.99 }` |

---

### SOAP — Simple Object Access Protocol
SOAP is a formal, XML-based messaging standard. Unlike REST's multiple endpoints, a SOAP API typically exposes **a single URL** — the content of the XML message determines what operation is performed. SOAP includes built-in support for security, reliability, and transaction management, which makes it common in enterprise and financial systems.

SOAP messages are wrapped in an **Envelope** structure:

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Header/>
    <soapenv:Body>
        <lib:SearchBooks>
            <lib:keywords>cybersecurity</lib:keywords>
            <lib:author>Dan Kaminsky</lib:author>
        </lib:SearchBooks>
    </soapenv:Body>
</soapenv:Envelope>
```

The **WSDL file** (Web Services Description Language) describes the full API — available operations, input/output parameters, data types, and the endpoint URL. WSDL analysis is the first step when targeting a SOAP API.

---

### GraphQL
GraphQL is a query language and server runtime that exposes a **single endpoint** (typically `/graphql`) through which clients make all requests. Unlike REST, the client specifies exactly what data it wants — no over-fetching (getting more than needed) or under-fetching (having to make multiple requests).

#### Queries — Fetch Data
```
query {
    user(id: 123) {
        name
        email
        posts(limit: 5) {
            title
            body
        }
    }
}
```
This retrieves the name, email, and first 5 post titles/bodies for user 123 in a single request.

#### Mutations — Modify Data
```
mutation {
    createPost(title: "New Post", body: "Content here") {
        id
        title
    }
}
```
Creates a new post and returns its `id` and `title`.

#### GraphQL Parameter Components
| Component | Description | Example |
|-----------|-------------|---------|
| Field | A specific piece of data to retrieve | `name`, `email` |
| Argument | Modifies a query — for filtering or pagination | `posts(limit: 5)` |
| Relationship | A connection between data types | `user → posts` |
| Nested Object | A field that returns another object | `posts { title, body }` |

---

### API vs Web Server
| Feature | Web Server | API |
|---------|-----------|-----|
| Purpose | Serve HTML/CSS/JS pages | Exchange structured data between systems |
| Data Format | HTML, images, static files | JSON, XML |
| Primary Consumer | Human users via browser | Other applications and services |
| Access | Usually public | Public, private, or partner-restricted |
| Example | `https://example.com` serving a login page | `GET /api/users/123` returning `{"name":"Alice"}` |

---

### Endpoint Discovery Methods
Finding API endpoints — both documented and hidden — is the first step in API testing.

| Method | What It Reveals |
|--------|----------------|
| API Documentation (Swagger/OpenAPI/RAML) | All documented endpoints, parameters, expected formats |
| WSDL Analysis (SOAP) | All operations, input/output parameters, data types |
| GraphQL Introspection | Full schema — types, fields, queries, mutations |
| Network Traffic Analysis | Actual endpoints used by the application in practice |
| Parameter Name Fuzzing | Hidden or undocumented endpoints via wordlist brute-force |
| JavaScript Source Review | Frontend code often contains API routes in fetch/axios calls |

---
## Related Concepts
- [HTTP & HTTPS](/knowledge/Networking/HTTP-HTTPS)
- [OWASP Top 10 - 2021](/knowledge/Web-Security/OWASP-Top-10---2021)
- [SQL Fundamentals](/knowledge/Web-Security/SQL-Fundamentals)

## Related Techniques
- [API Fuzzing](/techniques/API-Fuzzing)
- [SQL Injection](/techniques/SQL-Injection)

## Related Tools
- [ffuf](/tools/Web-Testing/ffuf)
- [wenum](/tools/Web-Testing/wenum)
- [Burp Suite](/tools/Web-Testing/Burp-Suite/Burp-Suite)

---
## References / Images
-
