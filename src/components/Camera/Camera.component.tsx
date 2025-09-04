import { Box, Button, Flex, Text, useStatStyles } from "@chakra-ui/react";
import { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import { RenderIf } from "../RenderIf";

export function Camera() {
  const webcamRef = useRef<Webcam>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cameraError, setCameraError] = useState(false);
  const [isMirrored, setIsMirrored] = useState(false);

  const loadCamera = useCallback(() => {
    setIsLoading(false);
    console.log("carregou");
  }, []);

  const handleCameraError = useCallback(() => {
    setIsLoading(false)
    setCameraError(true);
  }, []);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    console.log(imageSrc, "img base64");
  }, [webcamRef]);

  return (
    <Flex
      direction="column"
      gap={4}
      justify="center"
      width="100%"
      className="flex flex-col items-center gap-4"
    >
      <RenderIf condition={isLoading && cameraError}>
        <Box>
          <Text>Carregando câmera...</Text>
        </Box>
      </RenderIf>
      <Flex direction="column">
        <Flex justify="center" align="center" bg="black" maxH='240px'>
          <Webcam
            audio={false}
            height="280px"
            width="280px"
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: "user",
              //   facingMode: 'enviroment', //camera traseira
            }}
            mirrored={isMirrored}
            onUserMedia={loadCamera}
            onUserMediaError={handleCameraError}
          />
        </Flex>
        <Flex justify="space-between" gap={4}>
          <Button
            disabled
            onClick={() => setIsMirrored(!isMirrored)}
            rounded="l1"
          >
            Config
          </Button>
          <Button disabled width="100%" onClick={capture} rounded="l1">
            Capturar
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
