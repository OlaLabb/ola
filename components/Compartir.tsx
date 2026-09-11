"use client";

import { useState } from "react";

import Icono from "@/components/Icono";
import { SITE_URL, compartir } from "@/content/site";

/**
 * Compartir la ola.
 * Usa el menu nativo del sistema cuando existe (celulares) y, si no, copia el
 * enlace al portapapeles y avisa. Si el usuario cancela el menu nativo no pasa
 * nada: cancelar no es un error que haya que contarle.
 */
export default function Compartir() {
  const [copiado, setCopiado] = useState(false);

  async function alCompartir() {
    const datos = {
      title: compartir.titulo,
      text: compartir.texto,
      url: SITE_URL,
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(datos);
        return;
      } catch {
        return;
      }
    }

    try {
      await navigator.clipboard.writeText(SITE_URL);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      // Sin portapapeles (http o navegador viejo): el enlace sigue en la barra.
    }
  }

  return (
    <button
      type="button"
      onClick={alCompartir}
      className="boton-linea inline-flex items-center gap-2"
    >
      <Icono nombre="ola" className="h-4 w-4 flex-none" />
      <span aria-live="polite">{copiado ? compartir.copiado : compartir.label}</span>
    </button>
  );
}
