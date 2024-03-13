import { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta = {
  title: 'common/Input',
  component: Input,
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 'w-full',
    label: 'default',
    placeholder: 'placeholder',
    borderType: 'bottom',
    disabled: false,
    type: 'text',
  },
};

export const BorderAll: Story = {
  args: {
    width: 'w-full',
    label: 'border all',
    placeholder: 'placeholder',
    borderType: 'all',
    disabled: false,
    type: 'text',
  },
};

export const Success: Story = {
  args: {
    width: 'w-full',
    label: 'success',
    placeholder: 'placeholder',
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
    placeholder: 'placeholder',
    subText: {
      text: '입력값에 대한 정보입니다.',
      type: 'info',
    },
  },
};

export const Error: Story = {
  args: {
    width: 'w-full',
    label: 'error',
    placeholder: 'placeholder',
    subText: {
      text: '올바르지 않은 입력입니다.',
      type: 'error',
    },
  },
};

export const Disabled: Story = {
  args: {
    width: 'w-full',
    label: 'disabled',
    placeholder: 'placeholder',
    disabled: true,
  },
};

export const EmailType: Story = {
  args: {
    width: 'w-full',
    label: 'email type',
    placeholder: 'placeholder',
    type: 'email',
  },
};

export const PasswordType: Story = {
  args: {
    width: 'w-full',
    label: 'password type',
    placeholder: 'placeholder',
    type: 'password',
  },
};
