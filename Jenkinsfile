pipeline {
    agent {
        docker {
            image 'node:18.18.2-alpine3.18'
            args '-p 8085:8085'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

          stage('Test') {
            steps {
                sh './scripts/JenkinsScript.sh'
            }
        }


        
    }
}
