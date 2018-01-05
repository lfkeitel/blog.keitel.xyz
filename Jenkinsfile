pipeline {
  agent {
    node {
      label 'docker'
    }
  }

  stages {
    stage('Build') {
      steps {
        sh 'docker build -t lfkeitel/blog-site:$GIT_COMMIT -f Dockerfile .'
      }
    }

    stage('Push') {
      when {
        expression {
          currentBuild.result == null || currentBuild.result == 'SUCCESS'
        }
      }

      steps {
        withCredentials([usernamePassword(credentialsId: 'docker-hub', passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME')]) {
          sh 'docker login -u "$USERNAME" -p "$PASSWORD"'
          sh 'docker tag lfkeitel/blog-site:$GIT_COMMIT lfkeitel/blog-site:GIT_BRANCH'
          sh 'docker push lfkeitel/blog-site:GIT_BRANCH'
        }
      }
    }

    stage('Deploy') {
      when {
        expression {
          currentBuild.result == null || currentBuild.result == 'SUCCESS'
        }
      }

      steps {
        withCredentials([sshUserPrivateKey(credentialsId: 'jenkins-ssh', keyFileVariable: 'KEY_FILE', usernameVariable: 'SSH_USER')]) {
          sh 'ssh -i $KEY_FILE -l $SSH_USER blog.keitel.xyz /opt/jenkins/blog/update-blog.sh'
        }
      }
    }
  }

  post {
    always {
      sh 'docker image rm -f $(docker image inspect -f \'{{.Id}}\' lfkeitel/blog-site:$GIT_COMMIT) || return 0'
    }
  }
}
