Tags: #Status/In-Progress #Type/Tool #Context/Linux #publish-me

---
## Overview
Docker is an open-source platform for building, shipping, and running applications in isolated containers. It automates deployment using a layered filesystem and resource isolation. Docker is widely used in DevOps and penetration testing to create portable, reproducible environments.

## Target / Context
Linux and cross-platform environments requiring isolated application deployment. Common in CTF and pentesting for file hosting servers, payload staging, and tool environments.

---
## Installation

> [!INFO]- Installation Commands (Ubuntu):
> `sudo apt update -y`
> `sudo apt install ca-certificates curl gnupg lsb-release -y`
> `sudo mkdir -m 0755 -p /etc/apt/keyrings`
> `curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg`
> `echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null`
> `sudo apt update -y`
> `sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y`
> `sudo usermod -aG docker $USER`
> Test: `docker run hello-world`

---
## Basic Usage

> [!INFO]- Basic Usage:
> Build an image from a Dockerfile in the current directory:
> `docker build -t <image_name> .`
>
> Run a container from an image:
> `docker run -p <host_port>:<container_port> -d <image_name>`
>
> List running containers:
> `docker ps`

---
## Flags & Options

> [!INFO]- Flags & Options:
> | Flag | Description | Example |
> |------|-------------|---------|
> | `-t` | Tag/name the image | `docker build -t myapp .` |
> | `-p` | Map host port to container port | `docker run -p 8080:80 myapp` |
> | `-d` | Run container in detached (background) mode | `docker run -d myapp` |
> | `-n` | Name the container | `docker run --name mycontainer myapp` |
> | `-v` | Mount a volume for data persistence | `docker run -v /host/path:/container/path myapp` |
> | `-e` | Set environment variables | `docker run -e VAR=value myapp` |
> | `--rm` | Automatically remove container on stop | `docker run --rm myapp` |

---
## Common Use Cases

### Build and Run a Container

> [!INFO]- Commands:
> `docker build -t fs_docker .`
> `docker run -p 2222:22 -p 8080:80 -d fs_docker`

### Container Management

> [!INFO]- Commands:
> `docker ps` — list running containers
> `docker ps -a` — list all containers including stopped
> `docker stop <container>` — stop a running container
> `docker start <container>` — start a stopped container
> `docker restart <container>` — restart a container
> `docker rm <container>` — remove a container
> `docker rmi <image>` — remove an image
> `docker logs <container>` — view container output logs

### File Hosting Server (Dockerfile Example)
For file transfer during assessments — SSH for `scp` uploads, Apache for `wget`/`curl` downloads.

> [!INFO]- Dockerfile:
> ```
> FROM ubuntu:22.04
> RUN apt-get update && apt-get install -y apache2 openssh-server && rm -rf /var/lib/apt/lists/*
> RUN useradd -m docker-user && echo "docker-user:password" | chpasswd
> RUN chown -R docker-user:docker-user /var/www/html /var/run/apache2 /var/log/apache2 /var/lock/apache2
> RUN usermod -aG sudo docker-user && echo "docker-user ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
> EXPOSE 22 80
> CMD service ssh start && /usr/sbin/apache2ctl -D FOREGROUND
> ```
> Build: `docker build -t fs_docker .`
> Run: `docker run -p 2222:22 -p 8080:80 -d fs_docker`

---
## Related Concepts
- [[Containerization]]

## Related Techniques
-

## Related Playbooks
-

---
## References / Images
- Docker Hub: hub.docker.com
- Docker documentation
