import { GrDocumentText } from 'react-icons/gr';
import { Dispatch, SetStateAction } from 'react';
import Modal from '../@common/Modal/Modal';
import { IInterviewQuestionItem } from '@/types/interview';

interface ICheatSheetModalProps {
  question: IInterviewQuestionItem;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CheatSheetModal = ({ question, setIsOpen }: ICheatSheetModalProps) => {
  return (
    <Modal
      width="w-80"
      contentBackgroundColor="bg-black/70"
      isBackgroundColorDark={false}
      padding="p-5"
      margin="mt-7"
      rounded="rounded-lg"
      onClose={() => setIsOpen(false)}
    >
      <div className="flex flex-col gap-3 text-sm">
        <div className="py-2">
          <p>핵심 키워드</p>
          <div className="flex flex-wrap gap-3 text-[11px] text-center pt-3">
            {question.keywordList.length ? (
              question.keywordList.map((keyword, index) => (
                <div key={index} className="rounded-xl bg-white text-black p-1 px-2">
                  <p>{keyword}</p>
                </div>
              ))
            ) : (
              <p>키워드가 존재하지 않습니다</p>
            )}
          </div>
        </div>
        <div>
          <div className="flex gap-2 items-center pb-3">
            <GrDocumentText size={13} color="#AEC5FF" />
            <p>스크립트</p>
          </div>
          <div className="h-40 overflow-y-scroll text-[11px] border p-3 rounded-xl">
            {question.script ? (
              <p>{question.script}</p>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p>스크립트가 존재하지 않습니다</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CheatSheetModal;
