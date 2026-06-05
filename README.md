# DevOop_SP

![CI Pipeline](https://github.com/YOUR_ORG/DevOop_SP/actions/workflows/ci.yml/badge.svg)

> ADCS-IV · Department of Computer Science · Air University, Islamabad

A three-tier polyglot application deployed with a fully automated DevOps pipeline. A code push to GitHub automatically runs CI, builds Docker images, triggers Jenkins, and appears **live on the cloud URL — no manual steps.**

---

## Stack

| Layer     | Technology              | Port |
|-----------|-------------------------|------|
| Frontend  | Next.js 14 + Tailwind   | 3000 |
| Backend   | ASP.NET Core 8 Web API  | 5000 |
| Worker    | Python 3.11             | —    |
| Queue     | Redis 7                 | 6379 |
| IaC       | Terraform (Azure VM)    | —    |
| CI        | GitHub Actions          | —    |
| CD        | Jenkins                 | 8080 |

---

## Quick Start — Run Locally

### Prerequisites
- Docker Desktop installed and running
- Git

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_ORG/DevOop_SP.git
cd DevOop_SP
```

### 2. Start all services
```bash
docker compose up --build
```

### 3. Open in browser
| Service  | URL |
|----------|-----|
| Frontend | http://localhost:3000 |
| Backend  | http://localhost:5000/api/status |
| Swagger  | http://localhost:5000/swagger |

---

## Docker Swarm (Local Orchestration)

```bash
# Initialize swarm
docker swarm init

# Deploy the stack
export DOCKER_USERNAME=yourdockerhubusername
docker stack deploy -c docker-stack.yml DevOop-app

# Check services
docker service ls
docker stack ps DevOop-app

# Tear down
docker stack rm DevOop-app
```

---

## Terraform (Cloud Infrastructure)

```bash
cd infra

# Copy and fill in your values
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars — add your SSH public key and AWS region

# Provision
terraform init
terraform validate
terraform plan
terraform apply

# Get public IP
terraform output vm_public_ip

# Destroy when done
terraform destroy
```

---

## GitHub Secrets Required

Go to: **Repo → Settings → Secrets and variables → Actions → New repository secret**

| Secret Name      | Value |
|------------------|-------|
| `DOCKER_USERNAME`| Your Docker Hub username |
| `DOCKER_PASSWORD`| Your Docker Hub password |
| `JENKINS_URL`    | http://your-vm-ip:8080 |
| `JENKINS_USER`   | Jenkins admin username |
| `JENKINS_TOKEN`  | Jenkins API token |

---

## Jenkins Credentials Required

Go to: **Jenkins → Manage Jenkins → Credentials → Global → Add Credential**

| ID                  | Type        | Value |
|---------------------|-------------|-------|
| `docker-hub-username` | Secret text | Docker Hub username |
| `cloud-vm-ssh-key`  | SSH key     | Your private SSH key |
| `cloud-vm-ip`       | Secret text | EC2 public IP |

---

## Live Demo Script (Final Exam)

1. Open live cloud URL: `http://<VM_IP>:3000`
2. Show current banner color and version tag
3. Create branch: `git checkout -b fix/frontend-demo-change`
4. Edit `frontend-nextjs/src/app/globals.css` — change `--banner-bg` color
5. Also edit `Navbar.tsx` — change `v1.0.0` to `v1.0.1`
6. Commit & push → open Pull Request
7. Show GitHub Actions running: test → lint → build → push → Jenkins trigger
8. Merge PR after CI passes
9. Show Jenkins deploying via SSH
10. Refresh cloud URL — new color and version appear **live**
11. Run `terraform destroy` then `terraform apply` to prove reproducibility

---

## Repository Structure

```
DevOop_SP/
├── frontend-nextjs/          # Next.js Job Board UI
├── backend-dotnet/           # ASP.NET Core Job Listings API
├── worker-python/            # Python Email Notifier Worker
├── infra/                    # Terraform AWS infrastructure
├── deploy/                   # Production compose + deploy script
├── .github/workflows/        # GitHub Actions CI
├── docs/                     # Setup guide, demo script
├── docker-compose.yml        # Local development
├── docker-stack.yml          # Docker Swarm
└── Jenkinsfile               # CD pipeline
```

---

## Security — No Hardcoded Secrets

All secrets are managed via GitHub Secrets, Jenkins Credentials, and Terraform variables. The `.gitignore` blocks: `.env`, `*.pem`, `*.key`, `terraform.tfvars`, `terraform.tfstate`.

---

## Team Members

| Name | Role |
|------|------|
|      |      |

## Cloud URL

> Update after first deployment: `http://<VM_PUBLIC_IP>:3000`
