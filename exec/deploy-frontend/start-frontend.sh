#!/bin/bash

docker compose pull
docker compose up -d
docker system prune -a -f  