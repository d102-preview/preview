from common.exception import custom_value_error_handler
from core.settings import settings
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from loguru import logger
from routes import analysis_router

logger.info("Run server")

app = FastAPI()

# Add routers(controllers)
app.include_router(analysis_router, prefix=settings.API_V1_STR)

# Add custom exception handlers
app.add_exception_handler(RequestValidationError, custom_value_error_handler)
