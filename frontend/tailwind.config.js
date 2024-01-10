/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Color: "#0067FF",
        Yellow: "#FEB60D",
        Purple: "#9771FF",
        SkyBlue: "#01B5C5",
        HeadingColor: "#181A1E",
        TextColor: "#4E545F",
      },
      Shadow: {
        panelShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;"
      }
    },
  },
  plugins: [],
}

