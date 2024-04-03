import { useState } from 'react';
import { MdOutlineExpandMore, MdOutlineExpandLess } from 'react-icons/md';
import { useQuestion } from '@/hooks/question/useQuestion';
import { ISimpleResume } from '@/types/model';
import Lottie from 'react-lottie';
import { robotOptions, createQuestionOptions, noCreateQuestionOptions } from '@/assets/lotties/lottieOptions';
import SpeechBubble from '@/components/result/SpeechBubble';
import userStore from '@/stores/userStore';
import { useIntersectionObserver } from '@/hooks/@common/userIntersectionObserver';
import questionStore from '@/stores/questionStore';
import QuestionItem from './QuestionItem';

interface QuestionsProps {
  type: 'resume';
  resumeList: ISimpleResume[];
}

const ResumeQuestions = ({ type, resumeList: initialResumeList }: QuestionsProps) => {
  const { name } = userStore();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const { useGetListInfinite } = useQuestion();

  // 초기 렌더링 시 initialResumeList가 비어있는 경우를 처리하기 위해 수정
  const initialSelectedResume = initialResumeList.length > 0 ? initialResumeList[0] : undefined;

  // // 업데이트된 이력서 목록이나 초기 목록 사용
  const [selectId, setSelectId] = useState<number>(initialSelectedResume ? initialSelectedResume.id : -1);

  const [selectedResume, setSelectedResume] = useState<ISimpleResume | undefined>(initialResumeList[0]);

  // // 선택된 이력서 ID에 대한 질문 목록을 가져오는 쿼리

  const {
    data: resumeListData,
    fetchNextPage,
    hasNextPage,
  } = useGetListInfinite(
    {
      page: 0,
      size: 10,
      resumeId: selectId,
    },
    type,
  );

  const { selectedQuestions, addQuestion, removeQuestion } = questionStore();
  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  const totalQuestions = resumeListData?.pages[0]?.data?.questionList?.totalElements || 0;

  const handleListItemClick = (resume: ISimpleResume) => {
    setSelectId(resume.id);
    setSelectedResume(resume);
    setDropdownOpen(false); // 이력서 선택 후 드롭다운 닫기
  };

  // 등록된 이력서가 없는 경우
  if (initialResumeList.length === 0) {
    return (
      <>
        <h3 className="text-lg font-semibold">이력서 기반 질문</h3>
        <div className="my-2 relative">
          <div className="pt-1">
            <SpeechBubble>
              <p>
                {name}님! <span className="text-[#EA8888]">등록된 이력서가 없어요</span>
              </p>
              <p>이력서를 등록하면 이력서를 분석하여 질문을 생성해 드려요!</p>
              <p className="text-blue-400">지금 마이페이지에서 이력서를 등록해 보세요 😊</p>
            </SpeechBubble>
            <Lottie options={robotOptions} height={330} width={330} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h3 className="text-lg font-semibold">이력서 기반 질문</h3>
      <label htmlFor="resumeSelect" className="py-1 block font-medium text-UNIMPORTANT_TEXT">
        이력서 선택하기
      </label>
      <div className="mt-1 relative px-3">
        {/* 드롭다운 */}
        <div
          className={`p-3 border border-MAIN1 bg-[#F1F5FF] rounded-xl relative text-sm`}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <div className="b-1 pl-2 flex justify-between items-center font-semibold text-MAIN1">
            <span>{selectedResume ? selectedResume.displayName : '이력서를 선택해주세요'}</span>
            {dropdownOpen ? (
              <MdOutlineExpandLess size="25" className="text-MAIN1" aria-hidden="true" />
            ) : (
              <MdOutlineExpandMore size="25" className="text-MAIN1" aria-hidden="true" />
            )}
          </div>
          {dropdownOpen && (
            <ul
              className={`absolute w-full border ${dropdownOpen ? 'border-MAIN1' : 'border-[#F1F5FF]'} bg-[#F1F5FF] rounded-xl shadow-2xl shadow-MAIN3 z-10 mt-4 left-0 border-2-[#F1F5FF] font-semibold text-UNIMPORTANT_TEXT`}
            >
              {initialResumeList.map((resume, index) => (
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
      {/* 질문 생성중인 경우 */}
      {selectedResume && selectedResume.status === 'process' && (
        <div className="flex flex-col pt-3">
          <p className="text-center font-bold text-2xl text-MAIN1">질문 생성 중...</p>
          <p className="text-center text-sm text-UNIMPORTANT_TEXT">잠시만 기다려 주세요</p>
          <p className="text-center text-sm text-UNIMPORTANT_TEXT pb-3">화면이 바뀌지 않으면 새로고침을 해주세요</p>
          <Lottie options={createQuestionOptions} height={300} width={400} />
        </div>
      )}

      {/* 질문 생성 불가인 경우 */}
      {selectedResume && selectedResume.status === 'fail' && (
        <div className="flex flex-col pt-3">
          <p className="text-center font-bold text-2xl text-[#EA8888]">질문 생성 불가</p>
          <p className="text-center text-sm text-UNIMPORTANT_TEXT">이력서를 삭제 후 다시 시도해주세요</p>
          <p className="text-center text-sm text-UNIMPORTANT_TEXT pb-3">서비스 이용에 불편을 드려 죄송합니다.</p>
          <Lottie options={noCreateQuestionOptions} height={300} width={400} />
        </div>
      )}

      {/* 이력서가 선택되었고 질문 생성이 완료된 경우 */}
      {selectedResume && selectedResume.status === 'success' && (
        <>
          <p className="text-UNIMPORTANT_TEXT mt-5 mb-1">총 {totalQuestions}개의 질문이 있습니다.</p>
          {resumeListData?.pages?.map(
            (page, i) =>
              page && ( // page가 정의되어 있으면 아래의 컴포넌트 렌더링 실행
                <div key={i} className="h-[calc(100%-10rem)] overflow-y-auto px-3">
                  {page.data.questionList.content.map(question => (
                    <QuestionItem
                      key={question.id}
                      question={question.question}
                      id={question.id}
                      isSelected={selectedQuestions.some(q => q.id === question.id)}
                      onAdd={addQuestion}
                      onRemove={removeQuestion}
                      type={type}
                    />
                  ))}
                </div>
              ),
          )}
          {/* 페이지 최하단에 작은 div요소 만들어 ref에 setTarget적용 */}
          <div ref={setTarget} className="h-[1px]" />
        </>
      )}
    </>
  );
};

export default ResumeQuestions;
