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
      <div className="my-3 p-3">
        <p>스크립트</p>
        <div className="border rounded-xl border-gray-300 p-3 mx-1">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque nobis, et numquam laudantium saepe voluptates
          enim repellendus, quam placeat nihil culpa necessitatibus sunt atque deleniti animi, doloribus omnis
          recusandae inventore? Fugiat quod, mollitia non ducimus natus doloremque adipisci. Nobis harum voluptate
          necessitatibus alias voluptates, voluptatum incidunt distinctio debitis dolor laborum corporis tempore
          blanditiis reprehenderit vero quidem odit explicabo dicta fuga! Soluta obcaecati provident dolorem ex
          voluptates deleniti non facilis assumenda velit ea officia ut ipsa magnam excepturi voluptatum laborum
          perferendis ipsum, sunt officiis. Ratione aperiam ipsa delectus sit quia ullam!
        </div>
      </div>
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
