export type FaceDetectProps = {
  imageSrc: string;
  onDetectResult?: (isMatch: boolean) => void;
};
