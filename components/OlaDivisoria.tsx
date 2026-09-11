/**
 * Ola estatica que cose dos secciones de distinto color.
 * Es el eco tranquilo del mar del hero: el mismo gesto, sin movimiento.
 */
const TRAZO =
  "M0,70 C200,18 380,112 620,74 C860,36 1040,110 1240,80 C1330,66 1390,60 1440,58 L1440,160 L0,160 Z";

const CRESTA =
  "M0,70 C200,18 380,112 620,74 C860,36 1040,110 1240,80 C1330,66 1390,60 1440,58";

/**
 * La linea de cresta solo se lee si contrasta con la seccion de ARRIBA, que es
 * sobre la que se dibuja. En claro habia que invertirla: el trazo de espuma
 * original era invisible sobre `espuma`.
 */
const TRAZOS = {
  claro: "rgba(196,236,248,0.16)",
  oscuro: "rgba(14,58,74,0.22)",
};

export default function OlaDivisoria({
  arriba,
  abajo,
  trazo = "claro",
  alto = "h-[60px] sm:h-[90px]",
}: {
  /** Color de la seccion que queda encima. */
  arriba: string;
  /** Color de la seccion que queda debajo (el relleno de la ola). */
  abajo: string;
  /** Tono de la linea de cresta. `oscuro` cuando la seccion de arriba es clara. */
  trazo?: keyof typeof TRAZOS;
  alto?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className="leading-[0]"
      style={{ background: arriba }}
    >
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className={`block w-full ${alto}`}
        focusable="false"
      >
        <path d={TRAZO} fill={abajo} />
        <path d={CRESTA} fill="none" stroke={TRAZOS[trazo]} strokeWidth="2" />
      </svg>
    </div>
  );
}
