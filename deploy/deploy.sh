#!/bin/bash
set -e

echo "======================================"
echo " DevOop_SP — Deploy"
echo "======================================"

echo "[1/4] Pulling latest Docker images..."
docker pull "$DOCKER_USERNAME/devoopsp-backend:latest"
docker pull "$DOCKER_USERNAME/devoopsp-worker:latest"
docker pull "$DOCKER_USERNAME/devoopsp-frontend:latest"

echo "[2/4] Stopping existing containers..."
docker compose -f /app/docker-compose.prod.yml down || true

echo "[3/4] Starting updated containers..."
docker compose -f /app/docker-compose.prod.yml up -d

echo "[4/4] Health check..."
sleep 10
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/api/status)
if [ "$STATUS" = "200" ]; then
  echo "✅ Backend healthy"
else
  echo "❌ Health check failed (HTTP $STATUS)"
  exit 1
fi

echo "🚀 Deployment complete! Frontend: http://$VM_PUBLIC_IP:3000"
