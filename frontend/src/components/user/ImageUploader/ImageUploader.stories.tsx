import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import ImageUploader from './ImageUploader';

const meta = {
  title: 'user/ImageUploader',
  component: ImageUploader,
  tags: ['autodocs'],
} satisfies Meta<typeof ImageUploader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    setFile: action('setFile'),
    setUploadedImage: action('setUploadedImage'),
  },
};
