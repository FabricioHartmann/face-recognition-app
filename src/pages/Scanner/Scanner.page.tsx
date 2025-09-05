import {
  Box,
  Button,
  Flex,
  Spinner,
  Text,
  Image,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaceComparator } from "../../components/FaceComparator/FaceComparator.component";
import * as faceapi from "face-api.js";
import { useImageStore } from "../../store/imageStore";
import { useNavigate } from "react-router-dom";
import { toast } from "../../components/ui/toast";
import { detectionToastVariants } from "../../utils/faceApiUtils/faceApiDetectionToastsVariants";
import { RenderIf } from "../../components/RenderIf";
import { MainLayout } from "../../components/MainLayout";
import { fileToBase64 } from "../../utils/imageManipulationUtils/fileToBase64";
import { SourceSelector } from "../../components/SourceSelector";
import { FiTrash } from "react-icons/fi";

export function Scanner() {
  const navigate = useNavigate();
  const {
    scannedFile,
    registeredFile,
    setRegisteredFile,
    setScannedDescriptor,
    setRegisteredDescriptor,
    setScannedFile,
    clearAll,
  } = useImageStore();
  const [registerLoading, setRegisterLoading] = useState(false);
  const [scanLoading, setScanLoading] = useState(false);

  const deleteRegisteredImage = () => {
    clearAll();
  };

  const handleRegisterImage = async (file: File) => {
    try {
      const base64Img = await fileToBase64(file);
      const img = document.createElement("img");
      img.src = base64Img;
      img.crossOrigin = "anonymous";

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Erro ao carregar imagem"));
      });

      setRegisterLoading(true);
      const detection = await faceapi
        .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection) {
        toast(detectionToastVariants.undetected);
        clearAll();
        return;
      }
      // console.log({ canvasRef: canvasRef.current });

      // if (canvasRef.current) {
      //   const dims = faceapi.matchDimensions(canvasRef.current, img, true);
      //   const detections = await faceapi.detectAllFaces(img, faceApiOptions);

      //   const resized = faceapi.resizeResults(detections, dims);
      //   faceapi.draw.drawDetections(canvasRef.current, resized);
      // }
      const descriptorArray = Array.from(detection.descriptor);
      await setRegisteredDescriptor(descriptorArray);

      toast(detectionToastVariants.detected);
      setRegisteredFile(img.src);
      // navigate("/scanner");
    } catch (err) {
      console.error(err);
      toast(detectionToastVariants.error);
    } finally {
      setRegisterLoading(false);
    }
  };

  async function handleNewImageToCompare(file: File) {
    try {
      setScanLoading(true);
      const base64Img = await fileToBase64(file);
      const img = document.createElement("img");
      img.src = base64Img;
      img.crossOrigin = "anonymous";

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Erro ao carregar imagem"));
      });

      const detection = await faceapi
        .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection) {
        toast(detectionToastVariants.undetected);
        return;
      }

      const descriptorArray = Array.from(detection.descriptor);
      setScannedFile(img.src);
      setScannedDescriptor(descriptorArray);
    } catch (err) {
      console.error(err);
      toast(detectionToastVariants.error);
    } finally {
      setScanLoading(false);
    }
  }

  return (
    <MainLayout>
      <Flex direction={{ base: "column", md: "row" }} maxW="1000px" gap={6}>
        <Box flex="1">
          <Heading size="md" mb={6} textAlign="center">
            {!!registeredFile ? "Imagem registrada" : "Regitre uma imagem"}
          </Heading>
          <RenderIf condition={!registeredFile}>
            <SourceSelector
              onImageChange={handleRegisterImage}
              uploaderButtonLabel="Registrar imagem"
            />
          </RenderIf>
          <RenderIf condition={!!registeredFile}>
            <Box width="100%">
              <Flex justify="center" bg={"black"} mb={4}>
                <Image maxH="340px" src={registeredFile} />
              </Flex>
              <Button onClick={deleteRegisteredImage} colorScheme="red">
                Excluir
              </Button>
            </Box>
          </RenderIf>
          <RenderIf condition={registerLoading}>
            <Text mt={2}>
              <Spinner size="xs" mr={2} /> Registrando imagem...
            </Text>
          </RenderIf>
        </Box>

        <Box flex="1">
          <Heading size="md" mb={6} textAlign="center">
            Nova imagem
          </Heading>
          <RenderIf condition={!registeredFile}>
            <>
              <Flex align="center" justify="center" h="calc(100% - 48px)">
                <Text textAlign="center">Registre uma imagem para iniciar</Text>
              </Flex>
            </>
          </RenderIf>
          <RenderIf condition={!!registeredFile && !scannedFile}>
            <SourceSelector
              onImageChange={handleNewImageToCompare}
              uploaderButtonLabel="Enviar imagem"
            />
          </RenderIf>
          <RenderIf condition={!!registeredFile && !!scannedFile}>
            <FaceComparator imageSrc={scannedFile} />
          </RenderIf>
        </Box>
      </Flex>
      <Flex width="100%">
        <Flex width={"100%"} justify={"center"} mb={4}></Flex>
      </Flex>
    </MainLayout>
  );
}
