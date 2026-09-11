"use client";

import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";

import EncabezadoSeccion from "@/components/EncabezadoSeccion";
import Icono from "@/components/Icono";
import { consola } from "@/content/site";

/* ---------------------------------------------------------------------------
 * EL LABORATORIO
 * ---------------------------------------------------------------------------
 * Cuatro retos en una terminal. La regla que manda aqui: el codigo que se ve
 * es EXACTAMENTE el que corre — los inputs estan incrustados dentro del propio
 * codigo, no en un formulario aparte, y `ejecutar` repite la misma operacion
 * linea por linea.
 *
 * Pestanas con el patron ARIA de tabs (flechas, Inicio/Fin, roving tabindex),
 * el mismo de "Los caminos". Los cuatro paneles se renderizan siempre y los
 * inactivos van con `hidden`: asi todo el texto viaja en el HTML y cada reto
 * conserva lo que el estudiante escribio.
 * ------------------------------------------------------------------------- */

/** Tokens de color del codigo. */
function K({ children }: { children: React.ReactNode }) {
  return <span className="text-coral">{children}</span>;
}
function S({ children }: { children: React.ReactNode }) {
  return <span className="text-manglar">{children}</span>;
}
function N({ children }: { children: React.ReactNode }) {
  return <span className="text-oceano">{children}</span>;
}

