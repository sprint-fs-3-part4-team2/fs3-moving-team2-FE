import type { Config } from "tailwindcss";
import forms from '@tailwindcss/forms';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        black: {
          500: 'var(--black-500)',
          400: 'var(--black-400)',
          300: 'var(--black-300)',
          200: 'var(--black-200)',
          100: 'var(--black-100)',
        },
        grayscale: {
          500: 'var(--grayscale-500)',
          400: 'var(--grayscale-400)',
          300: 'var(--grayscale-300)',
          200: 'var(--grayscale-200)',
          50: 'var(--grayscale-50)',
        },
        primary: {
          blue: {
            400: 'var(--primary-Blue-400)',
            300: 'var(--primary-Blue-300)',
            200: 'var(--primary-Blue-200)',
            100: 'var(--primary-Blue-100)',
            50: 'var(--primary-Blue-50)',
          },
        },
        secondary: {
          yellow: {
            100: 'var(--Secondary-yellow-100)',
          },
          red: {
            200: 'var(--Secondary-Red-200)',
            100: 'var(--Secondary-Red-100)',
          },
        },
        backgroundVariants: {
          400: 'var(--background-400)',
          300: 'var(--background-300)',
          200: 'var(--background-200)',
          100: 'var(--background-100)',
        },
        line: {
          200: 'var(--Line-200)',
          100: 'var(--Line-100)',
        },

      },
      fontSize: {
        '3xl': ['32px', { lineHeight: '42px' }], // Text-3xl
        '2xl': ['24px', { lineHeight: '32px' }], // Text-2xl
        xl: ['20px', { lineHeight: '32px' }], // Text-xl
        '2lg': ['18px', { lineHeight: '26px' }], // Text-2lg
        lg: ['16px', { lineHeight: '26px' }], // Text-lg
        md: ['14px', { lineHeight: '24px' }], // Text-md
        sm: ['13px', { lineHeight: '22px' }], // Text-sm
        xs: ['12px', { lineHeight: '20px' }], // Text-xs
      },

      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },

      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },

      screens: {
        sm: '375px',
        md: '744px',
        xl: '1200px',
      },
    },
  },
  plugins: [forms],
};
export default config;
