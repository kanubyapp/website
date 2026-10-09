import type { Metadata } from "next";
import { DocumentoLegal, Pendiente } from "@/components/legales/documento-legal";
import { robotsLegales } from "@/lib/legales";
import { jsonLdBase, serializarJsonLd } from "@/lib/schema";

/*
 * Aviso de privacidad integral conforme a la Ley Federal de Protección de
 * Datos Personales en Posesión de los Particulares publicada en el DOF el
 * 20 de marzo de 2025. Parte de la estructura del borrador de legacy. Los
 * datos sin confirmar van con <Pendiente> y la página lleva noindex hasta
 * que se confirmen (lib/legales.ts).
 */

const ruta = "/aviso-de-privacidad/";
const titulo = "Aviso de privacidad";
const descripcion =
  "Aviso de privacidad de Kanuby: qué datos personales recabamos, para qué los usamos y cómo ejercer tus derechos ARCO.";

export const metadata: Metadata = {
  title: titulo,
  description: descripcion,
  alternates: { canonical: ruta },
  robots: robotsLegales,
  openGraph: {
    type: "article",
    locale: "es_MX",
    url: ruta,
    siteName: "Kanuby",
    title: `${titulo} - Kanuby`,
    description: descripcion,
  },
};

const jsonLd = jsonLdBase({ ruta, nombre: `${titulo} - Kanuby`, descripcion });

