import {
  Flex,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { FiImage, FiCamera } from "react-icons/fi";
import { Camera } from "../Camera/Camera.component";
import { ImageUploader } from "../ImageUploader/ImageUploader.component";
import type { SourceSelectorProps } from "./SourceSelector.types";

export function SourceSelector({
  onImageChange,
  uploaderButtonLabel,
  uploaderTextLabel,
}: SourceSelectorProps) {
  return (
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
        <TabPanel padding={0}>
          <ImageUploader
            onImageChange={onImageChange}
            buttonLabel={uploaderButtonLabel}
            textLabel={uploaderTextLabel}
          />
        </TabPanel>
        <TabPanel padding={0}>
          <Flex minH={{ base: "120px", md: "280px" }}>
            <Camera />
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
