import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import HeaderLink from './HeaderLink';

const meta = {
  title: 'common/HeaderLink',
  component: HeaderLink,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof HeaderLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'default Link',
    link: '/default',
    isClicked: false,
  },
};

export const Clicked: Story = {
  args: {
    label: 'clicked Link',
    link: '/clicked',
    isClicked: true,
  },
};
