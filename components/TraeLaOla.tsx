import { mailto, traeLaOla } from "@/content/site";

/**
 * TRAE LA OLA — el objetivo numero uno de la pagina.
 * Es la unica seccion centrada: despues de una pagina entera alineada a la
 * izquierda, el cambio de eje la convierte en un destino, no en un parrafo mas.
 *
 * Dos orillas: primero las personas, luego las empresas. Las dos traen ola.
 */
export default function TraeLaOla() {
  return (
    <section
      id={traeLaOla.id}
      className="relative overflow-hidden bg-profundo-bruma py-20 sm:py-28"
    >
      {/* Luz de atardecer: el unico lugar de la pagina, ademas de los botones,
          donde el coral aparece. Aqui SI es un momento de accion. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(50%_60%_at_50%_0%,rgba(255,178,94,0.13),transparent_70%)]"
      />

      <div className="contenedor relative text-center">
        <p className="kicker justify-center text-atardecer">
          {traeLaOla.kicker}
        </p>

        <h2 className="titulo-seccion mx-auto mt-7 max-w-[18ch] text-balance">
          {traeLaOla.titulo}
        </h2>

        {/* La frase que los ubica en la marca: sin ellos no hay ola. */}
        <p className="mx-auto mt-6 max-w-[34ch] text-pretty text-base font-semibold text-oceano sm:text-lg">
          {traeLaOla.frase}
        </p>

        <p className="lead mx-auto mt-6 max-w-[58ch] text-pretty text-espuma/90">
          {traeLaOla.texto}
        </p>

        <p className="cita mx-auto mt-12 max-w-[34ch] text-balance text-atardecer">
          {traeLaOla.destacado}
        </p>

        {/* mailto con asunto y cuerpo pre-llenados: cero friccion, cero backend. */}
        <div className="mt-12">
          <a
            href={mailto(traeLaOla.cta.subject, traeLaOla.cta.body)}
            className="boton-accion px-8 py-4 text-base"
          >
            {traeLaOla.cta.label}
          </a>
        </div>

        {/* La otra orilla de la convocatoria: las empresas tambien traen ola. */}
        <div className="mx-auto mt-14 max-w-[46rem] rounded-3xl border border-white/[0.1] bg-white/[0.03] p-7 sm:p-9">
          <p className="kicker justify-center text-oceano">
            {traeLaOla.empresas.kicker}
          </p>
          <h3 className="mt-5 text-pretty text-[clamp(1.2rem,2.2vw,1.6rem)] font-semibold leading-tight text-espuma">
            {traeLaOla.empresas.titulo}
          </h3>
          <p className="cuerpo mx-auto mt-4 max-w-[52ch] text-pretty text-bruma">
            {traeLaOla.empresas.texto}
          </p>
          <a
            href={mailto(
              traeLaOla.empresas.cta.subject,
              traeLaOla.empresas.cta.body,
            )}
            className="boton-linea mt-7"
          >
            {traeLaOla.empresas.cta.label}
          </a>
        </div>

        <p className="mx-auto mt-9 max-w-[54ch] text-pretty text-sm leading-relaxed text-bruma">
          {traeLaOla.nota}{" "}
          <a
            href={mailto(traeLaOla.notaCta.subject, traeLaOla.notaCta.body)}
            className="font-semibold text-oceano underline decoration-oceano/40 underline-offset-4 transition-colors hover:decoration-oceano"
          >
            {traeLaOla.notaCta.label}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
