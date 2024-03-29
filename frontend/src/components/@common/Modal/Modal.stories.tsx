import { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';
import { GrDocumentText } from 'react-icons/gr';

const meta = {
  title: 'common/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'closed' },
  },
  decorators: [
    Story => (
      <div className="m-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    width: 'w-96',
    padding: 'p-5',
    rounded: 'rounded-lg',
    onClose: () => console.log('close'),
    children: (
      <div className="text-center">
        <p>모달 테스트입니다</p>
        <p>모달 테스트입니다</p>
        <p>모달 테스트입니다</p>
        <p>모달 테스트입니다</p>
      </div>
    ),
  },
};

export const Custom: Story = {
  args: {
    width: 'w-96',
    contentBackgroundColor: 'bg-black/70',
    isBackgroundColorDark: false,
    padding: 'p-5',
    rounded: 'rounded-lg',
    onClose: () => console.log('close'),
    children: (
      <div className="text-center">
        <p>모달 테스트입니다</p>
        <p>모달 테스트입니다</p>
        <p>모달 테스트입니다</p>
        <p>모달 테스트입니다</p>
      </div>
    ),
  },
};

export const Script: Story = {
  args: {
    width: 'w-80',
    contentBackgroundColor: 'bg-black/70',
    isBackgroundColorDark: false,
    padding: 'p-5',
    rounded: 'rounded-lg',
    onClose: () => console.log('close'),
    children: (
      <div className="flex flex-col gap-3 text-sm">
        <div className="py-2">
          <p>핵심 키워드</p>
          <div className="flex flex-wrap gap-3 text-[11px] text-center pt-3">
            <div className="rounded-xl bg-white text-black p-1 px-2">
              <p>협업능력</p>
            </div>
            <div className="rounded-xl bg-white text-black p-1 px-2">
              <p>의사소통</p>
            </div>
            <div className="rounded-xl bg-white text-black p-1 px-2">
              <p>창의적인</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-2 items-center pb-3">
            <GrDocumentText size={13} color="#AEC5FF" />
            <p>스크립트</p>
          </div>
          <div className="h-40 overflow-y-scroll text-[11px] border p-3 rounded-xl">
            <p>
              제 강점은 다양한 측면에서 나타날 수 있지만, 그 중에서도 가장 큰 강점으로는 의사 소통 및 협업 능력을 꼽을
              수 있습니다. 저는 어떤 상황에서도 적극적으로 의사소통하고 협력하여 목표를 달성하기 위해 노력하는 팀
              플레이어입니다. 이전의 경험 중에서도 팀 프로젝트나 그룹 작업에서 제 의견을 내고 다른 팀원들과 소통하며
              효과적으로 협력해온 경험이 있습니다. 예를 들어, 전 회사에서는 복잡한 프로젝트를 진행할 때 팀원들 간의
              의사소통이 매우 중요한 요소였습니다. 저는 이러한 상황에서 팀원들과의 회의나 업무 관련 이메일 등을 통해
              명확하고 정확한 정보를 공유하고자 노력했습니다. 또한, 다른 부서나 팀과의 협업이 필요한 경우 적극적으로
              소통창구를 열어 원활한 업무 진행에 기여했습니다. 뿐만 아니라, 제가 가진 창의적인 사고력을 활용하여 어려운
              문제에 대한 새로운 시각과 해결책을 제시할 수 있습니다. 이전의 프로젝트에서도 상황에 따라 기존의 관행에
              얽매이지 않고 새로운 아이디어를 제안하여 문제를 해결했습니다. 이러한 능력을 바탕으로, 제가 이 포지션에서도
              팀원들과의 원활한 소통과 협업을 통해 조직의 목표를 달성하는 데 기여할 수 있을 것이라고 확신합니다.
            </p>
          </div>
        </div>
      </div>
    ),
  },
};
