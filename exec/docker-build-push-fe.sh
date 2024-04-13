#!/bin/bash 

export TAG=0.0.1
export REGISTRY=localhost:5000

docker build -t $REGISTRY/frontend:$TAG ../frontend

docker push $REGISTRY/frontend:$TAG

docker rmi $REGISTRY/frontend:$TAG