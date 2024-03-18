1. 데이터 다운로드

    - <https://aihub.or.kr/aihubdata/data/view.do?currMenu=115&topMenu=100&aihubDataSe=data&dataSetSn=82>

2. `data` 디렉토리 생성 후 다운로드 받은 데이터 옮기기.

    ```bash
    mkdir data
    
    # 또는 다운로드 받은 폴더로 심볼릭 링크 생성
    # ln -s /media/ssafy/Volume1/korean_emotion_data ./data

    tree -d
    .
    ├── Training
    │   ├── [라벨]EMOIMG_불안_TRAIN
    │   ├── [라벨]EMOIMG_당황_TRAIN
    │   ├── [라벨]EMOIMG_상처_TRAIN
    │   ├── [라벨]EMOIMG_기쁨_TRAIN
    │   ├── [라벨]EMOIMG_중립_TRAIN
    │   ├── [라벨]EMOIMG_슬픔_TRAIN
    │   ├── [라벨]EMOIMG_분노_TRAIN
    │   ├── [원천]EMOIMG_기쁨_TRAIN_01
    │   ├── [원천]EMOIMG_슬픔_TRAIN_01
    │   ├── [원천]EMOIMG_당황_TRAIN_01
    │   ├── [원천]EMOIMG_중립_TRAIN_01
    │   ├── [원천]EMOIMG_분노_TRAIN_01
    │   ├── [원천]EMOIMG_불안_TRAIN_01
    │   └── [원천]EMOIMG_상처_TRAIN_01
    └── Validation
        ├── [원천]EMOIMG_분노_VALID
        ├── [원천]EMOIMG_중립_VALID
        ├── [라벨]EMOIMG_슬픔_VALID
        ├── [원천]EMOIMG_당황_VALID
        ├── [원천]EMOIMG_상처_VALID
        ├── [원천]EMOIMG_불안_VALID
        ├── [라벨]EMOIMG_당황_VALID
        ├── [원천]EMOIMG_슬픔_VALID
        ├── [라벨]EMOIMG_불안_VALID
        ├── [라벨]EMOIMG_상처_VALID
        ├── [라벨]EMOIMG_중립_VALID
        └── [라벨]EMOIMG_분노_VALID
    ```
