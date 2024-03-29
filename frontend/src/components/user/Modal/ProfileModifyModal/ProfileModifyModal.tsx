import profileImage from '@/assets/images/profile.png';
import Button from '@/components/@common/Button/Button';
import Modal from '@/components/@common/Modal/Modal';
import Toast from '@/components/@common/Toast/Toast';
import { useUser } from '@/hooks/user/useUser';
import userStore from '@/stores/userStore';
import { useState } from 'react';
import ImageUploader from '../../ImageUploader/ImageUploader';

const ProfileModifyModal = ({ profileUrl, onClose }: { profileUrl: string; onClose: () => void }) => {
  const { usePostProfile } = useUser();
  const { mutate: postProfile } = usePostProfile();
  const { updateProfile } = userStore();

  const [file, setFile] = useState<File | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string>('');

  const handleModifyProfile = () => {
    if (!file) {
      Toast.error('이미지를 선택하지 않았습니다.');
      return;
    }

    const formData = new FormData();
    formData.append('profile', file);

    postProfile(formData, {
      onSuccess: () => {
        updateProfile(uploadedImage);
        onClose();
      },
    });
  };

  return (
    <Modal width="w-[300px]" onClose={onClose}>
      <div className="text-xl pb-2">프로필 변경</div>
      <div className="text-xs text-gray-500">최대 10MB 업로드 가능</div>
      <div className="w-[120px] relative flex justify-center mx-auto pt-5">
        <img
          className="w-[120px] h-[120px] mb-4 rounded-full border object-cover"
          src={uploadedImage || profileUrl || profileImage}
          alt="프로필"
        />
        <ImageUploader setFile={setFile} setUploadedImage={setUploadedImage} />
      </div>
      <div className="text-center py-3">
        <Button
          text="수정하기"
          width="w-24"
          height="h-9"
          textColor="text-white"
          backgroundColor="bg-[#5A8AF2]"
          hoverBackgroundColor="hover:bg-[#3273FF]"
          hoverTextColor="hover:text-white"
          style={{ fontWeight: '300' }}
          onClick={handleModifyProfile}
        />
      </div>
    </Modal>
  );
};

export default ProfileModifyModal;
