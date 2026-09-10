# ola lab — landing

Landing page de **OLA LAB**, el laboratorio de tecnología e innovación para los colegios del
Pacífico colombiano. Una iniciativa social de **GIMTI S.A.S.**

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion. Sin backend: todos los
CTA son `mailto:` (y WhatsApp, cuando se configure el número).

## Correr el proyecto

```bash
npm install
npm run dev      # http://localhost:3000
```

Otros comandos:

```bash
npm run build    # exporta el sitio estático a out/
npm run lint
```

Para previsualizar el build: `npx serve out` (o cualquier servidor estático).
`next start` no aplica: el proyecto usa export estático.

Requiere Node 18.18+ o 20+.

## Dónde se edita el contenido

**Todo el texto visible vive en [`content/site.ts`](content/site.ts).** No hace falta tocar los
componentes para cambiar la página:

| Qué quieres cambiar | Dónde |
| --- | --- |
| Titulares, párrafos, kickers | las constantes `hero`, `queEs`, `frentes`, `caminos`, `paraQuien`, `voluntarios`, `footer` |
| Los 4 frentes de trabajo | `frentes.items` (cada uno con su `color`: `oceano`, `manglar`, `atardecer`, `coral`) |
| Los caminos de la tecnología | `caminos.items` (nombre, emoji, color, frase y "un día típico") |
| Correo de contacto | `EMAIL` |
| Asuntos y cuerpos de los `mailto:` | `voluntarios.cta`, `voluntarios.notaCta`, `paraQuien.columnas[].cta` |
| Ficha del hero (grados, materia, territorio, costo) | `hero.ficha` |
| Textos de SEO | `seo` |
| Datos legales de GIMTI | `brand` |

### Número de WhatsApp

`WHATSAPP` está **vacío a propósito** (no inventamos un número). Mientras siga vacío, los
botones que usarían WhatsApp caen automáticamente al correo. Para activarlo:

```ts
export const WHATSAPP = "573001234567"; // formato internacional, sin "+" ni espacios
```

## Cambiar el dominio (SITE_URL)

`SITE_URL` en [`content/site.ts`](content/site.ts) es la única fuente de la URL del sitio:
alimenta `metadataBase`, el canonical, la Open Graph, el JSON-LD, `sitemap.xml` y `robots.txt`.
Cuando exista dominio propio, cambia **solo esa línea**:

```ts
export const SITE_URL = "https://olalab.org";
```

## Deploy

El sitio se exporta **100% estático** (`output: "export"` en
[`next.config.mjs`](next.config.mjs)): `npm run build` deja en `out/` un sitio de
~1,3 MB sin servidor Node, sin funciones y sin SSR. Corre en cualquier hosting
estático.

### Cloudflare Pages (recomendado)

Ancho de banda ilimitado en el plan gratuito y buena latencia en Colombia.

1. Dashboard → **Workers & Pages** → *Create* → pestaña **Pages** → *Connect to Git*
   → elegir el repo.
2. Configuración de build:
   - Framework preset: **Next.js (Static HTML Export)** — o *None*, da igual
   - Build command: `npm run build`
   - Build output directory: `out`
3. Deploy.

> **No uses el flujo de Workers con OpenNext.** Cloudflare detecta "Next.js" e
> intenta `npx opennextjs-cloudflare build`, que exige un runtime SSR y rechaza
> Next 14 por su política de soporte. Esta página no necesita nada de eso: es
> HTML plano. Si el proyecto ya quedó creado en ese modo, bórralo y créalo como
> **Pages** con los ajustes de arriba.

### Netlify

*Add new site* → *Import an existing project* → build command `npm run build`,
publish directory `out`.

### GitHub Pages

Funciona, pero el sitio queda en `usuario.github.io/ola`, así que hay que añadir
`basePath: "/ola"` y `assetPrefix: "/ola"` en `next.config.mjs` — salvo que uses
dominio propio o renombres el repo a `usuario.github.io`.

### La imagen para compartir (og-image)

Hoy la genera [`app/opengraph-image.tsx`](app/opengraph-image.tsx) en tiempo de
build, para que nunca haya un 404 ni un PNG pesado en el repo. Para poner la
imagen de diseño definitiva:

