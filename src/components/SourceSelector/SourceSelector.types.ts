export type SourceSelectorProps = {
  onImageChange: (file: File) => void;
  onImageCapture: (file: File) => void;
  fileOrigin: "register" | "comparison";
  uploaderButtonLabel?: string;
  uploaderTextLabel?: string;
};
