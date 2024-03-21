import QuestionsList from './QuestionsList';
import { IQuestionList, interviewType } from '@/types/model';

interface QuestionsProps {
  questions: IQuestionList[];
  type: interviewType
}

const CommonQuestions = ({ questions, type }: QuestionsProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold">공통 면접 질문</h3>
      <p className="text-UNIMPORTANT_TEXT pt-1">총 {questions.length}개의 질문이 있습니다.</p>
      <QuestionsList questions={questions} type={type} />
    </div>
  );
};
export default CommonQuestions;
