import { Wordmark } from "@/components/Wordmark";
import { footer } from "@/content/site";

export default function Footer() {
  return (
    <footer className="bg-profundo-abismo">
      <div className="contenedor grid gap-8 pb-12 pt-14 sm:pb-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Wordmark tamano="grande" conSello />
          <p className="mt-4 text-sm text-bruma">{footer.tagline}</p>
        </div>

        <div className="lg:col-span-7 lg:pt-2">
          <p className="overflow-x-auto font-mono text-xs text-manglar sm:text-sm">
            {footer.codigo}
          </p>
          <p className="mt-8 border-t border-white/[0.07] pt-6 text-pretty text-xs leading-relaxed text-bruma/80 sm:text-sm">
            {footer.legal}
          </p>
        </div>
      </div>
    </footer>
  );
}
