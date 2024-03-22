import ResultReport from '@/components/ResultReport';

const ResultPage = () => {
  return (
    <div>
      <div>결과 페이지 입니다</div>
      <ResultReport question="지원자의 강점 (장점)은 무엇입니까?" name="김싸피" percent={50} prepare="우수" />
    </div>
  );
};

export default ResultPage;
