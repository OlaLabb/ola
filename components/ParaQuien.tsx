import EncabezadoSeccion from "@/components/EncabezadoSeccion";
import { paraQuien, whatsapp } from "@/content/site";

/**
 * Dos columnas: estudiante y colegio.
 * Solo el colegio lleva CTA — al estudiante llegamos por su profesor.
 */
export default function ParaQuien() {
  return (
    <section id={paraQuien.id} className="relative bg-noche py-20 sm:py-28">
      <div aria-hidden="true" className="absolute inset-0 textura-rejilla" />

      <div className="contenedor relative">
        <EncabezadoSeccion
          numero="05"
          kicker={paraQuien.kicker}
          color="#F2A0C0"
          titulo={paraQuien.titulo}
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 md:gap-6">
          {paraQuien.columnas.map((col) => (
            <article
              key={col.titulo}
              className="relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7 sm:p-10"
            >
              {/* Lavado de color: identifica a quien le habla la tarjeta. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `radial-gradient(90% 70% at 0% 0%, ${col.color}14, transparent 60%)`,
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background: `linear-gradient(90deg, ${col.color}, transparent 75%)`,
                }}
              />

              <div className="relative flex flex-1 flex-col">
                <h3
                  className="text-[clamp(1.35rem,2.4vw,1.75rem)] font-semibold leading-tight"
                  style={{ color: col.color }}
                >
                  {col.titulo}
                </h3>

                <p className="cuerpo mt-5 max-w-[46ch] text-pretty text-bruma">
                  {col.texto}
                </p>

                <p className="pt-7 text-pretty text-[0.95rem] font-semibold leading-relaxed text-espuma">
                  {col.pie}
                </p>

                {col.cta && (
                  <a
                    href={whatsapp(col.cta.mensaje, col.cta.subject)}
                    className="boton-linea mt-8 self-start"
                  >
                    {col.cta.label}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
