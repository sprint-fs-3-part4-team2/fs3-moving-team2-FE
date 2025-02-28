import React from 'react';
import { addons, types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import { useParameter } from '@storybook/api';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import copy from 'copy-to-clipboard';

const ADDON_ID = 'myaddon';
const PANEL_ID = `${ADDON_ID}/panel`;
const PARAM_KEY = 'codeExample';

const CustomCodeBlock = ({ language, value }) => {
  const handleCopy = () => {
    copy(value);
  };

  return (
    <div style={{ position: 'relative', padding: '20px', marginTop: '-24px' }}>
      <SyntaxHighlighter
        language={language}
        style={dracula}
      >
        {value}
      </SyntaxHighlighter>
      <button
        onClick={handleCopy}
        style={{
          position: 'absolute',
          right: '30px',
          top: '30px',
        }}
      >
        Copy
      </button>
    </div>
  );
};

const MyCodePanel: React.FC = () => {
  const value = useParameter<string | null>(PARAM_KEY, null);

  return (
    <div style={{ padding: '30px' }}>
      <ReactMarkdown
        components={{
          //@ts-ignore
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <CustomCodeBlock
                language={match[1]}
                value={String(children).replace(/\n$/, '')}
              />
            ) : (
              <code
                className={className}
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {value ?? '설명을 입력해주세요'}
      </ReactMarkdown>
    </div>
  );
};
addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Code',
    render: ({ active, key }) => (
      //@ts-ignore
      <AddonPanel
        active={active ?? false}
        key={key as any}
      >
        <MyCodePanel />
      </AddonPanel>
    ),
  });
});
