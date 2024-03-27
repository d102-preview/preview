from datetime import datetime

import sqlmodel
from models.common import CommonResponse
from pydantic import BaseModel, Field
from sqlmodel import SQLModel


class AnalysisRequest(BaseModel):
    """분석 요청 파라미터"""

    analysis_id: int = Field(description="분석 아이디", ge=1)


class AnalysisResponse(CommonResponse):
    """분석 응답"""


class Analysis(SQLModel, table=True):
    id: int = sqlmodel.Field(primary_key=True)
    type: str = sqlmodel.Field(max_length=16)
    question: str = sqlmodel.Field(max_length=512)
    video_path: str = sqlmodel.Field(max_length=512)
    thumbnail_path: str = sqlmodel.Field(max_length=512)
    analysis_start_time: datetime | None = sqlmodel.Field(default=None, nullable=True)
    analysis_end_time: datetime | None = sqlmodel.Field(default=None, nullable=True)