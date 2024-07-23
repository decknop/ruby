#!/bin/bash

build_image() {
    cp ../config/config.json .
    docker build -t node-image .
    docker run -t -d -p 3000:3000 --name node-container node-image /bin/bash
    docker exec -it node-container /bin/bash
}

OLD_IMAGE=$(docker images | grep node-image | awk '{print $1}')

if [ $? == "0" ]; then
    if docker ps -a | grep -q "node-container"; then
        docker stop node-container
        docker rm node-container
    fi
    docker rmi node-image:latest
fi

build_image