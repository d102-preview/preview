import React, { useRef, useState } from 'react';
import { IconType } from 'react-icons';
import { CgFileDocument } from 'react-icons/cg';
import { LuMinusCircle, LuPlusCircle } from 'react-icons/lu';

interface IAccordianProps {
  titleContent: string | React.ReactNode;
  children: string | React.ReactNode;
  defaultOpen?: boolean; // 초기 상태를 설정하기 위한 프로퍼티
  disabled?: boolean; // 아코디언이 비활성 여부
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
  isSelected?: boolean;
  onPlusClick?: () => void;
  onMinusClick?: () => void;
  hasIcons?: boolean;
}

const Accordian = ({
  titleContent,
  children,
  defaultOpen = false,
  disabled = false,
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
  width = 'w-full',
  onToggle,
  isSelected,
  onPlusClick, // '+' 아이콘 클릭 시 호출될 함수
  onMinusClick, // '-' 아이콘 클릭 시 호출될 함수
  hasIcons = false, // 아이콘 표시 여부
}: IAccordianProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // isOpen 상태를 토글하는 함수
  const toggleOpen = () => {
    if (disabled) return; // disabled가 true이면 열리지 않음

    setIsOpen(!isOpen);

    // 사용자 지정 토글 함수가 있으면, 상태 변경 후에 호출
    // 컴포넌트의 상태 변경 로직에 영향을 주지 않고, 추가적인 작업을 수행하는 용도로 사용됨
    if (onToggle) {
      onToggle();
    }
  };

  const handlePlusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPlusClick) {
      onPlusClick();
    }
  };

  const handleMinusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onMinusClick) {
      onMinusClick();
    }
  };

  // isOpen 상태에 따라 동적으로 스타일 변경
  const wrapperStyle = isOpen ? { height: 'auto' } : { height: '0px' };

  // 선택된 상태에 따라 테두리 스타일을 조건부로 적용
  const selectedBorderStyle = isSelected && hasIcons ? 'border-2 border-MAIN1' : 'border-none';

  return (
    <div
      className={`${width} ${backgroundColor} ${borderStyle} ${borderRadius} 
      m-4 cursor-pointer box-content drop-shadow-lg ${selectedBorderStyle}`}
    >
      <div className={`p-3 mx-3 flex items-center justify-between`} onClick={toggleOpen}>
        <div className={`flex items-center ${textColor} ${textSize} ${textWeight} h-8`}>
          {hasIcons &&
            (isSelected ? (
              <LuMinusCircle
                size="35"
                className="flex-shrink-0 mr-2 p-1 pl-0"
                color={iconOpenColor}
                onClick={handleMinusClick}
              />
            ) : (
              <LuPlusCircle
                size="35"
                className="flex-shrink-0 mr-2 p-1 pl-0"
                color={iconCloseColor}
                onClick={handlePlusClick}
              />
            ))}
          <div>{titleContent}</div>
        </div>
        {isOpen ? (
          <IconOpen size="25" className="flex-shrink-0 ml-2" color={iconOpenColor} />
        ) : (
          <IconClose size="25" className="flex-shrink-0 ml-2" color={iconCloseColor} />
        )}
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
