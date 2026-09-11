import EncabezadoSeccion from "@/components/EncabezadoSeccion";
import { Sello } from "@/components/Wordmark";
import { queEs, type Frente } from "@/content/site";

/* ---------------------------------------------------------------------------
 * QUE ES OLA LAB
 * ---------------------------------------------------------------------------
 * El contexto y los cuatro frentes, que antes eran dos secciones seguidas.
 * Juntas pedian medio minuto de lectura antes de que la pagina hubiera
 * demostrado nada; ahora son tres frases y una fila que se lee de un vistazo.
 *
 * El borde superior arranca en el color de la ola mas cercana del hero y se
 * funde en #0E3A4A: la pagina no "cambia de seccion", el mar se hunde en ella.
 * ------------------------------------------------------------------------- */

const COLORES: Record<Frente["color"], string> = {
  oceano: "#5AC8EB",
  manglar: "#78DCA0",
  turquesa: "#7FD8D8",
  coral: "#F2A0C0",
};

export default function QueEs() {
  const [primero, ...resto] = queEs.parrafos;

  return (
    <section id={queEs.id} className="relative bg-profundo py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-[#061E29] to-transparent"
      />

      <div className="contenedor relative">
        <EncabezadoSeccion numero="01" kicker={queEs.kicker} color="#5AC8EB" />

        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-9 lg:col-start-4">
            <p className="text-pretty text-[clamp(1.15rem,2vw,1.55rem)] font-light leading-[1.5] text-espuma">
              {primero}
            </p>

            {resto.map((p) => (
              <p
                key={p.slice(0, 24)}
                className="cuerpo mt-6 max-w-[62ch] text-pretty text-bruma"
              >
                {p}
              </p>
            ))}

            {/* El remate de la seccion: la frase que resume por que existe todo esto. */}
            <figure className="relative mt-12 max-w-[34rem]">
              <div
                aria-hidden="true"
                className="absolute -inset-x-10 -inset-y-10 bg-[radial-gradient(50%_70%_at_22%_50%,rgba(120,220,160,0.12),transparent_72%)]"
              />
              <blockquote className="relative border-l-2 border-manglar pl-6 text-pretty">
                <p className="cita text-manglar">{queEs.destacado}</p>
              </blockquote>
            </figure>

            {/* Lo unico que le pedimos al estudiante: nosotros llegamos por su colegio. */}
            <p className="mt-10 max-w-[46ch] text-pretty text-[0.95rem] font-semibold leading-relaxed text-espuma">
              {queEs.pieEstudiante}
            </p>
          </div>
        </div>

        {/* Los cuatro frentes: una linea cada uno, a ancho completo. Antes era
            una seccion entera de filas largas; el contenido es el mismo, dicho
            en un tercio del espacio. */}
        <div className="mt-16 border-t border-white/[0.08] pt-10">
          <p className="kicker text-bruma">{queEs.frentesKicker}</p>

          <ul className="mt-8 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
            {queEs.frentes.map((frente, i) => {
              const hex = COLORES[frente.color];
              return (
                <li
                  key={frente.titulo}
                  data-revelar
                  style={{ "--revelar-orden": i } as React.CSSProperties}
                >
                  <div
                    aria-hidden="true"
                    className="h-[3px] w-9 rounded-full"
                    style={{ background: hex }}
                  />
                  <span
                    aria-hidden="true"
                    className="mt-4 block font-mono text-xs tracking-[0.18em]"
                    style={{ color: hex }}
                  >
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 text-pretty text-base font-semibold leading-snug text-espuma">
                    {frente.titulo}
                  </h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-bruma">
                    {frente.texto}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/[0.08] pt-6 text-sm text-bruma">
          {queEs.sello}
          <Sello className="text-manglar/80" />
        </p>
      </div>
    </section>
  );
}
