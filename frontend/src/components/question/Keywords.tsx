import Toast from '@/components/@common/Toast/Toast';
import { useQuestion } from '@/hooks/question/useQuestion';
import { IKeywordItem, questionType } from '@/types/model';
import { IDeleteKeywordInfo } from '@/types/question';
import { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

interface IkeywordsProps {
  initialKeywords: IKeywordItem[];
  id: number;
  type: questionType;
}

const Keywords = ({ initialKeywords, id, type }: IkeywordsProps) => {
  const [keywords, setKeywords] = useState<IKeywordItem[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const { usePostKeyword, useDeleteKeyword } = useQuestion();

  const { mutate: postKeyword } = usePostKeyword({ type, questionId: id });
  const { mutate: deleteKeyword } = useDeleteKeyword();

  useEffect(() => {
    setKeywords(initialKeywords);
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
      if (!keywords.some(item => item.keyword === inputValue)) {
        setInputValue('');

        // 백엔드에 전송
        postKeyword(
          {
            type,
            questionId: id,
            keyword: { keyword: inputValue },
          },
          {
            onSuccess: res => {
              const newKeyword = res.data.keywordList[res.data.keywordList.length - 1];
              if (newKeyword) {
                setKeywords(prevKeywords => [...prevKeywords, newKeyword]);
              }
            },
            onError: () => {
              Toast.error('키워드 추가에 실패했습니다. 다시 시도해주세요.');
            },
          },
        );
      } else {
        setIsDuplicate(true);
        setMessage(`" ${inputValue} " 는/은 이미 추가된 키워드입니다.`);
        setInputValue('');
      }
    }
  };

  // 키워드 삭제
  const handleKeywordRemove = ({ keywordId, type }: IDeleteKeywordInfo) => {
    deleteKeyword(
      { type, keywordId },
      {
        onSuccess: () => {
          setKeywords(prevKeywords => prevKeywords.filter(item => item.id !== keywordId));
        },
        onError: () => {
          Toast.error('키워드 삭제에 실패했습니다. 다시 시도해주세요.');
        },
      },
    );
  };

  return (
    <div className="pb-5">
      <div className="flex justify-between items-center">
        <div className="flex">
          <p className="font-medium text-sm mb-2">핵심 키워드</p>
          {isDuplicate && <span className="text-red-500 text-xs px-3">{message}</span>}
        </div>
        <button
          onClick={toggleEdit}
          className="text-xs text-UNIMPORTANT_TEXT border-b border-UNIMPORTANT_TEXT  hover:text-MAIN1 hover:border-MAIN1 hover:font-medium"
        >
          {isEdit ? '접기' : '수정'}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {keywords.map(keyword => (
          <span
            key={keyword.id}
            className="w-fit inline-flex items-center rounded-xl bg-SUB px-3 py-2 mr-2 text-xs font-medium text-MAIN1"
          >
            {keyword.keyword}
            {isEdit ? (
              <button className="ml-1 p-1" onClick={() => handleKeywordRemove({ type, keywordId: keyword.id })}>
                {<IoClose />}
              </button>
            ) : (
              ''
            )}
          </span>
        ))}
        {isEdit && (
          <div>
            <input
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              placeholder="키워드를 추가해 보세요"
              className="w-38 text-xs px-3 py-2 border-2 border-[#F1F5FF] rounded-xl outline-none focus:border-MAIN1"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Keywords;
