Tags: #Status/Reference #Type/Knowledge #Context/Network #Context/Hardware #publish-me

---
## Overview
Network media and connections define the physical and wireless methods used to transmit data between devices. The three primary categories are copper cabling, fiber optic, and wireless — each with different standards, speeds, interference characteristics, and use cases.

---

## Terminology
| Term | Definition |
|------|------------|
| Ethernet | Wired networking standard using twisted pair or coaxial cabling (IEEE 802.3) |
| WiFi | Wireless networking standard (IEEE 802.11) |
| EMI (Electromagnetic Interference) | Electrical noise that disrupts signal transmission |
| RF Interference | Radio frequency noise that disrupts wireless or copper signals |
| UTP (Unshielded Twisted Pair) | Basic twisted pair cable with no additional shielding |
| STP (Shielded Twisted Pair) | Twisted pair cable with foil shielding to reduce interference |
| Straight-Through Cable | Twisted pair cable wired the same at both ends; connects different device types |
| Crossover Cable | Twisted pair cable with swapped wiring at one end; connects similar device types |
| WAP (Wireless Access Point) | Device that provides wireless network access via antenna |
| SSID (Service Set Identifier) | Name used to identify a wireless network; devices must match to connect |

---
## Core Concepts

### Copper Cabling
Uses electrical signals to pass data between devices.

#### Coaxial Cable
- Nearly obsolete for new LAN installations
- Still used for cable TV and residential internet
- Reduces induction, EMI, and RF interference

#### Twisted Pair Cabling
Multiple copper cables twisted into pairs to reduce interference.

| Type | Description | Common Use |
|------|-------------|------------|
| UTP (Unshielded Twisted Pair) | Basic twisted pair; no additional shielding | Home and office environments |
| STP (Shielded Twisted Pair) | Foil shield for additional interference reduction | Modern infrastructure, static environments |

#### Cable Wiring Standards
| Type | Wiring | Connects |
|------|--------|----------|
| Straight-Through | Same pin order at both ends | Different device types (e.g., PC to switch) |
| Crossover | Pins swapped at one end | Similar device types (e.g., PC to PC) |

### Fiber Optic
Transmits pulses of light rather than electrical signals through glass or plastic fiber.
- High bandwidth and high speed
- Communicates across long distances without signal degradation
- Immune to EMI and RF interference
- Part of the IEEE 802.3 Ethernet standard family

### Wireless Networking
Wireless transmission uses radio frequency (RF) signals to carry data through the air without physical cabling.

| Wireless Type | Description | Range / Use |
|---------------|-------------|-------------|
| Radio Waves | Most common; travels through walls and obstacles | Wi-Fi, Bluetooth, cellular |
| Infrared (IR) | Line-of-sight only; does not pass through walls | TV remotes, older IrDA devices |
| Microwaves | High-frequency; used for point-to-point links | Satellite, cellular backhaul |

#### Wi-Fi (IEEE 802.11)
- **WAP (Wireless Access Point)** — antenna-based device that provides wireless connectivity to endpoint devices
- **SSID (Service Set Identifier)** — name that identifies a wireless network; all wireless devices must share the same SSID to communicate

#### Cellular Networks
Mobile devices connect to cell towers rather than WAPs. Different generations of cellular technology define the frequency bands and capabilities available.

| Generation | Key Characteristics |
|------------|---------------------|
| 3G | Introduced mobile data; enabled basic internet access on phones |
| 4G / LTE | High-speed data; enables streaming and VoIP |
| 5G | Ultra-low latency; high throughput; supports IoT at scale |

- Cell towers use different frequencies for coverage range vs. throughput — lower frequencies travel farther but carry less data
- Cellular networks present greater security risks than wired connections due to the broadcast nature of RF transmission

---
## Related Concepts
- [[Networking Fundamentals]]
- [[LAN Topologies]]
- [[Data Transmission Methods]]
- [[OSI Model]]

## Related Techniques
-

---
## References / Images
- IEEE 802.3 and 802.11 standards documentation
- Copper vs fiber comparison diagrams
