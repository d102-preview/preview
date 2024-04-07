import { useResume } from '@/hooks/resume/useResume';
import { useUser } from '@/hooks/user/useUser';
import PDFViewer from '@/components/user/PDFViewer/PDFViewer';
import { useState } from 'react';
import { FaRegFileAlt } from 'react-icons/fa';
import { VscOpenPreview } from 'react-icons/vsc';
import Header from '@/components/@common/Header/Header';
import resumeImg from '@/assets/lotties/resume.json';
import Lottie from 'react-lottie';
import Button from '@/components/@common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { getCurrentTime } from '@/utils/getCurrentTime';

const ResumeSelectPage = () => {
  const { useGetUser } = useUser();
  const { useGetResume } = useResume();
  const { data: resume } = useGetUser();
  const { mutate: downloadResume } = useGetResume();
  const [isShowPreview, setIsShowPreview] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const navigate = useNavigate();

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

  const resumeOptions = {
    loop: true,
    autoplay: true,
    animationData: resumeImg,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <>
      <Header />
      <div className="w-[45rem]  min-w-[45rem] h-[calc(100vh-80px)] mx-auto animate-showUp">
        <div className="h-full flex flex-col justify-center">
          <h1 className="text-3xl font-bold">이력서를 선택해주세요</h1>
          <p className="text-sm pt-3">이력서에 기반한 질문을 제공합니다</p>
          <div className="flex pt-16">
            <Lottie options={resumeOptions} width={350} />
            {resume && resume.data.user.resumeList && (
              <>
                <div className="flex-1 text-sm border ml-8 rounded-lg text-center px-4">
                  <p className="font-bold pt-5">나의 이력서</p>
                  <div className="text-right pr-4 pt-1 text-xs pb-5 text-BLACK">
                    {resume.data.user.resumeList.length} / 3
                  </div>
                  {resume.data.user.resumeList.length >= 1 ? (
                    resume.data.user.resumeList.map(ele => {
                      if (!ele) return;
                      return (
                        <div
                          key={ele.id}
                          className="h-12 px-4 flex justify-between items-center mb-2  text-MAIN1 border-b hover:bg-MAIN1/10 cursor-pointer"
                          onClick={() =>
                            navigate('/record', {
                              state: {
                                type: 'main',
                                startTime: getCurrentTime(),
                                resumeId: ele.id,
                              },
                            })
                          }
                        >
                          <div className="flex items-center text-BLACK">
                            <FaRegFileAlt />
                            &nbsp;{ele.displayName}
                          </div>
                          <div className="flex items-center">
                            <div
                              className="p-1 cursor-pointer hover:bg-MAIN1/10 rounded-md"
                              onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                handlePreviewResume(ele.id);
                              }}
                            >
                              <VscOpenPreview size={18} />
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div>
                      <div className="h-full flex flex-col pt-10 gap-3 text-BLACK text-center pb-8 ">
                        <div>등록된 이력서가 없습니다</div>
                        <p>마이페이지에서 이력서를 등록해보세요</p>
                      </div>
                      <Button
                        onClick={() => navigate('/my')}
                        text="등록 하러 가기"
                        width="w-52"
                        borderColor="border border-MAIN1"
                        textColor="text-MAIN1"
                      />
                    </div>
                  )}
                </div>
                {isShowPreview && <PDFViewer file={previewUrl} onClose={() => setIsShowPreview(false)} />}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeSelectPage;
