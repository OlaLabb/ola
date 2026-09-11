"use client";

import { useEffect, useRef, useState } from "react";

import { Wordmark } from "@/components/Wordmark";
import { nav } from "@/content/site";

/* ---------------------------------------------------------------------------
 * NAV
 * ---------------------------------------------------------------------------
 * Fija arriba, con el mismo fondo translucido de siempre para que el mar del
 * hero se vea por debajo. En escritorio, anclas + el CTA separado por una
 * linea; en movil, un cajon que entra por la derecha.
 *
 * El enlace activo se decide con un IntersectionObserver que solo mira una
 * franja alta del viewport: la seccion que cruza esa franja es la que manda,
 * asi el resaltado no parpadea entre dos secciones vecinas.
 * ------------------------------------------------------------------------- */

/** Tres olitas apiladas: la hamburguesa, pero de esta marca. */
function IconoOlas() {
  return (
    <svg
      viewBox="0 0 24 18"
      aria-hidden="true"
      focusable="false"
      className="h-[18px] w-6"
    >
      {[3, 9, 15].map((y) => (
        <path
          key={y}
          d={`M2 ${y} q3 -2.6 6 0 t6 0 t6 0`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

function IconoCerrar() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className="h-5 w-5"
    >
      <path
        d="M5 5 L19 19 M19 5 L5 19"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** La olita que subraya el enlace activo. */
function Subrayado() {
  return (
    <svg
      viewBox="0 0 40 6"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
      className="absolute inset-x-3 bottom-0.5 h-1.5 text-oceano"
    >
      <path
        d="M0 4 q5 -3.2 10 0 t10 0 t10 0 t10 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Nav() {
  const [abierto, setAbierto] = useState(false);
  const [activo, setActivo] = useState("");
  const hamburguesa = useRef<HTMLButtonElement | null>(null);
  const cerrarBoton = useRef<HTMLButtonElement | null>(null);

  // Que seccion esta a la vista. La franja alta (entre el 22% y el 45% del
  // viewport) evita que dos secciones se disputen el resaltado.
  useEffect(() => {
    const secciones = nav.enlaces
      .map((e) => document.getElementById(e.href.slice(1)))
      .filter((s): s is HTMLElement => s !== null);

    if (!secciones.length) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        const visibles = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibles.length) setActivo(`#${visibles[0].target.id}`);
      },
      { rootMargin: "-22% 0px -55% 0px" },
    );

    secciones.forEach((s) => observador.observe(s));
    return () => observador.disconnect();
  }, []);

  // Con el cajon abierto: Escape lo cierra y el fondo no se mueve.
  useEffect(() => {
    if (!abierto) return;

    function alTeclado(e: KeyboardEvent) {
      if (e.key === "Escape") setAbierto(false);
    }

    document.addEventListener("keydown", alTeclado);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", alTeclado);
      document.body.style.overflow = "";
    };
  }, [abierto]);

  // El foco sigue al menu cuando abre y vuelve a la hamburguesa cuando cierra.
  // En la primera carga no toca nada: la pagina no arranca con foco puesto.
  const primeraVez = useRef(true);
  useEffect(() => {
    if (primeraVez.current) {
      primeraVez.current = false;
      return;
    }
    if (abierto) cerrarBoton.current?.focus();
    else hamburguesa.current?.focus({ preventScroll: true });
  }, [abierto]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-noche/80 backdrop-blur-md">
        <nav
          aria-label="Principal"
          className="contenedor flex h-16 items-center justify-between gap-4"
        >
          <a href="#inicio" className="shrink-0" aria-label="ola lab — inicio">
            <Wordmark />
          </a>

          {/* Anclas en escritorio. */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {nav.enlaces.map((enlace) => {
              const esActivo = activo === enlace.href;
              return (
                <li key={enlace.href}>
                  <a
                    href={enlace.href}
                    aria-current={esActivo ? "true" : undefined}
                    className={`relative block px-3 py-2 text-sm font-semibold transition-colors ${
                      esActivo ? "text-oceano" : "text-espuma hover:text-oceano"
                    }`}
                  >
                    {enlace.label}
                    {esActivo && <Subrayado />}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-3">
            {/* La linea separa las anclas del CTA: el coral no compite con ellas. */}
            <span
              aria-hidden="true"
              className="hidden h-6 w-px bg-white/[0.12] lg:block"
            />

            <a
              href={nav.ctaHref}
              className="boton-accion px-4 py-2 text-xs sm:px-5 sm:text-sm"
            >
              {nav.cta}
            </a>

            <button
              ref={hamburguesa}
              type="button"
              onClick={() => setAbierto(true)}
              aria-label={nav.abrirMenu}
              aria-expanded={abierto}
              aria-controls="menu-movil"
              className="-mr-1 rounded-full p-2 text-espuma transition-colors hover:text-oceano lg:hidden"
            >
              <IconoOlas />
            </button>
          </div>
        </nav>
      </header>

      {/* Cajon movil: fuera del header a proposito. El `backdrop-blur` del
          header crearia bloque contenedor y el `fixed` de aqui dentro se
          mediria contra la barra, no contra la pantalla. Va por debajo del
          salto al contenido (z-60) y por encima de todo lo demas. */}
      {abierto && (
        <div className="fixed inset-0 z-[55] lg:hidden">
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => setAbierto(false)}
            className="nav-fondo absolute inset-0 w-full cursor-default bg-noche/80 backdrop-blur-sm"
          />

          <div
            id="menu-movil"
            className="nav-panel absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col border-l border-white/[0.08] bg-noche"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/[0.07] px-5">
              <Wordmark />
              <button
                ref={cerrarBoton}
                type="button"
                onClick={() => setAbierto(false)}
                aria-label={nav.cerrarMenu}
                className="-mr-2 rounded-full p-2 text-espuma transition-colors hover:text-oceano"
              >
                <IconoCerrar />
              </button>
            </div>

            <ul className="min-h-0 flex-1 overflow-y-auto px-5 py-6">
              {nav.enlaces.map((enlace) => {
                const esActivo = activo === enlace.href;
                return (
                  <li key={enlace.href}>
                    <a
                      href={enlace.href}
                      onClick={() => setAbierto(false)}
                      aria-current={esActivo ? "true" : undefined}
                      className={`flex items-center gap-3 py-3.5 text-2xl font-semibold transition-colors ${
                        esActivo ? "text-oceano" : "text-espuma"
                      }`}
                    >
                      {esActivo && (
                        <span aria-hidden="true" className="text-oceano">
                          ~
                        </span>
                      )}
                      {enlace.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="shrink-0 border-t border-white/[0.07] p-5">
              <a
                href={nav.ctaHref}
                onClick={() => setAbierto(false)}
                className="boton-accion w-full"
              >
                {nav.cta}
              </a>

              {/* Una ola al pie: el cajon tambien es mar. */}
              <svg
                viewBox="0 0 120 16"
                aria-hidden="true"
                focusable="false"
                preserveAspectRatio="none"
                className="mt-6 h-4 w-full text-oceano/30"
              >
                <path
                  d="M0 10 q15 -8 30 0 t30 0 t30 0 t30 0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
