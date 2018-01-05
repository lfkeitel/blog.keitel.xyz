pipeline {
  agent {
    node {
      label 'docker'
    }
  }

  stages {
    stage('Build') {
      steps {
        sh 'git submodule init && git submodule update'
        sh 'docker build --no-cache -t lfkeitel/blog-site:${GIT_COMMIT} -f Dockerfile .'
      }
    }

    stage('Push') {
      when {
        expression {
          env.GIT_BRANCH == 'master' && currentBuild.result == null || currentBuild.result == 'SUCCESS'
        }
      }

      steps {
        withCredentials([usernamePassword(credentialsId: 'docker-hub', passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME')]) {
          sh """
            docker login -u "${USERNAME}" -p "${PASSWORD}"
            docker tag lfkeitel/blog-site:${GIT_COMMIT} lfkeitel/blog-site:latest
            docker push lfkeitel/blog-site:latest
            docker image rm lfkeitel/blog-site:latest
          """
        }
      }
    }

    stage('Deploy') {
      when {
        expression {
          env.GIT_BRANCH == 'master' && (currentBuild.result == null || currentBuild.result == 'SUCCESS')
        }
      }

      steps {
        withCredentials([sshUserPrivateKey(credentialsId: 'jenkins-ssh', keyFileVariable: 'KEY_FILE', usernameVariable: 'SSH_USER')]) {
          sh 'ssh -i ${KEY_FILE} -l ${SSH_USER} blog.keitel.xyz /opt/jenkins/blog/update-blog.sh'
        }
      }
    }
  }

  post {
    always {
      sh 'docker image rm lfkeitel/blog-site:${GIT_COMMIT} || return 0'
    }
  }
}
