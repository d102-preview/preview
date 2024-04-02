import { useState } from 'react';
import Header from '@/components/@common/Header/Header';
import ResultList from '@/components/result/result-list/ResultList';
import { interviewType } from '@/types/model';
import Footer from '@/components/@common/Footer/Footer';

const ResultPage = () => {
  const [type, setType] = useState<interviewType>('mock');

  const buttonClass = (buttonType: interviewType) =>
    `text-${type === buttonType ? 'MAIN1' : 'UNIMPORTANT_TEXT'} font-semibold border-b-2 border-${type === buttonType ? 'MAIN1' : 'UNIMPORTANT_TEXT'}`;

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto mt-7">
        <div className="flex justify-between pb-3">
          <div className="flex gap-2 text-xl font-bold">
            <h3 className="text-[#696969]">{type == 'mock' ? '모의 면접' : '실전 면접'} 분석 결과</h3>
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
      <Footer />
    </>
  );
};

export default ResultPage;
