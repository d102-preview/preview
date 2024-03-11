import { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta = {
  title: 'common/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {
    text: '버튼1',
    width: 'w-16',
    height: 'h-8',
    textSize: 'text-xs',
    backgroundColor: 'bg-[#5A8AF2]',
    textColor: 'text-white',
    hoverBackgroundColor: 'hover:bg-[#5BA7F2]',
    borderRadius: 'rounded-lg',
  },
};

export const Sub1: Story = {
  args: {
    text: '버튼2',
    width: 'w-16',
    height: 'h-8',
    textSize: 'text-xs',
    backgroundColor: 'bg-[#F8FAFF]',
    textColor: 'text-[#5A8AF2]',
    hoverBackgroundColor: 'hover:bg-[#5BA7F2]',
    hoverTextColor: 'hover:text-white',
    borderRadius: 'rounded-lg',
  },
};

export const Sub2: Story = {
  args: {
    text: '버튼3',
    width: 'w-16',
    height: 'h-8',
    textSize: 'text-xs',
    backgroundColor: 'bg-[#F3F3F3]',
    textColor: 'text-white',
    hoverBackgroundColor: 'hover:bg-[#bebebe]',
    borderRadius: 'rounded-lg',
  },
};
