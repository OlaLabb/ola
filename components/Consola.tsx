"use client";

import { useState, type FormEvent } from "react";

import EncabezadoSeccion from "@/components/EncabezadoSeccion";
import { consola } from "@/content/site";

/**
 * LA CONSOLA
 * La unica pieza de la pagina donde el visitante toca en vez de leer: escribe
 * su nombre, ejecuta y ve su nombre salir de un programa. Es un <form>, asi que
 * Enter funciona igual que el boton, sin escuchar teclas a mano.
 */
export default function Consola() {
  const [nombre, setNombre] = useState("");
  const [salida, setSalida] = useState("");

  function ejecutar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const limpio = nombre.trim() || consola.nombrePorDefecto;
    setSalida(consola.salida.replace("{nombre}", limpio));
  }

  return (
    <section
      id={consola.id}
      className="relative bg-profundo-bruma py-20 sm:py-28"
    >
      <div className="contenedor relative">
        <EncabezadoSeccion
          numero="05"
          kicker={consola.kicker}
          color="#78DCA0"
          titulo={consola.titulo}
          sub={consola.sub}
        />

        <div className="mt-12 grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-9 lg:col-start-4">
            <form
              onSubmit={ejecutar}
              className="overflow-hidden rounded-3xl border border-white/[0.08] bg-noche/80"
            >
              {/* Barra de la terminal: tres puntos y el nombre de la sesion. */}
              <div className="flex items-center gap-2 border-b border-white/[0.07] px-5 py-3">
                <span aria-hidden="true" className="flex gap-1.5">
                  <span className="block h-2.5 w-2.5 rounded-full bg-coral/70" />
                  <span className="block h-2.5 w-2.5 rounded-full bg-atardecer/70" />
                  <span className="block h-2.5 w-2.5 rounded-full bg-manglar/70" />
                </span>
                <span className="ml-2 font-mono text-[0.7rem] text-bruma/70">
                  {consola.etiqueta}
                </span>
              </div>

              <div className="p-5 sm:p-8">
                {/* La linea de codigo. El input es parte del propio codigo. */}
                <p className="flex flex-wrap items-center gap-x-1 font-mono text-base sm:text-lg">
                  <span className="text-oceano">{consola.funcion}</span>
                  <span className="text-bruma">(&quot;</span>
                  <label htmlFor="consola-nombre" className="sr-only">
                    {consola.placeholder}
                  </label>
                  <input
                    id="consola-nombre"
                    name="nombre"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder={consola.placeholder}
                    maxLength={24}
                    autoComplete="given-name"
                    className="w-[9ch] min-w-0 flex-1 border-b border-dashed border-manglar/50 bg-transparent px-1 py-0.5 font-mono text-manglar caret-manglar outline-none placeholder:text-bruma/40 focus:border-manglar sm:w-auto sm:max-w-[18ch] sm:flex-none"
                  />
                  <span className="text-bruma">&quot;)</span>
                </p>

                <button type="submit" className="boton-accion mt-7">
                  {consola.boton}
                </button>

                {/* La salida del programa: aparece donde aparecería en una
                    terminal de verdad, y se anuncia a los lectores de pantalla. */}
                <p
                  aria-live="polite"
                  className="mt-7 min-h-[3.5rem] border-t border-white/[0.07] pt-6 font-mono text-sm leading-relaxed text-manglar sm:text-base"
                >
                  {salida ? (
                    <>
                      <span aria-hidden="true" className="text-manglar/50">
                        &gt;{" "}
                      </span>
                      {salida}
                    </>
                  ) : (
                    // El cursor en espera: la terminal se ve viva antes de
                    // ejecutar, y el alto ya esta reservado (no hay salto).
                    <span aria-hidden="true" className="text-bruma/30">
                      &gt; _
                    </span>
                  )}
                </p>
              </div>
            </form>

            <p className="mt-6 text-pretty text-sm text-bruma">
              <a
                href={consola.pieHref}
                className="font-semibold text-oceano underline decoration-oceano/40 underline-offset-4 transition-colors hover:decoration-oceano"
              >
                {consola.pie}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
