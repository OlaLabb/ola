/* ---------------------------------------------------------------------------
 * ICONOS
 * ---------------------------------------------------------------------------
 * Todos los iconos de la pagina, en un solo sitio. Son SVG propios, de linea
 * fina, hermanos de la doble ola del logo: mismo trazo redondeado, misma caja
 * de 24, sin relleno.
 *
 * El color NO vive aqui: el trazo es `currentColor`, asi que el icono se tine
 * con el `color` de quien lo contiene. Eso permite usar el mismo icono sobre
 * noche (acentos normales) y sobre espuma (la familia tinta.*) sin duplicarlo.
 *
 * Para agregar uno: una entrada mas en TRAZOS. Nada de SVG sueltos en los
 * componentes — si un icono se dibuja dos veces, es que le falta nombre.
 * ------------------------------------------------------------------------- */

/** El trazo de cada icono, ya en la caja de 24x24. */
const TRAZOS = {
  /** Las llaves { } — lo primero que ves al abrir codigo de verdad. */
  programacion:
    "M10.2 4.5h-.7A2.5 2.5 0 0 0 7 7v2.5A2.5 2.5 0 0 1 4.5 12 2.5 2.5 0 0 1 7 14.5V17a2.5 2.5 0 0 0 2.5 2.5h.7 M13.8 4.5h.7A2.5 2.5 0 0 1 17 7v2.5a2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0-2.5 2.5V17a2.5 2.5 0 0 1-2.5 2.5h-.7",
  /** Un chip con sus patas y su nucleo: la maquina que aprende. */
  ia:
    "M7.6 8.8a1.2 1.2 0 0 1 1.2-1.2h6.4a1.2 1.2 0 0 1 1.2 1.2v6.4a1.2 1.2 0 0 1-1.2 1.2H8.8a1.2 1.2 0 0 1-1.2-1.2V8.8Z M10.6 10.6h2.8v2.8h-2.8z M10 7.6V4.4 M14 7.6V4.4 M10 16.4v3.2 M14 16.4v3.2 M7.6 10H4.4 M7.6 14H4.4 M16.4 10h3.2 M16.4 14h3.2",
  /** El bombillo: la idea que se prende. */
  innovacion:
    "M12 3.4a5.4 5.4 0 0 0-3.1 9.8c.7.5 1.1 1.3 1.1 2.2v.5h4v-.5c0-.9.4-1.7 1.1-2.2A5.4 5.4 0 0 0 12 3.4Z M10 18.4h4 M10.8 20.8h2.4",
  /** Tres barras que suben: los numeros contando algo. */
  datos:
    "M4.2 20h15.6 M8 20v-4.4 M12 20v-8 M16 20v-11.6",
  /** El pincel: hacer que la tecnologia se sienta bien. */
  diseno:
    "M17.4 3.9 20.1 6.6a1.4 1.4 0 0 1 0 2l-6.6 6.6-4.7-4.7 6.6-6.6a1.4 1.4 0 0 1 2 0Z M11.5 13.1 8.8 10.4 M8.8 10.4 6.4 12.8a3.4 3.4 0 0 0 4.8 4.8l2.4-2.4 M6.9 17.3c-.5 1.6-1.5 2.5-3.2 2.8.3-1.7 1.2-2.7 2.8-3.2",
  /** El engranaje: lo que se mueve solo. Generado, no dibujado a mano. */
  automatizacion:
    "M11.02 3.76 12.98 3.76 13.52 6.61 14.74 7.11 17.14 5.48 18.52 6.86 16.89 9.26 17.39 10.48 20.24 11.02 20.24 12.98 17.39 13.52 16.89 14.74 18.52 17.14 17.14 18.52 14.74 16.89 13.52 17.39 12.98 20.24 11.02 20.24 10.48 17.39 9.26 16.89 6.86 18.52 5.48 17.14 7.11 14.74 6.61 13.52 3.76 12.98 3.76 11.02 6.61 10.48 7.11 9.26 5.48 6.86 6.86 5.48 9.26 7.11 10.48 6.61Z M12 9.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z",
  /** El escudo con su visto: proteger lo de los demas. */
  seguridad:
    "M12 3.2 5 6v5.4c0 4.3 2.9 7.9 7 9.4 4.1-1.5 7-5.1 7-9.4V6l-7-2.8Z M9.2 12.1l2 2 3.6-3.9",
  /** Para el camino de redes y nube. */
  nube:
    "M7.4 19h9.1a3.9 3.9 0 0 0 .5-7.77 5.4 5.4 0 0 0-10.2-1.3A3.9 3.9 0 0 0 7.4 19Z",
  /** La doble ola del logo, reducida a 24. Bitacora y boton de compartir. */
  ola:
    "M2.6 9.6q3.1-3.4 6.2 0t6.2 0 6.4 0 M2.6 15.2q3.1-3.4 6.2 0t6.2 0 6.4 0",
  /** Visto: paso cumplido de la bitacora y reto completado del laboratorio. */
  hecho:
    "M5.6 12.6 10 17 18.4 8",
  /** Lo que viene: el paso proximo de la bitacora. */
  reloj:
    "M12 3.6a8.4 8.4 0 1 0 0 16.8 8.4 8.4 0 0 0 0-16.8Z M12 7.2V12l3.2 2",
  /** Play del laboratorio. */
  ejecutar:
    "M8.4 5.4 19 12 8.4 18.6Z",
  /** Volver a correr el reto. Arco generado con su punta en la tangente. */
  repetir:
    "M17.73 16.02A7 7 0 1 1 16.02 6.27 M16.02 6.27 12.82 6.27 M16.02 6.27 14.93 3.26",
} as const;

export type NombreIcono = keyof typeof TRAZOS;

export type IconoProps = {
  nombre: NombreIcono;
  /** Tamano y color se dan por clases; el trazo hereda el color del contenedor. */
  className?: string;
  /**
   * Solo cuando el icono carga significado que el texto no da. Sin titulo el
   * icono es decorativo y se esconde de los lectores de pantalla, que es lo
   * que corresponde casi siempre.
   */
  titulo?: string;
  /** Grosor del trazo. 1.5 es el de la pagina; sube a 1.75 en tamanos grandes. */
  grosor?: number;
};

export default function Icono({
  nombre,
  className = "h-6 w-6",
  titulo,
  grosor = 1.5,
}: IconoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={grosor}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={titulo ? "img" : undefined}
      aria-hidden={titulo ? undefined : true}
      focusable="false"
    >
      {titulo ? <title>{titulo}</title> : null}
      <path d={TRAZOS[nombre]} />
    </svg>
  );
}
