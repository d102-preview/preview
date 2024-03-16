import { InputHTMLAttributes } from 'react';

interface ISubTextProps {
  text: string;
  type: 'success' | 'info' | 'error';
}

// input 태그 기본 props 상속
interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  label?: string;
  placeholder?: string;
  borderType?: 'bottom' | 'all';
  disabled?: boolean;
  type?: string;
  subText?: ISubTextProps;
}

const Input = ({
  width = 'w-full',
  label,
  placeholder = '',
  borderType = 'bottom',
  disabled = false,
  type = 'text',
  subText,
  ...props
}: IInputProps) => {
  const setSubTextStyle = () => {
    if (subText?.type === 'success') {
      return 'text-green-700';
    } else if (subText?.type === 'info') {
      return 'text-gray-800';
    } else if (subText?.type === 'error') {
      return 'text-red-500';
    }
  };

  return (
    <>
      {label && <div className="pb-1.5">{label}</div>}
      <input
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        className={`${width} h-10 text-sm border-[#D4D4D4] px-2 flex items-center ${borderType === 'all' ? 'border-[2px] rounded-md' : 'border-b-[2px]'} outline-none focus:border-MAIN1`}
        {...props}
      />
      {subText && <div className={`text-xs pt-1 pl-2 ${setSubTextStyle()}`}>{subText.text}</div>}
    </>
  );
};

export default Input;
