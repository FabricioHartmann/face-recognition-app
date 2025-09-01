import {
  Box,
  Card,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import type { MainLayoutrProps } from "./MainLayout.types";
import useIsMobile from "../../hooks/useIsMobile/useIsMobile";
import { Camera } from "../Camera/Camera.component";
import { ImageUploader } from "../ImageUploader/ImageUploader.component";
import { RenderIf } from "../RenderIf";

export const MainLayout = ({
  children,
  title,
  onImageUpload,
}: MainLayoutrProps) => {
  const isMobile = useIsMobile();

  return (
    <Flex
      height="100vh"
      maxW="1200px"
      w="100%"
      mx="auto"
      p={4}
      direction="column"
      justify="center"
      gap={8}
    >
      <RenderIf condition={!!title}>
        <Heading textAlign="center" as="h1" size="lg">
          {title}
        </Heading>
      </RenderIf>

      <Flex gap={8}>
        <RenderIf condition={!isMobile}>
          <Flex flex="1" justify="center" align="center">
            <Box background="blackAlpha.400" minH="532px" width="100%">
              <Tabs isFitted>
                <TabList>
                  <Tab>Galeria</Tab>
                  <Tab>Câmera</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <Flex w="100%" h="456px" alignItems="center">
                      <ImageUploader
                        fullHeight
                        fullWidth
                        onImageChange={onImageUpload}
                      />
                    </Flex>
                  </TabPanel>
                  <TabPanel>
                    <Camera />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Flex>
        </RenderIf>
        <Flex
          flex="1"
          direction="column"
          justify="center"
          align="center"
          w="100%"
        >
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};
