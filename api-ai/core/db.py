import redis
from core.settings import settings
from sqlmodel import create_engine

engine = create_engine(str(settings.DATABASE_DSN), echo=True)

# Connect to Redis
redisConn = redis.Redis(
    connection_pool=redis.ConnectionPool(
        host=settings.REDIS_HOST,
        port=settings.REDIS_PORT,
        db=settings.REDIS_DB,
        password=settings.REDIS_PASSWORD,
        max_connections=settings.REDIS_MAX_CONN,
    )
)
