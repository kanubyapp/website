/*
 * Catálogo de la calculadora de espacio para minibodegas.
 *
 * ESTIMACIÓN PENDIENTE DE VALIDAR CON KANUBY: los volúmenes son de
 * referencia, valores típicos de las tablas de volumen de mudanzas y
 * self-storage, redondeados. Se editan aquí sin tocar nada más: cada objeto
 * lleva un id estable (lo usa el guardado del navegador; si se cambia, el
 * objeto guardado con el id viejo se descarta), su nombre en singular (así
 * sale en el mensaje de WhatsApp: "Silla: 4") y su volumen en m³.
 */

export type ObjetoCatalogo = {
  id: string;
  nombre: string;
  /** m³ que ocupa el objeto, empacado o emplayado */
  volumen: number;
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
      { id: "sofa-3", nombre: "Sofá de 3 plazas", volumen: 1.5 },
      { id: "sofa-2", nombre: "Sofá de 2 plazas", volumen: 1 },
      { id: "sillon", nombre: "Sillón", volumen: 0.6 },
      { id: "mesa-centro", nombre: "Mesa de centro", volumen: 0.3 },
      { id: "mesa-lateral", nombre: "Mesa lateral", volumen: 0.15 },
      { id: "mueble-tv", nombre: "Mueble de TV", volumen: 0.5 },
      { id: "pantalla", nombre: "Pantalla", volumen: 0.2 },
      { id: "librero", nombre: "Librero", volumen: 0.8 },
      { id: "tapete", nombre: "Tapete enrollado", volumen: 0.1 },
    ],
  },
  {
    id: "recamara",
    nombre: "Recámara",
    objetos: [
      { id: "cama-individual", nombre: "Cama individual con base", volumen: 0.9 },
      { id: "cama-matrimonial", nombre: "Cama matrimonial con base", volumen: 1.2 },
      { id: "cama-queen", nombre: "Cama queen con base", volumen: 1.6 },
      { id: "cama-king", nombre: "Cama king con base", volumen: 2 },
      { id: "cuna", nombre: "Cuna", volumen: 0.5 },
      { id: "buro", nombre: "Buró", volumen: 0.2 },
      { id: "comoda", nombre: "Cómoda", volumen: 0.8 },
      { id: "ropero", nombre: "Ropero", volumen: 1.5 },
      { id: "tocador", nombre: "Tocador", volumen: 0.6 },
    ],
  },
  {
    id: "comedor",
    nombre: "Comedor",
    objetos: [
      { id: "mesa-4", nombre: "Mesa de 4 personas", volumen: 0.6 },
      { id: "mesa-8", nombre: "Mesa de 6 a 8 personas", volumen: 1 },
      { id: "silla", nombre: "Silla", volumen: 0.2 },
      { id: "vitrina", nombre: "Vitrina o trinchador", volumen: 1 },
    ],
  },
  {
    id: "cocina",
    nombre: "Cocina",
    objetos: [
      { id: "refrigerador", nombre: "Refrigerador", volumen: 1 },
      { id: "refrigerador-duplex", nombre: "Refrigerador dúplex", volumen: 1.5 },
      { id: "estufa", nombre: "Estufa", volumen: 0.5 },
      { id: "lavadora", nombre: "Lavadora", volumen: 0.4 },
      { id: "secadora", nombre: "Secadora", volumen: 0.4 },
      { id: "microondas", nombre: "Microondas", volumen: 0.1 },
      { id: "alacena", nombre: "Alacena", volumen: 0.8 },
    ],
  },
  {
    id: "oficina",
    nombre: "Oficina",
    objetos: [
      { id: "escritorio", nombre: "Escritorio", volumen: 0.8 },
      { id: "silla-oficina", nombre: "Silla de oficina", volumen: 0.3 },
      { id: "archivero", nombre: "Archivero", volumen: 0.4 },
      { id: "computadora", nombre: "Computadora", volumen: 0.1 },
    ],
  },
  {
    id: "cajas",
    nombre: "Cajas",
    objetos: [
      { id: "caja-chica", nombre: "Caja chica", volumen: 0.04 },
      { id: "caja-mediana", nombre: "Caja mediana", volumen: 0.07 },
      { id: "caja-grande", nombre: "Caja grande", volumen: 0.11 },
      { id: "caja-archivo", nombre: "Caja de archivo muerto", volumen: 0.03 },
      { id: "caja-ropero", nombre: "Caja de ropero", volumen: 0.25 },
      { id: "maleta", nombre: "Maleta", volumen: 0.1 },
    ],
  },
  {
    id: "otros",
    nombre: "Otros",
    objetos: [
      { id: "bicicleta", nombre: "Bicicleta", volumen: 0.4 },
      { id: "caminadora", nombre: "Caminadora", volumen: 1 },
      { id: "arbol-navidad", nombre: "Árbol de Navidad", volumen: 0.2 },
      { id: "caja-herramientas", nombre: "Caja de herramientas", volumen: 0.1 },
      { id: "llantas", nombre: "Juego de 4 llantas", volumen: 0.4 },
      { id: "asador", nombre: "Asador", volumen: 0.5 },
      { id: "mesa-jardin", nombre: "Mesa de jardín", volumen: 0.6 },
      { id: "silla-jardin", nombre: "Silla de jardín", volumen: 0.2 },
    ],
  },
];
