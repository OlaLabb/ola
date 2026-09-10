/**
 * Cielo de la noche de oceano: puntos diminutos que titilan desacompasados.
 * Posiciones fijas (nada de aleatorio) para que servidor y cliente coincidan.
 * Es solo texto en el DOM: no pesa ni un kilobyte de imagen.
 */
const ESTRELLAS = [
  { izq: 6, arriba: 18, tam: 2, vel: "6s", retraso: "0s", op: 0.5 },
  { izq: 13, arriba: 34, tam: 1, vel: "8s", retraso: "1.2s", op: 0.4 },
  { izq: 19, arriba: 11, tam: 1, vel: "7s", retraso: "2.4s", op: 0.35 },
  { izq: 27, arriba: 26, tam: 2, vel: "9s", retraso: "0.6s", op: 0.45 },
  { izq: 34, arriba: 8, tam: 1, vel: "6.5s", retraso: "3.1s", op: 0.3 },
  { izq: 43, arriba: 21, tam: 1, vel: "8.5s", retraso: "1.8s", op: 0.4 },
  { izq: 51, arriba: 13, tam: 2, vel: "7.5s", retraso: "2.9s", op: 0.5 },
  { izq: 58, arriba: 30, tam: 1, vel: "9.5s", retraso: "0.3s", op: 0.35 },
  { izq: 64, arriba: 16, tam: 1, vel: "6.2s", retraso: "4.2s", op: 0.45 },
  { izq: 71, arriba: 25, tam: 2, vel: "8.2s", retraso: "1.5s", op: 0.4 },
  { izq: 77, arriba: 9, tam: 1, vel: "7.8s", retraso: "3.6s", op: 0.3 },
  { izq: 83, arriba: 33, tam: 1, vel: "9.2s", retraso: "2.1s", op: 0.45 },
  { izq: 88, arriba: 19, tam: 2, vel: "6.8s", retraso: "0.9s", op: 0.5 },
  { izq: 93, arriba: 28, tam: 1, vel: "8.8s", retraso: "3.3s", op: 0.35 },
  { izq: 96, arriba: 12, tam: 1, vel: "7.2s", retraso: "1.7s", op: 0.4 },
];

export default function Estrellas() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    >
      {ESTRELLAS.map((e, i) => (
        <span
          key={i}
          className="estrella"
          style={
            {
              left: `${e.izq}%`,
              top: `${e.arriba}%`,
              width: e.tam,
              height: e.tam,
              opacity: e.op,
              "--velocidad": e.vel,
              "--retraso": e.retraso,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
