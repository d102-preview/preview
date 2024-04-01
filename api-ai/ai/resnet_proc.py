import errno
import os
from typing import Tuple

import cv2
import numpy as np
import torch
import torchvision.transforms as T
from ai.resnet9 import ImageClassificationBase, ResNet9
from loguru import logger
from torchvision.models import resnet18

EMOTIONS = {0: "Negative", 1: "Neutral", 2: "Positive"}

__haar_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)

MODELS = {
    "ResNet9": "ai/models/ResNet9/ResNet9_epoch-198_score-0.846.pth",
    "ResNet18": "ai/models/ResNet18/ResNet18_epoch-20_score-0.865.pth",
}


def extract_frames(path: str, msec: int = 1000) -> list:
    """
    영상 파일에서 msec마다 프레임을 추출하여 반환.

    Args:
        path (str): 영상 파일 경로.
        msec (int, optional): 프레임 간격. 기본값 1000 (1초).

    Returns:
        list: 프레임 목록
    """
    video = cv2.VideoCapture(path)

    frame_list = []

    success = True
    count = 0
    while success:
        video.set(cv2.CAP_PROP_POS_MSEC, count * msec)
        count += 1

        success, img = video.read()
        if not success:
            continue

        frame_list.append(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))

    return frame_list


def detect_faces(
    img: np.ndarray,
    dsize: Tuple[int] = (224, 224),
    classifier: cv2.CascadeClassifier = __haar_cascade,
):
    if img is None:
        raise ValueError("img is required")

    faces = classifier.detectMultiScale(
        img, scaleFactor=1.1, minNeighbors=5, minSize=dsize
    )

    face_img = None

    for x, y, w, h in faces:
        m = max(w, h)
        cv2.rectangle(img, (x, y), (x + m, y + m), (0, 255, 0), 2)
        face_img = img[y : y + m, x : x + m].copy()
        if dsize is not None:
            face_img = cv2.resize(face_img, dsize=dsize)

    return img, face_img


def save_thumbnail(img: np.ndarray, path: str):
    try:
        logger.debug(f"Save thumbnail to {path}")

        width = 540
        height = int(img.shape[0] * (width / img.shape[1]))
        thumbnail = cv2.resize(img, dsize=(width, height))
        logger.debug(
            f"Resize thumbnail from ({img.shape[1]}, {img.shape[0]}) to ({width}, {height})"
        )

        thumbnail = cv2.cvtColor(thumbnail, cv2.COLOR_BGR2RGB)
        cv2.imwrite(path, thumbnail)
    except Exception as e:
        logger.error("Failed to create a thumbnail: {}", e)


def get_default_device():
    cuda = torch.cuda.is_available()
    mps = torch.backends.mps.is_available()

    if cuda:
        return torch.device("cuda")
    if mps:
        return torch.device("mps")
    else:
        return torch.device("cpu")


def to_device(data, device: torch.device = get_default_device()):
    if isinstance(data, (list, tuple)):
        return [to_device(x, device) for x in data]
    return data.to(device, non_blocking=True)


def get_model(name: str, device: torch.device = get_default_device()):
    if name not in MODELS:
        raise Exception("No such model")

    model_path = os.path.join(os.getcwd(), MODELS[name])

    if not os.path.exists(model_path):
        msg = f"No model file on {model_path}"
        logger.error(msg)
        raise FileNotFoundError(errno.ENOENT, os.strerror(errno.ENOENT), model_path)

    model = None
    if name == "ResNet9":
        model = ResNet9(1, 7)
    elif name == "ResNet18":
        # Original ResNet18 uses 1,000 classes,
        # but we trained it with 3 classes: positive, neutral, negative.
        model = resnet18(num_classes=3)

    if model is None:
        raise Exception("Cannot load the model")

    model.load_state_dict(torch.load(model_path, map_location=device))
    model.eval()

    return model


def predict(
    img: np.ndarray,
    model: ImageClassificationBase,
    device: torch.device = get_default_device(),
    dsize: Tuple[int] = (224, 224),
):
    transform = T.Compose([T.Resize(dsize), T.ToTensor()])
    img = transform(img)

    x = to_device(img.unsqueeze(0), device)

    model.eval()
    with torch.no_grad():
        y = model(x)

    _, preds = torch.max(y, dim=1)

    return EMOTIONS[preds[0].item()]
