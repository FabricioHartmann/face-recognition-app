import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { Box, Image, Text } from "@chakra-ui/react";
import { useImageStore } from "../../store/imageStore/imageStore.store";
import { useFaceCompare } from "../../hooks/useCompareFaces/useCompareFaces.hook";

interface FaceDetectProps {
  imageSrc: string; // blob: ou base64
  onDetectResult?: (hasFace: boolean) => void; // opcional
}

export default function FaceDetect({
  imageSrc,
  onDetectResult,
}: FaceDetectProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [hasFace, setHasFace] = useState<boolean | null>(null);
  const { registeredDescriptor } = useImageStore();
  const { match, distance } = useFaceCompare(
    registeredDescriptor,
    imgRef.current
  );

  async function detectFaces() {
    const img = imgRef.current;
    if (!img) return;

    const image = await faceapi.fetchImage(img.src);
    // TODO resolver o retorno
    setLoading(true);

    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");

      await new Promise<void>((resolve, reject) => {
        if (img.complete && img.naturalHeight !== 0) resolve();
        else {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error("Erro ao carregar imagem"));
        }
      });

      const options = new faceapi.TinyFaceDetectorOptions({
        inputSize: 416,
        scoreThreshold: 0.3,
      });
      const detections = await faceapi.detectAllFaces(img, options);

      const foundFace = detections.length > 0;
      setHasFace(foundFace);
      if (onDetectResult) onDetectResult(foundFace);

      if (canvasRef.current) {
        const dims = faceapi.matchDimensions(canvasRef.current, img, true);
        const resized = faceapi.resizeResults(detections, dims);
        faceapi.draw.drawDetections(canvasRef.current, resized);
      }
    } catch (error) {
      console.error("Erro na detecção facial:", error);
      setHasFace(false);
      if (onDetectResult) onDetectResult(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log(imgRef.current, "segunda foto para comparar");
    if (match !== null) {
      console.log(
        "Comparação com rosto salvo:",
        match ? "MATCH" : "NO MATCH",
        "Distância:",
        distance
      );
    }
  }, [match, distance, imgRef.current]);

  return (
    <Box position="relative" display="inline-block">
      <Image
        ref={imgRef}
        src={imageSrc}
        alt="Imagem para detecção"
        width="240px"
        onLoad={() => {
          console.log(imgRef.current, "current");
          detectFaces();
        }}
        crossOrigin="anonymous"
        display="block"
      />
      <Box as="canvas" ref={canvasRef} position="absolute" top={0} left={0} />
      {loading && <Text mt={2}>Analisando imagem...</Text>}
      {!loading && hasFace && <Text mt={2}>Rosto detectado!</Text>}
      {!loading && hasFace === false && (
        <Text mt={2} color="red.500">
          Nenhum rosto encontrado.
        </Text>
      )}
      {match !== null && (
        <Text mt={2} color={match ? "green.500" : "red.500"}>
          {match ? "Rostos correspondem!" : "Rostos diferentes"} (Distância:{" "}
          {distance?.toFixed(4)})
        </Text>
      )}
      {match === null && (
        <Text mt={2} color={match ? "green.500" : "red.500"}>
          Não deu match
        </Text>
      )}
    </Box>
  );
}
