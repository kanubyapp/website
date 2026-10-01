import type { Metadata } from "next";
import { PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Aviso de privacidad | Kanuby",
  description:
    "Aviso de privacidad de Kanuby: qué datos personales recabamos, para qué los usamos y cómo ejercer tus derechos ARCO.",
};

export default function PrivacidadPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <p className="text-ui text-sm font-medium tracking-wider text-brand-blue">
        AVISO DE PRIVACIDAD
      </p>
      <h1 className="font-heading mt-3 text-4xl tracking-tight text-brand-blue md:text-5xl">
        Aviso de privacidad
      </h1>
      <p className="mt-4 text-lg text-brand-blue">
        Última actualización:{" "}
        <span className="font-semibold">[PENDIENTE — fecha de publicación]</span>
      </p>

      <div className="mt-8 rounded-2xl border border-brand-orange/40 bg-surface p-5">
        <p className="text-ui text-sm font-semibold text-brand-blue">
          Contenido de ejemplo — pendiente de revisión legal
        </p>
        <p className="mt-2 text-sm text-muted">
          El texto de esta página es un modelo de referencia, elaborado
          conforme a la estructura mínima que exige la Ley Federal de
          Protección de Datos Personales en Posesión de los Particulares
          (LFPDPPP) de México. No es un documento legal definitivo: los
          datos del responsable, las finalidades específicas y el
          procedimiento ARCO deben ser revisados y validados por un abogado
          antes de publicarse como versión final.
        </p>
      </div>

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="font-heading text-2xl text-brand-blue md:text-3xl">
            1. Identidad y domicilio del responsable
          </h2>
          <p className="mt-3 text-base text-muted">
            Kanuby (&ldquo;Kanuby&rdquo;, &ldquo;nosotros&rdquo;) es
            responsable del tratamiento de tus datos personales conforme a
            este aviso de privacidad, en cumplimiento de la LFPDPPP y su
            reglamento.
          </p>
          <ul className="mt-3 space-y-1.5 text-base text-muted">
            <li>
              Razón social:{" "}
              <span className="font-semibold text-brand-blue">
                [PENDIENTE — razón social registrada]
              </span>
            </li>
            <li>
              Domicilio:{" "}
              <span className="font-semibold text-brand-blue">
                [PENDIENTE]
              </span>
            </li>
            <li>
              Contacto:{" "}
              <a href={PHONE_HREF} className="font-semibold text-brand-blue underline underline-offset-2">
                {PHONE_DISPLAY}
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-brand-blue md:text-3xl">
            2. Datos personales que recabamos
          </h2>
          <p className="mt-3 text-base text-muted">
            Para poder cotizar y prestar nuestros servicios de mudanza y
            minibodegas, recabamos datos de identificación y contacto como
            nombre, teléfono, correo electrónico y domicilio (origen y
            destino de la mudanza, o dirección de la minibodega contratada).
          </p>
          <p className="mt-3 text-base text-muted">
            [PENDIENTE — confirmar si se recaban datos adicionales, por
            ejemplo datos de facturación (RFC, domicilio fiscal) o
            fotografías/inventario de los bienes para efectos de
            cotización y responsabilidad del traslado.]
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-brand-blue md:text-3xl">
            3. Finalidades del tratamiento
          </h2>
          <p className="mt-3 text-base text-muted">
            Tus datos personales se utilizan para: contactarte y elaborar tu
            cotización, coordinar y ejecutar el servicio contratado
            (mudanza o renta de minibodega), dar seguimiento a la relación
            comercial y, en su caso, facturar el servicio.
          </p>
          <p className="mt-3 text-base text-muted">
            [PENDIENTE — confirmar si además se usan los datos para
            finalidades secundarias, como envío de promociones o
            encuestas de satisfacción, y ofrecer la opción de no dar
            consentimiento para esas finalidades sin que eso condicione el
            servicio principal.]
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-brand-blue md:text-3xl">
            4. Transferencia de datos
          </h2>
          <p className="mt-3 text-base text-muted">
            [PENDIENTE — indicar si tus datos se comparten con terceros
            (por ejemplo, aseguradoras, proveedores de facturación o
            servicios de mensajería/WhatsApp Business) y con qué
            finalidad. Si no hay transferencias a terceros distintas a las
            necesarias para operar el servicio, este documento debe
            decirlo explícitamente.]
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-brand-blue md:text-3xl">
            5. Derechos ARCO
          </h2>
          <p className="mt-3 text-base text-muted">
            Tienes derecho a Acceder a tus datos personales, Rectificarlos
            si son inexactos, Cancelarlos cuando consideres que no se
            requieren para alguna de las finalidades señaladas en este
            aviso, y Oponerte al tratamiento de los mismos para fines
            específicos (derechos ARCO). También puedes revocar el
            consentimiento que, en su caso, nos hayas otorgado.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-brand-blue md:text-3xl">
            6. Medios para ejercer tus derechos ARCO
          </h2>
          <p className="mt-3 text-base text-muted">
            Para ejercer cualquiera de los derechos ARCO, puedes
            contactarnos por teléfono al{" "}
            <a href={PHONE_HREF} className="font-semibold text-brand-blue underline underline-offset-2">
              {PHONE_DISPLAY}
            </a>{" "}
            o por{" "}
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-blue underline underline-offset-2"
            >
              WhatsApp
            </a>
            . [PENDIENTE — definir un correo electrónico dedicado a
            solicitudes de privacidad y el procedimiento/plazo de
            respuesta, como exige la LFPDPPP.]
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-brand-blue md:text-3xl">
            7. Cambios a este aviso de privacidad
          </h2>
          <p className="mt-3 text-base text-muted">
            Este aviso de privacidad puede sufrir modificaciones derivadas
            de nuevos requisitos legales, de nuestras propias necesidades
            por los servicios que ofrecemos, o de otras causas. Nos
            comprometemos a mantenerte informado sobre los cambios que
            pueda sufrir este aviso a través de esta misma página.
          </p>
        </section>
      </div>
    </article>
  );
}
