import uvicorn
from common.exception import *
from core.logger import load_config
from core.settings import settings
from fastapi import FastAPI, status
from fastapi.exceptions import RequestValidationError
from loguru import logger
from routes import analysis

app = FastAPI(
    title="[preview] API-AI docs",
    description="""
## **preview**
Give some guidance for the job interview based on AI

- This is a project of D102, SSAFY 10th.
- Project description on [Notion](https://lshhh.notion.site/preview-AI-3590d9e05aa447c6b92d8f65639632ff?pvs=74)

Author:
- Shin Juyong \<<cheesecat47@gmail.com>\>, Leader of D102
""",
    root_path="/ai",
    openapi_tags=[{"name": "1. analysis", "description": "면접 영상 분석 관련 API"}],
)

# Add routers(controllers)
app.include_router(
    analysis.router,
    tags=["1. analysis"],
    prefix="/analysis",
)

# Add custom exception handlers
exception_handlers = {
    RequestValidationError: custom_validation_error_handler,
    FileNotFoundError: custom_file_not_fount_error_handler,
}
for exc, handler in exception_handlers.items():
    app.add_exception_handler(exc, handler)


@app.get(
    "/",
    summary="서버 Health Check",
    status_code=status.HTTP_200_OK,
)
def health_check():
    """서버가 실행 중이면 \"ok\" 반환"""
    return "ok"


if __name__ == "__main__":
    RUN_SERVER_MSG = "Run server"
    if settings.DEBUG:
        RUN_SERVER_MSG = f"NOTE!!! {RUN_SERVER_MSG} as DEBUG mode"
    logger.info(RUN_SERVER_MSG)

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG,
        log_config=load_config(),
    )
