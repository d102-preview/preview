#!/bin/bash

export TAG=0.0.1
export REGISTRY=j10d102.p.ssafy.io

export IMG_NAME=api-ai

docker build -t "$REGISTRY/$IMG_NAME:$TAG" ../api-ai

docker push "$REGISTRY/$IMG_NAME:$TAG"

docker rmi "$REGISTRY/$IMG_NAME:$TAG"