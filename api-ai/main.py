from core.settings import settings
from fastapi import FastAPI
from loguru import logger
from routes import analysis_router

logger.info("Run server")

app = FastAPI()

app.include_router(analysis_router, prefix=settings.API_V1_STR)
