"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";

import EncabezadoSeccion from "@/components/EncabezadoSeccion";
import Movimiento from "@/components/Movimiento";
import { caminos } from "@/content/site";

/* ---------------------------------------------------------------------------
 * LOS CAMINOS DE LA TECNOLOGIA
 * ---------------------------------------------------------------------------
 * Patron ARIA de tabs con activacion automatica:
 *   - flechas ← → mueven el foco y cambian el camino,
 *   - Inicio / Fin saltan al primero y al ultimo,
 *   - solo el chip activo es tabulable (roving tabindex).
 * El primer camino viene seleccionado desde el servidor, asi que el panel
 * nunca se renderiza vacio.
 * ------------------------------------------------------------------------- */

export default function Caminos() {
  const [activo, setActivo] = useState(0);
  const chips = useRef<Array<HTMLButtonElement | null>>([]);
  const sinMovimiento = useReducedMotion();

  const camino = caminos.items[activo];

  function mover(destino: number) {
    const i = (destino + caminos.items.length) % caminos.items.length;
    setActivo(i);
    chips.current[i]?.focus();
  }

  function alTeclado(e: KeyboardEvent<HTMLDivElement>) {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        mover(activo + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        mover(activo - 1);
        break;
      case "Home":
        e.preventDefault();
        mover(0);
        break;
      case "End":
        e.preventDefault();
        mover(caminos.items.length - 1);
        break;
      default:
        break;
    }
  }

  return (
    <Movimiento>
      <section
        id={caminos.id}
        className="relative bg-profundo-abismo py-20 sm:py-28"
      >
        <div className="contenedor">
          <EncabezadoSeccion
            numero="04"
            kicker="los caminos"
            color="#7FD8D8"
            titulo={caminos.titulo}
            sub={caminos.sub}
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Chips: un camino por chip. En escritorio quedan en columna,
                como el indice de un menu; en movil, apilados. */}
            <div
              role="tablist"
              aria-label="Caminos de la tecnología"
              onKeyDown={alTeclado}
              className="flex flex-col gap-2 lg:col-span-4"
            >
              {caminos.items.map((c, i) => {
                const seleccionado = i === activo;
                return (
                  <button
                    key={c.id}
                    ref={(el) => {
                      chips.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`chip-${c.id}`}
                    aria-selected={seleccionado}
                    aria-controls={`panel-${c.id}`}
                    tabIndex={seleccionado ? 0 : -1}
                    onClick={() => setActivo(i)}
                    style={
                      seleccionado
                        ? {
                            backgroundColor: `${c.color}1A`,
                            borderColor: `${c.color}80`,
                            color: c.color,
                            boxShadow: `inset 3px 0 0 0 ${c.color}`,
                          }
                        : undefined
                    }
                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-semibold
                      transition-[background-color,border-color,color,transform] duration-200
                      motion-safe:hover:translate-x-0.5 ${
                        seleccionado
                          ? ""
                          : "border-white/[0.08] bg-white/[0.02] text-bruma hover:border-white/20 hover:text-espuma"
                      }`}
                  >
                    <span aria-hidden="true" className="text-base">
                      {c.emoji}
                    </span>
                    {c.nombre}
                  </button>
                );
              })}
            </div>

            {/* Panel: cambia con una transicion suave y sin saltos de altura. */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={camino.id}
                  role="tabpanel"
                  id={`panel-${camino.id}`}
                  aria-labelledby={`chip-${camino.id}`}
                  tabIndex={0}
                  initial={
                    sinMovimiento ? { opacity: 0 } : { opacity: 0, y: 14 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={sinMovimiento ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{
                    duration: sinMovimiento ? 0.12 : 0.34,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7 sm:p-10"
                >
                  {/* El color del camino baña el panel: es la única pieza de la
                      pagina donde el color manda sobre el texto. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: `radial-gradient(85% 90% at 0% 0%, ${camino.color}1F, transparent 62%)`,
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px"
                    style={{
                      background: `linear-gradient(90deg, ${camino.color}, transparent 70%)`,
                    }}
                  />

                  <div className="relative">
                    <p
                      aria-hidden="true"
                      className="text-4xl sm:text-5xl"
                      style={{ filter: "saturate(1.05)" }}
                    >
                      {camino.emoji}
                    </p>

                    <p
                      className="cita mt-6 max-w-[26ch] text-pretty"
                      style={{ color: camino.color }}
                    >
                      {camino.frase}
                    </p>

                    <div className="mt-8 border-t border-white/[0.08] pt-6">
                      <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-bruma/80">
                        Un día típico
                      </p>
                      <p className="cuerpo mt-3 max-w-[54ch] text-pretty text-espuma/90">
                        {camino.diaTipico}
                      </p>
                    </div>
                  </div>
                </m.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </Movimiento>
  );
}
