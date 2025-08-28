import React, { useRef } from "react";
import { Box, Text } from "@chakra-ui/react";
import type { ImageUploaderProps } from "./types";
import { useImageStore } from "../../store/imageStore";

export default function ImageUploader({ onImageChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const img = document.createElement("img") as HTMLImageElement;
    img.onload = () => onImageChange(img);
    img.src = URL.createObjectURL(file);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <Box mb={4}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <Text mt={2} fontSize="sm" color="gray.500">
        Imagem carregada. Faça upload de uma nova imagem para comparar.
      </Text>
    </Box>
  );
}
