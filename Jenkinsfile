pipeline {
    agent any
    environment {
        PROJECT_ID = "jenkins-project-328308"
        CLUSTER_NAME = "k8s-cluster"
        LOCATION = "us-central1-c"
        CREDENTIALS_ID = 'jenkins-project'
    }
    stages {
        stage('pull from github repo'){
            steps{
                git "https://github.com/harikrishna34/partners.git"
            }
        }
        stage('build docker image'){
            steps{
                sh "docker build -t harilakki34/partnersweb:${env.BUILD_ID} ."                
            }
        }
        stage('push docker image to dockerhub'){
            steps{
                withCredentials([string(credentialsId: 'DOCKER_PASS', variable: 'docker_pass')]) {
                    sh "docker login -u harilakki34 -p ${docker_pass}"
                }
                sh "docker push harilakki34/partnersweb:${env.BUILD_ID}"
            }
            
        }
        stage('deploy on k8 cluster'){
            steps{
                sh "sed -i 's/tagversion/${env.BUILD_ID}/g' backend-k8.yaml"
                step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'backend-k8.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])   
            }
        }
    }
}