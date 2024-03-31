import Header from '@/components/@common/Header/Header';
import Lottie from 'react-lottie';
import { robotOptions } from '@/assets/lotties/lottieOptions';
import DoughnutChart from '@/components/result/DoughnutChart';
import InterviewPrepared from '@/components/result/InterviewPrepared';
import DetailedAnalysis from '@/components/result/analysis/DetailedAnalysis';

const ResultReportPage = () => {
  const name = '김싸피';
  const percent = 70;
  const data = {
    metadata: {
      type: 'main',
      question: '지원자의 강점(장점)은 무엇입니까?',
      veideoPath: '@/assets/video/test.mp4',
      keyword: ['장점1', '장점2', '장점3'],
    },
    set_start_time: new Date(),
    vedio_length: '00:33',
    fps: 4,
    frames: 120,
    result: {
      emotion: {
        ratio: {
          positive: 50.0,
          neutral: 30.0,
          negative: 20.0,
        },
        list: [
          // # 각 프레임 별 감정 분류 1: positive, 0: neutral, -1: negative (프레임 수와 동일 개수)
        ],
      },
      intent: {},
    },
  };

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
            <p className="text-lg text-UNIMPORTANT_TEXT">{`“${data.metadata.question}” 문항에 대한 ${name}님의 면접 분석 결과입니다.`}</p>
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
              <Lottie options={robotOptions} height={350} width={350} />
            </div>
            <div className="flex items-center px-20 gap-5 pb-10">
              <DoughnutChart percent={percent} />
              <InterviewPrepared prepare={prepare} state={state} name={name} />
            </div>
            <DetailedAnalysis
              type={data.metadata.type}
              question={data.metadata.question}
              // result={data.result}
              date={data.set_start_time}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default ResultReportPage;
