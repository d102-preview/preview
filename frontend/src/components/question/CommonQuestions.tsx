import QuestionsList from './QuestionsList';
import { useQuestion } from '@/hooks/question/useQuestion';

const CommonQuestions = () => {
  const { useGetCommonQuestionList } = useQuestion();
  const { data } = useGetCommonQuestionList();

  const questions = data?.data.commonQuestionList.content || [];

  return (
    <div>
      <h3 className="text-lg font-semibold">공통 면접 질문</h3>
      <p className="text-UNIMPORTANT_TEXT pt-1">총 {questions.length}개의 질문이 있습니다.</p>
      <QuestionsList questions={questions} type={'common'} />
    </div>
  );
};
export default CommonQuestions;
