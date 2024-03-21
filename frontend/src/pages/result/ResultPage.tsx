import Header from '@/components/@common/Header/Header';
import ResultItem from '@/components/result/ResultItem';
import IMAGE1 from '@/assets/images/interview1.png';
import { useState } from 'react';
import ResultList from '@/components/result/ResultList';

const ResultPage = () => {
  const [type, setType] = useState<'mock' | 'main'>('mock');

  const buttonClass = (buttonType: 'mock' | 'main') =>
    `text-${type === buttonType ? 'MAIN1' : 'UNIMPORTANT_TEXT'} font-semibold border-b-2 border-${type === buttonType ? 'MAIN1' : 'UNIMPORTANT_TEXT'}`;

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto mt-7">
        <div className="flex justify-between pb-7">
          <div className="flex gap-2 text-xl font-bold">
            <h3 className="text-[#696969]">{type == 'mock' ? '모의 면접' : '실전 면접'} 분석 결과</h3>
            <h3 className="text-MAIN1">13</h3>
          </div>
          <div>
            <button className={`${buttonClass('main')} mr-5`} onClick={() => setType('main')}>
              실전 면접
            </button>
            <button className={buttonClass('mock')} onClick={() => setType('mock')}>
              모의 면접
            </button>
          </div>
        </div>
        <div className="flex">
          <ResultList />
        </div>
      </main>
    </>
  );
};

export default ResultPage;
