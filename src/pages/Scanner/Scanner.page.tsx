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
import { useImageStore } from "../../store/imageStore";
import { toast } from "../../components/ui/toast";
import { detectionToastVariants } from "../../utils/faceApiManipulators/faceApiDetectionToastsVariants";
import { RenderIf } from "../../components/RenderIf";
import { MainLayout } from "../../components/MainLayout";
import { SourceSelector } from "../../components/SourceSelector";
import { useFaceComparing } from "../../hooks/useFaceComparing";
import { useFaceDetection } from "../../hooks/useFaceDetection/useFaceDetection.hook";
import { getImage, saveImage } from "../../utils/dbManipulators/db";
import { loadImageElement } from "../../utils/imageManipulators/loadImageElement";
import { detectFaceDescriptor } from "../../utils/faceApiManipulators/detectFaceDescriptor";
import { faceApiOptions } from "../../utils/faceApiManipulators/faceApiDefaultOptions";

export function Scanner() {
  const {
    registeredFileId,
    registeredDescriptor,
    setRegisteredFileId,
    setRegisteredDescriptor,
    clearAll,
  } = useImageStore();
  const [registeredSrc, setRegisteredSrc] = useState<string | null>(null);
  const [scannedSrc, setScannedSrc] = useState<string | null>(null);
  const [scannedDescriptor, setScannedDescriptor] = useState<number[]>([]);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [scanLoading, setScanLoading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const { loading: detectionLoading } = useFaceDetection(imgRef.current);
  const { match, distance } = useFaceComparing(
    registeredDescriptor,
    scannedDescriptor
  );

  useEffect(() => {
    if (registeredFileId) {
      getImage(registeredFileId as number).then((blob) => {
        if (blob) setRegisteredSrc(URL.createObjectURL(blob));
      });
    }
  }, [registeredFileId]);

  const deleteComparisonImage = async () => {
    setScannedDescriptor([]);
    setScannedSrc(null);
  };

  const deleteAllImages = async () => {
    clearAll();
    deleteComparisonImage();
  };

  const handleRegisterImage = async (file: File) => {
    try {
      setRegisterLoading(true);
      const img = await loadImageElement(file);

      const descriptor = await detectFaceDescriptor(img, faceApiOptions);
      if (!descriptor) {
        toast(detectionToastVariants.undetected);
        clearAll();
        return;
      }

      const descriptorArray = Array.from(descriptor);
      setRegisteredDescriptor(descriptorArray);
      const id = await saveImage(file);
      setRegisteredFileId(id as number);
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
      const descriptor = await detectFaceDescriptor(img, faceApiOptions);
      if (!descriptor) {
        toast(detectionToastVariants.undetected);
        return;
      }
      const descriptorArray = Array.from(descriptor);
      await setScannedDescriptor(descriptorArray);
      setScannedSrc(img.src);
    } catch (err) {
      toast(detectionToastVariants.error);
    } finally {
      setScanLoading(false);
    }
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
              {!!registeredFileId ? "Imagem registrada" : "Registre uma imagem"}
            </Heading>
          </Flex>

          <RenderIf condition={!registeredFileId}>
            <SourceSelector
              onImageChange={handleRegisterImage}
              onImageCapture={handleRegisterImage}
              uploaderButtonLabel="Registrar imagem"
              fileOrigin="register"
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
                h={{ base: "220px", md: "339px" }}
                objectFit="contain"
                crossOrigin="anonymous"
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
          <RenderIf
            condition={!!registeredFileId && !scannedDescriptor?.length}
          >
            <SourceSelector
              onImageChange={handleNewImageToCompare}
              onImageCapture={handleNewImageToCompare}
              uploaderButtonLabel="Enviar imagem"
              fileOrigin="comparison"
            />
          </RenderIf>
          <RenderIf
            condition={!!registeredFileId && !!scannedDescriptor?.length}
          >
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
                    h={{ base: "200px", md: "340px" }}
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
      <RenderIf condition={detectionLoading}>
        <Spinner size="xs" mr={2} /> Comparando imagens...
      </RenderIf>
      <RenderIf
        condition={
          !detectionLoading &&
          match !== null &&
          !!registeredFileId &&
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
