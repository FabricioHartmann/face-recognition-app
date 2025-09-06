import * as faceapi from "face-api.js";

export async function detectFaceDescriptor(
  img: HTMLImageElement | null,
  faceApiOptions: any
): Promise<Float32Array | null> {
  if (!img) return null;

  const detection = await faceapi
    .detectSingleFace(img, faceApiOptions)
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (!detection) return null;

  return detection.descriptor;
}