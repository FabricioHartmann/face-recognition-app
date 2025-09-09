import { useState, useEffect } from "react";
import * as faceapi from "face-api.js";

export function useFaceComparing(
  registeredDescriptor: number[] | null,
  scannedDescriptor: number[] | null
) {
  const [match, setMatch] = useState<boolean | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    if (!registeredDescriptor || !scannedDescriptor) {
      setMatch(null);
      setDistance(null);
      return;
    }
    if (scannedDescriptor?.length && registeredDescriptor?.length !== scannedDescriptor.length) {
      console.log(
        "Descriptors com tamanhos diferentes, não é possível comparar"
      );
      setMatch(false);
      setDistance(null);
      return;
    }

    try {
      const dist = faceapi.euclideanDistance(
        registeredDescriptor,
        scannedDescriptor
      );
      setDistance(dist);
      setMatch(dist < 0.6);
    } catch (err) {
      setMatch(null);
      setDistance(null);
    }
  }, [registeredDescriptor, scannedDescriptor]);

  return { match, distance };
}
