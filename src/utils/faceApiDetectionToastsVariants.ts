import type { UseToastOptions } from "@chakra-ui/react";

export const detectionToastVariants: Record<
  "detected" | "undetected" | "error",
  UseToastOptions
> = {
  detected: {
    id: "detection-success",
    title: "Rostos detectados com sucesso",
    description: "O rosto foi detectado e o descriptor foi salvo.",
    status: "success",
    duration: 5000,
    isClosable: true,
    position: "bottom-right",
  },
  undetected: {
    id: "detection-fail",
    title: "Nenhum rosto detectado",
    description: "Tente novamente ou use uma outra imagem.",
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "bottom-right",
  },
  error: {
    id: "detection-error",
    title: "Erro ao registrar imagem",
    description: "Houve algum erro ao tentar registrar a imagem.",
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "bottom-right",
  },
};
