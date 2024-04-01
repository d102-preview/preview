import Toast from '@/components/@common/Toast/Toast';
import { Dispatch, SetStateAction, useState } from 'react';

const DragDropBox = ({
  setContent,
  allowExtensions,
  children,
}: {
  setContent: Dispatch<SetStateAction<File | null>>;
  allowExtensions: string[];
  children: React.ReactNode;
}) => {
  const [isDrag, setIsDrag] = useState<Boolean>(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setIsDrag(true);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDrag(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDrag(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDrag(false);

    let isExist = false;
    allowExtensions.forEach(extension => {
      if (e.dataTransfer.files[0].name.includes(extension)) {
        isExist = true;
      }
    });

    if (!isExist) {
      Toast.error(`지원하지 않는 파일 형식입니다. ${allowExtensions.join(' ')}형식으로 등록해주세요.`);
      return;
    }
    setContent(e.dataTransfer.files[0]);
  };

  return (
    <div
      className={`${isDrag && 'bg-MAIN2/10 border border-MAIN1'} w-full h-full hover:bg-MAIN2/10 rounded-md`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default DragDropBox;
