import Lottie from 'react-lottie';
import { analysisOptions } from '@/assets/lotties/lottieOptions';
import { formatInterviewSetTime } from '@/utils/formatDateTime';
import { formatVideoLength } from '@/utils/formatVideoLength';
import { ResultItemData } from '@/types/model/index';
import { useNavigate } from 'react-router-dom';

const ResultItem = ({ id, thumbnailPath, type, date, question, videoLength, complete }: ResultItemData) => {
  const navigate = useNavigate();

  return (
    <div
      className={`bg-white rounded-lg py-1 ${complete === false ? 'pointer-events-none' : 'cursor-pointer'}`}
      onClick={() => navigate(`/result/${id}`)}
    >
      <div className="relative">
        {complete === false && (
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-70 rounded-lg">
            <Lottie options={analysisOptions} height={50} width={150} />
            <div className="text-center pt-2">
              <span className="text-white text-xl font-semibold">결과 분석 중</span>
              <p className="text-white text-sm">5분 이내에 완료됩니다.</p>
            </div>
          </div>
        )}
        <div className="text-xs text-white text-center bg-BLACK p-1 w-10 rounded-md z-10 absolute right-2 bottom-2">
          <span>{formatVideoLength(videoLength)}</span>
        </div>
        <img
          width={350}
          height={250}
          src={thumbnailPath}
          alt={`Profile of user ${id}`}
          className="bg-cover bg-center rounded-lg bg-inherit shadow-md"
        />
      </div>
      <div className="flex justify-between mx-1 mt-2">
        <span className="text-sm text-MAIN1">{type == 'mock' ? '모의 면접' : '실전 면접'}</span>
        <span className="text-xs text-UNIMPORTANT_TEXT mr-1">{formatInterviewSetTime(date)}</span>
      </div>
      <span className="line-clamp-2 font-semibold text-BLACK text-lg mx-1">Q. {question}</span>
    </div>
  );
};

export default ResultItem;
