"""
Author: cheesecat47 <cheesecat47@gmail.com>
"""

from pydantic import BaseModel, Field


class AnalysisRequest(BaseModel):
    """분석 요청 파라미터

    Args:
        BaseModel (_type_): _description_
    """

    analysis_id: int = Field(description="분석 아이디")
    file_path: str = Field(description="분석할 영상 파일 경로")
