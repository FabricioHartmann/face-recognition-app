import {
  Box,
  Button,
  Flex,
  Spinner,
  Text,
  Image,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { useImageStore } from "../../store/imageStore";
import { toast } from "../../components/ui/toast";
import { detectionToastVariants } from "../../utils/faceApiManipulators/faceApiDetectionToastsVariants";
import { RenderIf } from "../../components/RenderIf";
import { MainLayout } from "../../components/MainLayout";
import { fileToBase64 } from "../../utils/imageManipulators/fileToBase64";
import { SourceSelector } from "../../components/SourceSelector";
import { useFaceComparing } from "../../hooks/useFaceComparing";
import { useFaceDetection } from "../../hooks/useFaceDetection/useFaceDetection.hook";
import { getImage, saveImage } from "../../utils/dbManipulators/db";
import useIsMobile from "../../hooks/useIsMobile/useIsMobile";

export function Scanner() {
  const {
    registeredFileId,
    registeredDescriptor,
    scannedFileId,
    scannedDescriptor,
    setRegisteredFileId,
    setRegisteredDescriptor,
    setScannedFileId,
    setScannedDescriptor,
    clearScannedFileAndDescriptor,
    clearAll,
  } = useImageStore();
  const isMobile = useIsMobile();
  const [registeredSrc, setRegisteredSrc] = useState<string | null>(null);
  const [scannedSrc, setScannedSrc] = useState<string | null>(null);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [scanLoading, setScanLoading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const { loading: detectionLoading, hasFace } = useFaceDetection(
    imgRef.current
  );
  const { match, distance } = useFaceComparing(
    registeredDescriptor,
    imgRef.current
  );

  useEffect(() => {
    if (registeredFileId) {
      getImage(registeredFileId as number).then((blob) => {
        if (blob) setRegisteredSrc(URL.createObjectURL(blob));
      });
    }
    console.log({ registeredFileId });
  }, [registeredFileId]);

  useEffect(() => {
    if (scannedFileId) {
      getImage(scannedFileId as number).then((blob) => {
        if (blob) setScannedSrc(URL.createObjectURL(blob));
      });
    }
    console.log({ scannedFileId });
  }, [scannedFileId]);

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

      const id = await saveImage(file);
      setRegisteredFileId(id);
      toast(detectionToastVariants.detected);

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
      const id = await saveImage(file);
      setScannedFileId(id);
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
        height={{ base: "auto", md: "400px" }}
        direction={{ base: "column", md: "row" }}
        maxW="1000px"
        gap={{ base: "4", md: "8" }}
      >
        <Box flex="1">
          <Flex
            justify={"space-between"}
            alignItems={"center"}
            align={"center"}
            textAlign={"center"}
          >
            <Heading
              size={{ base: "sm", md: "md" }}
              mb={{ base: "4", md: "6" }}
              textAlign={{ base: "start", md: "center" }}
            >
              {!!registeredFileId ? "Imagem registrada" : "Regitre uma imagem"}
            </Heading>
          </Flex>

          <RenderIf condition={!registeredFileId}>
            <SourceSelector
              onImageChange={handleRegisterImage}
              uploaderButtonLabel="Registrar imagem"
            />
          </RenderIf>
          <RenderIf condition={!!registeredFileId}>
            <Box
              position="relative"
              bg="black"
              h={{ base: "220px", md: "339px" }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Image
                src={registeredSrc || ""}
                maxH={{ base: "220px", md: "339px" }}
                objectFit="contain"
                crossOrigin="anonymous"
              />

              <Button
                position="absolute"
                bottom={2}
                right={2}
                size="sm"
                onClick={clearAll}
                colorScheme="red"
              >
                Excluir imagem
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
          <Heading
            size={{ base: "sm", md: "md" }}
            mb={{ base: "4", md: "6" }}
            textAlign={{ base: "start", md: "center" }}
          >
            Nova imagem
          </Heading>
          <RenderIf condition={!registeredFileId}>
            <>
              <Flex
                align="center"
                justify="center"
                h={{ base: "148px", md: "396px" }}
              >
                <Text textAlign="center">Registre uma imagem para iniciar</Text>
              </Flex>
            </>
          </RenderIf>
          <RenderIf condition={!!registeredFileId && !scannedFileId}>
            <SourceSelector
              onImageChange={handleNewImageToCompare}
              uploaderButtonLabel="Enviar imagem"
            />
          </RenderIf>
          <RenderIf condition={!!registeredFileId && !!scannedFileId}>
            <Box width="100%" position="relative">
              <Flex
                justify="center"
                align="center"
                bg="black"
                h={{ base: "200px", md: "340px" }}
              >
                {scanLoading ? (
                  <Spinner size="xs" mr={2} />
                ) : (
                  <Image
                    ref={imgRef}
                    src={scannedSrc || ""}
                    maxH={{ base: "200px", md: "340px" }}
                    crossOrigin="anonymous"
                    objectFit="contain"
                  />
                )}
              </Flex>

              <Button
                size="sm"
                colorScheme="red"
                position="absolute"
                bottom={2}
                right={2}
                onClick={deleteComparisonImage}
              >
                Excluir imagem
              </Button>
            </Box>
          </RenderIf>
        </Box>
      </Flex>
      <RenderIf
        condition={
          !detectionLoading &&
          match !== null &&
          !!registeredFileId &&
          !!scannedFileId
        }
      >
        <Box width="100%">
          <Flex direction={"column"} justify={"center"} gap={4}>
            <Text color={match ? "green.500" : "red.500"}>
              {match ? "Rostos correspondem!" : "Rostos diferentes"} (Distância:{" "}
              {distance?.toFixed(4)})
            </Text>
            <Button
              size={"sm"}
              width={{ base: "100%", md: "240px" }}
              onClick={clearAll}
            >
              Registrar nova imagem
            </Button>
          </Flex>

          <RenderIf condition={detectionLoading}>
            <Spinner size="xs" mr={2} /> Comparando imagens...
          </RenderIf>
        </Box>
      </RenderIf>
    </MainLayout>
  );
}
