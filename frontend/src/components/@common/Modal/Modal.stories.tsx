import { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';

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
