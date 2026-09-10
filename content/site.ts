/**
 * ---------------------------------------------------------------------------
 * CONTENIDO DE LA LANDING DE OLA LAB
 * ---------------------------------------------------------------------------
 * Todo el texto visible vive aqui. Para cambiar la pagina no hace falta tocar
 * los componentes: edita este archivo y listo.
 * ---------------------------------------------------------------------------
 */

/** URL canonica del sitio. Cambiala cuando exista dominio propio. */
export const SITE_URL = "https://olalab.vercel.app";

/**
 * Ruta de la imagen para compartir en redes.
 * Hoy la genera app/opengraph-image.tsx. El dia que exista la imagen de diseño:
 * guardala como app/opengraph-image.png, borra el .tsx y cambia este valor a
 * "/opengraph-image.png".
 */
export const OG_IMAGE = "/opengraph-image";

/** Correo unico de contacto de la iniciativa. */
export const EMAIL = "olalabgimti@gmail.com";

/**
 * Numero de WhatsApp en formato internacional SIN "+" ni espacios
 * (ej: "573001234567"). Mientras este vacio, los botones de WhatsApp
 * caen automaticamente al correo. Llenalo cuando tengan la linea oficial.
 */
export const WHATSAPP = "";

/** Construye un enlace mailto con asunto y cuerpo pre-llenados. */
export function mailto(subject: string, body?: string) {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  return `mailto:${EMAIL}?${params.toString().replace(/\+/g, "%20")}`;
}

