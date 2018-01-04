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

      environment {
        DOCKER_HUB = credentials('docker-hub')
      }

      steps {
        sh 'docker login -u "$DOCKER_HUB_USR" -p "$DOCKER_HUB_PSW"'
        sh 'docker tag lfkeitel/blog-site:$GIT_COMMIT lfkeitel/blog-site:GIT_BRANCH'
        sh 'docker push lfkeitel/blog-site:GIT_BRANCH'
      }
    }
  }

  post {
    always {
      sh 'docker image rm -f $(docker image inspect -f \'{{.Id}}\' lfkeitel/blog-site:$GIT_COMMIT) || return 0'
    }
  }
}
