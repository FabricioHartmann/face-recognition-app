import React, { useRef, useState } from "react";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import type { ImageUploaderProps } from "./ImageUploader.types";

export function ImageUploader({
  onImageChange,
  fullWidth,
  fullHeight,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFile(file: File) {
    onImageChange(file);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length > 0) {
      handleFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  }

  return (
    <Box
      width={fullWidth ? "100%" : "auto"}
      height={fullHeight ? "100%" : "220px"}
      borderColor={isDragging ? "blue.300" : "gray.300"}
      transition="0.2s"
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        border="2px dashed"
        borderRadius="xl"
        p={10}
        gap={4}
        minH="280px"
        textAlign="center"
      >
        <Text fontSize="sm" color="gray.200">
          Arraste uma imagem aqui ou clique no botão
        </Text>

        <Input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleFileChange}
          display="none"
        />

        <Button
          onClick={() => inputRef.current?.click()}
          variant="solid"
          size="sm"
          rounded="lg"
        >
          Upload de Imagem
        </Button>
      </Flex>
    </Box>
  );
}
