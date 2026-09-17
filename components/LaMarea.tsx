"use client";

import { useRef, useState } from "react";

import { NumeroSeccion } from "@/components/EncabezadoSeccion";
import Icono from "@/components/Icono";
import {
  colegios,
  laMarea,
  olas,
  type OlaDeLaMarea,
} from "@/content/site";
import type { IdOla } from "@/content/voluntarios";

/* ---------------------------------------------------------------------------
 * LA MAREA
 * ---------------------------------------------------------------------------
 * Las siete olas como una travesia: cada nodo es una ola, y al tocarlo cambian
 * el detalle (recibis / te llevas / le pasas a la siguiente), el color activo
 * (`--ola`), la pantalla del celular "Marea Fresca" y la linea de codigo.
 *
 * La ola de color de la travesia avanza hasta el nodo activo y los nodos ya
 * surfeados quedan marcados. Los estados de los nodos, la entrada de cada
 * pantalla y los bocetos del celular viven en "LA MAREA" de app/globals.css.
 *
 * Todas las pantallas del celular se renderizan siempre; la activa va con
 * `flex` y las demas con `hidden`. Pasar de `display:none` a `flex` es lo que
 * reinicia la animacion de entrada, igual que en el mockup.
 *
 * Nada de color-mix(): los tintes se calculan aqui o van en hex, porque esta
 * pagina tambien se ve en navegadores viejos de gama baja.
 * ------------------------------------------------------------------------- */

const COLOR = Object.fromEntries(olas.items.map((o) => [o.id, o.color])) as Record<
  IdOla,
  string
>;

const NOCHE = "#0A0E12";
const GRIS = "text-[#9AA3AB]";
const LINEA = "border-espuma/[0.12]";