/** Campo incrustado en el codigo: el input ES parte de la linea. */
function Campo({
  valor,
  alCambiar,
  etiqueta,
  pordefecto,
  ancho,
  tipo = "text",
}: {
  valor: string;
  alCambiar: (v: string) => void;
  etiqueta: string;
  pordefecto: string;
  ancho: string;
  tipo?: "text" | "number" | "date";
}) {
  return (
    <input
      type={tipo}
      value={valor}
      onChange={(e) => alCambiar(e.target.value)}
      aria-label={etiqueta}
      placeholder={pordefecto || etiqueta}
      maxLength={tipo === "text" ? 18 : undefined}
      min={tipo === "number" ? 0 : undefined}
      max={tipo === "number" ? 5 : undefined}
      step={tipo === "number" ? 0.1 : undefined}
      inputMode={tipo === "number" ? "decimal" : undefined}
      className={`${ancho} min-w-0 rounded-sm border-b border-dashed border-manglar/50 bg-transparent px-1 py-1.5 font-mono sm:py-1 text-manglar caret-manglar outline-none transition-colors placeholder:text-bruma/35 focus:border-manglar [appearance:textfield] [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
    />
  );
}

/** Una linea de codigo: envuelve en pantallas angostas en vez de desbordarse. */
function Linea({
  sangria = 0,
  children,
}: {
  sangria?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-wrap items-center gap-y-2 whitespace-pre-wrap break-words text-espuma/80"
      style={{ paddingLeft: `${sangria * 1.25}rem` }}
    >
      {children}
    </div>
  );
}

type Salida = { texto: string; aviso?: boolean };

export default function Consola() {
  const [activo, setActivo] = useState(0);
  const chips = useRef<Array<HTMLButtonElement | null>>([]);

  const [nombre, setNombre] = useState("");
  const [notas, setNotas] = useState(["", "", ""]);
  const [curso, setCurso] = useState(["", "", "", ""]);
  const [fecha, setFecha] = useState("");

  const [salidas, setSalidas] = useState<Salida[]>([{ texto: "" }, { texto: "" }, { texto: "" }, { texto: "" }]);
  const [hechos, setHechos] = useState([false, false, false, false]);

  const completo = hechos.every(Boolean);

  /** Guarda la salida del reto `i` y lo marca como surfeado. */
  function escribir(i: number, salida: Salida) {
    setSalidas((prev) => prev.map((s, j) => (j === i ? salida : s)));
    if (!salida.aviso) {
      setHechos((prev) => prev.map((h, j) => (j === i ? true : h)));
    }
  }

  /** Lee un campo: si esta vacio, corre con el valor por defecto. */
  function leer(valor: string, i: number, j = 0) {
    return valor.trim() || consola.retos[i].campos[j].pordefecto;
  }

  function numero(valor: string, i: number, j: number) {
    return Number(leer(valor, i, j).replace(",", ".")) || 0;
  }

  function ejecutar(i: number, e?: FormEvent<HTMLFormElement>) {
    e?.preventDefault();

    if (i === 0) {
      const hola = (n: string) => "¡" + n + ", acabas de programar! 🌊";
      escribir(0, { texto: hola(leer(nombre, 0)) });
      return;
    }

    if (i === 1) {
      const valores = [numero(notas[0], 1, 0), numero(notas[1], 1, 1), numero(notas[2], 1, 2)];
      const promedio = (valores[0] + valores[1] + valores[2]) / 3;
      escribir(1, {
        texto:
          promedio >= 3.0
            ? "Vas pasando con " + promedio.toFixed(1) + " 🎉"
            : "Vas en " + promedio.toFixed(1) + "... ¡a remar! 📚",
      });
      return;
    }

    if (i === 2) {
      const lista = curso.map((c, j) => leer(c, 2, j));
      const elegido = lista[Math.floor(Math.random() * lista.length)];
      escribir(2, { texto: "Hoy presenta: " + elegido + " 😱" });
      return;
    }

    if (!fecha) {
      escribir(3, { texto: consola.avisoFecha, aviso: true });
      return;
    }
    const nacimiento = new Date(fecha);
    const hoy = new Date();
    const dias = Math.floor((hoy.getTime() - nacimiento.getTime()) / 86400000);
    escribir(3, {
      texto: "Llevas " + dias.toLocaleString() + " días en este mundo 🤯",
    });
  }

  function mover(destino: number) {
    const i = (destino + consola.retos.length) % consola.retos.length;
    setActivo(i);
    chips.current[i]?.focus();
  }

  function alTeclado(e: KeyboardEvent<HTMLDivElement>) {
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        mover(activo + 1);
        break;
      case "ArrowLeft":
        e.preventDefault();
        mover(activo - 1);
        break;
      case "Home":
        e.preventDefault();
        mover(0);
        break;
      case "End":
        e.preventDefault();
        mover(consola.retos.length - 1);
        break;
      default:
        break;
    }
  }

  /** El codigo de cada reto, con sus campos dentro. */
  const codigos = [
    <>
      <Linea>
        <K>function</K>
        <span>{" hola(nombre) {"}</span>
      </Linea>
      <Linea sangria={1}>
        <K>return</K>
        <span>{" "}</span>
        <S>{'"¡"'}</S>
        <span>{" + nombre + "}</span>
        <S>{'", acabas de programar! 🌊"'}</S>
        <span>{";"}</span>
      </Linea>
      <Linea>
        <span>{"}"}</span>
      </Linea>
      <Linea>
        <span>{"hola("}</span>
        <S>{'"'}</S>
        <Campo
          valor={nombre}
          alCambiar={setNombre}
          etiqueta={consola.retos[0].campos[0].etiqueta}
          pordefecto={consola.retos[0].campos[0].pordefecto}
          ancho="w-[12ch]"
        />
        <S>{'"'}</S>
        <span>{");"}</span>
      </Linea>
    </>,

    <>
      <Linea>
        <K>const</K>
        <span>{" notas = ["}</span>
        {notas.map((n, j) => (
          <span key={j} className="flex items-center">
            <Campo
              valor={n}
              alCambiar={(v) =>
                setNotas((prev) => prev.map((x, k) => (k === j ? v : x)))
              }
              etiqueta={consola.retos[1].campos[j].etiqueta}
              pordefecto={consola.retos[1].campos[j].pordefecto}
              ancho="w-[5ch]"
              tipo="number"
            />
            {j < 2 && <span>{", "}</span>}
          </span>
        ))}
        <span>{"];"}</span>
      </Linea>
      <Linea>
        <K>const</K>
        <span>{" promedio = (notas["}</span>
        <N>0</N>
        <span>{"] + notas["}</span>
        <N>1</N>
        <span>{"] + notas["}</span>
        <N>2</N>
        <span>{"]) / "}</span>
        <N>3</N>
        <span>{";"}</span>
      </Linea>
      <Linea>
        <K>if</K>
        <span>{" (promedio >= "}</span>
        <N>3.0</N>
        <span>{") {"}</span>
      </Linea>
      <Linea sangria={1}>
        <span>{"console.log("}</span>
        <S>{'"Vas pasando con "'}</S>
        <span>{" + promedio.toFixed("}</span>
        <N>1</N>
        <span>{") + "}</span>
        <S>{'" 🎉"'}</S>
        <span>{");"}</span>
      </Linea>
      <Linea>
        <span>{"} "}</span>
        <K>else</K>
        <span>{" {"}</span>
      </Linea>
      <Linea sangria={1}>
        <span>{"console.log("}</span>
        <S>{'"Vas en "'}</S>
        <span>{" + promedio.toFixed("}</span>
        <N>1</N>
        <span>{") + "}</span>
        <S>{'"... ¡a remar! 📚"'}</S>
        <span>{");"}</span>
      </Linea>
      <Linea>
        <span>{"}"}</span>
      </Linea>
    </>,

    <>
      <Linea>
        <K>const</K>
        <span>{" curso = ["}</span>
        {curso.map((c, j) => (
          <span key={j} className="flex items-center">
            <S>{'"'}</S>
            <Campo
              valor={c}
              alCambiar={(v) =>
                setCurso((prev) => prev.map((x, k) => (k === j ? v : x)))
              }
              etiqueta={consola.retos[2].campos[j].etiqueta}
              pordefecto={consola.retos[2].campos[j].pordefecto}
              ancho="w-[8ch]"
            />
            <S>{'"'}</S>
            {j < 3 && <span>{", "}</span>}
          </span>
        ))}
        <span>{"];"}</span>
      </Linea>
      <Linea>
        <K>const</K>
        <span>{" elegido = curso[Math.floor(Math.random() * curso.length)];"}</span>
      </Linea>
      <Linea>
        <span>{"console.log("}</span>
        <S>{'"Hoy presenta: "'}</S>
        <span>{" + elegido + "}</span>
        <S>{'" 😱"'}</S>
        <span>{");"}</span>
      </Linea>
    </>,

    <>
      <Linea>
        <K>const</K>
        <span>{" nacimiento = "}</span>
        <K>new</K>
        <span>{" Date("}</span>
        <S>{'"'}</S>
        <Campo
          valor={fecha}
          alCambiar={setFecha}
          etiqueta={consola.retos[3].campos[0].etiqueta}
          pordefecto={consola.retos[3].campos[0].pordefecto}
          ancho="w-[10.5rem]"
          tipo="date"
        />
        <S>{'"'}</S>
        <span>{");"}</span>
      </Linea>
      <Linea>
        <K>const</K>
        <span>{" hoy = "}</span>
        <K>new</K>
        <span>{" Date();"}</span>
      </Linea>
      <Linea>
        <K>const</K>
        <span>{" dias = Math.floor((hoy - nacimiento) / "}</span>
        <N>86400000</N>
        <span>{");"}</span>
      </Linea>
      <Linea>
        <span>{"console.log("}</span>
        <S>{'"Llevas "'}</S>
        <span>{" + dias.toLocaleString() + "}</span>
        <S>{'" días en este mundo 🤯"'}</S>
        <span>{");"}</span>
      </Linea>
    </>,
  ];

  return (
    <section
      id={consola.id}
      className="superficie-clara relative py-20 sm:py-28"
    >
      <div className="contenedor relative">
        <EncabezadoSeccion
          numero="03"
          kicker={consola.kicker}
          color="#217E46"
          titulo={consola.titulo}
          sub={consola.sub}
          tono="claro"
        />

        <div className="mt-12 grid lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-9 lg:col-start-4">
            <div className="superficie-oscura overflow-hidden rounded-3xl border border-noche/15 bg-[#0E141B] shadow-[0_24px_60px_-30px_rgba(10,14,18,0.75)]">
              {/* Barra de la terminal: tres puntos y el nombre de la sesion. */}
              <div className="flex items-center gap-2 border-b border-white/[0.07] px-5 py-3">
                <span aria-hidden="true" className="flex gap-1.5">
                  <span className="block h-2.5 w-2.5 rounded-full bg-coral/70" />
                  <span className="block h-2.5 w-2.5 rounded-full bg-atardecer/70" />
                  <span className="block h-2.5 w-2.5 rounded-full bg-manglar/70" />
                </span>
                <span className="ml-2 font-mono text-[0.7rem] text-bruma/70">
                  {consola.etiqueta}
                </span>
              </div>

              {/* Pestanas: un reto por pestana, con su check al completarlo. */}
              <div
                role="tablist"
                aria-label="Retos del laboratorio"
                onKeyDown={alTeclado}
                className="flex flex-wrap gap-1.5 border-b border-white/[0.07] px-3 py-3 sm:px-5"
              >
                {consola.retos.map((reto, i) => {
                  const seleccionado = i === activo;
                  return (
                    <button
                      key={reto.id}
                      ref={(el) => {
                        chips.current[i] = el;
                      }}
                      type="button"
                      role="tab"
                      id={`reto-${reto.id}`}
                      aria-selected={seleccionado}
                      aria-controls={`panel-${reto.id}`}
                      tabIndex={seleccionado ? 0 : -1}
                      onClick={() => setActivo(i)}
                      className={`flex items-center gap-1.5 rounded-full border px-3 py-2 font-mono text-[0.7rem] transition-colors sm:text-xs ${
                        seleccionado
                          ? "border-manglar/50 bg-manglar/10 text-manglar"
                          : "border-white/[0.08] text-bruma hover:border-white/20 hover:text-espuma"
                      }`}
                    >
                      {hechos[i] && (
                        <>
                          <Icono
                            nombre="hecho"
                            className="h-3.5 w-3.5 flex-none text-manglar"
                            grosor={2}
                          />
                          <span className="sr-only">{consola.completado}:</span>
                        </>
                      )}
                      {reto.tab}
                    </button>
                  );
                })}
              </div>

              {consola.retos.map((reto, i) => (
                <form
                  key={reto.id}
                  role="tabpanel"
                  id={`panel-${reto.id}`}
                  aria-labelledby={`reto-${reto.id}`}
                  hidden={i !== activo}
                  onSubmit={(e) => ejecutar(i, e)}
                  className="p-5 sm:p-8"
                >
                  {/* El codigo, con los campos del estudiante dentro. */}
                  <div className="space-y-2 overflow-x-auto font-mono text-[0.82rem] leading-relaxed [font-variant-ligatures:none] sm:text-sm">
                    {codigos[i]}
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      className="boton-accion inline-flex items-center gap-2"
                    >
                      <Icono nombre="ejecutar" className="h-4 w-4" />
                      {consola.boton}
                    </button>

                    {/* Repetir el azar sin recargar: solo tiene sentido en el
                        reto 3 y despues de la primera ejecucion. */}
                    {i === 2 && salidas[2].texto && (
                      <button
                        type="button"
                        onClick={() => ejecutar(2)}
                        className="boton-linea inline-flex items-center gap-2"
                      >
                        <Icono nombre="repetir" className="h-4 w-4" />
                        {consola.otraVez}
                      </button>
                    )}
                  </div>

                  {/* La consola de salida: el alto ya esta reservado. */}
                  <p
                    aria-live="polite"
                    className={`mt-7 min-h-[3.5rem] border-t border-white/[0.07] pt-6 font-mono text-sm leading-relaxed sm:text-base ${
                      salidas[i].aviso ? "text-atardecer" : "text-manglar"
                    }`}
                  >
                    {salidas[i].texto ? (
                      <>
                        <span aria-hidden="true" className="opacity-50">
                          &gt;{" "}
                        </span>
                        {salidas[i].texto}
                      </>
                    ) : (
                      <span aria-hidden="true" className="text-bruma/30">
                        &gt; _
                      </span>
                    )}
                  </p>

                  {/* El concepto: la frase que convierte el juego en clase. */}
                  <p className="mt-6 text-pretty text-sm leading-relaxed text-bruma">
                    <Icono
                      nombre="innovacion"
                      className="mr-1.5 inline-block h-[1.1em] w-[1.1em] translate-y-[0.15em] text-manglar"
                    />
                    <span className="font-semibold text-espuma">
                      {consola.conceptoEtiqueta}
                    </span>{" "}
                    {reto.concepto}
                  </p>
                </form>
              ))}
            </div>

            {/* El remate: solo aparece cuando los cuatro retos ya corrieron. */}
            {completo && (
              <div
                role="status"
                className="mt-6 rounded-3xl border border-tinta-manglar/35 bg-tinta-manglar/[0.07] p-6 sm:p-8"
              >
                <p className="text-pretty text-[clamp(1.1rem,2vw,1.4rem)] font-semibold leading-snug text-tinta-manglar">
                  {consola.final.texto}
                </p>
                <a
                  href={consola.final.cta.href}
                  className="mt-4 inline-block text-pretty text-sm font-semibold text-tinta-oceano underline decoration-tinta-oceano/40 underline-offset-4 transition-colors hover:decoration-tinta-oceano"
                >
                  {consola.final.cta.label}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
