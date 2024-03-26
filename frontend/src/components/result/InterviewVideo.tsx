import { useRef, useState } from 'react';
import testVideo from '@/assets/video/test.mp4';
import LineChart from './LineChart';

const InterviewVideo = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 동영상 재생 위치가 변경될 때 호출되는 함수
  const handleVideoTimeUpdate = () => {
    setCurrentTime(videoRef.current?.currentTime || 0);
  };

  // 차트에서 새로운 시간을 설정할 때 호출되는 함수
  const handleChartTimeUpdate = (newTime: number) => {
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  return (
    <div className="p-5 flex gap-14">
      <div className="w-1/2 pt-10">
        <video ref={videoRef} onTimeUpdate={handleVideoTimeUpdate} controls>
          <source src={testVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="w-1/2">
        <div className="p-10 shadow-lg rounded-xl">
          <LineChart currentTime={currentTime} onTimeChange={handleChartTimeUpdate} />
        </div>
      </div>
    </div>
  );
};
export default InterviewVideo;
