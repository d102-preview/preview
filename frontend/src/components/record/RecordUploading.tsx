import { recordStatusType } from '@/pages/record/RecordPage';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface IRecordUploadingProps {
  questionIndex: number;
  setQuestionIndex: Dispatch<SetStateAction<number>>;
  setStatus: Dispatch<SetStateAction<recordStatusType>>;
}

const RecordUploading = ({ questionIndex, setQuestionIndex, setStatus }: IRecordUploadingProps) => {
  useEffect(() => {
    setTimeout(() => {
      // #TODO 마지막 질문 처리
      setQuestionIndex(questionIndex + 1);
      setStatus('preparing');
    }, 1500);
    console.log('업로드 완료');
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 z-50 w-[58rem] h-full bg-[#383838] text-white flex justify-center items-center">
      <div className="">
        <p className="text-center text-5xl font-bold">업로드 중</p>
        <div className="w-[30rem] h-1 bg-black rounded-lg mt-20">
          <div className="animate-uploading h-1 bg-white rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default RecordUploading;
