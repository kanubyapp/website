import { ArchivoCategoria, metadataCategoria } from "@/components/blog/archivo-categoria";

export const metadata = metadataCategoria("minibodegas");

export default function Categoria() {
  return <ArchivoCategoria categoria="minibodegas" />;
}
