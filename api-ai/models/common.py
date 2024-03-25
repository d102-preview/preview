from enum import Enum

from pydantic import BaseModel


class Status(Enum):
    OK = "ok"
    FAIL = "fail"


class CommonResponse(BaseModel):
    """공통 응답"""

    result: str = Status.OK
    code: str = None
    message: str = None
    data: object = None
