import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FiRefreshCw, FiTarget } from "react-icons/fi";
import useIsMobile from "../../hooks/useIsMobile/useIsMobile";
import { base64ToFile } from "../../utils/imageManipulators/base64ToFile";
import { RenderIf } from "../RenderIf";
import { faceApiOptions } from "../../utils/faceApiManipulators/faceApiDefaultOptions";
import type { CameraProps } from "./Camera.types";

export function Camera({ onFaceDetected, fileOrigin }: CameraProps) {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  const [cameraError, setCameraError] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment"
  );
  const webcamRef = useRef<Webcam>(null);
  const detectionIntervalRef = useRef<number | null>(null);
  const hasDetectedRef = useRef(false);

  function handleCameraError() {
    setIsLoading(false);
    setCameraError(true);
  }

  function stopDetection() {
    if (detectionIntervalRef.current) {
      window.clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }
    setIsDetecting(false);
  }

  function captureFrame() {
    if (hasDetectedRef.current) return;

    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;

    hasDetectedRef.current = true;
    stopDetection();

    const file = base64ToFile(imageSrc, `capture-${fileOrigin}`);
    onFaceDetected(file);
  }

  function startDetection() {
    if (!webcamRef.current?.video) return;

    hasDetectedRef.current = false;
    setIsDetecting(true);

    detectionIntervalRef.current = window.setInterval(async () => {
      const video = webcamRef.current?.video;
      if (!video) return;

      const detection = await faceapi.detectSingleFace(video, faceApiOptions);

      if (detection) {
        captureFrame();
      }
    }, 300);
  }

  useEffect(() => {
    return () => {
      stopDetection();
    };
  }, []);

  return (
    <Flex direction="column" gap={4} justify="center" width="100%">
      <RenderIf condition={isLoading}>
        <Box>
          <Text>Carregando câmera...</Text>
        </Box>
      </RenderIf>

      <Flex direction="column" gap={2}>
        <Flex
          position="relative"
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
            videoConstraints={{ facingMode }}
            onUserMedia={() => setIsLoading(false)}
            onUserMediaError={handleCameraError}
          />

          <RenderIf condition={isMobile}>
            <Button
              position="absolute"
              bottom={2}
              right={2}
              size="sm"
              onClick={() =>
                setFacingMode((prev) =>
                  prev === "user" ? "environment" : "user"
                )
              }
            >
              <FiRefreshCw />
            </Button>
          </RenderIf>
        </Flex>

        <RenderIf condition={!cameraError}>
          <Button
            size="sm"
            width="100%"
            colorScheme="green"
            leftIcon={<FiTarget />}
            isLoading={isDetecting}
            loadingText="Detectando rosto..."
            onClick={startDetection}
          >
            Detectar em tempo real
          </Button>
        </RenderIf>

        <RenderIf condition={cameraError}>
          <Box>
            <Text color="red">Erro ao acessar a câmera</Text>
            <Text color="red">Verifique conexão ou permissão do navegador</Text>
          </Box>
        </RenderIf>
      </Flex>
    </Flex>
  );
}
