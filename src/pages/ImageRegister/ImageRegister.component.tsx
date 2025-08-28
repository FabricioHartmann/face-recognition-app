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
import { ImageUploader } from "../../components/ImageUploader/ImageUploader.component";
import { useImageStore } from "../../store/imageStore";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "../../components/ui/toast";
import { detectionToastVariants } from "../../utils/faceApiDetectionToastsVariants";
// import { faceApiOptions } from "../../utils/faceApiDefaultOptions";

export function ImageRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const canvasRef = useRef<HTMLCanvasElement>(null);

  const {
    registeredImageSrc,
    setRegisteredDescriptor,
    setRegisteredImageSrc,
    deleteRegisteredImageSrc,
    clearRegisteredDescriptor,
  } = useImageStore();

  const deleteImageAndDescriptor = () => {
    deleteRegisteredImageSrc();
    clearRegisteredDescriptor();
  };

  const goToScanPage = () => {
    navigate("/scanner");
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
      setRegisteredImageSrc(img.src);
    } catch (err) {
      console.error(err);
      toast(detectionToastVariants.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" minH="100vh" p={4}>
      <Flex direction="column" flex="1" justify="center" align="center" gap={4}>
        <Heading textAlign="center" as="h1" size="lg">
          Registro de imagem
        </Heading>
        {!!registeredImageSrc?.length ? (
          <Box>
            <Image width="240px" src={registeredImageSrc} mb={4} />
            <Flex direction="column" gap={4}>
              <Button
                onClick={deleteImageAndDescriptor}
                w="100%"
                rounded="l1"
                borderColor="red"
                color="red"
              >
                Remover foto
              </Button>
              <Button onClick={goToScanPage} w="100%" rounded="l1">
                Ir para Scanner
              </Button>
            </Flex>
          </Box>
        ) : (
          <ImageUploader onImageChange={handleImageChange} />
        )}
        {loading && (
          <Flex mt={4} align="center" gap={2}>
            <Spinner size="sm" />
            <Text fontSize="sm" color="gray.500">
              Salvando descriptor...
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
