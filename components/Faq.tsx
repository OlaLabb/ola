import EncabezadoSeccion from "@/components/EncabezadoSeccion";
import { faq } from "@/content/site";

/**
 * Preguntas de colegios.
 * `details/summary` nativo: abre y cierra sin JavaScript, el buscador lee las
 * respuestas y el teclado ya funciona por defecto.
 */
export default function Faq() {
  return (
    <section
      id={faq.id}
      className="relative bg-profundo-abismo py-20 sm:py-28"
    >
      <div className="contenedor relative">
        <EncabezadoSeccion
          numero="07"
          kicker={faq.kicker}
          color="#78DCA0"
          titulo={faq.titulo}
        />

        <div className="mt-12 grid lg:grid-cols-12 lg:gap-12">
          <div className="border-t border-white/[0.07] lg:col-span-9 lg:col-start-4">
            {faq.items.map((item) => (
              <details
                key={item.pregunta}
                className="group border-b border-white/[0.07]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-pretty text-base font-semibold text-espuma transition-colors hover:text-manglar sm:text-lg [&::-webkit-details-marker]:hidden">
                  {item.pregunta}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-xl font-light text-manglar transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>

                <p className="cuerpo max-w-[62ch] pb-7 text-pretty text-bruma">
                  {item.respuesta}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
