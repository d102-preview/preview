import React, { useRef, useState } from 'react';
import { IconType } from 'react-icons';
import { CgFileDocument } from 'react-icons/cg';
import { LuMinusCircle, LuPlusCircle } from 'react-icons/lu';

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
  onPlusClick?: () => void;
  onMinusClick?: () => void;
  hasIcons?: boolean;
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
  borderStyle = 'border-0',
  borderRadius = 'rounded-xl',
  textColor = 'text-gray-800',
  textSize = 'text-sm',
  textWeight = 'font-normal',
  width = 'w-10/12',
  onToggle,
  onPlusClick, // '+' 아이콘 클릭 시 호출될 함수
  onMinusClick, // '-' 아이콘 클릭 시 호출될 함수
  hasIcons = false, // 아이콘 표시 여부
}: IAccordianProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const [isSelected, setIsSelected] = useState<boolean>(false);
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

  const handleIconClick = (event: React.MouseEvent) => {
    // 버블링을 방지하여 아코디언 헤더의 onClick 이벤트가 발생하지 않도록 함
    event.stopPropagation();
    setIsSelected(!isSelected);

    if (!isSelected && onPlusClick) {
      onPlusClick();
    } else if (isSelected && onMinusClick) {
      onMinusClick();
    }
  };

  // isOpen 상태에 따라 동적으로 스타일 변경
  const wrapperStyle = isOpen ? { height: 'auto' } : { height: '0px' };

  return (
    <div
      className={`m-4 cursor-pointer ${width} ${backgroundColor} ${borderStyle} ${borderRadius} drop-shadow-lg hover:border-2 hover:border-MAIN1`}
    >
      <div className={`p-3 mx-3 flex items-center justify-between`} onClick={toggleOpen}>
        <div className={`flex items-center ${textColor} ${textSize} ${textWeight}`}>
          {hasIcons &&
            (isSelected ? (
              <LuMinusCircle size="35" className="mr-2 p-1 pl-0" color={iconOpenColor} onClick={handleIconClick} />
            ) : (
              <LuPlusCircle size="35" className="mr-2 p-1  pl-0" color={iconCloseColor} onClick={handleIconClick} />
            ))}
          <div>{titleContent}</div>
        </div>
        {isOpen ? <IconOpen size="25" color={iconOpenColor} /> : <IconClose size="25" color={iconCloseColor} />}
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
