import { TextareaHTMLAttributes, useState, useEffect, useRef } from 'react';

interface ISubTextProps {
  text: string;
  type: 'success' | 'info' | 'error';
}

// textarea 태그 기본 props 상속
interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  width?: string;
  label?: string;
  placeholder?: string;
  borderType?: 'none' | 'all';
  disabled?: boolean;
  subText?: ISubTextProps;
  maxLength?: number;
}

const Textarea = ({
  width = 'w-full',
  label,
  placeholder,
  borderType = 'all',
  disabled,
  subText,
  maxLength,
  ...props
}: ITextareaProps) => {
  // useState를 사용하여 text 상태를 관리
  const [text, setText] = useState((props.defaultValue as string) || '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // textarea의 높이를 조절하는 함수
  const adjustHeight = () => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto'; // 높이를 auto로 설정하여 textarea의 현재 내용에 상관없이 높이를 초기화(scrollHeight를 정확하게 측정하기 위함)
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // scrollHeight 값을 이용해 높이 조절
  };

  // text 상태가 변화할 때마다 높이 조절
  useEffect(() => {
    adjustHeight();
  }, [text]);

  // 사용자 입력을 처리하고 상태를 업데이트하는 handleChange 함수
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    // maxLength가 정의되어 있고, 입력값의 길이가 maxLength를 초과하는 경우 입력값을 잘라냄
    if (maxLength && inputValue.length > maxLength) {
      setText(inputValue.slice(0, maxLength));
    } else {
      setText(inputValue);
    }
    adjustHeight(); // 입력 상태가 변화할 때마다 높이 조절
  };

  const setSubTextStyle = () => {
    switch (subText?.type) {
      case 'success':
        return 'text-green-700';
      case 'info':
        return 'text-gray-800';
      case 'error':
        return 'text-red-500';
      default:
        return '';
    }
  };

  return (
    <div className="pb-5">
      {label && <div className="pb-1.5 text-md">{label}</div>}
      <div
        className={`${width} ${borderType === 'all' ? 'border-2 rounded-lg' : 'border-none'} 
        ${disabled ? 'bg-gray-100' : 'bg-white'}  focus-within:border-MAIN1 overflow-hidden`}
        style={{ padding: '0.75rem' }}
      >
        <textarea
          {...props}
          ref={textareaRef}
          value={text}
          disabled={disabled}
          onChange={handleChange}
          className="w-full h-6 text-sm resize-none outline-none overflow-y-hidden"
          maxLength={maxLength}
          placeholder={placeholder}
        />
      </div>
      <div className="flex justify-between items-center mt-2">
        {subText ? (
          <div className={`text-xs ${setSubTextStyle()}`}>{subText.text}</div>
        ) : (
          <div className="flex-grow"></div> // subText가 없을 때 이 div가 남은 공간을 차지
        )}
        <div className="text-xs text-right">{`${text.length}${maxLength ? ` / ${maxLength}` : ''}자`}</div>
      </div>
    </div>
  );
};

export default Textarea;
