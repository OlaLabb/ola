/**
 * ---------------------------------------------------------------------------
 * LOS QUE TRAEN LA OLA — el directorio de voluntarios
 * ---------------------------------------------------------------------------
 * Una persona = un objeto. Para sumar a alguien a la marea basta con agregar
 * su objeto al final del array: el contador, los filtros y la grilla salen
 * solos de aqui. El orden en pantalla lo manda `numero`, no la posicion.
 *
 * `olaPrincipal` y `olasExtra` usan el `id` de las olas de `content/site.ts`:
 * de ahi salen el nombre y el color, asi una ola se ve igual en toda la pagina.
 *
 * `foto` es opcional: ruta dentro de `public/` (ej: "/voluntarios/fm.jpg").
 * Sin foto, el carnet muestra las iniciales.
 * ---------------------------------------------------------------------------
 */

export type IdOla =
  | "programacion"
  | "ia"
  | "innovacion"
  | "datos"
  | "diseno"
  | "automatizacion"
  | "seguridad";

export type Voluntario = {
  /** Numero de fundador: sale en el carnet como #01, #02... */
  numero: number;
  nombre: string;
  iniciales: string;
  /** Decide "Voluntaria fundadora" o "Voluntario fundador". */
  genero: "f" | "m";
  olaPrincipal: IdOla;
  olasExtra: IdOla[];
  /** Una linea corta: lo que domina. */
  especialidad: string;
  foto?: string;
};

const registro: Voluntario[] = [
  {
    numero: 1,
    nombre: "Francia Elena Mosquera Prado",
    iniciales: "FM",
    genero: "f",
    olaPrincipal: "programacion",
    olasExtra: [],
    especialidad: ".NET, SQL, arquitectura y APIs",
  },
  {
    numero: 2,
    nombre: "Daniela Ocampo",
    iniciales: "DO",
    genero: "f",
    olaPrincipal: "innovacion",
    olasExtra: [],
    especialidad: "Innovación, creatividad y trabajo en equipo",
  },
  {
    numero: 3,
    nombre: "Leonardo Aedo Jiménez",
    iniciales: "LA",
    genero: "m",
    olaPrincipal: "programacion",
    olasExtra: [],
    especialidad: "Java, Angular, nube y liderazgo",
  },
  {
    numero: 4,
    nombre: "Luis Alberto Segura Ospina",
    iniciales: "LS",
    genero: "m",
    olaPrincipal: "programacion",
    olasExtra: ["innovacion"],
    especialidad: "Apps móviles y transformación digital",
  },
  // {
  //   numero: 5,
  //   nombre: "Jean Luis Guerra",
  //   iniciales: "JG",
  //   genero: "m",
  //   olaPrincipal: "ia",
  //   olasExtra: [],
  //   especialidad: "Inteligencia artificial aplicada",
  // },
];

/** La marea, siempre en orden de llegada. */
export const voluntarios = [...registro].sort((a, b) => a.numero - b.numero);
