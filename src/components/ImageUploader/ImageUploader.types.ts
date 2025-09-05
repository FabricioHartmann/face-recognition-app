export type ImageUploaderProps = {
  onImageChange: (file: File) => void;
  textLabel?: string;
  buttonLabel?: string;
  fullWidth?: boolean;
  fullHeight?: boolean;
};
