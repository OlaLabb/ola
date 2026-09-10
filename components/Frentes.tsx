import EncabezadoSeccion from "@/components/EncabezadoSeccion";
import { frentes, type Frente } from "@/content/site";

/**
 * Cuatro filas, no cuatro tarjetas iguales.
 * Cada frente se identifica por su color: la barra lateral, el numero grande
 * y el resplandor que aparece al pasar el cursor son del mismo tono.
 */
const COLORES: Record<Frente["color"], { hex: string; clase: string }> = {
  oceano: { hex: "#5AC8EB", clase: "bg-oceano" },
  manglar: { hex: "#78DCA0", clase: "bg-manglar" },
  atardecer: { hex: "#FFB25E", clase: "bg-atardecer" },
  coral: { hex: "#F2A0C0", clase: "bg-coral" },
};

export default function Frentes() {
  return (
    <section id={frentes.id} className="relative bg-noche py-20 sm:py-28">
      <div aria-hidden="true" className="absolute inset-0 textura-rejilla" />

      <div className="contenedor relative">
        <EncabezadoSeccion
          numero="02"
          kicker={frentes.kicker}
          color="#78DCA0"
          titulo={frentes.titulo}
        />

        <ul className="mt-14 border-t border-white/[0.07]">
          {frentes.items.map((frente, i) => {
            const color = COLORES[frente.color];
            return (
              <li
                key={frente.titulo}
                className="group relative border-b border-white/[0.07]"
              >
                {/* Resplandor del color del frente al pasar el cursor. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(70% 120% at 0% 50%, ${color.hex}12, transparent 65%)`,
                  }}
                />

                <div className="relative flex gap-5 py-9 sm:gap-8 sm:py-11">
                  <div
                    aria-hidden="true"
                    className={`w-[3px] shrink-0 rounded-full ${color.clase} opacity-50 transition-opacity duration-300 group-hover:opacity-100`}
                  />

                  <div className="min-w-0 flex-1 lg:grid lg:grid-cols-12 lg:gap-12">
                    <div className="lg:col-span-5">
                      <span
                        aria-hidden="true"
                        className="numero-fantasma block text-[2.25rem] opacity-55 sm:text-[2.75rem]"
                        style={{ color: color.hex }}
                      >
                        0{i + 1}
                      </span>
                      <h3 className="mt-3 text-pretty text-lg font-semibold leading-snug text-espuma sm:text-xl">
                        {frente.titulo}
                      </h3>
                    </div>

                    <p className="cuerpo mt-4 text-pretty text-bruma lg:col-span-7 lg:mt-0 lg:pt-[3.4rem]">
                      {frente.texto}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
