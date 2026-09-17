/**
 * ---------------------------------------------------------------------------
 * CONTENIDO DE LA LANDING DE OLA LAB
 * ---------------------------------------------------------------------------
 * Todo el texto visible vive aqui. Para cambiar la pagina no hace falta tocar
 * los componentes: edita este archivo y listo.
 * ---------------------------------------------------------------------------
 */

import type { NombreIcono } from "@/components/Icono";
import type { IdOla } from "@/content/voluntarios";

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
 * El nav son cinco destinos, no seis enlaces y un boton que repite uno de
 * ellos. Las tres primeras anclas son las paradas del viaje del estudiante
 * (que hay, pruebalo, y la puerta para su colegio); la cuarta pone cara a
 * quienes traen la ola. El CTA va aparte porque es el unico que pide algo.
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
    { label: "Las olas", href: "#la-marea" },
    { label: "Pruébalo", href: "#consola" },
    { label: "Colegios", href: "#colegios" },
    { label: "Los que traen la ola", href: "#los-que-traen-la-ola" },
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
 * LAS OLAS — el registro de las siete
 * ---------------------------------------------------------------------------
 * Cada tema del programa es UNA OLA: llega al territorio, envuelve al
 * estudiante y se va dejando algo construido. Nadie "toma un curso" ni "ve un
 * modulo": se monta en la ola y la surfea. Ese es el lenguaje de toda la
 * pagina.
 *
 * Aqui vive la identidad de cada ola (nombre y color). Su seccion propia —las
 * tarjetas— la reemplazo "La Marea" (`laMarea`, mas abajo), que las cuenta
 * conectadas y en su orden de travesia; el directorio de voluntarios sigue
 * leyendo nombre y color de aqui.
 *
 * Sobre los colores: cada ola tiene el suyo y no se repite, porque el color es
 * lo que la hace reconocible antes de leer el nombre. El de la Ola de IA
 * (#FF8A73) es un coral de arrecife: el token `coral` de la paleta (#F2A0C0)
 * quedo para la Ola de Diseno, y `atardecer` sigue reservado para los CTA.
 * ---------------------------------------------------------------------------
 */
export type Ola = {
  id: IdOla;
  /** Nombre completo, tal como se dice en voz alta. */
  nombre: string;
  /** La promesa: que te pasa mientras la surfeas. */
  promesa: string;
  /** Color en hex: la ola se reconoce por el antes de leer su nombre. */
  color: string;
  /** Marca de la ola: el icono que la nombra antes de leerla. Ver components/Icono.tsx. */
  icono: NombreIcono;
};

export const olas = {
  items: [
    {
      id: "programacion",
      nombre: "La Ola de Programación",
      promesa: "Aprende a hablarle a las máquinas — y a que te obedezcan.",
      color: "#78DCA0",
      icono: "programacion",
    },
    {
      id: "ia",
      nombre: "La Ola de IA",
      promesa:
        "Descubre cómo se le enseña a pensar a una máquina (y por qué tú mandas).",
      color: "#FF8A73",
      icono: "ia",
    },
    {
      id: "innovacion",
      nombre: "La Ola de Innovación",
      promesa: "Convierte los problemas de tu territorio en ideas que valen.",
      color: "#5AC8EB",
      icono: "innovacion",
    },
    {
      id: "datos",
      nombre: "La Ola de Datos",
      promesa: "Lee las historias escondidas en los números.",
      color: "#7FD8D8",
      icono: "datos",
    },
    {
      id: "diseno",
      nombre: "La Ola de Diseño",
      promesa: "Crea tecnología que la gente ame usar.",
      color: "#F2A0C0",
      icono: "diseno",
    },
    {
      id: "automatizacion",
      nombre: "La Ola de Automatización",
      promesa:
        "Pon a los robots a hacer lo aburrido, para que tú hagas lo importante.",
      color: "#9B8CFF",
      icono: "automatizacion",
    },
    {
      id: "seguridad",
      nombre: "La Ola de Seguridad",
      promesa: "Aprende a proteger lo que el mundo digital quiere robar.",
      color: "#5A8CEB",
      icono: "seguridad",
    },
  ] satisfies Ola[],
};

/**
 * ---------------------------------------------------------------------------
 * LA MAREA — las siete olas, conectadas
 * ---------------------------------------------------------------------------
 * Reemplaza a las tarjetas de "Aqui no hay clases. Hay olas.". La idea que
 * cambia: las olas no son siete temas sueltos, son una travesia. Cada una
 * recibe lo que dejo la anterior, y al final el estudiante sale con un producto
 * suyo. "Marea Fresca" es la app de ejemplo que crece ola por ola en el
 * celular de la seccion.
 *
 * El orden de `olas` aqui es el de la travesia (Innovacion -> Seguridad), no el
 * del registro de arriba. El color NO se repite aqui: sale de `olas.items` por
 * `id`, para que cada ola se vea igual en toda la pagina.
 *
 * Los textos son los del mockup aprobado, tal cual (voseo incluido).
 * ---------------------------------------------------------------------------
 */
export type OlaDeLaMarea = {
  /** El `id` de la ola en `olas.items`: de ahi salen su color y su identidad. */
  id: IdOla;
  /** Lo que se lee debajo del nodo de la travesia. */
  corto: string;
  nombre: string;
  promesa: string;
  /** De donde viene: acompana al "ola n de 7". */
  antes: string;
  recibe: string;
  lleva: string;
  entrega: string;
  /**
   * La linea de codigo bajo el celular: `marea{metodo}({argumento}) ⇒ {resultado};`.
   * `resultadoEsTexto` pinta el resultado como string (el cierre de la Marea).
   */
  codigo: {
    metodo: string;
    argumento?: string;
    resultado: string;
    resultadoEsTexto?: boolean;
  };
};

export const laMarea = {
  id: "la-marea",
  /** `marea.conectar(olas) ⇒ producto;` — el metodo va en oceano. */
  kicker: { objeto: "marea", metodo: ".conectar", resto: "(olas) ⇒ producto;" },
  titulo: "Siete olas. Un producto tuyo.",
  lead: {
    antes:
      "Aquí no hay clases. Hay olas, y van conectadas: cada una toma lo que la anterior dejó. Surfeás la primera con un problema de tu pueblo y salís de la última con ",
    resaltado: "una app que inventaste vos",
    despues: ", con nombre, cara, código y candado.",
  },
  travesiaEtiqueta: "Las siete olas de la Marea",
  numero: (n: number, total: number) => `ola ${n} de ${total}`,
  pasos: {
    recibe: "Recibís",
    lleva: "Te llevás",
    entrega: "Le pasás a la siguiente",
  },
  anterior: "← Ola anterior",
  siguiente: "Surfear la siguiente ola →",
  /** En la ultima ola el boton de avanzar lleva al cierre de la seccion. */
  irAFeria: "Ir a la Feria de la Marea →",
  olas: [
    {
      id: "innovacion",
      corto: "Innovación",
      nombre: "Ola de Innovación",
      promesa: "Convierte los problemas de tu territorio en ideas que valen.",
      antes: "empieza la Marea",
      recibe: "Un problema real de tu pueblo. Nada más.",
      lleva:
        "Una idea con nombre y forma: qué resuelve, para quién y cómo se llama.",
      entrega: "Tu idea con nombre → la Ola de Diseño",
      codigo: { metodo: ".surfear", argumento: '"innovacion"', resultado: "idea" },
    },
    {
      id: "diseno",
      corto: "Diseño",
      nombre: "Ola de Diseño",
      promesa: "Crea tecnología que la gente ame usar.",
      antes: "viene de Innovación",
      recibe: "Tu idea con nombre, de la Ola de Innovación.",
      lleva:
        "Tu idea con cara: logo, colores y las pantallas dibujadas de cómo se vería en un celular.",
      entrega: "Tus pantallas → la Ola de Programación",
      codigo: { metodo: ".surfear", argumento: '"diseno"', resultado: "cara" },
    },
    {
      id: "programacion",
      corto: "Programación",
      nombre: "Ola de Programación",
      promesa: "Aprende a hablarle a las máquinas, y a que te obedezcan.",
      antes: "viene de Diseño",
      recibe: "Tus pantallas dibujadas, de la Ola de Diseño.",
      lleva:
        "La primera versión que funciona de verdad, con la IA como copiloto.",
      entrega: "Tu app funcionando → la Ola de Datos",
      codigo: {
        metodo: ".surfear",
        argumento: '"programacion"',
        resultado: "app",
      },
    },
    {
      id: "datos",
      corto: "Datos",
      nombre: "Ola de Datos",
      promesa: "Lee las historias escondidas en los números.",
      antes: "viene de Programación",
      recibe: "Tu app funcionando, de la Ola de Programación.",
      lleva:
        "Evidencia real: a quién le sirve, cuántos son y qué dicen los números de tu región.",
      entrega: "Tu app con evidencia → la Ola de Automatización",
      codigo: {
        metodo: ".surfear",
        argumento: '"datos"',
        resultado: "evidencia",
      },
    },
    {
      id: "automatizacion",
      corto: "Automatización",
      nombre: "Ola de Automatización",
      promesa:
        "Pon a los robots a hacer lo aburrido, para que tú hagas lo importante.",
      antes: "viene de Datos",
      recibe: "Tu app con evidencia, de la Ola de Datos.",
      lleva:
        "Un robot que le hace lo aburrido a tu app: avisa, responde, ordena.",
      entrega: "Tu app con su robot → la Ola de IA",
      codigo: {
        metodo: ".surfear",
        argumento: '"automatizacion"',
        resultado: "robot",
      },
    },
    {
      id: "ia",
      corto: "IA",
      nombre: "Ola de IA",
      promesa:
        "Descubre cómo se le enseña a pensar a una máquina (y por qué tú mandas).",
      antes: "viene de Automatización",
      recibe: "Tu app con su robot, de la Ola de Automatización.",
      lleva:
        "Una app que piensa: un asistente inteligente dentro de lo que creaste.",
      entrega: "Tu app que piensa → la Ola de Seguridad",
      codigo: { metodo: ".surfear", argumento: '"ia"', resultado: "asistente" },
    },
    {
      id: "seguridad",
      corto: "Seguridad",
      nombre: "Ola de Seguridad",
      promesa: "Aprende a proteger lo que el mundo digital quiere robar.",
      antes: "cierra la Marea",
      recibe: "Tu app completa, de la Ola de IA.",
      lleva: "Tu producto protegido, listo para mostrarlo al mundo.",
      entrega: "Tu producto → la Feria de la Marea",
      codigo: {
        metodo: ".completar",
        resultado: '"esto lo hice yo"',
        resultadoEsTexto: true,
      },
    },
  ] satisfies OlaDeLaMarea[],

  /** El celular: "Marea Fresca" creciendo ola por ola. Una pantalla por ola. */
  hilo: {
    antes: "Así crece ",
    app: "Marea Fresca",
    despues: ", la app de ejemplo, ola por ola",
  },
  celular: {
    innovacion: {
      titulo: "Cuaderno de Innovación",
      problema: "El pescado se pierde porque no hay a quién venderlo a tiempo.",
      idea: "Una app para que los pescadores del pueblo vendan directo, sin intermediarios.",
      paraQuien: "¿Para quién? Pescadores y familias de Buenaventura.",
    },
    diseno: {
      titulo: "Diseño",
      pantallas: "Tres pantallas",
      recorrido: "Lo que hay hoy · cuánto cuesta · cómo pido",
    },
    programacion: {
      titulo: "Pescado de hoy",
      productos: [
        { nombre: "Pargo rojo", precio: "$18.000/kg" },
        { nombre: "Corvina", precio: "$15.000/kg" },
        { nombre: "Camarón tití", precio: "$22.000/kg" },
      ],
      boton: "Pedir ahora",
    },
    datos: {
      titulo: "Familias que pescan en el municipio",
      /** Alto de cada barra, en % del grafico. */
      barras: [45, 70, 100, 60, 80],
      dias: ["lun", "mar", "mié", "jue", "vie"],
      nota: "Los números muestran cuánto pescado se pierde cada semana. Eso justifica la app.",
    },
    automatizacion: {
      titulo: "Avisos automáticos",
      inicial: "R",
      robot: "El robot trabaja solo",
      avisos: [
        {
          hora: "hoy 6:12 a. m.",
          texto: "Llegó pescado nuevo: pargo rojo, 40 kg. ¿Quieres reservar?",
        },
        { hora: "hoy 6:40 a. m.", texto: "Tu pedido está listo en el muelle 2." },
      ],
    },
    ia: {
      titulo: "Asistente de la app",
      quien: "asistente",
      pregunta: "¿Qué me recomiendas para hoy?",
      respuesta:
        "Pargo rojo: llegó fresco esta mañana y está en buen precio. ¿Te aparto un kilo?",
      confirma: "Sí, dale.",
    },
    seguridad: {
      lineas: [
        "Datos de los pescadores y pedidos protegidos.",
        "Lista para mostrarla al mundo.",
      ],
    },
  },

  aviso: {
    resaltado: "¿Solo tenés tiempo para una ola?",
    texto:
      " Tranquilo: cada ola se surfea sola y te deja algo construido. Pero si surfeás las siete, salís con un producto que es tuyo.",
  },
  /** Las dos formas de traer la Marea. Ambos CTA llevan a la seccion de colegios. */
  modos: [
    {
      titulo: "Una marejada",
      sub: "Una ola, una jornada",
      items: [
        "Elegimos juntos la ola que más le sirve a tu colegio",
        "Cada estudiante sale con el entregable de esa ola",
        "Y con su primera insignia",
      ],
      cta: "Traer una ola a mi colegio",
      completa: false,
    },
    {
      titulo: "La Marea completa",
      sub: "Siete olas, un producto por estudiante",
      items: [
        "Las siete olas conectadas, sesión a sesión",
        "Cada estudiante construye su propio producto",
        "Cierre con la Feria de la Marea: lo presentan ante su colegio y su familia",
      ],
      cta: "Traer la Marea a mi colegio",
      completa: true,
    },
  ],
  feria: {
    lineas: [
      "Cada ola que surfeás te deja una insignia.",
      "Y cuando completás la Marea, ya no sos el mismo.",
    ],
    pie: 'La Marea termina en una feria donde cada estudiante dice: "esto lo hice yo".',
  },
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
 * bajando para saber cuanto cuesta y que le van a pedir. Las preguntas
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
    {
      pregunta: "¿Tenemos que hacer las siete olas?",
      respuesta:
        "No. Cada ola se surfea sola y deja algo construido. Pero si el colegio puede recibir la Marea completa, cada estudiante termina con un producto propio y lo presenta en la Feria de la Marea. Siempre proponemos la Marea; la marejada de una sola ola es la puerta de entrada.",
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
 * LOS QUE TRAEN LA OLA — el directorio de voluntarios fundadores
 * ---------------------------------------------------------------------------
 * Va justo despues de la bitacora: esa dice "construyendo la marea:
 * voluntarios" y esta les pone nombre y cara. La convocatoria de "Trae la
 * ola" viene detras, cuando ya se vio que hay gente de verdad aqui.
 *
 * Los datos de cada persona viven en `content/voluntarios.ts`; aqui solo el
 * texto de la seccion.
 * ---------------------------------------------------------------------------
 */
export const losQueTraenLaOla = {
  id: "los-que-traen-la-ola",
  /** El numero sale del array de voluntarios, nunca se escribe a mano. */
  contador: (n: number) => `marea.length => ${n};`,
  titulo: "Los que traen la ola",
  sub: "Profesionales que ya viven de la tecnología y decidieron llevarla donde más se necesita. Sin nómina, sin jefes: solo ganas de compartir.",
  filtros: {
    etiqueta: "Filtrar voluntarios por ola",
    todas: "Todas las olas",
    /** Anuncio para lectores de pantalla cada vez que cambia el filtro. */
    resultado: (n: number) =>
      `${n} ${n === 1 ? "carnet" : "carnets"} a la vista`,
  },
  carnet: {
    rol: { f: "Voluntaria fundadora", m: "Voluntario fundador" },
    /** Solo para lectores de pantalla: le da sentido a las pills. */
    olaPrincipal: "Ola principal:",
    olasExtra: "También trae:",
  },
  siguiente: {
    titulo: "¿Tú traes la siguiente?",
    texto: "Aquí va tu carnet",
    /** Abre el mismo correo de postulacion de `traeLaOla.cta`. */
    cta: "Sumarme a la marea",
  },
  cierre: "marea.sumar(voluntario) => imparable;",
  /** Codigo que flota sobre el mar del pie de la seccion. Decorativo. */
  snippets: [
    "surfear(ola)",
    "ignorar(distancia)",
    'console.log("hola, Pacífico")',
    "marea.sumar(voluntario)",
  ],
  /**
   * El color de cada ola sobre fondo claro. El crudo (`olas.items[].color`)
   * da 1.5-2:1 sobre espuma: sirve para bordes, puntos y rellenos tenues,
   * nunca para texto. El texto va en su `tinta.*` (>=4.6:1).
   */
  tintaOla: {
    programacion: "#217E46",
    ia: "#C1462D",
    innovacion: "#227893",
    datos: "#257A7A",
    diseno: "#CB306C",
    automatizacion: "#6C5BD9",
    seguridad: "#356BD0",
  } satisfies Record<IdOla, string>,
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
