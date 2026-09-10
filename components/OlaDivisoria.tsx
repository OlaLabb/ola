/**
 * Ola estatica que cose dos secciones de distinto color.
 * Es el eco tranquilo del mar del hero: el mismo gesto, sin movimiento.
 */
const TRAZO =
  "M0,70 C200,18 380,112 620,74 C860,36 1040,110 1240,80 C1330,66 1390,60 1440,58 L1440,160 L0,160 Z";

export default function OlaDivisoria({
  arriba,
  abajo,
  alto = "h-[60px] sm:h-[90px]",
}: {
  /** Color de la seccion que queda encima. */
  arriba: string;
  /** Color de la seccion que queda debajo (el relleno de la ola). */
  abajo: string;
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
        <path
          d="M0,70 C200,18 380,112 620,74 C860,36 1040,110 1240,80 C1330,66 1390,60 1440,58"
          fill="none"
          stroke="rgba(196,236,248,0.16)"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
