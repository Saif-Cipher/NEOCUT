/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050B1F',
        surface: {
          DEFAULT: '#0D1B3E',
          elevated: '#122556',
          hover: '#1A3377',
          deep: '#030716',
        },
        border: {
          DEFAULT: '#26407F',
          divider: '#162A5C',
          form: '#5A7DD0',
        },
        navy: {
          bg: '#050B1F',
          surface: '#0D1B3E',
          elevated: '#122556',
          hover: '#1A3377',
          body: '#1D4ED8',
          accent: '#5CB2FF',
          edges: '#7CC8FF',
          border: '#26407F',
          divider: '#162A5C',
        },
        brand: {
          primary: '#1D4ED8',
          secondary: '#0A1533',
          accent: '#5CB2FF',
          text: '#FFFFFF',
          subtext: '#DCE6FF',
          muted: '#A9B8E0',
        },
      },
    },
  },
  plugins: [],
};
