import { brand } from "@/content/site";

/**
 * La marca siempre en minusculas: "ola lab".
 * El sello "by gimti </>" acompaña al wordmark; el </> toma el color del contexto.
 */
export function Wordmark({
  tamano = "base",
  conSello = false,
}: {
  tamano?: "base" | "grande";
  conSello?: boolean;
}) {
  return (
    <span className="inline-flex items-baseline gap-2 lowercase">
      <span
        className={
          tamano === "grande"
            ? "font-extrabold tracking-tight text-2xl sm:text-3xl"
            : "font-extrabold tracking-tight text-lg"
        }
      >
        <span className="text-espuma">ola</span>{" "}
        <span className="text-oceano">lab</span>
      </span>
      {conSello && <Sello />}
    </span>
  );
}

export function Sello({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-mono text-[0.7rem] tracking-tight text-bruma/80 lowercase ${className}`}
    >
      {brand.sello} <span aria-hidden="true">&lt;/&gt;</span>
    </span>
  );
}
