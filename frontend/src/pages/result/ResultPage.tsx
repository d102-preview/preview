import Header from '@/components/@common/Header/Header';
import ResultReport from '@/components/ResultReport';

const ResultPage = () => {
  return (
    <>
      <Header />
      <main className="max-w-9xl mx-auto my-10">
        <ResultReport question="지원자의 강점 (장점)은 무엇입니까?" name="김싸피" percent={70} prepare="우수" />
      </main>
    </>
  );
};

export default ResultPage;
