import EncabezadoSeccion from "@/components/EncabezadoSeccion";
import { colegios, whatsapp } from "@/content/site";

/* ---------------------------------------------------------------------------
 * PARA COLEGIOS
 * ---------------------------------------------------------------------------
 * La invitacion y las cuatro preguntas que la responden, en la misma seccion:
 * son justo las que se hacen antes de decir que si, asi que van debajo del
 * boton y no dos pantallas mas abajo.
 *
 * Segunda superficie clara de la pagina, junto con el laboratorio. Las dos son
 * los momentos en que pedimos que HAGAS algo: escribir o ejecutar. El resto
 * del sitio es noche.
 *
 * `details/summary` nativo: abre y cierra sin JavaScript, el buscador lee las
 * respuestas y el teclado ya funciona por defecto.
 * ------------------------------------------------------------------------- */

export default function Colegios() {
  return (
    <section
      id={colegios.id}
      className="superficie-clara relative py-20 sm:py-28"
    >
      <div className="contenedor relative">
        <EncabezadoSeccion
          numero="05"
          kicker={colegios.kicker}
          color="#227893"
          titulo={colegios.titulo}
          sub={colegios.sub}
          tono="claro"
        />

        <div className="mt-12 grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-9 lg:col-start-4">
            <p className="text-pretty text-[clamp(1.1rem,2vw,1.4rem)] font-semibold leading-snug text-tinta-manglar">
              {colegios.pie}
            </p>

            <a
              href={whatsapp(colegios.cta.mensaje, colegios.cta.subject)}
              className="boton-accion mt-8"
            >
              {colegios.cta.label}
            </a>

            <div className="mt-16">
              <p className="kicker text-tinta-texto">
                {colegios.preguntasKicker}
              </p>

              <div className="mt-6 border-t border-tinta-linea">
                {colegios.preguntas.map((item) => (
                  <details
                    key={item.pregunta}
                    className="group border-b border-tinta-linea"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-pretty text-base font-semibold text-noche transition-colors hover:text-tinta-manglar sm:text-lg [&::-webkit-details-marker]:hidden">
                      {item.pregunta}
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-xl font-light text-tinta-manglar transition-transform duration-300 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>

                    <p className="cuerpo max-w-[62ch] pb-7 text-pretty text-tinta-texto">
                      {item.respuesta}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
