Tags: #Status/Complete #Type/Knowledge #Context/Hardware #publish-me

---
## Overview
Multi-processing refers to the ability of a computer system to execute multiple processes or instructions simultaneously using multiple CPUs or cores. It improves performance, efficiency, and responsiveness.

---

## Terminology
| Term           | Definition                                                                    |
| -------------- | ----------------------------------------------------------------------------- |
| Program        | A set of instructions stored in memory; becomes a process when executed       |
| Process        | A program in execution with its own memory space and resources                |
| Thread         | Smallest unit of execution within a process; shares memory with other threads |
| Scheduling     | Determines the execution order of processes/threads                           |
| Load Balancing | Distributes work efficiently across processors or cores                       |

---
## Core Concepts

### Multithreading
A process can contain multiple threads running concurrently.
- Threads share memory and CPU resources within the same process
- Enables better CPU utilization and responsiveness

### Multicore Processing
- A single CPU containing multiple independent cores
- Each core can execute instructions independently
- Enables true parallel execution within a single chip

### Multi-Processing
- System with multiple CPUs or cores working together
- Requires **scheduling** to determine execution order
- Requires **load balancing** to distribute work efficiently

### Parallel Computing
- Breaks large tasks into smaller subtasks
- Subtasks execute simultaneously across multiple processors/cores
- Results are combined to produce final output

### Flynn's Taxonomy
Classification of computer architectures based on instruction and data streams.

| Type | Full Name                           | Description                                        |
| ---- | ----------------------------------- | -------------------------------------------------- |
| SISD | Single Instruction, Single Data     | Traditional sequential processing                  |
| SIMD | Single Instruction, Multiple Data   | Same operation on multiple data points (e.g., GPU) |
| MISD | Multiple Instruction, Single Data   | Rare; fault-tolerant systems                       |
| MIMD | Multiple Instruction, Multiple Data | Modern multicore/multiprocessor systems            |

### Graphics Processing Unit (GPU)
- Specialized processor designed for parallel computation
- Contains many smaller cores optimized for large data sets
- Used for graphics rendering, AI/ML workloads, and parallel processing tasks
- Contrasts with CPU: fewer, more powerful cores vs. many smaller ones

---
## Related Concepts
- [[CPU Architecture]]
- [[Memory Architecture]]
- [[Input and Output]]

## Related Techniques
- [[Race Conditions]]

## Related Tools
- 

---
## References / Images
- Flynn's Taxonomy diagram
- CPU vs GPU architecture comparison