import os
from multiprocessing import Pool

import cv2

haar_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)


def detect_faces_mp(
    img_path: str
):
    if not os.path.exists(img_path):
        return

    try:
        img = cv2.imread(img_path)

        # Haar cascade 모델이 흑백 이미지를 사용
        faces = haar_cascade.detectMultiScale(
            cv2.cvtColor(img, cv2.COLOR_BGR2GRAY),
            scaleFactor=1.1,
            minNeighbors=5,
            minSize=(224, 224)
        )

        for x, y, w, h in faces:
            m = max(w, h)
            cv2.rectangle(img, (x, y), (x + m, y + m), (0, 255, 0), 0)
            face_img = cv2.resize(
                img[y: y + m, x: x + m].copy(), dsize=(224, 224))

            base, ext = os.path.splitext(img_path)
            out_path = f"{base}_face{ext}"
            cv2.imwrite(out_path, face_img)

        if os.path.exists(img_path):
            os.remove(img_path)
    except Exception:
        pass


def process_images_mp(path):
    if not os.path.exists(path):
        return

    files = os.listdir(path)

    img_list = [os.path.join(path, fn) for fn in files if fn[:9] != '_face.jpg']
    print(img_list[:3])

    with Pool(10) as pool:
        pool.map(detect_faces_mp, img_list)
