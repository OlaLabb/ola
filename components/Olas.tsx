import EncabezadoSeccion from "@/components/EncabezadoSeccion";
import { olas } from "@/content/site";

/* ---------------------------------------------------------------------------
 * LAS OLAS
 * ---------------------------------------------------------------------------
 * El corazon de la marca: aqui no hay temario, hay marea. Cada tarjeta es una
 * ola con su color, su olita en movimiento y la promesa de lo que te pasa al
 * surfearla; el entregable aparece cuando la tarjeta despierta.
 *
 * Sin JavaScript: todo el comportamiento vive en CSS (ver "LAS OLAS" en
 * app/globals.css). Las tarjetas son tabulables, asi que lo que el cursor
 * revela el teclado tambien lo revela, y en pantallas tactiles —donde no hay
 * hover— el entregable se muestra siempre.
 * ------------------------------------------------------------------------- */

/**
 * Trazo de la olita. Periodo de 60 unidades repetido de x=-60 a x=240 dentro de
 * un viewBox de 120: sobra trazo a los dos lados para que el desplazamiento de
 * un periodo exacto (-60) cierre el bucle sin costura.
 */
const OLITA =
  "M-60 18 q15 -11 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0";

export default function Olas() {
  const ultima = olas.items.length - 1;

  return (
    <section
      id={olas.id}
      className="relative bg-gradient-to-b from-noche to-profundo-abismo py-20 sm:py-28"
    >
      <div aria-hidden="true" className="absolute inset-0 textura-rejilla" />

      <div className="contenedor relative">
        <EncabezadoSeccion
          numero="02"
          kicker={olas.kicker}
          kickerColor="#5AC8EB"
          color="#5AC8EB"
          titulo={olas.titulo}
          sub={olas.intro}
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {olas.items.map((ola, i) => (
            <li
              key={ola.id}
              // Tabulable: es la unica forma de que el entregable tambien se
              // revele navegando con teclado.
              tabIndex={0}
              style={
                {
                  "--ola-color": ola.color,
                  // Alfas en hex para no depender de color-mix(): esta pagina
                  // tambien se ve en navegadores viejos de gama baja.
                  "--ola-borde": `${ola.color}73`,
                  "--ola-tinte": `${ola.color}1F`,
                } as React.CSSProperties
              }
              className={`ola-tarjeta relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-7 ${
                // La septima ola quedaria sola al final de la fila: la
                // centramos para que el hueco se lea como remate, no como error.
                i === ultima
                  ? "sm:col-span-2 sm:mx-auto sm:max-w-[26rem] lg:col-span-1 lg:col-start-2 lg:max-w-none"
                  : ""
              }`}
            >
              <div
                aria-hidden="true"
                className="ola-brillo pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(90% 100% at 0% 0%, var(--ola-tinte), transparent 65%)",
                }}
              />

              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 120 32"
                className="relative block h-8 w-[7.5rem]"
              >
                <g
                  className="olita-trazo"
                  // Retraso negativo: cada ola arranca en otro punto de su
                  // ciclo, asi las siete no se mueven en bloque.
                  style={{ animationDelay: `-${i * 2.6}s` }}
                >
                  <path
                    d={OLITA}
                    fill="none"
                    stroke="var(--ola-color)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </g>
              </svg>

              <h3
                className="relative mt-5 text-pretty text-lg font-semibold leading-snug"
                style={{ color: ola.color }}
              >
                {ola.nombre}
              </h3>

              <p className="cuerpo relative mt-2.5 flex-1 text-pretty text-bruma">
                {ola.promesa}
              </p>

              {/* Siempre en el DOM: los lectores de pantalla lo leen aunque el
                  cursor no haya pasado, y el alto de la tarjeta no salta. */}
              <p className="ola-entregable relative mt-6 border-t border-white/[0.07] pt-4 font-mono text-[0.72rem] leading-relaxed text-espuma/85">
                <span aria-hidden="true" style={{ color: ola.color }}>
                  →{" "}
                </span>
                {olas.prefijoEntregable}{" "}
                <span className="font-semibold">{ola.entregable}</span>
              </p>
            </li>
          ))}
        </ul>

        {/* El remate: la marea completa no deja un certificado, deja otra persona. */}
        <p className="cita mx-auto mt-16 max-w-[38ch] text-balance text-center text-manglar">
          {olas.cierre}
        </p>
      </div>
    </section>
  );
}
