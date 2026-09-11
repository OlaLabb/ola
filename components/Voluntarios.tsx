import { mailto, voluntarios } from "@/content/site";

/**
 * El objetivo numero uno de la pagina.
 * Es la unica seccion centrada: despues de una pagina entera alineada a la
 * izquierda, el cambio de eje la convierte en un destino, no en un parrafo mas.
 */
export default function Voluntarios() {
  return (
    <section
      id={voluntarios.id}
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
          {voluntarios.kicker}
        </p>

        <h2 className="titulo-seccion mx-auto mt-7 max-w-[18ch] text-balance">
          {voluntarios.titulo}
        </h2>

        {/* La frase que los ubica en la marca: sin ellos no hay ola. */}
        <p className="mx-auto mt-6 max-w-[34ch] text-pretty text-base font-semibold text-oceano sm:text-lg">
          {voluntarios.frase}
        </p>

        <p className="lead mx-auto mt-6 max-w-[58ch] text-pretty text-espuma/90">
          {voluntarios.texto}
        </p>

        <p className="cita mx-auto mt-12 max-w-[34ch] text-balance text-atardecer">
          {voluntarios.destacado}
        </p>

        {/* mailto con asunto y cuerpo pre-llenados: cero friccion, cero backend. */}
        <div className="mt-12">
          <a
            href={mailto(voluntarios.cta.subject, voluntarios.cta.body)}
            className="boton-accion px-8 py-4 text-base"
          >
            {voluntarios.cta.label}
          </a>
        </div>

        {/* La otra orilla de la convocatoria: las empresas tambien traen ola. */}
        <div className="mx-auto mt-14 max-w-[46rem] rounded-3xl border border-white/[0.1] bg-white/[0.03] p-7 sm:p-9">
          <h3 className="text-pretty text-[clamp(1.2rem,2.2vw,1.6rem)] font-semibold leading-tight text-espuma">
            {voluntarios.empresas.titulo}
          </h3>
          <p className="cuerpo mx-auto mt-4 max-w-[52ch] text-pretty text-bruma">
            {voluntarios.empresas.texto}
          </p>
          <a
            href={mailto(
              voluntarios.empresas.cta.subject,
              voluntarios.empresas.cta.body,
            )}
            className="boton-linea mt-7"
          >
            {voluntarios.empresas.cta.label}
          </a>
        </div>

        <p className="mx-auto mt-9 max-w-[54ch] text-pretty text-sm leading-relaxed text-bruma">
          {voluntarios.nota}{" "}
          <a
            href={mailto(voluntarios.notaCta.subject, voluntarios.notaCta.body)}
            className="font-semibold text-oceano underline decoration-oceano/40 underline-offset-4 transition-colors hover:decoration-oceano"
          >
            {voluntarios.notaCta.label}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
