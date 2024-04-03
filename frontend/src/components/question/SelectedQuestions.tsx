import questionStore from '@/stores/questionStore';
import { getCurrentTime } from '@/utils/getCurrentTime';
import { LuMinusCircle } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import Button from '../@common/Button/Button';

const SelectedQuestions = () => {
  const { selectedQuestions, removeQuestion, message } = questionStore();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-between ml-5 p-4 rounded-2xl shadow-lg">
      <div className="w-[380px]">
        <h3 className="text-lg font-semibold mb-1">선택된 질문</h3>
        <p className="text-sm text-UNIMPORTANT_TEXT">총 {selectedQuestions.length}개의 질문이 선택되었습니다.</p>
        <ul>
          {selectedQuestions.map(questionObj => (
            <div
              key={questionObj.id}
              className={`p-3 my-3 cursor-pointer box-content drop-shadow-lg bg-white rounded-xl flex items-center`}
            >
              <LuMinusCircle
                size="35"
                className="flex-shrink-0 mr-2 p-1 pl-0 text-[#EA8888]"
                onClick={() => removeQuestion(questionObj.id!)}
              />
              <div>{questionObj.question}</div>
            </div>
          ))}
        </ul>
        {message && <p className="text-red-500 text-sm m-4">{message}</p>}
      </div>

      <div className="flex flex-end justify-end gap-2">
        <Button
          text="시작하기"
          width="w-20"
          height="h-8"
          backgroundColor="bg-MAIN1"
          hoverBackgroundColor="hover:bg-MAIN2"
          textColor="text-white"
          onClick={() =>
            navigate('/record', {
              state: {
                type: 'mock',
                startTime: getCurrentTime(),
                questionList: selectedQuestions,
              },
            })
          }
        />
      </div>
    </div>
  );
};
export default SelectedQuestions;
