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
        alert("Nenhum rosto detectado na imagem.");
        deleteImageAndDescriptor();
        return;
      }
      const descriptorArray = Array.from(detection.descriptor);
      await setRegisteredDescriptor(descriptorArray);

      console.log("Descritor salvo com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao processar a imagem.");
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
