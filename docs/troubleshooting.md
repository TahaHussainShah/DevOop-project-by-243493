# Troubleshooting Guide

## Docker Issues

### "Port already in use"
```bash
# Find what's using the port
lsof -i :3000
lsof -i :5000

# Kill it
kill -9 <PID>

# Or change ports in docker-compose.yml
```

### "Cannot connect to Docker daemon"
- Make sure Docker Desktop is running
- On Linux: `sudo systemctl start docker`

### Container keeps restarting
```bash
# Check logs
docker compose logs backend
docker compose logs frontend
docker compose logs worker

# Restart a specific service
docker compose restart backend
```

### Images not rebuilding
```bash
# Force rebuild with no cache
docker compose build --no-cache
docker compose up
```

---

## .NET Backend Issues

### "Redis unavailable" warning
- This is OK for local dev without Redis
- Backend will still serve jobs — Redis is only needed for the application queue
- Run `docker compose up` (not just the backend) to include Redis

### Port 5000 not responding
```bash
# Check if container is healthy
docker ps
docker inspect devoopsp-backend

# Check logs
docker compose logs backend
```

### Build fails — package restore error
```bash
cd backend-dotnet
dotnet restore
dotnet build
```

---

## Python Worker Issues

### Worker can't connect to Redis
- Make sure Redis is running: `docker compose up redis`
- Check env vars: `REDIS_HOST` should be `redis` (not `localhost`) inside Docker

### Pytest import errors
```bash
cd worker-python
pip install -r requirements.txt
pytest tests/ -v
```

### Ruff lint errors
```bash
ruff check . --fix
```

---

## Next.js Frontend Issues

### "npm ci" fails
```bash
cd frontend-nextjs
rm -rf node_modules package-lock.json
npm install
```

### Build fails — TypeScript errors
```bash
npm run build 2>&1 | head -50
# Fix the reported type errors
```

### Frontend shows "Backend API: offline"
- Backend is not running or not healthy
- Check: `docker compose ps` — is backend healthy?
- Check: `curl http://localhost:5000/api/status`

---

## Terraform Issues

### "No valid credential sources found"
```bash
az login --use-device-code
az account show
```

### "Error creating VPC: VpcLimitExceeded"
- AWS default limit is 5 VPCs per region
- Delete unused VPCs in AWS Console, or use a different region

### VM not reachable after `terraform apply`
- Wait 2-3 minutes for user_data script (Docker install) to finish
- Check security group allows port 22, 3000, 5000

### SSH connection refused
```bash
# Make sure you're using the right key
ssh -i ~/.ssh/polyglot-key ubuntu@<VM_PUBLIC_IP>

# Check key permissions
chmod 400 ~/.ssh/polyglot-key
```

---

## GitHub Actions Issues

### CI not triggering
- Check branch name matches pattern: `main`, `feature/**`, `fix/**`
- Check `.github/workflows/ci.yml` is committed to the repo

### Docker push fails
- Verify `DOCKER_USERNAME` and `DOCKER_PASSWORD` secrets are set
- Make sure Docker Hub account exists and repo is public (or login is correct)

### Jenkins trigger step fails
- Verify `JENKINS_URL`, `JENKINS_USER`, `JENKINS_TOKEN` secrets are set
- Make sure Jenkins job name is `DevOop-deploy`
- Make sure Jenkins is running and accessible from the internet

---

## Jenkins Issues

### Jenkins can't SSH into VM
- Check `cloud-vm-ssh-key` credential is the **private** key (not public)
- Check `cloud-vm-ip` is the correct public IP
- Test manually: `ssh -i your-key.pem ubuntu@<VM_IP>`

### "docker: command not found" on VM
- Docker install via user_data takes 2-3 mins after `terraform apply`
- SSH in and run manually:
```bash
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo usermod -aG docker ubuntu
newgrp docker
```

### Jenkins job stuck at "waiting for executor"
- Jenkins needs an agent/executor
- Go to: Manage Jenkins → Nodes → Built-In Node → set executors to 2

---

## Common Commands Reference

```bash
# View all running containers
docker ps

# View logs for all services
docker compose logs -f

# Restart everything
docker compose down && docker compose up --build

# Check Docker Swarm services
docker service ls
docker service logs DevOop-app_backend

# SSH into cloud VM
ssh -i ~/.ssh/polyglot-key ubuntu@<VM_PUBLIC_IP>

# Run tests locally
cd backend-dotnet && dotnet test
cd worker-python  && pytest tests/ -v
cd frontend-nextjs && npm test -- --watchAll=false
```
