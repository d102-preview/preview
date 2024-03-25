from fastapi import Request
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from loguru import logger
from models.common import Code, CommonResponse, Status


async def custom_value_error_handler(request: Request, exc: RequestValidationError):
    logger.debug(request.scope["route"])

    return JSONResponse(
        status_code=422,
        content=jsonable_encoder(
            CommonResponse(
                result=Status.FAIL,
                code=Code.INVALID,
                message=exc.errors()[0]["msg"],
                data=exc.errors()[0],
            )
        ),
    )
