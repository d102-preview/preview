import Button from '@/components/@common/Button/Button';
import DragDropBox from '@/components/@common/DragDropBox/DragDropBox';
import Input from '@/components/@common/Input/Input';
import Modal from '@/components/@common/Modal/Modal';
import Toast from '@/components/@common/Toast/Toast';
import { useResume } from '@/hooks/resume/useResume';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FaRegFileAlt } from 'react-icons/fa';
import { TbFileUpload } from 'react-icons/tb';

const ResumeAddModal = ({ onClose }: { onClose: () => void }) => {
  const { usePostResume } = useResume();
  const { mutate: uploadResume } = usePostResume();

  const [isPossibleRegister, setIsPossibleRegister] = useState<boolean>(false);
  const [resumeName, setResumeName] = useState<string>('');
  const [selectedResume, setSelectedResume] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (resumeName.length > 0 && selectedResume) {
      setIsPossibleRegister(true);
    } else {
      setIsPossibleRegister(false);
    }
  }, [resumeName, selectedResume]);

  useEffect(() => {
    if (selectedResume && resumeName === '') {
      setResumeName(selectedResume.name);
    }
  }, [selectedResume]);

  const handleResumeName = (e: ChangeEvent<HTMLInputElement>) => {
    setResumeName(e.target.value);
  };

  const onChangeResume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedResume(file);
    }
  };

  const handleDeleteResume = () => {
    setResumeName('');
    setSelectedResume(null);
  };

  const handleRegisterResume = () => {
    if (!selectedResume) {
      Toast.error('이력서를 선택하지 않았습니다.');
      return;
    }

    const normalizedName = resumeName.normalize();

    if (window.confirm('이력서를 등록하시겠습니까?')) {
      const formData = new FormData();

      formData.append('displayName', normalizedName);
      formData.append('resume', selectedResume);

      uploadResume(formData, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <Modal width="w-[500px]" onClose={onClose}>
      <div className="p-4">
        <div className="text-xl">이력서 등록</div>
        <br />
        {!selectedResume ? (
          <DragDropBox setContent={setSelectedResume} allowExtensions={['.pdf']}>
            <div className="flex justify-center items-center flex-col h-80 border rounded-md">
              <TbFileUpload size={50} color="gray" style={{ strokeWidth: '1' }} />
              <div className="text-gray-400 text-md text-center pt-2">
                <div>여기에 파일을 드래그해주세요</div>
                <div className="text-sm">최대 30MB 이하의 .pdf 파일을 업로드할 수 있습니다.</div>
                <div className="py-4 text-sm">또는</div>
              </div>
              <input type="file" ref={fileRef} style={{ display: 'none' }} accept=".pdf" onChange={onChangeResume} />
              <Button
                text="내 PC에서 찾기"
                width="w-[140px]"
                height="h-[40px]"
                borderColor="border border-MAIN1"
                textColor="text-MAIN1"
                hoverTextColor="hover:text-white"
                hoverBackgroundColor="hover:bg-MAIN1"
                style={{ fontWeight: '300', zIndex: '10' }}
                onClick={() => fileRef.current?.click()}
              />
            </div>
          </DragDropBox>
        ) : (
          <div className="w-full h-12 text-MAIN1 bg-MAIN1/10 rounded-md flex items-center justify-between px-4 hover:bg-MAIN1/20">
            {/* 뷰어 보여주기 */}
            <div className="h-full flex items-center">
              <FaRegFileAlt />
              <span>&nbsp;{selectedResume.name}</span>
            </div>
            <div className="cursor-pointer" onClick={handleDeleteResume}>
              삭제
            </div>
          </div>
        )}
        <br />
        <Input
          label="제목"
          placeholder="이력서의 제목을 입력해주세요."
          value={resumeName}
          onChange={handleResumeName}
        />
        <div className="text-end pt-4">
          <Button
            text="등록하기"
            width="w-[120px]"
            height="h-[40px]"
            backgroundColor={isPossibleRegister ? 'bg-MAIN1' : 'bg-gray-300'}
            textColor="text-white"
            hoverBackgroundColor="hover:bg-MAIN1"
            style={{ fontWeight: '300' }}
            onClick={handleRegisterResume}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ResumeAddModal;
