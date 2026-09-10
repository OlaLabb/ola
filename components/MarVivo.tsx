"use client";

import { useRef, type RefObject } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";

/* ---------------------------------------------------------------------------
 * EL MAR VIVO
 * ---------------------------------------------------------------------------
 * La luz viene del horizonte, no de la camara. Por eso el agua se OSCURECE
 * hacia el frente: las capas lejanas son claras y de olas pequeñas, y las
 * cercanas son siluetas oscuras de olas largas. Ese contraste de valor es lo
 * que crea la profundidad; el parallax solo la confirma.
 *
 * Cada capa es un SVG del doble de ancho con el mismo trazo repetido: al
 * desplazarlo exactamente -50% en X el bucle es invisible, la ola nunca salta.
 * Cada capa tiene su velocidad, su frecuencia de ola y su desfase, para que
 * nunca se vean dos crestas alineadas.
 *
 * Todo el movimiento es `transform` y `opacity` (GPU). Con
 * `prefers-reduced-motion` el mar queda congelado como una postal.
 * ------------------------------------------------------------------------- */

/** Difumina el reflejo por los cuatro costados: nunca se ve el borde del div. */
const MASCARA_REFLEJO =
  "radial-gradient(closest-side at 57% 10%, #000 30%, rgba(0,0,0,0.5) 60%, transparent 100%)";

/** Reparto de la espuma a lo largo de la cresta: [posicion %, opacidad]. */
const PARCHES: [number, number][] = [
  [0, 0],
  [4, 0.7],
  [9, 0.05],
  [15, 0.55],
  [21, 0],
  [27, 0.8],
  [33, 0.1],
  [38, 0.35],
  [44, 0],
  [50, 0.65],
  [56, 0.05],
  [62, 0.45],
  [68, 0],
  [74, 0.75],
  [80, 0.1],
  [86, 0.5],
  [92, 0],
  [96, 0.4],
  [100, 0],
];

const ANCHO = 1440;
const ALTO = 320;

/**
 * Curva de olas tileable.
 * - `filo` acerca los puntos de control a los extremos: cuanto mas bajo, mas
 *   afilada la cresta (mar picado en primer plano, mar liso en el horizonte).
 * - `variacion` multiplica la amplitud ola por ola para romper la regularidad
 *   de papel pintado. Su primer y ultimo valor deben coincidir: asi la
 *   pendiente al final del mosaico es la misma que al principio y el bucle
 *   sigue siendo invisible.
 */
function trazoOla(
  capa: Pick<Capa, "base" | "amplitud" | "periodos" | "filo" | "variacion">,
) {
  const { base, amplitud, periodos } = capa;
  const filo = capa.filo ?? 1 / 3;
  const p = ANCHO / periodos;
  let d = `M0,${base}`;
  for (let i = 0; i < periodos; i += 1) {
    const x = i * p;
    const a =
      amplitud *
      (capa.variacion ? capa.variacion[i % capa.variacion.length] : 1);
    d += ` C${(x + p * filo).toFixed(1)},${(base + a).toFixed(1)} ${(x + p * (1 - filo)).toFixed(1)},${(base - a).toFixed(1)} ${x + p},${base}`;
  }
  return d;
}

/** La misma curva cerrada hacia abajo, para rellenarla. */
function areaOla(capa: Capa) {
  return `${trazoOla(capa)} L${ANCHO},${ALTO} L0,${ALTO} Z`;
}

type Capa = {
  id: string;
  /** Altura de reposo de la ola dentro del viewBox de 320. */
  base: number;
  /** Amplitud; el signo decide si la ola arranca hacia abajo o hacia arriba. */
  amplitud: number;
  /** Cuantas olas completas caben en el ancho: mas periodos = mar mas lejano. */
  periodos: number;
  /** Corrimiento horizontal en fracciones de periodo, para desalinear crestas. */
  desfase?: number;
  /** Agudeza de la cresta: 1/3 es una onda suave, 0.18 es mar picado. */
  filo?: number;
  /** Multiplicadores de amplitud ola por ola (primero y ultimo deben coincidir). */
  variacion?: number[];
  degradado: { offset: string; color: string }[];
  opacidad: number;
  velocidad: string;
  sentido: "normal" | "inverso";
  /** Pixeles que baja la capa a lo largo del scroll del hero. */
  parallax: number;
  marea?: string;
  /** Luz de borde: define el filo de la ola contra la capa de atras. */
  rim?: string;
  /** Espuma: la misma linea, pero a parches y mas brillante. */
  cresta?: { color: string; grosor: number };
};