/** Enlace de WhatsApp con mensaje pre-llenado; si no hay numero, usa mailto. */
export function whatsapp(message: string, fallbackSubject: string) {
  if (!WHATSAPP) return mailto(fallbackSubject, message);
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export const brand = {
  wordmark: "ola lab",
  sello: "by gimti",
  tagline: "Laboratorio de Tecnología e Innovación del Pacífico",
  empresa: "GIMTI S.A.S.",
  nit: "902.083.819-2",
  nitPlano: "902083819-2",
  ciudad: "Cali",
  pais: "Colombia",
  linkedin: "https://www.linkedin.com/company/gimti",
};

export const seo = {
  title: "OLA LAB — Tecnología e innovación para el Pacífico colombiano",
  titleTemplate: "%s | OLA LAB",
  description:
    "OLA LAB es un laboratorio itinerante que lleva talleres de programación, inteligencia artificial e innovación a estudiantes de 9°, 10° y 11° en los colegios del Pacífico colombiano. Una iniciativa social de GIMTI S.A.S.",
  /** Texto alternativo de la imagen para compartir. */
  imagenAlt: "OLA LAB — Que la distancia no decida el futuro de nadie.",
  keywords: [
    "OLA LAB",
    "tecnología Pacífico colombiano",
    "talleres de programación colegios",
    "inteligencia artificial estudiantes",
    "voluntariado tecnológico Colombia",
    "GIMTI",
    "innovación educativa Chocó Valle Cauca Nariño",
  ],
};

export const nav = {
  cta: "Quiero ser voluntario",
  ctaHref: "#voluntarios",
};

export const hero = {
  kicker:
    "Un laboratorio de tecnología e innovación para el Pacífico colombiano",
  titulo: "Que la distancia no decida el futuro de nadie.",
  /** Fragmento del titulo que se pinta en cian. Debe existir dentro de `titulo`. */
  resaltar: "la distancia",
  sub: "Llevamos programación, inteligencia artificial e innovación a estudiantes de 9°, 10° y 11° en los colegios del territorio Pacífico.",
  ctaPrimario: { label: "Compartir mi conocimiento", href: "#voluntarios" },
  ctaSecundario: { label: "Conocer la iniciativa", href: "#que-es" },
  codigo: "// pacifico.conectar()",
  /** Ficha del laboratorio: acompaña al hero en pantallas grandes. */
  ficha: [
    { campo: "grados", valor: "9° · 10° · 11°" },
    { campo: "materia", valor: "programación · IA · innovación" },
    { campo: "territorio", valor: "Pacífico colombiano" },
    { campo: "costo", valor: "gratuito, siempre" },
  ],
};

export const queEs = {
  id: "que-es",
  kicker: "¿Qué es ola lab?",
  parrafos: [
    "En las ciudades, un estudiante curioso encuentra cursos, mentores y ejemplos a la vuelta de la esquina. En muchos rincones del Pacífico, ese mismo talento crece sin que nadie le muestre que la tecnología también es para él.",
    "OLA LAB existe para cerrar esa distancia: un laboratorio itinerante de tecnología, inteligencia artificial e innovación que llega a los colegios del territorio con talleres, mentores y una guía de estudio construida por profesionales que dominan su área.",
  ],
  destacado:
    "El conocimiento que no se comparte, se desperdicia. Nosotros lo vamos a compartir donde más se necesita.",
  sello: "Una iniciativa social de GIMTI S.A.S. — software factory colombiana.",
};

export type Frente = {
  titulo: string;
  texto: string;
  /** Clave de color: define la barra lateral y el numero de la fila. */
  color: "oceano" | "manglar" | "atardecer" | "coral";
};

export const frentes = {
  id: "frentes",
  kicker: "Lo que vamos a hacer",
  titulo: "Cuatro frentes, una sola idea: acercar lo que estaba lejos.",
  items: [
    {
      titulo: "Talleres de tecnología e IA en tu colegio",
      texto:
        "Llevamos sesiones prácticas de programación, inteligencia artificial e innovación a colegios del Pacífico, en un lenguaje que cualquier estudiante entiende desde el primer minuto.",
      color: "oceano",
    },
    {
      titulo: "Una guía de estudio hecha por profesionales",
      texto:
        "Expertos que dominan su área construyen el material: real, actualizado y pensado para aprender haciendo — no para memorizar.",
      color: "manglar",
    },
    {
      titulo: "Mentores que ya recorrieron el camino",
      texto:
        "Profesionales voluntarios acompañan a los estudiantes, responden sus preguntas y les muestran que sí se puede vivir de la tecnología.",
      color: "atardecer",
    },
    {
      titulo: "Orientación para elegir tu ruta",
      texto:
        "La tecnología tiene cientos de salidas. Ayudamos a cada estudiante a descubrir cuál le gusta, qué se necesita y por dónde empezar.",
      color: "coral",
    },
  ] satisfies Frente[],
};

export type Camino = {
  id: string;
  nombre: string;
  emoji: string;
  /** Color en hex: se usa en el chip activo y en el panel. */
  color: string;
  frase: string;
  diaTipico: string;
};

export const caminos = {
  id: "caminos",
  titulo: "La tecnología tiene muchos caminos",
  sub: "¿Cuál va contigo? Toca cada uno y descubre qué hace la gente que vive de esto.",
  items: [
    {
      id: "desarrollo",
      nombre: "Desarrollo de software",
      emoji: "💻",
      color: "#78DCA0",
      frase: "Construyes las apps y páginas que millones usan a diario.",
      diaTipico:
        "Convertir una idea en algo que funciona, escribiendo código como quien arma un rompecabezas gigante.",
    },
    {
      id: "datos",
      nombre: "Ciencia de datos",
      emoji: "📊",
      color: "#5AC8EB",
      frase: "Encuentras historias y respuestas escondidas en los números.",
      diaTipico:
        "Descubrir por qué algo pasa — desde qué canción será éxito hasta cómo mejorar la pesca de una región.",
    },
    {
      id: "ia",
      nombre: "Inteligencia artificial",
      emoji: "🤖",
      color: "#FFB25E",
      frase: "Enseñas a las máquinas a ver, entender y ayudar.",
      diaTipico:
        "Entrenar modelos que traducen idiomas, detectan enfermedades o manejan un dron sobre el manglar.",
    },
    {
      id: "diseno",
      nombre: "Diseño digital",
      emoji: "🎨",
      color: "#F2A0C0",
      frase: "Haces que la tecnología se sienta fácil y bonita de usar.",
      diaTipico:
        "Dibujar cómo se verá una app antes de que exista, pensando en la persona que la usará.",
    },
    {
      id: "ciberseguridad",
      nombre: "Ciberseguridad",
      emoji: "🛡️",
      color: "#9B8CFF",
      frase: "Proteges la información de las personas y las empresas.",
      diaTipico:
        "Pensar como un atacante para cerrar las puertas antes de que alguien las encuentre abiertas.",
    },
    {
      id: "redes",
      nombre: "Redes y nube",
      emoji: "☁️",
      color: "#7FD8D8",
      frase:
        "Mantienes al mundo conectado, desde el celular hasta el satélite.",
      diaTipico:
        "Hacer que el internet llegue, aguante y no se caiga — incluso donde parecía imposible.",
    },
  ] satisfies Camino[],
};

export const paraQuien = {
  id: "para-quien",
  kicker: "Para quién",
  titulo: "Esta ola llega a dos orillas.",
  columnas: [
    {
      titulo: "Si eres estudiante",
      texto:
        "Cursas 9°, 10° u 11° en un colegio del Pacífico y sientes curiosidad por la tecnología — aunque nunca hayas escrito una línea de código. Eso es todo lo que necesitas: nosotros llevamos el resto.",
      pie: "Pregunta en tu colegio por OLA LAB o cuéntale a tus profesores de esta iniciativa.",
      color: "#5AC8EB",
      cta: null,
    },
    {
      titulo: "Si eres un colegio",
      texto:
        "Trabajas con estudiantes del territorio Pacífico y quieres llevarles talleres de tecnología sin costo. Escríbenos y coordinamos la visita: nos adaptamos a sus tiempos, su conectividad y su realidad.",
      pie: "Esto se construye con ustedes.",
      color: "#78DCA0",
      cta: {
        label: "Escribirnos como colegio",
        subject: "Queremos OLA LAB en nuestro colegio",
        mensaje:
          "Hola OLA LAB, somos un colegio del Pacífico y queremos coordinar una visita.\n\nColegio:\nMunicipio:\nPersona de contacto:\nGrados interesados:",
      },
    },
  ],
};

export const voluntarios = {
  id: "voluntarios",
  kicker: "Convocatoria abierta",
  titulo: "¿Dominas tu área? El Pacífico te necesita.",
  texto:
    "Buscamos profesionales voluntarios — de desarrollo, datos, diseño, IA, ciberseguridad o cualquier frente tech — para construir la guía de estudio y dictar charlas y talleres en lenguaje claro.",
  destacado:
    "Lo que para ti es un martes normal, para un estudiante puede ser el día que le cambió el rumbo.",
  cta: {
    label: "Postularme como voluntario",
    subject: "Quiero ser voluntario en OLA LAB",
    body: [
      "Hola OLA LAB, quiero sumarme como voluntario.",
      "",
      "Mi nombre:",
      "Mi área de dominio:",
      "Temas que podría dictar:",
      "Disponibilidad:",
      "",
      "¡Gracias!",
    ].join("\n"),
  },
  nota: "También recibimos recomendaciones: si conoces a alguien que debería estar aquí, escríbenos con su nombre.",
  notaCta: {
    label: "Recomendar a alguien",
    subject: "Recomiendo a alguien para OLA LAB",
    body: [
      "Hola OLA LAB, quiero recomendar a alguien para el voluntariado.",
      "",
      "Nombre de la persona:",
      "Su área:",
      "Cómo contactarla:",
    ].join("\n"),
  },
};

export const footer = {
  tagline: brand.tagline,
  codigo: "conocimiento.compartir(pacifico) => futuro;",
  legal: `Una iniciativa de ${brand.empresa} — NIT ${brand.nit} · ${brand.ciudad}, ${brand.pais} · ${EMAIL}`,
};
