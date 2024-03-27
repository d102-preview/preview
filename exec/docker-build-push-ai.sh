#!/bin/bash

docker build -t "$REGISTRY/$IMG_NAME:$TAG" ../api-ai

docker push "$REGISTRY/$IMG_NAME:$TAG"

docker rmi "$REGISTRY/$IMG_NAME:$TAG"