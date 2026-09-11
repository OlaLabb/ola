/**
 * ---------------------------------------------------------------------------
 * CONTENIDO DE LA LANDING DE OLA LAB
 * ---------------------------------------------------------------------------
 * Todo el texto visible vive aqui. Para cambiar la pagina no hace falta tocar
 * los componentes: edita este archivo y listo.
 * ---------------------------------------------------------------------------
 */

import type { NombreIcono } from "@/components/Icono";

/**
 * URL canonica del sitio. De aqui salen el canonical, la Open Graph, el
 * JSON-LD, el sitemap y el robots: cambiar esta linea es todo lo que hace falta
 * el dia que haya dominio propio.
 */
export const SITE_URL = "https://ola.olalabgimti.workers.dev";

/**
 * Ruta de la imagen para compartir en redes: app/opengraph-image.png.
 * Solo la usa el JSON-LD; las etiquetas Open Graph las pone Next por convencion
 * de archivo. Su texto alternativo vive en app/opengraph-image.alt.txt.
 */
export const OG_IMAGE = "/opengraph-image.png";

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

/**
 * El nav son cuatro destinos, no cinco enlaces y un boton que repite uno de
 * ellos. Las tres anclas son las tres paradas del viaje del estudiante (que
 * hay, pruebalo, y la puerta para su colegio); el CTA es la cuarta y va
 * aparte porque es la unica que pide algo.
 *
 * "Que es" y "¿Donde vamos?" salieron: la primera esta a un scroll del hero y
 * la segunda es bitacora, no destino.
 */
export const nav = {
  cta: "Trae la ola",
  ctaHref: "#trae-la-ola",
  abrirMenu: "Abrir menú",
  cerrarMenu: "Cerrar menú",
  /** Anclas del menu: cada `href` es el id real de su seccion. */
  enlaces: [
    { label: "Las olas", href: "#olas" },
    { label: "Pruébalo", href: "#consola" },
    { label: "Colegios", href: "#colegios" },
  ],
};

export const hero = {
  kicker:
    "Un laboratorio de tecnología e innovación para el Pacífico colombiano",
  titulo: "Que la distancia no decida el futuro de nadie.",
  /** Fragmento del titulo que se pinta en cian. Debe existir dentro de `titulo`. */
  resaltar: "la distancia",
  sub: "Llevamos programación, inteligencia artificial e innovación a estudiantes de 9°, 10° y 11° en los colegios del territorio Pacífico.",
  /**
   * El CTA principal ya no manda al voluntariado: manda al laboratorio. Quien
   * llega aqui es, sobre todo, un estudiante, y la forma mas corta de que
   * entienda que es esto es que ejecute una linea de codigo suya. El scroll
   * suave lo pone `html { scroll-behavior: smooth }` en globals.css.
   */
  ctaPrimario: { label: "Pruébalo", href: "#consola" },
  ctaSecundario: { label: "Soy colegio", href: "#colegios" },
  codigo: "// pacifico.conectar()",
  /** Ficha del laboratorio: acompaña al hero en pantallas grandes. */
  ficha: [
    { campo: "grados", valor: "9° · 10° · 11°" },
    { campo: "materia", valor: "programación · IA · innovación" },
    { campo: "territorio", valor: "Pacífico colombiano" },
    { campo: "costo", valor: "gratuito, siempre" },
  ],
};

/**
 * ---------------------------------------------------------------------------
 * QUE ES OLA LAB
 * ---------------------------------------------------------------------------
 * Una sola seccion corta. Antes eran dos (el contexto y los cuatro frentes) y
 * entre las dos pedian scroll antes de que la pagina hubiera demostrado nada.
 * Ahora: tres frases para entender de que va esto, y los cuatro frentes como
 * una fila compacta —un titular y una linea cada uno— para que se lean de un
 * vistazo en vez de leerse enteros.
 *
 * La tercera frase y `pieEstudiante` vienen de la vieja columna "Si eres
 * estudiante": es el unico momento en que la pagina le habla de tu a tu al
 * estudiante y le baja la barrera de entrada. Sin ella, "esto es para gente
 * que ya sabe" se queda sin respuesta.
 * ---------------------------------------------------------------------------
 */
export type Frente = {
  titulo: string;
  texto: string;
  /** Clave de color: tine la barra lateral y el numero de la fila. */
  color: "oceano" | "manglar" | "turquesa" | "coral";
};

