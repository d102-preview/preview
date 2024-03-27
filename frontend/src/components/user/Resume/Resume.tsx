import { useState } from 'react';
import ResumeAddModal from '../Modal/ResumeAddModal/ResumeAddModal';

const Resume = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  return (
    <div>
      <span>내 이력서</span>
      <div className="grid grid-cols-3 gap-4 pt-4">
        <div className="h-48 flex justify-center items-center text-gray-400 border rounded-md cursor-pointer">
          수화의 이력서
        </div>
        <button
          onClick={() => setIsShowModal(true)}
          className="h-48 flex justify-center items-center text-MAIN1 border bg-[#F8FAFF] hover:bg-[#EAF0FF] rounded-md cursor-pointer"
        >
          추가하기
        </button>
      </div>
      {isShowModal && <ResumeAddModal onClose={() => setIsShowModal(false)} />}
    </div>
  );
};

export default Resume;
