import { brand } from "@/content/site";

/**
 * La marca siempre en minusculas: "ola lab".
 * El sello "by gimti </>" acompaña al wordmark; el </> toma el color del contexto.
 *
 * Sobre `espuma` el wordmark de siempre es invisible: `espuma` sobre `espuma`
 * da 1.0 de contraste y `oceano` da 1.78. Por eso hay dos tonos — el claro usa
 * `noche` y `tinta.oceano` (17.9 y 4.65), que es la misma regla del resto de
 * la pagina: los acentos crudos son de la noche, `tinta.*` es de la espuma.
 */
export function Wordmark({
  tamano = "base",
  conSello = false,
  tono = "oscuro",
}: {
  tamano?: "base" | "grande";
  conSello?: boolean;
  /** `claro` = va sobre fondo claro. */
  tono?: "oscuro" | "claro";
}) {
  const claro = tono === "claro";

  return (
    <span className="inline-flex items-baseline gap-2 lowercase">
      <span
        className={
          tamano === "grande"
            ? "font-extrabold tracking-tight text-2xl sm:text-3xl"
            : "font-extrabold tracking-tight text-lg"
        }
      >
        <span className={claro ? "text-noche" : "text-espuma"}>ola</span>{" "}
        <span className={claro ? "text-tinta-oceano" : "text-oceano"}>lab</span>
      </span>
      {conSello && <Sello tono={tono} />}
    </span>
  );
}

export function Sello({
  className = "",
  tono = "oscuro",
}: {
  className?: string;
  tono?: "oscuro" | "claro";
}) {
  // En claro va sin transparencia: `tinta.texto` rebajado deja de pasar AA.
  const color = tono === "claro" ? "text-tinta-texto" : "text-bruma/80";

  return (
    <span
      className={`font-mono text-[0.7rem] tracking-tight ${color} lowercase ${className}`}
    >
      {brand.sello} <span aria-hidden="true">&lt;/&gt;</span>
    </span>
  );
}