/**
 * Altura del horizonte dentro del viewBox. Todo lo que esta encima es cielo.
 * Las capas se reparten con perspectiva: juntas y pequeñas cerca del horizonte,
 * separadas y grandes cerca del espectador.
 */
const HORIZONTE = 88;

const CAPAS: Capa[] = [
  {
    id: "mar-horizonte",
    base: 93,
    amplitud: -5,
    periodos: 14,
    filo: 0.33,
    variacion: [
      1, 0.6, 0.85, 0.5, 0.9, 0.65, 0.8, 0.55, 0.95, 0.6, 0.85, 0.7, 0.75, 1,
    ],
    degradado: [
      { offset: "0%", color: "#1A6E8C" },
      { offset: "100%", color: "#145467" },
    ],
    opacidad: 0.6,
    velocidad: "60s",
    sentido: "normal",
    parallax: 165,
    rim: "rgba(190,238,250,0.45)",
  },
  {
    id: "mar-lejano",
    base: 106,
    amplitud: 9,
    periodos: 9,
    filo: 0.31,
    variacion: [1, 0.6, 0.85, 0.55, 0.9, 0.7, 0.8, 0.6, 1],
    desfase: 0.35,
    degradado: [
      { offset: "0%", color: "#175E79" },
      { offset: "100%", color: "#124C62" },
    ],
    opacidad: 0.8,
    velocidad: "46s",
    sentido: "inverso",
    parallax: 140,
    rim: "rgba(170,230,246,0.38)",
  },
  {
    id: "mar-medio",
    base: 126,
    amplitud: -16,
    periodos: 6,
    filo: 0.29,
    variacion: [1, 0.62, 0.88, 0.55, 0.75, 1],
    desfase: 0.2,
    degradado: [
      { offset: "0%", color: "#134F65" },
      { offset: "100%", color: "#0F3F52" },
    ],
    opacidad: 0.92,
    velocidad: "34s",
    sentido: "normal",
    parallax: 112,
    rim: "rgba(150,222,242,0.32)",
    marea: "15s",
  },
  {
    id: "mar-swell",
    base: 158,
    amplitud: 28,
    periodos: 4,
    filo: 0.26,
    variacion: [1, 0.6, 0.82, 1],
    desfase: 0.55,
    degradado: [
      { offset: "0%", color: "#0F4053" },
      { offset: "100%", color: "#0B3242" },
    ],
    opacidad: 1,
    velocidad: "26s",
    sentido: "inverso",
    parallax: 84,
    rim: "rgba(135,212,236,0.28)",
    marea: "12s",
  },
  {
    id: "mar-cerca",
    base: 202,
    amplitud: -42,
    periodos: 3,
    filo: 0.23,
    variacion: [1, 0.55, 1],
    desfase: 0.15,
    degradado: [
      { offset: "0%", color: "#0B3042" },
      { offset: "100%", color: "#082432" },
    ],
    opacidad: 1,
    velocidad: "18s",
    sentido: "normal",
    parallax: 56,
    rim: "rgba(125,205,232,0.24)",
    marea: "9s",
    cresta: { color: "rgba(200,240,252,0.42)", grosor: 2 },
  },
  {
    id: "mar-fosa",
    base: 254,
    amplitud: 50,
    periodos: 3,
    filo: 0.2,
    variacion: [0.75, 1, 0.75],
    desfase: 0.62,
    degradado: [
      { offset: "0%", color: "#071C26" },
      { offset: "100%", color: "#05161E" },
    ],
    opacidad: 1,
    velocidad: "13s",
    sentido: "inverso",
    parallax: 32,
    rim: "rgba(150,220,240,0.20)",
    // Foam de la ola que rompe cerca: una linea clara y su halo.
    cresta: { color: "rgba(222,248,255,0.7)", grosor: 2.5 },
  },
  {
    id: "mar-orilla",
    base: 298,
    amplitud: -30,
    periodos: 3,
    filo: 0.18,
    variacion: [1, 0.58, 1],
    desfase: 0.1,
    // La orilla es casi una silueta: la luz viene de lejos, no de aqui.
    degradado: [
      { offset: "0%", color: "#030D13" },
      { offset: "100%", color: "#061E29" },
    ],
    opacidad: 1,
    velocidad: "9s",
    sentido: "normal",
    parallax: 12,
    rim: "rgba(120,190,215,0.14)",
  },
];

