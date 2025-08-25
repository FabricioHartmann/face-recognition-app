import { Box, Spinner, Text, Alert } from "@chakra-ui/react";
import { useFaceApiModels } from "../../hooks/useFaceApiModels";

export function ModelLoaderChecker() {
  const modelsReady = useFaceApiModels();

  if (!modelsReady) {
    return (
      <Box p={4}>
        <Spinner size="sm" mr={2} />
        <Text display="inline">
          Carregando modelos de reconhecimento facial...
        </Text>
      </Box>
    );
  }

  if (modelsReady) {
    return (
      <Alert status="success" mt={4}>
        Modelos carregados com sucesso!
      </Alert>
    );
  }

  return null;
}
