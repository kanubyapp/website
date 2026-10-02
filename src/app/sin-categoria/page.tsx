import { ArchivoCategoria, metadataCategoria } from "@/components/blog/archivo-categoria";

export const metadata = metadataCategoria("sin-categoria");

export default function Categoria() {
  return <ArchivoCategoria categoria="sin-categoria" />;
}
