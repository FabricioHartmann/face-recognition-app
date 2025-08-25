import { Flex, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"


export function Home() {
  const navigate = useNavigate()

  const goToRegisterPage = () => {
    navigate("/register")
  }

  const goToScannerPage = () => {
    navigate("/scanner")
  }

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50" px={4}>
      <VStack spacing={6} maxW="md" textAlign="center">
        <Heading as="h1" size="xl" bg="teal" bgClip="text">
          Reconhecimento Facial
        </Heading>

        <Text fontSize="lg" color="gray.600">
          Registre uma imagem para começar
        </Text>
        <Flex direction='column' gap='4'>
          <Button
            colorScheme="teal"
            transition="all 0.2s"
            onClick={goToRegisterPage}
          >
            Registrar imagem
          </Button>
          <Button
            colorScheme="teal"
            transition="all 0.2s"
            onClick={goToScannerPage}
          >
            Reconhecer rosto
          </Button>
        </Flex>
      </VStack>
    </Flex>
  );
}
