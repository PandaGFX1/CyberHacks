Tags: #Status/Complete #Type/Knowledge #Context/Blueteam #publish-me

---
## Overview
Digital forensics applies systematic methods and procedures to investigate and solve cyber crimes. It aims to collect, analyze, and report evidence while preserving the integrity of the original data. The National Institute of Standards and Technology (NIST) defines general processes and frameworks for digital forensics cases across technology domains.

---

## Terminology
| Term | Definition |
|------|------------|
| Chain of Custody | Formal documentation tracking evidence from collection through presentation |
| Write Blocker | Hardware or software device preventing modification of source evidence |
| Forensic Image | Bit-by-bit copy of a storage device or memory preserving all data |
| Disk Image | Non-volatile forensic copy of a storage device (HDD, SSD) |
| Memory Image | Volatile forensic copy of RAM contents; must be collected before shutdown |
| EXIF Data | Metadata embedded in image files (camera, location, timestamp, etc.) |
| NIST | National Institute of Standards and Technology; defines digital forensics frameworks |

---
## Core Concepts

### The Four Phases of Digital Forensics
[[Assets/Images/Pasted image 20250414085312.png|4 Phases of Digital Forensics]]

| Phase | Description |
|-------|-------------|
| Collection | Identify all devices; collect data without tampering with originals |
| Examination | Filter and process large data volumes to isolate relevant information |
| Analysis | Correlate evidence from multiple sources; reconstruct chronological activity |
| Reporting | Document methodologies, findings, and recommendations in a formal report |

### Types of Digital Forensics
[[Assets/Images/Pasted image 20250414090333.png|Types of Digital Forensics]]

| Type | Focus |
|------|-------|
| Computer Forensics | Computers and storage devices |
| Mobile Forensics | Mobile devices — call records, messages, GPS data |
| Network Forensics | Network traffic logs and communications |
| Database Forensics | Database intrusions, data modification, or exfiltration |
| Cloud Forensics | Data stored on cloud infrastructure |
| Email Forensics | Phishing campaigns and fraudulent email activity |

### Evidence Acquisition
Evidence must be collected securely without modifying the original data.

#### Proper Authorization
- Obtain permission from relevant authorities before collecting evidence
- Forensic evidence may contain sensitive organizational or personal data

#### Chain of Custody
Formal documentation maintained throughout the investigation.

Required details:
- Description of evidence (name, type)
- Collector identity
- Date and time of collection
- Storage location
- Access times and accessors

Sample CoC form: https://www.nist.gov/document/sample-chain-custody-formdocx

#### Write Blockers
- Prevents any modification to source drives during imaging
- Ensures timestamps and files remain unaltered during collection

### Forensic Imaging
| Image Type | Source | Data Type |
|------------|--------|-----------|
| Disk Image | HDD, SSD | Non-volatile; persists without power |
| Memory Image | RAM | Volatile; must be collected before shutdown |

### Quick Reference — Metadata Commands
| Command | Purpose | Install |
|---------|---------|---------|
| `pdfinfo <file>` | Display metadata of PDF files | `sudo apt install poppler-utils` |
| `exiftool <file>` | Read EXIF metadata from image files | `sudo apt install libimage-exiftool-perl` |

---
## Related Concepts
- [[Defensive Security Intro]]
- [[Linux Forensics Playbook]]
- [[Incident Response Fundamentals]]

## Related Techniques
-

## Related Tools
- [[FTK Imager]]
- [[Autopsy]]
- [[Volatility 3]]

---
## References / Images
- [[Assets/Images/Pasted image 20250414085312.png|4 Phases of Digital Forensics]]
- [[Assets/Images/Pasted image 20250414090333.png|Types of Digital Forensics]]
- NIST Digital Forensics Framework
- Chain of Custody form: https://www.nist.gov/document/sample-chain-custody-formdocx
