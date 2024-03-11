from enum import Enum

from pydantic import BaseModel


class ResponseStatus(str, Enum):
    OK = "ok"
    FAIL = "fail"


class CommonResponse(BaseModel):
    result: ResponseStatus


__all__ = ["ResponseStatus", "CommonResponse"]
