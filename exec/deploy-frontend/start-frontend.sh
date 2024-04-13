#!/bin/bash

export REGISTRY=j10d102.p.ssafy.io
docker login $REGISTRY -u $USERNAME -p $PASSWORD

docker compose pull
docker compose up -d
docker system prune -f