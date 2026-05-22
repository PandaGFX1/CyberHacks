Tags: #Status/In-Progress #Type/Knowledge #Context/Linux #publish-me

---
## Overview
Containerization packages applications with all required dependencies into isolated environments that behave consistently regardless of where they are deployed. Containers share the host system's kernel rather than virtualizing an entire OS, making them lightweight compared to virtual machines. Docker and Linux Containers (LXC) are the two primary containerization technologies on Linux systems.

---
## Terminology
| Term | Definition |
|------|------------|
| Container | An isolated, runnable environment packaging an application and its dependencies |
| Image | A read-only template used to create a container — includes file system and all required settings |
| Dockerfile | Script of instructions used to build a Docker image |
| Docker Hub | Cloud-based registry of public and private Docker images |
| Docker Compose | Tool for managing multi-container Docker applications |
| Kubernetes | Orchestration platform for managing containers at scale |
| LXC | Linux Containers — system-level containerization using cgroups and namespaces |
| Cgroups | Linux kernel feature for resource isolation (CPU, memory) |
| Namespace | Linux kernel feature providing abstraction of system resources (PID, network, filesystem) |
| Container Escape | Privilege escalation technique exploiting container isolation weaknesses |

---
## Core Concepts

### How Containers Work
Containers package applications with all tools and settings and share the host kernel with other containers on the same host. Multiple containers can run simultaneously on a single host. Unlike VMs, containers do not virtualize hardware — they use the host kernel directly, which makes them faster and lighter but means they do not offer the same level of isolation as a full VM.

From a security perspective, containers help isolate applications from the host and from each other — but misconfigured containers or privileged containers can be escaped.

---

### Docker
Docker is an open-source platform for automating the deployment of applications as self-contained containers. It uses a layered filesystem and resource isolation. Docker manages individual containers; Docker Compose and Kubernetes manage multiple containers at scale.

#### Docker Hub
Docker Hub is the default image registry — divided into public (available to all) and private (for teams/organizations) repositories. Images can be pulled from Docker Hub or built locally using a Dockerfile.

#### Dockerfile
A Dockerfile contains all instructions the Docker engine needs to build an image.

**Example — File hosting server (Ubuntu 22.04, SSH + Apache):**
```
FROM ubuntu:22.04

RUN apt-get update && \
    apt-get install -y apache2 openssh-server && \
    rm -rf /var/lib/apt/lists/*

RUN useradd -m docker-user && \
    echo "docker-user:password" | chpasswd

RUN chown -R docker-user:docker-user /var/www/html && \
    chown -R docker-user:docker-user /var/run/apache2 && \
    chown -R docker-user:docker-user /var/log/apache2 && \
    chown -R docker-user:docker-user /var/lock/apache2 && \
    usermod -aG sudo docker-user && \
    echo "docker-user ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

EXPOSE 22 80

CMD service ssh start && /usr/sbin/apache2ctl -D FOREGROUND
```

Build image: `docker build -t fs_docker .`
Start container: `docker run -p <host_port>:<container_port> -d <image_name>`

**Key distinction:** Images are read-only templates. A container is a running instance of an image. Changes made inside a running container are lost when it stops — use volumes to persist data outside the container.

#### Docker Management Commands
| Command | Description |
|---------|-------------|
| `docker ps` | List running containers |
| `docker ps -a` | List all containers (including stopped) |
| `docker stop <container>` | Stop a running container |
| `docker start <container>` | Start a stopped container |
| `docker restart <container>` | Restart a container |
| `docker rm <container>` | Remove a container |
| `docker rmi <image>` | Remove a Docker image |
| `docker logs <container>` | View container logs |
| `docker run hello-world` | Test Docker installation |

When modifying a containerized application, rebuild the image — do not modify a running container as changes will be lost.

---

### Linux Containers (LXC)
LXC provides system-level containerization, creating environments that act as lightweight virtual machines. It uses **cgroups** for resource isolation and **namespaces** for process, network, and filesystem isolation.

Each container gets its own:
- **PID namespace** — isolated process IDs; container processes cannot interfere with host processes
- **Network namespace** — own interfaces, routing tables, and firewall rules
- **Mount namespace** — own root filesystem; changes do not affect the host

#### LXC vs Docker

| Aspect | Docker | LXC |
|--------|--------|-----|
| Focus | Application containers | System containers (like lightweight VMs) |
| Portability | High — images work across environments | Lower — more integrated with host configuration |
| Setup | Simple; automated via Dockerfile | Manual; requires Linux system admin knowledge |
| Security | AppArmor and SELinux out of the box | Requires manual security configuration |
| Use case | DevOps, microservices, CI/CD | Full environment simulation, server workloads |

#### LXC Commands
| Command | Description |
|---------|-------------|
| `sudo apt install lxc -y` | Install LXC |
| `sudo lxc-create -n <name> -t ubuntu` | Create a new LXC container |
| `lxc-ls` | List all containers |
| `lxc start -n <name>` | Start a container |
| `lxc stop -n <name>` | Stop a container |
| `lxc restart -n <name>` | Restart a container |
| `lxc-attach -n <name>` | Connect to a running container |
| `lxc-config -n <name> -s storage` | Manage container storage |
| `lxc-config -n <name> -s network` | Manage container network settings |
| `lxc-config -n <name> -s security` | Manage container security settings |

#### Securing LXC Containers
LXC containers share the host kernel, so resource limits and isolation must be explicitly configured.

Add to `/usr/share/lxc/config/<containername>.conf`:
```
lxc.cgroup.cpu.shares = 512
lxc.cgroup.memory.limit_in_bytes = 512M
```

- `lxc.cgroup.cpu.shares` — relative CPU time allocation compared to other containers
- `lxc.cgroup.memory.limit_in_bytes` — maximum memory (K = KB, M = MB, G = GB)

Apply: `sudo systemctl restart lxc.service`

Security best practices for LXC: disable unnecessary services, use secure protocols, enforce strong authentication, restrict to trusted IPs, keep containers updated, apply resource limits to prevent host resource exhaustion.

---

### Containers in Penetration Testing
Containers are useful for creating isolated, repeatable testing environments:
- Spin up clean environments to test exploits, payloads, or malware safely
- Host files for file transfer during assessments (Apache + SSH container)
- Quickly deploy tools or services without affecting the host system

**Container escape** is also an attack path — misconfigured privileged containers, exposed Docker sockets, or kernel vulnerabilities can allow breaking out of container isolation.

---
## Related Concepts
- [[Linux Fundamentals]]
- [[Linux System Management]]
- [[Operating System Fundamentals]]
- [[Operating System Internals]]

## Related Techniques
-

## Related Tools
- [[Docker]]

---
## References / Images
- Docker documentation
- LXC documentation
- `man lxc-create`
