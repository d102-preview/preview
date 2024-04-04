import DetailBox from './DetailBox';
import resume from '@/assets/images/resume.gif';
import result from '@/assets/images/result.gif';
import mock from '@/assets/images/mock.gif';
import main from '@/assets/images/main.gif';

interface IFunction {
  type: 'left' | 'right';
  subTitle?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  buttonText: string;
  navigateUrl: string;
  video: any;
}

const FuncDetail = () => {
  const funcInfo: IFunction[] = [
    {
      type: 'left',
      subTitle: '이력서 기반 질문 생성',
      title: (
        <>
          AI가 추천하는
          <br />
          나에게 꼭 필요한 면접 질문 생성
        </>
      ),
      description: (
        <>
          내 이력서를 직접 업로드 하고,
          <br />내 이력서를 기반으로 면접 질문을 생성해요
          <br /> 면접 연습 진행 시 해당 질문들을 리스트에 추가할 수 있어요
        </>
      ),
      buttonText: '이력서 등록하러 가기',
      navigateUrl: '/my',
      video: <img src={resume} className="border" />,
    },
    {
      type: 'right',
      subTitle: '면접 연습 및 녹화',
      title: (
        <>
          나만의 질문 리스트로
          <br />
          진행하는 면접 연습 및 녹화
        </>
      ),
      description: (
        <>
          면접 연습에서는 3개의 질문을 선택 후 나의 실력을 확인할 수 있어요.
          <br />
          면접 실전에서는 질문을 선택하지 않고 공통 및 이력서 기반의 질문으로 실전 면접에 대비할 수 있어요.
          <br />
          면접 진행 시 녹화된 영상은 추후 분석 리포트에 활용돼요.
        </>
      ),
      buttonText: '면접 연습하러가기',
      navigateUrl: '/interview',
      video: <img src={mock} className="border" />,
    },
    {
      type: 'left',
      subTitle: '무작위 꼬리 질문',
      title: <>내 답변을 기반으로 한 실시간 꼬리 질문</>,
      description: (
        <>
          면접을 연습하고 실시간으로 생성되는 꼬리질문에 대비하세요.
          <br />
          사전에 선택된 질문이 아닌 AI가 나의 답변을 기반으로 꼬리 질문을 생성해요.
        </>
      ),
      buttonText: '실전 면접 연습하러가기',
      navigateUrl: '/interview',
      video: <img src={main} className="border" />,
    },
    {
      type: 'right',
      subTitle: '분석 보고서',
      title: (
        <>
          내 면접 영상을 녹화하고
          <br />
          영상 분석을 통한 피드백까지
        </>
      ),
      description: (
        <>
          면접 영상 분석 후 면접 합격 가능성 및 세부 분석에 대한 분석 결과를 제공해요.
          <br />
          하나의 질문에 대한 감정 분석, 답변 의도 분석, 키워드 포함 여부 분석 결과를 확인할 수 있어요.
        </>
      ),
      buttonText: '기존 영상 분석 결과 확인하기',
      navigateUrl: '/result',
      video: <img src={result} className="border" />,
    },
  ];

  return (
    <div className="w-full">
      {funcInfo.map((ele, idx) => {
        return <DetailBox key={idx} info={ele} />;
      })}
    </div>
  );
};

export default FuncDetail;
