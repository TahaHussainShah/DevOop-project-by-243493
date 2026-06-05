pipeline {
    agent any

    environment {
        DOCKER_USERNAME = credentials('docker-hub-username')
        VM_PUBLIC_IP    = credentials('cloud-vm-ip')
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
                echo "✅ Code checked out from ${env.GIT_BRANCH}"
            }
        }

        stage('Pull Latest Images') {
            steps {
                sh '''
                    docker pull $DOCKER_USERNAME/devoopsp-backend:latest
                    docker pull $DOCKER_USERNAME/devoopsp-worker:latest
                    docker pull $DOCKER_USERNAME/devoopsp-frontend:latest
                '''
            }
        }

        stage('Copy Deployment Files to VM') {
            steps {
                sshagent(['cloud-vm-ssh-key']) {
                    sh '''
                        scp -o StrictHostKeyChecking=no \
                            deploy/docker-compose.prod.yml \
                            deploy/deploy.sh \
                            ubuntu@$VM_PUBLIC_IP:/app/
                    '''
                }
            }
        }

        stage('Deploy to Cloud VM') {
            steps {
                sshagent(['cloud-vm-ssh-key']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no ubuntu@$VM_PUBLIC_IP \
                            "export DOCKER_USERNAME=$DOCKER_USERNAME && \
                             export VM_PUBLIC_IP=$VM_PUBLIC_IP && \
                             chmod +x /app/deploy.sh && \
                             /app/deploy.sh"
                    '''
                }
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    sleep 15
                    STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://$VM_PUBLIC_IP:5000/api/status)
                    if [ "$STATUS" = "200" ]; then
                        echo "✅ App is live at http://$VM_PUBLIC_IP:3000"
                    else
                        echo "❌ Health check failed. HTTP: $STATUS"
                        exit 1
                    fi
                '''
            }
        }
    }

    post {
        success {
            echo "🚀 Deployment successful! Live at http://${VM_PUBLIC_IP}:3000"
        }
        failure {
            echo "❌ Deployment failed. Check logs above."
        }
    }
}
