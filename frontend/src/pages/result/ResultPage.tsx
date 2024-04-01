import { useState, useEffect } from 'react';
import Header from '@/components/@common/Header/Header';
import ResultList from '@/components/result/result-list/ResultList';
import { interviewType } from '@/types/model';
import { useResult } from '@/hooks/result/useResult';

const ResultPage = () => {
  const [type, setType] = useState<interviewType>('mock');
  const [totalNum, setTotalNum] = useState<number>(0); // 총 개수 상태 추가

  const { useResultTotal } = useResult(); // 현재 타입에 따른 결과 가져오기
  const { data: totalData, isLoading, isError } = useResultTotal(type);

  useEffect(() => {
    if (totalData) {
      setTotalNum(totalData);
    }
  }, [totalData]);

  // 로딩 및 에러 처리
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred</div>;

  const buttonClass = (buttonType: interviewType) =>
    `text-${type === buttonType ? 'MAIN1' : 'UNIMPORTANT_TEXT'} font-semibold border-b-2 border-${type === buttonType ? 'MAIN1' : 'UNIMPORTANT_TEXT'}`;

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto mt-7">
        <div className="flex justify-between pb-7">
          <div className="flex gap-2 text-xl font-bold">
            <h3 className="text-[#696969]">{type == 'mock' ? '모의 면접' : '실전 면접'} 분석 결과</h3>
            <h3 className="text-MAIN1">{totalNum}</h3>
          </div>
          <div>
            <button className={`${buttonClass('mock')} mr-5`} onClick={() => setType('mock')}>
              모의 면접
            </button>
            <button className={buttonClass('main')} onClick={() => setType('main')}>
              실전 면접
            </button>
          </div>
        </div>
        <div className="flex">
          <ResultList type={type} />
        </div>
      </main>
    </>
  );
};

export default ResultPage;
