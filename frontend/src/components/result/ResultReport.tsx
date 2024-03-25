import Lottie from 'react-lottie';
import DoughnutChart from './DoughnutChart';
import InterviewPrepared from './InterviewPrepared';
import robot from '../../assets/lotties/robot.json';

interface ResultReportProps {
  question: string;
  name: string;
  percent: number;
  prepare: string;
}

const ResultReport = ({ question, name, percent, prepare }: ResultReportProps) => {
  // Lottie 애니메이션
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: robot,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="w-10/12 mx-auto">
      <div>
        <h3 className="text-3xl font-bold text-BLACK">프리뷰 분석 결과</h3>
        <p className="text-lg text-UNIMPORTANT_TEXT">{`“${question}” 문항에 대한 ${name}님의 면접 분석 결과입니다.`}</p>
      </div>
      {/* 분석 보고서 */}
      <div className="shadow-xl p-14 my-3 rounded-lg w-full">
        <div className="flex items-center gap-10 pb-5">
          <div>
            <h3 className="p-3 text-3xl font-bold text-BLACK">총평</h3>
            <div className="pl-7 text-[#696969] text-xl leading-9">
              <p>{`${name}님의 면접 합격 가능성은 ${percent}%입니다.`}</p>
              <p>{`면접 영상 분석 결과, ${name}님의 면접 준비 상태는 ‘${prepare}’입니다.`}</p>
              <p>{`하지만 면접 연습이 더 필요한 부분이 있습니다.`}</p>
              <p>{`분석 결과를 토대로 본인의 면접 습관을 살펴보고, 개선해야 할 부분을 찾아보세요.`}</p>
              <p>{`${name}의 열정과 노력으로 면접 습관을 조금 더 개선해 나간다면, 면접 합격에 한 걸음 더 다가갈 수 있습니다.`}</p>
              <p>{`면접 합격에 한 걸음 더 다가갈 수 있습니다.`}</p>
            </div>
          </div>
          <Lottie options={defaultOptions} height={350} width={350} />
        </div>
        <div className="flex items-center px-20 gap-5">
          <DoughnutChart percent={percent} />
          <InterviewPrepared state={5} name={name} />
        </div>
      </div>
    </div>
  );
};

export default ResultReport;
