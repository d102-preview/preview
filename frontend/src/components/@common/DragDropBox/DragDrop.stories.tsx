import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import DragDropBox from './DragDropBox';

const meta = {
  title: 'common/DragDropBox',
  component: DragDropBox,
  tags: ['autodocs'],
} satisfies Meta<typeof DragDropBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {
    setContent: action('setContent'),
    allowExtensions: ['.pdf'],
    children: <div className="w-full h-80 flex justify-center items-center">여기에 파일을 올려보세요</div>,
  },
};
