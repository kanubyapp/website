/*
 * Catálogo de la calculadora de espacio para minibodegas.
 *
 * ESTIMACIÓN PENDIENTE DE VALIDAR CON KANUBY: los volúmenes son de
 * referencia, valores típicos de las tablas de volumen de mudanzas y
 * self-storage, redondeados. Se editan aquí sin tocar nada más:
 *   - id: estable. Lo usa el guardado del navegador (si se cambia, el
 *     objeto guardado con el id viejo se descarta) y después llevará la
 *     imagen de cada objeto.
 *   - nombre: en singular, así sale en el mensaje de WhatsApp ("Silla de
 *     comedor: 4").
 *   - volumen: m³ que ocupa empacado o emplayado. Las camas incluyen su base.
 *   - sinonimos: cómo lo dice la gente, para el buscador. Mayúsculas y
 *     acentos dan igual.
 *
 * Al final, SUGERENCIAS_CAJAS: lo que normalmente va en caja. Si alguien
 * busca "libros", en lugar de no encontrar nada se le sugiere la caja.
 */

export type ObjetoCatalogo = {
  id: string;
  nombre: string;
  /** m³ que ocupa el objeto, empacado o emplayado */
  volumen: number;
  sinonimos?: string[];
};

export type CategoriaCatalogo = {
  id: string;
  nombre: string;
  objetos: ObjetoCatalogo[];
};

/*
 * Margen de acomodo: lo que se suma al volumen de los objetos por los huecos
 * que dejan las piezas irregulares (patas, respaldos, cabeceras), porque no
 * todo se apila hasta el techo (lo pesado o frágil no aguanta carga encima) y
 * por el pasillo para llegar al fondo. Con 0.3, un objeto de 1 m³ ocupa
 * 1.3 m³: se aprovecha el 77% de la bodega. La regla común va de 20% a 30%;
 * se toma el extremo conservador porque recomendar un tamaño que luego no
 * alcanza es peor que quedar holgado.
 */
export const MARGEN_ACOMODO = 0.3;

