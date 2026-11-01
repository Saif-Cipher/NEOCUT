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
        background: '#071F22',
        surface: {
          DEFAULT: '#103638',
          elevated: '#174448',
          hover: '#20565A',
        },
        border: {
          DEFAULT: '#315B58',
          divider: '#254845',
        },
        teal: {
          bg: '#071F22',
          surface: '#103638',
          elevated: '#174448',
          hover: '#20565A',
          body: '#195052',
          accent: '#65C6B5',
          border: '#315B58',
          divider: '#254845',
        },
        brand: {
          primary: '#195052',
          secondary: '#103638',
          accent: '#65C6B5',
          text: '#F7FCFA',
          subtext: '#D9F0EA',
          muted: '#B5CEC7',
        },
      },
    },
  },
  plugins: [],
};
