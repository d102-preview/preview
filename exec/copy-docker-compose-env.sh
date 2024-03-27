#!/bin/bash
cd deploy-api-ai && chmod -R 755 . && cp "${DC_ENV}" . && \
set -a && source .env && set +a