export type CameraProps = {
  onFaceDetected: (file: File) => void;
  fileOrigin: "register" | "comparison";
};
