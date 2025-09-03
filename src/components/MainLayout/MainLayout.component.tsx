import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  Heading,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import type { MainLayoutrProps } from "./MainLayout.types";
import useIsMobile from "../../hooks/useIsMobile/useIsMobile";
import { Camera } from "../Camera/Camera.component";
import { ImageUploader } from "../ImageUploader/ImageUploader.component";
import { RenderIf } from "../RenderIf";
import { FiImage, FiCamera, FiUpload } from "react-icons/fi";

export const MainLayout = ({
  children,
  title,
  onImageUpload,
}: MainLayoutrProps) => {
  const isMobile = useIsMobile();

  return (
    // <Center minH="100vh">
    //   <Flex
    //     height="100vh"
    //     maxW="1200px"
    //     w="100%"
    //     mx="auto"
    //     p={4}
    //     direction="column"
    //     justify="center"
    //     gap={8}
    //   >
    //     <RenderIf condition={!!title}>
    //       <Heading textAlign="center" as="h1" size="lg">
    //         {title}
    //       </Heading>
    //     </RenderIf>

    //     <Flex gap={8}>
    //       <RenderIf condition={!isMobile}>
    //         <Flex flex="1" justify="center" align="center">
    //           <Box background="blackAlpha.400" minH="532px" width="100%">
    //             <Tabs isFitted>
    //               <TabList>
    //                 <Tab>Galeria</Tab>
    //                 <Tab>Câmera</Tab>
    //               </TabList>

    //               <TabPanels>
    //                 <TabPanel>
    //                   <Flex w="100%" h="456px" alignItems="center">
    //                     <ImageUploader
    //                       fullHeight
    //                       fullWidth
    //                       onImageChange={onImageUpload}
    //                     />
    //                   </Flex>
    //                 </TabPanel>
    //                 <TabPanel>
    //                   <Camera />
    //                 </TabPanel>
    //               </TabPanels>
    //             </Tabs>
    //           </Box>
    //         </Flex>
    //       </RenderIf>
    //       <Flex
    //         flex="1"
    //         direction="column"
    //         justify="center"
    //         align="center"
    //         w="100%"
    //       >
    //         {children}
    //       </Flex>
    //     </Flex>
    //   </Flex>
    // </Center>
    <Center minH="100vh" bg="gray.700">
      <Flex
        w="80%"
        direction={{ base: "column", md: "row" }}
        maxW="1000px"
        gap={6}
        p={6}
        borderRadius="2xl"
        borderColor="gray.300"
        bg="gray.800"
        boxShadow="lg"
      >
        <Box flex="1">
          <Heading size="md" mb={6} textAlign="center">
            {title}
          </Heading>

          <Tabs variant="enclosed" colorScheme="" isFitted>
            <TabList mb="4">
              <Tab>
                <Icon as={FiImage} mr={2} /> Galeria
              </Tab>
              <Tab>
                <Icon as={FiCamera} mr={2} /> Câmera
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <ImageUploader
                  fullHeight
                  fullWidth
                  onImageChange={onImageUpload}
                />
              </TabPanel>

              <TabPanel>
                <Flex minH="280px">
                  <Camera />
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>

        <Box flex="1">
          <Center h="100%">{children}</Center>
        </Box>
      </Flex>
    </Center>
  );
};
