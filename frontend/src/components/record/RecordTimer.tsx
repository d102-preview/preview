import { recordStatusType } from '@/pages/record/RecordPage';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IRecordTimerProps {
  setStatus: Dispatch<SetStateAction<recordStatusType>>;
}

const RecordTimer = ({ setStatus }: IRecordTimerProps) => {
  const [count, setCount] = useState<number>(3);
  const [isStart, setIsStart] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prevTime => prevTime - 1);
    }, 1000);

    if (count <= 0) {
      clearInterval(timer);
      setIsStart(true);

      setTimeout(() => {
        setStatus('proceeding');
      }, 2000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [count]);

  return (
    <>
      {!isStart && (
        <>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center">
            <p className="text-MAIN1 text-7xl">{count}</p>
            <p className="text-2xl pt-5">초 뒤 답변을 시작해주세요</p>
          </div>
        </>
      )}
      {isStart && (
        <>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center">
            <p className="text-MAIN1 text-7xl">START</p>
          </div>
        </>
      )}
    </>
  );
};

export default RecordTimer;
