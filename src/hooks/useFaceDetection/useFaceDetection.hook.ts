import { useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import { faceApiOptions } from "../../utils/faceApiManipulators/faceApiDefaultOptions";
import { useFaceApiModels } from "../useFaceApiModels";

export function useFaceDetection(imgElement: HTMLImageElement | null) {
  const [loading, setLoading] = useState(false);
  const [hasFace, setHasFace] = useState<boolean | null>(null);
  const [descriptor, setDescriptor] = useState<Float32Array | null>(null);
  const status = useFaceApiModels();

  useEffect(() => {
    if (!imgElement || status !== "success") return;

    async function detect(img: HTMLImageElement) {
      setLoading(true);
      try {
        const detection = await faceapi
          .detectSingleFace(img, faceApiOptions)
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (!detection) {
          setHasFace(false);
          setDescriptor(null);
          return;
        }

        setHasFace(true);
        setDescriptor(detection.descriptor);
      } catch (err) {
        console.error("Erro na detecção facial:", err);
        setHasFace(false);
      } finally {
        setLoading(false);
      }
    }

    detect(imgElement);
  }, [imgElement, status]);

  return { loading, hasFace, descriptor, status };
}
