pipeline {
    agent any
    
    options {
        timeout(time: 30, unit: 'MINUTES')
    }

    stages {
        stage('Build') {
            steps {
                script {
                    def nodejsInstallation = tool name: 'NodeJS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    env.PATH = "${nodejsInstallation}/bin:${env.PATH}"
                    sh 'npm install'
                }
            }
        }
        stage('Unit Testing') {
            steps {
                sh 'chmod +x ./scripts/JenkinsScript.sh'
                sh './scripts/JenkinsScript.sh'
            }
        }
        stage('OWASP DependencyCheck') { 
            steps { 
                dependencyCheck additionalArguments: '--format HTML --format XML', odcInstallation: 'OWASP Dependency Check' 
            } 
        }
    }
    post { 
        success { 
            dependencyCheckPublisher pattern: 'dependency-check-report.xml' 
        } 
    }
}
