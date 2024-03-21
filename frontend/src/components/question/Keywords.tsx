import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

const Keywords = () => {
  const [keywords, setKeywords] = useState<string[]>(['React', '선언적 UI', '컴포넌트 기반', '커뮤니티']); // 더미 데이터
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  // 키워드 수정
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setKeywords([...keywords, inputValue]);
      setInputValue('');
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
          {isEdit ? '저장' : '수정'}
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
          <input
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="키워드를 추가해 보세요"
            className="w-38 text-xs px-3 py-2 border-2 border-[#F1F5FF] rounded-xl outline-none focus:border-MAIN1"
          />
        )}
      </div>
    </div>
  );
};

export default Keywords;
