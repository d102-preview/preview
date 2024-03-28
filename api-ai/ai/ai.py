import os
from typing import Tuple

import cv2
import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F
import torchvision.transforms as T

EMOTIONS = {
    0: "Angry",
    1: "Disgust",
    2: "Fear",
    3: "Happy",
    4: "Sad",
    5: "Surprise",
    6: "Neutral",
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

    print(f"Extract {len(frame_list)} images")

    return frame_list


def detect_faces(
    img: np.ndarray,
    dsize: Tuple[int] = (224, 224),
    classifier: cv2.CascadeClassifier = None
):
    if img is None:
        raise ValueError("img is required")

    if classifier is None:
        raise ValueError("classifier is required")

    # Haar cascade 모델이 흑백 이미지를 사용
    img_grey = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)

    faces = classifier.detectMultiScale(
        img_grey, scaleFactor=1.1, minNeighbors=5, minSize=(224, 224)
    )

    face_img = None

    for x, y, w, h in faces:
        m = max(w, h)
        cv2.rectangle(img, (x, y), (x + m, y + m), (0, 255, 0), 2)
        face_img = img[y: y + m, x: x + m].copy()
        if dsize is not None:
            face_img = cv2.resize(face_img, dsize=dsize)

    return img, face_img


def get_default_device():
    cuda = torch.cuda.is_available()
    mps = torch.backends.mps.is_available()

    if cuda:
        return torch.device("cuda")
    if mps:
        return torch.device("mps")
    else:
        return torch.device("cpu")


def to_device(
        data,
        device: torch.device
):
    if isinstance(data, (list, tuple)):
        return [to_device(x, device) for x in data]
    return data.to(device, non_blocking=True)


class ImageClassificationBase(nn.Module):
    def training_step(self, batch):
        inputs, labels = batch
        outputs = self(inputs)
        loss = F.cross_entropy(outputs, labels)
        acc = accuracy(outputs, labels)
        return {"loss": loss, "acc": acc.detach()}

    def validation_step(self, batch):
        inputs, labels = batch
        outputs = self(inputs)
        loss = F.cross_entropy(outputs, labels)
        acc = accuracy(outputs, labels)
        return {"val_loss": loss.detach(), "val_acc": acc.detach()}

    def get_metrics_epoch_end(self, outputs, validation=True):
        if validation:
            loss_ = "val_loss"
            acc_ = "val_acc"
        else:
            loss_ = "loss"
            acc_ = "acc"

        batch_losses = [x[f"{loss_}"] for x in outputs]
        epoch_loss = torch.stack(batch_losses).mean()

        batch_accs = [x[f"{acc_}"] for x in outputs]
        epoch_acc = torch.stack(batch_accs).mean()

        return {
            f"{loss_}": epoch_loss.detach().item(),
            f"{acc_}": epoch_acc.detach().item(),
        }

    def epoch_end(self, epoch, result, num_epochs):
        print(
            f"Epoch: {epoch+1}/{num_epochs} -> lr: {result['lrs'][-1]:.5f} "
            f"loss: {result['loss']:.4f}, acc: {result['acc']:.4f}, "
            f"val_loss: {result['val_loss']:.4f}, val_acc: {result['val_acc']:.4f}\n"
        )


def predict(
        img: np.ndarray,
        model: ImageClassificationBase,
        device: torch.device,
        dsize: Tuple[int] = (48, 48)
):
    transform = T.Compose([
        T.Grayscale(num_output_channels=1),
        T.Resize(dsize),
        T.ToTensor()
    ])
    img = transform(img)

    x = to_device(img.unsqueeze(0), device)

    model.eval()
    with torch.no_grad():
        y = model(x)

    _, preds = torch.max(y, dim=1)

    return EMOTIONS[preds[0].item()]
