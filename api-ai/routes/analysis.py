from common.deps import MariaSessionDep, RedisSessionDep
from fastapi import APIRouter, BackgroundTasks, status
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
async def analyse_video(
    params: AnalysisRequest,
    maria_session: MariaSessionDep,
    redis_session: RedisSessionDep,
    tasks: BackgroundTasks,
) -> None:
    """
    답변 영상 분석
    """
    # Run analysis in the background
    tasks.add_task(create_task, params.analysis_id, maria_session, redis_session)

    logger.info(
        "Analyse video task has created. {} task(s) is/are in queue.",
        len(tasks.tasks),
    )

    return AnalysisResponse(
        result=Status.OK,
    )
