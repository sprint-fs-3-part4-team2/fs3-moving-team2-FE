import type { Meta, StoryObj } from '@storybook/react';

import Area from './area';
import { useState } from 'react';

const meta = {
  title: 'Components/dropdown/Area',
  component: Area,
  argTypes: {
    className: {
      control: false,
      description: 'tailwind css',
    },
    isOpen: {
      control: 'boolean',
    },
    name: { control: 'text' },
    dispatch: {
      control: false,
      description: 'useState`의 `setState` 함수 (예: `setValue`)',
    },
  },
} satisfies Meta<typeof Area>;
export default meta;

type Story = StoryObj<typeof meta>;

function AreaWrapper({}) {
  const [value, setValue] = useState<string | object>('');
  return (
    <div>
      <Area dispatch={setValue} />
      {value && '선택된 값은: ' + value}
    </div>
  );
}

export const Default: Story = {
  render: (args) => <AreaWrapper />,
  args: {
    dispatch: () => {},
    name: '',
  },
  parameters: {
    doc: {
      source: {
        code: `
        import { DropdownCta } from './dropdown';
        import { useState } from 'react';
        
        const Example = () => {
          const [selected, setSelected] = useState(null);
          
          return <DropdownCta data={[{ name: 'Option 1' }, { name: 'Option 2' }]} dispatch={setSelected} />;
        };
        `,
        language: 'tsx', // 코드 블록의 언어 설정
      },
    },
  },
};
