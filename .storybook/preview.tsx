import type { Preview } from "@storybook/react";
import './setting.css';
import {
  AppRouterContext,
  type AppRouterInstance
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import React from "react";

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '812px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '744px',
            height: '1000px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1920px',
            height: '1080px',
          },
        },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [(Story)=> (
    <AppRouterContext.Provider value={{
      back: () => {},
      forward: () => {},
      push: () => {},
      replace: () => {},
      refresh: () => {},
      prefetch: () => Promise.resolve(),
    } as AppRouterInstance}>
      <Story/>
    </AppRouterContext.Provider>
  )]
};

export default preview;
