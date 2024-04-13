#!/bin/bash 

export TAG=0.0.1
export REGISTRY=j10d102.p.ssafy.io:5000

export IMG_NAME=frontend

docker build -t $REGISTRY/$IMG_NAME:$TAG ../frontend

docker push $REGISTRY/$IMG_NAME:$TAG

docker rmi $REGISTRY/$IMG_NAME:$TAG