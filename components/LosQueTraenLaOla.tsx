import Directorio from "@/components/Directorio";
import { losQueTraenLaOla as seccion } from "@/content/site";
import { voluntarios } from "@/content/voluntarios";

/* ---------------------------------------------------------------------------
 * LOS QUE TRAEN LA OLA
 * ---------------------------------------------------------------------------
 * El directorio de voluntarios fundadores, sobre espuma. Arriba la doble ola
 * del logo; abajo "la costa", la misma postal de los posts de redes: mar en
 * tres capas, codigo flotando, arena, una palmera y una tabla clavada.
 *
 * La costa va en el flujo normal, DEBAJO del contenido, nunca por encima: es
 * el pie de la seccion, no un fondo. Sus olas reusan `.ola-svg` del mar del
 * hero (SVG del doble de ancho que se desplaza -50%), mas lentas, y con
 * `prefers-reduced-motion` se congelan igual que aquel.
 *
 * Este componente se renderiza en el servidor; solo los filtros (Directorio)
 * van al cliente.
 * ------------------------------------------------------------------------- */

const ANCHO = 1440;
const ALTO = 200;

/**
 * Curva tileable: `periodos` olas en 1440, repetida dos veces (2880).
 * `filo` acerca los puntos de control a los extremos, como en MarVivo: mas
 * bajo, cresta mas marcada. La altura real de la ola es ~0.56 x `amplitud`.
 */
function trazo(base: number, amplitud: number, periodos: number, filo = 1 / 3) {
  const p = ANCHO / periodos;
  let d = `M0,${base}`;
  for (let i = 0; i < periodos * 2; i += 1) {
    const x = i * p;
    d += ` C${(x + p * filo).toFixed(1)},${base - amplitud} ${(x + p * (1 - filo)).toFixed(1)},${base + amplitud} ${(x + p).toFixed(1)},${base}`;
  }
  return d;
}

/**
 * Del fondo hacia la orilla: cian claro, cian, manglar. Todas las capas bajan
 * hasta el pie (la arena las tapa); lo que se ve de cada una es la franja
 * entre su cresta y la de la siguiente: delgada arriba (~14%), ancha en el
 * medio (~48%) y delgada abajo, contra la arena (~13%).
 *
 * `arriba` es el borde superior de la capa, en % del alto de la costa. Como
 * cada SVG se estira a un alto distinto, la `amplitud` va calculada para que
 * las tres olas midan parecido en pantalla (14-22px en escritorio).
 */
const CAPAS = [
  { color: "#BDE9F5", arriba: "2%", base: 10, amplitud: 18, periodos: 5, filo: 0.28, velocidad: "70s", sentido: "normal" },
  { color: "#5AC8EB", arriba: "12%", base: 14, amplitud: 32, periodos: 3, filo: 0.26, velocidad: "52s", sentido: "inverso" },
  { color: "#78DCA0", arriba: "60%", base: 22, amplitud: 56, periodos: 4, filo: 0.26, velocidad: "38s", sentido: "normal" },
] as const;

/**
 * Donde flota cada snippet: todos dentro de la franja ancha del medio, cada
 * uno a su altura, lejos de las crestas (~7%, ~20% y ~66%). En movil solo
 * quedan los dos primeros. Nadie arranca antes del 30%: ahi vive la palmera.
 */
const POSICIONES = [
  { izq: "20%", arriba: "27%", izqMovil: "32%", arribaMovil: "27%", retraso: "0s", movil: true },
  { izq: "68%", arriba: "33%", izqMovil: "40%", arribaMovil: "45%", retraso: "2.5s", movil: true },
  { izq: "44%", arriba: "44%", izqMovil: "0", arribaMovil: "0", retraso: "4s", movil: false },
  { izq: "26%", arriba: "53%", izqMovil: "0", arribaMovil: "0", retraso: "1.2s", movil: false },
];

/** El borde de la arena: donde rompe la ultima ola. */
const ORILLA =
  "M0,14 C180,4 330,22 540,12 C760,2 900,20 1110,10 C1250,4 1350,16 1440,12";

