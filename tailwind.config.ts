import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',

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
          100: 'var(--grayscale-100)',
          50: 'var(--grayscale-50)',
        },
        primary: {
          blue: {
            400: 'var(--primary-blue-400)',
            300: 'var(--primary-blue-300)',
            200: 'var(--primary-blue-200)',
            100: 'var(--primary-blue-100)',
            50: 'var(--primary-blue-50)',
            10: 'var(--primary-blue-10)',
          },
        },
        secondary: {
          yellow: {
            100: 'var(--secondary-yellow-100)',
          },
          red: {
            200: 'var(--secondary-red-200)',
            100: 'var(--secondary-red-100)',
          },
        },
        backgroundVariants: {
          400: 'var(--background-400)',
          300: 'var(--background-300)',
          200: 'var(--background-200)',
          100: 'var(--background-100)',
          50: 'var(--background-50)',
        },
        line: {
          200: 'var(--Line-200)',
          100: 'var(--Line-100)',
        },
      },
      fontSize: {
        '3xl': ['32px', { lineHeight: '42px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        xl: ['20px', { lineHeight: '32px' }],
        '2lg': ['18px', { lineHeight: '26px' }],
        lg: ['16px', { lineHeight: '26px' }],
        md: ['14px', { lineHeight: '24px' }],
        sm: ['13px', { lineHeight: '22px' }],
        xs: ['12px', { lineHeight: '20px' }],
      },

      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },

      fontFamily: {
        pretendard: ['pretendard', 'sans-serif'],
      },

      screens: {
        sm: '375px',
        md: '744px',
        xl: '1200px',
        xxl: '1440px',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },

      animation: {
        fadeIn: 'fadeIn 2.5s ease-in-out forwards',
      },
    },
  },
  plugins: [forms],
};
export default config;
