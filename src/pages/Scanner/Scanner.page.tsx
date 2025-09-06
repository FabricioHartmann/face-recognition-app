import {
  Box,
  Button,
  Flex,
  Spinner,
  Text,
  Image,
  Heading,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { useImageStore } from "../../store/imageStore";
import { toast } from "../../components/ui/toast";
import { detectionToastVariants } from "../../utils/faceApiUtils/faceApiDetectionToastsVariants";
import { RenderIf } from "../../components/RenderIf";
import { MainLayout } from "../../components/MainLayout";
import { fileToBase64 } from "../../utils/imageManipulationUtils/fileToBase64";
import { SourceSelector } from "../../components/SourceSelector";
import { useFaceComparing } from "../../hooks/useFaceComparing";
import { useFaceDetection } from "../../hooks/useFaceDetection/useFaceDetection.hook";

export function Scanner() {
  const {
    scannedFile,
    registeredFile,
    registeredDescriptor,
    setRegisteredFile,
    setScannedDescriptor,
    setRegisteredDescriptor,
    setScannedFile,
    clearAll,
    clearScannedFileAndDescriptor,
  } = useImageStore();
  const [registerLoading, setRegisterLoading] = useState(false);
  const [scanLoading, setScanLoading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const { loading, hasFace } = useFaceDetection(imgRef.current);
  const { match, distance } = useFaceComparing(
    registeredDescriptor,
    imgRef.current
  );

  const deleteRegisteredImage = () => {
    clearAll();
  };

  const deleteComparisonImage = () => {
    clearScannedFileAndDescriptor();
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
      <Flex
        height={"440px"}
        direction={{ base: "column", md: "row" }}
        maxW="1000px"
        gap={6}
      >
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
              <Flex justify="center" bg={"black"} mb={4} h={"340px"}>
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
              <Flex align="center" justify="center" h="396px">
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
            {/* <FaceComparator imageSrc={scannedFile} /> */}
            <Box width="100%">
              <Flex
                justify="center"
                bg={"black"}
                mb={4}
                align={"center"}
                h="340px"
              >
                {scanLoading ? (
                  <Spinner size="xs" mr={2} />
                ) : (
                  <Image
                    ref={imgRef}
                    src={scannedFile}
                    alt="Imagem comparada"
                    maxH="340px"
                    crossOrigin="anonymous"
                    display="block"
                  />
                )}
              </Flex>
              <Button onClick={deleteComparisonImage} colorScheme="red">
                Excluir
              </Button>
            </Box>
          </RenderIf>
        </Box>
      </Flex>
      <Box width="100%">
        <RenderIf condition={!loading && match !== null}>
          <Flex width={"100%"} justify={"center"} mb={4}>
            <Text color={match ? "green.500" : "red.500"}>
              {match ? "Rostos correspondem!" : "Rostos diferentes"} (Distância:{" "}
              {distance?.toFixed(4)})
            </Text>
          </Flex>
        </RenderIf>
      </Box>
    </MainLayout>
  );
}
