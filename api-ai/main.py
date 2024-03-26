import uvicorn
from common.exception import custom_validation_error_handler
from core.logger import load_config
from core.settings import settings
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from loguru import logger
from routes import analysis_router

app = FastAPI()

# Add routers(controllers)
app.include_router(analysis_router, prefix=settings.API_V1_STR)

# Add custom exception handlers
app.add_exception_handler(RequestValidationError, custom_validation_error_handler)

if __name__ == "__main__":
    logger.info("Run server")

    uvicorn.run("main:app", port=8000, reload=True, log_config=load_config())
