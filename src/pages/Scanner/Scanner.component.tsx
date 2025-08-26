import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import FaceDetect from "../../components/FaceDetect/FaceDetect.component";
import * as faceapi from "face-api.js";
import { useImageStore } from "../../store/imageStore";
import { useNavigate } from "react-router-dom";

export function Scanner() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setScannedDescriptor, clearScannedDescriptor } = useImageStore();
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImageSrc(url);

    const img = await faceapi.fetchImage(url); // carrega a imagem

    const detection = await faceapi
      .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) {
      alert("Nenhum rosto detectado na imagem.");
      return;
    }

    const descriptorArray = Array.from(detection.descriptor);
    setScannedDescriptor(descriptorArray);

    console.log("descriptor array", descriptorArray);
    console.log("detection", detection);

    URL.revokeObjectURL(url);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  const deleteImageAndDescriptor = () => {
    clearScannedDescriptor();
  };

  const goToRegisterPage = () => {
    navigate('/register')
  };

  return (
    <Box p={8}>
      <Heading>Scanner</Heading>
      <Text mt={4}>Tela para escanear rostos em tempo real.</Text>
      <Box width="340px">
        <Text mt={4}>Escolha a foto a ser comparada</Text>
        <Input
          type="file"
          accept="image/*"
          capture="environment" // ativa câmera traseira no celular
          onChange={handleFileChange}
          mb={4}
        />
        {imageSrc && (
          <Box>
            <FaceDetect imageSrc={imageSrc} />
            <Button
              onClick={goToRegisterPage}
              mt={4}
              variant="outline"
              color="teal"
            >
              Registrar nova foto
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
