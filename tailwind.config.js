/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#10221B",
        forest: "#165C43",
        leaf: "#2F8F68",
        mint: "#EAF7F0",
        cream: "#F7F8F4",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(16, 34, 27, 0.08)",
      },
    },
  },
  plugins: [],
}
