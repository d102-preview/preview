import Header from '@/components/@common/Header/Header';
import CommonQuestions from '@/components/question/CommonQuestions';
import QuestionTab from '@/components/question/QuestionTab';
import ResumeQuestions from '@/components/question/ResumeQuestions';
import SelectedQuestions from '@/components/question/SelectedQuestions';
import { useQuestion } from '@/hooks/question/useQuestion';
import { ISimpleResume, questionType } from '@/types/model';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const QuestionPage = () => {
  const [activeTab, setActiveTab] = useState<questionType>('common');
  const [resumeList, setResumeList] = useState<ISimpleResume[]>([]);
  const location = useLocation();
  const isShow = location.pathname === '/question';

  const { useGetResumeList } = useQuestion();
  const { data: resumes } = useGetResumeList();

  useEffect(() => {
    if (resumes?.data) {
      setResumeList(resumes.data.resumeList);
    }
  }, [resumes]);

  return (
    <>
      <Header />
      <main
        className={`${isShow ? 'min-w-[1100px]' : 'min-w-[900px] w-[800px]'} h-[calc(100vh-5rem)] animate-showUp max-w-[80%] mx-auto`}
      >
        <div>
          <h3 className="mt-5 text-xl font-semibold mb-1">면접 질문 리스트</h3>
          <p className="text-sm text-[#B0B0B0]">
            {isShow
              ? '면접 연습을 진행할 리스트를 생성해주세요'
              : '스크립트와 핵심 키워드를 작성하여 면접을 대비하세요'}
          </p>
        </div>
        <div className="mt-10 flex w-full h-[620px] mx-auto">
          <div className={`flex rounded-2xl shadow-lg bg-GRAY ${isShow ? 'w-[1500px]' : 'w-full'} `}>
            <QuestionTab activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className={`p-4 ${isShow ? 'w-full' : 'w-full'}  `}>
              {activeTab === 'common' && <CommonQuestions type={activeTab} />}
              {activeTab === 'resume' && <ResumeQuestions type={activeTab} resumeList={resumeList} />}
            </div>
          </div>
          {isShow && <SelectedQuestions />}
        </div>
      </main>
    </>
  );
};

export default QuestionPage;
