import SpeechBubble from './SpeechBubble';

interface IInterviewPreparedProps {
  prepare: '매우 부족' | '부족' | '보통' | '우수' | '매우 우수';
  state: 1 | 2 | 3 | 4 | 5;
  name: string;
}

const InterviewPrepared = ({ prepare, state, name }: IInterviewPreparedProps) => {
  // state 값에 따라 적절한 클래스 반환
  const getTextClass = (prepare: string) => {
    switch (prepare) {
      case '매우 부족':
        return 'text-[#F87F7F]';
      case '부족':
        return 'text-[#F5B18A]';
      case '보통':
        return 'text-[#F8C77F]';
      case '우수':
        return 'text-[#83C978]';
      case '매우 우수':
        return 'text-[#5BAF82]';
      default:
        return 'text-UNIMPORTANT_TEXT';
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
    return isActive ? 'bg-MAIN1' : 'bg-gray-300';
  };

  const textClass = getTextClass(prepare);
  const activeStates = getBarActiveStates(state);

  return (
    <div className="w-full p-5">
      <div className="mt-5 px-10 ">
        <div className="flex font-bold text-2xl">
          <h3 className="mr-2 text-[#727272]">면접 준비</h3>
          <h3 className={textClass}>{prepare}</h3>
        </div>
        <p className="text-UNIMPORTANT_TEXT text-lg">면접 합격 가능성으로 본 나의 면접 준비 상태</p>
        <div className="w-5/6">
          <div className="flex gap-2 my-5">
            {activeStates.map((isActive, index) => (
              <div key={index} className={`w-48 h-5 rounded-full ${getBarColor(isActive)}`}></div>
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
    </div>
  );
};
export default InterviewPrepared;
