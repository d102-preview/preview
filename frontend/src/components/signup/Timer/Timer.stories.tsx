import { Meta, StoryObj } from '@storybook/react';
import Timer from './Timer';

const meta = {
  title: 'signup/Timer',
  component: Timer,
  tags: ['autodocs'],
} satisfies Meta<typeof Timer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {
    minute: 3,
    second: 0,
    interval: 1,
    timeoutFunc: () => console.log('타이머 종료'),
  },
};

export const secondTimer: Story = {
  args: {
    minute: 0,
    second: 15,
  },
};

export const minuteTimer: Story = {
  args: {
    minute: 3,
  },
};

export const ThreeInterverTimer: Story = {
  args: {
    minute: 3,
    interval: 3,
  },
};
