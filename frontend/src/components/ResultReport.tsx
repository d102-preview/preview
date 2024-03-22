import DoughnutChart from './DoughnutChart';

interface ResultReportProps {
  question: string;
  name: string;
  percent: number;
  prepare: string;
}

const ResultReport = ({ question, name, percent, prepare }: ResultReportProps) => {
  return (
    <main className="w-10/12 mx-auto ">
      <div>
        <h3 className="text-2xl font-bold text-BLACK">프리뷰 분석 결과</h3>
        <p className="text-sm text-UNIMPORTANT_TEXT">{`“${question}” 문항에 대한 ${name}님의 면접 분석 결과입니다.`}</p>
      </div>
      <div className="shadow-xl p-10 my-5 rounded-lg">
        <h3 className="text-2xl font-bold text-BLACK">총평</h3>
        <div className="p-3 text-[#696969]">
          <p>{`${name}님의 면접 합격 가능성은 ${percent}%입니다.`}</p>
          <p>{`면접 영상 분석 결과, ${name}님의 면접 준비 상태는 ‘${prepare}’입니다.`}</p>
          <p>{`하지만 면접 연습이 더 필요한 부분이 있습니다.`}</p>
          <p>{`분석 결과를 토대로 본인의 면접 습관을 살펴보고, 개선해야 할 부분을 찾아보세요.`}</p>
          <p>{`${name}의 열정과 노력으로 면접 습관을 조금 더 개선해 나간다면, 면접 합격에 한 걸음 더 다가갈 수 있습니다.`}</p>
          <p>{`면접 합격에 한 걸음 더 다가갈 수 있습니다.`}</p>
        </div>

        <DoughnutChart percent={percent} />
      </div>
    </main>
  );
};

export default ResultReport;
