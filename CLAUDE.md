# CLAUDE.md — OLA LAB

Guía para trabajar en este repositorio. Léela antes de tocar nada.

---

## 1. Qué es OLA LAB

**OLA LAB** es un laboratorio itinerante de tecnología, inteligencia artificial e innovación
para estudiantes de **9°, 10° y 11°** de colegios del **Pacífico colombiano**. Es una
**iniciativa social de GIMTI S.A.S.** (software factory colombiana, Cali, NIT 902.083.819-2).
Gratuito para colegios y estudiantes, siempre.

Frase bandera — es el titular del hero y el corazón de todo:

> **Que la distancia no decida el futuro de nadie.**

Este repo es la **landing page** de la iniciativa. No tiene backend: todos los CTA son
`mailto:` (y WhatsApp cuando se configure el número).

---

## 2. Lenguaje de marca (innegociable)

El vocabulario de marca no es decoración: es la marca. Nunca lo traduzcas a lenguaje
educativo genérico.

| Se dice | Nunca se dice |
| --- | --- |
| una **ola** (cada tema del programa) | clase, módulo, curso, taller, unidad |
| los estudiantes **surfean** las olas | toman, cursan, ven, asisten a |
| **la Marea** (el programa completo) | el pénsum, el plan de estudios, el currículo |
| **marejadas** (las visitas a colegios) | jornadas, eventos, sesiones institucionales |
| los voluntarios **traen la ola** | dictan, imparten, enseñan |

**Las 7 olas** (el orden importa, es el de `content/site.ts`):

1. La Ola de **Programación** — `#78DCA0`
2. La Ola de **IA** — `#FF8A73`
3. La Ola de **Innovación** — `#5AC8EB`
4. La Ola de **Datos** — `#7FD8D8`
5. La Ola de **Diseño** — `#F2A0C0`
6. La Ola de **Automatización** — `#9B8CFF`
7. La Ola de **Seguridad** — `#5A8CEB`

Cada ola tiene **su color propio y no se repite**: el color es lo que la hace reconocible
antes de leer el nombre.

Remate de la página (footer, en monospace):

```
conocimiento.compartir(pacifico) => futuro;
```

El wordmark siempre va **en minúsculas**: `ola lab`, con el sello `by gimti </>`.

---

## 3. Identidad visual

### Paleta

| Token Tailwind | Hex | Uso |
| --- | --- | --- |
| `noche` | `#0A0E12` | fondo base (negro azulado, nunca negro puro) |
| `espuma` | `#F2F7F5` | texto principal |
| `oceano` | `#5AC8EB` | acento cian |
| `manglar` | `#78DCA0` | acento verde |
| `atardecer` | `#FFB25E` | **coral — RESERVADO para CTAs y momentos de acción** |

Tokens de apoyo ya definidos en [`tailwind.config.ts`](tailwind.config.ts): `bruma`
(`#B9C6C4`, texto secundario), `coral` (`#F2A0C0`, Ola de Diseño), `violeta`, `turquesa`, y
la familia `profundo.*` (`#0E3A4A` `#155E75` `#177A9C` `#12303B` `#07202B`) para los fondos
de sección.

**Regla dura:** `atardecer` (`#FFB25E`) es solo para CTAs. Si aparece en un elemento que no
es una llamada a la acción, es un error.

**Segunda regla dura:** el color de la Ola de IA (`#FF8A73`) **nunca** se usa como fondo de
algo con forma de botón (píldora, `rounded-full`, relleno sólido). Está a 24° de tono del
`atardecer` de los CTAs y a esa distancia se confunden. Como texto sobre tarjeta no hay
problema; como relleno, sí. Si hace falta rellenar, se usa `tinta.ia`.

### La paleta clara: `tinta.*`

Toda la paleta está calibrada para brillar sobre `noche` (todos los acentos pasan 8:1 o
más). **Sobre `espuma` se desploma**: `manglar` da 1.55, `oceano` 1.78, `bruma` 1.62 — todos
ilegibles. Por eso existe `tinta.*`: el mismo tono, con la saturación contenida (≤0.62, para
que no quede neón) y bajado hasta pasar AA de texto (≥4.6:1) sobre `espuma`.

