/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    transitionDuration: {
      DEFAULT: '0ms'
    },
    extend: {
      colors: {
        secondary: {},
      },
    },
  },
  daisyui: {
    themes: [
      "light",
      {
        night: {
          ...require("daisyui/src/theming/themes")["[data-theme=night]"],
          "--tab-bg": "#1E293B",
          "--tw-bg-opacity": "1",
          "--tab-border-color": "#6B707C",
          "--tab-border": "2px",
          "--b3": "rgba(66, 153, 225, 1)"
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};


// hsl(var(--b3) / var(--tw-bg-opacity, 1))