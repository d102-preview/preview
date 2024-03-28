import { analysisType, IResult } from '@/types/result';
import Explanation from '../Explanation';
import LineChart from './LineChart';
import HasKeywords from './HasKeywords';

interface IChartAreaProps {
  activeTab: analysisType;
  result: IResult;
  currentTime: number;
  handleChartTimeUpdate: (time: number) => void;
}

const ChartArea = ({ activeTab, result, currentTime, handleChartTimeUpdate }: IChartAreaProps) => {
  return (
    <div className="p-10 shadow-lg rounded-xl">
      {activeTab === 'movement' ? (
        <>
          <LineChart currentTime={currentTime} onTimeChange={handleChartTimeUpdate} result={result} />
          <Explanation
            message={
              '김싸피님의 움직임은 산만한 편입니다. 잘하고 계시지만 동작 처리에도 조금 더 신경 써보세요! 정확하고 자신있는 움직임은 면접에서 긍정적인 인상을 남기는 데 도움이 됩니다.'
            }
            tipTitle={'자세 유지'}
            tipContent={
              '영상을 녹화하는 동안 카메라를 바라보는 머리 위치의 변화 정도를 보여주는 그래프 입니다. 특정 구간에서 값의 진폭이 크다면 해당 시점에 몸을 크게 움직인 것을 의미합니다. 전체적으로 진폭이 큰 구간이 자주 발생하면 주의산만으로 보일 수 있습니다.'
            }
          />
        </>
      ) : (
        ''
      )}
      {activeTab === 'emotion' ? (
        <>
          <LineChart currentTime={currentTime} onTimeChange={handleChartTimeUpdate} result={result} />
          <Explanation
            message={
              '김싸피님의 움직임은 산만한 편입니다. 잘하고 계시지만 동작 처리에도 조금 더 신경 써보세요! 정확하고 자신있는 움직임은 면접에서 긍정적인 인상을 남기는 데 도움이 됩니다.'
            }
            tipTitle={'면접 시 표정'}
            tipContent={
              '영상을 녹화하는 동안 카메라를 바라보는 머리 위치의 변화 정도를 보여주는 그래프 입니다. 특정 구간에서 값의 진폭이 크다면 해당 시점에 몸을 크게 움직인 것을 의미합니다. 전체적으로 진폭이 큰 구간이 자주 발생하면 주의산만으로 보일 수 있습니다.'
            }
          />
        </>
      ) : (
        ''
      )}
      {activeTab === 'intent' ? (
        <>
          <LineChart currentTime={currentTime} onTimeChange={handleChartTimeUpdate} result={result} />
          <Explanation
            message={
              '김싸피님의 움직임은 산만한 편입니다. 잘하고 계시지만 동작 처리에도 조금 더 신경 써보세요! 정확하고 자신있는 움직임은 면접에서 긍정적인 인상을 남기는 데 도움이 됩니다.'
            }
            tipTitle={'답변 의도'}
            tipContent={
              '영상을 녹화하는 동안 카메라를 바라보는 머리 위치의 변화 정도를 보여주는 그래프 입니다. 특정 구간에서 값의 진폭이 크다면 해당 시점에 몸을 크게 움직인 것을 의미합니다. 전체적으로 진폭이 큰 구간이 자주 발생하면 주의산만으로 보일 수 있습니다.'
            }
          />
        </>
      ) : (
        ''
      )}
      {activeTab === 'keyword' ? (
        <>
          <HasKeywords
            text={
              '안녕하십니까. 지원자 김싸피입니다. 전 컴퓨터 공학을 전공으로 삼성 소프트웨어 아카데미 SSAFY에서 개발 능력과 협업 능력을 쌓아왔습니다. 제 강점은 유연한 사고와 원할한 소통능력이며, 항상 배우려는 자세입니다. 이러한 강점으로 SSAFY에서 인공지능을 기반으로 한 면접 서비스 프리뷰라는 프로젝트를 진행하였고 전국 최우수라는 쾌거를 이루었습니다. 또한, 제가 이 포지션에 적합한 이유는 항상 배우려는 자세로 짧은 시간동안 급진적으로 성장했기 때문입니다. 앞으로도 항상 배우려는 자세와 끊임없이 공부하는 자세로 함께 성장하는 개발자가 되겠습니다. 감사합니다.'
            }
            keywords={['SSAFY', '개발', '협업', '소통', '프리뷰', '삼성', '최우수', '발전', '성장', '싸피']}
            totalNum={9}
            includedNum={7}
          />
          <Explanation
            tipTitle={'답변 준비'}
            tipContent={
              '면접 시 미리 준비된 답변을 사용하면 자신감을 키울 수 있고, 핵심 키워드를 활용하여 명확한 의사 전달이 가능합니다. 또한, 논리적으로 구성된 답변은 전문성을 강조하며 예상치 못한 질문에 대비할 수 있습니다. 이는 면접 당일 긴장을 완화하여 자신을 안정시키는 데 도움이 됩니다.'
            }
          />
        </>
      ) : (
        ''
      )}
    </div>
  );
};
export default ChartArea;
