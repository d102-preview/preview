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
        ShowLeft: {
          from: { opacity: 0, transform: 'translate(-50px, 0px)' },
          to: { opacity: 1, transform: 'translate(0px, 0px)' },
        },
        ShowUp: {
          from: { opacity: 0, transform: 'translate(0px, 50px)' },
          to: { opacity: 1, transform: 'translate(0px, 0px)' },
        },
        Uploading: {
          from: { width: '0%' },
          to: { width: '100%' },
        },
      },
      animation: {
        modalOpen: 'FadeIn 0.3s ease-in-out',
        modalClose: 'FadeOut 0.3s ease-in-out',
        showLeft: 'ShowLeft 0.5s ease-in-out',
        showUp: 'ShowUp 1.2s ease-in-out',
        uploading: 'Uploading 2s ease-in-out',
      },
    },
  },
  plugins: [],
};
