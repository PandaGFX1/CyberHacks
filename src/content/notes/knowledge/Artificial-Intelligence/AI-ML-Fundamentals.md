---
title: "AI ML Fundamentals"
category: "knowledge"
tags: []
excerpt: "Artificial intelligence is the overarching field covering systems that mimic human reasoning, comprehension, and..."
date: "2026-06-22"
---

---
## Overview
Artificial intelligence is the overarching field covering systems that mimic human reasoning, comprehension, and problem-solving. Machine learning, deep learning, and large language models form a nested hierarchy within it. This note covers the foundational concepts of each layer, how they work, their security vulnerabilities, how attackers weaponize them, and how defenders can leverage and protect them. Security-specific AI guidance is covered by the MITRE ATLAS framework, built on top of ATT&CK.

---

## Terminology
| Term | Definition |
|------|------------|
| Artificial Intelligence (AI) | Overarching field of systems that simulate human reasoning, comprehension, and problem-solving |
| Machine Learning (ML) | Subfield of AI where systems learn patterns from data without explicit programming |
| Deep Learning (DL) | Branch of ML using multi-layered neural networks; processes raw unstructured data without human labeling |
| Large Language Model (LLM) | DL model built on transformer neural networks; understands and generates human-like text |
| Neural Network | Computing system modeled on biological neurons; processes data through connected layers |
| Parameter | Adjustable numerical weight in an ML model that is fine-tuned during training |
| Overfitting | When a model learns training data too closely and fails to generalize to unseen data |
| Backpropagation | Algorithm that adjusts model parameters by comparing predictions to correct answers, propagating error backward |
| Transformer | Neural network architecture enabling parallel text processing and attention-based contextual understanding |
| RLHF | Reinforcement Learning from Human Feedback — process where humans rate LLM outputs to fine-tune behavior |
| Prompt Injection | Attack that overrides an AI model's original instructions via crafted user input |
| Data Poisoning | Corruption of training data to cause incorrect or biased model outputs |
| Model Drift | Degradation of model accuracy over time as real-world data distribution shifts from training data |
| MITRE ATLAS | AI-focused threat framework built on top of ATT&CK; documents adversarial ML tactics and techniques |
| Explainability Tool | Software (e.g., SHAP, LIME) that makes AI model decisions interpretable to humans |

---

## Core Concepts

### Artificial Intelligence
AI describes any system capable of carrying out tasks that would ordinarily require human intelligence — reasoning, language comprehension, visual recognition, problem-solving, and creativity. It is not a single technology but an umbrella field that includes machine learning, robotics, expert systems, and natural language processing.

The subfields most relevant to security:

| Subfield | What It Does |
|---|---|
| Machine Learning | Learns patterns from data; used in anomaly detection, classification, prediction |
| Deep Learning | Processes raw unstructured data via neural networks; powers image recognition, NLP |
| Large Language Models | Understands and generates text; powers chatbots, code generation, threat analysis |
| Computer Vision | Interprets images and video; used in deepfake generation and detection |

---

### Machine Learning

#### ML Lifecycle
ML models follow a structured development process to ensure reliable deployment:

| Phase | Description |
|---|---|
| Problem Definition | Define the task, success criteria, and what data is needed |
| Data Collection & Preparation | Gather, clean, and engineer features from raw data; minimize noise and bias |
| Model Training | Feed prepared data to an algorithm to learn patterns and build a model |
| Evaluation & Tuning | Measure performance metrics (accuracy, precision, recall); optimize hyperparameters |
| Deployment | Release model to a production environment via API or embedded service |
| Monitoring | Track real-world performance and detect drift over time |
| Retraining | Retrain on fresh data when performance degrades or the environment changes |

Machine Learning Lifecycle

**Overfitting** is the primary risk in training — a model that memorizes training data performs poorly on unseen inputs. Techniques like cross-validation, dropout, and regularization help prevent it.

#### ML Algorithm Categories
Every ML algorithm produces a model that uses three components: a **decision process** (makes predictions), an **error function** (measures how wrong predictions are), and a **model optimization process** (adjusts to reduce errors).

