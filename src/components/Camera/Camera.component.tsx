import { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FiCamera } from "react-icons/fi";
import { RenderIf } from "../RenderIf";
import { base64ToFile } from "../../utils/imageManipulators/base64ToFile";
import type { CameraProps } from "./Camera.types";

export function Camera({ onCapture, fileOrigin }: CameraProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [cameraError, setCameraError] = useState(false);
  const [isMirrored, setIsMirrored] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const loadCamera = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleCameraError = useCallback(() => {
    setIsLoading(false);
    setCameraError(true);
  }, []);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;

    const file = base64ToFile(imageSrc, `capture-${fileOrigin}`);
    onCapture(file);
  }, [onCapture]);

  return (
    <Flex direction="column" gap={4} justify="center" width="100%">
      <RenderIf condition={isLoading}>
        <Box>
          <Text>Carregando câmera...</Text>
        </Box>
      </RenderIf>
      <RenderIf condition={cameraError}>
        <Box>
          <Text>Erro ao acessar a câmera.</Text>
        </Box>
      </RenderIf>
      <Flex direction="column" gap={2}>
        <Flex justify="center" align="center" bg="black" maxH="240px">
          <Webcam
            audio={false}
            height="240px"
            width="240px"
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: "user",
              //   facingMode: 'enviroment' (camera traseira)
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
            size={"sm"}
          >
            Config
          </Button>
          <Button
            size={"sm"}
            width="100%"
            colorScheme="green"
            onClick={capture}
            leftIcon={<FiCamera />}
          >
            Capturar
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
