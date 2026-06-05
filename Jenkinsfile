pipeline {
    agent any

    environment {
        DOCKER_USER = 'tahahussainshah'
    }

    stages {

        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Clone Repository') {
            steps {
                git credentialsId: 'github-creds',
                    url: 'https://github.com/TahaHussainShah/DevOop-project-by-243493.git',
                    branch: 'main'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh "docker build -t ${DOCKER_USER}/backend-dotnet:latest ./backend-dotnet"
                sh "docker build -t ${DOCKER_USER}/frontend-nextjs:latest ./frontend-nextjs"
                sh "docker build -t ${DOCKER_USER}/worker-python:latest ./worker-python"
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER_VAR',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER_VAR --password-stdin'
                    sh "docker push ${DOCKER_USER}/backend-dotnet:latest"
                    sh "docker push ${DOCKER_USER}/frontend-nextjs:latest"
                    sh "docker push ${DOCKER_USER}/worker-python:latest"
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    cd /app
                    docker compose -f docker-compose.prod.yml pull
                    docker compose -f docker-compose.prod.yml up -d
                    docker compose -f docker-compose.prod.yml ps
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    sleep 15
                    STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://20.74.132.72:5000/api/status)
                    if [ "$STATUS" = "200" ]; then
                        echo "✅ App live at http://20.74.132.72:3000"
                    else
                        echo "❌ Health check failed — HTTP $STATUS"
                        exit 1
                    fi
                '''
            }
        }
    }

    post {
        success {
            echo "🚀 Deployment complete! http://20.74.132.72:3000"
        }
        failure {
            echo "❌ Pipeline failed. Check logs above."
        }
    }
}
