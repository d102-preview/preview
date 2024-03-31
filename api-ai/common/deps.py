from collections.abc import Generator
from typing import Annotated

from core.db import mariaConn, redisConn
from fastapi import Depends
from redis import Redis
from sqlmodel import Session


def get_maria_session() -> Generator[Session, None, None]:
    with Session(mariaConn) as session:
        yield session


def get_redis_session() -> Generator[Redis, None, None]:
    yield redisConn


MariaSessionDep = Annotated[Session, Depends(get_maria_session)]
RedisSessionDep = Annotated[Redis, Depends(get_redis_session)]
