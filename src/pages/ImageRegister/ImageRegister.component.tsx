import {
  Box,
  Heading,
  Text,
  Image,
  Button,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import * as faceapi from "face-api.js";
import ImageUploader from "../../components/ImageUploader";
import { useImageStore } from "../../store/imageStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "../../components/ui/toast";
import { detectionToastVariants } from "../../utils/faceApiDetectionToastsVariants";

export function ImageRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    imageSrc,
    setRegisteredDescriptor,
    deleteImage,
    clearRegisteredDescriptor,
  } = useImageStore();

  const deleteImageAndDescriptor = () => {
    deleteImage();
    clearRegisteredDescriptor();
  };

  const goToScanPage = () => {
    navigate('/scanner')
  };

  const handleImageChange = async (img: HTMLImageElement) => {
    try {
      setLoading(true);
      const detection = await faceapi
        .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection) {
        toast(detectionToastVariants.undetected);
        deleteImageAndDescriptor();
        return;
      }
      const descriptorArray = Array.from(detection.descriptor);
      await setRegisteredDescriptor(descriptorArray);
      toast(detectionToastVariants.detected)
    } catch (err) {
      console.error(err);
      toast(detectionToastVariants.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={8}>
      <Heading>Cadastro de Imagem</Heading>
      <Text mt={4}>Tela para registrar imagens faciais.</Text>
      <ImageUploader onImageChange={handleImageChange} />
      {loading && (
        <Flex mt={4} align="center" gap={2}>
          <Spinner size="sm" />
          <Text fontSize="sm" color="gray.500">
            Salvando descriptor...
          </Text>
        </Flex>
      )}
      {imageSrc && (
        <Box>
          <Image width="240px" src={imageSrc} />
          <Button
            onClick={deleteImageAndDescriptor}
            mt={4}
            variant="ghost"
            color="red"
          >
            Remover foto
          </Button>
          <Button
            onClick={goToScanPage}
            mt={4}
            variant="outline"
            color="teal"
          >
            Escanear
          </Button>
        </Box>
      )}
    </Box>
  );
}
