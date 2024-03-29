import errno
import os
from datetime import datetime

from ai import resnet_proc
from ai.kobert_proc import kobert_model
from common.deps import SessionDep
from common.perf import elapsed
from core.settings import settings
from fastapi import HTTPException, status
from loguru import logger
from models.analysis import Analysis
from PIL import Image
from pytz import timezone
from sqlmodel import select


@elapsed
def _facial_emotional_recognition(record: Analysis) -> list:
    video_path = os.path.join(settings.DATA_HOME, record.video_path)

    # check file exists
    if not os.path.exists(video_path):
        msg = f"No target file on {video_path}"
        logger.error(msg)
        raise FileNotFoundError(errno.ENOENT, os.strerror(errno.ENOENT), video_path)

    logger.info(f"Start facial emotional recognition. {video_path = }")

    # Extract frames
    frame_list = resnet_proc.extract_frames(video_path, msec=(1000 // settings.FPS))
    logger.debug(f"{len(frame_list)} frames are extracted from the input video")

    # Detect face from the frames
    face_list = []
    for img in frame_list:
        _, face_img = resnet_proc.detect_faces(img, (224, 224))

        if face_img is None:
            continue

        face_list.append(face_img)
    logger.debug(f"{len(face_list)} faces are detected from {len(frame_list)} frames")

    model = resnet_proc.get_model("ResNet18")

    predict_list = []
    for img in face_list:
        predict_list.append(resnet_proc.predict(Image.fromarray(img), model))
    logger.info(f"Predict {len(predict_list)} faces")

    return predict_list


@elapsed
def _intent_recognition(record: Analysis) -> dict:
    intent_labels = kobert_model.get_intent_labels()

    pred = kobert_model.predict(record.answer)

    result = intent_labels.iloc[pred][["category", "expression"]].to_dict()
    logger.debug(f"predict: {result}")

    return result


@elapsed
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
    # emotion_list = _facial_emotional_recognition(record)

    # Step 2: Intent Recognition
    intent_list = _intent_recognition(record)

    return [], intent_list
