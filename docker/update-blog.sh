#!/bin/sh

set -e

DOCKER_IMAGE="lfkeitel/blog-site"
OLDIMG="$(docker image inspect --format '{{.ID}}' $DOCKER_IMAGE | cut -d':' -f2)"

docker pull lfkeitel/blog-site

NEWIMG="$(docker image inspect --format '{{.ID}}' $DOCKER_IMAGE | cut -d':' -f2)"

if [ "$OLDIMG" = "$NEWIMG" ]; then
    # No update
    echo "No update"
    exit 0
fi

echo "Update found, relaunching blog"

cd /root/blog.keitel.xyz

# Stop old container
docker-compose down

# Start new container with newly pulled image
docker-compose up -d

# Delete old image
docker image rm "$OLDIMG"