export const queEs = {
  id: "que-es",
  kicker: "¿Qué es ola lab?",
  parrafos: [
    "En las ciudades, un estudiante curioso encuentra cursos, mentores y ejemplos a la vuelta de la esquina. En muchos rincones del Pacífico, ese mismo talento crece sin que nadie le muestre que la tecnología también es para él.",
    "OLA LAB es un laboratorio itinerante que llega a los colegios del territorio, ola por ola, con mentores que ya viven de esto y una guía hecha por gente que domina lo suyo.",
    "Si cursas 9°, 10° u 11° en un colegio del Pacífico y te pica la curiosidad, ya cumpliste el único requisito: nunca hace falta haber escrito una línea de código.",
  ],
  destacado:
    "El conocimiento que no se comparte, se desperdicia. Nosotros lo vamos a compartir donde más se necesita.",
  /** La accion que le queda al estudiante: nosotros llegamos por su colegio. */
  pieEstudiante:
    "Pregunta en tu colegio por OLA LAB, o cuéntales a tus profes de esta iniciativa.",
  sello: "Una iniciativa social de GIMTI S.A.S. — software factory colombiana.",

  frentesKicker: "lo que hacemos",
  /**
   * El tercer frente usaba `atardecer`, que esta reservado para los CTA: un
   * frente no es una llamada a la accion. Pasa a `turquesa`.
   */
  frentes: [
    {
      titulo: "Olas en tu colegio",
      texto:
        "Sesiones prácticas de programación, IA e innovación, en tu propia aula.",
      color: "oceano",
    },
    {
      titulo: "Una guía de verdad",
      texto:
        "Material hecho por profesionales de cada área, para aprender haciendo.",
      color: "manglar",
    },
    {
      titulo: "Mentores de carne y hueso",
      texto:
        "Gente que ya vive de la tecnología, respondiendo tus preguntas de frente.",
      color: "turquesa",
    },
    {
      titulo: "Tu ruta, no la de otro",
      texto:
        "La tecnología tiene cientos de salidas: te ayudamos a ver cuál es la tuya.",
      color: "coral",
    },
  ] satisfies Frente[],
};

/**
 * ---------------------------------------------------------------------------
 * LAS OLAS — el corazon de la marca
 * ---------------------------------------------------------------------------
 * Cada tema del programa es UNA OLA: llega al territorio, envuelve al
 * estudiante y se va dejando algo construido. Nadie "toma un curso" ni "ve un
 * modulo": se monta en la ola y la surfea. Ese es el lenguaje de toda la
 * pagina.
 *
 * Sobre los colores: cada ola tiene el suyo y no se repite, porque el color es
 * lo que la hace reconocible antes de leer el nombre. El de la Ola de IA
 * (#FF8A73) es un coral de arrecife: el token `coral` de la paleta (#F2A0C0)
 * quedo para la Ola de Diseno, y `atardecer` sigue reservado para los CTA.
 * ---------------------------------------------------------------------------
 */
export type Ola = {
  id: string;
  /** Nombre completo, tal como se dice en voz alta. */
  nombre: string;
  /** La promesa: que te pasa mientras la surfeas. */
  promesa: string;
  /** Lo que te llevas construido al salir del agua. Se revela al pasar el cursor. */
  entregable: string;
  /** Color en hex: tine la olita, el nombre y el resplandor de la tarjeta. */
  color: string;
  /** Marca de la ola: el icono que la nombra antes de leerla. Ver components/Icono.tsx. */
  icono: NombreIcono;
};

