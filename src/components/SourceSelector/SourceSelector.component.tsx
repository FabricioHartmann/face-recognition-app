import React, { useRef, useState } from "react";
import { Box, Button, Flex, Icon, Input, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
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
            fullHeight
            fullWidth
            onImageChange={onImageChange}
            buttonLabel={uploaderButtonLabel}
            textLabel={uploaderTextLabel}
          />
        </TabPanel>
        <TabPanel padding={0}>
          <Flex minH="280px">
            <Camera />
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
