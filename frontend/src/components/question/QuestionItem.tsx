import Accordian from '@/components/@common/Accordian/Accordian';
import Keywords from '@/components/question/Keywords';
import Script from '@/components/question/Script';
import { IQuestionList, interviewType } from '@/types/model';
import { useLocation } from 'react-router-dom';

interface IQuestionItemProps {
  question: string;
  id: number;
  isSelected: boolean;
  onAdd?: (questionObj: IQuestionList) => void;
  onRemove: (id: number) => void;
  type: interviewType;
}

const QuestionItem = ({ question, id, isSelected, onAdd, onRemove, type }: IQuestionItemProps) => {
  const location = useLocation();
  const isQuestionPage = location.pathname === '/question';

  return (
    <div className="mb-2">
      <Accordian
        titleContent={question}
        children={
          <>
            <Script initialScript="단점이 없는 게 장점입니다." maxLength={500} />
            <Keywords />
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