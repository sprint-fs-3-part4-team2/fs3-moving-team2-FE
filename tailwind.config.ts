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
      spacing: {
        260: '260px',
        24: '24px',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',

        black: {
          'opacity-64': 'var(--background-opacity-64)',
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
          200: 'var(--line-200)',
          100: 'var(--line-100)',
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
        '3xl': '1900px',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideToRight: {
          '0%': { transform: 'translateX(10%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideDownFade: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(10%)', opacity: '0' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out forwards',
        slideUp: 'slideUp 0.5s ease-out forwards',
        slideDown: 'slideDown 0.8s ease-out forwards',
        slideToRight: 'slideToRight 0.5s ease-out forwards',
        warn:'warn 0.5s',
        slideDownFade: 'slideDownFade 0.5s ease-out forwards',
      },
      boxShadow: {
        primary:
          '2px 2px 10px 0px rgba(220,220,220,0.2), -2px -2px 10px 0px rgba(220,220,220,0.2)',
      },
    },
  },
  plugins: [forms],
};
export default config;
