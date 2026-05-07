Tags: #Status/In-Progress #Type/Knowledge #Context/Network #publish-me

---
## Overview
Data transmission methods define how information is sent across communication channels. They can be digital or analog, use different frequencies or modulation schemes, and operate over various types of networks including telephone lines, fiber optics, and satellite links. Understanding these methods is critical for network design, bandwidth planning, and troubleshooting signal integrity.

---

## Terminology
| Term | Definition |
|------|------------|
| Simplex | One-way communication only (sender cannot receive) |
| Half-Duplex | Two-way communication, but only one direction at a time |
| Full-Duplex | Two-way communication simultaneously in both directions |
| Baseband | Single fixed digital frequency occupying the entire bandwidth |
| Broadband | Multiple analog signals transmitted simultaneously over the same medium |
| Digital Signaling | Uses binary 1s and 0s represented as electrical signals |
| Analog Signaling | Uses continuous waveforms (e.g., RF, audio) |
| Modem | MODulator/DEModulator — converts digital signals to analog and back |
| PSTN (Public Switched Telephone Network) | Global collection of voice-oriented telephone networks |
| POTS (Plain Old Telephone Service) | Traditional analog fixed-line telephone system; being phased out by 2030 |
| DSL (Digital Subscriber Line) | Modulation technology for sending data over copper PSTN lines |
| ATM (Asynchronous Transfer Mode) | High-speed network technology using fixed-size cells for LAN and WAN |
| SONET (Synchronous Optical Network) | Fiber-optic digital networking standard; multiplexes multiple signals |
| VSAT (Very Small Aperture Terminal) | Satellite service supporting data, voice, and video communications |
| LEO (Low Earth Orbit) | Most common satellite orbit; smallest footprint |
| GEO (Geosynchronous Equatorial Orbit) | Fixed above the equator; used for broadcasting and communications |

---
## Core Concepts

### Communication Direction
Defines whether a communication channel supports one-way or two-way data flow.

| Mode | Description | Example |
|------|-------------|---------|
| Simplex | One direction only; sender cannot receive | Broadcast TV, keyboard to computer |
| Half-Duplex | Both directions, but not simultaneously | Walkie-talkie, older Ethernet hubs |
| Full-Duplex | Both directions simultaneously | Phone call, modern Ethernet switches |

---
### Baseband vs Broadband
- **Baseband** — entire bandwidth dedicated to a single digital signal; common in Ethernet LANs
- **Broadband** — bandwidth divided among multiple analog signals; common in cable and DSL internet

### Modems and DSL
- Modems convert digital signals to analog for transmission over copper lines and back
- DSL leverages existing PSTN copper infrastructure for high-speed data transfer

| DSL Type | Description |
|----------|-------------|
| ADSL (Asymmetric DSL) | Residential; faster download than upload |
| SDSL (Symmetric DSL) | Equal upload and download speeds |
| VDSL (Very High Bitrate DSL) | Highest speed DSL variant |

### ATM and SONET
- **ATM** — uses fixed 53-byte cells for predictable, high-speed transmission; supports permanent and switched connections
- **SONET** — multiplexes multiple channels over fiber-optic cables; compatible with ATM; speeds measured in OC (Optical Carrier) ratings

### Satellite Communication
Different orbital types serve different coverage and latency needs.

| Orbit | Description |
|-------|-------------|
| LEO (Low Earth Orbit) | Most common; smallest footprint; lowest latency |
| MEO (Medium Earth Orbit) | Used for GPS; moderate footprint |
| HEO (Highly Elliptical Orbit) | Elongated orbit; requires multiple satellites for continuous coverage |
| GSO (Geosynchronous Orbit) | 24-hour orbit; constant footprint; used for communications |
| GEO (Geosynchronous Equatorial Orbit) | Fixed above the equator; used for broadcasting |

- **VSAT** networks allow remote terminals to communicate with central hubs via satellite

---
## Related Concepts
- [[Input and Output]]
- [[Data Representation]]
- [[Memory Architecture]]
- [[Networking Fundamentals]]

## Related Techniques
-

---
## References / Images
- ITU standards documentation
- Networking textbooks and vendor documentation
