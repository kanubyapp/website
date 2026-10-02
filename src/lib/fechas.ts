/*
 * Fecha relativa de las reseñas de Google, con las mismas palabras que el
 * widget de Trustindex de kanuby.com: "hace %d %s|hoy|día|días|semana|
 * semanas|mes|meses|año|años".
 */

const DIA_MS = 24 * 60 * 60 * 1000;

function plural(cantidad: number, singular: string, varios: string) {
  return `hace ${cantidad} ${cantidad === 1 ? singular : varios}`;
}

/** fecha en formato AAAA-MM-DD; hoy, el momento desde el que se cuenta */
export function fechaRelativa(fecha: string, hoy: Date): string {
  const dias = Math.floor((hoy.getTime() - Date.parse(`${fecha}T00:00:00Z`)) / DIA_MS);
  if (dias < 1) return "hoy";
  if (dias < 7) return plural(dias, "día", "días");
  if (dias < 30) return plural(Math.floor(dias / 7), "semana", "semanas");
  if (dias < 365) return plural(Math.floor(dias / 30), "mes", "meses");
  return plural(Math.floor(dias / 365), "año", "años");
}
