import { APIResponse } from '@/types/model';
import { IQuestionListRes } from '@/types/question';
import QuestionsList from './QuestionsList';

interface QuestionsProps {
  data?: APIResponse<IQuestionListRes>;
  type: 'common';
}

const CommonQuestions = ({ data, type }: QuestionsProps) => {
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
