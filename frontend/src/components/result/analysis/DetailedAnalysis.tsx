import { useRef, useState } from 'react';
import { analysisType } from '@/types/result';
import { formatInterviewSetTime } from '@/utils/formatDateTime';
import testVideo from '@/assets/video/test.mp4';
import AnalysisTab from '../AnalysisTab';
import ChartArea from './ChartArea';
import { RiEmotionFill } from 'react-icons/ri';
import { HiMiniChatBubbleOvalLeftEllipsis, HiMiniKey } from 'react-icons/hi2';

// interface IResult {
//   emotion: {
//     ratio: {
//       positive: number;
//       neutral: number;
//       negative: number;
//     };
//     list: number[]; // 각 프레임별 감정 분류 배열의 타입을 가정합니다.
//   };
//   intent: {
//     // intent 관련 타입 정의 필요
//   };
// }

interface IDetailedAnalysisProps {
  type: string;
  question: string;
  // result: IResult;
  date: Date;
}

const DetailedAnalysis = ({ type, question, date }: IDetailedAnalysisProps) => {
  const [activeTab, setActiveTab] = useState<analysisType>('emotion');
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
    <div>
      <AnalysisTab activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="pt-14 px-7">
        <div className="flex gap-14">
          <div className="w-1/2">
            <video
              className="rounded-xl w-full shadow-lg "
              ref={videoRef}
              onTimeUpdate={handleVideoTimeUpdate}
              controls
            >
              <source src={testVideo} type="video/mp4" />
              비디오를 지원하지 않는 브라우저입니다.
            </video>
            <div className="flex justify-between px-1 pt-4 pb-1">
              <span className="text-MAIN1 text-lg">{type == 'mock' ? '모의 면접' : '실전 면접'}</span>
              <span className="text-lg text-UNIMPORTANT_TEXT mr-1">{formatInterviewSetTime(date)}</span>
            </div>
            <span className="font-semibold text-BLACK text-2xl mx-1">Q. {question}</span>

            <div className="border-b-2 border-gray my-7"></div>
            {/* 요약 */}
            <div className="py-1">
              <div className="border-2 border-gray rounded-lg p-7 text-UNIMPORTANT_TEXT text-lg">
                <div className="flex items-center gap-3 pb-4">
                  <RiEmotionFill />
                  <p>표정이 밝은 편이며 긍정적입니다.</p>
                </div>
                <div className="flex items-center gap-3 pb-4">
                  <HiMiniChatBubbleOvalLeftEllipsis />
                  <p>답변의 주요 의도는 ~~입니다.</p>
                </div>
                <div className="flex items-center gap-3">
                  <HiMiniKey />
                  <p>핵심 키워드 5개 중 3개 포함 되었습니다.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/2">
            <ChartArea
              activeTab={activeTab}
              // result={result}
              currentTime={currentTime}
              handleChartTimeUpdate={handleChartTimeUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedAnalysis;
