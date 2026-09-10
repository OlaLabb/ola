"use client";

import { useRef } from "react";
import { m, useReducedMotion, type Variants } from "framer-motion";

import Estrellas from "@/components/Estrellas";
import MarVivo from "@/components/MarVivo";
import Movimiento from "@/components/Movimiento";
import { hero } from "@/content/site";

/* ---------------------------------------------------------------------------
 * HERO
 * ---------------------------------------------------------------------------
 * Esta es la UNICA animacion de entrada de la pagina: una secuencia orquestada
 * (kicker → titulo → subtitulo → CTAs → ficha) que corre una sola vez al
 * cargar. Ninguna otra seccion repite el efecto: el resto es sobrio a
 * proposito.
 * ------------------------------------------------------------------------- */

const contenedor: Variants = {
  oculto: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.12 } },
};

const item: Variants = {
  oculto: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Sin movimiento: todo aparece ya colocado, sin desplazamiento. */
const itemQuieto: Variants = {
  oculto: { opacity: 1 },
  visible: { opacity: 1 },
};

export default function Hero() {
  const seccion = useRef<HTMLElement>(null);
  const sinMovimiento = useReducedMotion();
  const variantes = sinMovimiento ? itemQuieto : item;

  // El titulo lleva un fragmento resaltado sin partir el texto editable.
  const [antes, despues] = hero.titulo.split(hero.resaltar);

  return (
    <Movimiento>
      <section
        id="inicio"
        ref={seccion}
        className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-[clamp(250px,42vh,460px)]"
      >
        <Estrellas />

        {/* Halo tenue: insinua la luz del agua antes de que aparezca el mar. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-[70vh] bg-[radial-gradient(75%_55%_at_25%_0%,rgba(90,200,235,0.12),rgba(10,14,18,0)_70%)]"
        />

        <m.div
          className="contenedor relative z-10"
          variants={contenedor}
          initial="oculto"
          animate="visible"
        >
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-8 xl:col-span-9">
              <m.p
                variants={variantes}
                className="mb-5 font-mono text-[0.72rem] text-oceano/70"
              >
                {hero.codigo}
              </m.p>

              <m.p variants={variantes} className="kicker mb-7 text-oceano">
                {hero.kicker}
              </m.p>

              <m.h1 variants={variantes} className="display text-balance">
                {antes}
                <span className="bg-gradient-to-r from-oceano to-manglar bg-clip-text text-transparent">
                  {hero.resaltar}
                </span>
                {despues}
              </m.h1>

              <m.p
                variants={variantes}
                className="lead mt-7 max-w-[46ch] text-pretty"
              >
                {hero.sub}
              </m.p>

              <m.div
                variants={variantes}
                className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
              >
                <a href={hero.ctaSecundario.href} className="boton-linea">
                  {hero.ctaSecundario.label}
                </a>
                <a href={hero.ctaPrimario.href} className="boton-accion">
                  {hero.ctaPrimario.label}
                </a>
              </m.div>
            </div>

            {/* Ficha del laboratorio: ocupa la columna derecha, que antes
                quedaba vacia, y responde de un vistazo "que, para quien". */}
            <m.dl
              variants={variantes}
              className="hidden lg:col-span-4 lg:block xl:col-span-3"
            >
              {hero.ficha.map((linea) => (
                <div
                  key={linea.campo}
                  className="border-t border-white/[0.09] py-3.5 first:border-t-0 first:pt-0"
                >
                  <dt className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-oceano/70">
                    {linea.campo}
                  </dt>
                  <dd className="mt-1 text-sm text-espuma/90">{linea.valor}</dd>
                </div>
              ))}
            </m.dl>
          </div>
        </m.div>

        {/* El mar vivo: el momento visual de la pagina. */}
        <MarVivo objetivo={seccion} />
      </section>
    </Movimiento>
  );
}
