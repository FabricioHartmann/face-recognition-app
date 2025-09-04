import { Center, Flex } from "@chakra-ui/react";
import type { MainLayoutrProps } from "./MainLayout.types";

export const MainLayout = ({ children }: MainLayoutrProps) => {
  return (
    <Center minH="100vh" bg="gray.700">
      <Flex
        w="80%"
        direction="column"
        maxW="1000px"
        gap={6}
        p={6}
        borderRadius="2xl"
        borderColor="gray.300"
        bg="gray.800"
        boxShadow="lg"
      >
        {children}
      </Flex>
    </Center>
  );
};