/** Mezcla `peso` (0-1) de `hex` sobre `base`. Lo que haria color-mix(). */
function mezclar(hex: string, peso: number, base = NOCHE) {
  const canal = (h: string, i: number) => parseInt(h.slice(1 + i * 2, 3 + i * 2), 16);
  return `#${[0, 1, 2]
    .map((i) =>
      Math.round(canal(hex, i) * peso + canal(base, i) * (1 - peso))
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
}

/**
 * La travesia: el mismo trazo dos veces, uno apagado de fondo y otro con el
 * degradado que avanza. `pathLength="100"` deja medir el avance en porcentaje.
 */
const TRAVESIA =
  "M0 62 C 60 30, 120 30, 180 62 S 300 94, 360 62 S 480 30, 540 62 S 660 94, 720 62 S 840 30, 900 62 S 1020 94, 1080 62 S 1120 50, 1132 55";

/** La linea de codigo bajo el celular. */
function Codigo({ codigo }: { codigo: OlaDeLaMarea["codigo"] }) {
  return (
    <p className={`m-0 text-center font-mono text-xs ${GRIS}`}>
      marea<span className="text-oceano">{codigo.metodo}</span>(
      {codigo.argumento && (
        <span className="text-manglar">{codigo.argumento}</span>
      )}
      ) ⇒{" "}
      {codigo.resultadoEsTexto ? (
        <span className="text-manglar">{codigo.resultado}</span>
      ) : (
        codigo.resultado
      )}
      ;
    </p>
  );
}

/* --- Piezas del celular ---------------------------------------------------- */

const TITULO_PANTALLA = `m-0 text-xs ${GRIS}`;
/** Nota de cuaderno. Borde y color van aparte: cada pantalla los cambia. */
const BOCETO = "rounded-[14px] border-[1.5px] p-3 text-xs leading-[1.4]";
const BURBUJA = "max-w-[92%] p-2.5 text-xs";
const BURBUJA_SUYA = `${BURBUJA} rounded-[14px_14px_14px_4px] bg-[#141C24]`;
/** oceano al 22% sobre #141C24: el mensaje propio en el chat. */
const BURBUJA_MIA = `${BURBUJA} self-end rounded-[14px_14px_4px_14px] bg-[#234250]`;

function Marca() {
  return (
    <div className="flex items-center gap-2 text-sm font-semibold">
      <span
        aria-hidden="true"
        className="inline-block h-[22px] w-[22px] rounded-full bg-gradient-to-br from-oceano to-manglar"
      />
      {laMarea.hilo.app}
    </div>
  );
}

function Hora({ children }: { children: React.ReactNode }) {
  return (
    <small className={`mb-[3px] block text-[10px] ${GRIS}`}>{children}</small>
  );
}

/** Lo que muestra el celular al terminar cada ola. */
function Pantalla({ id }: { id: IdOla }) {
  const c = laMarea.celular;

  switch (id) {
    case "innovacion":
      return (
        <>
          <p className={TITULO_PANTALLA}>{c.innovacion.titulo}</p>
          <div
            className={`${BOCETO} border-dashed border-[#3A4650] text-[#C9D1D6]`}
          >
            <div className="mb-1.5 text-[15px] font-semibold text-espuma">
              {laMarea.hilo.app}
            </div>
            {c.innovacion.problema}
            <br />
            <br />
            {c.innovacion.idea}
          </div>
          <div className={`${BOCETO} border-dashed border-[#2A3540] ${GRIS}`}>
            {c.innovacion.paraQuien}
          </div>
        </>
      );

    case "diseno":
      return (
        <>
          <p className={TITULO_PANTALLA}>{c.diseno.titulo}</p>
          <Marca />
          {/* La paleta de la app de ejemplo, no la de las olas. */}
          <div aria-hidden="true" className="flex gap-1.5">
            <span className="block h-[18px] flex-1 rounded-[5px] bg-oceano" />
            <span className="block h-[18px] flex-1 rounded-[5px] bg-manglar" />
            <span className="block h-[18px] flex-1 rounded-[5px] bg-espuma" />
            <span className="block h-[18px] flex-1 rounded-[5px] border border-[#2A3540] bg-noche" />
          </div>
          <p className={TITULO_PANTALLA}>{c.diseno.pantallas}</p>
          <div aria-hidden="true" className="grid grid-cols-3 gap-1.5">
            <div className="marea-boceto" />
            <div className="marea-boceto" />
            <div className="marea-boceto" />
          </div>
          <p className={`${TITULO_PANTALLA} mt-auto`}>{c.diseno.recorrido}</p>
        </>
      );

    case "programacion":
      return (
        <>
          <Marca />
          <p className={TITULO_PANTALLA}>{c.programacion.titulo}</p>
          {c.programacion.productos.map((p) => (
            <div
              key={p.nombre}
              className="flex items-center justify-between rounded-[10px] bg-[#141C24] px-2.5 py-[9px] text-xs"
            >
              <b className="font-semibold">{p.nombre}</b>
              <span className="text-manglar">{p.precio}</span>
            </div>
          ))}
          <div className="mt-auto rounded-full bg-atardecer p-[9px] text-center text-xs font-semibold text-noche">
            {c.programacion.boton}
          </div>
        </>
      );

    case "datos":
      return (
        <>
          <Marca />
          <p className={TITULO_PANTALLA}>{c.datos.titulo}</p>
          <div aria-hidden="true" className="mt-1.5 flex h-[120px] items-end gap-2">
            {c.datos.barras.map((alto, i) => (
              <span
                key={i}
                className="block flex-1 rounded-t-md opacity-85"
                style={{ height: `${alto}%`, background: COLOR.datos }}
              />
            ))}
          </div>
          <div className={`flex justify-between text-[10px] ${GRIS}`}>
            {c.datos.dias.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div className={`${BOCETO} border-solid border-[#2A3540] text-[#C9D1D6]`}>
            {c.datos.nota}
          </div>
        </>
      );

    case "automatizacion":
      return (
        <>
          <Marca />
          <p className={TITULO_PANTALLA}>{c.automatizacion.titulo}</p>
          <div className="flex items-center gap-2 text-xs">
            <span
              aria-hidden="true"
              className="inline-grid h-[26px] w-[26px] place-items-center rounded-lg text-xs font-extrabold text-noche"
              style={{ background: COLOR.automatizacion }}
            >
              {c.automatizacion.inicial}
            </span>
            {c.automatizacion.robot}
          </div>
          {c.automatizacion.avisos.map((a) => (
            <div key={a.hora} className={BURBUJA_SUYA}>
              <Hora>{a.hora}</Hora>
              {a.texto}
            </div>
          ))}
        </>
      );

    case "ia":
      return (
        <>
          <Marca />
          <p className={TITULO_PANTALLA}>{c.ia.titulo}</p>
          <div className={BURBUJA_MIA}>{c.ia.pregunta}</div>
          <div className={BURBUJA_SUYA}>
            <Hora>{c.ia.quien}</Hora>
            {c.ia.respuesta}
          </div>
          <div className={BURBUJA_MIA}>{c.ia.confirma}</div>
        </>
      );

    case "seguridad":
      return (
        <>
          <Marca />
          <div className="m-auto text-center">
            {/* Ilustracion de la pantalla, no un icono de la UI: por eso no
                vive en Icono.tsx (otra caja, otro grosor, un punto relleno). */}
            <svg
              viewBox="0 0 64 64"
              aria-hidden="true"
              focusable="false"
              className="mx-auto h-16 w-16"
              fill="none"
              stroke={COLOR.seguridad}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="12" y="28" width="40" height="28" rx="6" />
              <path d="M20 28v-8a12 12 0 0 1 24 0v8" />
              <circle cx="32" cy="42" r="3" fill={COLOR.seguridad} />
            </svg>
            <p className="mt-2 text-xs text-[#C9D1D6]">
              {c.seguridad.lineas[0]}
              <br />
              {c.seguridad.lineas[1]}
            </p>
          </div>
        </>
      );
  }
}

/* --- La seccion ------------------------------------------------------------ */

export default function LaMarea() {
  const [activa, setActiva] = useState(0);
  const feria = useRef<HTMLDivElement | null>(null);

  const total = laMarea.olas.length;
  const ultima = total - 1;
  const ola = laMarea.olas[activa];

  function ir(k: number) {
    setActiva(Math.max(0, Math.min(ultima, k)));
  }

  function siguiente() {
    if (activa < ultima) return ir(activa + 1);

    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    feria.current?.scrollIntoView({ behavior: quieto ? "auto" : "smooth" });
  }

  // La ola viva avanza por la travesia hasta el nodo activo.
  const avance = Math.max((activa / ultima) * 100, 3);

  return (
    <section
      id={laMarea.id}
      aria-labelledby="titulo-marea"
      className="marea relative bg-noche pb-24 pt-16 leading-[1.55]"
      style={{ "--ola": COLOR[ola.id] } as React.CSSProperties}
    >
      <div className="contenedor">
        <NumeroSeccion numero="02" color="#5AC8EB" />
        <p className="mb-3.5 mt-1.5 font-mono text-sm text-manglar">
          {laMarea.kicker.objeto}
          <span className="text-oceano">{laMarea.kicker.metodo}</span>
          {laMarea.kicker.resto}
        </p>
        <h2
          id="titulo-marea"
          className="mb-[18px] max-w-[16ch] text-[clamp(34px,5vw,58px)] font-extrabold leading-[1.05] tracking-[-0.02em]"
        >
          {laMarea.titulo}
        </h2>
        <p className="max-w-[60ch] text-[clamp(17px,2vw,20px)] font-light text-[#C9D1D6]">
          {laMarea.lead.antes}
          <b className="font-semibold text-espuma">{laMarea.lead.resaltado}</b>
          {laMarea.lead.despues}
        </p>

        {/* --- La travesia ------------------------------------------------ */}
        <div className="relative mb-7 mt-14">
          <svg
            viewBox="0 0 1132 90"
            aria-hidden="true"
            focusable="false"
            className="block h-auto w-full overflow-visible max-[700px]:hidden"
          >
            <defs>
              <linearGradient id="marea-degradado" x1="0" x2="1">
                <stop offset="0" stopColor="#5AC8EB" />
                <stop offset=".5" stopColor="#78DCA0" />
                <stop offset="1" stopColor="#5AC8EB" />
              </linearGradient>
            </defs>
            <path
              d={TRAVESIA}
              fill="none"
              stroke="rgba(242,247,245,.10)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d={TRAVESIA}
              fill="none"
              stroke="url(#marea-degradado)"
              strokeWidth="3"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray={`${avance} 100`}
              strokeDashoffset="0"
            />
          </svg>

          <div
            role="group"
            aria-label={laMarea.travesiaEtiqueta}
            className="relative -mt-[34px] grid grid-cols-7 gap-2 max-[700px]:mt-0 max-[700px]:grid-cols-4 max-[700px]:gap-y-[22px]"
          >
            {laMarea.olas.map((o, j) => (
              <button
                key={o.id}
                type="button"
                aria-pressed={j === activa}
                onClick={() => ir(j)}
                className={`marea-nodo${j < activa ? " hecho" : ""}`}
                style={
                  {
                    "--nc": COLOR[o.id],
                    // Los tintes del nodo, precalculados: halo del activo y
                    // relleno de los ya surfeados.
                    "--nc-halo": `${COLOR[o.id]}38`,
                    "--nc-hecho": mezclar(COLOR[o.id], 0.3),
                  } as React.CSSProperties
                }
              >
                <span className="marea-nodo-numero">{j + 1}</span>
                <span className="marea-nodo-nombre">{o.corto}</span>
              </button>
            ))}
          </div>
        </div>

        {/* --- El detalle de la ola activa -------------------------------- */}
        <div
          className={`mt-10 grid items-stretch gap-10 border-t ${LINEA} pt-10 min-[901px]:grid-cols-[1.25fr_.9fr]`}
        >
          <div>
            <p className="mb-1.5 font-mono text-sm text-[color:var(--ola)]">
              {laMarea.numero(activa + 1, total)}{" "}
              <small className={GRIS}>· {ola.antes}</small>
            </p>
            <h3 className="mb-2 text-[clamp(28px,3.4vw,40px)] font-extrabold leading-[1.1] tracking-[-0.01em] text-[color:var(--ola)]">
              {ola.nombre}
            </h3>
            <p className="mb-[26px] text-[clamp(18px,2vw,22px)] font-light text-[#DDE5E9]">
              {ola.promesa}
            </p>

            <dl className="grid gap-3.5">
              {(
                [
                  ["recibe", laMarea.pasos.recibe, ola.recibe],
                  ["lleva", laMarea.pasos.lleva, ola.lleva],
                  ["entrega", laMarea.pasos.entrega, ola.entrega],
                ] as const
              ).map(([clave, termino, texto]) => (
                <div
                  key={clave}
                  className={`grid grid-cols-[120px_1fr] items-start gap-3.5 border-t ${LINEA} py-3.5 last:border-b max-[700px]:grid-cols-1 max-[700px]:gap-1`}
                >
                  <dt className={`pt-0.5 text-[13px] ${GRIS}`}>{termino}</dt>
                  <dd
                    className={`text-base ${
                      clave === "lleva"
                        ? "font-semibold text-espuma before:mr-[9px] before:inline-block before:h-[9px] before:w-[9px] before:rounded-full before:bg-[color:var(--ola)] before:align-[1px] before:content-['']"
                        : ""
                    }`}
                  >
                    {texto}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-[26px] flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => ir(activa - 1)}
                disabled={activa === 0}
                className={`min-h-[44px] rounded-full border ${LINEA} bg-transparent px-5 py-3 text-espuma hover:border-espuma disabled:cursor-default disabled:opacity-35`}
              >
                {laMarea.anterior}
              </button>
              <button
                type="button"
                onClick={siguiente}
                className="min-h-[44px] rounded-full border border-[color:var(--ola)] bg-[color:var(--ola)] px-5 py-3 font-semibold text-noche"
              >
                {activa === ultima ? laMarea.irAFeria : laMarea.siguiente}
              </button>
            </div>
          </div>

          {/* --- El hilo: el producto que crece ---------------------------- */}
          <div
            className={`flex flex-col items-center gap-[18px] rounded-[28px] border ${LINEA} bg-[#111820] px-7 pb-6 pt-7 max-[700px]:p-5`}
          >
            <p className={`m-0 self-start text-[13px] ${GRIS}`}>
              {laMarea.hilo.antes}
              <b className="font-semibold text-espuma">{laMarea.hilo.app}</b>
              {laMarea.hilo.despues}
            </p>

            <div className="relative h-[430px] w-[230px] rounded-[32px] border-[3px] border-[#1E2830] bg-[#050809] p-3.5 shadow-[0_30px_60px_rgba(0,0,0,.5)]">
              <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-[#0D1319]">
                {laMarea.olas.map((o, j) => (
                  <div
                    key={o.id}
                    className={`marea-pantalla absolute inset-0 flex-col gap-2.5 px-4 py-[18px] ${
                      j === activa ? "flex" : "hidden"
                    }`}
                  >
                    <Pantalla id={o.id} />
                  </div>
                ))}
              </div>
            </div>

            <Codigo codigo={ola.codigo} />
          </div>
        </div>

        {/* --- Aviso ------------------------------------------------------ */}
        {/* Borde: manglar al 35%. Fondo: manglar al 10% sobre noche. */}
        <div className="mt-16 grid grid-cols-[auto_1fr] items-center gap-5 rounded-[20px] border border-[#78DCA059] bg-[#152320] px-7 py-[26px] max-[700px]:grid-cols-1">
          <div className="grid h-[52px] w-[52px] place-items-center rounded-full bg-manglar text-noche">
            <Icono nombre="ola" className="h-[26px] w-[26px]" grosor={2.2} />
          </div>
          <p className="text-[17px] font-light text-[#DDE5E9]">
            <b className="font-semibold text-espuma">{laMarea.aviso.resaltado}</b>
            {laMarea.aviso.texto}
          </p>
        </div>

        {/* --- Modalidades ------------------------------------------------ */}
        <div className="mt-5 grid grid-cols-1 gap-5 min-[901px]:grid-cols-2">
          {laMarea.modos.map((modo) => (
            <div
              key={modo.titulo}
              className={`rounded-3xl border p-[30px] ${
                // Oceano al 7% sobre noche: la Marea completa es la propuesta.
                modo.completa ? "border-oceano bg-[#101B21]" : LINEA
              }`}
            >
              <h4 className="mb-1 text-2xl font-semibold">{modo.titulo}</h4>
              <p className={`mb-[18px] text-sm ${GRIS}`}>{modo.sub}</p>
              <ul className="mb-[22px] grid gap-2 text-[15px]">
                {modo.items.map((item) => (
                  <li
                    key={item}
                    className={`relative pl-[22px] before:absolute before:left-0 before:top-[9px] before:h-2.5 before:w-2.5 before:rounded-full before:content-[''] ${
                      modo.completa ? "before:bg-oceano" : "before:bg-manglar"
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={`#${colegios.id}`}
                className={`inline-block min-h-[44px] rounded-full px-[22px] py-[13px] font-semibold no-underline ${
                  // El coral solo va en el CTA de la Marea completa.
                  modo.completa
                    ? "bg-atardecer text-noche"
                    : `border ${LINEA} text-espuma hover:border-espuma`
                }`}
              >
                {modo.cta}
              </a>
            </div>
          ))}
        </div>

        {/* --- La feria: el cierre ---------------------------------------- */}
        <div ref={feria} className="mt-[72px] text-center">
          <p className="mb-2.5 text-[clamp(24px,3.5vw,40px)] font-semibold leading-[1.15] tracking-[-0.01em]">
            {laMarea.feria.lineas[0]}
            <br />
            {laMarea.feria.lineas[1]}
          </p>
          <p className={`text-[17px] font-light ${GRIS}`}>{laMarea.feria.pie}</p>
        </div>
      </div>
    </section>
  );
}
