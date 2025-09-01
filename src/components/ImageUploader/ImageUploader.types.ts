export type ImageUploaderProps = {
  onImageChange: (img: HTMLImageElement) => void;
  fullWidth?: boolean,
  fullHeight?: boolean,
}