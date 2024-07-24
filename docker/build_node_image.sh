#!/bin/bash

NAME_IMAGE=$1

if [ "$#" != 1 ]; then
    echo "# of arguments missing, need to type the name that you would like for image and container"
    exit 0
fi

build_image() {
    cp ../config/config.json .
    docker build -t $NAME_IMAGE-image .
    docker run -t -d -p 3000:3000 --name $NAME_IMAGE-container $NAME_IMAGE-image /bin/bash
    docker exec -it $NAME_IMAGE-container /bin/bash
}

OLD_IMAGE=$(docker images | grep $NAME_IMAGE-image | awk '{print $1}')

if [ $? == "0" ]; then
    if docker ps -a | grep -q "$NAME_IMAGE-container"; then
        docker stop $NAME_IMAGE-container
        docker rm $NAME_IMAGE-container
    fi
    docker rmi $NAME_IMAGE-image:latest
fi

build_image