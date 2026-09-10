import { ImageResponse } from "next/og";

import { hero, seo } from "@/content/site";

/**
 * ---------------------------------------------------------------------------
 * IMAGEN PARA COMPARTIR EN REDES (1200x630)
 * ---------------------------------------------------------------------------
 * Esto es un PROVISIONAL generado por codigo: sirve para que nunca haya un 404
 * de og-image ni un PNG pesado en el repo mientras no exista la imagen de
 * verdad.
 *
 * PARA PONER LA IMAGEN DEFINITIVA:
 *   1. Guardala como  app/opengraph-image.png   (1200x630, idealmente < 300 KB)
 *   2. Borra ESTE archivo: no pueden convivir el .tsx y el .png
 *   3. Crea  app/opengraph-image.alt.txt  con el texto alternativo
 *   4. En content/site.ts, cambia OG_IMAGE a "/opengraph-image.png"
 *      (lo usa el JSON-LD, que no se entera solo)
 *
 * Next detecta el archivo por convencion y rellena og:image, su tipo, sus
 * dimensiones y el alt. El objeto `metadata` NO puede sobrescribir esto: el
 * archivo tiene prioridad.
 * ------------------------------------------------------------------------- */
export const alt = seo.imagenAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#0A0E12",
        padding: "70px 80px 0",
        position: "relative",
      }}
    >
      {/* Mar: dos arcos superpuestos, el eco estatico de las olas del sitio. */}
      <div
        style={{
          position: "absolute",
          left: -120,
          bottom: -40,
          width: 1440,
          height: 210,
          display: "flex",
          borderRadius: "50% 50% 0 0",
          background: "linear-gradient(180deg, #177A9C 0%, #155E75 100%)",
          opacity: 0.45,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -60,
          bottom: -70,
          width: 1380,
          height: 200,
          display: "flex",
          borderRadius: "50% 50% 0 0",
          background: "linear-gradient(180deg, #155E75 0%, #0E3A4A 100%)",
        }}
      />

      <div style={{ display: "flex", fontSize: 50, letterSpacing: -1 }}>
        <span style={{ color: "#F2F7F5", fontWeight: 700 }}>ola</span>
        <span style={{ color: "#5AC8EB", fontWeight: 700, marginLeft: 12 }}>
          lab
        </span>
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 44,
          fontSize: 66,
          lineHeight: 1.14,
          color: "#F2F7F5",
          fontWeight: 700,
          letterSpacing: -2,
          maxWidth: 900,
        }}
      >
        {hero.titulo}
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 26,
          fontSize: 28,
          color: "#B9C6C4",
          maxWidth: 820,
        }}
      >
        Tecnología, IA e innovación para los colegios del Pacífico colombiano.
      </div>

      <div
        style={{
          position: "absolute",
          left: 80,
          bottom: 44,
          display: "flex",
          fontSize: 24,
          color: "#CDE7EC",
        }}
      >
        by gimti &lt;/&gt;
      </div>
    </div>,
    size,
  );
}
