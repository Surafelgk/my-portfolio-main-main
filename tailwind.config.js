/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // <-- Enable dark mode via class
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        base: "18px",
        lg: "20px",
        xl: "24px",
        "2xl": "30px",
        "3xl": "36px",
        "4xl": "48px",
        "5xl": "60px",
      },
      colors: {
        black: "#24222f",
        red: "#e5372c",
        // background: "#1e1e1e",   // dark gray (not full black)
        // surface: "#2a2a2a",      // card bg
        // foreground: "#f4f4f5",   // text
        // muted: "#a1a1aa",
        accent: "#3b82f6",
      },
      keyframes: {
        bounceOnce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10%)" },
        },
        "rotate-360": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        bounceOnce: "bounceOnce 0.4s ease",
        "spin-360": "rotate-360 6s linear infinite",
      },
    },
  },
  plugins: [],
};
