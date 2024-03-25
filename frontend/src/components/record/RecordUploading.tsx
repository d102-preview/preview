import { recordStatusType } from '@/pages/record/RecordPage';
import { IQuestionItem } from '@/types/model';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface IRecordUploadingProps {
  questionList: IQuestionItem[];
  questionIndex: number;
  setQuestionIndex: Dispatch<SetStateAction<number>>;
  setStatus: Dispatch<SetStateAction<recordStatusType>>;
}

const RecordUploading = ({ questionList, questionIndex, setQuestionIndex, setStatus }: IRecordUploadingProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (questionIndex + 1 === questionList.length) {
        navigate('/');
      } else {
        setQuestionIndex(questionIndex + 1);
        setStatus('preparing');
      }
    }, 2000);
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
