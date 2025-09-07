import * as faceapi from "face-api.js";

type DetectionWithDescriptor = {
  detection: faceapi.FaceDetection;
  descriptor: Float32Array;
  landmarks: faceapi.FaceLandmarks68;
};

export async function detectFace(
  img: HTMLImageElement | null,
  faceApiOptions: any
): Promise<faceapi.WithFaceDescriptor<
  faceapi.WithFaceLandmarks<DetectionWithDescriptor>
> | null> {
  if (!img) return null;

  const detection = await faceapi
    .detectSingleFace(img, faceApiOptions)
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (!detection) return null;

  return detection;
}
