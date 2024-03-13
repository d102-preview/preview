import React, { useRef } from 'react';
import { IconType } from 'react-icons';
import { CgFileDocument } from 'react-icons/cg';

interface IAccordianProps {
  titleContent: string | React.ReactNode;
  children: string | React.ReactNode;
  isOpen: boolean;
  iconOpen?: IconType;
  iconClose?: IconType;
  iconOpenColor?: string;
  iconCloseColor?: string;
  backgroundColor?: string;
  borderStyle?: string;
  borderRadius?: string;
  textColor?: string;
  textSize?: string;
  textWeight?: string;
  width?: string;
  onToggle: () => void;
}

const Accordian = ({
  titleContent,
  children,
  isOpen,
  iconOpen: IconOpen = CgFileDocument,
  iconClose: IconClose = CgFileDocument,
  iconOpenColor = '#5A8AF2',
  iconCloseColor = '#DFDFDF',
  backgroundColor = 'bg-white',
  borderStyle = 'border-2',
  borderRadius = 'rounded-xl',
  textColor = 'text-gray-800',
  textSize = 'text-md',
  textWeight = 'font-normal',
  width = 'w-10/12',
  onToggle,
}: IAccordianProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // isOpen 상태에 따라 동적으로 스타일 변경
  const wrapperStyle = isOpen ? { height: 'auto' } : { height: '0px' };
  const borderColor = isOpen ? 'border-transparent' : 'border-[#5A8AF2]';

  return (
    <div
      className={`m-4 cursor-pointer ${width} ${backgroundColor} ${borderStyle} ${borderColor} ${borderRadius}`}
      onClick={onToggle}
    >
      <div className={`p-3 mx-3 flex justify-between`}>
        <div className={` ${textColor} ${textSize} ${textWeight}`}>{titleContent}</div>
        <div>
          {isOpen ? <IconOpen size="25" color={iconOpenColor} /> : <IconClose size="25" color={iconCloseColor} />}
        </div>
      </div>
      {/* content wrapper */}
      <div
        ref={wrapperRef}
        className="px-3 mx-3 h-0 overflow-hidden transition"
        style={{ ...wrapperStyle, transition: 'all 0.3s ease' }}
      >
        <div>{children}</div>
      </div>
    </div>
  );
};
export default Accordian;
