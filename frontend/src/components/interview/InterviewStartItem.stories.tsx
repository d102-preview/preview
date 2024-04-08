import { Meta, StoryObj } from '@storybook/react';
import InterviewStartItem from './InterviewStartItem';
import Button from '../@common/Button/Button';
import main from '@/assets/lotties/main.json';
import mock from '@/assets/lotties/mock.json';

const meta = {
  title: 'interview/StartItem',
  component: InterviewStartItem,
  tags: ['autodocs'],
} satisfies Meta<typeof InterviewStartItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MainInterview: Story = {
  args: {
    tittle: '실전 면접',
    animationOptions: {
      loop: true,
      autoplay: true,
      animationData: main,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    },
    subTitle: '내 면접 실력을 알고 싶다면?',
    advantageList: [
      '내 이력서를 기반으로 한 면접 시뮬레이션',
      '답변에 기반한 꼬리 질문 제공',
      'AI 분석을 통한 면접 성과 피드백 제공',
      '종합 리포트 및 면접 합격 가능성 제공',
    ],
    children: (
      <Button
        text="실전 면접 시작하기"
        width="w-full"
        height="h-14"
        backgroundColor="bg-MAIN1"
        hoverBackgroundColor=""
        textColor="text-white"
        textSize="text-lg"
        onClick={() => console.log('실전 면접 시작하기 클릭')}
      />
    ),
  },
};
export const MockInterview: Story = {
  args: {
    tittle: '면접 연습',
    animationOptions: {
      loop: true,
      autoplay: true,
      animationData: mock,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    },
    subTitle: '내 면접 실력을 쌓고쌓고쌓고 싶다면?',
    advantageList: [
      '실제 면접과 유사한 환경에서의 면접 연습',
      '다양한 면접 유형에 대한 연습 기회 제공',
      '내 이력서를 기반으로 한 면접 시뮬레이션',
      '종합 리포트 및 면접 합격 가능성 제공',
    ],
    children: (
      <Button
        text="면접 연습 시작하기"
        width="w-full"
        height="h-14"
        backgroundColor="bg-[#29BA78]"
        hoverBackgroundColor=""
        textColor="text-white"
        textSize="text-lg"
        onClick={() => console.log('면접 연습 시작하기 클릭')}
      />
    ),
  },
};