| Token | Hex | Sobre espuma |
| --- | --- | --- |
| `tinta.oceano` | `#227893` | 4.65 |
| `tinta.manglar` | `#217E46` | 4.69 |
| `tinta.turquesa` | `#257A7A` | 4.68 |
| `tinta.violeta` | `#6C5BD9` | 4.69 |
| `tinta.coral` | `#CB306C` | 4.64 |
| `tinta.ia` | `#C1462D` | 4.64 |
| `tinta.seguridad` | `#356BD0` | 4.66 |
| `tinta.texto` | `#3E4E54` | 8.01 — el `bruma` de las superficies claras |
| `tinta.linea` | `#C3D0CD` | bordes sutiles |

`tinta.*` es **solo para texto e iconos sobre fondo claro**. Sobre fondo oscuro se siguen
usando los acentos normales.

### Superficies claras

Dos secciones van sobre `espuma` — **el laboratorio y colegios** — porque son los dos
momentos en que la página pide que *hagas* algo, no que leas. Se marcan con la clase
`.superficie-clara`, que corrige en un solo sitio lo que el resto de la página da por
sentado: el texto secundario, el contorno del CTA (que sobre espuma da 1.65 de contraste no
textual y deja de leerse como botón) y el anillo de foco.

Dentro de una sección clara puede haber una **isla oscura** — la terminal del laboratorio —
marcada con `.superficie-oscura`: ahí dentro vuelven a regir las reglas de la noche.

Si añades una sección clara: `.superficie-clara` en el `<section>`, `tono="claro"` en su
`EncabezadoSeccion`, y colores `tinta.*` para todo el texto de acento.

### Tipografía

- **Poppins** (300 cuerpo / 600 títulos / 800 display) — `font-sans`.
- **JetBrains Mono** 400 — `font-mono`, **solo** para fragmentos de código, kickers de
  consola y el remate del footer.

Ambas se cargan con `next/font/google` en [`app/layout.tsx`](app/layout.tsx) y se exponen
como variables CSS (`--font-poppins`, `--font-mono`).

### Íconos

Los íconos deben ser **SVG propios, de línea fina**, coherentes con la **doble ola del
logo** ([`app/icon.svg`](app/icon.svg): dos trazos de ola, uno azul y uno verde,
`stroke-linecap="round"`).

**Nada de emojis en la UI.** Nada de librerías de íconos.

Todos los íconos viven en [`components/Icono.tsx`](components/Icono.tsx), un registro de
trazos en caja de 24×24: `stroke` de 1.5, sin relleno, puntas y esquinas redondeadas. El
color **no** vive en el ícono — el trazo es `currentColor`, así que el mismo ícono sirve
sobre `noche` con los acentos normales y sobre `espuma` con la familia `tinta.*` sin
duplicarse.

```tsx
<Icono nombre="programacion" className="h-7 w-7" />   // decorativo: se esconde de los lectores
<Icono nombre="hecho" titulo="reto completado" />     // con significado: lleva <title>
```

Siete son las marcas de las olas (`programacion` `ia` `innovacion` `datos` `diseno`
`automatizacion` `seguridad`) y se nombran como dato en `content/site.ts`, junto al color;
los otros seis (`nube` `ola` `hecho` `reloj` `ejecutar` `repetir`) son utilitarios. Para
agregar uno: una entrada más en `TRAZOS`. **Si un ícono se dibuja dos veces, es que le falta
nombre** — nada de SVG sueltos en los componentes.

Las excepciones son las piezas que no son íconos sino ilustración: `IconoOlas` e
`IconoCerrar` en [`components/Nav.tsx`](components/Nav.tsx), la olita animada de las
tarjetas en [`components/Olas.tsx`](components/Olas.tsx) y
[`components/OlaDivisoria.tsx`](components/OlaDivisoria.tsx).

> Los emojis dentro de los strings del código de la consola se quedan: son la salida del
> programa del estudiante, no la UI.

---

## 4. Regla innegociable: lenguaje claro

**Todo texto debe entenderlo un estudiante de 15 años sin contexto técnico.**

- Cero jerga. Cero pose de experto. Cero lenguaje institucional o de ONG.
- Tono cercano y con alma. Frases cortas. Se habla de tú.
- Si un término técnico es inevitable, se explica en la misma frase con una imagen concreta.
- Los conceptos se nombran por lo que le pasa al estudiante, no por su etiqueta académica:
  "aprende a hablarle a las máquinas", no "fundamentos de programación imperativa".

Antes de dar por bueno un texto, léelo en voz alta imaginando a un estudiante de 10° en
Guapi. Si suena a folleto, está mal.

---

## 5. Reglas de trabajo

