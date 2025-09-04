import { Box, Image, Text, Spinner } from "@chakra-ui/react";
import { useRef } from "react";
import { useImageStore } from "../../store/imageStore/imageStore.store";
import { useFaceDetection } from "../../hooks/useFaceDetection/useFaceDetection.hook";
import { useFaceComparing } from "../../hooks/useFaceComparing";

interface FaceComparatorProps {
  imageSrc: string;
}

export function FaceComparator({ imageSrc }: FaceComparatorProps) {
  const { registeredDescriptor } = useImageStore();
  const imgRef = useRef<HTMLImageElement>(null);

  const { loading, hasFace, descriptor } = useFaceDetection(imgRef.current);
  const { match, distance } = useFaceComparing(
    registeredDescriptor,
    imgRef.current
  );

  return (
    <Box>
      <Image
        ref={imgRef}
        src={imageSrc}
        alt="Imagem comparada"
        w="240px"
        maxH="328px"
        crossOrigin="anonymous"
        display="block"
      />

      {loading && (
        <Text mt={2}>
          <Spinner size="xs" mr={2} /> Analisando imagem...
        </Text>
      )}

      {!loading && hasFace && <Text mt={2}>Rosto detectado!</Text>}
      {!loading && hasFace === false && (
        <Text mt={2} color="red.500">
          Nenhum rosto encontrado.
        </Text>
      )}

      {!loading && match !== null && (
        <Text mt={2} color={match ? "green.500" : "red.500"}>
          {match ? "Rostos correspondem!" : "Rostos diferentes"} (Distância:{" "}
          {distance?.toFixed(4)})
        </Text>
      )}
    </Box>
  );
}