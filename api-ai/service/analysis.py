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
    # value of record.video_path seems like
    # `/app/files/video/admin@d102.com/2024-03-29T15-28-00/test1.mp4`
    # so, for the dev environment, replace `/app/files` into `settings.DATA_HOME`
    video_path = record.video_path
    if settings.DEBUG:
        video_path = os.path.join(
            str(settings.DATA_HOME), video_path.replace("/app/files/", "")
        )
    logger.debug(f"{str(settings.DATA_HOME)=} {video_path = }")

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
def _intent_recognition() -> dict:
    # TODO: Add 'answer' column in `analysis` table of DB,
    #       and then replace this `sample_answer` to `record.answer`.
    sample_answer = "최근에 1주일 정도 짧게 SpringBoot를 사용하여 REST API 서버를 구축하는 프로젝트를 진행했습니다. 이 때 제가 제일 중요하게 고려했던 점 두 가지는 Swagger를 꼼꼼하게 만든 것과 파라미터 유효성 검증입니다. API 서버라면 수많은 요청을 빠르게 처리하고 응답하는 것도 중요하지만, 이상하거나 허용되지 않은 방식의 입력값으로 요청했을 때 이를 거부하여 시스템의 안정성을 유지하는 것도 매우 중요한 요소라고 생각했습니다."

    intent_labels = kobert_model.get_intent_labels()

    pred = kobert_model.predict(sample_answer)

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
    emotion_list = _facial_emotional_recognition(record)

    # Step 2: Intent Recognition
    intent_list = _intent_recognition()

    return emotion_list, intent_list
