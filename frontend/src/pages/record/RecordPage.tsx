import InterviewQuestion from '@/components/interview/InterviewQuestion';
import RecordTimer from '@/components/interview/RecordTimer';
import { useCallback, useEffect, useRef } from 'react';

const RecordPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const getMediaPermission = useCallback(async () => {
    try {
      const video = { audio: true, video: true };

      const videoStream = await navigator.mediaDevices.getUserMedia(video);
      if (videoRef.current) {
        videoRef.current.srcObject = videoStream;

        console.log(videoStream);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getMediaPermission();
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center items-center w-full h-screen pb-10">
        <div className="h-16">{/* <p className="font-bold text-3xl">카메라, 마이크를 준비중입니다</p> */}</div>

        <div className="relative bg-black px-36">
          <video className="w-[40rem] h-[30rem]" ref={videoRef} autoPlay />
          <RecordTimer />
          <InterviewQuestion />
        </div>
      </div>
    </div>
  );
};

export default RecordPage;
