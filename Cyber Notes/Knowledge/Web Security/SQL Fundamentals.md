Tags: #Status/Complete #Type/Knowledge #Context/Web #publish-me

---
## Overview
SQL (Structured Query Language) is a programming language used to interact with relational databases. It stores, retrieves, and manipulates structured data organized in a table-based format. Understanding SQL is foundational for web development, database administration, and identifying injection vulnerabilities.

---

## Terminology
| Term | Definition |
|------|------------|
| Relational Database | Stores data in structured tables with defined relationships between them |
| NoSQL | Non-relational database storing data in flexible, non-tabular formats |
| Table | Collection of rows and columns storing structured data |
| Column | Defines an attribute and its data type within a table |
| Row | A single record within a table |
| Primary Key | Unique identifier for each record; only one per table |
| Foreign Key | Links records between two tables; multiple allowed per table |
| DBMS | Database Management System; software used to create and manage databases |
| CRUD | Create, Read, Update, Delete — the four basic database operations |
| Clause | SQL keyword used to filter or organize query results |

---
## Core Concepts

### Database Types
| Type | Structure | Best For |
|------|-----------|---------|
| Relational (SQL) | Tables with rows and columns | Structured, consistent data |
| Non-Relational (NoSQL) | Flexible non-tabular formats | Unstructured or user-generated data |

Common DBMS: MySQL, MariaDB, MongoDB, SQLite

### Table Structure
- **Columns** — define attributes and data types (`string`, `integer`, `float`, `date`)
- **Rows** — individual records stored in the table
- **Primary Key** — unique identifier per record; one per table
- **Foreign Key** — references a primary key in another table to link data; multiple allowed

### MySQL Usage

#### Connecting
`mysql` | `mysql -u root -p`

#### Database Operations
| Command | Description |
|---------|-------------|
| `CREATE DATABASE name;` | Create a new database |
| `SHOW DATABASES;` | List all databases |
| `USE name;` | Select a database to work with |
| `DROP DATABASE name;` | Delete a database |

#### Table Operations
| Command | Description |
|---------|-------------|
| `CREATE TABLE name (...);` | Create a new table |
| `SHOW TABLES;` | List all tables in current database |
| `DESCRIBE name;` | Show table structure and column types |
| `ALTER TABLE name;` | Modify an existing table |
| `DROP TABLE name;` | Delete a table |

#### CRUD Operations
| Operation | Command |
|-----------|---------|
| Create | `INSERT INTO table VALUES (...);` |
| Read (all) | `SELECT * FROM table;` |
| Read (specific) | `SELECT col1, col2 FROM table;` |
| Update | `UPDATE table SET col=value WHERE condition;` |
| Delete | `DELETE FROM table WHERE condition;` |

#### Clauses
| Clause | Purpose |
|--------|---------|
| `FROM` | Specifies the source table |
| `WHERE` | Filters rows by condition |
| `DISTINCT` | Returns only unique values |
| `GROUP BY` | Groups rows sharing a value |
| `ORDER BY` | Sorts results (ASC/DESC) |
| `HAVING` | Filters grouped results |

Examples: `SELECT DISTINCT name FROM books;` | `SELECT * FROM books ORDER BY published_date ASC;`

#### Operators
| Operator | Description |
|----------|-------------|
| `LIKE` | Pattern matching |
| `AND` | All conditions must be true |
| `OR` | At least one condition must be true |
| `NOT` | Negates a condition |
| `BETWEEN` | Value within a range |

Comparison: `=` `!=` `<` `>` `<=` `>=`

#### Functions
- String: `CONCAT()` `GROUP_CONCAT()` `SUBSTRING()` `LENGTH()`
- Aggregate: `COUNT()` `SUM()` `MAX()` `MIN()`

### SQLite Usage
| Command | Description |
|---------|-------------|
| `sqlite3 example.db` | Open a SQLite database |
| `.tables` | List all tables |
| `PRAGMA table_info(name);` | Show table structure |
| `SELECT * FROM name;` | Query all records |

---
## Related Concepts
- [[Website Innerworkings]]
- [[OWASP Top 10 - 2021]]

## Related Techniques
- [[SQL Injection]]

---
## References / Images
- Relational database structure diagrams
- SQL syntax reference examples