/** Burbujas de espuma. Posiciones fijas (nada de random) para que SSR y cliente coincidan. */
const ESPUMA = [
  { izq: 4, abajo: 30, tam: 3, vel: "7.5s", retraso: "0s" },
  { izq: 11, abajo: 22, tam: 2, vel: "9s", retraso: "1.4s" },
  { izq: 17, abajo: 36, tam: 4, vel: "8.2s", retraso: "2.6s" },
  { izq: 23, abajo: 18, tam: 2, vel: "10s", retraso: "0.8s" },
  { izq: 29, abajo: 33, tam: 3, vel: "7s", retraso: "3.2s" },
  { izq: 35, abajo: 25, tam: 2, vel: "9.6s", retraso: "1.9s" },
  { izq: 41, abajo: 38, tam: 4, vel: "8.6s", retraso: "0.4s" },
  { izq: 47, abajo: 20, tam: 2, vel: "7.8s", retraso: "2.2s" },
  { izq: 53, abajo: 34, tam: 3, vel: "10.4s", retraso: "3.8s" },
  { izq: 59, abajo: 24, tam: 2, vel: "8s", retraso: "1.1s" },
  { izq: 65, abajo: 37, tam: 3, vel: "9.2s", retraso: "2.9s" },
  { izq: 71, abajo: 19, tam: 2, vel: "7.4s", retraso: "0.6s" },
  { izq: 77, abajo: 32, tam: 3, vel: "10s", retraso: "3.4s" },
  { izq: 83, abajo: 26, tam: 2, vel: "8.8s", retraso: "1.7s" },
  { izq: 89, abajo: 35, tam: 3, vel: "9.4s", retraso: "2.4s" },
  { izq: 95, abajo: 21, tam: 2, vel: "7.6s", retraso: "4.1s" },
];

/** Laminas de luz que cruzan la superficie. */
const DESTELLOS = [
  { izq: 8, abajo: 62, ancho: 18, vel: "22s", retraso: "0s", op: 0.35 },
  { izq: 46, abajo: 58, ancho: 26, vel: "28s", retraso: "3s", op: 0.3 },
  { izq: 68, abajo: 66, ancho: 14, vel: "19s", retraso: "6s", op: 0.4 },
  { izq: 24, abajo: 48, ancho: 22, vel: "25s", retraso: "9s", op: 0.28 },
  { izq: 60, abajo: 44, ancho: 30, vel: "31s", retraso: "4.5s", op: 0.22 },
];

type Props = {
  /** Seccion cuyo scroll manda el parallax (normalmente el hero). */
  objetivo?: RefObject<HTMLElement>;
};

