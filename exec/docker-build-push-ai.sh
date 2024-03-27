#!/bin/bash

export TAG=0.0.1
export REGISTRY=localhost:5000

export IMG_NAME=api-ai

chmod -R 755 "./deploy-$IMG_NAME"

docker build -t "$REGISTRY/$IMG_NAME:$TAG" ../api-ai

docker push "$REGISTRY/$IMG_NAME:$TAG"

docker rmi "$REGISTRY/$IMG_NAME:$TAG"