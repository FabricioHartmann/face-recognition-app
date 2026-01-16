import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { base64ToFile } from "../../utils/imageManipulators/base64ToFile";
import { RenderIf } from "../RenderIf";
import { faceApiOptions } from "../../utils/faceApiManipulators/faceApiDefaultOptions";
import type { CameraProps } from "./Camera.types";
import useIsMobile from "../../hooks/useIsMobile/useIsMobile";

export function Camera({ onFaceDetected, onCancel, fileOrigin }: CameraProps) {
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
          position="absolute"
          right={2}
          bottom={2}
          direction="column"
          gap={2}
          zIndex={10}
        >
          <RenderIf condition={isMobile}>
            <Button
              size="sm"
              width={128}
              onClick={() =>
                setFacingMode((prev) =>
                  prev === "user" ? "environment" : "user"
                )
              }
            >
              Mudar câmera
            </Button>
          </RenderIf>

          <RenderIf condition={isMobile}>
            <Button onClick={onCancel} width={128} size="sm" colorScheme="red">
              Cancelar
            </Button>
          </RenderIf>
          <Button
            onClick={startDetection}
            size="sm"
            width={128}
            colorScheme="green"
            isLoading={isDetecting}
            loadingText="Detectando..."
          >
            Detectar rosto
          </Button>
        </Flex>
        <Flex align="center" bg="black">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode }}
            onUserMedia={() => setIsLoading(false)}
            onUserMediaError={handleCameraError}
          />
        </Flex>

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