| Category | How It Works | Example Use Cases |
|---|---|---|
| Supervised | Trains on labeled data to predict or classify | Spam detection, fraud classification, price prediction |
| Unsupervised | Finds hidden patterns in unlabeled data via clustering or dimensionality reduction | Customer segmentation, anomaly detection, topic modeling |
| Semi-Supervised | Uses a small labeled dataset to guide learning over larger unlabeled data | Medical image classification with limited annotations |
| Reinforcement Learning | Agent receives rewards for correct decisions and penalties for wrong ones; learns optimal behavior over time | Game playing, robotic control, adaptive threat response |

---

### Neural Networks and Deep Learning
Biological neural networks inspired the artificial equivalent. In the brain, neurons communicate via synapses using electrical and chemical signals. Artificial neural networks replicate this with nodes (neurons) and weighted connections (synapses).

#### Architecture

| Layer | Role |
|---|---|
| Input Layer | Receives raw data; one node per data feature (e.g., 16 nodes for a 4×4 pixel image) |
| Hidden Layers | Extract and refine features progressively — early layers detect edges, later layers combine features into concepts |
| Output Layer | Produces the final prediction or classification |

Each connection has a **weight** representing its importance — for example, the body of a phishing email carries more weight than the subject line when classifying spam.

**Deep Learning** is defined as any neural network with more than 3 layers. Key advantages over classic ML:
- Processes raw, unstructured, unlabeled data directly — no manual feature engineering required
- Self-learning: no human labeling step needed
- Scalable: handles far larger datasets than traditional ML with proportionally better results
- Suited to images, audio, video, and natural language where structure is implicit

---

### Large Language Models (LLMs)
LLMs are deep learning models built on transformer neural networks, trained to understand and generate human-like text by predicting the next word in a sequence.

#### How LLMs Work

**Pre-training:**
LLMs process vast amounts of text — GPT-3's training corpus would take a human approximately 2,600 years to read. Instead of labeled data, they use billions of parameters as adjustable weights:

1. The model generates a word at random to complete a training sentence
2. The guess is compared against the correct word
3. Parameters are adjusted via **backpropagation** to make the correct word more likely next time
4. This repeats trillions of times across the training corpus

**Transformers** enable this at scale by processing text in parallel rather than word-by-word, using an **attention mechanism** that assigns importance scores to words relative to context — allowing the model to understand that "bank" in "river bank" and "bank account" are different concepts.

**Reinforcement Learning from Human Feedback (RLHF):**
After pre-training, human reviewers evaluate model outputs and flag unhelpful, biased, or harmful responses. Parameters are adjusted to reduce these, aligning the model's behavior with human expectations.

#### AI Hierarchy Summary

| Term | Relationship |
|---|---|
| Artificial Intelligence | Broadest field — any system mimicking human intelligence |
| Machine Learning | Subfield of AI — learns from data without explicit rules |
| Deep Learning | Subfield of ML — multi-layer neural networks; scalable; no labeling needed |
| Large Language Models | Subfield of DL — transformer-based; specialized for text understanding and generation |

---

## AI Security Threats

### MITRE ATLAS Framework
MITRE ATLAS (Adversarial Threat Landscape for Artificial-Intelligence Systems) is the authoritative framework for AI-specific attack techniques, built on top of MITRE ATT&CK. It documents real-world adversarial ML attacks against AI systems across the full attack lifecycle.
Reference: https://atlas.mitre.org/matrices/ATLAS

### Vulnerabilities in AI Models

| Threat | Description |
|---|---|
| **Prompt Injection** | Crafted user input overrides the model's original system instructions — causes it to disclose sensitive data, bypass content filters, or act outside its intended scope; analogous to SQL injection but against natural language prompts |
| **Data Poisoning** | Attacker corrupts or manipulates the training dataset so the model learns incorrect patterns — can introduce backdoors, degrade accuracy, or cause biased outputs on specific inputs |
| **Model Theft** | Attacker queries a model's API extensively to reconstruct a functional clone — stealing intellectual property without accessing the model directly; also called model extraction |
| **Privacy Leakage** | Model reveals information about its training data in outputs — a model trained on private medical records may reproduce patient details when queried in specific ways; includes membership inference attacks (determining whether a specific record was in the training set) |
| **Model Drift** | Model accuracy degrades over time as the real-world data distribution shifts away from training data — requires ongoing monitoring and periodic retraining |

### AI-Enhanced Attacks
Generative AI has significantly lowered the skill barrier for attackers:

