# Setup Guide

## Prerequisites

Install these before starting:

| Tool | Version | Download |
|------|---------|----------|
| Docker Desktop | Latest | https://www.docker.com/products/docker-desktop |
| Node.js | 20+ | https://nodejs.org |
| .NET SDK | 8.0 | https://dotnet.microsoft.com/download |
| Python | 3.11+ | https://python.org |
| Terraform | 1.6+ | https://developer.hashicorp.com/terraform/install |
| Git | Latest | https://git-scm.com |
| Azure CLI | Latest | https://learn.microsoft.com/cli/azure/install-azure-cli |

---

## Step 1 — GitHub Organization Setup

1. Go to https://github.com/organizations/new
2. Create an organization (e.g. `air-university-adcs4`)
3. Create a repo inside it called `DevOop_SP`
4. Enable branch protection on `main`:
   - Go to Settings → Branches → Add rule
   - Branch name: `main`
   - ✅ Require pull request before merging
   - ✅ Require status checks to pass
   - ✅ Require at least 1 reviewer
   - ✅ Prevent direct pushes

---

## Step 2 — Push Code

```bash
git clone https://github.com/YOUR_ORG/DevOop_SP.git
cd DevOop_SP

# Copy all project files into this folder, then:
git add .
git commit -m "feat: initial polyglot project setup"
git push origin main
```

---

## Step 3 — Run Locally with Docker Compose

```bash
# Make sure Docker Desktop is running
docker compose up --build

# Visit:
# Frontend  → http://localhost:3000
# Backend   → http://localhost:5000/api/status
# Swagger   → http://localhost:5000/swagger
```

To stop:
```bash
docker compose down
```

---

## Step 4 — Run with Docker Swarm

```bash
docker swarm init
export DOCKER_USERNAME=yourdockerhubusername
docker stack deploy -c docker-stack.yml DevOop-app
docker service ls

# To remove the stack
docker stack rm DevOop-app
docker swarm leave --force
```

---

## Step 5 — Azure Student account

1. Create an Azure Student account or an Azure subscription at https://azure.microsoft.com
2. Install and configure the Azure CLI
3. Authenticate locally:
```bash
az login --use-device-code
```

---

## Step 6 — Terraform Infrastructure

```bash
cd infra

# Generate SSH key pair (if you don't have one)
ssh-keygen -t rsa -b 4096 -f ~/.ssh/polyglot-key

# Setup variables
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars — paste content of ~/.ssh/polyglot-key.pub into ssh_public_key

terraform init
terraform validate
terraform plan
terraform apply   # type "yes" when prompted

# Note the output IP address
terraform output vm_public_ip

# Test SSH connection
ssh -i ~/.ssh/polyglot-key ubuntu@<VM_PUBLIC_IP>

# Destroy when done testing
terraform destroy
```

---

## Step 7 — GitHub Secrets

Go to: **Repo → Settings → Secrets and variables → Actions → New repository secret**

| Secret | Value |
|--------|-------|
| `DOCKER_USERNAME` | Your Docker Hub username |
| `DOCKER_PASSWORD` | Your Docker Hub password or access token |
| `JENKINS_URL` | `http://<VM_PUBLIC_IP>:8080` |
| `JENKINS_USER` | `admin` |
| `JENKINS_TOKEN` | Jenkins API token (generated in Jenkins) |

---

## Step 8 — Jenkins Setup on the Cloud VM

```bash
# SSH into VM
ssh -i ~/.ssh/polyglot-key ubuntu@<VM_PUBLIC_IP>

# Install Java
sudo apt-get update
sudo apt-get install -y openjdk-17-jdk

# Install Jenkins
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt-get update
sudo apt-get install -y jenkins
sudo systemctl enable jenkins
sudo systemctl start jenkins

# Get initial admin password
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

Open http://<VM_PUBLIC_IP>:8080 and complete setup wizard.

**Jenkins Credentials to add** (Manage Jenkins → Credentials → Global):

| ID | Type | Value |
|----|------|-------|
| `docker-hub-username` | Secret text | Docker Hub username |
| `cloud-vm-ssh-key` | SSH private key | Contents of `~/.ssh/polyglot-key` |
| `cloud-vm-ip` | Secret text | EC2 public IP |

**Jenkins Job setup:**
1. New Item → Pipeline → name: `DevOop-deploy`
2. Pipeline → Definition: Pipeline script from SCM
3. SCM: Git → your repo URL
4. Script Path: `Jenkinsfile`
5. Save
