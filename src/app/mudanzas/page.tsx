import { ArchivoCategoria, metadataCategoria } from "@/components/blog/archivo-categoria";

export const metadata = metadataCategoria("mudanzas");

export default function Categoria() {
  return <ArchivoCategoria categoria="mudanzas" />;
}
