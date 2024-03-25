"""
Author: cheesecat47 <cheesecat47@gmail.com>
"""

from fastapi import APIRouter, status
from loguru import logger
from models.analysis import AnalysisRequest

router = APIRouter(tags=["1. ai"])


@router.post(
    "/analysis",
    summary="답변 영상 분석",
    status_code=status.HTTP_202_ACCEPTED,
)
def analyse_video(params: AnalysisRequest):
    """답변 영상 분석

    Args:
        params (AnalysisRequest): _description_
    """
    logger.info("Analyse video")
