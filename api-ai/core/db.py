import redis
from core.settings import settings
from sqlalchemy.pool import QueuePool
from sqlmodel import create_engine

# Connect to MariaDB
maria_conn = create_engine(
    str(settings.MARIADB_DSN),
    echo=settings.DEBUG,
    poolclass=QueuePool,
    pool_size=settings.MARIADB_POOL_SIZE,
    max_overflow=settings.MARIADB_MAX_OVERFLOW,
    pool_pre_ping=True,
)

# Connect to Redis
redis_conn = redis.Redis(
    connection_pool=redis.ConnectionPool(
        host=settings.REDIS_HOST,
        port=settings.REDIS_PORT,
        db=settings.REDIS_DB,
        password=settings.REDIS_PASSWORD,
        max_connections=settings.REDIS_MAX_CONN,
    )
)
