import Button from '@/components/@common/Button/Button';
import Input from '@/components/@common/Input/Input';
import Modal from '@/components/@common/Modal/Modal';

const ResumeAddModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal width="w-[500px]" onClose={onClose}>
      <div className="p-4">
        <div className="text-md">제목</div>
        <Input placeholder="이력서의 제목을 입력해주세요." />
        <br />
        <div className="border flex justify-center items-center flex-col h-60">
          <div className="py-4 text-gray-400">첨부파일을 등록해주세요</div>
          <Button
            text="내 PC에서 찾기"
            width="w-[140px]"
            height="h-[40px]"
            backgroundColor="bg-MAIN1"
            textColor="text-white"
            hoverBackgroundColor="hover:bg-[#3273FF]"
            style={{ fontWeight: '300' }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ResumeAddModal;
