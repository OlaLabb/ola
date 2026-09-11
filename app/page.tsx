import Caminos from "@/components/Caminos";
import Colegios from "@/components/Colegios";
import Consola from "@/components/Consola";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import OlaDivisoria from "@/components/OlaDivisoria";
import Olas from "@/components/Olas";
import QueEs from "@/components/QueEs";
import Ruta from "@/components/Ruta";
import TraeLaOla from "@/components/TraeLaOla";

/**
 * ---------------------------------------------------------------------------
 * EL ORDEN DE LA PAGINA
 * ---------------------------------------------------------------------------
 * Primero el viaje completo del estudiante, seguido y sin interrupciones:
 * el gancho, las olas, probarlo con las manos y a donde lleva. Solo despues
 * viene el tramo para colegios, y al final quienes traen la ola.
 *
 * El laboratorio subio por delante de los caminos: la pregunta "¿a donde
 * lleva esto?" solo tiene sentido despues de haber hecho algo, no antes.
 *
 * Las dos secciones sobre `espuma` (el laboratorio y colegios) son los dos
 * momentos en que la pagina pide que HAGAS algo. Cada cruce oscuro/claro se
 * cose con una ola; el trazo de su cresta se dibuja sobre la seccion de
 * arriba, asi que se invierte cuando esa es clara.
 * ---------------------------------------------------------------------------
 */

/** Los fondos reales de cada seccion, para que las divisorias no se adivinen. */
const FONDO = {
  noche: "#0A0E12",
  abismo: "#07202B",
  espuma: "#F2F7F5",
  bruma: "#12303B",
};

export default function Page() {
  return (
    <>
      {/* Salto directo al contenido para quien navega con teclado o lector de pantalla. */}
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-atardecer focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-noche"
      >
        Saltar al contenido
      </a>

      <Nav />

      <main id="contenido">
        {/* --- El viaje del estudiante ------------------------------------ */}
        <Hero />
        <QueEs />
        <Olas />

        <OlaDivisoria arriba={FONDO.abismo} abajo={FONDO.espuma} />
        {/* Aqui deja de leer y escribe su primera linea. */}
        <Consola />
        <OlaDivisoria
          arriba={FONDO.espuma}
          abajo={FONDO.abismo}
          trazo="oscuro"
        />

        <Caminos />

        {/* --- La otra orilla: los colegios ------------------------------- */}
        <OlaDivisoria arriba={FONDO.abismo} abajo={FONDO.espuma} />
        <Colegios />
        <OlaDivisoria
          arriba={FONDO.espuma}
          abajo={FONDO.noche}
          trazo="oscuro"
        />

        {/* --- Donde va la ola hoy, y quienes la traen -------------------- */}
        <Ruta />
        <OlaDivisoria arriba={FONDO.noche} abajo={FONDO.bruma} />
        <TraeLaOla />
      </main>

      <OlaDivisoria arriba={FONDO.bruma} abajo={FONDO.abismo} />
      <Footer />
    </>
  );
}
