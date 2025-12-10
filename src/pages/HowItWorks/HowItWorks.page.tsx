import { Flex, Heading, Text, Button, Link, Card } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile/useIsMobile";
import { RenderIf } from "../../components/RenderIf";

export function HowItWorks() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const returnToHome = () => {
    navigate("/");
  };

  return (
    <Flex
      direction="column"
      minH="100vh"
      p={4}
      justify={"center"}
      align={"center"}
    >
      <Card
        width={{ base: "100%", md: "554px" }}
        padding={4}
        backgroundColor={"#292b30ff"}
      >
        <Flex direction="column" justify="center" align="center" gap={8}>
          <Flex textAlign={"center"} direction={"column"}>
            <Heading textAlign="center" as="h4" size="sm" mb={2}>
              Como funciona o reconhecimento?
            </Heading>
            <Text textAlign="center">
              O sistema utiliza a biblioteca{" "}
              <Link
                href="https://justadudewhohacks.github.io/face-api.js/docs/index.html"
                target="_blank"
                color="#9be8ffff"
                variant="underline"
              >
                Face API
              </Link>{" "}
              para realizar detecção, análise e comparação de rostos.
            </Text>
            <Text>
              Com esses pontos, o rosto é alinhado e processado para gerar um
              descritor.
            </Text>
          </Flex>
          <Flex textAlign={"center"} direction={"column"}>
            <Heading textAlign="center" as="h4" size="sm" mb={2}>
              O que é um descritor?
            </Heading>
            <Text>
              Um descritor é um vetor numérico que representa o rosto detectado.
            </Text>
            <Text>Ex: [0.123, -0.321, 0.400, ...]</Text>

            <Text>
              Cada pessoa possui um descritor diferente, permitindo identificar
              similaridade entre rostos.
            </Text>
          </Flex>
          <Flex textAlign={"center"} direction={"column"}>
            <Heading textAlign="center" as="h4" size="sm" mb={2}>
              Como é feita a comparação?
            </Heading>
            <Text>
              Os descritores são comparados usando distância euclidiana. Quanto
              menor a distância, mais parecidos os rostos são.
            </Text>
          </Flex>
        </Flex>
      </Card>
      <RenderIf condition={isMobile}>
        <Flex w="100%" justifyContent={"center"} mt={4}>
          <Button
            onClick={returnToHome}
            w={{ base: "100%", md: "164px" }}
            rounded="l1"
            colorScheme="green"
          >
            Voltar ao início
          </Button>
        </Flex>
      </RenderIf>
      <RenderIf condition={!isMobile}>
        <Button
          onClick={returnToHome}
          w="164px"
          rounded="l1"
          mt={8}
          colorScheme="green"
        >
          Voltar ao início
        </Button>
      </RenderIf>
    </Flex>
  );
}
