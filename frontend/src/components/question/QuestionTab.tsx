import { interviewType } from '@/types/model';

interface IQuestionTabProps {
  activeTab: interviewType;
  setActiveTab: (tab: interviewType) => void;
}

const QuestionTab = ({ activeTab, setActiveTab }: IQuestionTabProps) => {
  // Tab 클릭 핸들러
  const handleTabClick = (tabName: interviewType) => {
    setActiveTab(tabName);
  };

  // 공통 스타일
  const buttonStyle = 'w-64 h-14 text-lg text-left font-semibold p-3 transition-colors duration-300 rounded-lg';

  // 조건부 스타일 적용
  const getButtonClasses = (tabName: interviewType) => {
    return `${buttonStyle} ${
      activeTab === tabName ? 'bg-SUB text-MAIN1' : 'bg-white text-[#D5D5D5]'
    } hover:bg-[#E9EFFD] hover:text-MAIN1`;
  };

  return (
    <>
      <div className="flex flex-col rounded-l-2xl p-3 pt-14 bg-white">
        <button className={getButtonClasses('common')} onClick={() => handleTabClick('common')}>
          공통 면접 질문
        </button>
        <button className={getButtonClasses('resume')} onClick={() => handleTabClick('resume')}>
          이력서 기반 질문
        </button>
      </div>
    </>
  );
};
export default QuestionTab;
