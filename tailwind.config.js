module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Opensans: "'Open Sans', sans-serif",
      },
      boxShadow: {
        '3Min': '0px 0px 3px 0px rgba(0,0,0,0.1);',
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
