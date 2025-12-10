import type { UseToastOptions } from "@chakra-ui/react";

export const detectionToastVariants: Record<
  "undetected" | "error" | "camera",
  UseToastOptions
> = {
  undetected: {
    id: "detection-fail",
    title: "Nenhum rosto detectado",
    description: "Tente novamente ou use uma outra imagem.",
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "top-right",
  },
  error: {
    id: "detection-error",
    title: "Erro ao registrar imagem",
    description: "Houve algum erro ao tentar registrar a imagem.",
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "top-right",
  },
  camera: {
    id: "camera-error",
    title: "Erro ao detectar câmera",
    description: "Houve algum erro com a câmera, verifique conexão ou permissões do navegador",
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "top-right",
  },
};
