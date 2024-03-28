from fastapi import Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from loguru import logger
from models.common import Code, CommonResponse, Status


async def custom_validation_error_handler(
    request: Request, exc: RequestValidationError
):
    logger.error(request.scope["route"])

    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=jsonable_encoder(
            CommonResponse(
                result=Status.FAIL,
                code=Code.INVALID,
                message=exc.errors()[0]["msg"],
                data=exc.errors()[0],
            )
        ),
    )


async def custom_file_not_fount_error_handler(request: Request, exc: FileNotFoundError):
    logger.error(request.scope["route"])

    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content=jsonable_encoder(
            CommonResponse(
                result=Status.FAIL,
                code=Code.INVALID,
                message=str(exc),
            )
        ),
    )
