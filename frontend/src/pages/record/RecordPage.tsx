import Button from '@/components/@common/Button/Button';
// import InterviewQuestion from '@/components/interview/InterviewQuestion';
// import RecordTimer from '@/components/interview/RecordTimer';
import RecordPosition from '@/components/record/RecordPosition';
import { useCallback, useEffect, useRef, useState } from 'react';

const RecordPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);

  const getMediaPermission = useCallback(async () => {
    try {
      const video = { audio: true, video: true };

      const videoStream = await navigator.mediaDevices.getUserMedia(video);
      setStream(videoStream);

      if (videoRef.current) {
        videoRef.current.srcObject = videoStream;
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    // 아직 media stream이 설정되지 않았다면 호출
    if (!stream) {
      getMediaPermission();
    }

    // 페이지 이탈 또는 컴포넌트 언마운트 시 미디어 스트림 정지
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center w-full h-screen pb-10">
        <div className="w-[58rem] relative flex justify-end pb-5 text-center">
          <p className="absolute top-0 left-1/2 -translate-x-1/2 font-bold text-3xl">
            {stream ? '다음 버튼을 눌러주세요' : '카메라, 마이크를 준비중입니다'}
          </p>

          <div className="">
            {stream ? (
              <Button
                text="다음"
                height="h-9"
                backgroundColor="bg-MAIN1"
                textColor="text-white"
                onClick={() => console.log('하이')}
              />
            ) : (
              <Button
                text="다음"
                height="h-9"
                backgroundColor="bg-gray-200"
                textColor="text-UNIMPORTANT_TEXT"
                onClick={e => e.preventDefault()}
              />
            )}
          </div>
        </div>

        <div className="relative bg-black px-[9rem]">
          <video className="w-[40rem] h-[30rem]" ref={videoRef} autoPlay />
          {stream && <RecordPosition />}

          {/* <RecordTimer /> */}
          {/* <InterviewQuestion /> */}
        </div>
      </div>
    </div>
  );
};

export default RecordPage;
