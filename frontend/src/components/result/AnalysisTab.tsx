import { analysisType } from '@/types/result';

interface IAnalysisTabProps {
  activeTab: analysisType;
  setActiveTab: (tab: analysisType) => void;
}

const AnalysisTab = ({ activeTab, setActiveTab }: IAnalysisTabProps) => {
  // Tab 클릭 핸들러
  const handleTabClick = (tabName: analysisType) => {
    setActiveTab(tabName);
  };

  // 공통 스타일
  const buttonStyle = 'w-1/4 text-xl text-center font-semibold p-3 bg-MAIN2 ';

  // 조건부 스타일 적용
  const getButtonClasses = (tabName: analysisType) => {
    return `${buttonStyle} ${activeTab === tabName ? 'text-white font-bold' : 'text-[#D4DFFA]'} hover:text-MAIN1`;
  };

  return (
    <div className="flex pt-5">
      <h3 className="w-44 p-3 text-3xl font-bold text-BLACK">세부 분석</h3>
      <div className="w-full bg-MAIN2 flex items-center rounded-lg">
        <button className={getButtonClasses('movement')} onClick={() => handleTabClick('movement')}>
          자세 움직임
        </button>
        <button className={getButtonClasses('emotion')} onClick={() => handleTabClick('emotion')}>
          감정 분석
        </button>
        <button className={getButtonClasses('intent')} onClick={() => handleTabClick('intent')}>
          답변 의도
        </button>
        <button className={getButtonClasses('keyword')} onClick={() => handleTabClick('keyword')}>
          키워드 포함 여부
        </button>
      </div>
    </div>
  );
};
export default AnalysisTab;
