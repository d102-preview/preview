import { useNavigate } from 'react-router-dom';
import Button from '../@common/Button/Button';
import QuestionItem from './QuestionItem';
import { LuMinusCircle } from 'react-icons/lu';

interface IQuestionObj {
  question: string;
  id: number;
}

interface ISelectedQuestionsProps {
  selectedQuestion: IQuestionObj[]; // Props 타입을 IQuestionObj 배열로 변경합니다.
  onRemove: (id: number) => void;
}

const SelectedQuestions = ({ selectedQuestion, onRemove }: ISelectedQuestionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-between ml-10 p-7 w-1/3 rounded-2xl shadow-lg">
      <div>
        <h3 className="text-xl font-semibold mb-1">선택된 질문</h3>
        <p className="text-sm text-UNIMPORTANT_TEXT">총 {selectedQuestion.length}개의 질문이 선택되었습니다.</p>
        <ul>
          {selectedQuestion.map(questionObj => (
            <div
              key={questionObj.id}
              className={`m-4 p-3 cursor-pointer box-content drop-shadow-lg w-10/12 bg-white rounded-xl flex items-center`}
            >
              <LuMinusCircle
                size="35"
                className="flex-shrink-0 mr-2 p-1 pl-0 text-MAIN1"
                onClick={() => onRemove(questionObj.id)}
              />
              <div>{questionObj.question}</div>
            </div>
          ))}
        </ul>
      </div>

      <div className="flex flex-end justify-end gap-2">
        <Button
          text="취소하기"
          width="w-20"
          height="h-8"
          backgroundColor="bg-[#F3F3F3]"
          hoverBackgroundColor="hover:bg-[#bebebe]"
          textColor="text-white"
          //   onClick={() => navigate('/record')}
        />
        <Button
          text="시작하기"
          width="w-20"
          height="h-8"
          backgroundColor="bg-MAIN1"
          hoverBackgroundColor="hover:bg-MAIN2"
          textColor="text-white"
          onClick={() => navigate('mock')}
        />
      </div>
    </div>
  );
};
export default SelectedQuestions;
