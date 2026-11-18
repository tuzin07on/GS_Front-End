/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter Variable", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Nunito Variable", "Nunito", "ui-rounded", "system-ui", "sans-serif"],
      },
      colors: {
        // Identidade visual Fila Zero: azul-marinho (confiança, serviço público)
        // + verde-limão (o "check" de atendimento garantido)
        ink: "#0E2338",
        navy: { DEFAULT: "#143F5F", dark: "#0E2F48" },
        lima: { DEFAULT: "#B5E848", soft: "#F1F9DE" },
        paper: "#F4F6F8",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(14, 35, 56, 0.08)",
      },
    },
  },
  plugins: [],
}
