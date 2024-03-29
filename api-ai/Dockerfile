FROM python:3.11-slim AS builder

ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY pyproject.toml poetry.lock ./

ENV POETRY_REQUESTS_TIMEOUT=120

RUN apt-get update && \
    apt-get install -y libquadmath0 && \
    pip install poetry && \
    poetry config virtualenvs.create false && \
    poetry install --without dev,ai

COPY . .

FROM python:3.11-slim

WORKDIR /app

ENV POETRY_SITE_PACKAGES=/usr/local/lib/python3.11/site-packages \
    POETRY_REQUESTS_TIMEOUT=120

COPY --from=builder $POETRY_SITE_PACKAGES $POETRY_SITE_PACKAGES
COPY --from=builder /usr/local/bin/poetry /usr/local/bin/poetry
COPY --from=builder /app /app

RUN poetry config virtualenvs.create false && \
    apt-get update && \
    apt-get install -y libquadmath0 libgl1-mesa-glx libglib2.0-0
