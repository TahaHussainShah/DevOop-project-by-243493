# Final Demo Script — Step by Step

## Before the Demo (Prepare)
- [ ] App is live at `http://<VM_PUBLIC_IP>:3000`
- [ ] Jenkins is running at `http://<VM_PUBLIC_IP>:8080`
- [ ] GitHub Actions is green on `main`
- [ ] Browser tabs open: cloud URL, GitHub repo, Jenkins dashboard

---

## Demo Steps

### Step 1 — Show the live app
```
Open: http://<VM_PUBLIC_IP>:3000
```
- Show the green banner and current version tag (`v1.0.0`)
 Show Azure Portal — VM is terminated, VNet deleted
- Say: *"This is running live on an AWS EC2 instance provisioned by Terraform."*

---
```

**Change 1** — Edit `frontend-nextjs/src/app/globals.css`:
```css
/* Before */
--banner-bg: #22c55e;

/* After — change to blue */
--banner-bg: #3b82f6;
```

**Change 2** — Edit `frontend-nextjs/src/components/Navbar.tsx`:
```tsx
{/* Before */}
v1.0.0

{/* After */}
v1.0.1
```

```bash
git add .
git commit -m "demo: change banner to blue and bump version to v1.0.1"
git push origin fix/frontend-demo-change
```

---

### Step 3 — Open a Pull Request
1. Go to GitHub repo → "Compare & pull request"
2. Show the diff (color change + version bump)
3. Click "Create pull request"
4. Watch GitHub Actions start automatically

---

### Step 4 — Show CI running
Walk through each job in GitHub Actions:
- ✅ Test .NET Backend
- ✅ Test Python Worker
- ✅ Test Next.js Frontend
- ✅ Build & Push Docker Images
- ✅ Trigger Jenkins CD

---

### Step 5 — Merge the PR
1. CI passes → click "Merge pull request"
2. Switch to Jenkins dashboard tab

---

### Step 6 — Show Jenkins deploying
Walk through Jenkins stages live:
- Checkout
- Pull latest images
- Copy deployment files to VM
- Deploy via SSH
- Health check ✅

---

### Step 7 — Refresh the cloud URL
```
Refresh: http://<VM_PUBLIC_IP>:3000
```
- Banner is now **blue** (was green)
- Version tag shows **v1.0.1** (was v1.0.0)
- Say: *"A code push to GitHub triggered the full pipeline automatically — no manual steps."*

---

### Step 8 — Terraform destroy & recreate
```bash
cd infra
terraform destroy   # confirm with "yes"
```
- Show AWS console — VM is terminated, VPC deleted

```bash
terraform apply     # confirm with "yes"
```
- Show new VM provisioning
- Redeploy app (Jenkins or manually)
- Show app is live again at new IP
- Say: *"Infrastructure is fully reproducible from code."*

---

## Rubric Checklist During Demo

| Criteria | Proof |
|----------|-------|
| .NET API works | `http://<IP>:5000/api/jobs` returns JSON |
| Python worker runs | Jenkins logs show worker container running |
| Frontend talks to backend | StatusBar shows "online" |
| Docker Compose works | `docker compose up` ran locally |
| Docker Swarm works | `docker service ls` showed 4 services |
| Terraform destroy/recreate | Shown live |
| CI runs on push/PR | GitHub Actions ran automatically |
| Tests automated | All 3 services tested in CI |
| Docker images pushed | Docker Hub shows new image timestamps |
| Jenkins deploys | Jenkinsfile stages completed |
| No hardcoded secrets | Show `.gitignore` and GitHub Secrets page |
| Branch protection | Show repo settings |
| Live demo succeeds | Color/version changed on live URL |
