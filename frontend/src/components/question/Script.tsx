import Textarea from '@/components/@common/Textarea/Textarea';
import { useQuestion } from '@/hooks/question/useQuestion';
import { ISubText, questionType } from '@/types/model';
import { useState, useEffect } from 'react';
import { MAX_SCRIPT_LENGTH } from '@/constants/constants';

interface IScriptProps {
  initialScript: string;
  id: number;
  type: questionType;
}

const Script = ({ initialScript, id, type }: IScriptProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [script, setScript] = useState<string>(initialScript);
  const [tempScript, setTempScript] = useState<string>('');
  const [subText, setSubText] = useState<ISubText>({ text: '', type: 'info' });

  const { usePostScript } = useQuestion();
  const { mutate: postScript } = usePostScript({ type, questionId: id });

  useEffect(() => {
    setScript(initialScript);
  }, [initialScript]);

  const toggleEdit = () => {
    if (!isEdit) {
      setTempScript(script); // 편집을 시작할 때 현재 스크립트를 임시 스크립트로 저장
    }
    setIsEdit(!isEdit);
  };

  const handleScriptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    // 입력 길이가 maxLength를 초과하지 않도록 체크
    if (value.length <= MAX_SCRIPT_LENGTH) {
      setScript(value);
      setSubText({ text: '', type: 'info' });
    } else {
      // maxLength를 초과하려고 할 때 메시지 설정
      setSubText({ text: `최대 ${MAX_SCRIPT_LENGTH}자까지 입력 가능합니다.`, type: 'error' });
    }
  };

  const handleSave = () => {
    postScript({
      type,
      questionId: id,
      script: { script },
    });
    // 저장 성공시 편집 상태 종료
    setIsEdit(false);
  };

  const handleCancel = () => {
    // 수정 전의 스크립트 내용으로 되돌리기
    setScript(tempScript);
    setIsEdit(false);
  };

  return (
    <>
      <div className="flex justify-between items-center my-1">
        <p className="font-medium text-sm mb-2">스크립트</p>
        {!isEdit ? (
          <button
            className="text-xs text-UNIMPORTANT_TEXT border-b border-UNIMPORTANT_TEXT hover:text-MAIN1 hover:border-MAIN1 hover:font-medium"
            onClick={toggleEdit}
          >
            {script ? '수정' : '작성'}
          </button>
        ) : (
          <div>
            <button
              className="text-xs text-UNIMPORTANT_TEXT border-b border-UNIMPORTANT_TEXT mr-2 hover:text-MAIN1 hover:border-MAIN1 hover:font-medium"
              onClick={handleCancel}
            >
              취소
            </button>
            <button
              className="text-xs text-UNIMPORTANT_TEXT border-b border-UNIMPORTANT_TEXT hover:text-MAIN1 hover:border-MAIN1 hover:font-medium"
              onClick={handleSave}
            >
              저장
            </button>
          </div>
        )}
      </div>
      <Textarea
        className="whitespace-pre"
        disabled={!isEdit}
        value={script}
        onChange={handleScriptChange}
        placeholder="해당 질문에 대한 스크립트를 미리 작성해보세요!"
        maxLength={MAX_SCRIPT_LENGTH}
        subText={subText}
      />
    </>
  );
};

export default Script;
