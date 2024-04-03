import Header from '@/components/@common/Header/Header';
import DetailedAnalysis from '@/components/result/analysis/DetailedAnalysis';
import userStore from '@/stores/userStore';
import { useResult } from '@/hooks/result/useResult';
import { useParams } from 'react-router-dom';
// import Lottie from 'react-lottie';
// import { robotOptions } from '@/assets/lotties/lottieOptions';
// import DoughnutChart from '@/components/result/DoughnutChart';
// import InterviewPrepared from '@/components/result/InterviewPrepared';
// import { useEffect } from 'react';

const ResultReportPage = () => {
  const parms = useParams();
  const analysisId = Number(parms.id);
  console.log(analysisId);

  const { name } = userStore();

  const { useGetDetailAnalysis } = useResult();
  const { data, isLoading, error } = useGetDetailAnalysis(Number(analysisId));

  const date = data?.data.analysisDetail.startTime || '';

  const question = data?.data.analysisDetail.question;
  const analysisDetail = data?.data.analysisDetail;

  // const percent = 70;
  // const getPrepareText = (percent: number) => {
  //   if (percent >= 0 && percent <= 20) {
  //     return '매우 부족';
  //   } else if (percent > 20 && percent <= 40) {
  //     return '부족';
  //   } else if (percent > 40 && percent <= 60) {
  //     return '보통';
  //   } else if (percent > 60 && percent <= 80) {
  //     return '우수';
  //   } else {
  //     return '매우 우수';
  //   }
  // };

  // const getStateNumber = (percent: number) => {
  //   if (percent >= 0 && percent <= 20) {
  //     return 1;
  //   } else if (percent > 20 && percent <= 40) {
  //     return 2;
  //   } else if (percent > 40 && percent <= 60) {
  //     return 3;
  //   } else if (percent > 60 && percent <= 80) {
  //     return 4;
  //   } else {
  //     return 5;
  //   }
  // };

  // const prepare = getPrepareText(percent);
  // const state = getStateNumber(percent);

  // 로딩 및 에러 처리
  if (isLoading) console.log('Loading...');
  if (error) console.log('Error fetching data:', error);

  return (
    <>
      <Header />
      <main className="max-w-9xl mx-auto my-10 animate-showUp min-w-[1024px] max-w-[95%]">
        <div className="w-10/12 mx-auto">
          <div>
            <h3 className="text-xl font-bold text-BLACK">프리뷰 분석 결과</h3>
            <p className=" text-UNIMPORTANT_TEXT">{`“${question}” 문항에 대한 ${name}님의 면접 분석 결과입니다.`}</p>
          </div>
          {/* 분석 보고서 */}
          <div className="shadow-xl p-5 my-3 rounded-lg w-full">
            {/* <div className="flex items-center gap-10 pb-5">
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
            </div> */}
            {/* <div className="flex items-center px-20 gap-5 pb-10">
              <DoughnutChart percent={percent} />
              <InterviewPrepared prepare={prepare} state={state} name={name} />
            </div> */}
            {analysisDetail && (
              <DetailedAnalysis
                type={analysisDetail.questionType}
                question={analysisDetail.question}
                analysisDetail={analysisDetail}
                date={date}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default ResultReportPage;
