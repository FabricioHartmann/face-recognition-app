import { Box, Button, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaceComparator } from "../../components/FaceComparator/FaceComparator.component";
import * as faceapi from "face-api.js";
import { useImageStore } from "../../store/imageStore";
import { useNavigate } from "react-router-dom";
import { toast } from "../../components/ui/toast";
import { detectionToastVariants } from "../../utils/faceApiDetectionToastsVariants";
import { ImageUploader } from "../../components/ImageUploader/ImageUploader.component";

export function Scanner() {
  const navigate = useNavigate();
  const {
    setScannedDescriptor,
    setScannedImageSrc,
    scannedImageSrc,
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
    <Flex direction="column" minH="100vh" p={4}>
      <Flex direction="column" flex="1" justify="center" align="center" gap={4}>
        <Heading textAlign="center" as="h1" size="lg">
          Scanner
        </Heading>
        {!!scannedImageSrc?.length ? (
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
        ) : (
          <ImageUploader onImageChange={handleFileChange} />
        )}
        {loading && (
          <Flex mt={4} align="center" gap={2}>
            <Spinner size="sm" />
            <Text fontSize="sm" color="gray.500">
              Comparando imagens...
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
