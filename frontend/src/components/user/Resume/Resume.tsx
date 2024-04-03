import { useResume } from '@/hooks/resume/useResume';
import { IResume } from '@/types/model';
import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaRegFileAlt } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';
import { VscOpenPreview } from 'react-icons/vsc';
import ResumeAddModal from '../Modal/ResumeAddModal/ResumeAddModal';
import PDFViewer from '../PDFViewer/PDFViewer';

const Resume = ({ resume }: { resume: (IResume | undefined)[] }) => {
  const { useGetResume, useDeleteResume } = useResume();
  const { mutate: downloadResume } = useGetResume();
  const { mutate: deleteResume } = useDeleteResume();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShowPreview, setIsShowPreview] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handlePreviewResume = (resumeId: number) => {
    downloadResume(String(resumeId), {
      onSuccess: res => {
        const blob = new Blob([res], { type: 'application/pdf' });
        const blobURL = URL.createObjectURL(blob);

        setPreviewUrl(blobURL);
        setIsShowPreview(true);
      },
    });
  };

  const handleDownloadResume = (resumeId: number, resumeName: string) => {
    downloadResume(String(resumeId), {
      onSuccess: res => {
        const blob = new Blob([res], { type: 'application/pdf' });
        const blobURL = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobURL;
        link.download = resumeName;

        document.body.appendChild(link);
        link.click();

        URL.revokeObjectURL(blobURL);
        link.remove();
      },
    });
  };

  const handleDeleteResume = (resumeId: number) => {
    if (window.confirm('이력서를 삭제하시겠습니까?')) {
      deleteResume(String(resumeId));
    }
  };

  // console.log(resume, resume.length, resume[0]);

  return (
    <>
      <div className="flex justify-between items-center pt-8 border-t-[1px]">
        <div>
          내 이력서 ({resume?.length}/3) <span className="text-xs text-gray-400">&nbsp;최대 3개 업로드 가능</span>
        </div>
        {resume[0] !== undefined && (
          <button
            onClick={() => setIsShowModal(true)}
            className="px-3 py-2 text-sm text-center text-MAIN1 bg-[#F8FAFF] hover:bg-[#EAF0FF] rounded-md cursor-pointer"
          >
            이력서 추가
          </button>
        )}
      </div>
      <div className="pt-4">
        {resume.length >= 1 ? (
          resume.map(ele => {
            if (!ele) return;
            return (
              <div
                key={ele.id}
                className={`h-12 px-4 mb-1 flex justify-between items-center border ${ele.status === 'fail' ? 'text-red-500 border-red-500/50' : 'text-MAIN1 border-MAIN1/50'}  rounded-md`}
              >
                <div className={`flex items-center ${ele.status === 'fail' ? 'text-red-500' : 'text-BLACK'}`}>
                  <FaRegFileAlt />
                  &nbsp;{ele.displayName}
                  {ele.status === 'fail' && (
                    <span className="text-red-500 text-xs bg-red-500/10 p-1 px-2 rounded-lg ml-3">분석 실패</span>
                  )}
                </div>
                <div className="flex items-center">
                  <div
                    className={`p-1 cursor-pointer ${ele.status === 'fail' ? 'hover:bg-red-500/10' : 'hover:bg-MAIN1/10'} rounded-md`}
                    onClick={() => handlePreviewResume(ele.id)}
                  >
                    <VscOpenPreview size={18} />
                  </div>
                  <div
                    className={`p-1 cursor-pointer ${ele.status === 'fail' ? 'hover:bg-red-500/10' : 'hover:bg-MAIN1/10'} rounded-md`}
                    onClick={() => handleDownloadResume(ele.id, ele.displayName)}
                  >
                    <FiDownload size={18} />
                  </div>
                  <div
                    className={`p-1 cursor-pointer ${ele.status === 'fail' ? 'hover:bg-red-500/10' : 'hover:bg-MAIN1/10'} rounded-md`}
                    onClick={() => handleDeleteResume(ele.id)}
                  >
                    <AiOutlineDelete size={18} />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-full h-48 flex flex-col justify-center items-center border border-gray-200 rounded-md">
            <div className="text-gray-600">등록된 이력서가 없습니다</div>
            {resume[0] === undefined && (
              <button
                onClick={() => setIsShowModal(true)}
                className="mt-2 px-4 py-2 text-sm text-center text-MAIN1 bg-[#F8FAFF] hover:bg-[#EAF0FF] rounded-md cursor-pointer"
              >
                이력서 추가
              </button>
            )}
          </div>
        )}
      </div>
      {isShowModal && <ResumeAddModal onClose={() => setIsShowModal(false)} />}
      {isShowPreview && <PDFViewer file={previewUrl} onClose={() => setIsShowPreview(false)} />}
    </>
  );
};

export default Resume;
