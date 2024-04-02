import { IAnalysisDetail, analysisType } from '@/types/result';
import Explanation from '../Explanation';
import LineChart from './LineChart';
import HasKeywords from './HasKeywords';
import BarChart from './BarChart';
import Emotion from './Emotion';
import userStore from '@/stores/userStore';

interface IChartAreaProps {
  activeTab: analysisType;
  analysisDetail: IAnalysisDetail;
  currentTime: number;
  handleChartTimeUpdate: (time: number) => void;
  videoLenght: number;
  emotionMessage: string;
}

const ChartArea = ({ activeTab, currentTime, handleChartTimeUpdate, analysisDetail, videoLenght }: IChartAreaProps) => {
  const { name } = userStore();

  const getMaxEmotion = (analysisDetail: IAnalysisDetail): string => {
    const ratios = analysisDetail.emotionMap.ratio;
    let maxEmotion: string = '';
    let maxValue: number = -Infinity;

    for (const [emotion, ratio] of Object.entries(ratios)) {
      if (typeof ratio === 'number' && ratio > maxValue) {
        maxValue = ratio;
        maxEmotion = emotion;
      }
    }

    let message = '';
    switch (maxEmotion) {
      case 'positive':
        message = `${name}님 면접 중에 표정이 밝은 편입니다. 긍정적인 표정을 유지하는 것이 중요합니다. 
        자신감 있고 열정적으로 대화하며, 웃는 얼굴로 인상을 남겨주세요! 
        긍정적인 태도는 면접관들에게 자신의 역량과 긍정적인 에너지를 전달할 수 있습니다.`;
        break;
      case 'negative':
        message = `${name}님 면접 중에 부정적인 표정을 보이지 않도록 주의하세요! 
        자세한 피드백을 받으시고 계시지만 표정이나 태도가 부정적으로 비춰질 수 있습니다. 
        진심 어린 웃음과 긍정적인 자세로 자신을 표현해주세요.`;
        break;
      case 'neutral':
        message = `면접 중에 무표정을 유지하는 것은 감정 표현이나 자세에 대한 신경을 쓰지 않는 것과 같습니다. 
        ${name}님, 조금 더 표정을 다듬고 자세를 조절하여, 면접관들에게 더 나은 인상을 남길 수 있도록 노력해주세요. 
        자신감 있고 친근한 미소는 면접을 더욱 유익하게 만들어 줄 수 있습니다.`;
        break;

      default:
        message = '감정 데이터가 유효하지 않습니다.';
    }

    return message;
  }

  const resultMessage = getMaxEmotion(analysisDetail);
  const answer = analysisDetail.answer;
  const keywords: string[] = analysisDetail.keywordList;

  return (
    <div className="p-10 shadow-lg rounded-xl">
      {activeTab === 'emotion' && (
        <>
          <LineChart
            title={'감정 변화'}
            currentTime={currentTime}
            onTimeChange={handleChartTimeUpdate}
            list={analysisDetail.emotionMap.list}
            videoLenght={videoLenght}
          />
          <Emotion ratio={analysisDetail.emotionMap.ratio} />
          <Explanation
            message={resultMessage}
            tipTitle={'긍정적 표정'}
            tipContent={`면접에서 긍정적인 표정은 자신감을 나타내며 신뢰를 보여주는 데 도움이 됩니다. 
              이는 자신에 대한 확신을 보여주며,어려움에 대처할 준비가 되어 있다는 인상을 줍니다. 
              또한 긍정적 분위기를 조성하여 면접 상황을 더욱 편안하게 만들어 줄 수 있고, 면접관에게 긍정적인 인상을 강화시킵니다.`}
          />
        </>
      )}
      {activeTab === 'intent' && (
        <>
          <BarChart title={'답변 의도'} intentList={analysisDetail.intentList} />
          <Explanation
            message={''}
            tipTitle={'답변 의도'}
            tipContent={`면접 준비 시 질문의 의도를 파악하고 그 의도에 맞는 답변을 준비하는 것은 매우 도움이 됩니다.
              답변을 아무리 잘 했더라도 의도를 잘못 파악해 전혀 다른 이야기를 한다면 면접에서 좋은 점수를 받기 힘듭니다. 
              해당 면접 문항에 대한 의도를 생각해보고 제시된 ${name}님의 주요 답변 의도와 일치하는지 확인해보세요! 
              의도를 파악하여 질문에 명확하고 적합하게 대답함으로써  면접자의 전문성과 자신감을 보여주는 좋은 기회가 될 수 있습니다.`}
          />
        </>
      )}
      {activeTab === 'keyword' && (
        <>
          <HasKeywords answer={answer} keywords={keywords} />
          <Explanation
            tipTitle={'답변 준비'}
            tipContent={`면접 시 미리 준비된 답변을 사용하면 자신감을 키울 수 있고, 핵심 키워드를 활용하여 명확한 의사 전달이 가능합니다. 
              또한, 논리적으로 구성된 답변은 전문성을 강조하며 예상치 못한 질문에 대비할 수 있어요!
              이는 면접 당일 긴장을 완화하고 심리적 안정에 도움이 되니 ${name}님 preview와 함께 암기해봐요!.`}
          />
        </>
      )}
    </div>
  );
};
export default ChartArea;
