Tags: #Status/In-Progress #Type/Knowledge #Context/Network #publish-me

---
## Overview
LAN topologies define the physical and logical layout of devices within a local area network. Topology choice directly affects performance, scalability, fault tolerance, and security — making it a foundational concept for network design and troubleshooting.

---

## Terminology
| Term | Definition |
|------|------------|
| Star Topology | Devices connect to a central switch or hub; reliable and scalable but higher cost |
| Bus Topology | Single backbone cable shared by all devices; cost-efficient but prone to congestion |
| Ring Topology | Devices form a closed loop; data circulates sequentially; single point of failure risk |
| VLAN (Virtual LAN) | Logical segmentation of network devices independent of physical location |
| Physical Topology | The actual physical layout and cabling of the network |
| Logical Topology | How data flows through the network, regardless of physical layout |

---
## Core Concepts

### Star Topology
[[Assets/Images/Pasted image 20250401154618.png|Star Topology]]

- All devices connect to a central switch or hub
- **Advantages:** Reliable, scalable, easy to add/remove devices
- **Disadvantages:** Higher cost, central device is a single point of failure

### Bus Topology
[[Assets/Images/Pasted image 20250401154742.png|Bus Topology]]

- All devices share a single backbone cable
- **Advantages:** Simple, inexpensive, easy to implement
- **Disadvantages:** Prone to congestion, difficult to troubleshoot, backbone failure affects all devices

### Ring Topology
[[Assets/Images/Pasted image 20250401154958.png|Ring Topology]]

- Devices form a closed loop; data travels sequentially from device to device
- **Advantages:** Efficient cable use, easier to isolate faults than bus
- **Disadvantages:** Single point of failure; one broken link can disrupt the entire network

### VLAN (Virtual LAN)
[[Assets/Images/Pasted image 20250401194935.png|VLAN Topology]]

- Logical segmentation of devices independent of physical location
- Devices on the same VLAN communicate as if on the same physical network
- **Advantages:** Enhances security, improves traffic management, supports policy enforcement
- Requires managed switches to implement

### Performance Comparison
| Topology | Reliability | Cost | Scalability | Troubleshooting |
|----------|-------------|------|-------------|-----------------|
| Star | High | Higher | High | Easy |
| Bus | Low | Low | Low | Difficult |
| Ring | Medium | Medium | Medium | Moderate |
| VLAN | High | Medium | High | Easy |

---
## Related Concepts
- [[IP Addressing]]
- [[Networking Fundamentals]]
- [[OSI Model]]
- [[VLAN Configuration]]

## Related Techniques
-

---
## References / Images
- [[Assets/Images/Pasted image 20250401154618.png|Star Topology]]
- [[Assets/Images/Pasted image 20250401154742.png|Bus Topology]]
- [[Assets/Images/Pasted image 20250401154958.png|Ring Topology]]
- [[Assets/Images/Pasted image 20250401194935.png|VLAN Topology]]
- Networking textbooks and vendor documentation
