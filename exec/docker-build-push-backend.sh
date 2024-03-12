#!/bin/bash 

export TAG=0.0.1
export REGISTRY=localhost:5000

docker build -t $REGISTRY/backend-api:$TAG ../backend/d102-api
docker build -t $REGISTRY/backend-file:$TAG ../backend/d102-file

docker push $REGISTRY/backend-api:$TAG
docker push $REGISTRY/backend-file:$TAG

docker rmi $REGISTRY/backend-api:$TAG
docker rmi $REGISTRY/backend-file:$TAG
