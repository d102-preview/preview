import LineChart from './LineChart';

interface IResult {
  emotion: {
    ratio: {
      positive: number;
      neutral: number;
      negative: number;
    };
    list: number[]; // 각 프레임별 감정 분류 배열의 타입을 가정합니다.
  };
  intent: {
    // intent 관련 타입 정의 필요
  };
}

interface IChartAreaProps {
  result: IResult;
  currentTime: number;
  handleChartTimeUpdate: (time: number) => void;
}

const ChartArea = ({ result, currentTime, handleChartTimeUpdate }: IChartAreaProps) => {
  return (
    <div className="p-10 shadow-lg rounded-xl">
      <LineChart currentTime={currentTime} onTimeChange={handleChartTimeUpdate} />
      <p className="text-UNIMPORTANT_TEXT px-7 pt-2 pb-10">
        김싸피님의 움직임은 산만한 편입니다. 잘하고 계시지만 동작 처리에도 조금 더 신경 써보세요! 정확하고 자신있는
        움직임은 면접에서 긍정적인 인상을 남기는 데 도움이 됩니다.
      </p>
      <div className="bg-[#F9D654] rounded-xl shadow-lg relative h-40 m-1">
        <div className="bg-[#FEF9E6] rounded-xl p-4 absolute -left-1 -top-3 mr-3 z-0">
          <h3 className="font-semibold text-lg text-BLACK">💡 프레임별 자세 유지의 중요성</h3>
          <p className="text-UNIMPORTANT_TEXT p-3">
            영상을 녹화하는 동안 카메라를 바라보는 머리 위치의 변화 정도를 보여주는 그래프 입니다. 특정 구간에서 값의
            진폭이 크다면 해당 시점에 몸을 크게 움직인 것을 의미합니다. 전체적으로 진폭이 큰 구간이 자주 발생하면
            주의산만으로 보일 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};
export default ChartArea;
