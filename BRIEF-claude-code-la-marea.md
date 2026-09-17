# Brief para Claude Code — Sección "La Marea" en ola.olalabgimti.workers.dev

## Qué hay que hacer
Implementar la nueva sección **"La Marea"** en el sitio de OLA LAB, tomando como referencia
exacta el mockup `olalab-seccion-la-marea.html` (autocontenido: HTML + CSS + JS). El mockup
está aprobado tal cual: respetar diseño, textos, colores, comportamiento y responsive.
Adaptar al stack del sitio (componentes, tokens y sistema de estilos que ya existan),
sin cambiar el resultado visual.

## Dónde va en la página
Reemplaza la sección actual **"Aquí no hay clases. Hay olas."** (la de las 7 olas).
Orden final de la página:

1. Hero con el mar animado (no se toca)
2. **La Marea** ← nueva sección, en el mismo lugar donde hoy están las tarjetas de las olas
3. Mini-laboratorio (los 4 retos de código)
4. Los que traen la ola (voluntarios)
5. FAQ de colegios
6. Timeline "¿Dónde va la ola?"
7. Empresas aliadas
8. Footer

Actualizar el enlace del menú que hoy apunta a la sección de las olas para que apunte a `#la-marea`.

## Reglas de contenido (no cambiar)
- **Orden oficial de las olas:** 1 Innovación · 2 Diseño · 3 Programación · 4 Datos · 5 Automatización · 6 IA · 7 Seguridad.
- **Colores por ola (ya existen en el sitio, usar los mismos tokens):**
  Innovación `#5AC8EB`, Diseño `#E6A4BF`, Programación `#78DCA0`, Datos `#94D6D7`,
  Automatización `#998DF8`, IA `#F09079`, Seguridad `#658BE4`.
- Paleta base: noche `#0A0E12`, espuma `#F2F7F5`, océano `#5AC8EB`, manglar `#78DCA0`,
  coral `#FFB25E` **solo para el CTA "Traer la Marea a mi colegio"**.
- Tipografía Poppins (la del sitio). Las líneas de "código" en monoespaciada.
- Los textos del mockup van tal cual (voseo incluido). Si algún texto ya vive en un archivo
  de contenido/i18n del sitio, moverlo ahí sin cambiar la redacción.
- Quitar la franja gris de arriba del mockup que dice "Mockup · Sección nueva…": es solo
  una nota del prototipo, no va en producción.

## Comportamiento (copiar del JS del mockup)
- Al hacer clic en un nodo de la travesía cambia: el detalle (recibís / te llevás / le pasás a la
  siguiente), el color activo (`--ola`), la pantalla del celular "Marea Fresca" y la línea de código.
- La ola de color (`#ola-viva`) avanza por la travesía hasta el nodo activo; los nodos ya
  surfeados quedan marcados (`.done`).
- Botones "Ola anterior" / "Surfear la siguiente ola"; en la ola 7 el botón pasa a
  "Ir a la Feria de la Marea" y hace scroll al cierre.
- Los dos CTAs de las modalidades llevan a la sección/formulario de colegios (`#colegios`
  en el mockup: usar el ancla real del sitio).
- Respetar `prefers-reduced-motion` (sin animaciones si está activo).

## Responsive
- ≤ 900 px: detalle y celular en una sola columna; modalidades en una columna.
- ≤ 700 px: la ola SVG se oculta y los 7 nodos pasan a grilla de 4 columnas.
- Sin scroll horizontal en ningún ancho.

## FAQ de colegios (agregar una pregunta)
**¿Tenemos que hacer las siete olas?**
No. Cada ola se surfea sola y deja algo construido. Pero si el colegio puede recibir la Marea
completa, cada estudiante termina con un producto propio y lo presenta en la Feria de la Marea.
Siempre proponemos la Marea; la marejada de una sola ola es la puerta de entrada.

## Accesibilidad
- Los nodos son `<button>` con `aria-pressed`; mantener foco visible (coral).
- Contraste de textos ≥ 4.5:1 sobre fondo noche (los grises del mockup ya cumplen).

## Criterio de "listo"
La sección se ve y se comporta igual que el mockup abierto en el navegador, en desktop y en
celular, integrada con el hero arriba y el mini-laboratorio abajo, sin romper el resto del sitio.
