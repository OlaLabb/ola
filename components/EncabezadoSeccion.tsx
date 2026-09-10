/**
 * Encabezado comun a todas las secciones.
 * El rail izquierdo (numero + etiqueta) se repite en toda la pagina: da ritmo
 * de laboratorio y, en escritorio, usa la columna que antes quedaba vacia.
 */
export default function EncabezadoSeccion({
  numero,
  kicker,
  color,
  titulo,
  sub,
}: {
  numero: string;
  kicker: string;
  color: string;
  titulo?: string;
  sub?: string;
}) {
  return (
    <header className="grid gap-6 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-3">
        <div className="mb-4 h-px w-8" style={{ background: color }} />
        <p className="font-mono text-xs tracking-[0.18em]" style={{ color }}>
          {numero}
        </p>
        <p className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-bruma">
          {kicker}
        </p>
      </div>

      <div className="lg:col-span-9">
        {titulo && <h2 className="titulo-seccion text-balance">{titulo}</h2>}
        {sub && <p className="lead mt-5 max-w-[54ch] text-pretty">{sub}</p>}
      </div>
    </header>
  );
}