export default function MarVivo({ objetivo }: Props) {
  const propio = useRef<HTMLDivElement>(null);
  const sinMovimiento = useReducedMotion();
  const quieto = Boolean(sinMovimiento);

  // Progreso 0 → 1 mientras el hero sale de pantalla.
  const { scrollYProgress } = useScroll({
    target: objetivo ?? propio,
    offset: ["start start", "end start"],
  });

  // El horizonte es lo mas lejano: se mueve casi con el scroll (parallax alto).
  const yHorizonte = useTransform(
    scrollYProgress,
    [0, 1],
    [0, quieto ? 0 : 160],
  );

  return (
    <div
      ref={propio}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[clamp(240px,46vh,480px)] select-none"
    >
      {/* 1. El cielo sobre el horizonte: el resplandor que hace posible ver la
          costa a contraluz. Va detras de todo. */}
      <m.div
        className="absolute inset-x-0"
        style={{ y: yHorizonte, top: `${(HORIZONTE / ALTO) * 100}%` }}
      >
        {/* Halo ancho y saturado. */}
        <div className="absolute inset-x-0 bottom-0 h-[300px] animate-brillo bg-[radial-gradient(48%_100%_at_57%_100%,rgba(74,196,238,0.42),rgba(74,196,238,0.10)_50%,rgba(74,196,238,0)_78%)]" />
        {/* Nucleo pequeño y casi blanco: es lo que hace que se lea como luz
            y no como una mancha gris. */}
        <div className="absolute inset-x-0 bottom-0 h-[130px] animate-brillo bg-[radial-gradient(17%_100%_at_57%_100%,rgba(214,248,255,0.72),rgba(214,248,255,0.14)_45%,rgba(214,248,255,0)_72%)]" />
      </m.div>

      {/* 2. La costa lejana, a contraluz sobre ese resplandor: el otro lado de
          la distancia que esta pagina quiere acortar. */}
      <m.div className="absolute inset-0" style={{ y: yHorizonte }}>
        <svg
          className="absolute inset-x-0 top-0 h-full w-full"
          viewBox={`0 0 ${ANCHO} ${ALTO}`}
          preserveAspectRatio="none"
          focusable="false"
        >
          <path
            d="M0,86 C60,85 96,80 150,79 C214,78 250,83 300,83 C352,83 388,74 452,73 C516,72 548,81 604,82 C660,83 700,77 764,76 C828,75 866,82 928,83 C990,84 1030,79 1096,78 C1162,77 1200,84 1268,84 C1330,84 1386,81 1440,80 L1440,93 L0,93 Z"
            fill="#071B24"
          />
        </svg>
      </m.div>

      {/* Las cuatro capas lejanas. */}
      {CAPAS.slice(0, 4).map((capa) => (
        <CapaDeOla
          key={capa.id}
          capa={capa}
          progreso={scrollYProgress}
          quieto={quieto}
        />
      ))}

      {/* Camino de luz: el reflejo del horizonte no es una columna lisa, son
          destellos horizontales que se ensanchan al acercarse. Va aqui, entre
          el mar lejano y el cercano, para que las olas de delante lo corten
          igual que en el mar de verdad. */}
      <CaminoDeLuz />

      {/* Las tres capas cercanas, ya casi siluetas. */}
      {CAPAS.slice(4).map((capa) => (
        <CapaDeOla
          key={capa.id}
          capa={capa}
          progreso={scrollYProgress}
          quieto={quieto}
        />
      ))}

      {/* 3. El filo del horizonte, por delante del agua: es la linea mas
          brillante de la escena y de ella nace el reflejo. */}
      <m.div
        className="pointer-events-none absolute inset-x-0"
        style={{ y: yHorizonte, top: `${(HORIZONTE / ALTO) * 100}%` }}
      >
        <div className="h-20 -translate-y-1/2 bg-[radial-gradient(42%_100%_at_57%_50%,rgba(180,242,255,0.34),transparent_72%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(196,240,253,0.10)_18%,rgba(230,251,255,0.85)_57%,rgba(196,240,253,0.10)_84%,transparent)]" />
      </m.div>

      {/* 4. Atmosfera: un velo que unifica las capas y hunde el primer plano
          en sombra. Sin el, las olas se leen como cintas separadas. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{
          top: `${(HORIZONTE / ALTO) * 100}%`,
          background:
            "linear-gradient(180deg, rgba(154,225,245,0) 0%, rgba(154,225,245,0.06) 9%, rgba(154,225,245,0) 32%, rgba(2,12,18,0.22) 80%, rgba(2,12,18,0) 97%)",
        }}
      />

      {/* 5. Destellos: laminas de luz que cruzan la superficie. */}
      {DESTELLOS.map((d, i) => (
        <span
          key={`destello-${i}`}
          className="destello"
          style={
            {
              left: `${d.izq}%`,
              bottom: `${d.abajo}%`,
              width: `${d.ancho}%`,
              "--velocidad": d.vel,
              "--retraso": d.retraso,
            } as React.CSSProperties
          }
        />
      ))}

      {/* 6. Espuma: burbujas diminutas que suben sobre las crestas cercanas. */}
      {ESPUMA.map((b, i) => (
        <span
          key={`espuma-${i}`}
          className="espuma-particula"
          style={
            {
              left: `${b.izq}%`,
              bottom: `${b.abajo}%`,
              width: b.tam,
              height: b.tam,
              opacity: 0,
              "--velocidad": b.vel,
              "--retraso": b.retraso,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

/** Destellos del reflejo: [posicion %, ancho %, alto px, opacidad, velocidad, retraso]. */
const CAMINO: [number, number, number, number, string, string][] = [
  [1, 6, 3, 0.85, "17s", "0s"],
  [5, 9, 3, 0.7, "21s", "2.5s"],
  [10, 7, 3, 0.78, "15s", "5s"],
  [16, 13, 4, 0.6, "24s", "1.2s"],
  [23, 10, 4, 0.68, "19s", "6.5s"],
  [31, 17, 5, 0.52, "27s", "3.8s"],
  [40, 14, 5, 0.58, "22s", "8s"],
  [50, 22, 6, 0.42, "30s", "0.8s"],
  [61, 18, 6, 0.46, "25s", "4.6s"],
  [73, 27, 7, 0.32, "33s", "7.2s"],
  [86, 23, 7, 0.36, "28s", "2.1s"],
];

function CaminoDeLuz() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0"
      style={{
        top: `${(HORIZONTE / ALTO) * 100}%`,
        maskImage:
          "linear-gradient(180deg, #000 0%, #000 55%, transparent 92%)",
        WebkitMaskImage:
          "linear-gradient(180deg, #000 0%, #000 55%, transparent 92%)",
      }}
    >
      {CAMINO.map(([arriba, ancho, alto, op, vel, retraso]) => (
        <span
          key={arriba}
          className="destello-luz"
          style={
            {
              top: `${arriba}%`,
              left: "57%",
              width: `${ancho}%`,
              height: alto,
              marginLeft: `-${ancho / 2}%`,
              opacity: op,
              "--velocidad": vel,
              "--retraso": retraso,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

function CapaDeOla({
  capa,
  progreso,
  quieto,
}: {
  capa: Capa;
  progreso: ReturnType<typeof useScroll>["scrollYProgress"];
  quieto: boolean;
}) {
  // Parallax: lo lejano baja mas al hacer scroll, asi parece moverse menos.
  const y = useTransform(progreso, [0, 1], [0, quieto ? 0 : capa.parallax]);

  const area = areaOla(capa);
  const trazo = trazoOla(capa);
  const periodo = ANCHO / capa.periodos;
  const corrimiento = -(capa.desfase ?? 0) * periodo;
  const grad = `grad-${capa.id}`;

  // Tres copias del trazo hacia la derecha. Como el desfase solo corre hacia la
  // izquierda (y nunca mas de un periodo), el ancho visible siempre queda cubierto.
  const copias = [0, ANCHO, ANCHO * 2];

  return (
    <m.div
      className="absolute inset-0 overflow-hidden"
      style={{ y, opacity: capa.opacidad }}
    >
      <div
        className={capa.marea ? "h-full animate-marea" : "h-full"}
        style={capa.marea ? { animationDuration: capa.marea } : undefined}
      >
        <svg
          className="ola-svg"
          data-sentido={capa.sentido}
          style={{ "--velocidad": capa.velocidad } as React.CSSProperties}
          viewBox={`0 0 ${ANCHO * 2} ${ALTO}`}
          preserveAspectRatio="none"
          focusable="false"
        >
          <defs>
            {/* En coordenadas de usuario: el degradado arranca en la cresta de
                ESTA ola y muere unos 150px mas abajo. Si se repartiera sobre el
                viewBox entero, cada capa mostraria un solo color plano y el mar
                se veria a rayas. */}
            <linearGradient
              id={grad}
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1={capa.base - Math.abs(capa.amplitud)}
              x2="0"
              y2={Math.min(ALTO, capa.base + 150)}
            >
              {capa.degradado.map((parada) => (
                <stop
                  key={parada.offset}
                  offset={parada.offset}
                  stopColor={parada.color}
                />
              ))}
            </linearGradient>

            {/* La espuma no es una linea continua: aparece y desaparece a lo
                largo de la cresta, como en el mar de verdad. */}
            {capa.cresta && (
              <linearGradient id={`${grad}-espuma`} x1="0" y1="0" x2="1" y2="0">
                {PARCHES.map(([offset, alfa]) => (
                  <stop
                    key={offset}
                    offset={`${offset}%`}
                    stopColor={capa.cresta!.color}
                    stopOpacity={alfa}
                  />
                ))}
              </linearGradient>
            )}
          </defs>

          <g transform={`translate(${corrimiento},0)`}>
            {copias.map((x) => (
              <path
                key={x}
                d={area}
                fill={`url(#${grad})`}
                transform={`translate(${x},0)`}
              />
            ))}

            {/* Luz de borde: el filo de la ola contra la capa de atras. */}
            {capa.rim && (
              <g fill="none" stroke={capa.rim} strokeWidth={1.25}>
                {copias.map((x) => (
                  <path key={x} d={trazo} transform={`translate(${x},0)`} />
                ))}
              </g>
            )}
          </g>

          {/* La espuma va sin desfase: su degradado se calcula sobre el ancho
              completo del SVG, asi los parches quedan repartidos. */}
          {capa.cresta && (
            <g
              fill="none"
              stroke={`url(#${grad}-espuma)`}
              strokeWidth={capa.cresta.grosor}
              strokeLinecap="round"
              transform={`translate(${corrimiento},0)`}
            >
              {copias.map((x) => (
                <path key={x} d={trazo} transform={`translate(${x},0)`} />
              ))}
            </g>
          )}
        </svg>
      </div>
    </m.div>
  );
}
