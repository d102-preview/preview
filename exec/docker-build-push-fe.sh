#!/bin/bash 

export TAG=0.0.1
export REGISTRY=j10d102.p.ssafy.io

export IMG_NAME=frontend

docker login $REGISTRY -u $USERNAME -p $PASSWORD

docker build -t $REGISTRY/$IMG_NAME:$TAG ../frontend

docker push $REGISTRY/$IMG_NAME:$TAG

docker prune -a -f