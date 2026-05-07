#Status/In-Progress #Type/Knowledge #Context/Web #publish-me

---
## Overview
WordPress is an open-source Content Management System (CMS) written in PHP, typically running on an Apache or Nginx web server with a MySQL database backend. It powers roughly one-third of all websites on the internet. WordPress is highly extensible through plugins and themes, which also make it one of the most commonly targeted web applications — most vulnerabilities arise from outdated or poorly written third-party extensions rather than the WordPress core itself.

---

## Terminology
| Term | Definition |
|------|------------|
| CMS | Content Management System; a platform for building and managing website content without writing code from scratch |
| CMA | Content Management Application; the admin interface where content is created and managed |
| CDA | Content Delivery Application; the backend layer that takes CMA input and renders it as a live website |
| Plugin | Modular add-on that extends WordPress functionality (e.g., contact forms, SEO tools, e-commerce) |
| Theme | Controls the visual presentation and layout of a WordPress site |
| LAMP Stack | Linux + Apache + MySQL + PHP — the standard server stack WordPress runs on |
| xmlrpc.php | Legacy WordPress file enabling XML-over-HTTP API access; frequently abused for brute force and exploitation |
| wp-config.php | WordPress configuration file containing database credentials and security keys |
| wp-content | Primary directory storing all plugins, themes, and uploaded media |
| Directory Indexing | Web server feature that lists directory contents when no index file exists; a misconfiguration that exposes file structure |
| REST API | WordPress's modern remote API (replaced xmlrpc.php); accessible at `/wp-json/` |

---
## Core Concepts

### Architecture
WordPress requires a fully installed LAMP stack. The application files are typically served from `/var/www/html/`. WordPress communicates with its MySQL database to store and retrieve all content, users, and settings.

### Key Files
| File | Purpose |
|------|---------|
| `index.php` | Site homepage entry point |
| `license.txt` | May disclose the installed WordPress version |
| `wp-activate.php` | Email activation handler for new accounts |
| `wp-config.php` | Database connection details (DB name, host, credentials), authentication keys and salts, and table prefix |
| `xmlrpc.php` | Legacy XML-RPC API; not required in modern WordPress and should be disabled if unused |

#### Login Page Locations
WordPress admin login can be found at any of the following paths (and may be renamed by admins to obscure it):
- `/wp-admin/login.php`
- `/wp-admin/wp-login.php`
- `/login.php`
- `/wp-login.php`

### Key Directories
| Directory | Contents |
|-----------|----------|
| `wp-content/` | All plugins, themes, and user-uploaded files |
| `wp-content/plugins/` | Installed plugins — each in its own subdirectory |
| `wp-content/themes/` | Installed themes |
| `wp-content/uploads/` | User-uploaded media |
| `wp-includes/` | WordPress core library files (not themes, not admin components) |

### User Roles
WordPress has five default user roles with distinct permission levels:

| Role | Permissions |
|------|-------------|
| Administrator | Full access — add/delete users, install plugins/themes, edit source code |
| Editor | Publish and manage all posts, including other users' posts |
| Author | Publish and manage their own posts only |
| Contributor | Write and manage their own posts, but cannot publish them |
| Subscriber | Browse posts and edit their own profile only |

Administrator-level access is the most valuable account to compromise — it enables direct code execution via the theme editor.

### Security Concerns
- **Outdated plugins and themes** are the primary attack surface; most CVEs target third-party extensions, not the core
- **xmlrpc.php** enables remote procedure calls and is commonly abused for credential brute-forcing; if unused, it should be disabled
- **Directory indexing** on `wp-content/plugins/` exposes plugin names and versions even for deactivated plugins
- **User enumeration** is trivial by default via author URL parameters and the REST API (`/wp-json/wp/v2/users`)
- **Default admin username** (`admin`) is predictable and a common brute-force starting point

Enumerate and exploit WordPress targets using [[WordPress Attacks]] and [[WPScan]].

---
## Hardening

### Updates
Keep WordPress core, all plugins, and all themes up to date. Enable automatic background updates via `wp-config.php`:
```
define( 'WP_AUTO_UPDATE_CORE', true );
add_filter( 'auto_update_plugin', '__return_true' );
add_filter( 'auto_update_theme', '__return_true' );
```

### Plugin & Theme Management
- Only install plugins and themes from WordPress.org; review ratings, install count, and last update date before installing
- Remove unused plugins and themes completely — deactivated plugins are still accessible via directory indexing

### Security Plugins
| Plugin | Capabilities |
|--------|-------------|
| Sucuri Security | File integrity monitoring, malware scanning, blacklist monitoring |
| iThemes Security | 30+ hardening measures including brute-force protection |
| Wordfence Security | Endpoint firewall and malware scanner with real-time threat intelligence |

### User Management
- Rename or delete the default `admin` account; use unpredictable usernames
- Enforce strong passwords for all accounts
- Enable two-factor authentication (2FA) for all users, especially admins
- Apply least privilege — don't assign Administrator when Editor or Contributor is sufficient
- Periodically audit accounts and revoke unused access

### Configuration
- Use a plugin or `.htaccess` rule to block user enumeration
- Limit login attempts to prevent brute-forcing
- Rename or relocate `wp-login.php` — moving it off the default path prevents automated scanners from finding it

---
## Related Concepts
- [[OWASP Top 10 - 2021]]
- [[Website Innerworkings]]

## Related Techniques
- [[WordPress Attacks]]

---
## References / Images
- https://wordpress.org/documentation/
- https://developer.wordpress.org/rest-api/