export const olas = {
  id: "olas",
  kicker: "// nuestro programa",
  titulo: "Aquí no hay clases. Hay olas.",
  intro:
    "Cada tema que llevamos al territorio es una ola: llega, te envuelve y te deja algo construido. No las dictamos — las surfeamos juntos. Estas son las olas de nuestra marea:",
  /** Linea que se revela en cada tarjeta, antes del entregable. */
  prefijoEntregable: "Al surfearla te llevas:",
  cierre:
    "Cada ola que surfeas te deja una insignia. Y cuando completas la marea… ya no eres el mismo.",
  items: [
    {
      id: "programacion",
      nombre: "La Ola de Programación",
      promesa: "Aprende a hablarle a las máquinas — y a que te obedezcan.",
      entregable: "tu primer programa funcionando",
      color: "#78DCA0",
      icono: "programacion",
    },
    {
      id: "ia",
      nombre: "La Ola de IA",
      promesa:
        "Descubre cómo se le enseña a pensar a una máquina (y por qué tú mandas).",
      entregable: "tu primer asistente inteligente",
      color: "#FF8A73",
      icono: "ia",
    },
    {
      id: "innovacion",
      nombre: "La Ola de Innovación",
      promesa: "Convierte los problemas de tu territorio en ideas que valen.",
      entregable: "una idea de tu territorio convertida en proyecto",
      color: "#5AC8EB",
      icono: "innovacion",
    },
    {
      id: "datos",
      nombre: "La Ola de Datos",
      promesa: "Lee las historias escondidas en los números.",
      entregable: "un análisis real con datos de tu región",
      color: "#7FD8D8",
      icono: "datos",
    },
    {
      id: "diseno",
      nombre: "La Ola de Diseño",
      promesa: "Crea tecnología que la gente ame usar.",
      entregable: "el diseño de tu primera app",
      color: "#F2A0C0",
      icono: "diseno",
    },
    {
      id: "automatizacion",
      nombre: "La Ola de Automatización",
      promesa:
        "Pon a los robots a hacer lo aburrido, para que tú hagas lo importante.",
      entregable: "un robot que trabaja por ti",
      color: "#9B8CFF",
      icono: "automatizacion",
    },
    {
      id: "seguridad",
      nombre: "La Ola de Seguridad",
      promesa: "Aprende a proteger lo que el mundo digital quiere robar.",
      entregable: "el escudo digital de tu familia",
      color: "#5A8CEB",
      icono: "seguridad",
    },
  ] satisfies Ola[],
};

export type Camino = {
  id: string;
  nombre: string;
  /** Ver components/Icono.tsx. */
  icono: NombreIcono;
  /** Color en hex: se usa en el chip activo y en el panel. */
  color: string;
  frase: string;
  diaTipico: string;
};

export const caminos = {
  id: "caminos",
  /**
   * El kicker recoge lo que el visitante acaba de hacer en el laboratorio: ya
   * ejecuto codigo, asi que la pregunta deja de ser "que es esto" y pasa a ser
   * "a donde lleva". Por eso esta seccion va justo despues de la consola.
   */
  kicker: "Surfeaste la ola. ¿Y ahora?",
  titulo: "La tecnología tiene muchos caminos",
  sub: "¿Cuál va contigo? Toca cada uno y descubre qué hace la gente que vive de esto.",
  items: [
    {
      id: "desarrollo",
      nombre: "Desarrollo de software",
      icono: "programacion",
      color: "#78DCA0",
      frase: "Construyes las apps y páginas que millones usan a diario.",
      diaTipico:
        "Convertir una idea en algo que funciona, escribiendo código como quien arma un rompecabezas gigante.",
    },
    {
      id: "datos",
      nombre: "Ciencia de datos",
      icono: "datos",
      color: "#5AC8EB",
      frase: "Encuentras historias y respuestas escondidas en los números.",
      diaTipico:
        "Descubrir por qué algo pasa — desde qué canción será éxito hasta cómo mejorar la pesca de una región.",
    },
    {
      id: "ia",
      nombre: "Inteligencia artificial",
      icono: "ia",
      color: "#FFB25E",
      frase: "Enseñas a las máquinas a ver, entender y ayudar.",
      diaTipico:
        "Entrenar modelos que traducen idiomas, detectan enfermedades o manejan un dron sobre el manglar.",
    },
    {
      id: "diseno",
      nombre: "Diseño digital",
      icono: "diseno",
      color: "#F2A0C0",
      frase: "Haces que la tecnología se sienta fácil y bonita de usar.",
      diaTipico:
        "Dibujar cómo se verá una app antes de que exista, pensando en la persona que la usará.",
    },
    {
      id: "ciberseguridad",
      nombre: "Ciberseguridad",
      icono: "seguridad",
      color: "#9B8CFF",
      frase: "Proteges la información de las personas y las empresas.",
      diaTipico:
        "Pensar como un atacante para cerrar las puertas antes de que alguien las encuentre abiertas.",
    },
    {
      id: "redes",
      nombre: "Redes y nube",
      icono: "nube",
      color: "#7FD8D8",
      frase:
        "Mantienes al mundo conectado, desde el celular hasta el satélite.",
      diaTipico:
        "Hacer que el internet llegue, aguante y no se caiga — incluso donde parecía imposible.",
    },
  ] satisfies Camino[],
};

/**
 * EL LABORATORIO
 * Cuatro retos con codigo real: el codigo que se ve en pantalla es exactamente
 * el que corre. Aqui viven los textos; la estructura del codigo (con sus
 * inputs incrustados) vive en components/Consola.tsx, porque es marcado, no
 * copia.
 *
 * `pordefecto` es a la vez el placeholder del input y el valor con el que
 * corre el reto si el estudiante lo deja vacio: nunca se ejecuta en blanco.
 */
