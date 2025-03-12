import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links", 
    "@storybook/addon-interactions", 
    "./addon/register",
    {
    name: '@storybook/addon-styling',
    options: {
      postCss: true,
    },
  }, {
    "name": "@storybook/addon-essentials",
    "options": {
      "docs": false
    }
  }, "@chromatic-com/storybook", "@storybook/addon-interactions"],
  "framework": {
    "name": "@storybook/nextjs",
    "options": {}
  },
  staticDirs: ['../public']
};
export default config;
