import Header from '@/components/@common/Header/Header';
import ResultReport from '@/components/result/ResultReport';

const ResultReportPage = () => {
  const question = '지원자의 강점 (장점)은 무엇입니까?';
  const name = '김싸피';
  const percent = 70;

  const getPrepareText = (percent: number) => {
    if (percent >= 0 && percent <= 20) {
      return '매우 부족';
    } else if (percent > 20 && percent <= 40) {
      return '부족';
    } else if (percent > 40 && percent <= 60) {
      return '보통';
    } else if (percent > 60 && percent <= 80) {
      return '우수';
    } else {
      return '매우 우수';
    }
  };

  const getStateNumber = (percent: number) => {
    if (percent >= 0 && percent <= 20) {
      return 1;
    } else if (percent > 20 && percent <= 40) {
      return 2;
    } else if (percent > 40 && percent <= 60) {
      return 3;
    } else if (percent > 60 && percent <= 80) {
      return 4;
    } else {
      return 5;
    }
  };

  const prepare = getPrepareText(percent);
  const state = getStateNumber(percent);

  return (
    <>
      <Header />
      <main className="max-w-9xl mx-auto my-10">
        <div className="w-10/12 mx-auto">
          <div>
            <h3 className="text-3xl font-bold text-BLACK">프리뷰 분석 결과</h3>
            <p className="text-lg text-UNIMPORTANT_TEXT">{`“${question}” 문항에 대한 ${name}님의 면접 분석 결과입니다.`}</p>
          </div>
          <ResultReport name={name} percent={percent} prepare={prepare} state={state} />
        </div>
      </main>
    </>
  );
};

export default ResultReportPage;
