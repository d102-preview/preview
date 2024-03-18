import Accordian from '@/components/@common/Accordian/Accordian';
import Keywords from '@/components/question/Keywords';
import Script from '@/components/question/Script';

interface IQuestionItemProps {
  question: string;
  id: number;
}

const QuestionItem = ({ question, id }: IQuestionItemProps) => {
  return (
    <div className="mb-2">
      <Accordian
        titleContent={question}
        children={
          <>
            <Script initialScript="단점이 없는 게 장점입니다." maxLength={50} />
            <Keywords />
          </>
        }
        defaultOpen={false}
        hasIcons={true}
        textSize="text-base"
        textWeight="font-medium"
      />
    </div>
  );
};
export default QuestionItem;
