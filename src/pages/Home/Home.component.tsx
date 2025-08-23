import { Box, Heading, Text } from "@chakra-ui/react"

export function Home() {
  return (
    <Box p={8}>
      <Heading>Home</Heading>
      <Text mt={4}>Bem-vindo ao aplicativo de reconhecimento facial!</Text>
    </Box>
  )
}