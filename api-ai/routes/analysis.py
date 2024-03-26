from fastapi import APIRouter, status
from loguru import logger
from models.analysis import AnalysisRequest, AnalysisResponse
from models.common import Status
from service.analysis import create_task

router = APIRouter(tags=["1. ai"])


@router.post(
    "/analysis",
    summary="답변 영상 분석",
    status_code=status.HTTP_202_ACCEPTED,
    responses={
        202: {"description": "분석 작업 요청 큐에 등록 성공", "model": AnalysisResponse}
    },
    response_model_exclude_unset=True,
)
def analyse_video(params: AnalysisRequest):
    """
    답변 영상 분석
    """
    logger.info("Analyse video")

    create_task(params.analysis_id)

    return AnalysisResponse(result=Status.OK)


@router.get("/", summary="서버 Health Check", status_code=status.HTTP_200_OK)
def health_check():
    """서버가 실행 중이면 \"ok\" 반환"""
    return "ok"
