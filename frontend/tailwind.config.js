/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        MAIN1: '#5A8AF2',
        MAIN2: '#AEC5FF',
        MAIN3: '#9EB1DF',
        SUB: '#F8FAFF',
        BLACK: '#404040',
        GRAY: '#FAFAFA',
        UNIMPORTANT_TEXT: '#A7A7A7',
      },
      keyframes: {
        FadeIn: {
          from: { opacity: 0, transform: 'translate(-50%, -40%)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%)' },
        },
        FadeOut: {
          from: { opacity: 1, transform: 'translate(-50%, -50%)' },
          to: { opacity: 0, transform: 'translate(-50%, -40%)' },
        },
      },
      animation: {
        modalOpen: 'FadeIn 0.3s ease-in-out',
        modalClose: 'FadeOut 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
};
