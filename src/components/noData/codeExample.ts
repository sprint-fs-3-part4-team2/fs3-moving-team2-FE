export const NoDataSimpleCodeSnippet = (props: { text?: string }) => {
  const textProp = props.text ? ` text="${props.text}"` : '';
  const code = `\`\`\`tsx
<NoData${textProp} />
\`\`\``;
  return code;
};

export const NoDataFullCodeSnippet = (props: { text?: string }) => {
  const textProp = props.text ? ` text="${props.text}"` : '';
  const code = `\`\`\`tsx
import NoData from '@/components/noData/NoData';

<NoData${textProp} />
\`\`\``;
  return code;
};
