/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        jet: "hsl(0, 0%, 22%)",
        onyx: "hsl(240, %1, 17%)",
        "eerie-black": {
          1: "hsl(240, 2%, 13%)",
          2: "hsl(240, 2%, 12%)",
        },
        "smoky-black": "hsl(0, 0%, 7%)",
        "orange-yellow-crayola": "#FFDB70",
        "vegas-gold": "hsl(45, 54%, 58%)",
        "bittersweet-shimmer": "hsl(0, 43%, 51%)",
      }
    },
  },
  plugins: [],
};

