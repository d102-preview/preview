#!/bin/bash

docker login $REGISTRY -u $USERNAME -p $PASSWORD

docker compose pull
docker compose up -d
docker system prune -f