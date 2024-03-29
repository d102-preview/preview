import { useQuestion } from '@/hooks/question/useQuestion';
import { IKeywordItem, interviewType } from '@/types/model';
import { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

interface IkeywordsProps {
  initialKeywords: IKeywordItem[];
  id: number;
  type: interviewType;
}

const Keywords = ({ initialKeywords, id, type }: IkeywordsProps) => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [message, setMessage] = useState('');

  const { usePostKeyword } = useQuestion();
  const { mutate: postKeyword } = usePostKeyword(type, id);

  // initialKeywords가 변경될 때마다 keywords 상태 업데이트
  useEffect(() => {
    setKeywords(initialKeywords.map(item => item.keyword));
  }, [initialKeywords]);

  const toggleEdit = () => {
    setIsEdit(!isEdit);
    if (isEdit) {
      // duplicate 관련 상태 초기화
      setIsDuplicate(false);
      setMessage('');
    }
  };

  // 키워드 추가
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isDuplicate) {
      setIsDuplicate(false);
      setMessage('');
    }
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      // 키워드 중복 검사
      if (!keywords.includes(inputValue)) {
        postKeyword(
          {
            type,
            questionId: id,
            keyword: { keyword: inputValue },
          },
          {
            onSuccess: () => {
              setKeywords([...keywords, inputValue]);
              setInputValue('');
            },
            onError: err => {
              console.error('키워드 추가 실패', err);
            },
          },
        );
      } else {
        setIsDuplicate(true);
        setMessage(`"${inputValue}"는(은) 이미 추가된 키워드입니다.`);
        setInputValue('');
      }
    }
  };

  // 키워드 삭제
  const handleKeywordRemove = (index: number) => {
    const newKeywords = [...keywords]; // 불변성 유지를 위해 배열 복제
    newKeywords.splice(index, 1); // 해당 인덱스의 키워드 제거
    setKeywords(newKeywords);
  };

  return (
    <div className="pb-5">
      <div className="flex justify-between  items-center">
        <p className="font-medium text-sm mb-2">핵심 키워드</p>
        <button className="text-xs text-UNIMPORTANT_TEXT border-b border-UNIMPORTANT_TEXT" onClick={toggleEdit}>
          {isEdit ? '접기' : '추가'}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <span
            key={index}
            className="w-fit inline-flex items-center rounded-xl bg-SUB px-3 py-2 mr-2 text-xs font-medium text-MAIN1"
          >
            {keyword}
            {isEdit ? (
              <button className="ml-1 p-1" onClick={() => handleKeywordRemove(index)}>
                {<IoClose />}
              </button>
            ) : (
              ''
            )}
          </span>
        ))}
        {isEdit && (
          <div className="flex">
            <input
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              placeholder="키워드를 추가해 보세요"
              className="w-38 text-xs px-3 py-2 border-2 border-[#F1F5FF] rounded-xl outline-none focus:border-MAIN1"
            />
            {isDuplicate && <span className="text-red-500 text-sm p-3">{message}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Keywords;
