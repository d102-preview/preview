FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY pyproject.toml poetry.lock ./

RUN apt-get update && \
    pip install poetry && \
    poetry install

COPY . .

RUN chmod +x wait-for-it.sh
