#!/bin/bash 

export TAG=0.0.1
export REGISTRY=j10d102.p.ssafy.io

export IMG_NAME_API=backend-api
export IMG_NAME_FILE=backend-file

docker login $REGISTRY -u $USERNAME -p $PASSWORD

docker build -t $REGISTRY/$IMG_NAME_API:$TAG ../backend/d102-api
docker build -t $REGISTRY/$IMG_NAME_FILE:$TAG ../backend/d102-file

docker push $REGISTRY/$IMG_NAME_API:$TAG
docker push $REGISTRY/$IMG_NAME_FILE:$TAG

docker prune -a -f