import os
from datetime import datetime

from ai.ai import extract_frames
from common.deps import SessionDep
from core.settings import settings
from fastapi import HTTPException, status
from loguru import logger
from models.analysis import Analysis
from pytz import timezone
from sqlmodel import select


def _facial_emotional_recognition(record: Analysis):
    video_path = os.path.join(settings.DATA_HOME, record.video_path)

    # check file exists
    if not os.path.exists(video_path):
        msg = f"No target file on {video_path}"
        logger.error(msg)

        # TODO: Replace HTTPException with custom exception
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=msg)

    logger.info(f"Start facial emotional recognition. {video_path = }")

    # Extract frames
    frame_list = extract_frames(video_path, msec=(1000 // settings.FPS))
    logger.debug(f"{len(frame_list)} frames are extracted from the input video")


def create_task(analysis_id: int, session: SessionDep) -> None:
    """
    파라미터로 받은 `analysis_id`를 사용해 해당하는 분석 요청을 분석 작업 큐에 등록한다.

    Args:
        analysis_id (int): DB `analysis` 테이블의 레코드 아이디.

    Raises:
        HTTPException: `analysis_id`에 해당하는 레코드가 없는 경우.
    """
    logger.info("Create task")

    stmt = select(Analysis).where(Analysis.id == analysis_id)
    record = session.exec(stmt).one_or_none()

    if record is None:
        msg = f"No analysis record of id #{analysis_id}. Please check again."
        logger.error(msg)

        # TODO: Replace HTTPException with custom exception
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=msg)

    # Set analysis start time(`analysis_start_time`) as current time
    record.analysis_start_time = datetime.now(tz=timezone(settings.TZ))
    session.add(record)
    session.commit()

    # Step 1: Facial Emotional Recognition
    _facial_emotional_recognition(record)

    return
