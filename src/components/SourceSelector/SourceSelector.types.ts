export type SourceSelectorProps = {
  onImageChange: (file: File) => void;
  onImageCapture: (file: File) => void;
  uploaderButtonLabel?: string;
  uploaderTextLabel?: string;
};
