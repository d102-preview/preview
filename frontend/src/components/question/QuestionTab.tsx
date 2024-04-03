import userStore from '@/stores/userStore';
import { questionType } from '@/types/model';
import Toast from '../@common/Toast/Toast';

interface IQuestionTabProps {
  activeTab: questionType;
  setActiveTab: (tab: questionType) => void;
}

const QuestionTab = ({ activeTab, setActiveTab }: IQuestionTabProps) => {
  const { isLogin } = userStore();

  // Tab 클릭 핸들러
  const handleTabClick = (tabName: questionType) => {
    if (!isLogin && tabName === 'resume') {
      Toast.info('로그인이 필요한 기능입니다. 로그인 후 사용해주세요.');
      return;
    }
    setActiveTab(tabName);
  };

  // 공통 스타일
  const buttonStyle = 'w-36 text-left font-semibold p-3 transition-colors duration-300 rounded-md';

  // 조건부 스타일 적용
  const getButtonClasses = (tabName: questionType) => {
    return `${buttonStyle} ${
      activeTab === tabName ? 'bg-SUB text-MAIN1' : 'bg-white text-[#D5D5D5]'
    } hover:bg-[#E9EFFD] hover:text-MAIN1`;
  };

  return (
    <div className="flex flex-col rounded-l-2xl p-3 pt-14 bg-white">
      <button className={getButtonClasses('common')} onClick={() => handleTabClick('common')}>
        공통 면접 질문
      </button>
      <button className={getButtonClasses('resume')} onClick={() => handleTabClick('resume')}>
        이력서 기반 질문
      </button>
    </div>
  );
};
export default QuestionTab;
