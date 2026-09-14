"use client";

import { useState } from "react";

import {
  losQueTraenLaOla as seccion,
  mailto,
  olas,
  traeLaOla,
} from "@/content/site";
import { voluntarios, type IdOla, type Voluntario } from "@/content/voluntarios";

/* ---------------------------------------------------------------------------
 * DIRECTORIO DE VOLUNTARIOS
 * ---------------------------------------------------------------------------
 * La unica parte de "Los que traen la ola" que necesita JavaScript: los
 * filtros. Todos los carnets se renderizan siempre y los que no son de la ola
 * elegida van con `hidden`, asi los nombres viajan en el HTML aunque el filtro
 * nunca se toque.
 *
 * Ojo con el revelado: `data-revelar` le agrega la clase `revelado` al <li>
 * desde fuera de React. Por eso el `className` de los carnets es fijo y el
 * filtro solo cambia `hidden`: si React reescribiera la clase, se llevaria
 * `revelado` por delante y el carnet quedaria invisible.
 *
 * Color: el crudo de la ola va en bordes, puntos y rellenos tenues; el texto
 * siempre en su tinta. Los rellenos con texto encima no pasan de 8% (`14` en
 * hex): con mas, la tinta baja de 4.5:1 en letra pequena.
 * ------------------------------------------------------------------------- */

/** Nombre corto y color de cada ola, leidos de la seccion "Las olas". */
const OLA = Object.fromEntries(
  olas.items.map((o) => [
    o.id,
    {
      corto: o.nombre.replace(/^La Ola de /, ""),
      color: o.color,
      tinta: seccion.tintaOla[o.id as IdOla],
    },
  ]),
) as Record<IdOla, { corto: string; color: string; tinta: string }>;

/** Una ola aparece en los filtros si alguien la trae, principal o extra. */
const OLAS_CON_GENTE = (olas.items.map((o) => o.id) as IdOla[]).filter((id) =>
  voluntarios.some((v) => v.olaPrincipal === id || v.olasExtra.includes(id)),
);

function traeLa(v: Voluntario, filtro: IdOla | null) {
  return (
    filtro === null || v.olaPrincipal === filtro || v.olasExtra.includes(filtro)
  );
}

function Filtro({
  activo,
  alPulsar,
  color,
  tinta,
  children,
}: {
  activo: boolean;
  alPulsar: () => void;
  /** Sin color es la pill de "todas". */
  color?: string;
  tinta: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={activo}
      onClick={alPulsar}
      className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors"
      style={
        activo
          ? { background: tinta, borderColor: tinta, color: "#FFFFFF" }
          : { background: "#FFFFFF", borderColor: tinta, color: tinta }
      }
    >
      {color && (
        <span
          aria-hidden="true"
          className="h-2 w-2 rounded-full"
          style={{ background: activo ? "#FFFFFF" : color }}
        />
      )}
      {children}
    </button>
  );
}

function Carnet({ v }: { v: Voluntario }) {
  const principal = OLA[v.olaPrincipal];

  return (
    <div className="flex h-full flex-col rounded-2xl border border-tinta-linea bg-white p-6">
      <div className="flex items-center gap-4">
        {/* Iniciales en grande (>=18px semibold): con 3:1 basta, y dan 4.2+. */}
        <div
          className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 text-lg font-semibold"
          style={{
            borderColor: principal.color,
            background: `${principal.color}29`,
            color: principal.tinta,
          }}
        >
          {v.foto ? (
            // El nombre ya esta al lado: la foto es decorativa.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={v.foto}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <span aria-hidden="true">{v.iniciales}</span>
          )}
        </div>

        <div className="min-w-0">
          <h3 className="text-pretty text-base font-semibold leading-snug text-noche">
            {v.nombre}
          </h3>
          <p className="mt-0.5 text-xs text-tinta-texto">
            {seccion.carnet.rol[v.genero]}{" "}
            <span className="font-mono">
              #{String(v.numero).padStart(2, "0")}
            </span>
          </p>
        </div>
      </div>

      <p className="mt-5 flex flex-wrap items-center gap-2">
        <span className="sr-only">{seccion.carnet.olaPrincipal}</span>
        <span
          className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold"
          style={{
            borderColor: principal.color,
            background: `${principal.color}14`,
            color: principal.tinta,
          }}
        >
          {principal.corto}
        </span>

        {v.olasExtra.length > 0 && (
          <span className="sr-only">{seccion.carnet.olasExtra}</span>
        )}
        {v.olasExtra.map((id) => (
          <span
            key={id}
            className="inline-flex items-center rounded-full border bg-white px-2.5 py-0.5 text-[0.7rem] font-semibold"
            style={{ borderColor: OLA[id].color, color: OLA[id].tinta }}
          >
            <span aria-hidden="true">+&nbsp;</span>
            {OLA[id].corto}
          </span>
        ))}
      </p>

      <p className="mt-4 text-pretty text-sm leading-relaxed text-tinta-texto">
        {v.especialidad}
      </p>
    </div>
  );
}

export default function Directorio() {
  const [filtro, setFiltro] = useState<IdOla | null>(null);
  const visibles = voluntarios.filter((v) => traeLa(v, filtro)).length;

  return (
    <>
      <div
        role="group"
        aria-label={seccion.filtros.etiqueta}
        data-revelar
        className="flex flex-wrap justify-center gap-2.5"
      >
        <Filtro
          activo={filtro === null}
          alPulsar={() => setFiltro(null)}
          tinta="#3E4E54"
        >
          {seccion.filtros.todas}
        </Filtro>
        {OLAS_CON_GENTE.map((id) => (
          <Filtro
            key={id}
            activo={filtro === id}
            alPulsar={() => setFiltro(id)}
            color={OLA[id].color}
            tinta={OLA[id].tinta}
          >
            {OLA[id].corto}
          </Filtro>
        ))}
      </div>

      <p aria-live="polite" className="sr-only">
        {seccion.filtros.resultado(visibles)}
      </p>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {voluntarios.map((v, i) => (
          <li
            key={v.numero}
            hidden={!traeLa(v, filtro)}
            data-revelar
            style={{ "--revelar-orden": i } as React.CSSProperties}
          >
            <Carnet v={v} />
          </li>
        ))}

        {/* El carnet vacio: siempre a la vista, filtre lo que filtre. */}
        <li
          data-revelar
          style={{ "--revelar-orden": voluntarios.length } as React.CSSProperties}
        >
          <div className="flex h-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-tinta-texto/35 p-6 text-center">
            <div
              aria-hidden="true"
              className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-tinta-oceano/60 text-3xl font-light text-tinta-oceano"
            >
              +
            </div>
            <h3 className="mt-4 text-base font-semibold text-noche">
              {seccion.siguiente.titulo}
            </h3>
            <p className="mt-1 text-sm text-tinta-texto">
              {seccion.siguiente.texto}
            </p>
            {/* Sin sombra: aqui todo es plano. El borde noche de
                `.superficie-clara` ya lo hace leer como boton. */}
            <a
              href={mailto(traeLaOla.cta.subject, traeLaOla.cta.body)}
              className="boton-accion mt-6 !shadow-none"
            >
              {seccion.siguiente.cta}
            </a>
          </div>
        </li>
      </ul>
    </>
  );
}
