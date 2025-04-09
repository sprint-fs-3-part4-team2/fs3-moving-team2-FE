import type { Meta, StoryObj } from '@storybook/react';
import NoData from './NoData';
import { NoDataSimpleCodeSnippet, NoDataFullCodeSnippet } from './codeExample';

const meta: Meta<typeof NoData> = {
  title: 'Components/NoData',
  component: NoData,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      // description: '',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '없음' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
소개합니다!      
\`\`\`NoData\`\`\`는 데이터가 없을 때, '텅 빈 이삿짐 트럭 이미지'를 표시하는 컴포넌트입니다.  
마우스 hover 시 이미지가 변경됩니다.  
이미지 경로와 사이즈는 프로젝트에 맞게 반응형으로 작업된 후 고정되어 있습니다.  
\`\`\`text props\`\`\`로 텍스트를 추가할 수 있습니다. 

\`\`\`
import NoData from '@/components/NoData/NoData';
\`\`\`
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof NoData>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: NoDataSimpleCodeSnippet({}),
      },
    },
    // interactions: { disable: true },
    codeExample: NoDataFullCodeSnippet({}),
    actions: { disable: true },
  },
};

export const CustomText: Story = {
  args: {
    text: '작성 가능한 리뷰가 없어요',
  },
  parameters: {
    docs: {
      description: {
        story: NoDataSimpleCodeSnippet({ text: '작성 가능한 리뷰가 없어요' }),
      },
    },
    // interactions: { disable: true },
    codeExample: NoDataFullCodeSnippet({ text: '작성 가능한 리뷰가 없어요' }),
    actions: { disable: true },
  },
};
