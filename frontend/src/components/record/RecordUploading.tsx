import { recordStatusType } from '@/pages/record/RecordPage';
import { IInterviewQuestionItem } from '@/types/interview';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import followupLoading from '@/assets/lotties/followupLoading.json';

interface IRecordUploadingProps {
  questionList: IInterviewQuestionItem[];
  questionIndex: number;
  setQuestionIndex: Dispatch<SetStateAction<number>>;
  setStatus: Dispatch<SetStateAction<recordStatusType>>;
}

const RecordUploading = ({ questionList, questionIndex, setQuestionIndex, setStatus }: IRecordUploadingProps) => {
  const navigate = useNavigate();
  const followupOptions = {
    loop: true,
    autoplay: true,
    animationData: followupLoading, // Lottie 애니메이션 데이터
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  useEffect(() => {
    setTimeout(() => {
      if (questionIndex + 1 === questionList.length) {
        navigate('/');
      } else {
        setQuestionIndex(questionIndex + 1);
        setStatus('preparing');
      }
    }, 2000);
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black z-50">
      <div className="w-full h-full flex flex-col items-center justify-center gap-10">
        <p className="text-center text-3xl text-white">직전 답변에 대한 심층 질문 생성중</p>
        <Lottie options={followupOptions} height={150} width={150} />
      </div>
    </div>
  );
};

export default RecordUploading;