function DobleOla() {
  const linea = (y: number) => trazo(y, 5, 24);
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${ANCHO} 28`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-x-0 top-6 h-7 w-full"
    >
      <path d={linea(9)} fill="none" stroke="#5AC8EB" strokeWidth="2" strokeLinecap="round" />
      <path d={linea(19)} fill="none" stroke="#78DCA0" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Palmera({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 120 210" className={className}>
      {/* Tronco: un manglar mas hondo para que no se pierda contra el mar. */}
      <path d="M64 202 C66 150 60 110 52 72" fill="none" stroke="#217E46" strokeWidth="8" strokeLinecap="round" />
      <path d="M58 170h9 M60 142h8 M58 114h7 M55 90h6" stroke="#F2F7F5" strokeOpacity="0.45" strokeWidth="1.5" strokeLinecap="round" />
      {/* El monticulo de arena de donde nace el tronco. */}
      <ellipse cx="64" cy="203" rx="30" ry="7" fill="#F6E7C6" />
      <g fill="#78DCA0">
        <path d="M52 70 C30 50 10 58 2 80 C18 68 34 68 52 74 Z" />
        <path d="M52 70 C74 48 98 54 112 78 C94 66 72 66 52 74 Z" />
        <path d="M52 70 C44 42 28 30 10 32 C28 42 40 54 49 72 Z" />
        <path d="M52 70 C62 40 82 28 102 34 C82 42 64 54 55 72 Z" />
        <path d="M52 70 C52 46 58 30 70 20 C62 38 58 52 55 72 Z" />
      </g>
      <circle cx="49" cy="77" r="4" fill="#217E46" />
      <circle cx="57" cy="78" r="4" fill="#217E46" />
    </svg>
  );
}

function Tabla({ className }: { className: string }) {
  return (
    // El viewBox es mas ancho que la tabla: inclinada 10 grados, la punta se
    // corre ~24 unidades a la derecha y sin ese margen quedaba recortada.
    <svg aria-hidden="true" focusable="false" viewBox="0 0 80 150" className={className}>
      <g transform="translate(18 0) rotate(10 22 140)">
        <path d="M22 4 C36 22 38 72 34 114 C32 130 28 142 22 142 C16 142 12 130 10 114 C6 72 8 22 22 4 Z" fill="#5AC8EB" />
        <path d="M22 12 V136" stroke="#FFFFFF" strokeOpacity="0.8" strokeWidth="1.5" />
      </g>
      {/* El monticulo que la deja clavada en la arena. */}
      <ellipse cx="40" cy="142" rx="24" ry="8" fill="#F6E7C6" />
    </svg>
  );
}

function Costa() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative h-[240px] select-none overflow-hidden sm:h-[300px]"
    >
      {CAPAS.map((capa) => {
        const cresta = trazo(capa.base, capa.amplitud, capa.periodos, capa.filo);
        return (
          <div
            key={capa.color}
            className="absolute inset-x-0 bottom-0 overflow-hidden"
            style={{ top: capa.arriba }}
          >
            <svg
              className="ola-svg"
              data-sentido={capa.sentido}
              viewBox={`0 0 ${ANCHO * 2} ${ALTO}`}
              preserveAspectRatio="none"
              focusable="false"
              style={{ "--velocidad": capa.velocidad } as React.CSSProperties}
            >
              <path
                d={`${cresta} L${ANCHO * 2},${ALTO} L0,${ALTO} Z`}
                fill={capa.color}
              />
              {/* La espuma de la cresta. */}
              <path
                d={cresta}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="3"
                strokeOpacity="0.8"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        );
      })}

      {seccion.snippets.map((codigo, i) => {
        const pos = POSICIONES[i % POSICIONES.length];
        return (
          <span
            key={codigo}
            className={`absolute left-[var(--izq-movil)] top-[var(--arriba-movil)] animate-marea whitespace-nowrap font-mono text-[14px] leading-none text-espuma sm:left-[var(--izq)] sm:top-[var(--arriba)] ${
              pos.movil ? "" : "hidden sm:block"
            }`}
            style={
              {
                "--izq": pos.izq,
                "--izq-movil": pos.izqMovil,
                "--arriba": pos.arriba,
                "--arriba-movil": pos.arribaMovil,
                opacity: 0.35,
                animationDelay: pos.retraso,
              } as React.CSSProperties
            }
          >
            {codigo}
          </span>
        );
      })}

      {/* La arena. Su orilla lleva la espuma mas marcada de la escena: la
          linea de rompiente y, un poco mas arriba, el agua que se devuelve. */}
      <svg
        viewBox={`0 0 ${ANCHO} 60`}
        preserveAspectRatio="none"
        focusable="false"
        className="absolute inset-x-0 bottom-0 h-[26%] w-full"
      >
        <path d={`${ORILLA} L1440,60 L0,60 Z`} fill="#F6E7C6" />
        <path
          d={ORILLA}
          transform="translate(0 -4)"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeOpacity="0.5"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={ORILLA}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeOpacity="0.8"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Palmera y tabla nacen en la arena: su base queda muy por debajo de
          la orilla (~22% desde abajo) y un monticulo tapa el punto de apoyo. */}
      <Palmera className="absolute bottom-[4%] left-[2%] h-[76%] w-auto sm:left-[6%]" />
      <Tabla className="absolute bottom-[5%] right-[7%] h-[44%] w-auto sm:right-[10%]" />
    </div>
  );
}

export default function LosQueTraenLaOla() {
  return (
    <section
      id={seccion.id}
      className="superficie-clara relative overflow-hidden pt-24 sm:pt-32"
    >
      <DobleOla />

      <div className="contenedor relative">
        <header data-revelar className="text-center">
          <p className="font-mono text-sm text-tinta-oceano">
            {seccion.contador(voluntarios.length)}
          </p>
          <h2 className="titulo-seccion mx-auto mt-5 max-w-[18ch] text-balance text-noche">
            {seccion.titulo}
          </h2>
          <p className="lead mx-auto mt-6 max-w-[56ch] text-pretty">
            {seccion.sub}
          </p>
        </header>

        <div className="mt-12">
          <Directorio />
        </div>

        <p
          data-revelar
          className="mt-14 text-center font-mono text-sm text-tinta-texto"
        >
          {seccion.cierre}
        </p>
      </div>

      {/* 44px + los ~20px que hay dentro de la costa hasta la primera cresta:
          ~64px entre la linea de cierre y el mar. */}
      <div className="mt-11">
        <Costa />
      </div>
    </section>
  );
}
