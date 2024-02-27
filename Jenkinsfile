pipeline {
    agent any

    environment {
        DOCKER_HUB_USERNAME = credentials('harilakki34')
        DOCKER_HUB_PASSWORD = credentials('harikrishna@1234')
        DOCKER_HUB_REPO = "harilakki34/vendor-web" // Replace with your Docker Hub repository name
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
                    docker.build("harilakki34/vendor-web:latest")
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                // Push Docker image to Docker Hub or any other registry
                script {
                    docker.withRegistry('https://hub.docker.com/', DOCKER_HUB_USERNAME, DOCKER_HUB_PASSWORD) {
                        docker.image("harilakki34/vendor-web:latest").push()
                    }
                }
            }
        }

        
    }
}
