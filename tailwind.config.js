/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        mainColor: "#32da51",
        subColor: "#1a6a5c",
        darkMode1: "#2c2c2c",
        darkModeLight: "#474747",
        greenLight: "#1b6b5d",
        lightBack: "#f3f3f3",
        chatColor: "#d9fdd3",
        msgColor: "#1daa61",
      },
      backgroundImage: {
        chatImage: "url(assets/pattern.jpeg)",
      },
    },
  },
  plugins: [],
};
