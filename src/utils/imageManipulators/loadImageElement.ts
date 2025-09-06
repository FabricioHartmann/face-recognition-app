import { fileToBase64 } from "./fileToBase64";

export async function loadImageElement(file: File): Promise<HTMLImageElement> {
  const base64 = await fileToBase64(file);
  const img = document.createElement("img");
  img.src = base64;
  img.crossOrigin = "anonymous";
  await new Promise<void>((res, rej) => {
    img.onload = () => res();
    img.onerror = () => rej(new Error("Erro ao carregar imagem"));
  });
  return img;
}