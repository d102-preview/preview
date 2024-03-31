from collections.abc import Generator
from typing import Annotated

from core.db import maria_conn, redis_conn
from fastapi import Depends
from sqlmodel import Session
from redis import Redis

def get_maria_session() -> Generator[Session, None, None]:
    with Session(maria_conn) as session:
        yield session

def get_redis_session() -> Generator[Redis, None, None]:
     yield redis_conn

MariaSessionDep = Annotated[Session, Depends(get_maria_session)]
RedisSessionDep= Annotated[Redis, Depends(get_redis_session)]