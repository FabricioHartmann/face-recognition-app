import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FiCamera, FiRefreshCw, FiTarget } from "react-icons/fi";
import { RenderIf } from "../RenderIf";
import { base64ToFile } from "../../utils/imageManipulators/base64ToFile";
import type { CameraProps } from "./Camera.types";
import useIsMobile from "../../hooks/useIsMobile/useIsMobile";

export function Camera({ onCapture, fileOrigin }: CameraProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [cameraError, setCameraError] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment"
  );
  const webcamRef = useRef<Webcam>(null);
  const isMobile = useIsMobile();

  function handleCameraError() {
    setIsLoading(false);
    setCameraError(true);
  }

  function capture() {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;

    const file = base64ToFile(imageSrc, `capture-${fileOrigin}`);
    onCapture(file);
  }

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
        <Flex
          position={"relative"}
          justify="center"
          align="center"
          bg="black"
          maxH="220px"
        >
          <Webcam
            audio={false}
            height="240px"
            width="240px"
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode,
            }}
            onUserMedia={() => setIsLoading(false)}
            onUserMediaError={handleCameraError}
          />
          <RenderIf condition={isMobile}>
            <Button position="absolute" bottom={2} right={2} size="sm">
              <FiRefreshCw
                onClick={() =>
                  setFacingMode((prev) =>
                    prev === "user" ? "environment" : "user"
                  )
                }
              />
            </Button>
          </RenderIf>
        </Flex>
        <Flex direction={"column"} justify="space-between" gap={2}>
          <Button
            size={"sm"}
            disabled
            width="100%"
            onClick={capture}
            leftIcon={<FiTarget />}
          >
            Detectar em tempo real
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
