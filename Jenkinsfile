pipeline {
    agent any

    environment {
        dockerImage = ''
        registry = 'harilakki34/vendor-web'
        registryCredential = 'docker-hub-credentials'
    }


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
                    dockerImage = docker.build registry
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                // Push Docker image to Docker Hub or any other registry
                script {
                    docker.withRegistry('', registryCredential ) {
                        dockerImage.push()
                    }
                }
            }
        }

        
    }
}
