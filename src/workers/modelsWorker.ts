import * as faceapi from "face-api.js";

let modelsLoaded = false;

async function loadModels() {
  if (!modelsLoaded) {
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      ]);
      modelsLoaded = true;
      self.postMessage({ action: "models-loaded", success: true });
    } catch (err) {
      console.log(err);
      self.postMessage({ action: "models-loaded", success: false, error: err });
    }
  }
}

self.onmessage = async (e) => {
  const { action } = e.data;
  if (action === "load-models") {
    await loadModels();
  }
};

// Resultado dos estudos:
// Webworkers não funcionam muito bem com o face-api, pois no worker não existe variáveis 
// globais de navegador, como window ou document por ex.
// Futuramente talvez valha tentar usar workers na comparacão ou no reconhecimento.
// Não funcionou no carregamento dos modelos.
// Error: getEnv - environment is not defined, check isNodejs() and isBrowser()