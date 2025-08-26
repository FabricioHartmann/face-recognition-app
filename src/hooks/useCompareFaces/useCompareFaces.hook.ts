import { useState, useEffect } from "react";
import * as faceapi from "face-api.js";

export function useFaceCompare(
  savedDescriptor: number[] | null,
  imgElement: HTMLImageElement | null
) {
  const [match, setMatch] = useState<boolean | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    if (!savedDescriptor || !imgElement) {
      setMatch(null);
      setDistance(null);
      return;
    }

    async function compare() {
      if (!imgElement || !savedDescriptor) return;
      try {
        const detection = await faceapi
          .detectSingleFace(imgElement, new faceapi.TinyFaceDetectorOptions())
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
  }, [savedDescriptor, imgElement]);

  return { match, distance };
}
