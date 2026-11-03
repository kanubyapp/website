/*
 * Datos del negocio tal como están publicados en /minibodegas-monterrey/: la
 * dirección de "Ubícanos", las coordenadas de su mapa, la ficha de Google
 * (reseñas y "Cómo Llegar") y el horario de su pregunta frecuente. Los usan
 * esa página y el JSON-LD de negocio local (lib/schema.ts); para cambiarlos,
 * se cambian aquí. El teléfono está en lib/contacto.ts.
 */

export const DIRECCION = {
  calle: "CARR NACIONAL KM258 SN 5TA SN EMILIO",
  colonia: "Los Rodríguez",
  codigoPostal: "67300",
  municipio: "Santiago",
  estado: "N.L.",
} as const;

/** Como se muestra: "CARR NACIONAL KM258 SN 5TA SN EMILIO, Los Rodríguez, 67300 Santiago, N.L." */
export const DIRECCION_VISIBLE = `${DIRECCION.calle}, ${DIRECCION.colonia}, ${DIRECCION.codigoPostal} ${DIRECCION.municipio}, ${DIRECCION.estado}`;

/** El punto del mapa de "Ubícanos" */
export const COORDENADAS = { latitud: 25.489192, longitud: -100.183956 } as const;

/** Ficha de Google del negocio: las reseñas y "Cómo Llegar" */
export const PERFIL_GOOGLE = "https://share.google/idvTeRuzwdaQkGoee";

type DiaSchema = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

/**
 * Horario de acceso a las minibodegas. texto: como se lee en la pregunta
 * frecuente; dias, abre y cierra: lo mismo para el JSON-LD (24 horas).
 */
export const HORARIO_MINIBODEGAS: {
  texto: string;
  dias: DiaSchema[];
  abre: string;
  cierra: string;
}[] = [
  {
    texto: "Lunes a Viernes: 9:00 AM – 7:00 PM",
    dias: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    abre: "09:00",
    cierra: "19:00",
  },
  { texto: "Sábados: 9:30 AM – 1:00 PM", dias: ["Saturday"], abre: "09:30", cierra: "13:00" },
];

/**
 * Horario de atención de mudanzas (y del negocio en general): el que se
 * publica en la pregunta "¿Qué días hacen mudanzas?" de /mudanzas-monterrey/,
 * "de lunes a viernes, de 9:00 a 18:00". El sábado, pendiente de confirmar
 * con Kanuby si atienden y en qué horario.
 */
export const HORARIO_ATENCION: Omit<(typeof HORARIO_MINIBODEGAS)[number], "texto">[] = [
  {
    dias: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    abre: "09:00",
    cierra: "18:00",
  },
];

/** Lo que no abre: va en el texto; en el JSON-LD, los días sin horario cuentan como cerrados */
export const CERRADO_MINIBODEGAS = ["Domingos: Cerrado", "Días festivos oficiales: Cerrado"];
