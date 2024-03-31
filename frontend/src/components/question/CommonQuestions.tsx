import QuestionsList from './QuestionsList';
import { useQuestion } from '@/hooks/question/useQuestion';

interface QuestionsProps {
  type: 'common';
}

const CommonQuestions = ({ type }: QuestionsProps) => {
  const { useGetCommonQuestionList } = useQuestion();
  const { data } = useGetCommonQuestionList();

  const questions = data?.data?.questionList?.content || [];
  const total = data?.data?.questionList?.totalElements || 0;

  return (
    <div>
      <h3 className="text-lg font-semibold">공통 면접 질문</h3>
      <p className="text-UNIMPORTANT_TEXT pt-1">총 {total}개의 질문이 있습니다.</p>
      <QuestionsList questions={questions} type={type} />
    </div>
  );
};
export default CommonQuestions;
