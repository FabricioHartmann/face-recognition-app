import { Flex, Spinner, Text } from "@chakra-ui/react";
import type { FaceApiLoaderProps } from "./ModelsLoader.types";

export function FaceApiLoader({ status }: FaceApiLoaderProps) {
  if (status === "success") return null;

  return (
    <Flex
      height="100vh"
      align="center"
      justify="center"
      direction="column"
      gap={4}
    >
      {status === "loading" && <Spinner size="xl" />}
      <Text color={status === "error" ? "red.500" : "white"} fontSize="lg">
        {status === "loading"
          ? "Carregando modelos..."
          : "Erro ao carregar os modelos."}
      </Text>
    </Flex>
  );
}