1. **No cambies contenido de secciones que no te pida.** Cada sección tiene texto trabajado
   palabra por palabra. Tocar una sección adyacente "de paso" no es una mejora.
2. **Antes de cada cambio grande, muestra el plan** y espera aprobación. Cambio grande =
   nueva sección, reestructurar una existente, cambiar el flujo de la página, tocar la
   paleta o la tipografía, agregar una dependencia.
3. **El texto visible vive en [`content/site.ts`](content/site.ts)**, no en los componentes.
   Si vas a cambiar una palabra, se cambia ahí.
4. **Sin dependencias nuevas** salvo acuerdo explícito. La página se ve en celulares de gama
   baja con mala conexión: cada kB cuesta.
5. **`prefers-reduced-motion` se respeta siempre.** Toda animación nueva necesita su
   apagado.
6. **Nada de imágenes de mapa de bits.** Mar, divisorias e íconos son SVG; la imagen de
   redes es el único PNG.
7. Los comentarios del código están en español y sin tildes (convención del repo). Mantenla.

---

## 6. Arquitectura

### Stack

Next.js 14 (App Router) · TypeScript (strict) · Tailwind CSS · Framer Motion · export 100%
estático (`output: "export"`) — sin backend, sin SSR, sin funciones.

### Estructura

```
app/
  layout.tsx            Fuentes, metadata/SEO, Open Graph, JSON-LD (Organization)
  page.tsx              El orden de las secciones de la página. Nada más.
  globals.css           Escala tipográfica, clases .contenedor/.display/.boton-*,
                        y TODAS las animaciones CSS (mar, olitas, nav móvil)
  icon.svg              Favicon: la doble ola del logo
  opengraph-image.png   Imagen para compartir (+ .alt.txt con su texto alternativo)
  sitemap.ts robots.ts  Generados desde SITE_URL

content/
  site.ts               ÚNICA fuente de todo el texto visible, colores de datos,
                        SITE_URL, EMAIL, WHATSAPP y los helpers mailto()/whatsapp()

components/             Una sección = un componente. Ver tabla abajo.

public/_headers         Cache de assets (lo leen Cloudflare Pages y Netlify)
```

### Orden de la página ([`app/page.tsx`](app/page.tsx))

El orden cuenta una historia: **primero el viaje completo del estudiante, entero y sin
interrupciones** (gancho → olas → probarlo → a dónde lleva), luego el tramo para colegios, y
al final quienes traen la ola.

| # | Sección | Componente | Fondo |
| --- | --- | --- | --- |
| — | Hero + mar vivo | [`Hero`](components/Hero.tsx) + [`MarVivo`](components/MarVivo.tsx) + [`Estrellas`](components/Estrellas.tsx) | `noche` |
| 01 | Qué es *(+ los 4 frentes)* | [`QueEs`](components/QueEs.tsx) | `profundo` |
| 02 | **Las olas** | [`Olas`](components/Olas.tsx) | degradado → `profundo.abismo` |
| 03 | **Pruébalo** *(el laboratorio)* | [`Consola`](components/Consola.tsx) | **`espuma`** ← claro |
| 04 | Los caminos | [`Caminos`](components/Caminos.tsx) | `profundo.abismo` |
| 05 | Colegios *(+ las preguntas)* | [`Colegios`](components/Colegios.tsx) | **`espuma`** ← claro |
| 06 | Bitácora / ¿dónde va la ola? | [`Ruta`](components/Ruta.tsx) | `noche` |
| — | Trae la ola *(personas + empresas)* | [`TraeLaOla`](components/TraeLaOla.tsx) | `profundo.bruma` |
| — | Footer | [`Footer`](components/Footer.tsx) + [`Compartir`](components/Compartir.tsx) | `profundo.abismo` |

Por qué el laboratorio va **antes** de los caminos: "¿a dónde lleva esto?" solo tiene
sentido después de haber hecho algo, no antes.

Cada cruce oscuro↔claro se cose con una [`OlaDivisoria`](components/OlaDivisoria.tsx). El
trazo de su cresta se dibuja **sobre la sección de arriba**, así que lleva `trazo="oscuro"`
cuando esa sección es clara. Los fondos reales viven en la constante `FONDO` de
`app/page.tsx` para que no haya que adivinarlos.

