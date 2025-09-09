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
import { useImageStore } from "../../store/imageStore";
import { toast } from "../../components/ui/toast";
import { detectionToastVariants } from "../../utils/faceApiManipulators/faceApiDetectionToastsVariants";
import { RenderIf } from "../../components/RenderIf";
import { MainLayout } from "../../components/MainLayout";
import { SourceSelector } from "../../components/SourceSelector";
import { useFaceComparing } from "../../hooks/useFaceComparing";
import { useFaceDetection } from "../../hooks/useFaceDetection/useFaceDetection.hook";
import { loadImageElement } from "../../utils/imageManipulators/loadImageElement";
import { detectFace } from "../../utils/faceApiManipulators/detectFace";
import { faceApiOptions } from "../../utils/faceApiManipulators/faceApiDefaultOptions";
import * as faceapi from "face-api.js";
import { compressFileToBase64 } from "../../utils/imageManipulators/CompressFileToBase64";

export function Scanner() {
  const {
    registeredFile,
    registeredDescriptor,
    setRegisteredFile,
    setRegisteredDescriptor,
    clearAll,
  } = useImageStore();
  const [scannedSrc, setScannedSrc] = useState<string | null>(null);
  const [scannedDescriptor, setScannedDescriptor] = useState<number[]>([]);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [scanLoading, setScanLoading] = useState(false);
  const registeredImgRef = useRef<HTMLImageElement>(null);
  const registeredCanvasRef = useRef<HTMLCanvasElement>(null);
  const scannedImgRef = useRef<HTMLImageElement>(null);
  const scannedCanvasRef = useRef<HTMLCanvasElement>(null);
  const { loading: detectionLoading, status } = useFaceDetection(
    scannedImgRef.current
  );
  const { match, distance } = useFaceComparing(
    registeredDescriptor,
    scannedDescriptor
  );

  const deleteComparisonImage = async () => {
    setScannedDescriptor([]);
    setScannedSrc("");
  };

  const deleteAllImages = async () => {
    clearAll();
    deleteComparisonImage();
  };

  const handleRegisterImage = async (file: File) => {
    try {
      setRegisterLoading(true);
      const img = await loadImageElement(file);

      const detection = await detectFace(img, faceApiOptions);
      if (!detection?.descriptor) {
        toast(detectionToastVariants.undetected);
        clearAll();
        return;
      }

      const descriptorArray = Array.from(detection?.descriptor);
      setRegisteredDescriptor(descriptorArray);
      const compressedImg = await compressFileToBase64(file);
      setRegisteredFile(compressedImg);
    } catch (err) {
      toast(detectionToastVariants.error);
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleNewImageToCompare = async (file: File) => {
    try {
      setScanLoading(true);

      const img = await loadImageElement(file);
      const detection = await detectFace(img, faceApiOptions);
      if (!detection?.descriptor) {
        toast(detectionToastVariants.undetected);
        return;
      }

      const descriptorArray = Array.from(detection?.descriptor);
      await setScannedDescriptor(descriptorArray);
      setScannedSrc(img.src);
    } catch (err) {
      toast(detectionToastVariants.error);
    } finally {
      setScanLoading(false);
    }
  };

  const onImageImageLoad = async (
    imgRef: React.RefObject<HTMLImageElement | null>,
    canvasRef: React.RefObject<HTMLCanvasElement | null>
  ) => {
    if (!imgRef.current || !canvasRef.current || status !== "success") return;

    const imgElement = imgRef.current;
    const canvas = canvasRef.current;

    const { width, height } = imgElement.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    const detections = await detectFace(imgElement, faceApiOptions);
    if (!detections) return;
    const resized = faceapi.resizeResults(detections, { width, height });
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resized);
  };

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
              {!!registeredFile ? "Imagem registrada" : "Registre uma imagem"}
            </Heading>
          </Flex>

          <RenderIf condition={!registeredFile}>
            <SourceSelector
              onImageChange={handleRegisterImage}
              onImageCapture={handleRegisterImage}
              uploaderButtonLabel="Registrar imagem"
              fileOrigin="register"
            />
          </RenderIf>
          <RenderIf condition={!!registeredFile}>
            <Box
              position="relative"
              bg="black"
              h={{ base: "220px", md: "339px" }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Image
                ref={registeredImgRef}
                src={registeredFile || ""}
                h={{ base: "220px", md: "339px" }}
                objectFit="contain"
                crossOrigin="anonymous"
                onLoad={() =>
                  onImageImageLoad(registeredImgRef, registeredCanvasRef)
                }
              />
              <canvas
                ref={registeredCanvasRef}
                style={{
                  position: "absolute",
                }}
              />

              <Button
                position="absolute"
                bottom={2}
                right={2}
                size="sm"
                onClick={deleteAllImages}
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
          <RenderIf condition={!registeredFile}>
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
          <RenderIf condition={!!registeredFile && !scannedDescriptor?.length}>
            <SourceSelector
              onImageChange={handleNewImageToCompare}
              onImageCapture={handleNewImageToCompare}
              uploaderButtonLabel="Enviar imagem"
              fileOrigin="comparison"
            />
          </RenderIf>
          <RenderIf condition={!!registeredFile && !!scannedDescriptor?.length}>
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
                  <Box position="relative" display="inline-block">
                    <Image
                      as="img"
                      ref={scannedImgRef}
                      src={scannedSrc || ""}
                      h={{ base: "200px", md: "340px" }}
                      crossOrigin="anonymous"
                      objectFit="contain"
                      onLoad={() =>
                        onImageImageLoad(scannedImgRef, scannedCanvasRef)
                      }
                    />
                    <canvas
                      ref={scannedCanvasRef}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                    />
                  </Box>
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
      <RenderIf condition={detectionLoading}>
        <Spinner size="xs" mr={2} /> Comparando imagens...
      </RenderIf>
      <RenderIf
        condition={
          !detectionLoading &&
          match !== null &&
          !!registeredFile &&
          !!scannedDescriptor?.length
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
        </Box>
      </RenderIf>
    </MainLayout>
  );
}
