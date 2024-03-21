import Header from '@/components/@common/Header/Header';
import QuestionTab from '@/components/question/QuestionTab';
import SelectedQuestions from '@/components/question/SelectedQuestions';
import CommonQuestions from '@/components/question/CommonQuestions';
import ResumeQuestions from '@/components/question/ResumeQuestions';
import { useState } from 'react';
import { IQuestionList, interviewType } from '@/types/model';

// 더미 데이터
const questions: IQuestionList[] = [
  { id: 1, question: '1분 자기소개 해주세요', type: 'common', keywordList: [] },
  { id: 2, question: '본인 성격의 장단점에 대해 말해주세요', type: 'common', keywordList: [] },
  { id: 3, question: '인생에서 가장 중요한 것은 무엇인가요?', type: 'common', keywordList: [] },
  { id: 4, question: '리더쉽을 발휘했던 경험에 대해서 말씀해주세요.', type: 'common', keywordList: [] },
  { id: 5, question: '동료와 친구들은 본인을 어떻게 생각하나요?', type: 'common', keywordList: [] },
];


const QuestionPage = () => {
  const [activeTab, setActiveTab] = useState<interviewType>('common');
  return (
    <>
      <Header />
      <main className="w-10/12 mx-auto h-[calc(100vh-3.5rem)]">
        <div>
          <h3 className="text-xl font-semibold mb-1">면접 질문 리스트</h3>
          <p className="text-sm text-[#B0B0B0]">면접 연습을 진행할 리스트를 생성해주세요</p>
        </div>
        <div className="mt-3 flex h-5/6 overflow-visible">
          <div className="flex rounded-2xl shadow-lg bg-GRAY w-10/12">
            <QuestionTab activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="p-7 w-11/12 overflow-auto">
              {activeTab === 'common' && <CommonQuestions questions={questions} type={activeTab} />}
              {activeTab === 'resume' && <ResumeQuestions questions={questions} type={activeTab} />}
            </div>
          </div>
          <SelectedQuestions />
        </div>
      </main>
    </>
  );
};

export default QuestionPage;
