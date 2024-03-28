import { IResume } from '@/types/model';
import { useState } from 'react';
import ResumeAddModal from '../Modal/ResumeAddModal/ResumeAddModal';

const Resume = ({ resume }: { resume: IResume[] | undefined }) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  return (
    <div>
      <span>내 이력서</span>
      <div className="grid grid-cols-3 gap-4 pt-4">
        {resume &&
          resume.map(ele => {
            return (
              <div
                key={ele.id}
                className="h-48 flex justify-center items-center text-gray-400 border rounded-md cursor-pointer"
              >
                {ele.displayName}
                {/* {ele.filePath} */}
              </div>
            );
          })}
        {(resume === undefined || resume.length <= 2) && (
          <button
            onClick={() => setIsShowModal(true)}
            className="h-48 flex justify-center items-center text-MAIN1 border bg-[#F8FAFF] hover:bg-[#EAF0FF] rounded-md cursor-pointer"
          >
            추가하기
          </button>
        )}
      </div>
      {isShowModal && <ResumeAddModal onClose={() => setIsShowModal(false)} />}
    </div>
  );
};

export default Resume;
