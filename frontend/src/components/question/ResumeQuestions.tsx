import { useState } from 'react';
import QuestionsList from './QuestionsList';
import { IQuestionList, interviewType, IResumeList } from '@/types/model';
import { MdOutlineExpandMore, MdOutlineExpandLess } from 'react-icons/md';

// 더미 데이터
const resumes: IResumeList[] = [
  {
    name: '기업은행 자기소개서',
    filePath: 'filepath1',
  },
  {
    name: '삼성전자 자기소개서',
    filePath: 'filepath2',
  },
  {
    name: '네이버 자기소개서',
    filePath: 'filepath2',
  },
];


interface QuestionsProps {
  questions: IQuestionList[];
  type: interviewType;
}

const ResumeQuestions = ({ questions, type }: QuestionsProps) => {
  const [selectedResume, setSelectedResume] = useState<IResumeList | null>(resumes[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleListItemClick = (resume: IResumeList) => {
    setSelectedResume(resume);
    setDropdownOpen(false); // 이력서 선택 후 드롭다운 닫기
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">이력서 기반 질문</h3>

      <div className="my-3 relative">
        <label htmlFor="resumeSelect" className=" block font-medium text-[#404040]">
          이력서 선택하기
        </label>
        <div
          className={`p-3 m-3 border-2 border-MAIN1 bg-[#F1F5FF] rounded-xl relative`}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <div className="pl-2 flex justify-between items-center font-semibold text-MAIN1">
            <span>{selectedResume ? selectedResume.name : '이력서를 선택해주세요'}</span>
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
              {resumes.map((resume, index) => (
                <li
                  key={index}
                  className={`p-4 rounded-xl hover:bg-[#E9EFFD] hover:text-MAIN1 cursor-pointer  ${selectedResume?.name === resume.name ? 'text-MAIN1' : ''}`}
                  onClick={() => handleListItemClick(resume)}
                >
                  {resume.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {selectedResume && (
        <>
          <p className="text-UNIMPORTANT_TEXT mt-12">총 {questions.length}개의 질문이 있습니다.</p>
          <QuestionsList questions={questions} type={type} />
        </>
      )}
    </div>
  );
};

export default ResumeQuestions;
