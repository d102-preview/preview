import profileImage from '@/assets/images/profile.png';
import Button from '@/components/@common/Button/Button';
import Modal from '@/components/@common/Modal/Modal';
import { PiNotePencil } from 'react-icons/pi';

const ProfileModifyModal = ({ profileUrl, onClose }: { profileUrl: string; onClose: () => void }) => {
  // @TODO: 프로필 사진 수정 API
  const handleModifyProfile = () => {};

  return (
    <Modal width="w-[300px]" onClose={onClose}>
      <div className="w-[120px] relative flex justify-center mx-auto pt-5">
        <img className="w-[120px] mb-4 rounded-full border" src={profileUrl || profileImage} alt="프로필" />
        <button className="w-8 h-8 absolute bottom-2 right-2 rounded-full bg-gray-200 flex justify-center items-center cursor-pointer">
          <PiNotePencil color="white" size={20} />
        </button>
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
          onClick={() => handleModifyProfile}
        />
      </div>
    </Modal>
  );
};

export default ProfileModifyModal;
