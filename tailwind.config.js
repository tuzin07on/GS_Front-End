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
      keyframes: {
        // animacoes curtas da identidade Fila Zero
        subir: { from: { opacity: "0", transform: "translateY(16px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        pagina: { from: { opacity: "0", transform: "translateX(12px)" }, to: { opacity: "1", transform: "translateX(0)" } },
        "ticket-cair": {
          "0%": { opacity: "0", transform: "translateY(-18px) rotate(-12deg)" },
          "60%": { opacity: "1", transform: "translateY(3px) rotate(4deg)" },
          "100%": { opacity: "1", transform: "translateY(0) rotate(0)" },
        },
        "check-desenhar": { from: { strokeDashoffset: "34" }, to: { strokeDashoffset: "0" } },
        brilho: { "0%": { opacity: "0", transform: "scale(0)" }, "70%": { opacity: "1", transform: "scale(1.25)" }, "100%": { opacity: "1", transform: "scale(1)" } },
        esqueleto: { "0%": { backgroundPosition: "-320px 0" }, "100%": { backgroundPosition: "320px 0" } },
      },
      animation: {
        subir: "subir .5s ease-out both",
        pagina: "pagina .35s ease-out both",
        "ticket-cair": "ticket-cair .7s cubic-bezier(.2,.9,.3,1.2) both",
        "check-desenhar": "check-desenhar .5s .55s ease-out both",
        brilho: "brilho .35s 1s ease-out both",
        esqueleto: "esqueleto 1.3s linear infinite",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(14, 35, 56, 0.08)",
      },
    },
  },
  plugins: [],
}