| Attack | How AI Enhances It |
|---|---|
| **Malware Generation** | LLMs can generate functional malware on demand, producing polymorphic variants that evade signature-based detection |
| **Deepfakes** | AI generates convincing audio and video of real people — enables impersonation in video calls and voice phishing (vishing), bypassing password-based authentication |
| **Phishing** | AI produces highly personalized, fluent, contextually accurate phishing emails at scale — significantly harder to detect by visual inspection alone; model guardrails can sometimes be bypassed via prompt injection |

---

## Defensive AI

AI is a force multiplier for defenders, automating time-consuming analysis tasks that previously required significant human attention.

### Use Cases

| Use Case | Description |
|---|---|
| Network Anomaly Detection | ML models baseline normal traffic patterns and flag deviations — detects C2 beaconing, lateral movement, and data exfiltration faster than human analysts |
| Phishing Detection | Classifiers trained on email content, headers, and sender reputation automatically triage inbound mail |
| Log Analysis | LLMs interpret log entries in plain language, explaining what happened and whether it is suspicious |
| Threat Hunting | LLMs suggest realistic attack scenarios and hunting hypotheses based on the environment described |
| Incident Triage | LLMs summarize long reports, alerts, and event sequences to accelerate investigation |
| Content Generation | LLMs write detection rules (Sigma, Yara, regex) from natural language descriptions |

### Example Prompts

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Log Analysis Example:</span></summary>
<div class="callout-body">

Prompt sent to LLM:
"Here's a log line: <code>Apr 22 11:45:09 ubuntu sshd[1245]: Failed password for invalid user admin from 203.0.113.55 port 56231 ssh2</code> — Can you explain what is happening in this log entry?"

</div>
</details>

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Phishing Detection Example:</span></summary>
<div class="callout-body">

Prompt sent to LLM:
"Is the following a phishing email and why? <code>Subject: Urgent: Account Verification Needed... security@m1crosoft365-security.com</code>"

</div>
</details>

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Threat Hunting Example:</span></summary>
<div class="callout-body">

Prompt sent to LLM:
"Can you suggest three realistic threat hunting scenarios that a cyber security analyst should investigate within a corporate network environment?"

</div>
</details>

<details class="callout callout-info">
<summary class="callout-title"><span class="callout-icon">ℹ</span><span>Detection Content Generation Example:</span></summary>
<div class="callout-body">

Prompt sent to LLM:
"Please write a regex pattern that would match failed SSH login attempts in a typical Linux system authentication log."

</div>
</details>

---

## Securing AI Systems

The adoption of AI introduces new attack surfaces that must be addressed alongside traditional security controls.

### Key Controls

| Control | Description |
|---|---|
| **Access Control** | Restrict who can query, modify, or export AI models via Role-Based Access Control (RBAC) and strong authentication (MFA) |
| **Training Data Protection** | Treat training data as sensitive data — encrypt at rest and in transit; apply the same data classification standards as production databases |
| **AI Security Standards** | Implement established frameworks such as ISO/IEC 27090 (AI cybersecurity) and NIST AI Risk Management Framework |
| **Model Monitoring** | Continuously monitor models for unexpected behavior, accuracy degradation, and bias using explainability tools |
| **Prompt Hardening** | Define strict system prompts that limit the model's scope; validate and sanitize user input before it reaches the model |
| **Output Filtering** | Apply output guardrails to detect and block sensitive data disclosure or policy violations in model responses |

### Explainability Tools
Explainability tools make AI decision-making interpretable — critical for detecting bias, debugging anomalies, and auditing model behavior:
- **SHAP** (SHapley Additive exPlanations) — quantifies how much each feature contributed to a specific prediction
- **LIME** (Local Interpretable Model-agnostic Explanations) — explains individual predictions by approximating the model locally with a simpler, interpretable model

---

## Related Concepts
- [MITRE ATT&CK Framework](/knowledge/Core-Security-Concepts/MITRE-ATTCK-Framework)
- [Incident Response Fundamentals](/knowledge/Defensive-Security/Incident-Response-Fundamentals)
- [SOC Fundamentals](/knowledge/Defensive-Security/SOC-Fundamentals)

## Related Techniques
-

---

## References / Images
- https://atlas.mitre.org/matrices/ATLAS
- https://www.nist.gov/artificial-intelligence
- Machine Learning Lifecycle Diagram
