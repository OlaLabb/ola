import EncabezadoSeccion from "@/components/EncabezadoSeccion";
import { Sello } from "@/components/Wordmark";
import { queEs } from "@/content/site";

/**
 * Seccion de contexto.
 * El borde superior arranca en el color de la ola mas cercana del hero y se
 * funde en #0E3A4A: la pagina no "cambia de seccion", el mar se hunde en ella.
 */
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

            <p className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/[0.08] pt-6 text-sm text-bruma">
              {queEs.sello}
              <Sello className="text-manglar/80" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
