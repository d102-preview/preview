import React, { useRef, useState } from 'react';
import { IconType } from 'react-icons';
import { CgFileDocument } from 'react-icons/cg';

interface IAccordianProps {
  titleContent: string | React.ReactNode;
  children: string | React.ReactNode;
  defaultOpen?: boolean; // 초기 상태를 설정하기 위한 프로퍼티
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
  onToggle?: () => void; // 사용자 정의 토글 함수(추가적인 액션)가 있는 경우
}

const Accordian = ({
  titleContent,
  children,
  defaultOpen = false,
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
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // isOpen 상태를 토글하는 함수
  const toggleOpen = () => {
    setIsOpen(!isOpen);

    // 사용자 지정 토글 함수가 있으면, 상태 변경 후에 호출
    // 컴포넌트의 상태 변경 로직에 영향을 주지 않고, 추가적인 작업을 수행하는 용도로 사용됨
    if (onToggle) {
      onToggle();
    }
  };

  // isOpen 상태에 따라 동적으로 스타일 변경
  const wrapperStyle = isOpen ? { height: 'auto' } : { height: '0px' };
  const borderColor = isOpen ? 'border-transparent' : 'border-[#5A8AF2]';
  const shadow = isOpen ? 'drop-shadow-lg' : 'drop-shadow-none';

  return (
    <div
      className={`m-4 cursor-pointer ${width} ${backgroundColor} ${borderStyle} ${borderColor} ${borderRadius} ${shadow}`}
    >
      <div className={`p-3 mx-3 flex justify-between`} onClick={toggleOpen}>
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
