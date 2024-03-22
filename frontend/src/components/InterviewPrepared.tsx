import SpeechBubble from './SpeechBubble';

interface IInterviewPreparedProps {
  state: 1 | 2 | 3 | 4 | 5;
  name: string;
}

const InterviewPrepared = ({ state, name }: IInterviewPreparedProps) => {
  // state 값에 따라 적절한 클래스 반환
  const getTextClass = (state: number) => {
    switch (state) {
      case 1:
        return 'text-[#F87F7F]';
      case 2:
        return 'text-[#F5B18A]';
      case 3:
        return 'text-[#F8C77F]';
      case 4:
        return 'text-[#83C978]';
      case 5:
        return 'text-[#5BAF82]';
      default:
        return 'text-UNIMPORTANT_TEXT';
    }
  };

  // state 값에 따라 적절한 문자열 반환
  const getStateText = (state: number) => {
    switch (state) {
      case 1:
        return '매우 부족';
      case 2:
        return '부족';
      case 3:
        return '보통';
      case 4:
        return '양호';
      case 5:
        return '매우 양호';
      default:
        return '';
    }
  };

  // 각 상태바를 활성화하는지 여부를 결정
  const getBarActiveStates = (state: number) => {
    const activeStates = [false, false, false, false, false];
    for (let i = 0; i < state; i++) {
      activeStates[i] = true;
    }
    return activeStates;
  };

  // 상태바의 색상을 결정하는 함수
  const getBarColor = (isActive: boolean) => {
    return isActive ? 'bg-MAIN1' : 'bg-gray-300'; // 활성화 시 'bg-MAIN1', 비활성화 시 'bg-gray-300'
  };

  const textClass = getTextClass(state);
  const text = getStateText(state);
  const activeStates = getBarActiveStates(state);

  return (
    <div className="p-14">
      <div className="flex font-bold text-2xl">
        <h3 className="mr-2 text-[#727272]">면접 준비</h3>
        <h3 className={textClass}>{text}</h3>
      </div>
      <p className="text-UNIMPORTANT_TEXT text-lg">면접 합격 가능성으로 본 나의 면접 준비 상태</p>
      <div className="">
        <div className="flex gap-2 my-5">
          {activeStates.map((isActive, index) => (
            <div key={index} className={`w-36 h-5 rounded-full ${getBarColor(isActive)}`}></div>
          ))}
        </div>
        <SpeechBubble
          children={
            <>
              <p>{name}님! ‘프리뷰’가 면접 연습을 도와드릴게요! 😄</p>
              <p>우리 같이 면접 준비를 꼼꼼히 해봐요</p>
            </>
          }
        />
      </div>
    </div>
  );
};
export default InterviewPrepared;