Transversales: [`Nav`](components/Nav.tsx) (fijo, con `IntersectionObserver` para el enlace
activo), [`EncabezadoSeccion`](components/EncabezadoSeccion.tsx) (el rail de número + kicker
que da ritmo a todas las secciones; acepta `tono="claro"`),
[`Wordmark`](components/Wordmark.tsx), [`Movimiento`](components/Movimiento.tsx)
(`LazyMotion` de Framer Motion — dentro se usa `m.*`, nunca `motion.*`).

El **nav** son cuatro destinos: tres anclas (Las olas · Pruébalo · Colegios) y el CTA "Trae
la ola", que va aparte porque es el único que pide algo.

Solo son *client components* los que lo necesitan: `Hero`, `MarVivo`, `Nav`, `Caminos`,
`Consola`, `Compartir`, `Movimiento`. Todo lo demás se renderiza en el servidor.

### El mini-laboratorio ([`components/Consola.tsx`](components/Consola.tsx))

Es la pieza interactiva de la página: una terminal con **cuatro retos** donde el visitante
deja de leer y escribe su primera línea de código.

La regla que manda aquí: **el código que se ve en pantalla es exactamente el que corre.**
Los `<input>` están **incrustados dentro de las propias líneas de código** (componente
`Campo`), no en un formulario aparte, y la función `ejecutar()` repite la misma operación
línea por línea en JavaScript real.

- Los retos: `saludo` (función) · `notas` (condicional) · `presenta` (lista + azar) ·
  `dias` (fechas y cálculo). Cada uno cierra con una frase "🧠 Lo que acabas de usar" que
  convierte el juego en aprendizaje.
- Pestañas con el **patrón ARIA de tabs** (flechas, Inicio/Fin, roving `tabIndex`) — el
  mismo de "Los caminos". Los cuatro paneles se renderizan siempre y los inactivos van con
  `hidden`, así el texto viaja en el HTML y cada reto conserva lo escrito.
- `pordefecto` en `content/site.ts` es a la vez placeholder y valor de ejecución: **nunca se
  corre en blanco**.
- Al completar los cuatro aparece el remate que empuja a la convocatoria de voluntarios.
- **Los textos viven en `consola` en [`content/site.ts`](content/site.ts); la estructura del
  código va en el componente** porque es marcado, no copia.

### El mar del hero ([`components/MarVivo.tsx`](components/MarVivo.tsx))

Siete capas SVG + CSS, sin imágenes. La luz viene del horizonte, no de la cámara: las capas
lejanas son claras y de olas pequeñas, las cercanas son siluetas. Cada capa es un SVG del
doble de ancho con el trazo repetido; desplazarlo -50% hace el bucle invisible. Todo el
movimiento es `transform` y `opacity` (GPU). Para retocarlo, casi todo vive en la constante
`CAPAS` (`base`, `amplitud`, `periodos`, `filo`, `variacion`, `parallax`).

---

## 7. Correr el proyecto

```bash
npm install
npm run dev      # http://localhost:3000
```

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | servidor de desarrollo |
| `npm run build` | exporta el sitio estático a `out/` (~1,3 MB) |
| `npm run lint` | ESLint (`next/core-web-vitals`) |

Requiere **Node 18.18+ o 20+**.

`npm start` **no aplica**: el proyecto usa export estático. Para previsualizar el build:
`npx serve out`.

### Deploy

Sale HTML plano a `out/`, así que corre en cualquier hosting estático.
**Cloudflare Pages** es el destino recomendado (build `npm run build`, output `out`);
[`wrangler.toml`](wrangler.toml) existe justamente para impedir que Cloudflare intente el
flujo de Workers con OpenNext, que exige SSR. [`netlify.toml`](netlify.toml) cubre Netlify.

Cuando haya dominio propio se cambia **una sola línea**: `SITE_URL` en
[`content/site.ts`](content/site.ts). De ahí salen canonical, Open Graph, JSON-LD, sitemap y
robots. Hoy apunta a `https://ola.olalabgimti.workers.dev`.

### Accesibilidad (no negociable)

- `prefers-reduced-motion` respetado en toda la página: el mar se congela como postal.
- Navegación por teclado completa; foco visible en todos los interactivos.
- Lo que el cursor revela (el entregable de cada ola), el teclado también. En pantallas
  táctiles —donde no hay hover— se muestra siempre.
- Salto "Saltar al contenido" al inicio del `<body>`.

---

Detalle operativo adicional (WhatsApp, og-image, `_headers`, tabla de qué se edita dónde):
ver [`README.md`](README.md).
