import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import { RenderIf } from "../RenderIf";

export function Camera() {
  const webcamRef = useRef<Webcam>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMirrored, setIsMirrored] = useState(false);

  const loadCamera = useCallback(() => {
    setIsLoading(false);
    console.log("carregou");
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
      className="flex flex-col items-center gap-4"
    >
      <RenderIf condition={isLoading}>
        <Box>
          <Text>Carregando câmera...</Text>
        </Box>
      </RenderIf>
      <>
        <Flex>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: "user",
              //   facingMode: 'enviroment', //camera traseira
            }}
            mirrored={isMirrored}
            onUserMedia={loadCamera}
            onUserMediaError={() => console.log("Erro ao acessar câmera")}
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
      </>
    </Flex>
  );
}
