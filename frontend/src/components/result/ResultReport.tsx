import Lottie from 'react-lottie';
import DoughnutChart from './DoughnutChart';
import InterviewPrepared from './InterviewPrepared';
import robot from '../../assets/lotties/robot.json';
import InterviewVideo from './InterviewVideo';

interface ResultReportProps {
  name: string;
  percent: number;
  prepare: '매우 부족' | '부족' | '보통' | '우수' | '매우 우수';
  state: 1 | 2 | 3 | 4 | 5;
}

const ResultReport = ({ name, percent, prepare, state }: ResultReportProps) => {
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
    <>
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
          <InterviewPrepared prepare={prepare} state={state} name={name} />
        </div>
        <InterviewVideo />
      </div>
    </>
  );
};

export default ResultReport;
