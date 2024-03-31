from common.deps import MariaSessionDep, RedisSessionDep
from fastapi import APIRouter, status
from loguru import logger
from models.analysis import AnalysisRequest, AnalysisResponse
from models.common import Status
from service.analysis import create_task

router = APIRouter()


@router.post(
    "/",
    summary="답변 영상 분석",
    status_code=status.HTTP_202_ACCEPTED,
    responses={
        202: {"description": "분석 작업 요청 큐에 등록 성공", "model": AnalysisResponse}
    },
    response_model_exclude_unset=True,
)
def analyse_video(
    params: AnalysisRequest,
    maria_session: MariaSessionDep,
    redis_session: RedisSessionDep,
) -> None:
    """
    답변 영상 분석
    """
    logger.info("Analyse video")

    create_task(params.analysis_id, maria_session, redis_session)

    return AnalysisResponse(
        result=Status.OK,
    )
