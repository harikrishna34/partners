pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout source code including Dockerfile from GitHub
                git branch: 'main', url: 'https://github.com/harikrishna34/partners.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Build Docker image
                script {
                    docker.build("harilakki34/vendor-web:latest")
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                // Push Docker image to Docker Hub or any other registry
                script {
                    docker.withRegistry('https://hub.docker.com/', 'docker-hub-credentials') {
                        docker.image("harilakki34/vendor-web:latest").push()
                    }
                }
            }
        }

        
    }
}
