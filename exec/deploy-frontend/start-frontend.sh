#!/bin/bash

docker login $REGISTRY -u $DOCKER_CREDS_USR -p $DOCKER_CREDS_PSW

docker compose pull
docker compose up -d
docker system prune -f