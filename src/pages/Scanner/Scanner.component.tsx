import { Box, Button, Flex, Spinner, Text, Image } from "@chakra-ui/react";
import { useState } from "react";
import { FaceComparator } from "../../components/FaceComparator/FaceComparator.component";
import * as faceapi from "face-api.js";
import { useImageStore } from "../../store/imageStore";
import { useNavigate } from "react-router-dom";
import { toast } from "../../components/ui/toast";
import { detectionToastVariants } from "../../utils/faceApiDetectionToastsVariants";
import { MainLayout } from "../../components/MainLayout";
import { RenderIf } from "../../components/RenderIf";

export function Scanner() {
  const navigate = useNavigate();
  const {
    scannedImageSrc,
    registeredImageSrc,
    setScannedDescriptor,
    setScannedImageSrc,
    clearScannedDescriptor,
    deleteScannedImageSrc,
    clearRegisteredDescriptor,
    deleteRegisteredImageSrc,
  } = useImageStore();
  const [loading, setLoading] = useState(false);

  async function handleFileChange(img: HTMLImageElement) {
    try {
      setLoading(true);

      const detection = await faceapi
        .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection) {
        toast(detectionToastVariants.undetected);
        return;
      }

      const descriptorArray = Array.from(detection.descriptor);
      setScannedImageSrc(img.src);
      setScannedDescriptor(descriptorArray);

      console.log("descriptor array", descriptorArray);
      console.log("detection", detection);
    } catch (err) {
      console.error(err);
      toast(detectionToastVariants.error);
    } finally {
      setLoading(false);
    }
  }

  const removeImage = () => {
    clearScannedDescriptor();
    deleteScannedImageSrc();
  };

  const goToRegisterPage = () => {
    removeImage();
    clearRegisteredDescriptor();
    deleteRegisteredImageSrc();
    navigate("/register");
  };

  return (
    <MainLayout title="Comparar imagem" onImageUpload={handleFileChange}>
      <Flex direction="column" flex="1" justify="center" align="center" gap={4}>
        <RenderIf condition={!scannedImageSrc?.length && !!registeredImageSrc}>
          <Text marginX={8}>Imagem registrada:</Text>
          <Image maxH="440px" src={registeredImageSrc} mb={4} />
        </RenderIf>
        <RenderIf condition={!!scannedImageSrc?.length}>
          <Box>
            <FaceComparator imageSrc={scannedImageSrc} />
            <Flex direction="column" gap={4}>
              <Button
                onClick={removeImage}
                w="100%"
                rounded="l1"
                borderColor="red"
                color="red"
              >
                Remover foto
              </Button>
              <Button onClick={goToRegisterPage} w="100%" rounded="l1">
                Testar novamente
              </Button>
            </Flex>
          </Box>
        </RenderIf>
        {loading && (
          <Flex mt={4} align="center" gap={2}>
            <Spinner size="sm" />
            <Text fontSize="sm" color="gray.500">
              Comparando imagens...
            </Text>
          </Flex>
        )}
      </Flex>
    </MainLayout>
  );
}
