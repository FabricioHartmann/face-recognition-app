import type { UseToastOptions } from "@chakra-ui/react"

export const modelsToastVariants: Record<
  "loading" | "success" | "error",
  UseToastOptions
> = {
  loading: {
    id: "models-loading",
    title: "Carregando modelos...",
    description: "Aguarde enquanto os modelos de reconhecimento facial são carregados.",
    status: "info",
    duration: null,
    isClosable: false,
    position: "bottom-right",
  },
  success: {
    id: "models-success",
    title: "Modelos carregados!",
    description: "O sistema de reconhecimento facial está pronto.",
    status: "success",
    duration: 3000,
    isClosable: true,
    position: "bottom-right",
  },
  error: {
    id: "models-error",
    title: "Erro ao carregar modelos",
    description: "Verifique sua conexão ou tente novamente.",
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "bottom-right",
  },
}