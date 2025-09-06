export type CameraProps = {
  onCapture: (file: File) => void;
  fileOrigin: 'register' | 'comparison'
};
