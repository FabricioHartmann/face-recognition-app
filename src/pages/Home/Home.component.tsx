import { Flex, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile/useIsMobile";
import { RenderIf } from "../../components/RenderIf";

export function Home() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const goToComparingPage = () => {
    navigate("/comparar-rostos");
  };

  return (
    <Flex direction="column" minH="100vh" p={4}>
      <Flex direction="column" flex="1" justify="center" align="center">
        <Heading textAlign="center" as="h1" size="xl">
          Face Recon
        </Heading>
        <Text mt={4} textAlign="center" color="#b3b3b3ff">
          Aplicativo simples para testar reconhecimento facial com face-api
        </Text>
        <RenderIf condition={!isMobile}>
          <Button onClick={goToComparingPage} w="164px" rounded="l1" mt={8}>
            Iniciar
          </Button>
        </RenderIf>
      </Flex>
      <RenderIf condition={isMobile}>
        <Flex w="100%" justifyContent={'center'}>
          <Button onClick={goToComparingPage} w={{ base: "100%", md: "164px" }} rounded="l1">
            Iniciar
          </Button>
        </Flex>
      </RenderIf>
    </Flex>
  );
}
