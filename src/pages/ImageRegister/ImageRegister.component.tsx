import {
  Box,
  Heading,
  Text,
  Image,
  Button,
  Flex,
  Spinner,
  Center,
  Tabs,
  Tab,
  Icon,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import * as faceapi from "face-api.js";
import { ImageUploader } from "../../components/ImageUploader/ImageUploader.component";
import { useImageStore } from "../../store/imageStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "../../components/ui/toast";
import { detectionToastVariants } from "../../utils/faceApiDetectionToastsVariants";
import { MainLayout } from "../../components/MainLayout";
import { RenderIf } from "../../components/RenderIf";
import { FiImage, FiCamera } from "react-icons/fi";
import { Camera } from "../../components/Camera/Camera.component";
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
      // navigate("/scanner");
    } catch (err) {
      console.error(err);
      toast(detectionToastVariants.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Flex direction={{ base: "column", md: "row" }} maxW="1000px" gap={6}>
        <Box flex="1">
          <Heading size="md" mb={6} textAlign="center">
            Registrar imagem
          </Heading>

          <Tabs variant="enclosed" colorScheme="" isFitted>
            <TabList mb="4">
              <Tab>
                <Icon as={FiImage} mr={2} /> Galeria
              </Tab>
              <Tab>
                <Icon as={FiCamera} mr={2} /> Câmera
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel padding={0}>
                <ImageUploader
                  fullHeight
                  fullWidth
                  onImageChange={handleImageChange}
                />
              </TabPanel>

              <TabPanel padding={0}>
                <Flex minH="280px">
                  <Camera />
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Flex
          direction="column"
          flex="1"
          justifyContent="center"
          align="center"
          gap={4}
        >
          <RenderIf condition={loading}>
            <Flex mt={4} align="center" gap={2}>
              <Spinner size="sm" />
              <Text fontSize="sm" color="gray.200">
                Salvando descriptor...
              </Text>
            </Flex>
          </RenderIf>
          <RenderIf condition={!registeredImageSrc?.length && !loading}>
            <Text>Registre uma imagem para iniciar o teste</Text>
          </RenderIf>
          <RenderIf condition={!!registeredImageSrc?.length}>
            <Box width="100%">
              <Flex justify="center" bg={"black"} mb={4}>
                <Image w="240px" maxH="328px" src={registeredImageSrc} />
              </Flex>
              <Flex gap={4}>
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
          </RenderIf>
        </Flex>
      </Flex>
      {/* <Flex direction="column" flex="1" justify="center" align="center" gap={4}>
        <RenderIf condition={!registeredImageSrc?.length}>
          <Box>
            <Text>Registre uma imagem para iniciar o teste</Text>
          </Box>
        </RenderIf>
        <RenderIf condition={!!registeredImageSrc?.length}>
          <Box width="100%">
            <Flex justify="center" bg={"black"} mb={4}>
              <Image
                maxH="328px"
                src={registeredImageSrc}
              />
            </Flex>
            <Flex gap={4}>
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
        </RenderIf>
        {loading && (
          <Flex mt={4} align="center" gap={2}>
            <Spinner size="sm" />
            <Text fontSize="sm" color="gray.500">
              Salvando descriptor...
            </Text>
          </Flex>
        )}
      </Flex> */}
    </MainLayout>
  );
}
