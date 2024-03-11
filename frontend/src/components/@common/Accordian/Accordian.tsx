import React, { useRef, useState } from 'react';
import { CgFileDocument } from 'react-icons/cg';

interface IAccordianProps {
  titleContent: string | React.ReactNode;
  children: string | React.ReactNode;
}

const Accordian = ({ titleContent, children }: IAccordianProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    if (!wrapperRef.current || !contentRef.current) return;

    if (!isOpen) {
      // wrapperRef의 높이를 자동으로 조절
      wrapperRef.current.style.height = `auto`;
      setIsOpen(true);
    } else {
      // wrapperRef의 높이를 0으로 설정하여 내용을 감춤
      wrapperRef.current.style.height = '0px';
      setIsOpen(false);
    }
  };
  return (
    <div>
      <div className="p-3 mx-3 flex justify-between cursor-pointer" onClick={handleOpen}>
        <div>{titleContent}</div>
        <div>
          {isOpen ? <CgFileDocument size="25" color="#5A8AF2" /> : <CgFileDocument size="25" color="#E8E8E8" />}
        </div>
      </div>
      {/* content wrapper */}
      <div
        ref={wrapperRef}
        className="px-3 mx-3 h-0 overflow-hidden transition"
        style={{ transition: 'all 0.3s ease' }}
      >
        <div ref={contentRef}>{children}</div>
      </div>
    </div>
  );
};
export default Accordian;
