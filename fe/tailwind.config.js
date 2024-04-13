/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/Components/**/**/*.{js,ts,jsx,tsx,mdx}',
    './src/Components/**/**/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'custom-color': '#757F7B',
        'blackish-green': '#112211;',
        'box-color': '#1122110d',
        'mint-green': '#8DD3BB',
        'slamon': '#FF8682',
      },
    },
  },
  plugins: [],
}
