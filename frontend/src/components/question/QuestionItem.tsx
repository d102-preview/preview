import Accordian from '@/components/@common/Accordian/Accordian';
import Keywords from '@/components/question/Keywords';
import Script from '@/components/question/Script';
import { IQuestionItem, interviewType } from '@/types/model';
import { useLocation } from 'react-router-dom';
import { useQuestion } from '@/hooks/question/useQuestion';

interface IQuestionItemProps {
  question: string;
  id: number;
  isSelected: boolean;
  onAdd?: (questionObj: IQuestionItem) => void;
  onRemove: (id: number) => void;
  type: interviewType;
}

const QuestionItem = ({ question, id, isSelected, onAdd, onRemove, type }: IQuestionItemProps) => {
  const location = useLocation();
  const isQuestionPage = location.pathname === '/question';

  const { useGetQuestion } = useQuestion();
  const { mutate: getQuestion, data } = useGetQuestion(type, id);

  const handleClick = () => {
    getQuestion();
  };

  const script = data?.data?.questionDetail?.script?.script;
  const keywords = data?.data?.questionDetail.keywords;

  return (
    <div className="mb-2" onClick={handleClick}>
      <Accordian
        titleContent={question}
        children={
          <>
            <Script initialScript={script || ''} maxLength={500} />
            <Keywords initialKeywords={keywords || []} />
          </>
        }
        defaultOpen={false}
        isSelected={isSelected}
        onPlusClick={() => onAdd && onAdd({ id, question, type, keywordList: [] })} // '+' 아이콘 클릭 시 호출될 함수
        onMinusClick={() => onRemove(id)} // '-' 아이콘 클릭 시 호출될 함수
        hasIcons={isQuestionPage}
        textSize="text-base"
        textWeight="font-medium"
      />
    </div>
  );
};
export default QuestionItem;
