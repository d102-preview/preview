#!/bin/bash

export TAG=0.0.1
export REGISTRY=localhost:5000

export IMG_NAME=backend-ai

docker compose -f "./deploy-$IMG_NAME/docker-compose.yml" build fastapi

docker push "$REGISTRY/$IMG_NAME:$TAG"

docker rmi "$REGISTRY/$IMG_NAME:$TAG"