import { useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

export function useFaceApiModels() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      if (loaded) return;

      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        ]);
        setLoaded(true);
        console.log("Modelos face-api carregados!");
      } catch (err) {
        console.error("Erro ao carregar modelos:", err);
      }
    };

    loadModels();
  }, [loaded]);

  return loaded;
}