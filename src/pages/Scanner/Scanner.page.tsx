import {
  Box,
  Button,
  Flex,
  Spinner,
  Text,
  Image,
  Center,
  Heading,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaceComparator } from "../../components/FaceComparator/FaceComparator.component";
import * as faceapi from "face-api.js";
import { useImageStore } from "../../store/imageStore";
import { useNavigate } from "react-router-dom";
import { toast } from "../../components/ui/toast";
import { detectionToastVariants } from "../../utils/faceApiUtils/faceApiDetectionToastsVariants";
import { RenderIf } from "../../components/RenderIf";
import { FiImage, FiCamera } from "react-icons/fi";
import { Camera } from "../../components/Camera/Camera.component";
import { ImageUploader } from "../../components/ImageUploader/ImageUploader.component";
import { MainLayout } from "../../components/MainLayout";
import { fileToBase64 } from "../../utils/imageManipulationUtils/fileToBase64";
import { SourceSelector } from "../../components/SourceSelector";

export function Scanner() {
  const navigate = useNavigate();
  const {
    scannedFile,
    registeredFile,
    setScannedDescriptor,
    setScannedFile,
    clearScannedDescriptor,
    deleteScannedFile,
    clearRegisteredDescriptor,
    deleteRegisteredFile,
  } = useImageStore();
  const [loading, setLoading] = useState(false);

  async function handleFileChange(file: File) {
    try {
      setLoading(true);
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
    deleteScannedFile();
  };

  const goToRegisterPage = () => {
    removeImage();
    clearRegisteredDescriptor();
    deleteRegisteredFile();
    navigate("/register");
  };

  useEffect(() => {
    console.log({ scannedFile });
  }, [scannedFile]);

  return (
    <MainLayout>
      <Flex direction={{ base: "column", md: "row" }} maxW="1000px" gap={6}>
        <Box flex="1">
          <Heading size="md" mb={6} textAlign="center">
            Imagem registrada
          </Heading>
          <RenderIf condition={!!registeredFile}>
            <Box width="100%">
              <Flex justify="center" bg={"black"} mb={4}>
                <Image maxH="340px" src={registeredFile} />
              </Flex>
            </Box>
          </RenderIf>
          <RenderIf condition={!registeredFile}>
            <Flex
              direction="column"
              justify="center"
              align="center"
              h={"100%"}
              gap={4}
            >
              <Text>Comece registrando uma imagem</Text>
              <Button onClick={goToRegisterPage}>Registrar foto</Button>
            </Flex>
          </RenderIf>
        </Box>

        <Box flex="1">
          <Heading size="md" mb={6} textAlign="center">
            Nova imagem
          </Heading>
          <RenderIf condition={!scannedFile}>
            <SourceSelector onImageChange={handleFileChange} />
          </RenderIf>
          <RenderIf condition={!!scannedFile}>
            <Box>
              <FaceComparator imageSrc={scannedFile} />
            </Box>
          </RenderIf>
        </Box>
      </Flex>
      <Flex width="100%">
        <Flex width={"100%"} justify={"center"} mb={4}>
          <RenderIf condition={!scannedFile}>
            <Text>Envie uma imagem para comparar</Text>
          </RenderIf>
        </Flex>
      </Flex>
    </MainLayout>

    // <Center minH="100vh">
    //   <Flex
    //     direction="column"
    //     w="100%"
    //     maxW="1000px"
    //     gap={6}
    //     bg="gray.800"
    //     p={6}
    //     borderRadius="2xl"
    //     boxShadow="lg"
    //   >
    //     <Heading size="lg" textAlign="center" color="white">
    //       Comparação de Imagens
    //     </Heading>

    //     <Flex
    //       direction={{ base: "column", md: "row" }}
    //       gap={6}
    //       justify="center"
    //       align="center"
    //     >
    //       <RenderIf
    //         condition={!scannedImageSrc?.length && !!registeredImageSrc}
    //       >
    //         <Text marginX={8}>Imagem registrada:</Text>
    //         <Flex>
    //           <Image maxH="328px" src={registeredImageSrc} mb={4} />
    //         </Flex>
    //       </RenderIf>
    //       <Box
    //         flex="1"
    //         border="1px solid"
    //         borderColor="gray.700"
    //         borderRadius="xl"
    //         overflow="hidden"
    //       >
    //         <img
    //           src={registeredImageSrc}
    //           alt="Imagem registrada"
    //           style={{
    //             width: "100%",
    //             height: "300px",
    //             objectFit: "cover",
    //           }}
    //         />
    //       </Box>
    //       {loading && (
    //         <Flex direction="column" mt={4} gap={4}>
    //           <Flex align="center" gap={2}>
    //             <Spinner size="sm" />
    //             <Text fontSize="sm" color="gray.500">
    //               Comparando imagens...
    //             </Text>
    //           </Flex>

    //           <Box
    //             flex="1"
    //             border="1px solid"
    //             borderColor="gray.700"
    //             borderRadius="xl"
    //             overflow="hidden"
    //           >
    //             <img
    //               src={scannedImageSrc}
    //               alt="Imagem enviada"
    //               style={{
    //                 width: "100%",
    //                 height: "300px",
    //                 objectFit: "cover",
    //               }}
    //             />
    //           </Box>
    //         </Flex>
    //       )}

    //       <RenderIf condition={!!scannedImageSrc?.length}>
    //         <Box>
    //           <FaceComparator imageSrc={scannedImageSrc} />
    //           <Flex direction="column" gap={4}>
    //             <Button
    //               onClick={removeImage}
    //               w="100%"
    //               rounded="l1"
    //               borderColor="red"
    //               color="red"
    //             >
    //               Remover foto
    //             </Button>
    //             <Button onClick={goToRegisterPage} w="100%" rounded="l1">
    //               Testar novamente
    //             </Button>
    //           </Flex>
    //         </Box>
    //       </RenderIf>

    //       {/* Resultado */}
    //       <Center>
    //         <Text fontSize="2xl" fontWeight="bold" color="green.400">
    //           Similaridade: {'score'}%
    //         </Text>
    //       </Center>
    //     </Flex>
    //   </Flex>
    // </Center>

    // <MainLayout title="Comparar imagem" onImageUpload={handleFileChange}>
    //   <Flex direction="column" flex="1" justify="center" align="center" gap={4}>
    //     <RenderIf condition={!scannedImageSrc?.length && !!registeredImageSrc}>
    //       <Text marginX={8}>Imagem registrada:</Text>
    //       <Flex>
    //         <Image maxH="328px" src={registeredImageSrc} mb={4} />
    //       </Flex>
    //     </RenderIf>
    //     <RenderIf condition={!!scannedImageSrc?.length}>
    //       <Box>
    //         <FaceComparator imageSrc={scannedImageSrc} />
    //         <Flex direction="column" gap={4}>
    //           <Button
    //             onClick={removeImage}
    //             w="100%"
    //             rounded="l1"
    //             borderColor="red"
    //             color="red"
    //           >
    //             Remover foto
    //           </Button>
    //           <Button onClick={goToRegisterPage} w="100%" rounded="l1">
    //             Testar novamente
    //           </Button>
    //         </Flex>
    //       </Box>
    //     </RenderIf>
    //     {loading && (
    //       <Flex mt={4} align="center" gap={2}>
    //         <Spinner size="sm" />
    //         <Text fontSize="sm" color="gray.500">
    //           Comparando imagens...
    //         </Text>
    //       </Flex>
    //     )}
    //   </Flex>
    // </MainLayout>
  );
}

// import {
//   Box,
//   Center,
//   Flex,
//   Heading,
//   Text,
// } from "@chakra-ui/react";

// export const Scanner = () => {
//   // Valores fixos só para testar layout
//   const originalImage =
//     "https://via.placeholder.com/400x300.png?text=Imagem+Registrada";
//   const uploadedImage =
//     "https://via.placeholder.com/400x300.png?text=Imagem+Enviada";
//   const score = 87;

//   return (
//     <Center minH="100vh">
//       <Flex
//         direction="column"
//         w="100%"
//         maxW="1000px"
//         gap={6}
//         bg="gray.800"
//         p={6}
//         borderRadius="2xl"
//         boxShadow="lg"
//       >
//         <Heading size="lg" textAlign="center" color="white">
//           Comparação de Imagens
//         </Heading>

//         <Flex
//           direction={{ base: "column", md: "row" }}
//           gap={6}
//           justify="center"
//           align="center"
//         >
//           <RenderIf condition={!scannedImageSrc?.length && !!registeredImageSrc}>
//   <Text marginX={8}>Imagem registrada:</Text>
//   <Flex>
//     <Image maxH="328px" src={registeredImageSrc} mb={4} />
//   </Flex>
// </RenderIf>
//           <Box
//             flex="1"
//             border="1px solid"
//             borderColor="gray.700"
//             borderRadius="xl"
//             overflow="hidden"
//           >
//             <img
//               src={originalImage}
//               alt="Imagem registrada"
//               style={{
//                 width: "100%",
//                 height: "300px",
//                 objectFit: "cover",
//               }}
//             />
//           </Box>

//                   <RenderIf condition={!!scannedImageSrc?.length}>
//   <Box>
//     <FaceComparator imageSrc={scannedImageSrc} />
//     <Flex direction="column" gap={4}>
//       <Button
//         onClick={removeImage}
//         w="100%"
//         rounded="l1"
//         borderColor="red"
//         color="red"
//       >
//         Remover foto
//       </Button>
//       <Button onClick={goToRegisterPage} w="100%" rounded="l1">
//         Testar novamente
//       </Button>
//     </Flex>
//   </Box>
// </RenderIf>
// {loading && (
//   <Flex mt={4} align="center" gap={2}>
//     <Spinner size="sm" />
//     <Text fontSize="sm" color="gray.500">
//       Comparando imagens...
//     </Text>
//   </Flex>
//           <Box
//             flex="1"
//             border="1px solid"
//             borderColor="gray.700"
//             borderRadius="xl"
//             overflow="hidden"
//           >
//             <img
//               src={uploadedImage}
//               alt="Imagem enviada"
//               style={{
//                 width: "100%",
//                 height: "300px",
//                 objectFit: "cover",
//               }}
//             />
//           </Box>
//         </Flex>

//         {/* Resultado */}
//         <Center>
//           <Text fontSize="2xl" fontWeight="bold" color="green.400">
//             Similaridade: {score}%
//           </Text>
//         </Center>
//       </Flex>
//     </Center>
//   );
// };
