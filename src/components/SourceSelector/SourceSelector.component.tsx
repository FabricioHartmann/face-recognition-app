import {
  Box,
  Flex,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { FiImage, FiCamera } from "react-icons/fi";
import { Camera } from "../Camera/Camera.component";
import { ImageUploader } from "../ImageUploader";
import type { SourceSelectorProps } from "./SourceSelector.types";
import { RenderIf } from "../RenderIf";
import useIsMobile from "../../hooks/useIsMobile/useIsMobile";
import { useState } from "react";

export function SourceSelector({
  onImageChange,
  onImageCapture,
  uploaderButtonLabel,
  uploaderTextLabel,
}: SourceSelectorProps) {
  const isMobile = useIsMobile();
  const [tabIndex, setTabIndex] = useState(0);

  function handleCancelCamera() {
    setTabIndex(0);
  }

  return (
    <Tabs
      index={tabIndex}
      onChange={setTabIndex}
      variant="enclosed"
      colorScheme=""
      isFitted
    >
      <TabList mb="4">
        <Tab>
          <Icon as={FiImage} mr={2} /> Foto
        </Tab>
        <Tab>
          <Icon as={FiCamera} mr={2} /> Vídeo
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel padding={0}>
          <ImageUploader
            onImageChange={onImageChange}
            buttonLabel={uploaderButtonLabel}
            textLabel={uploaderTextLabel}
          />
        </TabPanel>
        <TabPanel padding={0}>
          <Flex minH={{ base: "120px", md: "280px" }} position="relative">
            <RenderIf condition={isMobile}>
              <Box position="fixed" inset={0} zIndex={9} bg="black">
                <Camera
                  fileOrigin="comparison"
                  onFaceDetected={onImageCapture}
                  onCancel={handleCancelCamera}
                />
              </Box>
            </RenderIf>
            <RenderIf condition={!isMobile}>
              <Box w="100%" maxW="343px" bg="black" overflow="hidden">
                <Camera
                  fileOrigin="comparison"
                  onFaceDetected={onImageCapture}
                  onCancel={handleCancelCamera}
                />
              </Box>
            </RenderIf>
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
