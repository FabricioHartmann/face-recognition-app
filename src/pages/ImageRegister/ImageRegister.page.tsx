import { Heading, Flex } from "@chakra-ui/react";

import { MainLayout } from "../../components/MainLayout";

export function ImageRegister() {
  // const handleFileChange = async (file: File) => {
  //   try {
  //     const base64Img = await fileToBase64(file);
  //     const img = document.createElement("img");
  //     img.src = base64Img;
  //     img.crossOrigin = "anonymous";

  //     await new Promise<void>((resolve, reject) => {
  //       img.onload = () => resolve();
  //       img.onerror = () => reject(new Error("Erro ao carregar imagem"));
  //     });

  //     setLoading(true);
  //     const detection = await faceapi
  //       .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
  //       .withFaceLandmarks()
  //       .withFaceDescriptor();

  //     if (!detection) {
  //       toast(detectionToastVariants.undetected);
  //       deleteImageAndDescriptor();
  //       return;
  //     }
  //     // console.log({ canvasRef: canvasRef.current });

  //     // if (canvasRef.current) {
  //     //   const dims = faceapi.matchDimensions(canvasRef.current, img, true);
  //     //   const detections = await faceapi.detectAllFaces(img, faceApiOptions);

  //     //   const resized = faceapi.resizeResults(detections, dims);
  //     //   faceapi.draw.drawDetections(canvasRef.current, resized);
  //     // }
  //     const descriptorArray = Array.from(detection.descriptor);
  //     await setRegisteredDescriptor(descriptorArray);

  //     toast(detectionToastVariants.detected);
  //     setRegisteredFile(img.src);
  //     // navigate("/scanner");
  //   } catch (err) {
  //     console.error(err);
  //     toast(detectionToastVariants.error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <MainLayout>
      <Flex direction={{ base: "column", md: "row" }} maxW="1000px" gap={6}>
        <Heading size="md" mb={6} textAlign="center">
          Essa página será usada para integracões futuras com backend
        </Heading>
        {/* <Box flex="1">
          <Heading size="md" mb={6} textAlign="center">
            Essa página será usada para integracões futuras com backend
          </Heading>

          <SourceSelector onImageChange={handleFileChange} />
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
          <RenderIf condition={!registeredFile?.length && !loading}>
            <Text>Registre uma imagem para iniciar o teste</Text>
          </RenderIf>
          <RenderIf condition={!!registeredFile?.length}>
            <Box width="100%">
              <Flex justify="center" bg={"black"} mb={4}>
                <Image w="240px" maxH="328px" src={registeredFile} />
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
        </Flex> */}
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
