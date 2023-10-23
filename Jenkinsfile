pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
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
