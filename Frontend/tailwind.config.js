/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "scale-pulse": "scalepulse 2s infinite",
        "liner-pulse": "linerPulse 1s infinite",
      },
      keyframes: {
        scalepulse: {
          "0% , 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
        linerPulse: {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-10px)" }, // Moves left by 10px
          "100%": { transform: "translateX(0)" },
        },
      },
      colors: {
        'first-color': 'var(--first-color)', 
        'text-color': 'var(--text-color)',
      },
      fontSize: {
        'big': 'var(--big-font-size)',
        'normal': 'var(--normal-font-size)',
      },
    },
  },
  plugins: [],
};
