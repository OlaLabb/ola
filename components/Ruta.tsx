import EncabezadoSeccion from "@/components/EncabezadoSeccion";
import Icono from "@/components/Icono";
import { ruta } from "@/content/site";

/**
 * Bitacora: tres pasos en una linea de tiempo vertical.
 * Solo el paso en curso va resaltado — es el que explica por que la
 * convocatoria viene justo despues.
 */
export default function Ruta() {
  return (
    <section id={ruta.id} className="relative bg-noche py-20 sm:py-28">
      <div aria-hidden="true" className="absolute inset-0 textura-rejilla" />

      <div className="contenedor relative">
        <EncabezadoSeccion
          numero="06"
          kicker={ruta.kicker}
          color="#5AC8EB"
          titulo={ruta.titulo}
        />

        <div className="mt-12 grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-9 lg:col-start-4">
            <ol className="relative space-y-4 border-l border-white/[0.12] pl-7 sm:pl-9">
              {ruta.pasos.map((paso, i) => {
                const enCurso = paso.estado === "encurso";
                return (
                  <li
                    key={paso.titulo}
                    data-revelar
                    style={{ "--revelar-orden": i } as React.CSSProperties}
                    className="relative"
                  >
                    {/* El punto que se monta sobre la linea de tiempo. */}
                    <span
                      aria-hidden="true"
                      className="absolute -left-[2.3rem] top-5 flex h-6 w-6 items-center justify-center rounded-full bg-noche sm:-left-[2.8rem]"
                      style={{ color: paso.color }}
                    >
                      <Icono nombre={paso.icono} className="h-[1.15rem] w-[1.15rem]" />
                    </span>

                    <div
                      className={`relative overflow-hidden rounded-2xl border p-5 sm:p-6 ${
                        enCurso ? "" : "border-white/[0.08] bg-white/[0.02]"
                      }`}
                      style={
                        enCurso
                          ? {
                              borderColor: `${paso.color}59`,
                              background: `${paso.color}12`,
                            }
                          : undefined
                      }
                    >
                      <p
                        className="font-mono text-[0.68rem] uppercase tracking-[0.2em]"
                        style={{ color: paso.color }}
                      >
                        {paso.etiqueta}
                      </p>
                      <p
                        className={`mt-2 text-pretty leading-snug ${
                          enCurso
                            ? "text-lg font-semibold text-espuma sm:text-xl"
                            : "text-base font-semibold text-bruma"
                        }`}
                      >
                        {paso.titulo}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <p className="mt-8 text-pretty text-sm text-bruma">{ruta.nota}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
