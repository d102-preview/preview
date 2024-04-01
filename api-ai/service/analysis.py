import errno
import json
import os
from collections import Counter
from datetime import datetime

import numpy as np
import pandas as pd
from ai import resnet_proc
from ai.kobert_proc import kobert_model
from common.deps import MariaSessionDep, RedisSessionDep
from common.perf import elapsed
from core.settings import settings
from fastapi import HTTPException, status
from loguru import logger
from models.analysis import Analysis, Status
from PIL import Image
from pytz import timezone
from sqlmodel import select

# Convert emotion strings into value for interpolation
CONVERT_PRED = {"Positive": 1, "Neutral": 0, "Negative": -1}


@elapsed
def _facial_emotional_recognition(record: Analysis) -> None:
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

    # Save thumbnail and update record
    thumbnail_path = record.video_path.replace(".mp4", ".jpg")
    record.thumbnail_path = thumbnail_path

    if settings.DEBUG:
        thumbnail_path = os.path.join(
            str(settings.DATA_HOME), thumbnail_path.replace("/app/files/", "")
        )
    logger.debug(f"{thumbnail_path = }")
    resnet_proc.save_thumbnail(frame_list[0], thumbnail_path)

    # Detect face from the frames
    face_list = []
    for img in frame_list:
        _, face_img = resnet_proc.detect_faces(img, (224, 224))
        face_list.append(face_img)

    cnt_none = len([x for x in face_list if x is None])
    cnt_face = len(face_list) - cnt_none
    logger.debug(f"{cnt_face} faces / {len(frame_list)} frames")

    model = resnet_proc.get_model("ResNet18")

    # Count by emotion for calculate ratio
    cnt_emotion = {}

    predict_list = []
    for img in face_list:
        pred = None
        if img is not None:
            pred = resnet_proc.predict(Image.fromarray(img), model)
            cnt_emotion[pred] = cnt_emotion.get(pred, 0) + 1
            pred = CONVERT_PRED[pred]

        predict_list.append(pred)

    logger.info(f"Process {cnt_face} faces")

    # Calculate ratio
    ratio_values = np.array(list(cnt_emotion.values()))
    ratio_values = np.round(ratio_values * 100 / cnt_face, 2)
    ratio = {k.lower(): v for k, v in zip(cnt_emotion.keys(), ratio_values)}

    # Interpolate missing value - in case of the model cannot detect the face
    # (when `face_img` is None in L#53, L#68)
    if cnt_none > 0:
        logger.debug(f"Found {cnt_none} None value(s). Try to interpolate it/them.")
        predict_list = pd.Series(predict_list).interpolate().to_list()

    # Reduce the number of results: convert unit by seconds, not frames.
    # Split the predict_list into chunks (each chunk has same length as FPS)
    # and select the most common value of the chunk as the representitive.
    predict_list_by_second = []
    chunk_size, r = divmod(len(predict_list), settings.FPS)
    if r > 0:
        chunk_size += 1

    for chunk in np.array_split(predict_list, chunk_size):
        predict_list_by_second.append(Counter(chunk).most_common(1)[0][0])

    predict_list = {
        str(idx + 1): int(v) for idx, v in enumerate(predict_list_by_second)
    }

    # Update record
    record.video_length = len(predict_list_by_second)
    record.fps = settings.FPS
    record.frames = len(frame_list)
    record.emotion = json.dumps(
        {
            "ratio": ratio,
            "list": predict_list,
        }
    )


@elapsed
def _intent_recognition(record: Analysis) -> None:
    logger.info(f"Start intent recognition.")

    intent_labels = kobert_model.get_intent_labels()

    pred = kobert_model.predict(record.answer)

    result = []
    for k, v in pred:
        d = intent_labels.iloc[k][["category", "expression"]].to_dict()
        d["ratio"] = round(float(v), 2)
        result.append(d)

    record.intent = json.dumps(
        result,
        ensure_ascii=False,  # prevent Korean characters saved in unicode like `\uc9c1`
    )


@elapsed
def create_task(
    analysis_id: int,
    maria_session: MariaSessionDep,
    redis_session: RedisSessionDep,
) -> None:
    """
    파라미터로 받은 `analysis_id`를 사용해 해당하는 분석 요청을 분석 작업 큐에 등록한다.

    Args:
        analysis_id (int): DB `analysis` 테이블의 레코드 아이디.

    Raises:
        HTTPException: `analysis_id`에 해당하는 레코드가 없는 경우.
    """
    logger.info("Create task")

    stmt = select(Analysis).where(Analysis.id == analysis_id)
    record = maria_session.exec(stmt).one_or_none()

    if record is None:
        msg = f"No analysis record of id #{analysis_id}. Please check again."
        logger.error(msg)

        # TODO: Replace HTTPException with custom exception
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=msg)

    # Set analysis start time(`analysis_start_time`) as current time
    record.analysis_start_time = datetime.now(tz=timezone(settings.TZ))
    maria_session.add(record)
    maria_session.commit()

    # Set status
    redis_key = f"analysisHash:{analysis_id}"
    redis_session.hset(redis_key, "status", Status.PROCESSING.value)
    redis_session.expire(redis_key, settings.REDIS_EXPIRE_SECOND)

    try:
        # Step 1: Facial Emotional Recognition
        _facial_emotional_recognition(record)

        # Step 2: Intent Recognition
        _intent_recognition(record)
    except Exception as e:
        logger.error(f"Error while processing: {e}")
        redis_session.hset(redis_key, "status", Status.FAIL.value)
        redis_session.expire(redis_key, settings.REDIS_EXPIRE_SECOND)
    else:
        logger.info(f"Success to process id #{analysis_id}")
        redis_session.hset(redis_key, "status", Status.SUCCESS.value)
        redis_session.expire(redis_key, settings.REDIS_EXPIRE_SECOND)
    finally:
        # Update database
        record.analysis_end_time = datetime.now(tz=timezone(settings.TZ))
        maria_session.add(record)
        maria_session.commit()
