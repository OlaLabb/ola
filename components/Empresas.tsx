import { Sello } from "@/components/Wordmark";
import { empresas, mailto } from "@/content/site";

/**
 * EMPRESAS ALIADAS — la otra orilla.
 * ---------------------------------------------------------------------------
 * Cierra la pagina sobre `espuma`, que es el tercer —y ultimo— momento claro:
 * el laboratorio, los colegios y esta. Los tres piden lo mismo, que hagas algo.
 *
 * Va centrada igual que "Trae la ola": eran una sola seccion y siguen siendo
 * la misma peticion, dicha a dos lectores distintos.
 *
 * Todo el color de acento sale de `tinta.*`, que es la familia calibrada para
 * fondo claro. Los acentos crudos (`oceano` 1.78, `manglar` 1.55) aqui no se
 * leen. El `.superficie-clara` del section se encarga del CTA y del foco.
 * ------------------------------------------------------------------------- */
export default function Empresas() {
  return (
    <section
      id={empresas.id}
      className="superficie-clara relative py-20 sm:py-28"
    >
      <div data-revelar className="contenedor relative text-center">
        <p className="kicker justify-center text-tinta-oceano">
          {empresas.kicker}
        </p>

        <h2 className="titulo-seccion mx-auto mt-7 max-w-[20ch] text-balance text-noche">
          {empresas.titulo}
        </h2>

        <p className="lead mx-auto mt-6 max-w-[54ch] text-pretty">
          {empresas.texto}
        </p>

        <div className="mt-11">
          <a
            href={mailto(empresas.cta.subject, empresas.cta.body)}
            className="boton-accion px-8 py-4 text-base"
          >
            {empresas.cta.label}
          </a>
        </div>

        {/* Quien responde al otro lado. A una empresa le importa saberlo. */}
        <p className="mt-10">
          <Sello tono="claro" />
        </p>
      </div>
    </section>
  );
}