1. Guardala como **`app/opengraph-image.png`** (1200x630; apunta a menos de
   300 KB para que la vista previa cargue rapido con mala conexion).
2. **Borra `app/opengraph-image.tsx`** — el `.tsx` y el `.png` no pueden convivir
   en la misma carpeta.
3. Crea **`app/opengraph-image.alt.txt`** con el texto alternativo.
4. En [`content/site.ts`](content/site.ts), cambia `OG_IMAGE` a
   `"/opengraph-image.png"`. Solo lo usa el JSON-LD, que no se entera solo.

Next detecta el archivo por convencion y rellena `og:image`, su tipo, sus
dimensiones y el alt. El objeto `metadata` **no** puede sobrescribir esto: el
archivo tiene prioridad.

Con un `.png` de verdad el nombre lleva extension, asi que el host ya sirve el
`Content-Type` correcto y la regla del `_headers` deja de hacer falta (queda
inofensiva).

### El archivo `_headers`

[`public/_headers`](public/_headers) lo leen Cloudflare Pages y Netlify. Declara
el `Content-Type` de `/opengraph-image` (Next la exporta sin extensión y, sin
esto, WhatsApp y LinkedIn no muestran la vista previa) y cachea los assets con
hash por un año.

### Después del primer deploy

Actualiza `SITE_URL` en [`content/site.ts`](content/site.ts) con la URL real
(`https://ola.pages.dev` o tu dominio) y vuelve a desplegar: esa constante
alimenta el canonical, la Open Graph, el JSON-LD, el sitemap y el robots.

## Identidad visual

Los colores viven en [`tailwind.config.ts`](tailwind.config.ts):

| Token | Hex | Uso |
| --- | --- | --- |
| `noche` | `#0A0E12` | fondo base (negro azulado) |
| `espuma` | `#F2F7F5` | texto principal |
| `bruma` | `#B9C6C4` | texto secundario |
| `oceano` | `#5AC8EB` | acento cian |
| `manglar` | `#78DCA0` | acento verde |
| `atardecer` | `#FFB25E` | **reservado para CTAs y momentos de acción** |
| `profundo.*` | `#0E3A4A` `#155E75` `#177A9C` `#12303B` `#07202B` | mar y fondos de sección |

Tipografía: Poppins (300 / 600 / 800) y JetBrains Mono 400 solo para las líneas de "código".

## Cómo está armado el mar

El hero es lo único ostentoso de la página, y está hecho solo con SVG y CSS
([`components/MarVivo.tsx`](components/MarVivo.tsx)):

- **La luz viene del horizonte, no de la cámara.** Por eso el agua se oscurece
  hacia el frente: las capas lejanas son claras y de olas pequeñas, las cercanas
  son siluetas. Ese contraste de valor es lo que crea la profundidad.
- **Siete capas** con velocidad, frecuencia, desfase y parallax propios. Cada una
  es un SVG del doble de ancho con el mismo trazo repetido: al desplazarlo -50%
  el bucle es invisible.
- **Camino de luz**: el reflejo no es una columna lisa, son destellos
  horizontales que se ensanchan al acercarse y que las olas de delante cortan.
- Todo el movimiento es `transform` y `opacity` (GPU). Con
  `prefers-reduced-motion` el mar queda congelado como una postal.

Para retocarlo, casi todo vive en la constante `CAPAS`: `base` (altura de
reposo), `amplitud`, `periodos` (más periodos = mar más lejano), `filo`
(agudeza de la cresta), `variacion` (amplitud ola por ola) y `parallax`.

## Accesibilidad y rendimiento

- `prefers-reduced-motion` respetado en todo: el mar se congela, no hay parallax ni entradas.
- Navegación por teclado completa; los caminos usan el patrón ARIA de tabs con flechas,
  Inicio/Fin y foco visible.
- Sin imágenes de mapa de bits en toda la página: el mar, las divisorias y el
  icono son SVG; la imagen de redes se genera en build.
- Framer Motion se carga con `LazyMotion` (solo el subconjunto necesario) pensando en
  celulares de gama baja con conectividad limitada.
