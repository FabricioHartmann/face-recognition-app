export type ImageUploaderProps = {
  onImageChange: (file: File) => void;
  fullWidth?: boolean,
  fullHeight?: boolean,
}