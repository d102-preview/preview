import { useState } from 'react';
import QuestionsList from './QuestionsList';
import { MdOutlineExpandMore, MdOutlineExpandLess } from 'react-icons/md';
import { useQuestion } from '@/hooks/question/useQuestion';
import { ISimpleResume } from '@/types/model';
import Lottie from 'react-lottie';
import { robotOptions } from '@/assets/lotties/lottieOptions';
import SpeechBubble from '../result/SpeechBubble';
import userStore from '@/stores/userStore';

interface QuestionsProps {
  type: 'resume';
  resumeList: ISimpleResume[];
}

const ResumeQuestions = ({ type, resumeList }: QuestionsProps) => {
  const { name } = userStore();

  const [selectedResume, setSelectedResume] = useState<ISimpleResume | undefined>(resumeList[0]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const { useGetRusmeQuestionList } = useQuestion();

  const { data } = useGetRusmeQuestionList(selectedResume ? selectedResume.id : -1);

  const questions = data?.data?.questionList?.content || [];
  const total = data?.data?.questionList?.totalElements || 0;

  const handleListItemClick = (resume: ISimpleResume) => {
    setSelectedResume(resume);
    setDropdownOpen(false); // 이력서 선택 후 드롭다운 닫기
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">이력서 기반 질문</h3>

      {resumeList.length === 0 ? (
        <div className="pt-2">
          <SpeechBubble
            children={
              <>
                <p>
                  {name}님! <span className="text-[#EA8888]">등록된 이력서가 없어요</span>
                </p>
                <p>이력서를 등록하면 이력서를 분석하여 질문을 생성해 드려요!</p>
                <p className="text-blue-400">지금 마이페이지에서 이력서를 등록해 보세요 😊</p>
              </>
            }
          />
          <Lottie options={robotOptions} height={330} width={330} />
        </div>
      ) : (
        <div className="my-3 relative">
          <label htmlFor="resumeSelect" className=" block font-medium text-[#404040]">
            이력서 선택하기
          </label>
          <div
            className={`p-3 m-3 border-2 border-MAIN1 bg-[#F1F5FF] rounded-xl relative`}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="pl-2 flex justify-between items-center font-semibold text-MAIN1">
              <span>{selectedResume ? selectedResume.displayName : '이력서를 선택해주세요'}</span>
              {dropdownOpen ? (
                <MdOutlineExpandLess size="25" className="text-MAIN1" aria-hidden="true" />
              ) : (
                <MdOutlineExpandMore size="25" className="text-MAIN1" aria-hidden="true" />
              )}
            </div>

            {dropdownOpen && (
              <ul
                className={`absolute w-full border-2 ${dropdownOpen ? 'border-MAIN1' : 'border-[#F1F5FF]'} bg-[#F1F5FF] rounded-xl shadow-2xl shadow-MAIN3 z-10 mt-3 left-0 border-2-[#F1F5FF] font-semibold text-UNIMPORTANT_TEXT`}
              >
                {resumeList.map((resume, index) => (
                  <li
                    key={index}
                    className={`p-4 rounded-xl hover:bg-[#E9EFFD] hover:text-MAIN1 cursor-pointer  ${selectedResume?.displayName === resume.displayName ? 'text-MAIN1' : ''}`}
                    onClick={() => handleListItemClick(resume)}
                  >
                    {resume.displayName}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {selectedResume && (
        <>
          <p className="text-UNIMPORTANT_TEXT mt-12">총 {total}개의 질문이 있습니다.</p>
          <QuestionsList questions={questions} type={type} />
        </>
      )}
    </div>
  );
};

export default ResumeQuestions;