export const consola = {
  id: "consola",
  kicker: "pruébalo",
  titulo: "Programa aquí mismo, ahora mismo.",
  sub: "Cuatro retos con código real. Del aula a tu pantalla — sin instalar nada.",
  etiqueta: "ola-lab — laboratorio",
  boton: "Ejecutar",
  otraVez: "Otra vez",
  conceptoEtiqueta: "Lo que acabas de usar:",
  completado: "reto completado",
  avisoFecha: "Elige tu fecha de nacimiento para ejecutar.",
  retos: [
    {
      id: "saludo",
      tab: "Salúdate",
      concepto:
        "Usaste una FUNCIÓN: una máquina que recibe algo (tu nombre) y devuelve algo nuevo.",
      campos: [{ etiqueta: "tu nombre", pordefecto: "amig@" }],
    },
    {
      id: "notas",
      tab: "¿Vas pasando el año?",
      concepto:
        "Usaste un CONDICIONAL: el código tomó una decisión solito según tus notas.",
      campos: [
        { etiqueta: "primera nota", pordefecto: "3.5" },
        { etiqueta: "segunda nota", pordefecto: "4.2" },
        { etiqueta: "tercera nota", pordefecto: "2.8" },
      ],
    },
    {
      id: "presenta",
      tab: "¿Quién presenta hoy?",
      concepto:
        "Usaste una LISTA y el AZAR: así funcionan las rifas, los sorteos... y las recomendaciones de tus apps.",
      campos: [
        { etiqueta: "primer compañero", pordefecto: "Ana" },
        { etiqueta: "segundo compañero", pordefecto: "Luis" },
        { etiqueta: "tercer compañero", pordefecto: "Sara" },
        { etiqueta: "cuarto compañero", pordefecto: "Tú" },
      ],
    },
    {
      id: "dias",
      tab: "¿Cuántos días llevas vivo?",
      concepto:
        "Usaste DATOS y CÁLCULO: convertiste una fecha en un número que nunca habías pensado.",
      campos: [{ etiqueta: "tu fecha de nacimiento", pordefecto: "" }],
    },
  ],
  final: {
    texto:
      "Acabas de surfear tu primera mini-ola de programación. Esto es solo la orilla — imagínate el mar completo.",
    cta: {
      label:
        "¿Eres profe o profesional? Trae la ola completa a más estudiantes →",
      href: "#trae-la-ola",
    },
  },
};

/**
 * ---------------------------------------------------------------------------
 * PARA COLEGIOS
 * ---------------------------------------------------------------------------
 * La invitacion y las preguntas que la responden, juntas. Antes estaban
 * separadas por otra seccion: el colegio leia "escribannos" y tenia que seguir
 * bajando para saber cuanto cuesta y que le van a pedir. Las cuatro preguntas
 * son justamente las que se hacen ANTES de decir que si, asi que van debajo
 * del boton, no dos pantallas mas abajo.
 *
 * La columna de estudiantes que acompanaba a esta vive ahora en `queEs`.
 * ---------------------------------------------------------------------------
 */
export const colegios = {
  id: "colegios",
  kicker: "para colegios",
  titulo: "Traemos la ola a su colegio, sin costo.",
  sub: "Si trabajan con estudiantes del territorio Pacífico y quieren que la tecnología llegue a sus aulas, escríbannos y coordinamos la visita: nos adaptamos a sus tiempos, su conectividad y su realidad.",
  pie: "Esto se construye con ustedes.",
  cta: {
    label: "Escribirnos como colegio",
    subject: "Queremos OLA LAB en nuestro colegio",
    mensaje:
      "Hola OLA LAB, somos un colegio del Pacífico y queremos coordinar una visita.\n\nColegio:\nMunicipio:\nPersona de contacto:\nGrados interesados:",
  },
  preguntasKicker: "Lo que todo colegio pregunta primero",
  preguntas: [
    {
      pregunta: "¿Cuánto cuesta?",
      respuesta:
        "Nada. Ni ahora ni después. OLA LAB es gratuito para colegios y estudiantes, siempre.",
    },
    {
      pregunta: "¿Necesitamos sala de computadores?",
      respuesta:
        "No es obligatoria. Nos adaptamos a lo que haya: computadores, celulares o sesiones sin pantalla. Cuéntennos su realidad y armamos el plan.",
    },
    {
      pregunta: "¿Presencial o virtual?",
      respuesta:
        "Las dos. Lo definimos según la conectividad y los tiempos de cada colegio. La ola llega como pueda llegar — pero llega.",
    },
    {
      pregunta: "¿Qué debe hacer el colegio?",
      respuesta:
        "Escribirnos, contarnos sus grados y tiempos, y prestarnos el espacio. Del resto nos encargamos.",
    },
  ],
};

