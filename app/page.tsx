import Caminos from "@/components/Caminos";
import Consola from "@/components/Consola";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import OlaDivisoria from "@/components/OlaDivisoria";
import Olas from "@/components/Olas";
import ParaQuien from "@/components/ParaQuien";
import QueEs from "@/components/QueEs";
import Ruta from "@/components/Ruta";
import Voluntarios from "@/components/Voluntarios";

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
        <Hero />
        <QueEs />
        {/* Las olas: el programa contado como marea, antes de los caminos. */}
        <Olas />
        <Caminos />
        {/* La consola: el visitante deja de leer y escribe su primera linea. */}
        <Consola />
        <ParaQuien />
        <Faq />
        {/* Donde va la ola hoy: prepara la convocatoria que viene enseguida. */}
        <Ruta />
        {/* La ola anuncia el momento importante: la convocatoria. */}
        <OlaDivisoria arriba="#0A0E12" abajo="#12303B" />
        <Voluntarios />
      </main>

      <OlaDivisoria arriba="#12303B" abajo="#07202B" />
      <Footer />
    </>
  );
}
