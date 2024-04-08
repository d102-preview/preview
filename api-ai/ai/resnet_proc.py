import errno
import os
from typing import Tuple

import cv2
import numpy as np
import torch
import torchvision.transforms as T
from loguru import logger
from torchvision.models import resnet18

EMOTIONS = {0: "Negative", 1: "Neutral", 2: "Positive"}

MODELS = {
    "ResNet9": "ai/models/ResNet9/ResNet9_epoch-198_score-0.846.pth",
    "ResNet18": "ai/models/ResNet18/resnet18_acc_0.849_2404021036.pth",
}


class ResNet18Model:
    def __init__(self) -> None:
        self._classifier = cv2.CascadeClassifier(
            cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
        )
        self._device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self._model = self._load_model()

    def _load_model(self) -> resnet18:
        model_path = os.path.join(os.getcwd(), MODELS["ResNet18"])

        if not os.path.exists(model_path):
            msg = f"No model file on {model_path}"
            logger.error(msg)
            raise FileNotFoundError(errno.ENOENT, os.strerror(errno.ENOENT), model_path)

        model = resnet18(num_classes=3)
        model.load_state_dict(torch.load(model_path, map_location=self._device))
        model.eval()
        return model

    def get_model(self) -> resnet18:
        if self._model is None:
            self._model = self._load_model()
        return self._model

    def _to_device(self, data):
        if isinstance(data, (list, tuple)):
            return [self._to_device(x) for x in data]
        return data.to(self._device, non_blocking=True)

    def extract_frames(self, path: str, msec: int = 1000) -> list:
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

    def detect_faces(self, img: np.ndarray, dsize: Tuple[int] = (224, 224)):
        if img is None:
            raise ValueError("img is required")

        faces = self._classifier.detectMultiScale(
            img, scaleFactor=1.1, minNeighbors=5, minSize=dsize
        )
        if len(faces) == 0:
            return None, None

        face_img = None

        for x, y, w, h in faces:
            m = max(w, h)
            cv2.rectangle(img, (x, y), (x + m, y + m), (0, 255, 0), 2)
            face_img = img[y : y + m, x : x + m].copy()
            if dsize is not None:
                face_img = cv2.resize(face_img, dsize=dsize)

        return img, face_img

    def save_thumbnail(self, img: np.ndarray, path: str):
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

    def predict(self, img: np.ndarray, dsize: Tuple[int] = (224, 224)):
        transform = T.Compose([T.Resize(dsize), T.ToTensor()])
        img = transform(img)

        x = self._to_device(img.unsqueeze(0))

        with torch.no_grad():
            y = self._model(x)

        _, preds = torch.max(y, dim=1)

        return EMOTIONS[preds[0].item()]


resnet18_model = ResNet18Model()