export const CATEGORIAS: CategoriaCatalogo[] = [
  {
    id: "sala",
    nombre: "Sala",
    objetos: [
      { id: "sofa-3", nombre: "Sofá de 3 plazas", volumen: 1.5, sinonimos: ["sillón de 3", "sofá grande", "couch"] },
      { id: "sofa-2", nombre: "Sofá de 2 plazas", volumen: 1, sinonimos: ["love seat", "loveseat", "sillón de 2", "sofá chico"] },
      { id: "sillon", nombre: "Sillón individual", volumen: 0.6, sinonimos: ["butaca", "reposet", "poltrona", "sofá individual"] },
      { id: "sofa-cama", nombre: "Sofá cama", volumen: 1.6, sinonimos: ["futón", "futon", "sillón cama"] },
      { id: "sala-l", nombre: "Sala en L", volumen: 2.5, sinonimos: ["sala esquinera", "seccional", "sofá en L", "sala modular"] },
      { id: "mesa-centro", nombre: "Mesa de centro", volumen: 0.3, sinonimos: ["mesita de centro"] },
      { id: "mesa-lateral", nombre: "Mesa lateral", volumen: 0.15, sinonimos: ["mesita", "mesa auxiliar"] },
      { id: "mueble-tv", nombre: "Mueble de TV", volumen: 0.5, sinonimos: ["centro de entretenimiento", "rack", "mueble de tele"] },
      { id: "pantalla", nombre: "Pantalla", volumen: 0.2, sinonimos: ["tele", "tv", "televisión", "televisor", "smart tv"] },
      { id: "librero", nombre: "Librero", volumen: 0.8, sinonimos: ["estante", "estantería", "repisa", "librera"] },
      { id: "lampara-pie", nombre: "Lámpara de pie", volumen: 0.15, sinonimos: ["lámpara", "lampara de piso"] },
      { id: "puff", nombre: "Puff", volumen: 0.15, sinonimos: ["puf", "taburete", "otomana", "reposapiés"] },
      { id: "tapete", nombre: "Tapete enrollado", volumen: 0.1, sinonimos: ["alfombra"] },
    ],
  },
  {
    id: "recamara",
    nombre: "Recámara",
    objetos: [
      { id: "cama-individual", nombre: "Cama individual", volumen: 0.9, sinonimos: ["cama de niño", "cama infantil", "cama sencilla", "cama twin"] },
      { id: "cama-matrimonial", nombre: "Cama matrimonial", volumen: 1.2, sinonimos: ["cama doble", "cama full"] },
      { id: "cama-queen", nombre: "Cama queen", volumen: 1.6, sinonimos: ["queen size"] },
      { id: "cama-king", nombre: "Cama king", volumen: 2, sinonimos: ["king size"] },
      { id: "colchon", nombre: "Colchón solo", volumen: 0.6, sinonimos: ["colchón", "colchoneta"] },
      { id: "litera", nombre: "Litera", volumen: 1.8, sinonimos: ["cama litera", "camas literas"] },
      { id: "cuna", nombre: "Cuna", volumen: 0.5, sinonimos: ["cuna de bebé", "corral"] },
      { id: "buro", nombre: "Buró", volumen: 0.2, sinonimos: ["mesa de noche", "mesita de noche"] },
      { id: "comoda", nombre: "Cómoda", volumen: 0.8, sinonimos: ["cajonera", "chifonier"] },
      { id: "ropero", nombre: "Ropero", volumen: 1.5, sinonimos: ["clóset", "closet", "armario", "guardarropa"] },
      { id: "tocador", nombre: "Tocador", volumen: 0.6, sinonimos: ["peinador", "vanity"] },
      { id: "espejo-pie", nombre: "Espejo de pie", volumen: 0.1, sinonimos: ["espejo", "espejo de cuerpo completo"] },
    ],
  },
  {
    id: "comedor",
    nombre: "Comedor",
    objetos: [
      { id: "mesa-4", nombre: "Mesa de 4 personas", volumen: 0.6, sinonimos: ["antecomedor", "comedor chico", "mesa de comedor"] },
      { id: "mesa-8", nombre: "Mesa de 6 a 8 personas", volumen: 1, sinonimos: ["comedor grande", "mesa de comedor"] },
      { id: "silla", nombre: "Silla de comedor", volumen: 0.2, sinonimos: ["silla"] },
      { id: "vitrina", nombre: "Vitrina o trinchador", volumen: 1, sinonimos: ["aparador", "cristalero", "bufetera", "credenza"] },
      { id: "banco-alto", nombre: "Banco alto", volumen: 0.15, sinonimos: ["banco", "periquera", "banco de barra"] },
    ],
  },
  {
    id: "cocina",
    nombre: "Cocina y lavado",
    objetos: [
      { id: "refrigerador", nombre: "Refrigerador", volumen: 1, sinonimos: ["refri", "nevera", "frigorífico", "frigobar"] },
      { id: "refrigerador-duplex", nombre: "Refrigerador dúplex", volumen: 1.5, sinonimos: ["refri dúplex", "side by side", "refri de dos puertas"] },
      { id: "estufa", nombre: "Estufa", volumen: 0.5, sinonimos: ["horno", "cocineta", "parrilla eléctrica"] },
      { id: "lavadora", nombre: "Lavadora", volumen: 0.4, sinonimos: ["lavarropas"] },
      { id: "secadora", nombre: "Secadora", volumen: 0.4 },
      { id: "lavavajillas", nombre: "Lavavajillas", volumen: 0.4, sinonimos: ["lavaplatos", "lavatrastes"] },
      { id: "microondas", nombre: "Microondas", volumen: 0.1, sinonimos: ["micro", "horno de microondas"] },
      { id: "alacena", nombre: "Alacena", volumen: 0.8, sinonimos: ["despensa", "gabinete de cocina", "trastero"] },
    ],
  },
  {
    id: "oficina",
    nombre: "Oficina",
    objetos: [
      { id: "escritorio", nombre: "Escritorio", volumen: 0.8, sinonimos: ["mesa de trabajo", "mesa de estudio"] },
      { id: "silla-oficina", nombre: "Silla de oficina", volumen: 0.3, sinonimos: ["silla de escritorio", "silla ejecutiva", "silla gamer"] },
      { id: "archivero", nombre: "Archivero", volumen: 0.4, sinonimos: ["gabinete de archivo"] },
      { id: "computadora", nombre: "Computadora", volumen: 0.1, sinonimos: ["compu", "pc", "laptop", "monitor", "cpu"] },
    ],
  },
  {
    id: "otros",
    nombre: "Exterior y otros",
    objetos: [
      { id: "bicicleta", nombre: "Bicicleta", volumen: 0.4, sinonimos: ["bici"] },
      { id: "bicicleta-fija", nombre: "Bicicleta fija", volumen: 0.5, sinonimos: ["bici fija", "bicicleta estática", "spinning", "elíptica"] },
      { id: "caminadora", nombre: "Caminadora", volumen: 1, sinonimos: ["trotadora", "banda para correr"] },
      { id: "asador", nombre: "Asador", volumen: 0.5, sinonimos: ["parrilla", "grill", "carbón"] },
      { id: "mesa-jardin", nombre: "Mesa de jardín", volumen: 0.6, sinonimos: ["mesa de terraza", "mesa de patio"] },
      { id: "silla-jardin", nombre: "Silla de jardín", volumen: 0.2, sinonimos: ["silla de terraza", "silla de patio", "camastro"] },
      { id: "llantas", nombre: "Juego de 4 llantas", volumen: 0.4, sinonimos: ["llanta", "neumáticos", "rines"] },
      { id: "carriola", nombre: "Carriola", volumen: 0.3, sinonimos: ["carreola", "coche de bebé", "cochecito"] },
      { id: "arbol-navidad", nombre: "Árbol de Navidad", volumen: 0.2, sinonimos: ["pino de navidad", "arbolito"] },
      { id: "maleta", nombre: "Maleta", volumen: 0.1, sinonimos: ["valija", "equipaje", "maletín"] },
    ],
  },
  {
    id: "cajas",
    nombre: "Cajas",
    objetos: [
      { id: "caja-chica", nombre: "Caja chica", volumen: 0.04, sinonimos: ["caja pequeña"] },
      { id: "caja-mediana", nombre: "Caja mediana", volumen: 0.07 },
      { id: "caja-grande", nombre: "Caja grande", volumen: 0.11 },
      { id: "caja-archivo", nombre: "Caja de archivo muerto", volumen: 0.03, sinonimos: ["caja de archivo", "caja de documentos"] },
      { id: "caja-ropero", nombre: "Caja de ropero", volumen: 0.25, sinonimos: ["caja de clóset", "caja para ropa colgada"] },
      { id: "contenedor-plastico", nombre: "Contenedor de plástico", volumen: 0.07, sinonimos: ["caja de plástico", "organizador", "tina de plástico"] },
    ],
  },
];

