import * as faceapi from "face-api.js";

export const faceApiOptions = new faceapi.TinyFaceDetectorOptions({
  inputSize: 416,
  scoreThreshold: 0.3,
});
