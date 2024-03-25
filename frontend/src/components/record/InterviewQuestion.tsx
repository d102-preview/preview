import { recordStatusType } from '@/pages/record/RecordPage';
import { IQuestionItem } from '@/types/model';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IInterviewQuestionProps {
  question: IQuestionItem;
  status: recordStatusType;
  setStatus: Dispatch<SetStateAction<recordStatusType>>;
  handleStopRecording: () => void;
}

const InterviewQuestion = ({ question, status, setStatus, handleStopRecording }: IInterviewQuestionProps) => {
  const [count, setCount] = useState<number>(30);

  useEffect(() => {
    if (status === 'proceeding') {
      const timer = setInterval(() => {
        setCount(prevTime => prevTime - 1);
      }, 1000);

      if (count <= 0) {
        clearInterval(timer);
        handleStopRecording();
        setStatus('uploading');
        console.log('타이머가 종료되었습니다.');
      }

      return () => {
        clearInterval(timer);
      };
    }
  }, [count]);

  return (
    <div className="absolute top-0 left-0 right-0 mx-[9.2rem] px-5 bg-black rounded-b-xl ">
      <div className="flex justify-between items-center font-bold gap-5 my-2">
        <div className="whitespace-nowrap bg-white rounded-2xl py-1 px-3">
          <p>질문</p>
        </div>
        <p className="text-lg text-white">{question.question}</p>
        <div className="w-20">
          {status === 'proceeding' && (
            <div className="flex justify-center items-center gap-2 text-white border border-white rounded-2xl py-1 px-3">
              <div className="w-[0.3rem] h-[0.3rem] bg-red-700 rounded-full"></div>
              <p>00:{count.toString().padStart(2, '0')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewQuestion;
