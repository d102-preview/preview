import { useState } from 'react';

interface IModalProps {
  width: string;
  contentBackgroundColor?: string;
  isBackgroundColorDark?: boolean;
  padding?: string;
  rounded?: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({
  width,
  padding = 'p-5',
  rounded = 'rounded-lg',
  contentBackgroundColor = 'bg-white',
  isBackgroundColorDark = true,
  onClose,
  children,
}: IModalProps) => {
  const [isRendering, setIsRendering] = useState<boolean>(true);

  const handleClose = () => {
    setIsRendering(false);

    setTimeout(() => {
      onClose();
    }, 250);
  };

  return (
    <>
      <div
        className={`absolute w-full h-full top-0 left-0 right-0 bottom-0  ${isBackgroundColorDark && 'bg-black/70'}`}
        onClick={handleClose}
      ></div>
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${width} ${padding} ${rounded} ${contentBackgroundColor} ${!isBackgroundColorDark && 'text-white'} 
          ${isRendering ? 'animate-modalOpen' : 'animate-modalClose'}
        `}
      >
        <div className=" flex justify-end cursor-pointer" onClick={handleClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill={`${isBackgroundColorDark ? '#000000' : '#ffffff'}`}
            viewBox="0 0 256 256"
          >
            <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
          </svg>
        </div>

        {children}
      </div>
    </>
  );
};

export default Modal;
