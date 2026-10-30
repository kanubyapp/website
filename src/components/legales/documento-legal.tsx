import { HeaderBlog } from "@/components/blog/header-blog";
import { SiteFooter } from "@/components/site-footer";
import styles from "./documento-legal.module.css";

/*
 * Estructura común del aviso de privacidad y los términos: cabecera con
 * antetítulo, título y fecha de actualización sobre el resplandor, y el
 * documento en una columna de lectura con el patrón kb-prosa.
 */
export function DocumentoLegal({
  antetitulo,
  titulo,
  actualizacion,
  children,
}: {
  antetitulo: string;
  titulo: string;
  actualizacion: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderBlog servicio={null} />
      <main>
        <header className={`kb-resplandor ${styles.cabecera}`}>
          <p className={styles.antetitulo}>{antetitulo}</p>
          <h1 className={styles.titulo}>{titulo}</h1>
          <p className={styles.actualizacion}>Última actualización: {actualizacion}</p>
        </header>
        <article className={`kb-prosa ${styles.documento}`}>{children}</article>
      </main>
      <SiteFooter />
    </>
  );
}

/*
 * Dato que falta confirmar con Kanuby. Se ve en la página y se encuentra en
 * el código buscando "<Pendiente". Mientras quede uno, LEGALES_CONFIRMADOS no
 * puede pasar a true (lib/legales.test.ts).
 */
export function Pendiente({ children }: { children: React.ReactNode }) {
  return <mark className={styles.pendiente}>Pendiente: {children}</mark>;
}
