export function base64ToFile(base64: string, fileName?: string): File {
  const [metaData, base64Data] = base64.split(",");
  const mimeType = metaData.match(/:(.*?);/)?.[1] || "image/jpeg";
  const fileExtension = mimeType.split("/")[1];
  const finalFileName = fileName ? `${fileName}.${fileExtension}` : `capture.${fileExtension}`;
  // decodificando o base64 em string binária
  const binaryString = atob(base64Data);
  // cria um ArrayBuffer do tamanho da string binária
  const arrayBuffer = new ArrayBuffer(binaryString.length);
  // cria uma view de bytes sobre o buffer
  const uint8Array = new Uint8Array(arrayBuffer);
  // preenche o array de bytes com os valores da string binária
  for (let i = 0; i < binaryString.length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }
  
  const blob = new Blob([uint8Array], { type: mimeType });
  return new File([blob], finalFileName, { type: mimeType });
}
