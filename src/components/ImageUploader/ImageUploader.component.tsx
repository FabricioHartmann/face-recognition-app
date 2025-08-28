import React, { useRef, useState } from "react";
import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";
import type { ImageUploaderProps } from "./ImageUploader.types";

export function ImageUploader({ onImageChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFile(file: File) {
    const img = document.createElement("img") as HTMLImageElement;
    img.onload = () => onImageChange(img);
    img.src = URL.createObjectURL(file);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    handleFile(file);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  }

  return (
    <Box
      maxW="280px"
      p={4}
      border="2px dashed"
      borderColor={isDragging ? "teal.400" : "gray.300"}
      borderRadius="xl"
      textAlign="center"
      transition="0.2s"
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <VStack spacing={4}>
        <Text fontSize="sm" color="gray.500">
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
      </VStack>
    </Box>
  );
}
