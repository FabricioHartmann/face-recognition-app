import { useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import { useFaceApiModels } from "../useFaceApiModels";

export function useFaceComparing(
  savedDescriptor: number[] | Float32Array<ArrayBufferLike>,
  imgElement: HTMLImageElement | null
) {
  const [match, setMatch] = useState<boolean | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const status = useFaceApiModels();

  useEffect(() => {
    if (!savedDescriptor || !imgElement || status !== "success") {
      setMatch(null);
      setDistance(null);
      return;
    }

    async function compare() {
      if (status !== "success") return
      try {
        const detection = await faceapi
          .detectSingleFace(imgElement as HTMLImageElement, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (!detection) {
          setMatch(false);
          setDistance(null);
          return;
        }

        const dist = faceapi.euclideanDistance(
          savedDescriptor,
          Array.from(detection.descriptor)
        );
        setDistance(dist);

        const THRESHOLD = 0.6;
        setMatch(dist < THRESHOLD);
      } catch (error) {
        console.error("Erro na comparação facial:", error);
        setMatch(false);
        setDistance(null);
      }
    }

    compare();
  }, [savedDescriptor, imgElement, status]);

  return { match, distance, status };
}
