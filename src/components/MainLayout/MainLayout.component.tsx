import { Box, Center, Flex } from "@chakra-ui/react";
import type { MainLayoutrProps } from "./MainLayout.types";
import useIsMobile from "../../hooks/useIsMobile/useIsMobile";

export const MainLayout = ({ children }: MainLayoutrProps) => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <Box bg="gray.700">
          <Flex
            h={"100vh"}
            direction="column"
            gap={4}
            p={4}
            justifyContent={"space-between"}
          >
            {children}
          </Flex>
        </Box>
      ) : (
        <Center h="100vh" bg="gray.700">
          <Flex
            w="80%"
            maxW="1000px"
            direction="column"
            gap={6}
            p={6}
            borderRadius="2xl"
            bg="gray.800"
            boxShadow="lg"
          >
            {children}
          </Flex>
        </Center>
      )}
    </>
  );
};