export default function AvisoDePrivacidad() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializarJsonLd(jsonLd) }}
      />
      <DocumentoLegal
        ruta={ruta}
        antetitulo="Aviso de privacidad"
        titulo="Aviso de privacidad"
        actualizacion={<Pendiente>fecha de publicación</Pendiente>}
      >
        <p>
          <Pendiente>
            revisión de un abogado antes de publicar. Este texto sigue la estructura del aviso
            integral de la LFPDPPP publicada el 20 de marzo de 2025, pero no es la versión final.
          </Pendiente>
        </p>

        <h2 data-estilo="3">1. Identidad y domicilio del responsable</h2>
        <p>
          Kanuby (&ldquo;Kanuby&rdquo;, &ldquo;nosotros&rdquo;) es responsable del tratamiento de
          tus datos personales conforme a este aviso de privacidad y a la Ley Federal de Protección
          de Datos Personales en Posesión de los Particulares.
        </p>
        <ul>
          <li>
            Razón social: <Pendiente>confirmar si es KANUBY, S.A. de C.V. también para mudanzas</Pendiente>
          </li>
          <li>
            Domicilio: <Pendiente>domicilio del responsable</Pendiente>
          </li>
          <li>
            Correo para asuntos de privacidad: <Pendiente>confirmar si es info@kanuby.com u otro</Pendiente>
          </li>
          <li>
            Teléfono: <Pendiente>cuál de 81 1028 7087, 81 1500 6365 u 81 8336 3637</Pendiente>
          </li>
        </ul>

        <h2 data-estilo="3">2. Datos personales que recabamos</h2>
        <p>
          Cuando pides una cotización en este sitio recabamos tu nombre, tu teléfono y el servicio
          que te interesa. Si después nos escribes por WhatsApp, también tratamos lo que compartas
          en esa conversación. Para prestar el servicio contratado podemos pedirte los domicilios
          de origen y destino de la mudanza o de entrega y recolección de la minibodega.
        </p>
        <p>
          <Pendiente>
            confirmar si se recaban otros datos, como los de facturación (RFC, domicilio fiscal) o
            fotografías e inventario de los bienes.
          </Pendiente>
        </p>
        <p>
          No recabamos datos personales sensibles. <Pendiente>confirmar</Pendiente>
        </p>

        <h2 data-estilo="3">3. Finalidades del tratamiento</h2>
        <p>Usamos tus datos para estas finalidades, necesarias para el servicio que nos pides:</p>
        <ul>
          <li>Contactarte y preparar tu cotización.</li>
          <li>Coordinar y prestar el servicio contratado, de mudanza o de minibodega.</li>
          <li>Dar seguimiento a tu solicitud y atenderte.</li>
          <li>Facturar el servicio, cuando corresponda.</li>
        </ul>
        <p>
          <Pendiente>
            confirmar si los datos se usan también para finalidades secundarias, como promociones o
            encuestas de satisfacción. Si es así, aquí se enlistan y se indica cómo negarte a ellas
            sin que eso afecte el servicio.
          </Pendiente>
        </p>

        <h2 data-estilo="3">4. Con quién compartimos tus datos</h2>
        <p>
          Para operar el sitio y atenderte nos apoyamos en proveedores que tratan tus datos por
          cuenta nuestra y solo para estas finalidades: el hospedaje del sitio (Vercel), el envío de
          los avisos internos de cotización por correo (Resend), la mensajería por WhatsApp (Meta)
          y el seguimiento de las solicitudes de cotización (respond.io). Algunos de estos
          proveedores tratan los datos fuera de México.
        </p>
        <p>
          <Pendiente>
            confirmar la lista de proveedores e indicar si hay transferencias a terceros que
            requieran tu consentimiento, como aseguradoras. Si no las hay, decirlo de forma
            expresa.
          </Pendiente>
        </p>

        <h2 data-estilo="3">5. Tus derechos ARCO</h2>
        <p>
          Tienes derecho a acceder a tus datos personales, a rectificarlos si son inexactos o
          están incompletos, a cancelarlos y a oponerte a su tratamiento para fines específicos.
        </p>
        <p>
          Para ejercerlos, envía tu solicitud a <Pendiente>correo para solicitudes ARCO</Pendiente>{" "}
          con:
        </p>
        <ul>
          <li>Tu nombre y un medio para comunicarte la respuesta.</li>
          <li>Un documento que acredite tu identidad o, en su caso, la de tu representante.</li>
          <li>La descripción clara de los datos y del derecho que quieres ejercer.</li>
          <li>Cualquier otro elemento que ayude a localizar tus datos.</li>
        </ul>
        <p>
          Te comunicaremos la respuesta en un máximo de 20 días hábiles desde que recibamos la
          solicitud y, si procede, la haremos efectiva dentro de los 15 días hábiles siguientes.{" "}
          <Pendiente>procedimiento interno y plazos confirmados por el abogado</Pendiente>
        </p>

        <h2 data-estilo="3">6. Revocar tu consentimiento y limitar el uso de tus datos</h2>
        <p>
          Puedes revocar el consentimiento que nos hayas dado o pedir que limitemos el uso o la
          divulgación de tus datos por el mismo medio que las solicitudes ARCO. La revocación puede
          impedir que sigamos prestándote el servicio.
        </p>

        <h2 data-estilo="3">7. Cookies y tecnologías de rastreo</h2>
        <p>
          Este sitio usa cookies y tecnologías similares de Google (Tag Manager y Ads) y de Meta
          (Pixel) para medir las visitas y el resultado de nuestras campañas. Recaban datos de
          navegación como páginas visitadas, tipo de dispositivo y navegador. Puedes bloquearlas o
          borrarlas desde la configuración de tu navegador.
        </p>
        <p>
          <Pendiente>
            confirmar la lista de etiquetas que se disparan en el contenedor de GTM.
          </Pendiente>
        </p>

        <h2 data-estilo="3">8. Cambios a este aviso</h2>
        <p>
          Podemos modificar este aviso por cambios en la ley, en nuestros servicios o en nuestras
          prácticas. Publicaremos cualquier cambio en esta misma página, con su fecha de
          actualización.
        </p>

        <h2 data-estilo="3">9. Autoridad</h2>
        <p>
          Si consideras que tu derecho a la protección de datos personales ha sido vulnerado,
          puedes acudir a la Secretaría Anticorrupción y Buen Gobierno, autoridad en la materia.
        </p>
      </DocumentoLegal>
    </>
  );
}
