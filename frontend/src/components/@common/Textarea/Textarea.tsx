import { TextareaHTMLAttributes, useEffect, useRef } from 'react';

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
  value: string;
}

const Textarea = ({
  width = 'w-full',
  label,
  placeholder,
  borderType = 'all',
  disabled,
  subText,
  maxLength,
  value = '', // 외부에서 전달받은 value 사용
  onChange, // 외부에서 전달받은 onChange 사용
  ...props
}: ITextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // textarea의 높이를 조절하는 함수
  const adjustHeight = () => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto'; // 높이를 auto로 설정하여 textarea의 현재 내용에 상관없이 높이를 초기화(scrollHeight를 정확하게 측정하기 위함)
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // scrollHeight 값을 이용해 높이 조절
  };

  // 컴포넌트 마운트 및 value 변경 시 높이 조절
  useEffect(() => {
    adjustHeight();
  }, [value]);

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
        className={`${width} ${borderType === 'all' ? 'border-2 rounded-lg' : 'border-none'} border-[#E8E8E8] focus-within:border-[#A7A7A7] overflow-hidden`}
        style={{ padding: '0.75rem' }}
      >
        <textarea
          {...props}
          ref={textareaRef}
          value={value} // 외부에서 받은 value 사용
          disabled={disabled}
          onChange={onChange}
          className={`w-full h-6 text-sm resize-none outline-none overflow-y-hidden bg-inherit`}
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
        <div className="text-xs text-right text-UNIMPORTANT_TEXT">{`${value.length}${maxLength ? ` / ${maxLength}` : ''}자`}</div>
      </div>
    </div>
  );
};

export default Textarea;