export type Paso = {
  /** Ver components/Icono.tsx. */
  icono: NombreIcono;
  titulo: string;
  etiqueta: string;
  estado: "hecho" | "encurso" | "proximo";
  color: string;
};

/**
 * Bitacora honesta: donde va la ola hoy. El paso `encurso` es el unico
 * resaltado — es el que explica por que la convocatoria viene justo despues.
 */
export const ruta = {
  id: "ruta",
  kicker: "bitácora",
  titulo: "¿Dónde va la ola?",
  pasos: [
    {
      icono: "hecho",
      titulo: "La idea tomó forma",
      etiqueta: "Hecho",
      estado: "hecho",
      color: "#78DCA0",
    },
    {
      icono: "ola",
      titulo: "Construyendo la marea: voluntarios + guía de estudio",
      etiqueta: "En curso",
      estado: "encurso",
      color: "#5AC8EB",
    },
    {
      icono: "reloj",
      titulo: "Primeras marejadas en colegios",
      etiqueta: "Próximamente",
      estado: "proximo",
      color: "#B9C6C4",
    },
  ] satisfies Paso[],
  nota: "Este espacio se irá llenando de fotos e historias reales.",
};

/**
 * ---------------------------------------------------------------------------
 * TRAE LA OLA
 * ---------------------------------------------------------------------------
 * El objetivo numero uno de la pagina. Se llamaba "voluntarios", que es como
 * lo llamamos nosotros por dentro; "trae la ola" es como se dice en la marca y
 * es, ademas, una invitacion en vez de una categoria.
 *
 * Es la primera de las dos orillas: las personas. La segunda —las empresas—
 * vive en su propia seccion, `empresas`, justo despues y sobre fondo claro.
 * ---------------------------------------------------------------------------
 */
export const traeLaOla = {
  id: "trae-la-ola",
  kicker: "trae la ola",
  titulo: "¿Dominas tu área? El Pacífico te necesita.",
  /** La frase que explica el nombre de la seccion. */
  frase: "Los voluntarios son los que traen la ola.",
  texto:
    "Buscamos profesionales voluntarios — de desarrollo, datos, diseño, IA, ciberseguridad o cualquier frente tech — para construir la guía de estudio y traer las olas al territorio en lenguaje claro.",
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

/**
 * ---------------------------------------------------------------------------
 * EMPRESAS ALIADAS — la otra orilla
 * ---------------------------------------------------------------------------
 * Salio de `traeLaOla` para tener seccion propia sobre `espuma`. Dos razones:
 * el cierre de la pagina eran tres secciones oscuras seguidas, y el claro es
 * justo lo que esta pagina usa para decir "aqui te toca hacer algo".
 *
 * El texto es el mismo que tenia cuando era una tarjeta: se mudo, no se
 * reescribio.
 * ---------------------------------------------------------------------------
 */
export const empresas = {
  id: "empresas",
  kicker: "la otra orilla",
  titulo: "¿Tienes una empresa? Trae la ola con nosotros.",
  texto:
    "Equipos, conectividad, espacios o patrocinio: lo que su empresa pueda aportar se convierte en horas de tecnología para estudiantes del Pacífico.",
  cta: {
    label: "Ser empresa aliada",
    subject: "Queremos ser empresa aliada de OLA LAB",
    body: [
      "Hola OLA LAB, queremos sumarnos como empresa aliada.",
      "",
      "Empresa:",
      "Persona de contacto:",
      "Cómo podríamos aportar (equipos, conectividad, patrocinio, otro):",
    ].join("\n"),
  },
};

/** Boton de compartir del footer: navigator.share y, si no hay, copiar enlace. */
export const compartir = {
  label: "Compartir esta ola",
  copiado: "¡Enlace copiado!",
  titulo: "OLA LAB",
  texto: "Que la distancia no decida el futuro de nadie.",
};

export const footer = {
  tagline: brand.tagline,
  codigo: "conocimiento.compartir(pacifico) => futuro;",
  legal: `Una iniciativa de ${brand.empresa} — NIT ${brand.nit} · ${brand.ciudad}, ${brand.pais} · ${EMAIL}`,
};
