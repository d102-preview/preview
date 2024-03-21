import { Meta, StoryObj } from '@storybook/react';
import Textarea from './Textarea';

const meta = {
  title: 'common/Textarea',
  component: Textarea,
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 'w-full',
    label: 'default',
    value: '',
    placeholder: 'placeholder',
    disabled: false,
  },
};

export const MaxLenth: Story = {
  args: {
    width: 'w-full',
    label: 'default',
    value: '',
    placeholder: 'placeholder',
    disabled: false,
    maxLength: 500,
  },
};

export const BorderNone: Story = {
  args: {
    width: 'w-full',
    label: 'boder none',
    value: '',
    placeholder: 'placeholder',
    borderType: 'none',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    width: 'w-full',
    label: 'disabled',
    value: '',
    placeholder: 'placeholder',
    disabled: true,
  },
};

export const Success: Story = {
  args: {
    width: 'w-full',
    label: 'default',
    value: '',
    placeholder: 'placeholder',
    disabled: false,
    subText: {
      text: '사용 가능합니다.',
      type: 'success',
    },
  },
};

export const Info: Story = {
  args: {
    width: 'w-full',
    label: 'default',
    value: '',
    placeholder: 'placeholder',
    disabled: false,
    subText: {
      text: '입력값에 대한 정보입니다.',
      type: 'info',
    },
  },
};

export const Error: Story = {
  args: {
    width: 'w-full',
    label: 'default',
    value: '',
    placeholder: 'placeholder',
    disabled: false,
    subText: {
      text: '올바르지 않은 입력입니다.',
      type: 'error',
    },
  },
};
