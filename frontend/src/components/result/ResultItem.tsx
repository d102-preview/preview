import Lottie from 'react-lottie';
import loading from '@/assets/lotties/loading.json';
import { formatInterviewSetTime } from '@/utils/formatDateTime';
import { ResultItemData } from '@/types/model/index';
import { useNavigate } from 'react-router-dom';

const ResultItem = ({ result, id, imagePath, type, date, question, time }: ResultItemData) => {
  const navigate = useNavigate();

  // Lottie 이미지
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div
      className={`bg-white rounded-lg py-1 ${result === 'fail' ? 'pointer-events-none' : 'cursor-pointer'}`}
      onClick={() => navigate(`/result/${id}`)}
    >
      <div className="relative">
        {result === 'fail' && (
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-70 rounded-lg">
            <Lottie options={defaultOptions} height={50} width={150} />
            <div className="text-center pt-2">
              <span className="text-white text-xl font-semibold">결과 분석 중</span>
              <p className="text-white text-sm">5분 이내에 완료됩니다.</p>
            </div>
          </div>
        )}
        <div className="text-xs text-white text-center bg-BLACK p-1 w-10 rounded-md z-10 absolute right-2 bottom-2">
          <span>{time}</span>
        </div>
        <img
          src={imagePath}
          alt={`Profile of user ${id}`}
          className="bg-cover bg-center rounded-lg bg-inherit shadow-md"
        />
      </div>
      <div className="flex justify-between mx-1 mt-2">
        <span className="text-sm text-MAIN1">{type == 'mock' ? '모의 면접' : '실전 면접'}</span>
        <span className="text-xs text-UNIMPORTANT_TEXT mr-1">{formatInterviewSetTime(date)}</span>
      </div>
      <span className="font-semibold text-BLACK text-lg mx-1">Q. {question}</span>
    </div>
  );
};

export default ResultItem;
