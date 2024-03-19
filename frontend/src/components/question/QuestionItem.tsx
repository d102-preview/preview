import Accordian from '@/components/@common/Accordian/Accordian';
import Keywords from '@/components/question/Keywords';
import Script from '@/components/question/Script';

interface IQuestionObj {
  question: string;
  id: number;
}

interface IQuestionItemProps {
  question: string;
  id: number;
  onAdd?: (questionObj: IQuestionObj) => void;
  onRemove: (id: number) => void;
  
}

const QuestionItem = ({ question, id, onAdd, onRemove }: IQuestionItemProps) => {
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
        onPlusClick={() => onAdd && onAdd({ id, question })} // '+' 아이콘 클릭 시 호출될 함수
        onMinusClick={() => onRemove(id)} // '-' 아이콘 클릭 시 호출될 함수
        hasIcons={true}
        textSize="text-base"
        textWeight="font-medium"
      />
    </div>
  );
};
export default QuestionItem;
