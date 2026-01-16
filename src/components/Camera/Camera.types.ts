export type CameraProps = {
  onFaceDetected: (file: File) => void;
  onCancel: () => void;
  fileOrigin: "register" | "comparison";
};
