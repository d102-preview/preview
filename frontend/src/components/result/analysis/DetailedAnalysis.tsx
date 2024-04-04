import { useRef, useState } from 'react';
import { IAnalysisDetail, analysisType } from '@/types/result';
// import { formatInterviewSetTime } from '@/utils/formatDateTime';
// import testVideo from '@/assets/video/test.mp4';
import AnalysisTab from '../AnalysisTab';
import ChartArea from './ChartArea';
import { RiEmotionFill } from 'react-icons/ri';
import { HiMiniChatBubbleOvalLeftEllipsis, HiMiniKey } from 'react-icons/hi2';
import { formatInterviewSetTime } from '@/utils/formatDateTime';
import ReactPlayer from 'react-player';

interface IDetailedAnalysisProps {
  type: string;
  question: string;
  analysisDetail: IAnalysisDetail;
  date: string;
}

const DetailedAnalysis = ({ type, question, analysisDetail, date }: IDetailedAnalysisProps) => {
  const [activeTab, setActiveTab] = useState<analysisType>('emotion');
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<any>(null);

  const videoLenght = analysisDetail.videoLength;

  // 핵심 키워드
  const answer = analysisDetail.answer;
  const keywords: string[] = analysisDetail.keywordList;

  // 포함된 키워드 계산
  const includedKeywords = keywords.filter(keyword => answer.includes(keyword));
  const includedCount = includedKeywords.length;

  // 의도 분석
  const labels = analysisDetail.intentList.map(item => item.expression);

  // 감정 분석
  const emotion = analysisDetail.emotionMap.ratio;
  let emotionMessage = '';
  let highestRatio = Math.max(emotion.positive || 0, emotion.negative || 0, emotion.neutral || 0);

  if (highestRatio === emotion.positive) {
    emotionMessage = '표정이 밝은 편이며 긍정적입니다.';
  } else if (highestRatio === emotion.negative) {
    emotionMessage = '표정이 어두운 편이며 부정적입니다.';
  } else {
    emotionMessage = '무표정이 많습니다.';
  }

  // 차트에서 새로운 시간을 설정할 때 호출되는 함수
  const handleChartTimeUpdate = (newTime: number) => {
    setCurrentTime(newTime);
    videoRef.current.seekTo(newTime, 'seconds');
  };
  const url = `${import.meta.env.VITE_BASE_URL}/file/download/video?path=${analysisDetail.videoPath}`;

  // 동영상 재생 위치가 변경될 때 호출되는 함수
  const handleProgress = () => {
    setCurrentTime(videoRef.current.getCurrentTime());
  };

  return (
    <div>
      <AnalysisTab activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="pt-10 px-7">
        <div className="flex gap-14">
          <div className=" w-1/2">
            <div className="w-full flex justify-center bg-black">
              <ReactPlayer
                width={430}
                height={280}
                url={url}
                controls={true}
                playing={true}
                ref={videoRef}
                onProgress={handleProgress}
              />
            </div>
            <div className="flex justify-between px-1 pt-4 pb-1">
              <span className="text-MAIN1">{type == 'mock' ? '모의 면접' : '실전 면접'}</span>
              <span className="text-UNIMPORTANT_TEXT mr-1">{formatInterviewSetTime(date)}</span>
            </div>
            <span className="font-semibold text-BLACK mx-1">Q. {question}</span>

            {/* 요약 */}
            <div className="border-b-2 border-gray my-5"></div>
            <div className="py-1">
              <div className="border-2 border-gray rounded-lg p-7 text-UNIMPORTANT_TEXT">
                <div className="flex items-start  gap-3 pb-4">
                  <RiEmotionFill size={25} />
                  <p className="font-semibold">{emotionMessage}</p>
                </div>
                <div className="flex items-start gap-3 pb-4">
                  <HiMiniChatBubbleOvalLeftEllipsis size={25} />
                  <p>
                    답변의 주요 의도는{' '}
                    <span className="font-semibold">
                      {labels[0]}, {labels[1]}, {labels[2]}
                    </span>{' '}
                    입니다.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <HiMiniKey size={25} />
                  <p>
                    핵심 키워드{' '}
                    <span className="font-semibold">
                      {keywords.length}개 중 {includedCount}개 포함
                    </span>{' '}
                    되었습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/2">
            <ChartArea
              activeTab={activeTab}
              analysisDetail={analysisDetail}
              currentTime={currentTime}
              handleChartTimeUpdate={handleChartTimeUpdate}
              videoLenght={videoLenght}
              emotionMessage={emotionMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedAnalysis;
