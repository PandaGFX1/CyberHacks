Tags: #Defense #Terminology #Tools 

Refer to: [[SOC Fundamentals]] and [[Defensive Security Intro]] and [[Firewall Basics]] and [[OSI Model]]

- Intrusion Detection System (IDS): Used to detect malicious activities inside the network. 
	- An IDS can be though of as playing the role of a security camera. It sits in a corner, monitor the network traffic based on signature and anomaly-based detections, and detects any abnormal traffic. Generates alerts based on these detections.+
	- Example: An attacker bypasses the firewall through a legitimate looking connection.
- Types of Deployment Modes:
	- Reference Image: [[Pasted image 20250417063447.png|NIDS vs HIDS]]
	- Host Intrusion Detection System (HIDS): 
		- Installed individually on the hosts and are responsible for only detecting potential security threats associated with a particular host. Provide detailed visibility of the host's activities. Can be challenging to manage in large networks as they are resource-intensive and require management on each host.
	- Network Intrusion Detection System (NIDS): 
		- Detect potential malicious activity in the whole network, regardless of host. Monitors the network traffic of all of the hosts involved to detect suspicious activities. Provides a centralized view of all of the detections inside the whole network.
- Detection Modes:
	- Signatured-Based IDS:
		- Each attack has a unique pattern, called a signature. Can only detect signatures that are saved inside it's database. Therefore, zero day attacks cannot be detected as they have no previous signature. Essentially rule based in a sense. Can detect threats quickly. Good for small threat surface.
	- Anomaly-Based IDS:
		- Learns the normal behavior (baseline) of a network or system and preforms detections if there is any deviation from the normal behavior. Can detect zero-day attacks because they don't rely on signatures. May generate a lot of false positives because the nature of most legitimate programs matches malicious ones. Can reduce false positives generate by fine-tuning it and manually defining the normal behavior.
	- Hybrid IDS:
		- Uses both anomaly and signature based detection. If a known threat has a signature, it would use that function
- Example of IDS usage: [[Snort]]