export type SugerenciaCajas = {
  id: string;
  /** Palabras que la disparan, en singular: "libro" también encuentra "libros" */
  terminos: string[];
  texto: string;
  /** Ids de las cajas sugeridas, en el orden en que se muestran */
  cajas: string[];
};

export const SUGERENCIAS_CAJAS: SugerenciaCajas[] = [
  {
    id: "libros",
    terminos: ["libro", "documento", "papel", "papeleria", "revista", "cuaderno", "carpeta", "expediente", "factura"],
    texto: "Libros y artículos pequeños se guardan mejor en cajas. Te sugerimos cajas chicas, porque pesan.",
    cajas: ["caja-chica", "caja-archivo"],
  },
  {
    id: "ropa",
    terminos: ["ropa", "zapato", "tenis", "bota", "cobija", "almohada", "peluche", "sabana", "edredon", "toalla", "blancos", "cortina"],
    texto:
      "La ropa, los zapatos y la ropa de cama se guardan mejor en cajas. Te sugerimos cajas de ropero para lo que va colgado y cajas grandes para lo demás, porque pesan poco y abultan.",
    cajas: ["caja-ropero", "caja-grande"],
  },
  {
    id: "cocina",
    terminos: ["plato", "vaso", "traste", "olla", "sarten", "taza", "vajilla", "cubierto", "copa", "loza", "cristaleria"],
    texto:
      "Platos, vasos y trastes se guardan mejor en cajas. Te sugerimos cajas medianas, porque así no pesan de más y van mejor protegidos.",
    cajas: ["caja-mediana"],
  },
  {
    id: "pequenos",
    terminos: ["juguete", "adorno", "decoracion", "cable", "aparato", "herramienta", "electronico", "videojuego", "cargador", "foco"],
    texto:
      "Juguetes, adornos y cosas pequeñas se guardan mejor en cajas. Te sugerimos cajas medianas, porque son fáciles de cargar y de acomodar.",
    cajas: ["caja-mediana"],
  },
];
