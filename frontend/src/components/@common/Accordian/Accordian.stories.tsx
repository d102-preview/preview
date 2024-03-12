import { Meta, StoryObj } from '@storybook/react';
import Accordian from './Accordian';
import { MdOutlineExpandMore, MdOutlineExpandLess } from 'react-icons/md';

const meta = {
  title: 'Accordian',
  component: Accordian,
  tags: ['autodocs'],
  argTypes: {
    onToggle: { action: 'accordian-toggled' },
  },
} satisfies Meta<typeof Accordian>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ResumeOpen: Story = {
  args: {
    titleContent: 'Resume Open Accordian',
    children: (
      <>
        <p>이력서1</p>
        <p>이력서2</p>
        <p>이력서3</p>
      </>
    ),
    isOpen: true,
    iconOpen: MdOutlineExpandLess,
    iconClose: MdOutlineExpandMore,
    iconOpenColor: '#5A8AF2',
    iconCloseColor: '#5A8AF2',
    backgroundColor: 'bg-[#F1F5FF]',
    textColor: 'text-[#5A8AF2]',
    textWeight: 'font-bold',
  },
};

export const ResumeClose: Story = {
  args: {
    titleContent: 'Resume Close Accordian',
    children: 'Close',
    isOpen: false,
    iconOpen: MdOutlineExpandLess,
    iconClose: MdOutlineExpandMore,
    iconOpenColor: '#5A8AF2',
    iconCloseColor: '#5A8AF2',
    backgroundColor: 'bg-[#F1F5FF]',
    textColor: 'text-[#5A8AF2]',
    textWeight: 'font-bold',
  },
};

export const QestionOpen: Story = {
  args: {
    titleContent: 'Qestion Open Accordian',
    children: (
      <>
        Open
        <br />
        Open
        <br />
        Open
        <br />
        Open
        <br />
        Open
      </>
    ),
    isOpen: true,
  },
};

export const QestionClose: Story = {
  args: {
    titleContent: 'Qestion Close Accordian',
    children: 'Close',
    isOpen: false,
  },
};
