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
        /** La franja de playa al pie de "Los que traen la ola". Solo ilustracion. */
        arena: "#F6E7C6",
        profundo: {
          DEFAULT: "#0E3A4A",
          claro: "#177A9C",
          medio: "#155E75",
          bruma: "#12303B",
          abismo: "#07202B",
        },
        /**
         * TINTA — la paleta para superficies claras.
         *
         * Los acentos de la marca estan calibrados para brillar sobre `noche`
         * (todos pasan 8:1 o mas). Sobre `espuma` se desploman: `manglar` da
         * 1.55, `oceano` 1.78, `bruma` 1.62. Ilegibles.
         *
         * `tinta.*` es el mismo tono con la saturacion contenida (<=0.62, para
         * que no quede neon) y bajado hasta pasar AA de texto (>=4.6:1) sobre
         * `espuma`. Se usa UNICAMENTE para texto e iconos sobre fondo claro;
         * sobre fondo oscuro se siguen usando los acentos normales.
         */
        tinta: {
          oceano: "#227893",
          manglar: "#217E46",
          turquesa: "#257A7A",
          violeta: "#6C5BD9",
          coral: "#CB306C",
          ia: "#C1462D",
          seguridad: "#356BD0",
          /** El equivalente de `bruma` en claro: texto secundario. 8:1. */
          texto: "#3E4E54",
          /** Lineas y bordes sutiles sobre espuma. */
          linea: "#C3D0CD",
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
