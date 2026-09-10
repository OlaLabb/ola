import { Wordmark } from "@/components/Wordmark";
import { nav } from "@/content/site";

/**
 * Nav minima y sin JS: wordmark + un unico CTA.
 * Nada mas: el objetivo de la pagina es que el CTA no compita con nada.
 */
export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-noche/80 backdrop-blur-md">
      <nav
        aria-label="Principal"
        className="contenedor flex h-16 items-center justify-between gap-4"
      >
        <a href="#inicio" className="shrink-0" aria-label="ola lab — inicio">
          <Wordmark />
        </a>

        <a
          href={nav.ctaHref}
          className="boton-accion px-4 py-2 text-xs sm:px-5 sm:text-sm"
        >
          {nav.cta}
        </a>
      </nav>
    </header>
  );
}
