import type { Config } from "tailwindcss";

/**
 * Paleta OLA LAB.
 * - `noche`  : base "noche de oceano" (nunca negro puro).
 * - `espuma` : texto principal / `bruma`: texto secundario.
 * - `oceano` / `manglar` : colores de apoyo.
 * - `atardecer` : RESERVADO para CTAs y momentos de accion.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        noche: "#0A0E12",
        espuma: "#F2F7F5",
        bruma: "#B9C6C4",
        oceano: "#5AC8EB",
        manglar: "#78DCA0",
        atardecer: "#FFB25E",
        coral: "#F2A0C0",
        violeta: "#9B8CFF",
        turquesa: "#7FD8D8",
        profundo: {
          DEFAULT: "#0E3A4A",
          claro: "#177A9C",
          medio: "#155E75",
          bruma: "#12303B",
          abismo: "#07202B",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        contenido: "72rem",
      },
      keyframes: {
        // Balanceo vertical suave: da sensacion de marea.
        marea: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-10px,0)" },
        },
        // Latido casi imperceptible de la luz sobre el agua. Nunca baja mucho:
        // es un respiro, no un atenuador.
        brillo: {
          "0%, 100%": { opacity: "0.82" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        marea: "marea 9s ease-in-out infinite",
        brillo: "brillo 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
